import { useState } from "react";
import logo from "../../assets/Header/logo.svg";
import { UserIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Link, NavLink, useNavigate } from "react-router-dom";
import HambugerMenu from "@components/HambugerMenu";
import { clearUsers } from "store/slices/usersSlice";
import { useAppDispatch } from "store/hook";

const menuItems = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Show time", path: "/show-time" },
  { id: 3, name: "Ticket Price", path: "/ticket-price" },
  { id: 4, name: "About Us", path: "/about-us" },
];

const Header = () => {
  const [isShowHambugerMenu, setIsShowHambugerMenu] = useState(false);

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

  return (
    <>
      <header className="sticky top-0 z-[100] backdrop-blur-md bg-black/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-[70px] flex items-center justify-between">
          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-8 lg:h-10 object-contain" alt="logo" />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-gray-300 text-[15px]">
            {menuItems.map((item) => (
              <NavLink key={item.id} to={item.path}>
                {({ isActive }) => (
                  <div className="relative group">
                    <span
                      className={`transition ${
                        isActive ? "text-white" : "group-hover:text-white"
                      }`}
                    >
                      {item.name}
                    </span>

                    <span
                      className={`absolute left-0 -bottom-2 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden md:flex items-center gap-6">
            {idUser || (access_token && user) ? (
              <div className="relative group">
                <button className="text-white text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition">
                  Hi, {user ?? idUser?.slice(0, 8)}
                </button>

                <div className="absolute right-0 mt-2 w-36 bg-[#1E0D28] rounded-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-200">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-purple-600 w-full rounded-xl transition"
                  >
                    <UserIcon className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 text-sm bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-full hover:opacity-90 transition"
              >
                <UserIcon className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden"
            onClick={() => setIsShowHambugerMenu(true)}
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* HAMBURGER MENU */}
      {isShowHambugerMenu && (
        <HambugerMenu setIsShowHambugerMenu={setIsShowHambugerMenu} />
      )}
    </>
  );
};

export default Header;
