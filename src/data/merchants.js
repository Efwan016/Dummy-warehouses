// src/data/merchants.js

const STORAGE_KEY = "merchants";

// ✅ Ambil semua merchant dari localStorage
export const getMerchants = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

// ✅ Ambil merchant berdasarkan ID
export const getMerchantById = (id) => {
  const merchants = getMerchants();
  return merchants.find((m) => m.id === Number(id));
};

// ✅ Tambah merchant baru (otomatis kasih ID + default photo)
export const addMerchant = (data) => {
  const merchants = getMerchants();

  const newMerchant = {
    id: Date.now(),
    name: data.name,
    phone: data.phone || "",
    address: data.address || "",
    photo: data.photo || "/assets/images/icons/merchant-default.svg",
    productIds: [],
  };

  const updated = [...merchants, newMerchant];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

// ✅ Update merchant berdasarkan ID
export const updateMerchant = (id, updatedData) => {
  const merchants = getMerchants().map((m) =>
    m.id === Number(id) ? { ...m, ...updatedData } : m
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};

// ✅ Hapus merchant berdasarkan ID
export const deleteMerchant = (id) => {
  const merchants = getMerchants().filter((m) => m.id !== Number(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merchants));
};
