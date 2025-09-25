export const transactions = [
  {
    id: 1,
    name: "John Doe",
    phone: "08123456789",
    merchant: { id: 1, name: "Merchant A" },
    grand_total: 150000,
    transaction_products: [
      {
        id: 101,
        quantity: 2,
        price: 50000,
        product: {
          id: 1,
          name: "Product 1",
          thumbnail: "/assets/images/products/product-1.png",
          category: { id: 1, name: "Category A", photo: "/assets/images/icons/Makeup-black.svg" }
        }
      },
      {
        id: 102,
        quantity: 1,
        price: 50000,
        product: {
          id: 2,
          name: "Product 2",
          thumbnail: "/assets/images/products/product-2.png",
          category: { id: 2, name: "Category B", photo: "/assets/images/icons/Makeup-black.svg" }
        }
      }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "08987654321",
    merchant: { id: 2, name: "Merchant B" },
    grand_total: 200000,
    transaction_products: [
      {
        id: 201,
        quantity: 4,
        price: 50000,
        product: {
          id: 3,
          name: "Product 3",
          thumbnail: "/assets/images/products/product-3.png",
          category: { id: 3, name: "Category C", photo: "/assets/images/icons/Makeup-black.svg" }
        }
      }
    ]
  }
];
