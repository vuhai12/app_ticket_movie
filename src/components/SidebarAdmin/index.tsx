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
  { id: 2, name: "User", path: "/admin-dashboard/user", icon: User },
];

const SidebarAdmin = () => {
  return (
    <div className="min-h-screen bg-[#1e0d28] px-[20px] text-white">
      <div className="flex items-center justify-center h-[100px]">
        <Link to={"/"} className="h-[45px]">
          <img src={logo} className="w-full h-full object-contain" />
        </Link>
      </div>
      <h3 className="mb-[20px] text-[18px]">Main Menu</h3>
      <div className="flex flex-col gap-[10px]">
        {dataMenu.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              to={item.path}
              key={item.id}
              className={({ isActive }) =>
                isActive
                  ? "bg-[#5f1a89] py-[10px] px-[20px] rounded-[10px] items-center flex gap-[10px]"
                  : "cursor-pointer py-[10px] px-[20px] hover:bg-[#5f1a89] rounded-[10px] items-center flex gap-[10px]"
              }
              // className="cursor-pointer hover:bg-[#5f1a89] py-[10px] px-[20px] rounded-[10px]"
            >
              <Icon className="w-5 h-5 text-white" />
              <p>{item.name}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarAdmin;
