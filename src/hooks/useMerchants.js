import { useState } from "react";
import {
  getMerchants,
  getMerchantById,
  deleteMerchant as removeMerchant,
} from "../data/merchants";

export const useMerchants = () => {
  const [data, setData] = useState(getMerchants());

  const getMerchant = (id) => getMerchantById(id);

  const deleteMerchant = (id) => {
    removeMerchant(id);
    setData(getMerchants()); // refresh state setelah hapus
  };

  return { merchants: data, getMerchant, deleteMerchant };
};
