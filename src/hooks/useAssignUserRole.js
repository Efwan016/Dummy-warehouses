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
      const storedMerchants =
        JSON.parse(localStorage.getItem(MERCHANTS_KEY)) || [];

      // cari role
      const selectedRole = storedRoles.find((r) => r.id === role_id);
      if (!selectedRole) throw new Error("Role not found");

      // cari merchant (kalau ada)
      const selectedMerchant = merchant_id
        ? storedMerchants.find((m) => m.id === merchant_id)
        : null;

      // update user di localStorage
      const updatedUsers = storedUsers.map((u) =>
        u.id === user_id
          ? {
              ...u,
              roleId: role_id,
              roles: [selectedRole.name], // simpan nama role
              merchant_id: merchant_id || null, // simpan merchant id
              merchant_name: selectedMerchant ? selectedMerchant.name : null, // optional: simpan nama merchant juga
            }
          : u
      );

      localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

      setIsPending(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setIsPending(false);
      setError(err);
    }
  };

  return { mutate, isPending, error };
};
