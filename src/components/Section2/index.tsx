import { useEffect, useState } from "react";
import imageCard1 from "@assets/Section2/image-card1.svg";
import imageCard2 from "@assets/Section2/image-card2.svg";
import imageCard1Horizontal from "@assets/Section2/card-horolzital.png";
import imageCard2Horizontal from "@assets/Section2/card1-horizoltal.png";
import bgImage from "@assets/Section2/bg-image.svg";
import border from "@assets/Section2/border.svg";
import { useNavigate } from "react-router-dom";

const Section2 = () => {
  const [contentWidth, setContentWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateWidth = () =>
      setContentWidth(document.documentElement.clientWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <>
      <div
        style={{
          width: `${contentWidth}px`,
          marginLeft: `calc(50% - ${contentWidth / 2}px)`,
        }}
        className=" flex gap-[40px] justify-center relative xl:min-h-[500px] lg:min-h-[450px] py-[50px]  "
      >
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="absolute bg-center top-0 left-0 h-full w-full bg-cover bg-no-repeat z-1"
        />
        <div className="bg-[#15061E]/80 opacity-100 bg-gradient-to-r from-[#000000]/100 to-[#000000]/0 absolute top-0 left-0 z-2 w-full h-full"></div>
        <div
          style={{ backgroundImage: `url:${bgImage}` }}
          className="absolute top-0 left-0 h-full w-full"
        />
        <div className="flex md:gap-[50px] gap-[20px] items-center z-[99] md:flex-row flex-col px-[30px] md:px-[100px] w-[1200px]">
          <div className="flex-1 md:block hidden">
            <img
              src={imageCard1}
              className="rotate-[-75deg] md:rotate-[0deg] object-cover h-full"
            />
          </div>
          <div className="md:hidden  flex items-center justify-center h-auto xs:h-[200px] ">
            <img
              src={imageCard1Horizontal}
              className="h-full object-contain object-center"
            />
          </div>
          <div className="flex relative h-auto xs:h-[320px]  lg:h-auto flex-col bg-no-repeat bg-center lg:flex-1  bg-cover justify-center items-center gap-[5px] xs:gap-[30px]">
            <img src={border} className="h-full w-full object-contain" />

            <div className=" items-center justify-center px-[30px] flex xs:gap-[20px] gap-[5px] flex-col absolute top-1/2 -translate-y-1/2 ">
              <h5 className="md:text-[20px] text-[8px] xs:text-[14px] font-semibold text-white">
                Tickets
              </h5>
              <div
                style={{
                  borderStyle: "dashed",
                  borderImage:
                    "repeating-linear-gradient(to right, white 0, white 10px, transparent 10px, transparent 20px) 1",
                }}
                className="text-white w-full border-t-2 border-white border-dashed"
              />

              <p className="text-white text-[8px] xs:text-[14px] text-center xs:line-clamp-3 line-clamp-1">
                You can Buy tickets online through Credit Card/Mobile
                Banking/Internet Banking
              </p>
              <button
                onClick={() => navigate(`/booking-movie`)}
                className="md:text-[14px] text-[10px] text-white border-[2px] border-white px-[5px] xs:px-[20px] py-[10px] rounded-[10px] line-clamp-1"
              >
                Buy Tickets
              </button>
            </div>
          </div>
          <div className="flex-1 md:block hidden">
            <img src={imageCard2} className="rotate-[75deg] md:rotate-[0deg]" />
          </div>
          <div className="md:hidden xs:h-[200px] h-auto">
            <img
              src={imageCard2Horizontal}
              className="object-contain object-center h-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Section2;
