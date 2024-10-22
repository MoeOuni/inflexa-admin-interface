/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useQueryClient } from '@tanstack/react-query';

interface WebSocketContextType {
  socket: WebSocket | null;
  sendMessage: (message: string) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(
      `${import.meta.env.VITE_API_WS_URL}/ws?id=${uuidv4()}`
    );
    setSocket(ws);

    ws.onopen = () => {
      toast.success('WebSocket connection established 🚀');
    };

    ws.onclose = () => {
      toast.info('WebSocket connection closed 🛑');
    };

    // TODO: handle errors in production to friendly messages.
    ws.onerror = (error) => {
      toast.error(`WebSocket error occurred ❌: ${JSON.stringify(error)}`);
    };

    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      if (parsedMessage.action === 'invalidate-query') {
        const currentUrl = window.location.pathname;
        const matchedPath = parsedMessage.paths.find((path: string) =>
          currentUrl.includes(path)
        );
        if (matchedPath) {
          console.log(`Current URL contains the path keyword: ${matchedPath}`);
        }
        if (matchedPath)
          toast.info(`Received an ${parsedMessage.action} action`, {
            action: {
              label: 'Refresh',
              onClick: () =>
                queryClient.invalidateQueries({
                  queryKey: parsedMessage.message,
                }),
            },
          });
      } else if (parsedMessage.action === 'update-menu-notifications') {
        queryClient.invalidateQueries({ queryKey: ['notifications', 'menu'] });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error('WebSocket is not open');
    }
  };

  const contextValue = React.useMemo(() => ({ socket, sendMessage }), [socket]);

  return (
    <WebSocketContext.Provider value={contextValue}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
