import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schemas/userSchema";
import UserProfileCard from "../../components/UserProfileCard";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/icons/gallery-grey.svg"
  );
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  // ✅ Simpan ke localStorage
  const onSubmit = (data) => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
      id: Date.now(), // id unik
      ...data,
      photo:
        imagePreview !== "/assets/images/icons/gallery-grey.svg"
          ? imagePreview
          : "/assets/images/icons/profile-grey.svg",
      roles: ["Member"], // default role
    };

    localStorage.setItem("users", JSON.stringify([...storedUsers, newUser]));

    navigate("/users"); // redirect ke list users
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
              <h1 className="font-bold text-2xl">Add New User</h1>
              <Link
                to={"/users"}
                className="flex items-center gap-[6px] text-monday-gray font-semibold"
              >
                <img
                  src="/assets/images/icons/arrow-left-grey.svg"
                  className="size-4 flex shrink-0"
                  alt="icon"
                />
                Manage Users
              </Link>
            </div>
          </div>
          <UserProfileCard />
        </div>

        <main className="flex flex-col gap-6 flex-1">
          <div className="flex gap-6">
            {/* Add User Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
            >
              <h2 className="font-semibold text-xl capitalize">
                Complete the form
              </h2>

              {/* Upload Photo */}
              <div className="flex items-center justify-between w-full">
                <div className="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
                  <img
                    id="Thumbnail"
                    src={imagePreview}
                    className="size-full object-contain"
                    alt="icon"
                  />
                  <input
                    type="file"
                    id="File-Input"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const previewURL = URL.createObjectURL(file);
                        setValue("photo", previewURL);
                        setImagePreview(previewURL);
                      }
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-black w-[152px] font-semibold text-nowrap"
                >
                  {imagePreview !== "/assets/images/icons/gallery-grey.svg"
                    ? "Change Photo"
                    : "Add Photo"}
                </button>
              </div>

              {/* Name */}
              <label className="group relative">
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Full Name"
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border border-monday-border px-6 focus:border-monday-black transition-300"
                />
              </label>
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}

              {/* Phone */}
              <label className="group relative">
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="Phone Number"
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border border-monday-border px-6 focus:border-monday-black transition-300"
                />
              </label>
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}

              {/* Email */}
              <label className="group relative">
                <input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border border-monday-border px-6 focus:border-monday-black transition-300"
                />
              </label>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              {/* Password */}
              <label className="group relative">
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border border-monday-border px-6 focus:border-monday-black transition-300"
                />
              </label>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              {/* Confirm Password */}
              <label className="group relative">
                <input
                  {...register("password_confirmation")}
                  type="password"
                  placeholder="Password Confirmation"
                  className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border border-monday-border px-6 focus:border-monday-black transition-300"
                />
              </label>
              {errors.password_confirmation && (
                <p className="text-red-500">
                  {errors.password_confirmation.message}
                </p>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-end gap-4">
                <Link to={"/users"} className="btn btn-red font-semibold">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary font-semibold">
                  Save User
                </button>
              </div>
            </form>

            {/* Quick Guide */}
            <div className="flex flex-col w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
              <p className="font-semibold">Quick Guide to Add User</p>
              <ul className="flex flex-col gap-4">
                <li>Enter user details accurately</li>
                <li>Assign role if necessary</li>
                <li>Create a secure password</li>
                <li>Ensure email & phone are correct</li>
                <li>Review before saving</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddUser;
