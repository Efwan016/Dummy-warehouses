// src/data/merchants.js
const STORAGE_KEY = "merchants";

// ✅ ambil semua merchant dari localStorage
export const getMerchants = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// ✅ ambil merchant berdasarkan id
export const getMerchantById = (id) => {
  const merchants = getMerchants();
  return merchants.find((m) => m.id === id);
};

// ✅ tambah merchant baru tanpa menghapus data lama
export const addMerchant = (merchant) => {
  const merchants = getMerchants();
  const updated = [...merchants, merchant];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// ✅ update merchant berdasarkan id
export const updateMerchant = (id, updatedData) => {
  const merchants = getMerchants().map((m) =>
    m.id === id ? { ...m, ...updatedData } : m
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};

// ✅ hapus merchant berdasarkan id
export const deleteMerchant = (id) => {
  const merchants = getMerchants().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};
