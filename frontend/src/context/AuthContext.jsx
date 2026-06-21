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
    if (!user?._id) return;
    const updated = await userService.updateUser(user._id, values);
    setUser(updated);
    setUsers((prev) => prev.map((u) => (u._id === updated._id ? updated : u)));
    return updated;
  };

  const updateUserById = async (id, values) => {
    const updated = await userService.updateUser(id, values);
    setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));
    return updated;
  };

  const getUserById = async (id) => {
    const user = await userService.getUserById(id);
    return user;
  };

  const deleteUser = async (id) => {
    const deletedUser = await userService.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u._id !== id));
    return deletedUser;
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
        updateUserById,
        getUserById,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
