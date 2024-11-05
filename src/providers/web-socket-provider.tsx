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
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/contexts/auth-context';

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
  const { t } = useTranslation();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { user, token } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    // If there is no token, return early and do nothing.
    if (!token) return;

    const ws = new WebSocket(
      `${import.meta.env.VITE_API_WS_URL}/ws?id=${user?._id}`
    );

    setSocket(ws);

    ws.onopen = () => {
      toast.success(t('socket_is_live'));
    };

    ws.onclose = () => {
      toast.info(t('socket_is_closed'));
    };

    // TODO: handle errors in production to friendly messages.
    ws.onerror = (error) => {
      if (import.meta.env.VITE_API_NODE_ENV !== 'development') {
        toast.error(t('SOCKET_DOWN'));
      } else {
        toast.error(`WebSocket error occurred ❌: ${JSON.stringify(error)}`);
      }
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
  }, [token]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error(t("SOCKET_IS_NOT_CONNECTED"));
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
