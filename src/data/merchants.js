// src/data/merchants.js
const STORAGE_KEY = "merchants";

// Ambil semua merchants
export const getMerchants = () => {
  const merchants = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return merchants;
};

// Ambil by id
export const getMerchantById = (id) => {
  const merchants = getMerchants();
  return merchants.find((m) => String(m.id) === String(id));
};

// Add merchant
export const addMerchant = (merchant) => {
  const merchants = getMerchants();
  merchants.push(merchant);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};

// Update merchant
export const updateMerchant = (id, updatedData) => {
  let merchants = getMerchants();
  merchants = merchants.map((m) =>
    String(m.id) === String(id) ? { ...m, ...updatedData } : m
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};
// Delete merchant
export const deleteMerchant = (id) => {
  let merchants = getMerchants();
  merchants = merchants.filter((m) => String(m.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};
