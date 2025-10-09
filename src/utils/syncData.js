export const syncWarehouseAndMerchantProducts = () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];
  const merchants = JSON.parse(localStorage.getItem("merchants")) || [];

  // 🔁 Sinkron untuk Warehouse
  const updatedWarehouses = warehouses.map((warehouse) => {
    const warehouseProducts = products.filter(
      (p) => p.warehouse_id === warehouse.id
    );
    return {
      ...warehouse,
      productIds: warehouseProducts.map((p) => p.id),
      products: warehouseProducts,
    };
  });

  // 🔁 Sinkron untuk Merchant
  const updatedMerchants = merchants.map((merchant) => {
    const merchantProducts = products.filter(
      (p) => p.merchant_id === merchant.id
    );
    return {
      ...merchant,
      productIds: merchantProducts.map((p) => p.id),
      products: merchantProducts,
    };
  });

  // 💾 Simpan ulang ke localStorage
  localStorage.setItem("warehouses", JSON.stringify(updatedWarehouses));
  localStorage.setItem("merchants", JSON.stringify(updatedMerchants));
};
