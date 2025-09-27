import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../../data/products"; // ambil data dari products.js
import UserProfileCard from "../../components/UserProfileCard";

const EditProduct = () => {
    const { id } = useParams();
    const fileInputRef = useRef(null);

    // Cari produk berdasarkan id
    const product = products.find((p) => p.id === Number(id));

    const categories = [
        { id: "1", name: "Category 1" },
        { id: "2", name: "Category 2" },
        { id: "3", name: "Category 3" },
    ];

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        about: "",
        category_id: "1",
        is_popular: "false",
        thumbnail: null,
    });

    const [imagePreview, setImagePreview] = useState(
        "/assets/images/icons/gallery-grey.svg"
    );

    // Set form data jika product ada
    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                price: product.price,
                about: product.about,
                category_id: product.category.id,
                is_popular: "true", // default bisa disesuaikan
                thumbnail: null,
            });
            setImagePreview(product.thumbnail || "/assets/images/icons/gallery-grey.svg");
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, thumbnail: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview("/assets/images/icons/gallery-grey.svg");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // updateProduct bisa diganti sesuai implementasi update produk di hooks
        console.log("Updated product:", { ...formData, is_popular: formData.is_popular === "true" });
    };

    if (!product) return <p>Product not found</p>;

    return (
        <div id="main-container" className="flex flex-1">
            <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
                <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
                    <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
                        <div className="flex flex-col gap-[6px] w-full">
                            <h1 className="font-bold text-2xl">Edit Product</h1>
                            <Link to={"/products"} className="flex items-center gap-[6px] text-monday-gray font-semibold">
                                <img src="/assets/images/icons/arrow-left-grey.svg" className="size-4 flex shrink-0" alt="icon" />
                                Manage Products
                            </Link>
                        </div>
                        <UserProfileCard />
                    </div>
                </div>

                <main className="flex flex-col gap-6 flex-1">
                    <div className="flex gap-6">
                        <form onSubmit={handleSubmit} className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white">
                            <h2 className="font-semibold text-xl capitalize">Complete the form</h2>

                            <div className="flex items-center justify-between w-full">
                                <div className="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
                                    <img src={imagePreview} className="size-full object-cover" alt="icon" />
                                    <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                </div>
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="btn btn-black w-[152px] font-semibold text-nowrap">
                                    {imagePreview !== "/assets/images/icons/gallery-grey.svg" ? "Change Photo" : "Add Photo"}
                                </button>
                            </div>

                            <label>
                                Product Name
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="input-field" />
                            </label>

                            <label>
                                Product Price
                                <input type="number" name="price" value={formData.price} onChange={handleChange} className="input-field" />
                            </label>

                            <label>
                                Product Category
                                <select name="category_id" value={formData.category_id} onChange={handleChange} className="input-field">
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Product About
                                <textarea name="about" value={formData.about} onChange={handleChange} rows={5} className="input-field" />
                            </label>

                            <label>
                                Popularity
                                <select name="is_popular" value={formData.is_popular} onChange={handleChange} className="input-field">
                                    <option value="true">Popular</option>
                                    <option value="false">Not Popular</option>
                                </select>
                            </label>

                            <div className="flex items-center justify-end gap-4">
                                <Link to={"/products"} className="btn btn-red font-semibold">Cancel</Link>
                                <button type="submit" className="btn btn-primary font-semibold">Save Now</button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default EditProduct;
