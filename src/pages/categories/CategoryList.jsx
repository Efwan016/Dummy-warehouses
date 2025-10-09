import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import { useEffect, useState } from "react";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setCategories(storedCategories);
    setProducts(storedProducts);
  }, []);

  const deleteCategory = (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    const stored = JSON.parse(localStorage.getItem("categories")) || [];
    const updated = stored.filter((cat) => cat.id !== id);
    localStorage.setItem("categories", JSON.stringify(updated));
    setCategories(updated);
  };

  const toggleCategory = (categoryId) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId);
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter((p) => String(p.category_id) === String(categoryId));
  };

  return (
    <div id="main-container" className="flex flex-1 bg-gray-50 min-h-screen">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Manage Categories</h1>
            </div>
          </div>
          <UserProfileCard />
        </div>

        {/* Content */}
        <main className="flex flex-col gap-6 flex-1">
          <section className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
            <div className="flex items-center justify-between px-[18px] flex-wrap gap-4">
              <div className="flex flex-col gap-[6px]">
                <p className="flex items-center gap-[6px]">
                  <span className="font-semibold text-2xl">
                    {categories.length} Total Category
                  </span>
                </p>
                <p className="font-semibold text-lg text-monday-gray">
                  View and update your Category list here.
                </p>
              </div>
              <Link to="/categories/add" className="btn btn-primary font-semibold">
                Add New
              </Link>
            </div>

            <hr className="border-monday-border" />

            {categories.length > 0 ? (
              <div className="flex flex-col gap-5 px-4">
                {categories.map((category, catIndex) => {
                  const categoryProducts = getProductsByCategory(category.id);

                  return (
                    <div
                      key={category.id || `category-${catIndex}`}
                      className="border rounded-2xl bg-white shadow-sm overflow-hidden"
                    >
                      {/* Header */}
                      <div
                        onClick={() => toggleCategory(category.id)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-16 rounded-full bg-monday-background items-center justify-center overflow-hidden">
                            <img
                              src={
                                category.photo ||
                                "assets/images/icons/folder-black.svg"
                              }
                              className="size-[30px] object-contain"
                              alt={category.name || "category"}
                            />
                          </div>
                          <div className="flex flex-col">
                            <p className="font-semibold text-xl">{category.name}</p>
                            <p className="font-semibold text-lg text-monday-gray">
                              {category.tagline}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-xl text-center">
                            {categoryProducts.length} Products
                          </p>
                          <img
                            src={
                              openCategory === category.id
                                ? "assets/images/icons/arrow-up-black.svg"
                                : "assets/images/icons/arrow-down-black.svg"
                            }
                            className="size-5"
                            alt="toggle"
                          />
                        </div>
                      </div>

                      {/* Dropdown List */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          openCategory === category.id ? "max-h-[1000px] p-4" : "max-h-0 p-0"
                        }`}
                      >
                        {categoryProducts.length > 0 ? (
                          <div className="flex flex-col gap-3">
                            {categoryProducts.map((product, prodIndex) => (
                              <div
                                key={product.id || `product-${prodIndex}`}
                                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-xl p-3 shadow-sm hover:shadow-md transition"
                              >
                                <div className="flex items-center gap-3 w-full sm:w-[340px]">
                                  <div className="flex size-[64px] rounded-xl bg-white items-center justify-center overflow-hidden">
                                    <img
                                      src={
                                        product.photo ||
                                        "assets/images/icons/box-black.svg"
                                      }
                                      className="w-full h-full object-contain"
                                      alt={product.name || "product"}
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1">
                                    <p className="font-semibold text-lg">
                                      {product.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Stock:{" "}
                                      <span className="font-medium">
                                        {product.pivot?.stock ?? product.stock ?? 0}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 mt-3 sm:mt-0">
                                  <p className="font-semibold text-monday-blue text-lg">
                                    Rp {product.price?.toLocaleString("id") || 0}
                                  </p>
                                  <Link
                                    to={`/products/detail/${product.id}`}
                                    className="btn btn-primary-opacity min-w-[100px] font-semibold"
                                  >
                                    Details
                                  </Link>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 italic">
                            No products in this category.
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 p-4 border-t bg-white">
                        <Link
                          to={`/categories/edit/${category.id}`}
                          className="btn btn-black font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => deleteCategory(category.id)}
                          className="btn btn-red font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 italic px-6">No categories yet.</p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default CategoryList;
