import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  // State form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [photo, setPhoto] = useState("/assets/images/icons/gallery-grey.svg");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    const found = storedUsers.find((u) => u.id === Number(id));
    if (found) {
      setUser(found);
      setName(found.name || "");
      setPhone(found.phone || "");
      setEmail(found.email || "");
      setPhoto(found.photo || "/assets/images/icons/gallery-grey.svg");
    }
  }, [id]);

  if (!user) {
    return <p>User not found...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password !== passwordConfirmation) {
      alert("Password and confirmation do not match!");
      return;
    }

    const updatedUser = {
      ...user,
      name,
      phone,
      email,
      photo,
    };

    const updatedUsers = users.map((u) =>
      u.id === user.id ? updatedUser : u
    );

    // simpan ke localStorage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("User updated successfully!");
    navigate("/users");
  };

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Edit User</h1>
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

        {/* Main Form */}
        <main className="flex flex-col gap-6 flex-1">
          <div className="flex gap-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
            >
              <h2 className="font-semibold text-xl capitalize">
                Complete the form
              </h2>

              {/* Avatar upload */}
              <div className="flex items-center justify-between w-full">
                <div className="group relative flex size-[100px] rounded-2xl overflow-hidden items-center justify-center bg-monday-background">
                  <img
                    id="Thumbnail"
                    src={photo}
                    className="size-full object-contain"
                    alt="icon"
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setPhoto(URL.createObjectURL(file));
                      } else {
                        setPhoto("/assets/images/icons/gallery-grey.svg");
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
                  {photo !== "/assets/images/icons/gallery-grey.svg"
                    ? "Change Photo"
                    : "Add Photo"}
                </button>
              </div>

              {/* Name */}
              <label>
                <p className="font-medium text-sm text-monday-gray mb-1">
                  Full Name
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[50px] border rounded-lg px-4 font-semibold"
                />
              </label>

              {/* Phone */}
              <label>
                <p className="font-medium text-sm text-monday-gray mb-1">
                  Phone Number
                </p>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-[50px] border rounded-lg px-4 font-semibold"
                />
              </label>

              {/* Email */}
              <label>
                <p className="font-medium text-sm text-monday-gray mb-1">
                  Email Address
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] border rounded-lg px-4 font-semibold"
                />
              </label>

              {/* Password */}
              <label>
                <p className="font-medium text-sm text-monday-gray mb-1">
                  Password
                </p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[50px] border rounded-lg px-4 font-semibold tracking-[0.3em]"
                />
              </label>

              {/* Confirm Password */}
              <label>
                <p className="font-medium text-sm text-monday-gray mb-1">
                  Password Confirmation
                </p>
                <input
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  className="w-full h-[50px] border rounded-lg px-4 font-semibold tracking-[0.3em]"
                />
              </label>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-4">
                <Link to={"/users"} className="btn btn-red font-semibold">
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary font-semibold">
                  Save User
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUser;
