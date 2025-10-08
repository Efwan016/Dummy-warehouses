import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { useLocalData } from "../../hooks/useLocalData";
import UserProfileCard from "../../components/UserProfileCard";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { createProduct } = useProducts();

  const { data: categories } = useLocalData("categories");
  const { data: warehouses } = useLocalData("warehouses");
  const { data: merchants } = useLocalData("merchants");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    about: "",
    category_id: "",
    warehouse_id: "",
    merchant_id: "",
    stock: "",
  });

  const [imagePreview, setImagePreview] = useState("/assets/images/icons/gallery-grey.svg");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    // Simulasi preview tanpa simpan ke localStorage
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    // Simpan hanya path default (bukan base64)
    setFormData({ ...formData, thumbnail: "/assets/images/icons/gallery-grey.svg" });
  }
};



  const handleSubmit = (e) => {
  e.preventDefault();

  // kalau thumbnail blob atau base64, ganti icon default
  const safePhoto =
    formData.thumbnail?.startsWith("data:image") ||
    formData.thumbnail?.startsWith("blob:")
      ? "/assets/images/icons/gallery-grey.svg"
      : formData.thumbnail;

  createProduct({
    ...formData,
    id: Date.now(),
    photo: safePhoto,
  });

  navigate("/products");
};



  return (
    <div id="main-container" className="flex flex-1 bg-gray-50 min-h-screen">
      <div id="Content" className="flex flex-col flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div>
            <h1 className="font-semibold text-2xl text-gray-800">🛒 Add New Product</h1>
            <Link
              to="/products"
              className="text-sm text-gray-500 hover:text-indigo-500 transition-all"
            >
              ← Back to Products
            </Link>
          </div>
          <UserProfileCard />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8 max-w-3xl mx-auto"
        >
          {/* Upload */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
              <img
                src={imagePreview}
                alt="preview"
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-all shadow-sm"
            >
              {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                ? "Change Photo"
                : "Upload Photo"}
            </button>
          </div>

          {/* Input fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Product Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Price</label>
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                type="number"
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* About */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Write a short description..."
              className="w-full mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all min-h-[100px]"
            />
          </div>

          {/* Category, Warehouse, Merchant */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Warehouse</label>
              <select
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Merchant Assign */}
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">Assign Merchant</label>
            <select
              name="merchant_id"
              value={formData.merchant_id}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            >
              <option value="">Select Merchant</option>
              {merchants.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <div className="mt-8 text-right">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
