'use client';

import { useEffect, useRef, useState } from 'react';
import {
  DISCORD_USER_ID,
  LANYARD_WS_URL,
  fetchLanyardPresence,
  type LanyardPresence,
} from '@/lib/lanyard';

export type ConnectionState = 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export function useLanyard(userId: string = DISCORD_USER_ID) {
  const [presence, setPresence] = useState<LanyardPresence | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
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
    };

    const fetchRestFallback = async () => {
      const data = await fetchLanyardPresence(userId);
      applyPresence(data);
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
        startRestPolling();
        reconnectTimer = setTimeout(connect, 5000);
        return;
      }

      ws.onopen = () => {
        if (isUnmounted) return;
        // Stay "connecting/reconnecting" until INIT_STATE arrives
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
          clearRestPoll();
          return;
        }

        if (message.op === 0 && message.t === 'PRESENCE_UPDATE') {
          applyPresence(message.d as LanyardPresence);
          setConnectionState('connected');
        }
      };

      ws.onclose = () => {
        clearHeartbeat();
        ws = null;
        if (isUnmounted || intentionallyClosed || tabHidden) return;

        setConnectionState(presenceRef.current ? 'reconnecting' : 'disconnected');
        startRestPolling();
        reconnectTimer = setTimeout(connect, 5000);
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

      // Tab visible again — resume live connection
      void fetchRestFallback().then(() => {
        if (!isUnmounted) connect();
      });
    };

    // Initial REST hydrate for fast first paint, then WS
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

  return { presence, connectionState };
}
