import { createContext, useContext, useState } from "react";
import userService from "../services/userService";

const AuthContext = createContext();
AuthContext.displayName = "Auth";

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);

  const createUser = async (values) => {
    const newUser = await userService.createUser(values);
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const login = async (values) => {
    const user = await userService.login(values);
    return user;
  };

  return (
    <AuthContext.Provider value={{ users, createUser, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
