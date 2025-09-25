import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState([]);

  // Dummy user frontend only
  const user = { roles: ["manager"] }; // atau ["keeper"]
  const userRoles = user.roles;

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
        <img
          src="/assets/images/logos/logo.svg"
          className="h-8 w-fit"
          alt="logo"
        />
        <div className="flex flex-col gap-5 overflow-y-scroll hide-scrollbar h-full overscroll-contain">
          {sidebarMenus.map((section) => {
            const visibleItems = section.items.filter((item) =>
              item.roles?.some((r) => userRoles.includes(r))
            );

            if (visibleItems.length === 0) return null;

            return (
              <nav key={section.section} className="flex flex-col gap-4">
                <p className="font-medium text-monday-gray">
                  {section.section}
                </p>
                <ul className="flex flex-col gap-2">
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                      <li
                        key={item.label}
                        className={`group ${isActive ? "active" : ""}`}
                      >
                        <Link
                          to={item.path}
                          className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300"
                        >
                          <div className="relative flex size-6 shrink-0">
                            <img
                              src={item.iconBlack}
                              className={`size-6 absolute ${
                                isActive ? "opacity-0" : "opacity-100"
                              } transition-300`}
                              alt="icon"
                            />
                            <img
                              src={item.iconBlue}
                              className={`size-6 absolute ${
                                isActive ? "opacity-100" : "opacity-0"
                              } transition-300`}
                              alt="icon"
                            />
                          </div>
                          <p
                            className={`font-medium transition-300 w-full ${
                              isActive ? "text-monday-blue" : ""
                            }`}
                          >
                            {item.label}
                          </p>
                          <div
                            className={`w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden ${
                              isActive ? "flex" : ""
                            } transition-300`}
                          ></div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
