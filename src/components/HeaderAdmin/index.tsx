import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "store/hook";
import { clearUsers } from "store/slices/usersSlice";

const HeaderAdmin = () => {
  const idUser = localStorage.getItem("idUser");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const access_token = localStorage.getItem("access_token");
  const user = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("idUser");
    dispatch(clearUsers());
    navigate("/login");
  };
  return (
    <div className="flex justify-between h-[100px] items-center px-[10px]">
      <div className="md:flex gap-[40px] relative hidden">
        <input
          placeholder="Search"
          className="text-white border-[#38134E] border-[1px] bg-[#1e0d28] text-[16px] pl-[50px] pr-[20px] py-[16px] md:py-[5px]  md:h-[40px] w-[350px] h-[58px] rounded-[30px]"
        />
        <MagnifyingGlassIcon className="w-[20px] h-[20px] text-white absolute left-[20px] top-1/2 -translate-y-1/2" />
      </div>
      <div className="flex gap-[10px]">
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
    </div>
  );
};

export default HeaderAdmin;
