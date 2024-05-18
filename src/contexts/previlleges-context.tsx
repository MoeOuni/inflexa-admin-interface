import React, { createContext, useContext, useEffect, useState } from "react";
import type { PrevilageContextType, Previlage } from "@/lib/types";
import { AuthContext } from "./auth-context";

const PrevilagesContext = createContext<PrevilageContextType>({
  previlages: [],
  setPrevilages: () => {},
});

const PrevilagesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useContext(AuthContext);  
  const [previlages, setPrevilages] = useState<Previlage[] | undefined>(
    undefined
  );

  async function fetchPrevilages(token: string) {
    // Fetch the previlages from the server using the user token,
    // setPrevilages(data);
  }

  useEffect(() => {
    // fetchPrevilages(token);
  }, [token])

  const contextValue = {
    previlages,
    setPrevilages,
  };

  return (
    <PrevilagesContext.Provider value={contextValue}>
      {children}
    </PrevilagesContext.Provider>
  );
};

export { PrevilagesContextProvider, PrevilagesContext };
