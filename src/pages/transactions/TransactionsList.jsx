import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import React, { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openTransactionIds, setOpenTransactionIds] = useState([]);

  // Ambil data transaksi dari localStorage
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(storedTransactions);
  }, []);

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
          <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
            <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
              <div className="flex flex-col gap-[6px] w-full">
                <h1 className="font-bold text-2xl">Manage Transactions</h1>
              </div>
              <UserProfileCard />
            </div>
          </div>

          <main className="flex flex-col gap-6 flex-1">
            <section id="Products" className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
              <div className="flex items-center justify-between px-[18px]">
                <h2 className="font-semibold text-2xl">{transactions.length} Total Transactions</h2>
                <Link to="/transactions/add" className="btn btn-primary font-semibold">
                  Add New
                </Link>
              </div>
              <hr className="border-monday-border" />

              <div className="flex flex-col px-4 gap-5 flex-1">
                {transactions.length === 0 && (
                  <div className="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6 py-12">
                    <img src="assets/images/icons/document-text-grey.svg" className="size-[52px]" alt="icon" />
                    <p className="font-semibold text-monday-gray">No transactions yet.</p>
                  </div>
                )}

                {transactions.map((tx) => (
                  <div key={tx.id} className="card-merchant flex flex-col rounded-2xl border border-monday-border">
                    {/* Customer Info */}
                    <div className="flex flex-col gap-5 p-4">
                      <p className="font-semibold text-lg">Customer Details</p>
                      <div className="flex items-center gap-3">
                        <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                          <img src="assets/images/icons/user-thin-grey.svg" className="size-6" alt="icon" />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="font-semibold text-xl">{tx.name}</p>
                          <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                            <img src="assets/images/icons/call-grey.svg" className="size-6" alt="icon" />
                            <span>{tx.phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr className="border-monday-border" />

                    {/* Products Accordion */}
                    <div className="flex flex-col px-4 gap-5 py-5">
                      <button
                        onClick={() => toggleAccordion(tx.id)}
                        className="flex items-center justify-between w-full"
                      >
                        <p className="font-semibold text-lg">
                          Product Assigned ({tx.transaction_products?.length || 0})
                        </p>
                        <img
                          src="assets/images/icons/arrow-circle-up.svg"
                          className={`size-6 transition-300 ${openTransactionIds.includes(tx.id) ? "rotate-180" : ""}`}
                          alt="icon"
                        />
                      </button>

                      {openTransactionIds.includes(tx.id) &&
                        tx.transaction_products.map((tp) => (
                          <div key={tp.id} className="card flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 w-[420px] shrink-0">
                              <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                <img src={tp.product.photo} className="size-full object-contain" alt="icon" />
                              </div>
                              <div className="flex flex-col gap-2 flex-1">
                                <p className="font-semibold text-xl">{tp.product.name}</p>
                                <p className="font-semibold text-xl text-monday-blue">
                                  Rp {tp.price.toLocaleString("id")} <span className="text-monday-gray">({tp.qty}x)</span>
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedProduct(tp.product)}
                              className="btn btn-primary-opacity min-w-[130px] font-semibold"
                            >
                              Details
                            </button>
                          </div>
                        ))}
                    </div>

                    {/* Grand Total */}
                    <hr className="border-monday-border" />
                    <div className="flex items-center justify-between px-4 py-5">
                      <p className="flex items-center gap-1 font-semibold text-lg text-monday-gray">
                        <img src="assets/images/icons/money-grey.svg" className="size-6" alt="icon" />
                        Grand Total:
                      </p>
                      <p className="font-semibold text-xl text-monday-blue">
                        Rp {tx.grand_total?.toLocaleString("id") || 0}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="modal flex items-center justify-center h-full fixed top-0 w-full">
          <div onClick={() => setSelectedProduct(null)} className="absolute w-full h-full bg-[#292D32B2] cursor-pointer" />
          <div className="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5 max-h-[70vh] overflow-y-auto">
            <div className="modal-header flex items-center justify-between">
              <p className="font-semibold text-xl">Product Details</p>
              <button onClick={() => setSelectedProduct(null)} className="flex size-14 rounded-full items-center justify-center bg-monday-gray-background">
                <img src="assets/images/icons/close-circle-black.svg" className="size-6" alt="icon" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="flex items-center gap-[6px] font-semibold text-lg">
                  <img src={selectedProduct.category?.photo} className="size-6" alt="icon" />
                  {selectedProduct.name}
                </p>
                <p className="font-bold text-lg">{selectedProduct.category?.name}</p>
                <p className="font-semibold text-[17px] text-monday-blue">
                  Rp {selectedProduct.price?.toLocaleString("id")}
                </p>
                <p className="font-medium text-sm text-monday-gray">About:</p>
                <p className="font-semibold leading-[160%]">{selectedProduct.about}</p>
              </div>
              <div className="flex size-[100px] rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden">
                <img src={selectedProduct.photo} className="size-full object-contain" alt="icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionList;
