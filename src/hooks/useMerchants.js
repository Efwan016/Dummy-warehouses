// src/hooks/useMerchants.js
import { useState, useEffect } from "react";
import {
  getMerchants,
  getMerchantById,
  addMerchant as addMerchantLS,
  updateMerchant as updateMerchantLS,
  deleteMerchant as deleteMerchantLS,
} from "../data/merchants";

export const useMerchants = () => {
  const [merchants, setMerchants] = useState([]);

  const loadMerchants = () => setMerchants(getMerchants());

  useEffect(() => {
    loadMerchants();

    // 🔔 Listener untuk update otomatis kalau product berubah
    const handleProductsChange = () => loadMerchants();
    window.addEventListener("products-changed", handleProductsChange);

    return () => {
      window.removeEventListener("products-changed", handleProductsChange);
    };
  }, []);

  const addMerchant = (merchant) => {
    addMerchantLS(merchant);
    loadMerchants();
  };

  const updateMerchant = (id, updatedData) => {
    updateMerchantLS(id, updatedData);
    loadMerchants();
  };

  const deleteMerchant = (id) => {
    deleteMerchantLS(id);
    loadMerchants();
  };

  const getMerchant = (id) => getMerchantById(id);

  return { merchants, addMerchant, updateMerchant, deleteMerchant, getMerchant };
};
