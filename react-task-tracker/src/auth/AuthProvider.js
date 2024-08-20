import React, { createContext, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(localStorage.getItem('token') || '');

    const setToken = (token) => {
        localStorage.setItem("token", token);
        setAuth(token);
      };

      const logout = () => {
        localStorage.removeItem("token");
        setAuth("");
      };


    return (
        <AuthContext.Provider value={{ auth, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;