// components/UserProfileCard.jsx
import { useNavigate } from "react-router-dom";

const UserProfileCard = () => {
  const navigate = useNavigate();

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Guest User",
    roles: ["visitor"],
    photo: "/assets/images/icons/user-thin-grey.svg",
  };

  return (
    <div
      className="flex items-center gap-3 h-[72px] bg-white shadow rounded-2xl px-4 py-2 cursor-pointer hover:bg-gray-50 transition-300"
      onClick={() => navigate("/profile")} // ✅ navigate ke /profile
    >
      {/* User Photo */}
      <div className="flex rounded-full overflow-hidden size-12">
        <img
          src={user.photo || "/assets/images/icons/user-thin-grey.svg"}
          className="size-full object-cover"
          alt="profile"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col gap-0.5 min-w-[100px] max-w-[150px] w-fit">
        <p className="font-semibold truncate">{user.name}</p>
        <p className="flex items-center gap-1 font-medium text-gray-500 text-sm truncate">
          <img
            src="/assets/images/icons/user-grey.svg"
            className="size-4"
            alt="role"
          />
          {user.roles.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default UserProfileCard;
