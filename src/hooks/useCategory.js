import { useState, useEffect } from "react";

const CATEGORIES_KEY = "categories";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
    setCategories(stored);
  }, []);

  const saveToStorage = (data) => {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("categoriesUpdated")); // untuk sync real-time
    } catch (err) {
      console.error("Storage limit exceeded:", err);
      alert("⚠️ LocalStorage penuh! Coba hapus data lama atau pindah ke backend.");
    }
  };

  const addCategory = (newCategory) => {
    const updated = [...categories, newCategory];
    setCategories(updated);
    saveToStorage(updated);
  };

  const updateCategory = (updatedCategory) => {
    const updated = categories.map((c) =>
      c.id === updatedCategory.id ? updatedCategory : c
    );
    setCategories(updated);
    saveToStorage(updated);
  };

  const deleteCategory = (id) => {
    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    saveToStorage(updated);
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };
};
