import React, { createContext, useEffect } from 'react';
import { useLocalStorageState } from 'ahooks';
import { AuthContextType, UserState } from '@/lib/types';
import { useGetMe } from '@/api';

// Create the context

const AuthContext = createContext<AuthContextType>({
  token: '',
  user: undefined,
  setToken: () => {},
  setUser: () => {},
});

// Create a provider component to wrap your app with
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getMeFn = useGetMe();

  // Define the state for the tokens and user using localStorageState for persistence
  const [token, setToken] = useLocalStorageState<string | undefined>(
    'x-auth-token',
    {
      defaultValue: '',
    }
  );

  const [user, setUser] = useLocalStorageState<UserState | undefined>(
    'x-auth-user',
    {
      defaultValue: undefined,
    }
  );

  useEffect(() => {
    const getMeCall = async () => {
      const response = await getMeFn.mutateAsync();
      setUser(response.data);
    };
    if (token && !user) {
      getMeCall();
    }
  }, [token]);

  // Create a value object to pass to the context provider
  const contextValue: AuthContextType = {
    token,
    user,
    setToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
