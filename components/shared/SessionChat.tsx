// components/shared/SessionChat.tsx
'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface WebSocketMessage {
  type: 'chat' | 'typing' | 'read';
  payload: {
    id: string;
    content: string;
    sender: string;
    timestamp: string;
  };
}

interface SessionChatProps {
  sessionId: string;
  role: 'teacher' | 'student';
}

export function SessionChat({ sessionId, role }: SessionChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize WebSocket connection
  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000';
    ws.current = new WebSocket(`${wsUrl}/api/sessions/${sessionId}/ws`);

    ws.current.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      switch (message.type) {
        case 'chat':
          setMessages(prev => [...prev, message.payload]);
          break;
        case 'typing':
          if (message.payload.sender !== role) {
            setIsTyping(true);
            if (typingTimeoutRef.current) {
              clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
          }
          break;
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setError('Connection error. Please refresh the page.');
    };

    return () => {
      ws.current?.close();
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [sessionId, role]);

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/sessions/${sessionId}/messages`);
        if (!response.ok) throw new Error('Failed to fetch messages');
        
        const data = await response.json();
        setMessages(data);
        setError(null);
      } catch (err) {
        setError('Failed to load messages. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [sessionId]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const sendMessage = async () => {
    if (!newMessage.trim() || !ws.current) return;

    const messageData: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: role,
      timestamp: new Date().toISOString(),
      status: 'sending',
    };

    try {
      // Optimistically add message to UI
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');

      // Send to WebSocket
      ws.current.send(JSON.stringify({
        type: 'chat',
        payload: messageData
      }));

      // Save to database
      const response = await fetch(`/api/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      // Update message status to sent
      setMessages(prev =>
        prev.map(msg =>
          msg.id === messageData.id ? { ...msg, status: 'sent' } : msg
        )
      );
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message. Please try again.');
    }
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'typing',
        payload: {
          sender: role,
          timestamp: new Date().toISOString(),
        },
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-8 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Chat</h3>
        
        {error && (
          <div className="mb-4 bg-red-50 text-red-600 px-4 py-2 rounded-md">
            {error}
          </div>
        )}

        <div className="h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === role ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm rounded-lg px-4 py-2 ${
                  message.sender === role
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className="flex items-center justify-end mt-1 space-x-1">
                  <p className="text-xs opacity-75">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                  {message.sender === role && (
                    <span className="text-xs opacity-75">
                      {message.status === 'sending' ? '⋯' : 
                       message.status === 'sent' ? '✓' : 
                       message.status === 'delivered' ? '✓✓' : 
                       '✓✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleTyping}
            placeholder="Type your message..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
