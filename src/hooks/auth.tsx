import { createContext, ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({});

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={[]}>
      { children }
    </AuthContext.Provider>
  );
}

export { AuthProvider };
