import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simulasi fetch category
  const [category, setCategory] = useState(null);
  const [photo, setPhoto] = useState("/assets/images/icons/gallery-grey.svg");

  const fileInputRef = useRef(null);

  useEffect(() => {
    setCategory({
      id,
      name: "Sample Category",
      tagline: "Sample tagline",
      photo: "/assets/images/icons/profile-grey.svg",
    });
    setPhoto("/assets/images/icons/profile-grey.svg");
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", category);
    navigate("/categories");
  };

  if (!category) return <p>Loading...</p>;

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <h1 className="font-bold text-2xl">Edit Category</h1>
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
                className="btn border rounded-lg p-3 bg-green-500 hover:bg-green-800 text-white"
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
                  if (file) setPhoto(URL.createObjectURL(file));
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

            <div className="flex justify-end gap-4 ">
              <Link to="/categories" className="btn border rounded-lg p-3 bg-red-500 hover:bg-red-600 text-white">
                Cancel
              </Link>
              <button type="submit" className="btn border rounded-lg p-3 bg-monday-blue hover:bg-blue-700 text-white">
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
