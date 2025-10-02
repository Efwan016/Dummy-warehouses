// src/hooks/useUsers.js
import { useState, useEffect } from "react";

const USERS_KEY = "users";

export const useFetchUsers = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    setData(storedUsers);
    setIsPending(false);
  }, []);

  return { data, isPending };
};

export const useFetchUser = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const found = storedUsers.find((u) => u.id === id);
    setData(found || null);
  }, [id]);

  return { data };
};

export const useCreateUser = () => {
  const mutate = (payload, { onSuccess } = {}) => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const newUser = { id: Date.now(), ...payload };
    const updated = [...storedUsers, newUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));

    if (onSuccess) onSuccess(newUser);
  };
  return { mutate };
};

export const useUpdateUser = () => {
  const mutate = ({ id, ...payload }, { onSuccess } = {}) => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const updated = storedUsers.map((u) =>
      u.id === id ? { ...u, ...payload } : u
    );
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));

    if (onSuccess) onSuccess();
  };
  return { mutate };
};

export const useDeleteUser = () => {
  const mutate = (id, { onSuccess } = {}) => {
    const storedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const updated = storedUsers.filter((u) => u.id !== id);
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));

    if (onSuccess) onSuccess();
  };
  return { mutate };
};
