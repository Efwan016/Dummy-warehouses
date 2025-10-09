import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import { useAuth } from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";

const WarehouseList = () => {
  const { user } = useAuth();
  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [openWarehouse, setOpenWarehouse] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    setWarehouses(JSON.parse(localStorage.getItem("warehouses")) || []);
    setCategories(JSON.parse(localStorage.getItem("categories")) || []);
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
  }, []);

  if (!user) return <p>Loading user...</p>;

  const handleDeleteWarehouse = (id) => {
    if (!window.confirm("Are you sure you want to delete this warehouse?")) return;
    const updated = warehouses.filter((w) => w.id !== id);
    setWarehouses(updated);
    localStorage.setItem("warehouses", JSON.stringify(updated));
  };

  const toggleWarehouse = (id) => {
    setOpenWarehouse(openWarehouse === id ? null : id);
    setOpenCategory(null);
  };

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  const getCategoriesByWarehouse = (warehouseId) => {
    return categories.filter((c) => String(c.warehouse_id) === String(warehouseId));
  };

  const getProductsByCategory = (categoryId) => {
    return products.filter((p) => String(p.category_id) === String(categoryId));
  };

  return (
    <div id="main-container" className="flex flex-1 bg-gray-50 min-h-screen">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top bar */}
        <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Manage Warehouses</h1>
            </div>
            <UserProfileCard />
          </div>
        </div>

        {/* List */}
        <main className="flex flex-col gap-6 flex-1">
          <section
            id="Warehouses"
            className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
          >
            <div className="flex items-center justify-between px-[18px] flex-wrap gap-4">
              <div className="flex flex-col gap-[6px]">
                <p className="flex items-center gap-[6px]">
                  <img
                    src="/assets/images/icons/buildings-2-black.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-semibold text-2xl">
                    {warehouses.length} Total Warehouses
                  </span>
                </p>
                <p className="font-semibold text-lg text-monday-gray">
                  View and update your Warehouses list here.
                </p>
              </div>

              {user.roles.includes("manager") && (
                <Link
                  to={"/warehouses/add"}
                  className="btn btn-primary font-semibold flex items-center gap-2"
                >
                  Add New
                  <img
                    src="/assets/images/icons/add-square-white.svg"
                    className="size-6"
                    alt="icon"
                  />
                </Link>
              )}
            </div>

            <hr className="border-monday-border" />

            <div className="flex flex-col px-4 gap-5 flex-1">
              {warehouses.length > 0 ? (
                warehouses.map((warehouse) => {
                  const warehouseCategories = getCategoriesByWarehouse(warehouse.id);
                  return (
                    <div
                      key={warehouse.id}
                      className="border rounded-2xl bg-white shadow-sm overflow-hidden"
                    >
                      {/* Warehouse header */}
                      <div
                        onClick={() => toggleWarehouse(warehouse.id)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-[64px] rounded-xl bg-monday-background items-center justify-center overflow-hidden">
                            <img
                              src={warehouse.photo}
                              className="w-full h-full object-contain"
                              alt={warehouse.name}
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="font-semibold text-xl">{warehouse.name}</p>
                            <p className="text-sm text-gray-500">{warehouse.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-xl text-center">
                            {warehouseCategories.length} Categories
                          </p>
                          <img
                            src={
                              openWarehouse === warehouse.id
                                ? "assets/images/icons/arrow-up-black.svg"
                                : "assets/images/icons/arrow-down-black.svg"
                            }
                            className="size-5"
                            alt="toggle"
                          />
                        </div>
                      </div>

                      {/* Category dropdown */}
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          openWarehouse === warehouse.id ? "max-h-[2000px] p-4" : "max-h-0 p-0"
                        }`}
                      >
                        {warehouseCategories.length > 0 ? (
                          warehouseCategories.map((category) => {
                            const categoryProducts = getProductsByCategory(category.id);
                            return (
                              <div
                                key={category.id}
                                className="border rounded-xl mb-3 bg-gray-50 shadow-sm overflow-hidden"
                              >
                                <div
                                  onClick={() => toggleCategory(category.id)}
                                  className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 transition"
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={category.photo}
                                      className="size-10 object-contain rounded-full bg-white"
                                      alt={category.name}
                                    />
                                    <div>
                                      <p className="font-semibold text-lg">{category.name}</p>
                                      <p className="text-sm text-gray-500">{category.tagline}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium text-gray-700">
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

                                {/* Product list */}
                                <div
                                  className={`transition-all duration-300 overflow-hidden ${
                                    openCategory === category.id
                                      ? "max-h-[1500px] p-3"
                                      : "max-h-0 p-0"
                                  }`}
                                >
                                  {categoryProducts.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                      {categoryProducts.map((product) => (
                                        <div
                                          key={product.id}
                                          className="flex flex-col sm:flex-row justify-between bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
                                        >
                                          <div className="flex items-center gap-3">
                                            <div className="size-[60px] rounded-lg overflow-hidden bg-gray-100">
                                              <img
                                                src={
                                                  product.photo ||
                                                  "assets/images/icons/box-black.svg"
                                                }
                                                alt={product.name}
                                                className="object-contain w-full h-full"
                                              />
                                            </div>
                                            <div className="flex flex-col">
                                              <p className="font-semibold">{product.name}</p>
                                              <p className="text-sm text-gray-500">
                                                Stock:{" "}
                                                <span className="font-medium">
                                                  {product.stock || 0}
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
                                    <p className="italic text-gray-500 pl-2">
                                      No products in this category.
                                    </p>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p className="italic text-gray-500 pl-2">
                            No categories in this warehouse.
                          </p>
                        )}
                      </div>

                      {/* Warehouse actions */}
                      <div className="flex justify-end gap-3 p-4 border-t bg-white">
                        <Link
                          to={`/warehouses/edit/${warehouse.id}`}
                          className="btn btn-black font-semibold"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteWarehouse(warehouse.id)}
                          className="btn btn-red font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 italic px-6">
                  No warehouses found.
                </p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WarehouseList;
