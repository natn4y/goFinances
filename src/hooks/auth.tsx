import { createContext, ReactNode, useContext } from "react";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

import * as AuthSession from "expo-auth-session";

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
  signInWithGoogle: () => Promise<void>;
}

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: "1",
    name: "Sarah",
    email: "sarah@anonymous.com",
  };

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl });
      console.log(response);

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
