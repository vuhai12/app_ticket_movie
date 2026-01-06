import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Header/logo.svg";
import { UserIcon, X } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Home } from "lucide-react";
import { Clock } from "lucide-react";
import { Ticket } from "lucide-react";
import { RiTeamLine } from "react-icons/ri";
import { User } from "lucide-react";
import { clearUsers } from "store/slices/usersSlice";
import { useAppDispatch } from "store/hook";

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
  return (
    <div className="z-[999] fixed inset-0">
      <div
        className="absolute inset-0 bg-black opacity-50 "
        onClick={() => setIsShowHambugerMenu(false)}
      ></div>
      <div className="w-[75%] absolute inset-0 bg-[#431d5a] py-[20px] flex px-[20px] gap-[20px] flex-col">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="h-[30px]">
            <img src={logo} className="w-full h-full object-cover" />
          </Link>

          <X
            className="w-5 h-5 text-white cursor-pointer"
            onClick={() => setIsShowHambugerMenu(false)}
          />
        </div>
        <div className="flex gap-[40px] relative">
          <input
            placeholder="Search"
            className="text-white border-[#38134E] border-[1px] bg-white text-[14px] pl-[50px] pr-[20px] py-[10px] w-full rounded-[10px]"
          />
          <MagnifyingGlassIcon className="w-[20px] h-[20px] text-gray-400 absolute left-[20px] top-1/2 -translate-y-1/2" />
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div className="text-white">
              <NavLink
                to={item.path}
                className="py-[10px] flex gap-[10px] items-center"
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </NavLink>
            </div>
          );
        })}

        {idUser || (access_token && user) ? (
          <div className="">
            <p className="text-white cursor-pointer">{`Hi, ${
              user ?? idUser?.slice(0, 8)
            }`}</p>
            <div
              className="flex gap-[8px]  py-[8px] items-center mt-[20px] cursor-pointer "
              onClick={handleLogout}
            >
              <UserIcon className="w-5 h-5 cursor-pointer text-white" />
              <p className="text-white">Sign Out</p>
            </div>
          </div>
        ) : (
          <div className="text-white">
            <NavLink
              to={"/login"}
              className="py-[10px] flex gap-[10px] items-center"
            >
              <User className="w-5 h-5" />
              <p>Sign In</p>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default HambugerMenu;
