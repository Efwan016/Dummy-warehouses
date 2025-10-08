import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [photo, setPhoto] = useState("/assets/images/icons/gallery-grey.svg");

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = { id: Date.now(), name, tagline, photo, products: [] };

    // ambil data lama
    const stored = JSON.parse(localStorage.getItem("categories")) || [];

    // gabungkan dan simpan
    const updated = [...stored, newCategory];
    localStorage.setItem("categories", JSON.stringify(updated));

    navigate("/categories");
  };

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <h1 className="font-bold text-2xl">Add New Category</h1>
            <Link to="/categories" className="text-monday-gray font-semibold">
              Manage Categories
            </Link>
          </div>
          <UserProfileCard />
        </div>

        {/* Form */}
        <main className="flex flex-col gap-6 flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <div className="flex items-center gap-4">
              <img src={photo} alt="preview" className="size-14" />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="btn btn-black"
              >
                Upload Photo
              </button>
              <input
  ref={fileInputRef}
  type="file"
  accept="image/*"
  className="hidden"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // bukan base64
      setPhoto(imageUrl);
    }
  }}
/>
            </div>

            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded p-3"
            />

            <input
              type="text"
              placeholder="Tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="border rounded p-3"
            />

            <div className="flex justify-end gap-4">
              <Link to="/categories" className="btn btn-red">
                Cancel
              </Link>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddCategory;
