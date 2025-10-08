import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../data/categories";
import UserProfileCard from "../../components/UserProfileCard";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    photo: "/assets/images/icons/gallery-grey.svg",
  });

  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );

  // ✅ Ambil data category dari localStorage
  useEffect(() => {
    const category = getCategoryById(id);
    if (category) {
      setFormData({
        name: category.name || "",
        tagline: category.tagline || "",
        photo: category.photo || "/assets/images/icons/gallery-grey.svg",
      });
      setImagePreview(category.photo || "/assets/images/icons/gallery-grey.svg");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setFormData((prev) => ({ ...prev, photo: preview }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Please fill category name!");
      return;
    }

    updateCategory(String(id), {
      id: String(id),
      name: formData.name,
      tagline: formData.tagline,
      photo: formData.photo,
    });

    navigate("/categories");
  };

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Edit Category</h1>
              <Link
                to={"/categories"}
                className="flex items-center gap-[6px] text-monday-gray font-semibold"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-4 flex shrink-0"
                  alt="icon"
                />
                Manage Categories
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
              Update category details
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

            {/* Inputs */}
            <input
              type="text"
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            <input
              type="text"
              name="tagline"
              placeholder="Tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="border rounded-3xl px-4 h-[50px]"
            />

            <div className="flex justify-end gap-4">
              <Link to={"/categories"} className="btn btn-red">
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

export default EditCategory;
