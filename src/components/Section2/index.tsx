import imageCard1 from "@assets/Section2/image-card1.svg";
import imageCard2 from "@assets/Section2/image-card2.svg";
import imageCard1Horizontal from "@assets/Section2/card-horolzital.png";
import imageCard2Horizontal from "@assets/Section2/card1-horizoltal.png";
import bgImage from "@assets/Section2/bg-image.svg";
import border from "@assets/Section2/border.svg";
import { useNavigate } from "react-router-dom";

const Section2 = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative w-full overflow-hidden py-12 lg:py-20 bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/40" />

      {/* Content giữ 1200px */}
      <div className="relative z-10 max-w-[900px] mx-auto px-4  flex flex-col md:flex-row items-center gap-8">
        {/* Left image desktop */}
        <div className="hidden md:block flex-1">
          <img src={imageCard1} alt="" className="w-full object-contain" />
        </div>

        {/* Left image mobile */}
        <div className="md:hidden h-[200px] w-full">
          <img
            src={imageCard1Horizontal}
            alt=""
            className="h-full object-contain mx-auto"
          />
        </div>

        {/* Center ticket */}
        <div className="relative flex justify-center items-center">
          <img src={border} alt="" className="w-[250px] md:w-[320px]" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center gap-4">
            <h5 className="text-white font-semibold text-sm md:text-xl">
              Tickets
            </h5>

            <div className="w-full border-t border-dashed border-white" />

            <p className="text-white text-xs md:text-sm">
              You can Buy tickets online through Credit Card / Mobile Banking /
              Internet Banking
            </p>

            <button
              onClick={() => navigate("/booking-movie")}
              className="text-white border-2 border-white px-5 py-2 rounded-lg text-sm hover:bg-white hover:text-black transition"
            >
              Buy Tickets
            </button>
          </div>
        </div>

        {/* Right image desktop */}
        <div className="hidden md:block flex-1">
          <img src={imageCard2} alt="" className="w-full object-contain" />
        </div>

        {/* Right image mobile */}
        <div className="md:hidden h-[200px] w-full">
          <img
            src={imageCard2Horizontal}
            alt=""
            className="h-full object-contain mx-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Section2;
