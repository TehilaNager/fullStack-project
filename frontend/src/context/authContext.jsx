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
    await userService.login(values);
    refreshUser();
    return userService.getUser();
  };

  const logout = () => {
    userService.logout();
    refreshUser();
  };

  const updateUser = async (values) => {
    const currentUser = userService.getUser();
    if (!currentUser?._id) return;
    const updated = await userService.updateUser(currentUser._id, values);
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
    return updated;
  };

  const getUserById = async (id) => {
    const user = await userService.getUserById(id);
    return user;
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        createUser,
        login,
        logout,
        updateUser,
        getUserById,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
