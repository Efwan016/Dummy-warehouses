import { Link } from "react-router-dom";
import UserProfileCard from "../../components/UserProfileCard";
import React, { useState } from "react";
import { useRoles } from "../../hooks/useRoles";

const RoleList = () => {
  const { roles } = useRoles();
  const [expandedRole, setExpandedRole] = useState(null); // track role yang dibuka

  const handleToggle = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  // ambil data users dari localStorage
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div id="main-container" className="flex flex-1">
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Manage Roles</h1>
            </div>
          </div>
          <UserProfileCard />
        </div>

        <main className="flex flex-col gap-6 flex-1">
          <section
            id="Roles"
            className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
          >
            <div
              id="Header"
              className="flex items-center justify-between px-[18px]"
            >
              <div className="flex flex-col gap-[6px]">
                <p className="flex items-center gap-[6px]">
                  <img
                    src="assets/images/icons/profile-circle-black.svg"
                    className="size-6"
                    alt="icon"
                  />
                  <span className="font-semibold text-2xl">
                    {roles.length} Total Roles
                  </span>
                </p>
                <p className="font-semibold text-lg text-monday-gray">
                  View and update your Roles here.
                </p>
              </div>
              <Link
                to="/roles/add"
                className="btn btn-primary font-semibold"
              >
                Add New
              </Link>
            </div>
            <hr className="border-monday-border" />

            <div
              id="Role-List"
              className="flex flex-col px-4 gap-5 flex-1"
            >
              <p className="font-semibold text-xl">All Roles</p>

              {roles.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {roles.map((role) => (
                    <React.Fragment key={role.id}>
                      <div className="card flex flex-col gap-3 p-4">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="flex size-16 rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden">
                              <img
                                src="assets/images/icons/user-octagon-grey.svg"
                                className="size-6"
                                alt="icon"
                              />
                            </div>
                            <p className="font-semibold text-xl">{role.name}</p>
                          </div>

                          <div className="flex items-center gap-4 justify-center w-full">

                            {/* Total User jadi tombol */}
                            <button
                              onClick={() => handleToggle(role.id)}
                              className="flex items-center jus gap-2 text-gray-800 font-semibold hover:text-black"
                            >
                              <img
                                src="assets/images/icons/profile-2user-black.svg"
                                className="size-6"
                                alt="icon"
                              />
                              {role.users_web_count} Total User
                            </button>
                          </div>

                          <Link
                              to={`/roles/edit/${role.id}`}
                              className="btn btn-black min-w-[130px] font-semibold"
                            >
                              Edit
                            </Link>
                        </div>
                        
                        {/* Expanded list user */}
                        {expandedRole === role.id && (
                          <div className="bg-gray-50 rounded-xl p-4 mt-2">
                            <p className="font-semibold mb-2">Users:</p>
                            {storedUsers.filter((u) => u.roleId === role.id).length > 0 ? (
                              <ul className="list-disc list-inside">
                                {storedUsers
                                  .filter((u) => u.roleId === role.id)
                                  .map((u) => (
                                    <li key={u.id}>
                                      {u.name} ({u.email})
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p className="text-gray-500">No users assigned to this role.</p>
                            )}
                          </div>
                        )}
                      </div>
                      <hr className="border-monday-border last:hidden" />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-gray-500">
                  <p>No roles yet. Please add a new role.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default RoleList;
