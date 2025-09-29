import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState([]);
  const navigate = useNavigate();

  // Dummy user frontend only
  const { user, logout } = useAuth();
  const userRoles = user?.roles || [];

  const toggleAccordion = (label) => {
    setOpenAccordions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const sidebarMenus = [
    {
      section: "Main Menu",
      items: [
        {
          label: "Overview",
          path: "/overview",
          iconBlack: "/assets/images/icons/home-black.svg",
          iconBlue: "/assets/images/icons/home-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Products",
          path: "/products",
          iconBlack: "/assets/images/icons/bag-black.svg",
          iconBlue: "/assets/images/icons/bag-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Transactions",
          path: "/transactions",
          iconBlack: "/assets/images/icons/card-black.svg",
          iconBlue: "/assets/images/icons/card-blue-fill.svg",
          roles: ["keeper"],
        },
        {
          label: "Categories",
          path: "/categories",
          iconBlack: "/assets/images/icons/note-2-black.svg",
          iconBlue: "/assets/images/icons/note-2-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Warehouses",
          path: "/warehouses",
          iconBlack: "/assets/images/icons/buildings-2-black.svg",
          iconBlue: "/assets/images/icons/buildings-2-blue-fill.svg",
          roles: ["manager"],
        },
      ],
    },
    {
      section: "Account Settings",
      items: [
        {
          label: "Settings",
          path: "/settings",
          iconBlack: "/assets/images/icons/setting-black.svg",
          iconBlue: "/assets/images/icons/setting-black.svg",
          roles: ["manager", "keeper"],
        },
      ],
    },
  ];

  return (
    <aside className="relative flex h-auto w-[280px] shrink-0 bg-white">
      <div className="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px]">
        <img src="/assets/images/logos/logo.svg" className="h-8 w-fit" alt="logo" />
        <div className="flex flex-col gap-5 overflow-y-scroll hide-scrollbar h-full overscroll-contain">
          {sidebarMenus.map((section) => {
            const visibleItems = section.items.filter((item) =>
              item.roles?.some((r) => userRoles.includes(r))
            );

            if (!visibleItems.length) return null;

            return (
              <nav key={section.section} className="flex flex-col gap-4">
                <p className="font-medium text-monday-gray">{section.section}</p>
                <ul className="flex flex-col gap-2">
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isOpen = openAccordions.includes(item.label);

                    return (
                      <li key={item.label}>
                        {item.submenu ? (
                          <button
                            onClick={() => toggleAccordion(item.label)}
                            className={`flex items-center w-full min-h-14 gap-2 rounded-2xl py-[10px] pl-4 ${isActive ? "bg-gray-100" : ""}`}
                          >
                            <div className="relative flex size-6 shrink-0">
                              <img src={item.iconBlack} className={`size-6 absolute ${isActive ? "opacity-0" : "opacity-100"}`} alt="icon" />
                              <img src={item.iconBlue} className={`size-6 absolute ${isActive ? "opacity-100" : "opacity-0"}`} alt="icon" />
                            </div>
                            <p className={`font-medium w-full ${isActive ? "text-monday-blue" : ""}`}>{item.label}</p>
                          </button>
                        ) : (
                          <Link
                            to={item.path}
                            className={`flex items-center w-full min-h-14 gap-2 rounded-2xl py-[10px] pl-4 ${isActive ? "bg-gray-100" : ""}`}
                          >
                            <div className="relative flex size-6 shrink-0">
                              <img src={item.iconBlack} className={`size-6 absolute ${isActive ? "opacity-0" : "opacity-100"}`} alt="icon" />
                              <img src={item.iconBlue} className={`size-6 absolute ${isActive ? "opacity-100" : "opacity-0"}`} alt="icon" />
                            </div>
                            <p className={`font-medium w-full ${isActive ? "text-monday-blue" : ""}`}>{item.label}</p>
                          </Link>
                        )}

                        {isOpen && item.submenu && (
                          <ul className="pl-6 flex flex-col gap-2">
                            {item.submenu.map((sub) => (
                              <li key={sub.label}>
                                <Link to={sub.path} className="block py-2 pl-4 rounded hover:bg-gray-100">
                                  {sub.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
        </div>

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex items-center gap-2 min-h-14 rounded-2xl py-[10px] pl-4 text-red-500 font-medium hover:bg-red-50 transition-300"
        >
          <img src="/assets/images/icons/logout.svg" className="size-6" alt="logout icon" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
