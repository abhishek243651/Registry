// authContext.js
import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("access_token")
  );
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem("access_token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
