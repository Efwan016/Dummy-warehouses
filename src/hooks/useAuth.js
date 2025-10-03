import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const USERS_KEY = "users";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading] = useState(true);

  const login = (email, password) => {
    let newUser = null;
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    // 🔹 1. cek di localStorage dulu
    const foundUser = storedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const normalizedUser = {
        ...foundUser,
        roles: foundUser.roles || [foundUser.role || "guest"], // pastikan roles jadi array
      };
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
      return { success: true };
    }

    // 🔹 2. fallback ke dummy login check
    if (email === "admin@example.com" && password === "admin123") {
      newUser = {
        name: "Admin User",
        email,
        roles: ["manager"],
        photo: "/assets/images/avatar/Avatar-1.png",
      };
    } else if (email === "keeper@example.com" && password === "keeper123") {
      newUser = {
        name: "Warehouse Keeper",
        email,
        roles: ["keeper"],
        photo: "/assets/images/avatar/Keeper.png",
      };
    }

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    }

    return { success: false, message: "Email atau password salah!" };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
