import { ReactNode, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import HeaderBookingMovie from "./components/HeaderBookingMovie";

const BookingMovieLayout = ({ children }: { children: ReactNode }) => {
  const [clientWidth, setClientWidth] = useState(0);
  useEffect(() => {
    const updateWidth = () => {
      setClientWidth(document.documentElement.clientWidth);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      <div className="xl:max-w-[1200px] mx-auto lg:px-[100px] px-[50px]">
        <HeaderBookingMovie account="xnsh" />
        <div
          style={{
            width: `${clientWidth}px`,
            marginLeft: `calc(50%  - ${clientWidth / 2}px)`,
          }}
          className="bg-[#15061e] w-screen ml-[calc(50%-50vw)]"
        >
          <div className="xl:max-w-[1200px] md:px-[50px] px-[15px] mx-auto">
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BookingMovieLayout;
