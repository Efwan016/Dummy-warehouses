import UserProfileCard from "../../components/UserProfileCard";
import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMerchants } from "../../hooks/useMerchants";



const AddMerchant = () => {
  
const { addMerchant } = useMerchants();

  
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    keeper: "",
    address: "",
    photo: "/assets/images/icons/store-black.svg",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result; // hasil encode base64
      setImagePreview(base64);
      setFormData((prev) => ({ ...prev, photo: base64 }));
    };
    reader.readAsDataURL(file);
  }
};



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.keeper) {
      alert("Please fill merchant name and keeper!");
      return;
    }

    addMerchant({
      id: Date.now(),
      name: formData.name,
      photo: formData.photo,
      keeper: { name: formData.keeper },
      phone: formData.phone,
      address: formData.address,
      products: [],
    });

    navigate("/merchants"); // balik ke list
  };


  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Add New Merchant</h1>
              <Link
                to={"/merchants"}
                className="flex items-center gap-[6px] text-monday-gray font-semibold"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-4 flex shrink-0"
                  alt="icon"
                />
                Manage Merchants
              </Link>
            </div>
          </div>
          <UserProfileCard />
        </div>

        {/* Form */}
        <main className="flex flex-col gap-6 flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <h2 className="font-semibold text-xl capitalize">
              Complete the form
            </h2>

            {/* Photo */}
            <div className="flex items-center gap-4">
              <div className="relative size-[100px] rounded-2xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="size-full object-cover"
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
                className="btn btn-black"
              >
                {imagePreview.includes("gallery-grey.svg")
                  ? "Add Photo"
                  : "Change Photo"}
              </button>
            </div>

            {/* Name */}
            <input
              type="text"
              name="name"
              placeholder="Merchant Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            {/* Keeper */}
            <input
              type="text"
              name="keeper"
              placeholder="Keeper Name"
              value={formData.keeper}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            {/* Address */}
            <textarea
              name="address"
              placeholder="Merchant Address"
              value={formData.address}
              onChange={handleChange}
              className="border rounded-3xl px-4 py-2"
            />

            <div className="flex justify-end gap-4">
              <Link to={"/merchants"} className="btn btn-red">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Create Now
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddMerchant;
