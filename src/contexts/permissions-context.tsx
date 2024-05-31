import React, { createContext, useContext, useEffect, useState } from "react";
import type { PermissionContextType, Permission } from "@/lib/types";
import { AuthContext } from "./auth-context";

const PermissionsContext = createContext<PermissionContextType>({
  permissions: [],
  setPermissions: () => {},
});

const PermissionsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { token } = useContext(AuthContext);  
  const [permissions, setPermissions] = useState<Permission[] | undefined>(
    undefined
  );

  async function fetchPermissions(token: string) {
    // Fetch the permissions from the server using the user token,
    // setPermissions(data);
  }

  useEffect(() => {
    // fetchPermissions(token);
  }, [token])

  const contextValue = {
    permissions,
    setPermissions,
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export { PermissionsContextProvider, PermissionsContext };
