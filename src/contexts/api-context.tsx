import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/api';
import { toast } from 'sonner';

const ApiContext = createContext(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate('/unauthorized');
          toast.error('Unauthorized. Please log in again.', {
            action: {
              label: 'Log in again',
              onClick: () => {
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = '/login'; // Clear session and localStorage
              },
            },
            duration: 100000,
          });
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return <ApiContext.Provider value={null}>{children}</ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);
