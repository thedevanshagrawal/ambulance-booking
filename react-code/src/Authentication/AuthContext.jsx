import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get("accessToken");
   
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (newToken) => {
    Cookies.set("accessToken", newToken, {
      secure: true,
      expires: 1,
      path: "/",
    }); 
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("accessToken", { path: "/" });
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
