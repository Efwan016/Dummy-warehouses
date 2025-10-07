// src/hooks/useLocalTransactions.js
import { useEffect, useState } from "react";

const TRANSACTIONS_KEY = "transactions";

export const useFetchAllTransactions = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);
    const stored = JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];
    setData(Array.isArray(stored) ? stored : []);
    setIsPending(false);
  }, []);

  return { data, isPending };
};
