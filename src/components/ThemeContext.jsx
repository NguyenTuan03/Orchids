    import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider( {children} ) {
    const initialTheme = localStorage.getItem("theme") || "dark";
    const [theme, setTheme] = useState(initialTheme);
    const [user, setUser] = useState({});
    const toggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); 
    };
    const logoutUser = () => {
        setUser({});
        localStorage.removeItem("user"); 
    };
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    const value = {
        theme,
        toggle,
        user,
        loginUser,
        logoutUser,
    };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}
