// src/hooks/useAssignUserRole.js
import { useState } from "react";

const USERS_KEY = "users";

export const useAssignUserRole = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const mutate = ({ user_id, role_id }, { onSuccess } = {}) => {
    try {
      setIsPending(true);
      setError(null);

      const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const updated = storedUsers.map((u) =>
        u.id === user_id ? { ...u, roleId: role_id } : u
      );
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));

      setIsPending(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setIsPending(false);
      setError(err);
    }
  };

  return { mutate, isPending, error };
};
