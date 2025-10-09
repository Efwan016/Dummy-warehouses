// src/hooks/useProducts.js
import { useEffect, useState } from "react";

const PRODUCTS_KEY = "products";
const CATEGORIES_KEY = "categories";
const WAREHOUSES_KEY = "warehouses";
const MERCHANTS_KEY = "merchants";

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  // Load from localStorage on start + listen perubahan
  useEffect(() => {
    const loadProducts = () => {
      const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      setProducts(stored);
    };

    loadProducts();

    // Listen event global untuk update otomatis antar komponen
    window.addEventListener("products-changed", loadProducts);
    return () => window.removeEventListener("products-changed", loadProducts);
  }, []);

  // Helper save
  const saveProducts = (data) => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(data));
    setProducts(data);
  };

  // CREATE PRODUCT + auto sync
  const createProduct = (product) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];

    const lightProduct = {
      id: product.id,
      name: product.name,
      category_id: product.category_id,
      warehouse_id: product.warehouse_id,
      merchant_id: product.merchant_id,
      photo:
        product.photo ||
        product.thumbnail ||
        product.photoUrl ||
        product.imagePreview ||
        "",
      price: product.price,
      stock: product.stock || 0,
    };

    const updated = [...stored, lightProduct];
    saveProducts(updated);

    // Update relasi
    syncEntitiesAfterChange(lightProduct, "add");

    window.dispatchEvent(new Event("products-changed"));
  };

  // DELETE PRODUCT + sync
  const deleteProduct = (id) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const target = stored.find((p) => Number(p.id) === Number(id));

    const updatedProducts = stored.filter((p) => Number(p.id) !== Number(id));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));

    // Sync ke entitas lain
    if (target) syncEntitiesAfterChange(target, "remove");

    window.dispatchEvent(new Event("products-changed"));
  };

  // UPDATE PRODUCT
  const updateProduct = (id, updatedData) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    const updated = stored.map((p) =>
      Number(p.id) === Number(id) ? { ...p, ...updatedData } : p
    );
    saveProducts(updated);
    window.dispatchEvent(new Event("products-changed"));
  };

  const getProduct = (id) => {
    const stored = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    return stored.find((p) => Number(p.id) === Number(id)) || null;
  };

  // --- 🔄 Utility untuk sinkron relasi ---
  const syncEntitiesAfterChange = (product, action) => {
    // CATEGORY
    const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];
    const updatedCategories = categories.map((c) => {
      if (Number(c.id) === Number(product.category_id)) {
        const productIds = new Set(c.productIds || []);
        action === "add" ? productIds.add(product.id) : productIds.delete(product.id);
        return { ...c, productIds: [...productIds], totalProducts: productIds.size };
      }
      return c;
    });
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));

    // WAREHOUSE
    const warehouses = JSON.parse(localStorage.getItem(WAREHOUSES_KEY)) || [];
    const updatedWarehouses = warehouses.map((w) => {
      if (Number(w.id) === Number(product.warehouse_id)) {
        const productIds = new Set(w.productIds || []);
        action === "add" ? productIds.add(product.id) : productIds.delete(product.id);
        return { ...w, productIds: [...productIds], totalProducts: productIds.size };
      }
      return w;
    });
    localStorage.setItem(WAREHOUSES_KEY, JSON.stringify(updatedWarehouses));

    // MERCHANT
    const merchants = JSON.parse(localStorage.getItem(MERCHANTS_KEY)) || [];
    const updatedMerchants = merchants.map((m) => {
      if (Number(m.id) === Number(product.merchant_id)) {
        const productIds = new Set(m.productIds || []);
        action === "add" ? productIds.add(product.id) : productIds.delete(product.id);
        return { ...m, productIds: [...productIds], totalProducts: productIds.size };
      }
      return m;
    });
    localStorage.setItem(MERCHANTS_KEY, JSON.stringify(updatedMerchants));
  };

  return {
    products,
    createProduct,
    deleteProduct,
    updateProduct,
    getProduct,
  };
};
