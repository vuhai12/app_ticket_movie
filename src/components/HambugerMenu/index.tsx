import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Header/logo.svg";
import { UserIcon, X, Home, Clock, Ticket, User } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { RiTeamLine } from "react-icons/ri";
import { clearUsers } from "store/slices/usersSlice";
import { useAppDispatch } from "store/hook";
import { useEffect } from "react";

const menuItems = [
  { id: 1, name: "Home", path: "/", icon: Home },
  { id: 2, name: "Show time", path: "/show-time", icon: Clock },
  { id: 3, name: "Ticket Price", path: "/ticket-price", icon: Ticket },
  { id: 4, name: "About Us", path: "/about-us", icon: RiTeamLine },
];

const HambugerMenu = ({
  setIsShowHambugerMenu,
}: {
  setIsShowHambugerMenu: (isShowHambugerMenu: boolean) => void;
}) => {
  const idUser = localStorage.getItem("idUser");
  const access_token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUsers());
    navigate("/login");
  };

  // disable body scroll when open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[999]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsShowHambugerMenu(false)}
      />

      {/* Slide Menu */}
      <div className="absolute left-0 top-0 h-full w-[80%] sm:w-[350px] bg-gradient-to-b from-[#2a0e3f] to-[#431d5a] p-6 flex flex-col shadow-2xl animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" onClick={() => setIsShowHambugerMenu(false)}>
            <img src={logo} className="h-8 object-contain" />
          </Link>

          <X
            className="w-6 h-6 text-white cursor-pointer hover:rotate-90 transition"
            onClick={() => setIsShowHambugerMenu(false)}
          />
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <input
            placeholder="Search movie..."
            className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-300 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsShowHambugerMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* User Section */}
        <div className="border-t border-white/20 pt-4 mt-4">
          {idUser || (access_token && user) ? (
            <>
              <p className="text-sm text-gray-300 mb-3">
                Hi,{" "}
                <span className="font-semibold text-white">
                  {user ?? idUser?.slice(0, 8)}
                </span>
              </p>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-red-500/80 transition text-white text-sm"
              >
                <UserIcon className="w-5 h-5" />
                Sign Out
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsShowHambugerMenu(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white text-sm"
            >
              <User className="w-5 h-5" />
              Sign In
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default HambugerMenu;
