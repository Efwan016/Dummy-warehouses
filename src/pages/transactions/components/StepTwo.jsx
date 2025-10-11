import React, { useState, useEffect } from "react";

const ProductSelect = ({ productList, selectedProduct, setSelectedProduct }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (product) => {
        setSelectedProduct({ ...product }); // copy biar tidak mutasi object asli
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="font-semibold text-gray-700 mb-1 block">Product Name</label>

            {/* Dropdown button */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-white to-gray-50 border border-gray-300 rounded-2xl shadow-sm cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300"
            >
                {selectedProduct ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={selectedProduct.photo}
                            alt={selectedProduct.name}
                            className="w-8 h-8 rounded-lg object-contain border border-gray-200"
                        />
                        <span className="font-medium text-gray-800">{selectedProduct.name}</span>
                    </div>
                ) : (
                    <span className="text-gray-400">-- Pilih Produk --</span>
                )}

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown list */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto animate-fadeIn">
                    {productList.map((p) => (
                        <div
                            key={p.id}
                            onClick={() => handleSelect(p)}
                            className="flex items-center gap-3 p-3 hover:bg-blue-50 transition cursor-pointer"
                        >
                            <img
                                src={p.photo}
                                alt={p.name}
                                className="w-10 h-10 rounded-lg object-contain border border-gray-200"
                            />
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-800">{p.name}</span>
                                <span className="text-sm text-gray-500">Stok: {p.stock} • Rp {p.price.toLocaleString("id")}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const StepTwo = ({ handleNextStep, handlePrevStep }) => {
    const [cart, setCart] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const storedProducts = JSON.parse(localStorage.getItem("products"));
        setCart(storedCart);
        setProductList(storedProducts);
    }, []);

    const removeFromCart = (index) => {
        const updated = cart.filter((_, i) => i !== index);
        setCart(updated);
        localStorage.setItem("cart", JSON.stringify(updated));
    };

    const handleOpenModal = () => {
        setSelectedProduct(null);
        setQuantity(1);
        setError("");
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        setQuantity(value);
        if (selectedProduct && value > selectedProduct.stock) {
            setError("❌ Stok tidak mencukupi");
        } else {
            setError("");
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!selectedProduct) return;
        if (quantity > selectedProduct.stock) {
            setError("❌ Stok tidak mencukupi");
            return;
        }

        // 1. Tambahkan produk ke cart
        const newProduct = {
            ...selectedProduct,
            quantity,
            price: selectedProduct.price || 0,
            photo: selectedProduct.photo || "/assets/images/icons/product-default.svg",
            sub_total: (selectedProduct.price || 0) * quantity
        };

        const updatedCart = [...cart, newProduct];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // 2. Kurangi stock di productList
        const updatedProducts = productList.map(p =>
            p.id === selectedProduct.id
                ? { ...p, stock: p.stock - quantity }
                : p
        );
        setProductList(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));

        // 3. Tutup modal & reset
        handleCloseModal();
        setSelectedProduct(null);
        setQuantity(1);
        setError("");
    };

    const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;

    return (
        <section className="flex flex-col gap-6 p-6 bg-white rounded-3xl shadow-lg border border-gray-100">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{cart.length} Total Items</h2>
                    <p className="text-gray-500 text-sm">Manage your assigned products</p>
                </div>

                <button
                    onClick={handleOpenModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2"
                >
                    <img src="/assets/images/icons/add-square-white.svg" alt="add" className="w-5 h-5" />
                    Assign Product
                </button>
            </div>

            <hr className="border-gray-200" />

            {/* CART LIST */}
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-2xl p-4 hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <img src={item.photo} alt={item.name} className="w-16 h-16 rounded-xl object-contain border" />
                                <div>
                                    <p className="font-bold text-gray-800">{item.name}</p>
                                    <p className="text-gray-500 text-sm">{item.category}</p>
                                    <p className="text-blue-600 font-semibold mt-1">Rp {item.price.toLocaleString("id")} × {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-blue-700">Rp {(item.price * item.quantity).toLocaleString("id")}</p>
                                <button onClick={() => removeFromCart(index)} className="text-red-500 hover:underline text-sm mt-1">Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 py-12 border-2 border-dashed rounded-2xl">
                        <img src="/assets/images/icons/document-text-grey.svg" className="w-12 h-12 mx-auto mb-3 opacity-60" alt="empty" />
                        <p className="font-medium">Belum ada produk</p>
                    </div>
                )}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4 mt-6">
                <button onClick={handlePrevStep} className="bg-gray-200 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-300 transition">Cancel</button>
                <button onClick={handleNextStep} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold transition">Continue</button>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-[460px] rounded-3xl shadow-2xl p-6 relative">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">✕</button>
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Assign Product</h2>

                        <form onSubmit={handleAddProduct} className="flex flex-col gap-5">
                            {/* CUSTOM PRODUCT DROPDOWN */}
                            <ProductSelect
                                productList={productList}
                                selectedProduct={selectedProduct}
                                setSelectedProduct={setSelectedProduct}
                            />

                            {/* PRODUCT DETAIL */}
                            {selectedProduct && (
                                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex gap-4 items-center">
                                    <img src={selectedProduct.photo} alt={selectedProduct.name} className="w-20 h-20 object-contain rounded-xl border" />
                                    <div className="flex flex-col gap-1">
                                        <p><span className="font-semibold">Price:</span> <span className="text-blue-700 font-bold">Rp {selectedProduct.price.toLocaleString("id")}</span></p>
                                        <p><span className="font-semibold">Category:</span> {selectedProduct.category}</p>
                                        <p><span className="font-semibold">Stock:</span> {selectedProduct.stock}</p>
                                    </div>
                                </div>
                            )}

                            {/* QUANTITY */}
                            <div>
                                <label className="font-semibold text-gray-700">Quantity</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className={`w-full border rounded-xl p-2 mt-1 ${error ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"}`}
                                    required
                                />
                                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                            </div>

                            {/* TOTAL PRICE */}
                            <div className="flex justify-between items-center mt-3">
                                <p className="font-semibold text-lg text-gray-700">Total Harga:</p>
                                <p className="font-bold text-blue-700 text-xl">Rp {totalPrice.toLocaleString("id")}</p>
                            </div>

                            {/* ACTION BUTTONS */}
                            <div className="flex justify-end gap-3 mt-5">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-xl font-semibold">Cancel</button>
                                <button type="submit" disabled={!selectedProduct || !!error} className={`px-5 py-2 rounded-xl font-semibold text-white ${!selectedProduct || !!error ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}>
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default StepTwo;
