import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import { useAuth } from "../../hooks/useAuth";
import { initialWarehouses } from "../../data/warehouses";
import React, { useState, useEffect } from "react";

const WarehouseList = () => {
    const { user } = useAuth();
    const [warehouses, setWarehouses] = useState([]);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);

    useEffect(() => {
        // pakai data dari /data/warehouses.js
        setWarehouses(initialWarehouses);
    }, []);

    if (!user) return <p>Loading user...</p>;

    // cari warehouse yang dipilih untuk modal
    const selectedWarehouse = warehouses.find(
        (w) => w.id === selectedWarehouseId
    );

    // 🗑️ hapus warehouse
    const handleDeleteWarehouse = (id) => {
        if (window.confirm("Are you sure you want to delete this warehouse?")) {
            setWarehouses((prev) => prev.filter((w) => w.id !== id));
        }
    };

    return (
        <div id="main-container" className="flex flex-1">
            <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
                {/* Top bar */}
                <div
                    id="Top-Bar"
                    className="flex items-center w-full gap-6 mt-[30px] mb-6"
                >
                    <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
                        <div className="flex flex-col gap-[6px] w-full">
                            <h1 className="font-bold text-2xl">Manage Warehouses</h1>
                        </div>
                        <div className="flex items-center flex-nowrap gap-3">
                            <UserProfileCard />
                        </div>
                    </div>
                </div>

                {/* List */}
                <main className="flex flex-col gap-6 flex-1">
                    <section
                        id="Warehouses"
                        className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
                    >
                        <div
                            id="Header"
                            className="flex items-center justify-between px-[18px]"
                        >
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
                        <div
                            id="Warehouse-List"
                            className="flex flex-col px-4 gap-5 flex-1"
                        >
                            {warehouses.length > 0 ? (
                                warehouses.map((warehouse) => (
                                    <React.Fragment key={warehouse.id}>
                                        <div className="card flex items-center justify-between gap-3">
                                            {/* Info */}
                                            <div className="flex items-center gap-3 w-[360px] shrink-0">
                                                <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                                    <img
                                                        src={warehouse.photo}
                                                        className="size-full object-contain"
                                                        alt={warehouse.name}
                                                    />
                                                </div>
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <p className="font-semibold text-xl">
                                                        {warehouse.name}
                                                    </p>
                                                    <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                                                        <img
                                                            src="/assets/images/icons/call-grey.svg"
                                                            className="size-6 flex shrink-0"
                                                            alt="icon"
                                                        />
                                                        <span>{warehouse.phone}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Products count */}
                                            <div className="flex items-center gap-2 w-full justify-center">
                                                <img
                                                    src="/assets/images/icons/bag-black.svg"
                                                    className="size-6 flex shrink-0"
                                                    alt="icon"
                                                />
                                                <p className="font-semibold text-lg text-nowrap">
                                                    {warehouse.products.length || 0} Products
                                                </p>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setSelectedWarehouseId(warehouse.id)}
                                                    className="btn btn-primary-opacity min-w-[130px] font-semibold"
                                                >
                                                    Details
                                                </button>

                                                {user.roles.includes("manager") && (
                                                    <>
                                                        <Link
                                                            to={`/warehouses/edit/${warehouse.id}`}
                                                            className="btn btn-black min-w-[100px] font-semibold flex items-center gap-2"
                                                        >
                                                            <img
                                                                src="/assets/images/icons/edit-white.svg"
                                                                className="size-5"
                                                                alt="icon"
                                                            />
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeleteWarehouse(warehouse.id)}
                                                            className="btn btn-danger min-w-[100px] font-semibold flex items-center gap-2"
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        <hr className="border-monday-border last:hidden" />
                                    </React.Fragment>
                                ))
                            ) : (
                                <div
                                    id="Empty-State"
                                    className="flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
                                >
                                    <img
                                        src="/assets/images/icons/document-text-grey.svg"
                                        className="size-[52px]"
                                        alt="icon"
                                    />
                                    <p className="font-semibold text-monday-gray">
                                        Oops, it looks like there's no data yet.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </main>
            </div>

            {/* Modal Detail */}
            {selectedWarehouse && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-2xl p-6 w-[500px] shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-bold text-2xl">{selectedWarehouse.name}</h2>
                            <button
                                onClick={() => setSelectedWarehouseId(null)}
                                className="text-xl font-bold px-2"
                            >
                                ✕
                            </button>
                        </div>
                        <p><b>Phone:</b> {selectedWarehouse.phone}</p>
                        <p><b>Total Products:</b> {selectedWarehouse.products.length}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WarehouseList;
