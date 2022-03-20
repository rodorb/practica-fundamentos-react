import { createContext, useContext } from 'react';
const AuthContext = createContext();
export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

export const useAuthContext = () => {
    return useContext(AuthContext);
}