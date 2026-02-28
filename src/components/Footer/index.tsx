import logo from "@assets/Footer/logo.svg";
import logoApp from "@assets/Footer/logo-app.svg";
import iconYoutu from "@assets/Footer/icon-youtu.svg";
import iconInsta from "@assets/Footer/icon-insta.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#12071A] text-white">
      <div className="container px-6 lg:px-12 py-14">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo + Info */}
          <div className="flex flex-col gap-5 text-center sm:text-left">
            <img
              src={logo}
              className="h-9 w-fit mx-auto sm:mx-0"
              alt="logo"
              loading="lazy"
            />

            <h5 className="text-base font-semibold tracking-wide">
              Show Motion Limited
            </h5>

            <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto sm:mx-0">
              Level 8, Bashundhara City 13/3 Ka, Panthapath, Tejgaon Dhaka 1215,
              Bangladesh.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-5 text-center sm:text-left">
            <h5 className="text-base font-semibold tracking-wide">
              Contact Us
            </h5>

            <div>
              <p className="text-sm font-medium">Phone Number</p>
              <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                (+88) 09617660660
                <br />
                01755665544
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Email Address</p>
              <p className="text-sm text-gray-400 mt-1">info@cineplexbd.com</p>
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-5 text-center sm:text-left">
            <h5 className="text-base font-semibold tracking-wide">
              Information
            </h5>

            <ul className="flex flex-col gap-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/show-time"
                  className="hover:text-white transition duration-300"
                >
                  Showtime
                </Link>
              </li>
              <li>
                <Link
                  to="/ticket-price"
                  className="hover:text-white transition duration-300"
                >
                  Ticket Price
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="hover:text-white transition duration-300"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div className="flex flex-col gap-5 text-center sm:text-left">
            <h5 className="text-base font-semibold tracking-wide">
              Download App
            </h5>

            <img
              src={logoApp}
              className="h-12 w-fit mx-auto sm:mx-0 cursor-pointer hover:scale-105 hover:opacity-90 transition duration-300"
              alt="download-app"
            />
          </div>

          {/* Social */}
          <div className="flex flex-col gap-5 text-center sm:text-left">
            <h5 className="text-base font-semibold tracking-wide">Follow Us</h5>

            <div className="flex justify-center flex-col sm:justify-start gap-4">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300">
                <img src={iconYoutu} className="w-7" alt="youtube" />
                <span className="text-sm text-gray-400 hover:text-white">
                  Youtube
                </span>
              </div>

              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition duration-300">
                <img src={iconInsta} className="w-7" alt="instagram" />
                <span className="text-sm text-gray-400 hover:text-white">
                  Instagram
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6">
          <p className="text-xs text-gray-500 text-center">
            © 2023 Show Motion Limited. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
