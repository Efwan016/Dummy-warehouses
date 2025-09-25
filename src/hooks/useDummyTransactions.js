import { transactions } from "../data/transactions";

export const useFetchAllTransactions = () => {
  return { data: transactions, isPending: false };
};
