import { useState, useEffect } from "react";

// KEY buat localStorage
const STORAGE_KEY = "roles";
const USERS_KEY = "users";

export const useRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    let storedRoles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    // kalau belum ada role sama sekali → seed default
    if (storedRoles.length === 0) {
      storedRoles = [
        { id: 1, name: "manager" },
        { id: 2, name: "keeper" },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedRoles));
    }

    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    // hitung jumlah user per role + simpan list user
    const rolesWithUsers = storedRoles.map((role) => {
      const usersInRole = storedUsers.filter((user) => user.roleId === role.id);
      return { 
        ...role, 
        users_web_count: usersInRole.length,
        users: usersInRole // simpan list usernya
      };
    });

    setRoles(rolesWithUsers);
  }, []);

  const addRole = (role) => {
    const storedRoles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const newRole = { id: Date.now(), ...role };
    const updated = [...storedRoles, newRole];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRoles(updated);
  };

  const updateRole = (id, updatedRole) => {
    const storedRoles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const updated = storedRoles.map((role) =>
      role.id === id ? { ...role, ...updatedRole } : role
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setRoles(updated);
  };

  const getRoleById = (id) => {
    const storedRoles = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    return storedRoles.find((role) => role.id === id);
  };

  return { roles, addRole, updateRole, getRoleById };
};
