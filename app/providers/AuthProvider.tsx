'use client';

import { createContext, useContext, ReactNode } from 'react';
import useCurrentUser from '../hooks/use-current-user.hook';

interface State {
    user: any;
    loggedIn: any;
    logIn: any;
    logOut: any;
}

const AuthContext = createContext<State | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, loggedIn, logIn, logOut] = useCurrentUser();

    return (
        <AuthContext.Provider
            value={{
                user,
                loggedIn,
                logIn,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = (): State => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }

    return context;
};