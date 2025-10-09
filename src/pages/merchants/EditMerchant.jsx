import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getMerchantById, updateMerchant } from "../../data/merchants";
import UserProfileCard from "../../components/UserProfileCard";

const EditMerchant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    keeper: "",
    address: "",
    photo: "/assets/images/icons/store-black.svg",
  });

  const [imagePreview, setImagePreview] = useState("/assets/images/icons/store-black.svg");

  // ✅ Ambil data merchant dari localStorage
  useEffect(() => {
    const merchant = getMerchantById(Number(id));
    if (merchant) {
      setFormData({
        name: merchant.name || "",
        phone: merchant.phone || "",
        keeper: merchant.keeper?.name || "",
        address: merchant.address || "",
        photo: merchant.photo || "/assets/images/icons/store-black.svg",
      });
      setImagePreview(merchant.photo || "/assets/images/icons/store-black.svg");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, photo: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Please fill merchant name!");
      return;
    }

    updateMerchant(Number(id), {
      id: Number(id),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      keeper: { name: formData.keeper },
      photo: formData.photo || "/assets/images/icons/store-black.svg",
    });

    navigate("/merchants");
  };

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Edit Merchant</h1>
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
            <h2 className="font-semibold text-xl capitalize">Update merchant details</h2>

            {/* Photo */}
            <div className="flex items-center gap-4">
              <div className="relative size-[100px] rounded-2xl overflow-hidden">
                <img src={imagePreview} alt="preview" className="size-full object-cover" />
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
                {imagePreview.includes("store-black.svg") ? "Add Photo" : "Change Photo"}
              </button>
            </div>

            {/* Inputs */}
            <input
              type="text"
              name="name"
              placeholder="Merchant Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            <input
              type="text"
              name="keeper"
              placeholder="Keeper Name"
              value={formData.keeper}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

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
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditMerchant;
