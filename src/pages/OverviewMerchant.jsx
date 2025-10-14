import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import UserProfileCard from "../components/UserProfileCard";

// ✅ Ambil data dari localStorage langsung
const getLocalData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const OverviewMerchant = () => {
  // Ambil semua data lokal
  const transactions = getLocalData("transactions");

  // Hitung total revenue & produk terjual
  const totalRevenue = transactions.reduce((sum, tx) => sum + (tx.grand_total || 0), 0);
  const totalProductsSold = transactions.reduce(
    (sum, tx) => sum + tx.transaction_products?.reduce((acc, p) => acc + (p.quantity || 0), 0),
    0
  );

  const latestTransactions = transactions.slice(0, 4);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openTransactionIds, setOpenTransactionIds] = useState([]);

  const toggleAccordion = (id) => {
    setOpenTransactionIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  return (
    <>
      <div id="main-container" className="flex flex-1">
        <Sidebar />
        <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
          {/* Header */}
          <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
            <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px] shadow">
              <div className="flex flex-col gap-[6px] w-full">
                <h1 className="font-bold text-2xl">Merchant Overview</h1>
              </div>
              <div className="flex items-center flex-nowrap gap-3">
                <button
                  type="button"
                  className="flex size-14 rounded-full bg-gray-100 items-center justify-center"
                >
                  <img
                    src="assets/images/icons/search-normal-black.svg"
                    className="size-6"
                    alt="Search"
                  />
                </button>
                <button
                  type="button"
                  className="flex size-14 rounded-full bg-gray-100 items-center justify-center"
                >
                  <img
                    src="assets/images/icons/notification-black.svg"
                    className="size-6"
                    alt="Notification"
                  />
                </button>
                <div className="relative w-fit">
                  <div className="flex size-14 rounded-full bg-lime-300 items-center justify-center overflow-hidden">
                    <img
                      src="assets/images/icons/crown-black-fill.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </div>
                  <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-black text-white w-fit font-extrabold text-[8px]">
                    PRO
                  </p>
                </div>
              </div>
            </div>
            <UserProfileCard />
          </div>

          {/* Main Content */}
          <main className="flex flex-col gap-6 flex-1">
            {/* Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white shadow hover:shadow-md transition-all">
                <div className="flex size-14 rounded-full bg-blue-100 items-center justify-center">
                  <img
                    src="assets/images/icons/wallet-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[32px]">
                    Rp {totalRevenue.toLocaleString("id")}
                  </p>
                  <p className="font-medium text-lg text-gray-500">Total Revenue</p>
                </div>
              </div>

              <div className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white shadow hover:shadow-md transition-all">
                <div className="flex size-14 rounded-full bg-blue-100 items-center justify-center">
                  <img
                    src="assets/images/icons/document-text-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[32px]">{transactions.length}</p>
                  <p className="font-medium text-lg text-gray-500">Total Transactions</p>
                </div>
              </div>

              <div className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white shadow hover:shadow-md transition-all">
                <div className="flex size-14 rounded-full bg-blue-100 items-center justify-center">
                  <img
                    src="assets/images/icons/bag-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div>
                  <p className="font-semibold text-[32px]">{totalProductsSold.toLocaleString()}</p>
                  <p className="font-medium text-lg text-gray-500">Products Sold</p>
                </div>
              </div>
            </section>

            {/* Latest Transactions */}
            <section className="flex flex-col gap-5 flex-1 rounded-3xl p-[18px] bg-white shadow">
              <h2 className="font-bold text-xl">Latest Transactions</h2>

              {latestTransactions.length > 0 ? (
                latestTransactions.map((tx) => (
                  <div key={tx.id} className="flex flex-col rounded-2xl border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex size-[60px] rounded-2xl bg-gray-100 items-center justify-center overflow-hidden">
                          <img
                            src="assets/images/icons/user-thin-grey.svg"
                            className="size-[30px]"
                            alt="icon"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{tx.name}</p>
                          <p className="text-gray-500 text-sm">{tx.phone}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-700">{tx.merchant?.name}</p>
                    </div>

                    <hr className="border-gray-200" />

                    {/* Accordion */}
                    <div className="p-4">
                      <button
                        onClick={() => toggleAccordion(tx.id)}
                        className="flex items-center justify-between w-full font-semibold text-gray-700"
                      >
                        <span>Product Assigned ({tx.transaction_products?.length || 0})</span>
                        <img
                          src="assets/images/icons/arrow-circle-up.svg"
                          className={`size-6 transition-transform ${openTransactionIds.includes(tx.id) ? "rotate-180" : ""
                            }`}
                          alt="toggle"
                        />
                      </button>

                      {openTransactionIds.includes(tx.id) &&
                        tx.transaction_products.map((tp) => (
                          <div key={tp.id} className="card flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 w-[420px] shrink-0">
                              <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                <img
                                  src={tp.photo || "/assets/images/icons/box-black.svg"}
                                  className="size-full object-contain"
                                  alt={tp.name}
                                />
                              </div>
                              <div className="flex flex-col gap-2 flex-1">
                                <p className="font-semibold text-xl">{tp.name}</p>
                                <p className="font-semibold text-xl text-monday-blue">
                                  Rp {tp.price?.toLocaleString("id")}{" "}
                                  <span className="text-monday-gray">({tp.qty}x)</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedProduct(tp)}
                              className="btn btn-primary-opacity min-w-[130px] font-semibold"
                            >
                              Details
                            </button>
                          </div>
                        ))}

                    </div>

                    <hr className="border-gray-200" />
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-gray-500 font-semibold">Grand Total:</span>
                      <span className="font-bold text-blue-600">
                        Rp {tx.grand_total.toLocaleString("id")}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-3xl text-gray-500">
                  <img
                    src="assets/images/icons/document-text-grey.svg"
                    alt="empty"
                    className="w-10 mb-3"
                  />
                  <p>No transactions yet</p>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-3xl p-6 w-[420px] shadow-xl relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-gray-100 rounded-full p-2"
            >
              <img
                src="assets/images/icons/close-circle-black.svg"
                alt="close"
                className="w-5"
              />
            </button>

            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-xl">Product Details</h3>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg">{selectedProduct.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedProduct.category?.name}</p>
                  <p className="font-semibold text-blue-600">
                    Rp {selectedProduct.price.toLocaleString("id")}
                  </p>
                </div>
                <img
                  src={selectedProduct.photo  || "/assets/images/icons/box-black.svg"}
                  alt={selectedProduct.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">About Product</p>
                <p className="text-gray-700 leading-relaxed">{selectedProduct.about}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OverviewMerchant;
