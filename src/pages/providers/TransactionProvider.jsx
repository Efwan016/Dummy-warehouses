import { useState, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext"; 
import { useMerchants } from "../../hooks/useMerchants";

const TransactionProvider = ({ children }) => {
  const { data: merchant } = useMerchants({ retry: false });

  const [transaction, setTransaction] = useState(() => {
    const savedTransaction = localStorage.getItem("transactionData");
    return savedTransaction
      ? JSON.parse(savedTransaction)
      : { merchantId: merchant?.id || 0, name: "", phone: "", products: [] };
  });

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cartData");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (merchant?.id) {
      setTransaction((prev) => ({ ...prev, merchantId: merchant.id }));
    }
  }, [merchant]);

  useEffect(() => {
    localStorage.setItem("transactionData", JSON.stringify(transaction));
  }, [transaction]);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cart));
  }, [cart]);

  const clearTransaction = () => {
    setTransaction({ merchantId: merchant?.id || 0, name: "", phone: "", products: [] });
    setCart([]);
    localStorage.removeItem("transactionData");
    localStorage.removeItem("cartData");
  };

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction, cart, setCart, clearTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
