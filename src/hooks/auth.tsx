import { createContext, ReactNode, useContext } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
}

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "Sarah",
    email: "sarah@anonymous.com",
  };

  return (
    <AuthContext.Provider
      value={
        { user }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
