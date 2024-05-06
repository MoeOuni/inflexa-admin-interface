import React, { createContext } from "react";
import { useLocalStorageState } from "ahooks";

// Define the type for the user state
type UserState = {
  id: string;
  image?: string;
  firstName: string;
  lastName: string;
  email: string;
};

// Create the context
type AuthContextType = {
  token: string | undefined;
  user: UserState | undefined;
  setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<UserState | undefined>>;
  setDummyAuth: () => void;
  clearDummyAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component to wrap your app with
const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Define the state for the tokens and user using localStorageState for persistence
  const [token, setToken] = useLocalStorageState<string | undefined>(
    "x-auth-token",
    {
      defaultValue: "",
    }
  );
  const [user, setUser] = useLocalStorageState<UserState | undefined>(
    "x-auth-user",
    {
      defaultValue: undefined,
    }
  );

  const setDummyAuth = () => {
    setToken("dummy-token");
    setUser({
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "jhon.doe@email.com",
      image: "https://github.com/shadcn.png",
    });
  };

  const clearDummyAuth = () => {
    setToken(undefined);
    setUser(undefined);
  }

  // Create a value object to pass to the context provider
  const contextValue: AuthContextType = {
    token,
    user,
    setToken,
    setUser,
    setDummyAuth,
    clearDummyAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
