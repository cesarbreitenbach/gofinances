import React, { createContext, ReactNode, useContext } from 'react';

const AuthContext = createContext([]);

interface AuthProviderProps {
    children: ReactNode;
}


function AuthProvider({children}: AuthProviderProps) {
    return (
    <AuthContext.Provider value={[]}> 
        {children}
    </AuthContext.Provider> );
}

function useAuth() {
   const context = useContext(AuthContext);
   
   return context;
}

export { useAuth, AuthProvider }