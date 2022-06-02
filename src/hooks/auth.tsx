import React, { createContext, ReactNode, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axiosClient = axios.create();
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
    children: ReactNode;
}

interface UserProps {
    id: string;
    email: string;
    name: string;
    photo?: string;
}

interface AuthResponse {
    params: {
        access_token: string;
    },
    type: string;
}
interface IAuthContextData {
    user: UserProps;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>; 
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({} as UserProps);

    async function saveUserOnAsyncStorage(user: UserProps) {
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(user));
    }

    async function signInWithGoogle(){
        try {
            const RESPONSE_TYPE= 'token';
            const SCOPE = encodeURI('https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email');

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { type, params } = await AuthSession.startAsync({authUrl}) as AuthResponse;
      
            if (type === 'success') {
              const response = await axiosClient.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)  

              const user: UserProps = {
                id: response.data.id,
                name: response.data.given_name,
                photo: response.data.picture,
                email: response.data.email,
              }

              setUser(user);
              saveUserOnAsyncStorage(user);
            }
            
        } catch(error: any) {
            throw new Error(error);
        }
    }

    async function signInWithApple(){
        try {
            const credentials = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ]
            });
            if (credentials) {
                const user: UserProps = {
                    id: String(credentials.user),
                    name: credentials.fullName!.givenName!,
                    photo: undefined,
                    email: credentials.email!,
                }
                setUser(user);
                saveUserOnAsyncStorage(user);
                console.log(JSON.stringify(user));
            }
        } catch (error) {
            
        }
    }



    return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple}}> 
        {children}
    </AuthContext.Provider> );
}

function useAuth() {
   const context = useContext(AuthContext);

   return context;
}

export { useAuth, AuthProvider }