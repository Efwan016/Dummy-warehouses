import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";
import UserProfileCard from "../../components/UserProfileCard";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, updateCategory } = useCategory();

  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState("/assets/images/icons/gallery-grey.svg");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const existing = categories.find((c) => String(c.id) === String(id));
    if (existing) {
      setCategory(existing);
      setPhoto(existing.photo);
    } else {
      setCategory({
        id,
        name: "",
        tagline: "",
        photo: "/assets/images/icons/gallery-grey.svg",
      });
    }
  }, [id, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const safePhoto = photo.startsWith("blob:")
      ? "/assets/images/icons/gallery-grey.svg"
      : photo;

    updateCategory({
      ...category,
      photo: safePhoto,
    });

    navigate("/categories");
  };


  if (!category) return <p>Loading...</p>;

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <h1 className="font-bold text-2xl">Edit Category</h1>
            <Link to="/categories" className="text-monday-gray font-semibold">
              Manage Categories
            </Link>
          </div>
          <UserProfileCard />
        </div>

        <main className="flex flex-col gap-6 flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
          >
            <div className="flex items-center gap-4">
              <img src={photo} alt="preview" className="size-14 rounded-lg" />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="border rounded-lg px-4 py-2 bg-green-500 hover:bg-green-700 text-white transition-all"
              >
                Change Photo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setPhoto(imageUrl);
                  }
                }}
              />

            </div>

            <input
              type="text"
              placeholder="Category Name"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              className="border rounded p-3"
            />

            <input
              type="text"
              placeholder="Tagline"
              value={category.tagline}
              onChange={(e) =>
                setCategory({ ...category, tagline: e.target.value })
              }
              className="border rounded p-3"
            />

            <div className="flex justify-end gap-4">
              <Link
                to="/categories"
                className="border rounded-lg p-3 bg-red-500 hover:bg-red-600 text-white transition-all"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="border rounded-lg p-3 bg-indigo-600 hover:bg-indigo-700 text-white transition-all"
              >
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditCategory;
