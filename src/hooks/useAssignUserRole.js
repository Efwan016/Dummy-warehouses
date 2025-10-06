// src/hooks/useAssignUserRole.js
import { useState } from "react";

const USERS_KEY = "users";
const ROLES_KEY = "roles";
const MERCHANTS_KEY = "merchants";

export const useAssignUserRole = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = ({ user_id, role_id, merchant_id }, { onSuccess } = {}) => {
    try {
      setIsPending(true);
      setError(null);

      const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const storedRoles = JSON.parse(localStorage.getItem(ROLES_KEY)) || [];
      const storedMerchants = JSON.parse(localStorage.getItem(MERCHANTS_KEY)) || [];

      // cari role
      const selectedRole = storedRoles.find((r) => r.id === role_id);
      if (!selectedRole) throw new Error("Role not found");

      // cari merchant (kalau ada)
      const selectedMerchant = merchant_id
        ? storedMerchants.find((m) => String(m.id) === String(merchant_id))
        : null;

      // cari user
      const assignedUser = storedUsers.find((u) => String(u.id) === String(user_id));
      if (!assignedUser) throw new Error("User not found");

      // update user
      const updatedUsers = storedUsers.map((u) =>
        u.id === user_id
          ? {
              ...u,
              roleId: role_id,
              roles: [selectedRole.name],
              merchant_id: merchant_id || null,
              merchant_name: selectedMerchant ? selectedMerchant.name : null,
            }
          : u
      );
      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

      // 🧩 tambahin keeper ke merchant
      if (selectedMerchant && selectedRole.name.toLowerCase() === "keeper") {
        const updatedMerchants = storedMerchants.map((m) =>
          String(m.id) === String(merchant_id)
            ? {
                ...m,
                keeper: {
                  id: assignedUser.id,
                  name: assignedUser.name,
                  email: assignedUser.email,
                },
              }
            : m
        );
        localStorage.setItem(MERCHANTS_KEY, JSON.stringify(updatedMerchants));
      }

      setIsPending(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      setIsPending(false);
      setError(err);
    }
  };

  return { mutate, isPending, error };
};
