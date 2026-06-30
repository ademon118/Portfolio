'use client';

import { useEffect, useState } from 'react';
import {
  DISCORD_USER_ID,
  LANYARD_WS_URL,
  LanyardPresence,
} from '@/lib/lanyard';

type ConnectionState = 'connecting' | 'connected' | 'disconnected';

export function useLanyard(userId: string = DISCORD_USER_ID) {
  const [presence, setPresence] = useState<LanyardPresence | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');

  useEffect(() => {
    let ws: WebSocket | null = null;
    let heartbeatTimer: ReturnType<typeof setInterval> | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    let isUnmounted = false;

    const clearHeartbeat = () => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
    };

    const connect = () => {
      if (isUnmounted) return;

      setConnectionState('connecting');
      ws = new WebSocket(LANYARD_WS_URL);

      ws.onopen = () => {
        if (isUnmounted) return;
        setConnectionState('connected');
      };

      ws.onmessage = (event) => {
        if (isUnmounted) return;

        const message = JSON.parse(event.data);

        if (message.op === 1) {
          const interval = message.d.heartbeat_interval;
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
          setPresence(message.d as LanyardPresence);
          return;
        }

        if (message.op === 0 && message.t === 'PRESENCE_UPDATE') {
          setPresence(message.d as LanyardPresence);
        }
      };

      ws.onclose = () => {
        clearHeartbeat();
        if (isUnmounted) return;
        setConnectionState('disconnected');
        reconnectTimer = setTimeout(connect, 5000);
      };

      ws.onerror = () => {
        ws?.close();
      };
    };

    connect();

    return () => {
      isUnmounted = true;
      clearHeartbeat();
      if (reconnectTimer) clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, [userId]);

  return { presence, connectionState };
}
