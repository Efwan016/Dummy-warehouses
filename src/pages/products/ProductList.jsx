import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import React, { useState } from "react"; 
import UserProfileCard from "../../components/UserProfileCard";

const ProductList = () => { 
  const { products, getProduct, deleteProduct } = useProducts();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const selectedProduct = selectedProductId ? getProduct(selectedProductId) : null;

  return (
    <>
      <div id="main-container" className="flex flex-1">
        <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
          <div
            id="Top-Bar"
            className="flex items-center w-full gap-6 mt-[30px] mb-6"
          >
            <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
              <div className="flex flex-col gap-[6px] w-full">
                <h1 className="font-bold text-2xl">Manage Products</h1>
              </div>
              <div className="flex items-center flex-nowrap gap-3">
                <UserProfileCard />
              </div>
            </div>
          </div>

          <main className="flex flex-col gap-6 flex-1">
            <section
              id="Products"
              className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
            >
              <div
                id="Header"
                className="flex items-center justify-between px-[18px]"
              >
                <div className="flex flex-col gap-[6px]">
                  <p className="flex items-center gap-[6px]">
                    <span className="font-semibold text-2xl">
                      {products.length} Total Products
                    </span>
                  </p>
                  <p className="font-semibold text-lg text-monday-gray">
                    View and update your product list here.
                  </p>
                </div>
                <Link
                  to="/products/add"
                  className="btn btn-primary font-semibold"
                >
                  Add New
                </Link>
              </div>
              <hr className="border-monday-border" />

              <div id="Product-List" className="flex flex-col px-4 gap-5 flex-1">
                {products.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {products.map((product) => (
                      <div key={product.id} className="card flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 w-[380px] shrink-0">
                          <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                            <img
                              src={product.thumbnail}
                              className="size-full object-contain"
                              alt={product.name}
                            />
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <p className="font-semibold text-xl truncate">{product.name}</p>
                            <p className="font-semibold text-xl text-monday-blue">
                              Rp {product.price.toLocaleString("id")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => setSelectedProductId(product.id)}
                            className="btn btn-primary-opacity min-w-[130px] font-semibold"
                          >
                            Details
                          </button>
                          <Link
                            to={`/products/edit/${product.id}`}
                            className="btn btn-black min-w-[130px] font-semibold"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6">
                    <p className="font-semibold text-monday-gray">
                      Oops, it looks like there's no data yet.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>

      {selectedProductId && selectedProduct && (
        <div className="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full">
          <div
            onClick={() => setSelectedProductId(null)}
            className="absolute w-full h-full bg-[#292D32B2] cursor-pointer"
          />
          <div className="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
            <div className="modal-header flex items-center justify-between">
              <p className="font-semibold text-xl">Product Details</p>
              <button
                onClick={() => setSelectedProductId(null)}
                className="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
              >
                ✕
              </button>
            </div>
            <div className="modal-content flex flex-col gap-5">
              <p className="font-semibold text-lg">{selectedProduct.name}</p>
              <p>Rp {selectedProduct.price.toLocaleString("id")}</p>
              <p>{selectedProduct.about}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
