import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuth = () => {
        const loggedIn = localStorage.getItem("user");
        setIsAuthenticated(loggedIn ? true : false);
    };
    const value = {
        isAuthenticated,
        checkAuth
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};