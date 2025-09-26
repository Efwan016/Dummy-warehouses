import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";

// Global mock
let initialProducts = products

export const useProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);

  const createProduct = (data) => {
    const newProduct = { id: Date.now(), ...data, category: { id: data.category_id, name: `Category ${data.category_id}`, photo: "/assets/images/icons/category-1.svg" } };
    setProducts(prev => [...prev, newProduct]);
    initialProducts = [...products, newProduct]; // update global mock
    navigate("/products");
  };

  const updateProduct = (id, data) => {
    const updatedList = products.map(p => p.id === Number(id) ? { ...p, ...data, category: { id: data.category_id, name: `Category ${data.category_id}`, photo: "/assets/images/icons/category-1.svg" } } : p);
    setProducts(updatedList);
    initialProducts = updatedList;
    navigate("/products");
  };

  const deleteProduct = (id) => {
    const filtered = products.filter(p => p.id !== Number(id));
    setProducts(filtered);
    initialProducts = filtered;
  };

  const getProduct = (id) => products.find(p => p.id === Number(id));

  return { products, createProduct, updateProduct, deleteProduct, getProduct };
};
