import { createContext, useContext, useState, useEffect } from "react";

// 1. Buat context
const AuthContext = createContext();

// 2. Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // biar bisa cek persistent login

  // cek localStorage saat app pertama kali load
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // fungsi login
  const login = (username, password) => {
    let newUser = null;

    // dummy login check
    if (username === "admin@example.com" && password === "admin123") {
      newUser = {
        name: "Admin User",
        email: username,
        roles: ["manager"], // manager role
        photo: "/assets/images/icons/default-avatar.svg",
      };
    } else if (username === "keeper@example.com" && password === "keeper123") {
      newUser = {
        name: "Warehouse Keeper",
        email: username,
        roles: ["keeper"], // keeper role
        photo: "/assets/images/icons/default-avatar.svg",
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
