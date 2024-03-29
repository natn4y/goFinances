import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IAuthContextData);

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
  picture?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
  singInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
  userStorageLoading: boolean;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const userStorageKey = "@gofinances:users";
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({ authUrl })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        });
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userInfo));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function singInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));

      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(userStorageKey);
  }

  async function loadUserStorageDate() {
    const userStorage = await AsyncStorage.getItem(userStorageKey);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as User;
      setUser(userLogged);
    }
    setUserStorageLoading(false);
  }
  useEffect(() => {
    loadUserStorageDate();
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        singInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
