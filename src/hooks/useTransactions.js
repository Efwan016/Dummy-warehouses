// src/hooks/useTransactions.js
export const useTransactions = () => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  return { transactions };
};

// src/hooks/useMerchant.js
export const useMerchant = () => {
  const merchant = JSON.parse(localStorage.getItem("merchant")) || {
    id: 1,
    name: "Dummy Merchant",
    phone: "08123456789",
    keeper: "John Doe",
    photo: "/assets/images/icons/shop.png",
  };
  return { merchant };
};

// src/hooks/useProducts.js
const dummyProducts = [
  { id: 1, name: "Product A", price: 10000, about: "Info A", category: { name: "Cat A", photo: "/assets/images/icons/box-black.svg" }, thumbnail: "/assets/images/icons/product.png" },
  { id: 2, name: "Product B", price: 20000, about: "Info B", category: { name: "Cat B", photo: "/assets/images/icons/box-black.svg" }, thumbnail: "/assets/images/icons/product.png" },
];
export const useProducts = () => {
  const getProductById = (id) => dummyProducts.find((p) => p.id === id);
  return { getProductById };
};
