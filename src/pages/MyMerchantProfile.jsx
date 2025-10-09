import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import UserProfileCard from "../components/UserProfileCard";

const MyMerchantProfile = () => {
  const [merchant, setMerchant] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Fetch merchant, products, categories, and warehouses from localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const merchants = JSON.parse(localStorage.getItem("merchants")) || [];
    const allProducts = JSON.parse(localStorage.getItem("products")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const warehouses = JSON.parse(localStorage.getItem("warehouses")) || [];

    let assignedMerchant = null;

    if (currentUser?.role === "keeper" || currentUser?.roles?.includes("keeper")) {
      assignedMerchant =
        merchants.find((m) => String(m.keeper?.id) === String(currentUser.id)) ||
        merchants.find((m) => String(m.id) === String(currentUser.merchant_id));
    } else {
      const merchantId = localStorage.getItem("merchant_id");
      assignedMerchant = merchants.find((m) => String(m.id) === String(merchantId));
    }

    if (!assignedMerchant) return;

    localStorage.setItem("merchant_id", assignedMerchant.id);

    const merchantProducts = allProducts
      .filter((p) => String(p.merchant_id) === String(assignedMerchant.id))
      .map((p) => ({
        ...p,
        category:
          categories.find((c) => String(c.id) === String(p.category_id)) || {
            name: "No Category",
            photo: "/assets/images/icons/document-text-grey.svg",
          },
        warehouse:
          warehouses.find((w) => String(w.id) === String(p.warehouse_id)) || {
            name: "No Warehouse",
          },
        pivot: { stock: p.stock ?? p.pivot?.stock ?? 0 },
        thumbnail: p.photo ?? "/assets/images/icons/box-black.svg",
      }));

    setMerchant({ ...assignedMerchant, products: merchantProducts });
  }, []);

  const handleShowDetails = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  // ===============================
  // COMPONENT CATEGORY ACCORDION
  // ===============================
  const CategoryAccordion = ({ products, onShowDetails }) => {
    const [openCategory, setOpenCategory] = useState(null);

    const grouped = products.reduce((acc, p) => {
      const cat = p.category?.name || "Uncategorized";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(p);
      return acc;
    }, {});

    return (
      <div className="flex flex-col gap-3">
        {Object.entries(grouped).map(([categoryName, items]) => (
          <div key={categoryName} className="border rounded-2xl overflow-hidden">
            {/* Header */}
            <button
              onClick={() =>
                setOpenCategory(openCategory === categoryName ? null : categoryName)
              }
              className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={items[0]?.category?.photo}
                  className="w-6 h-6"
                  alt="icon"
                />
                <p className="font-semibold text-lg">{categoryName}</p>
              </div>
              <img
                src={
                  openCategory === categoryName
                    ? "assets/images/icons/arrow-up-black.svg"
                    : "assets/images/icons/arrow-down-black.svg"
                }
                className="w-5 h-5"
                alt="toggle"
              />
            </button>

            {/* Produk */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                openCategory === categoryName ? "max-h-[999px] p-4" : "max-h-0 p-0"
              }`}
            >
              <div className="flex flex-col gap-3">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col md:flex-row md:items-center justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center gap-3 w-full md:w-[340px]">
                      <div className="flex w-16 h-16 rounded-xl bg-gray-100 items-center justify-center overflow-hidden">
                        <img
                          src={product.thumbnail}
                          className="w-full h-full object-contain"
                          alt={product.name}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-lg">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          Stock: <span className="font-medium">{product.pivot?.stock ?? 0}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 justify-between mt-3 md:mt-0 w-full md:w-auto">
                      <p className="font-semibold text-monday-blue text-lg">
                        Rp {product.price.toLocaleString("id")}
                      </p>
                      <button
                        onClick={() => onShowDetails(product)}
                        className="btn btn-primary-opacity min-w-[100px] font-semibold"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // ===============================
  // RENDER
  // ===============================
  if (!merchant)
    return (
      <div className="flex bg-gray-100 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold">My Merchant Profile</h1>
          <p>No merchant has been assigned to you.</p>
        </main>
      </div>
    );

  return (
    <>
      <div id="main-container" className="flex flex-1 min-h-screen bg-gray-50">
        <Sidebar />
        <div id="Content" className="flex flex-col flex-1 p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-6 mb-6">
            <div className="flex items-center gap-4 bg-white w-full rounded-3xl p-4 shadow-sm">
              <div className="flex flex-col gap-1 w-full">
                <h1 className="font-bold text-2xl">Manage Merchants</h1>
              </div>
              <UserProfileCard />
            </div>
          </div>

          {/* Merchant Info */}
          <main className="flex flex-col gap-6 flex-1">
            <section className="flex flex-col sm:flex-row items-center justify-between rounded-3xl p-4 gap-3 bg-white shadow-sm">
              <div className="flex w-16 h-16 rounded-2xl bg-gray-100 items-center justify-center overflow-hidden">
                <img src={merchant.photo} className="object-contain w-full h-full" alt="icon" />
              </div>
              <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
                <p className="font-semibold text-xl">{merchant.name}</p>
                <p className="flex items-center justify-center sm:justify-start gap-1 font-medium text-lg text-gray-500">
                  <img src="assets/images/icons/call-grey.svg" className="w-5 h-5" alt="icon" />
                  <span>{merchant.phone}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <p className="flex items-center gap-1 font-medium text-gray-500">
                  <img src="assets/images/icons/user-grey.svg" className="w-4 h-4" alt="icon" />
                  <span>Keeper:</span>
                </p>
                <p className="font-semibold text-lg">
                  {merchant.keeper?.name || "No Keeper Assigned"}
                </p>
              </div>
            </section>

            {/* Product List */}
            <section className="flex flex-col gap-6 flex-1 rounded-3xl p-4 bg-white shadow-sm">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex flex-col gap-[6px] text-center sm:text-left">
                  <p className="flex items-center justify-center sm:justify-start gap-[6px]">
                    <img
                      src="assets/images/icons/buildings-2-black.svg"
                      className="w-6 h-6"
                      alt="icon"
                    />
                    <span className="font-semibold text-2xl">
                      {merchant.products?.length || 0} Total Products
                    </span>
                  </p>
                  <p className="font-semibold text-lg text-gray-500">
                    View and manage your warehouse products.
                  </p>
                </div>
              </div>
              <hr className="border-gray-200" />
              <div className="flex flex-col px-1 sm:px-4 gap-4 flex-1">
                <CategoryAccordion
                  products={merchant.products}
                  onShowDetails={handleShowDetails}
                />
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-3xl p-6 w-[90%] sm:w-[420px] shadow-xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-xl">Product Details</h2>
              <button
                onClick={closeModal}
                className="flex w-10 h-10 rounded-full items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
              >
                <img
                  src="assets/images/icons/close-circle-black.svg"
                  className="w-5 h-5"
                  alt="close"
                />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex flex-col gap-1 text-center sm:text-left">
                  <p className="font-bold text-lg">{selectedProduct.name}</p>
                  <p className="text-gray-500 text-sm">
                    {selectedProduct.category?.name || "No Category"}
                  </p>
                  <p className="text-monday-blue font-semibold text-lg">
                    Rp {selectedProduct.price.toLocaleString("id")}
                  </p>
                </div>
                <div className="w-[100px] h-[100px] rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden mt-3 sm:mt-0">
                  <img
                    src={selectedProduct.thumbnail}
                    alt={selectedProduct.name}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              <hr className="border-gray-200" />

              <div>
                <p className="text-sm text-gray-500 mb-1">Stock</p>
                <p className="font-semibold">{selectedProduct.pivot?.stock ?? 0} pcs</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Warehouse</p>
                <p className="font-semibold">
                  {selectedProduct.warehouse?.name || "No Warehouse"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">About</p>
                <p className="font-medium leading-relaxed">
                  {selectedProduct.about || "No description provided."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyMerchantProfile;
