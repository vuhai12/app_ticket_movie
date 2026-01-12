import { useEffect, useState } from "react";
import logo from "../../assets/Header/logo.svg";
import { UserIcon } from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/solid";
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
  const [_, setContentWidth] = useState(0);

  const handleShowHambugerMenu = () => {
    setIsShowHambugerMenu(true);
  };

  useEffect(() => {
    const updateWidth = () =>
      setContentWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

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
      <div>
        <div className="flex justify-between h-[60px] lg:h-[80px] items-center ">
          <div className="h-[35px] w-[114px]">
            <Link to={"/"}>
              <img src={logo} className="w-full h-full object-contain" />
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-[50px] cursor-pointer md:gap-[30px] justify-start text-[#E3E3E3] text-[16px] leading-6 tracking-[-1px]">
              {menuItems.map((item) => {
                return (
                  <li className="relative" key={item.id}>
                    <NavLink to={item.path} key={item.id}>
                      {({ isActive }) => {
                        return (
                          <div className="relative flex justify-center items-center py-[10px]">
                            <p>{item.name}</p>
                            {isActive && (
                              <div className="w-[50px] h-[2px] bg-white absolute bottom-0"></div>
                            )}
                          </div>
                        );
                      }}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="md:flex gap-[20px] items-center hidden">
            {idUser || (access_token && user) ? (
              <div className="group relative px-[20px] py-[10px] ">
                <p className="text-white cursor-pointer">{`Hi, ${
                  user ?? idUser?.slice(0, 8)
                }`}</p>
                <div
                  className="flex absolute right-0 z-[99] w-[120px] opacity-0 bg-[#5f1a89] rounded-[5px] group-hover:opacity-100 gap-[8px] py-[8px] items-center justify-center cursor-pointer "
                  onClick={handleLogout}
                >
                  <UserIcon className="w-5 h-5 cursor-pointer text-white" />
                  <p className="text-white">Sign Out</p>
                </div>
              </div>
            ) : (
              <Link to={"/login"} className="flex gap-[8px] items-end">
                <UserIcon className="w-5 h-5 cursor-pointer text-white" />
                <p className="text-white">Sign In</p>
              </Link>
            )}
          </div>

          <div className="md:hidden sm:block" onClick={handleShowHambugerMenu}>
            <Bars3Icon className="w-6 h-6 text-white" />
          </div>

          {isShowHambugerMenu && (
            <HambugerMenu setIsShowHambugerMenu={setIsShowHambugerMenu} />
          )}
        </div>
        {/* <div
          style={{
            width: `${contentWidth}px`,
            marginLeft: `calc(50% - ${contentWidth / 2}px)`,
          }}
          className=" bg-[#5f1a89] py-[10px]"
        >
          <div className="xl:max-w-[1200px] mx-auto lg:px-[100px] md:px-[50px] px-[10px] xl:px-0 items-center flex justify-between">
            <nav className="hidden md:block">
              <ul className="flex gap-[50px] cursor-pointer md:gap-[30px] justify-start text-[#E3E3E3] text-[16px] leading-6 tracking-[-1px]">
                {menuItems.map((item) => {
                  return (
                    <li className="relative">
                      <NavLink to={item.path} key={item.id}>
                        {({ isActive }) => {
                          return (
                            <div className="relative flex justify-center items-center py-[10px]">
                              <p>{item.name}</p>
                              {isActive && (
                                <div className="w-[50px] h-[2px] bg-white absolute bottom-0"></div>
                              )}
                            </div>
                          );
                        }}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
