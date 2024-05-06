import React, { createContext } from "react";
import { useLocalStorageState } from "ahooks";
import { AuthContextType, UserState } from "@/lib/types";



// Create the context


const AuthContext = createContext<AuthContextType>({
  token: "",
  user: undefined,
  setToken: () => {},
  setUser: () => {},
  setDummyAuth: () => {},
  clearDummyAuth: () => {},
});

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
