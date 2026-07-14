'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DISCORD_USER_ID,
  LANYARD_WS_URL,
  fetchLanyardPresence,
  type LanyardPresence,
} from '@/lib/lanyard';

export type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

const INITIAL_BACKOFF_MS = 1000;
const MAX_BACKOFF_MS = 30000;

export function useLanyard(userId: string = DISCORD_USER_ID) {
  const [presence, setPresence] = useState<LanyardPresence | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const [lastSeenAt, setLastSeenAt] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const presenceRef = useRef<LanyardPresence | null>(null);

  useEffect(() => {
    presenceRef.current = presence;
  }, [presence]);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let restPollTimer: ReturnType<typeof setInterval> | null = null;
    let isUnmounted = false;
    let intentionallyClosed = false;
    let tabHidden = typeof document !== 'undefined' ? document.hidden : false;
    let backoffMs = INITIAL_BACKOFF_MS;

    const clearHeartbeat = () => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
    };

    const clearReconnect = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const clearRestPoll = () => {
      if (restPollTimer) {
        clearInterval(restPollTimer);
        restPollTimer = null;
      }
    };

    const applyPresence = (next: LanyardPresence | null) => {
      if (!next || isUnmounted) return;
      setPresence(next);
      setLastSeenAt(Date.now());
      setErrorMessage(null);
    };

    const scheduleReconnect = () => {
      clearReconnect();
      const delay = backoffMs;
      backoffMs = Math.min(MAX_BACKOFF_MS, backoffMs * 2);
      reconnectTimer = setTimeout(connect, delay);
    };

    const fetchRestFallback = async () => {
      const data = await fetchLanyardPresence(userId);
      if (data) {
        applyPresence(data);
      } else if (!presenceRef.current) {
        setErrorMessage('Could not reach Discord presence. Retrying…');
      }
      return data;
    };

    const startRestPolling = () => {
      if (restPollTimer || isUnmounted || tabHidden) return;
      void fetchRestFallback();
      restPollTimer = setInterval(() => {
        void fetchRestFallback();
      }, 15000);
    };

    const stopSocket = () => {
      intentionallyClosed = true;
      clearHeartbeat();
      clearReconnect();
      if (ws) {
        ws.onclose = null;
        ws.onerror = null;
        ws.onmessage = null;
        ws.close();
        ws = null;
      }
    };

    const connect = () => {
      if (isUnmounted || tabHidden) return;

      intentionallyClosed = false;
      clearReconnect();
      clearRestPoll();

      setConnectionState(presenceRef.current ? 'reconnecting' : 'connecting');

      try {
        ws = new WebSocket(LANYARD_WS_URL);
      } catch {
        setConnectionState(presenceRef.current ? 'reconnecting' : 'disconnected');
        if (!presenceRef.current) {
          setErrorMessage('Live connection failed. Using backup feed…');
        }
        startRestPolling();
        scheduleReconnect();
        return;
      }

      ws.onopen = () => {
        if (isUnmounted) return;
      };

      ws.onmessage = (event) => {
        if (isUnmounted) return;

        let message: { op: number; t?: string; d?: unknown };
        try {
          message = JSON.parse(event.data);
        } catch {
          return;
        }

        if (message.op === 1) {
          const interval = (message.d as { heartbeat_interval: number }).heartbeat_interval;
          clearHeartbeat();
          heartbeatTimer = setInterval(() => {
            if (ws?.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: 3 }));
            }
          }, interval);

          if (ws?.readyState === WebSocket.OPEN) {
            ws.send(
              JSON.stringify({
                op: 2,
                d: { subscribe_to_id: userId },
              })
            );
          }
          return;
        }

        if (message.op === 0 && message.t === 'INIT_STATE') {
          applyPresence(message.d as LanyardPresence);
          setConnectionState('connected');
          backoffMs = INITIAL_BACKOFF_MS;
          clearRestPoll();
          return;
        }

        if (message.op === 0 && message.t === 'PRESENCE_UPDATE') {
          applyPresence(message.d as LanyardPresence);
          setConnectionState('connected');
          backoffMs = INITIAL_BACKOFF_MS;
        }
      };

      ws.onclose = () => {
        clearHeartbeat();
        ws = null;
        if (isUnmounted || intentionallyClosed || tabHidden) return;

        setConnectionState(presenceRef.current ? 'reconnecting' : 'disconnected');
        if (!presenceRef.current) {
          setErrorMessage('Disconnected from live presence. Reconnecting…');
        }
        startRestPolling();
        scheduleReconnect();
      };

      ws.onerror = () => {
        ws?.close();
      };
    };

    const handleVisibility = () => {
      tabHidden = document.hidden;

      if (document.hidden) {
        stopSocket();
        clearRestPoll();
        setConnectionState(presenceRef.current ? 'connected' : 'disconnected');
        return;
      }

      backoffMs = INITIAL_BACKOFF_MS;
      void fetchRestFallback().then(() => {
        if (!isUnmounted) connect();
      });
    };

    void fetchRestFallback().finally(() => {
      if (!isUnmounted && !tabHidden) connect();
    });

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isUnmounted = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      stopSocket();
      clearRestPoll();
    };
  }, [userId]);

  return { presence, connectionState, lastSeenAt, errorMessage };
}
