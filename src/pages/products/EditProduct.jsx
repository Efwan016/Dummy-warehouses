import { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    about: "",
    category_id: "",
    warehouse_id: "",
    is_popular: "false",
    thumbnail: null,
  });

  const [imagePreview, setImagePreview] = useState("/assets/images/icons/gallery-grey.svg");
  const [categories, setCategories] = useState([]);
  const [warehouses, setWarehouses] = useState([]);

  // ambil data dari localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const storedWarehouses = JSON.parse(localStorage.getItem("warehouses")) || [];

    setCategories(storedCategories);
    setWarehouses(storedWarehouses);

    const product = storedProducts.find((p) => p.id === Number(id));
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        about: product.about,
        category_id: product.category_id || "",
        warehouse_id: product.warehouse_id || "",
        is_popular: product.is_popular ? "true" : "false",
        thumbnail: product.thumbnail || null,
      });
      setImagePreview(product.thumbnail || "/assets/images/icons/gallery-grey.svg");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFormData({ ...formData, thumbnail: preview });
      setImagePreview(preview);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updatedProducts = storedProducts.map((p) =>
      p.id === Number(id)
        ? {
          ...p,
          ...formData,
          price: Number(formData.price),
          is_popular: formData.is_popular === "true",
          thumbnail: imagePreview,
        }
        : p
    );

    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/products");
  };

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Edit Product</h1>
              <Link
                to={"/products"}
                className="flex items-center gap-[6px] text-monday-gray font-semibold"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-4 flex shrink-0"
                  alt="icon"
                />
                Manage Products
              </Link>
            </div>
            <UserProfileCard />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex flex-col gap-6 flex-1">
          <div className="flex gap-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full rounded-2xl p-8 gap-6 bg-white shadow-lg"
            >
              <h2 className="font-bold text-2xl text-gray-800">Edit Product</h2>

              {/* Upload Thumbnail */}
              <div className="flex items-center gap-6">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100 shadow-inner group hover:shadow-lg transition-all">
                  <img
                    src={imagePreview}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition-all">
                    Change
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md"
                >
                  {imagePreview !== "/assets/images/icons/gallery-grey.svg" ? "Change Photo" : "Add Photo"}
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col">
                  <span className="font-medium text-gray-700">Product Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </label>

                <label className="flex flex-col">
                  <span className="font-medium text-gray-700">Price</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    required
                  />
                </label>
              </div>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700">Category</span>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700">Warehouse</span>
                <select
                  name="warehouse_id"
                  value={formData.warehouse_id}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                >
                  <option value="">Select Warehouse</option>
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id}>{wh.name}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700">About</span>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows={5}
                  className="mt-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </label>

              <label className="flex flex-col">
                <span className="font-medium text-gray-700">Popularity</span>
                <select
                  name="is_popular"
                  value={formData.is_popular}
                  onChange={handleChange}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                >
                  <option value="true">Popular</option>
                  <option value="false">Not Popular</option>
                </select>
              </label>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                <Link
                  to="/products"
                  className="px-6 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all shadow-md"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md"
                >
                  Save Now
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProduct;
