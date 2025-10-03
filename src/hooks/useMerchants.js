import { useState } from "react";
import { getMerchants, getMerchantById, deleteMerchant as removeMerchant } from "../data/merchants";

export const useMerchants = () => {
  const [merchants, setMerchants] = useState(getMerchants());

  const getMerchant = (id) => getMerchantById(id);

  const deleteMerchant = (id) => {
    removeMerchant(id);
    setMerchants(getMerchants());
  };

  return { merchants, getMerchant, deleteMerchant };
};
