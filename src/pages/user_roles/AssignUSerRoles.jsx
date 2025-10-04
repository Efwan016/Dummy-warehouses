// src/pages/user_roles/AssignUserRoles.jsx
import { useState } from "react";
import { useFetchUsers } from "../../hooks/useUsers";
import { useRoles } from "../../hooks/useRoles";
import { useMerchants } from "../../hooks/useMerchants";
import { useAssignUserRole } from "../../hooks/useAssignUserRole";
import UserProfileCard from "../../components/UserProfileCard";
import { Link, useNavigate } from "react-router-dom";

const AssignUserRole = () => {
  const { data: users, isPending: loadingUsers } = useFetchUsers();
  const { roles } = useRoles();
  const { merchants } = useMerchants();
  const { mutate: assignRole, isPending: isAssigning, error } =
    useAssignUserRole();

  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const navigate = useNavigate();

  const handleAssignRole = () => {
    if (!userId || !roleId) return;
    assignRole(
      {
        user_id: Number(userId),
        role_id: Number(roleId),
        merchant_id: merchantId ? Number(merchantId) : null, // ⬅️ assign merchant juga
      },
      {
        onSuccess: () => {
          navigate("/roles");
        },
      }
    );
  };

  return (
     <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        {/* Top Bar */}
        <div className="flex items-center w-full gap-6 mt-[30px] mb-6">
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Assign Role to User</h1>
              <Link
                to="/users"
                className="flex items-center gap-[6px] text-monday-gray font-semibold"
              >
                ← User List
              </Link>
            </div>
          </div>
          <UserProfileCard />
        </div>

        {/* Main Content */}
        <main className="flex flex-col gap-6 flex-1">
          <div className="flex gap-6">
            <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
              <h2 className="font-semibold text-xl capitalize">
                Complete the form
              </h2>

              {error && <p className="text-red-500">{error.message}</p>}

              {/* Select User */}
              <label className="flex flex-col">
                <span>Select User</span>
                {loadingUsers ? (
                  <p>Loading users...</p>
                ) : (
                  <select
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="border border-black rounded p-2"
                  >
                    <option value="">Select user</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </option>
                    ))}
                  </select>
                )}
              </label>

              {/* Select Role */}
              <label className="flex flex-col">
                <span>Select Role</span>
                <select
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  className="border border-black rounded p-2"
                >
                  <option value="">Select role</option>
                  {roles?.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Select Merchant */}
              <label className="flex flex-col">
                <span>Select Merchant (optional)</span>
                <select
                  value={merchantId}
                  onChange={(e) => setMerchantId(e.target.value)}
                  className="border border-black rounded p-2"
                >
                  <option value="">Select merchant</option>
                  {merchants?.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-4">
                <Link to="/users" className="btn btn-red font-semibold">
                  Cancel
                </Link>
                <button
                  className="btn btn-primary font-semibold"
                  onClick={handleAssignRole}
                  disabled={isAssigning}
                >
                  {isAssigning ? "Assigning..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssignUserRole;
