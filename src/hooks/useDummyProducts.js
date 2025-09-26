import { products } from "../data/products";

export const useFetchProduct = (id) => {
  const product = products.find((p) => p.id === id);
  return { data: products };
};
