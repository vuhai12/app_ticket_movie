import { Link, NavLink } from "react-router-dom";
import logo from "@assets/Header/logo.svg";
import { LayoutDashboard, Film, User } from "lucide-react";

const dataMenu = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin-dashboard/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Movie",
    path: "/admin-dashboard/movie",
    icon: Film,
  },
  {
    id: 3, // ✅ fix trùng id
    name: "User",
    path: "/admin-dashboard/user",
    icon: User,
  },
];

const SidebarAdmin = () => {
  return (
    <aside className="min-h-screen w-[260px] bg-gradient-to-b from-[#1e0d28] to-[#14091c] text-white border-r border-white/10 shadow-xl">
      {/* Logo */}
      <div className="flex items-center justify-center h-[90px] border-b border-white/10">
        <Link to="/" className="h-[45px]">
          <img
            src={logo}
            alt="Logo"
            className="h-full object-contain opacity-90 hover:opacity-100 transition"
          />
        </Link>
      </div>

      {/* Menu */}
      <div className="px-4 py-6">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-4">
          Main Menu
        </p>

        <div className="flex flex-col gap-2">
          {dataMenu.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#5f1a89] shadow-md"
                      : "hover:bg-[#2b1239] hover:translate-x-1"
                  }`
                }
              >
                <Icon className="w-5 h-5 text-gray-300 group-hover:text-white transition" />
                <span className="text-sm font-medium tracking-wide">
                  {item.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
