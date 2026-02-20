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
      className="relative w-full overflow-hidden py-16 lg:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT IMAGE */}
          <div className="flex-1 w-full">
            {/* Desktop */}
            <img
              src={imageCard1}
              alt=""
              className="hidden lg:block w-full object-contain hover:scale-105 transition duration-500"
            />

            {/* Mobile */}
            <img
              src={imageCard1Horizontal}
              alt=""
              className="lg:hidden w-full max-h-[220px] object-contain mx-auto"
            />
          </div>

          {/* CENTER TICKET CARD */}
          <div className="relative flex justify-center items-center w-full lg:w-auto">
            {/* Border Image */}
            <img
              src={border}
              alt=""
              className="w-[260px] sm:w-[320px] lg:w-[380px] drop-shadow-2xl"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center gap-5">
              <h5 className="text-white font-semibold text-lg lg:text-2xl tracking-wide">
                🎟 Tickets
              </h5>

              <div className="w-full border-t border-dashed border-white/70" />

              <p className="text-gray-200 text-xs sm:text-sm lg:text-base leading-relaxed">
                Buy tickets online via Credit Card, Mobile Banking or Internet
                Banking with fast & secure payment.
              </p>

              <button
                onClick={() => navigate("/booking-movie")}
                className="mt-2 px-6 py-3 rounded-xl border-2 border-white text-white 
                           hover:bg-white hover:text-black 
                           transition duration-300 font-semibold shadow-lg"
              >
                Buy Tickets
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 w-full">
            {/* Desktop */}
            <img
              src={imageCard2}
              alt=""
              className="hidden lg:block w-full object-contain hover:scale-105 transition duration-500"
            />

            {/* Mobile */}
            <img
              src={imageCard2Horizontal}
              alt=""
              className="lg:hidden w-full max-h-[220px] object-contain mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
