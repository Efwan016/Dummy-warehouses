// pages/Profile.jsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    // kalau ga ada user, tendang ke login
    navigate("/login");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-6">
      {/* Card */}
      <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md text-center">
        {/* Foto */}
        <div className="flex justify-center">
          <img
            src={user.photo || "/assets/images/icons/user-thin-grey.svg"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover shadow"
          />
        </div>

        {/* Info */}
        <h2 className="mt-4 text-2xl font-bold">{user.name || "Guest User"}</h2>
        <p className="text-gray-500">{user.roles?.join(", ")}</p>

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate("/settings")}
            className="px-4 py-2 bg-monday-blue text-white rounded-xl hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
