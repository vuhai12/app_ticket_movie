import logo from "@assets/Footer/logo.svg";
import logoApp from "@assets/Footer/logo-app.svg";
import iconYoutu from "@assets/Footer/icon-youtu.svg";
import iconInsta from "@assets/Footer/icon-insta.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="md:grid-cols-[2]  grid-cols-1 grid lg:grid-cols-[1fr_1fr_1fr_1fr_1fr] gap-[30px] py-[40px]">
        <div className="flex flex-col gap-[10px]">
          <div className="h-[30px]  flex justify-start">
            <img className="" src={logo} />
          </div>
          <div className="flex flex-col gap-[10px] text-white">
            <h5 className="text-[14px] font-semibold">Show Motion Limited</h5>
            <p className="text-[14px]">
              Level 8, Bashundhara City13/3 Ka, Panthapath, TejgaonDhaka 1215,
              Bangladesh.
            </p>
            <p className="text-[14px]">
              Copyright© 2023 Show Motion Limited. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] text-white">
          <h5 className="text-[16px] font-semibold">Contact Us</h5>
          <div className="flex flex-col gap-[10px]">
            <p className="font-semibold text-[14px]">Phone Number</p>
            <p className="text-[14px]">
              (+88) 09617660660
              <br />
              01755665544
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="font-semibold text-[14px]">Email Address</p>
            <p className="xs:text-[14px] text-[12px]">info@cineplexbd.com</p>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] text-white">
          <h5 className="text-[16px] font-semibold">Information</h5>
          <ul className="flex flex-col gap-[10px]">
            <li className="text-[14px]">
              <Link to="/show-time">Showtime</Link>
            </li>
            <li className="text-[14px]">
              <Link to="/ticket-price">Ticket Price</Link>
            </li>
            <li className="text-[14px]">
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-[10px] text-white">
          <h5 className="text-[16px] font-semibold">Download App</h5>
          <div className=" w-full h-[35px]  rounded-[6px] flex">
            <img src={logoApp} className="h-full " />
          </div>
        </div>
        <div className="flex flex-col gap-[10px] text-white">
          <h5 className="text-[16px] font-semibold">Follow Us On</h5>
          <div className="flex gap-[5px] items-center">
            <img className="w-[30px]" src={iconYoutu} />
            <p className="text-[14px]">Youtube</p>
          </div>
          <div className="flex gap-[10px] items-center">
            <img className="w-[30px]" src={iconInsta} />
            <p className="text-[14px]">Instagram</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
