import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import React, { useState } from "react";
import { useMerchants } from "../../hooks/useMerchants";

const MerchantList = () => {
    const { merchants, getMerchant, deleteMerchant } = useMerchants();
    const [selectedMerchantId, setSelectedMerchantId] = useState(null);
    const selectedMerchant = selectedMerchantId ? getMerchant(selectedMerchantId) : null;

    

    return (
        <div id="main-container" className="flex flex-1">
            <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
                {/* Top Bar */}
                <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
                    <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
                        <h1 className="font-bold text-2xl">Manage Merchants</h1>
                    </div>
                    <UserProfileCard />
                </div>

                {/* Content */}
                <main className="flex flex-col gap-6 flex-1">
                    <section className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white">
                        {/* Header */}
                        <div className="flex items-center justify-between px-[18px]">
                            <div>
                                <p className="flex items-center gap-[6px]">
                                    <img
                                        src="/assets/images/icons/buildings-2-black.svg"
                                        className="size-6"
                                        alt="icon"
                                    />
                                    <span className="font-semibold text-2xl">
                                        {merchants.length} Total Merchants
                                    </span>
                                </p>
                                <p className="font-semibold text-lg text-monday-gray">
                                    View and update your Merchants list here.
                                </p>
                            </div>
                            <Link to={"/merchants/add"} className="btn btn-primary font-semibold">
                                Add New
                                <img
                                    src="/assets/images/icons/add-square-white.svg"
                                    className="flex size-6 shrink-0"
                                    alt="icon"
                                />
                            </Link>
                        </div>
                        <hr className="border-monday-border" />

                        {/* Merchant List */}
                        <div className="flex flex-col px-4 gap-5 flex-1">
                            {merchants.length > 0 ? (
                                merchants.map((merchant) => (
                                    <React.Fragment key={merchant.id}>
                                        <div className="card flex items-center justify-between gap-3">
                                            {/* Left */}
                                            <div className="flex items-center gap-3 w-[326px] shrink-0">
                                                <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                                    <img src={merchant.photo} className="size-full object-contain" alt="icon" />
                                                </div>
                                                <div className="flex flex-col gap-2 flex-1">
                                                    <p className="font-semibold text-xl w-[228px] truncate">{merchant.name}</p>
                                                    <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                                                        <img
                                                            src="/assets/images/icons/user-thin-grey.svg"
                                                            className="size-6"
                                                            alt="icon"
                                                        />
                                                        <span>{merchant.keeper?.name || "No keeper assigned"}</span>
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Middle */}
                                            <div className="flex items-center gap-2 min-w-[266px]">
                                                <img
                                                    src="/assets/images/icons/bag-black.svg"
                                                    className="size-6"
                                                    alt="icon"
                                                />
                                                <p className="font-semibold text-lg">
                                                    {merchant.productIds?.length || 0} Products
                                                </p>
                                            </div>

                                            {/* Right */}
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setSelectedMerchantId(merchant.id)}
                                                    className="btn btn-primary-opacity min-w-[100px]"
                                                >
                                                    Details
                                                </button>
                                                <Link to={`/merchants/edit/${merchant.id}`} className="btn btn-black min-w-[100px]">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        deleteMerchant(merchant.id);
                                                        if (selectedMerchantId === merchant.id) {
                                                            setSelectedMerchantId(null); // auto close detail kalau dihapus
                                                        }
                                                    }}
                                                    className="btn btn-red min-w-[100px]"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                        <hr className="border-monday-border last:hidden" />
                                    </React.Fragment>
                                ))
                            ) : (
                                <p className="text-center text-monday-gray">Oops, no merchants available.</p>
                            )}
                        </div>

                        {/* Selected Merchant Details */}
                        {selectedMerchantId && selectedMerchant && (
                            <div className="fixed inset-0 flex items-center justify-center z-50">
                                {/* Overlay */}
                                <div
                                    onClick={() => setSelectedMerchantId(null)}
                                    className="absolute inset-0 bg-[#292D32B2] cursor-pointer"
                                />

                                {/* Modal Content */}
                                <div className="relative z-10 flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
                                    {/* Header */}
                                    <div className="modal-header flex items-center justify-between">
                                        <p className="font-semibold text-xl">Merchant Details</p>
                                        <button
                                            onClick={() => setSelectedMerchantId(null)}
                                            className="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
                                        >
                                            ✕
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="modal-content flex flex-col gap-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                                <img
                                                    src={selectedMerchant.photo}
                                                    className="size-full object-contain"
                                                    alt="icon"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-lg">{selectedMerchant.name}</p>
                                                <p className="text-monday-gray">
                                                    Keeper: {selectedMerchant.keeper?.name || "No keeper assigned"}
                                                </p>

                                                <p className="text-monday-gray">
                                                    Phone: {selectedMerchant.phone}
                                                </p>
                                                <p className="text-monday-gray">
                                                    Address: {selectedMerchant.address}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">
                                            Products: {selectedMerchant.products.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    </section>
                </main>
            </div>
        </div>
    );
};

export default MerchantList;
