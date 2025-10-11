// src/pages/Transactions/StepThree.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StepThree = ({ handlePrevStep }) => {
  const [transaction, setTransaction] = useState({ name: "", phone: "" });
  const [cart, setCart] = useState([]);
  const [merchant, setMerchant] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTransaction = JSON.parse(localStorage.getItem("transaction")) || { name: "N/A", phone: "-" };
    setTransaction(storedTransaction);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const storedMerchants = JSON.parse(localStorage.getItem("merchants")) || [];
    setMerchant(storedMerchants[0] || { name: "Unknown", phone: "-" });
  }, []);


  if (!merchant) return <p>Merchant not found...</p>;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  const onSubmit = () => {
    if (!merchant || cart.length === 0) return;
    setIsPending(true);

    const payload = {
      id: Date.now(),
      name: transaction.name,
      phone: transaction.phone,
      merchant: merchant,
      transaction_products: cart.map((product) => ({
        id: product.id,
        qty: product.quantity,
        price: product.price,
        product: { ...product },
      })),
      grand_total: grandTotal,
    };

    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    localStorage.setItem("transactions", JSON.stringify([...storedTransactions, payload]));

    // Clear cart & transaction after save
    localStorage.removeItem("cart");
    localStorage.removeItem("transaction");
    setCart([]);
    setTransaction({ name: "", phone: "" });

    setIsPending(false);
    navigate("/transactions");
  };

  return (
    <section className="flex flex-col gap-6 rounded-3xl p-[18px] px-0">
      <div className="flex gap-6">
        {/* Cart Review */}
        <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
          <p className="font-semibold text-xl">Review Transaction</p>
          {cart.length > 0 ? (
            cart.map((product, index) => (
              <div
                key={product.id + index}
                className="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5"
              >
                <div className="flex items-center justify-between gap-6">
                  <div className="flex items-center gap-3 w-[316px] shrink-0">
                    <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                      <img src={product.photo} className="size-full object-contain" alt="icon" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="font-semibold text-xl w-[218px] truncate">{product.name}</p>
                      <p className="price font-semibold text-xl text-monday-blue">
                        Rp {product.price.toLocaleString("id")}{" "}
                        <span className="text-monday-gray">({product.quantity}x)</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[6px] w-fit shrink-0">
                    <img
                      src={product.category?.photo || "/assets/images/icons/box-black.svg"}
                      className="size-6 flex shrink-0"
                      alt="icon"
                    />
                    <p className="font-semibold text-lg text-nowrap">{product.category?.name || "-"}</p>
                  </div>
                </div>
                <hr className="border-monday-border" />
                <div className="flex w-full items-center justify-between">
                  <p className="flex items-center gap-1 font-medium text-monday-gray">
                    <img src="/assets/images/icons/money-grey.svg" className="size-6 flex shrink-0" alt="icon" />
                    Subtotal
                  </p>
                  <p className="subtotal font-semibold text-xl text-monday-blue">
                    Rp {(product.price * product.quantity).toLocaleString("id")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No items added</p>
          )}
        </div>

        {/* Merchant & Customer Info */}
        <div className="flex flex-col gap-6 w-[392px] shrink-0">
          <div className="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
            <div className="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
              <img src={merchant.photo} className="size-full object-contain" alt="icon" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-semibold text-xl">{merchant.name}</p>
              <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                <img src="/assets/images/icons/call-grey.svg" className="size-6 flex shrink-0" alt="icon" />
                <span>{merchant.phone}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
            {/* Customer Info */}
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-lg">Customer Information</p>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-monday-border p-4">
                <div className="flex flex-col gap-2 flex-1">
                  <p className="font-semibold text-lg">{transaction.name}</p>
                  <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                    <img src="/assets/images/icons/call-grey.svg" className="size-6 flex shrink-0" alt="icon" />
                    <span>{transaction.phone}</span>
                  </p>
                </div>
                <div className="flex size-[56px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                  <img src="/assets/images/icons/user-thin-grey.svg" className="flex size-6 shrink-0" alt="icon" />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="flex flex-col gap-5">
              <p className="font-semibold text-lg">Payment Information</p>
              <div className="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4">
                <div className="flex w-full items-center justify-between">
                  <span>Total Items:</span>
                  <p className="font-semibold text-lg">{cart.length} Item</p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span>Total Quantity:</span>
                  <p className="font-semibold text-lg">{cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span>Subtotal:</span>
                  <p className="font-semibold text-lg">Rp {subtotal.toLocaleString("id")}</p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span>PPN 10%:</span>
                  <p className="font-semibold text-lg">Rp {tax.toLocaleString("id")}</p>
                </div>
                <hr className="border-monday-border w-full" />
                <div className="flex w-full items-center justify-between">
                  <span>Grand Total:</span>
                  <p className="font-semibold text-xl text-monday-blue">Rp {grandTotal.toLocaleString("id")}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4">
              <button onClick={handlePrevStep} className="btn btn-red font-semibold">Cancel</button>
              <button
                onClick={onSubmit}
                disabled={isPending || cart.length === 0}
                className={`btn btn-primary font-semibold w-full ${isPending || cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isPending ? "Saving..." : "Save Transaction"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
