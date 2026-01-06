import logo from "@assets/Header/logo.svg";
import { Link } from "react-router-dom";

const HeaderBookingMovie = ({ account }: { account: string }) => {
  return (
    <div>
      <div className="flex justify-between lg:h-[80px]  items-center ">
        <div className="h-[50px] w-[114px]">
          <Link to={"/"}>
            <img src={logo} className="w-full h-full object-contain" />
          </Link>
        </div>
        <div className="text-white text-[14px] font-semibold">
          <p>Welcome: {account}</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderBookingMovie;
