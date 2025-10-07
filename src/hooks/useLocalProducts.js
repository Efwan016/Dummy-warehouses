// src/hooks/useLocalProducts.js
import { useState, useEffect } from "react";

const PRODUCTS_KEY = "products";

/**
 * Hook untuk mengambil 1 produk berdasarkan productId dari localStorage
 */
export const useFetchProduct = (productId) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);

    try {
      const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      if (!Array.isArray(stored)) throw new Error("Invalid products data");

      // Jika productId kosong, langsung null
      if (!productId) {
        setData(null);
        setIsPending(false);
        return;
      }

      const product = stored.find((p) => p.id === productId);
      setData(product || null);
    } catch (error) {
      console.error("Failed to fetch product from localStorage:", error);
      setData(null);
    } finally {
      setIsPending(false);
    }
  }, [productId]);

  return { data, isPending };
};

/**
 * Hook untuk mengambil semua produk dari localStorage
 */
export const useFetchAllProducts = () => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    setIsPending(true);
    try {
      const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      setData(Array.isArray(stored) ? stored : []);
    } catch (error) {
      console.error("Failed to load all products:", error);
      setData([]);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { data, isPending };
};
