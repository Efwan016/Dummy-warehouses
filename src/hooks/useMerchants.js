// useMerchants.js
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

  useEffect(() => {
    setMerchants(getMerchants());
  }, []);

  const addMerchant = (merchant) => {
    addMerchantLS(merchant);
    setMerchants(getMerchants());
  };

  const updateMerchant = (id, updatedData) => {
    updateMerchantLS(id, updatedData);
    setMerchants(getMerchants());
  };

  const deleteMerchant = (id) => {
    deleteMerchantLS(id);
    setMerchants(getMerchants());
  };

  const getMerchant = (id) => getMerchantById(id);

  return { merchants, addMerchant, updateMerchant, deleteMerchant, getMerchant };
};
