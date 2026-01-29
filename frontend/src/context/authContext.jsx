import { createContext, useContext, useState } from "react";
import userService from "../services/userService";

const AuthContext = createContext();
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(userService.getUser());

  const createUser = async (values) => {
    const newUser = await userService.createUser(values);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const refreshUser = () => setUser(userService.getUser());

  const login = async (values) => {
    const loggedInUser = await userService.login(values);
    refreshUser();
    return loggedInUser;
  };

  const logout = () => {
    userService.logout();
    refreshUser();
  };

  return (
    <AuthContext.Provider value={{ users, user, createUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
