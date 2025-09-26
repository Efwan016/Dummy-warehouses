import { createContext, useContext, useState } from "react";

// 1. Buat context
const AuthContext = createContext();

// 2. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading] = useState(true);

  // fungsi login
  const login = (username, password) => {
    let newUser = null;

    // dummy login check
    if (username === "admin@example.com" && password === "admin123") {
      newUser = {
        name: "Admin User",
        email: username,
        roles: ["manager"],
        photo: "/assets/images/avatar/Avatar-1.png",
      };
    } else if (username === "keeper@example.com" && password === "keeper123") {
      newUser = {
        name: "Warehouse Keeper",
        email: username,
        roles: ["keeper"],
        photo: "/assets/images/avatar/Keeper.png",
      };
    }

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
      return { success: true };
    }

    return { success: false, message: "Invalid credentials" };
  };

  // fungsi logout
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

// 3. Hook biar gampang dipakai di component lain
export const useAuth = () => useContext(AuthContext);
