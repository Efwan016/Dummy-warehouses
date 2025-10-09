// src/data/categories.js
const STORAGE_KEY = "categories";

// ✅ Ambil semua categories dari localStorage
export const getCategories = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// ✅ Ambil satu category by id
export const getCategoryById = (id) => {
  const categories = getCategories();
  return categories.find((c) => String(c.id) === String(id));
};

// ✅ Tambah category baru
export const addCategory = (category) => {
  const categories = getCategories();
  const updated = [...categories, category];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// ✅ Update category
export const updateCategory = (id, updatedData) => {
  const categories = getCategories().map((c) =>
    String(c.id) === String(id) ? { ...c, ...updatedData } : c
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

// ✅ Hapus category
export const deleteCategory = (id) => {
  const categories = getCategories().filter(
    (c) => String(c.id) !== String(id)
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};
