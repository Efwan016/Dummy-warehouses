// src/hooks/useAssignUserRole.js
import { useState } from "react";

const USERS_KEY = "users";
const ROLES_KEY = "roles";

export const useAssignUserRole = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = ({ user_id, role_id }, { onSuccess } = {}) => {
    try {
      setIsPending(true);
      setError(null);

      const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const storedRoles = JSON.parse(localStorage.getItem(ROLES_KEY)) || [];

      // cari role dari localStorage
      const selectedRole = storedRoles.find((r) => r.id === role_id);
      if (!selectedRole) throw new Error("Role not found");

      // update user
      const updatedUsers = storedUsers.map((u) =>
        u.id === user_id
          ? { ...u, roleId: role_id, roles: [selectedRole.name] }
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
