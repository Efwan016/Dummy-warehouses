// src/hooks/useProducts.js
import { useEffect, useState } from "react";

const PRODUCTS_KEY = "products";
const CATEGORIES_KEY = "categories";
const WAREHOUSES_KEY = "warehouses";
const MERCHANTS_KEY = "merchants";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Load from localStorage on start
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    setProducts(stored);
  }, []);

  // Save helper
  const saveProducts = (data) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
    setProducts(data);
  };

  // CREATE PRODUCT + auto sync
  const createProduct = (product) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];

    // Simpan data ringan saja
    const lightProduct = {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      warehouse_id: product.warehouse_id,
      merchant_id: product.merchant_id,
      photo: product.thumbnail || product.photoUrl,
      price: product.price,
    };

    const updated = [...stored, lightProduct];
    saveProducts(updated);

    // Update entity lain pakai product.id
    // Category
    if (product.category_id) {
      const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
      const updatedCategories = categories.map(c =>
        c.id === Number(product.category_id)
          ? { ...c, productIds: [...(c.productIds || []), product.id] }
          : c
      );
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
    }

    // Warehouse
    if (product.warehouse_id) {
      const warehouses = JSON.parse(localStorage.getItem(WAREHOUSES_KEY)) || [];
      const updatedWarehouses = warehouses.map(w =>
        w.id === Number(product.warehouse_id)
          ? { ...w, productIds: [...(w.productIds || []), product.id] }
          : w
      );
      localStorage.setItem(WAREHOUSES_KEY, JSON.stringify(updatedWarehouses));
    }

    // Merchant
    if (product.merchant_id) {
      const merchants = JSON.parse(localStorage.getItem(MERCHANTS_KEY)) || [];
      const updatedMerchants = merchants.map(m =>
        m.id === Number(product.merchant_id)
          ? { ...m, productIds: [...(m.productIds || []), product.id] }
          : m
      );
      localStorage.setItem(MERCHANTS_KEY, JSON.stringify(updatedMerchants));
    }

    // dispatch
    window.dispatchEvent(new Event("products-changed"));
  };

  // DELETE PRODUCT + sync
  const deleteProduct = (id) => {
    // 1️⃣ Hapus product dari products
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const updatedProducts = stored.filter((p) => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));

    // 2️⃣ Hapus productId dari categories
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
    const updatedCategories = categories.map(c => ({
      ...c,
      productIds: (c.productIds || []).filter(pid => pid !== id)
    }));
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));

    // 3️⃣ Hapus productId dari warehouses
    const warehouses = JSON.parse(localStorage.getItem(WAREHOUSES_KEY)) || [];
    const updatedWarehouses = warehouses.map(w => ({
      ...w,
      productIds: (w.productIds || []).filter(pid => pid !== id)
    }));
    localStorage.setItem(WAREHOUSES_KEY, JSON.stringify(updatedWarehouses));

    // 4️⃣ Hapus productId dari merchants
    const merchants = JSON.parse(localStorage.getItem(MERCHANTS_KEY)) || [];
    const updatedMerchants = merchants.map(m => ({
      ...m,
      productIds: (m.productIds || []).filter(pid => pid !== id)
    }));
    localStorage.setItem(MERCHANTS_KEY, JSON.stringify(updatedMerchants));

    // 5️⃣ Dispatch event supaya semua list update
    window.dispatchEvent(new Event("products-changed"));
  };


  // UPDATE PRODUCT
  const updateProduct = (id, updatedData) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const updated = stored.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
    saveProducts(updated);

    window.dispatchEvent(new Event("products-changed"));
  };

  const getProduct = (id) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    return stored.find((p) => p.id === id) || null;
  };

  return {
    products,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
  };
};
