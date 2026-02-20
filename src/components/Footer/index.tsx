import logo from "@assets/Footer/logo.svg";
import logoApp from "@assets/Footer/logo-app.svg";
import iconYoutu from "@assets/Footer/icon-youtu.svg";
import iconInsta from "@assets/Footer/icon-insta.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#12071A] text-white">
      <div className="max-w-[900px] mx-auto px-4 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo + Info */}
          <div className="flex flex-col gap-4">
            <img src={logo} className="h-8 w-fit" alt="logo" />

            <h5 className="text-sm font-semibold">Show Motion Limited</h5>

            <p className="text-sm text-gray-300 leading-relaxed">
              Level 8, Bashundhara City 13/3 Ka, Panthapath, Tejgaon Dhaka 1215,
              Bangladesh.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h5 className="text-base font-semibold">Contact Us</h5>

            <div>
              <p className="text-sm font-semibold">Phone Number</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                (+88) 09617660660
                <br />
                01755665544
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold">Email Address</p>
              <p className="text-sm text-gray-300">info@cineplexbd.com</p>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-4">
            <h5 className="text-base font-semibold">Information</h5>

            <ul className="flex flex-col gap-3 text-sm text-gray-300">
              <li>
                <Link to="/show-time" className="hover:text-white transition">
                  Showtime
                </Link>
              </li>
              <li>
                <Link
                  to="/ticket-price"
                  className="hover:text-white transition"
                >
                  Ticket Price
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="flex flex-col gap-4">
            <h5 className="text-base font-semibold">Download App</h5>

            <img
              src={logoApp}
              className="h-10 w-fit cursor-pointer hover:opacity-80 transition"
              alt="download-app"
            />
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h5 className="text-base font-semibold">Follow Us On</h5>

            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
              <img src={iconYoutu} className="w-7" alt="youtube" />
              <span className="text-sm text-gray-300">Youtube</span>
            </div>

            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
              <img src={iconInsta} className="w-7" alt="instagram" />
              <span className="text-sm text-gray-300">Instagram</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-[30px] text-center">
          © 2023 Show Motion Limited. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
