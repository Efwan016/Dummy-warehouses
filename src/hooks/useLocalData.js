import { useState, useEffect } from "react";

export const useLocalData = (key, initialValue = []) => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  const addItem = (item) => {
    setData((prev) => [...prev, { id: Date.now(), ...item }]);
  };

  const updateItem = (id, updates) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  return { data, addItem, updateItem, deleteItem };
};
