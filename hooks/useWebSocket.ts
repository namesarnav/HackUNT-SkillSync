import { useEffect, useRef } from 'react';

interface WebSocketMessage {
  type: 'chat';
  payload: {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
  };
}

export function useWebSocket(sessionId: string, onMessage: (message: WebSocketMessage) => void) {
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}/session/${sessionId}`);

    // Handle incoming messages
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    // Cleanup on unmount
    return () => {
      ws.current?.close();
    };
  }, [sessionId, onMessage]);

  // Send message through WebSocket
  const sendMessage = (content: string, sender: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: 'chat',
          payload: {
            id: Date.now().toString(),
            content,
            sender,
            timestamp: new Date().toISOString(),
          },
        })
      );
    }
  };

  return { sendMessage };
}


