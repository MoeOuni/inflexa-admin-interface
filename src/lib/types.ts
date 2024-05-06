
// Define the type for the user state
export type UserState = {
    id: string;
    image?: string;
    firstName: string;
    lastName: string;
    email: string;
  };

export type AuthContextType = {
    token: string | undefined;
    user: UserState | undefined;
    setToken: React.Dispatch<React.SetStateAction<string | undefined>>;
    setUser: React.Dispatch<React.SetStateAction<UserState | undefined>>;
    setDummyAuth: () => void | undefined;
    clearDummyAuth: () => void | undefined;
  };