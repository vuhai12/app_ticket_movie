import imageCard1 from "@assets/Section2/image-card1.svg";
import imageCard2 from "@assets/Section2/image-card2.svg";
import imageCard1Horizontal from "@assets/Section2/card-horolzital.webp";
import imageCard2Horizontal from "@assets/Section2/card1-horizoltal.webp";
import bgImage from "@assets/Section2/bg-image.webp";
import border from "@assets/Section2/border.webp";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Section2 = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="relative w-full overflow-hidden py-16 lg:py-28 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/50" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            {/* Desktop */}
            <motion.img
              loading="lazy"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={imageCard1}
              alt=""
              className="hidden lg:block w-full object-contain"
            />

            {/* Mobile */}
            <img
              loading="lazy"
              src={imageCard1Horizontal}
              alt=""
              className="lg:hidden w-full max-h-[220px] object-contain mx-auto"
            />
          </motion.div>

          {/* CENTER TICKET CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative flex justify-center items-center w-full lg:w-auto"
          >
            {/* Border Image */}
            <motion.img
              loading="lazy"
              initial={{ rotate: -2 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              src={border}
              alt=""
              className="w-[260px] sm:w-[320px] lg:w-[380px] drop-shadow-2xl"
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6 px-6">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md 
               border border-white/20 flex items-center justify-center 
               text-2xl shadow-lg"
              >
                🎟
              </motion.div>

              {/* Title */}
              <motion.h5
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white font-semibold text-lg lg:text-2xl tracking-wide"
              >
                Buy Movie Tickets
              </motion.h5>

              {/* Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/booking-movie")}
                className="px-8 py-3 rounded-full 
               bg-gradient-to-r from-purple-600 to-pink-600 
               text-white font-semibold shadow-xl
               hover:shadow-pink-500/40 transition duration-300"
              >
                Get Ticket
              </motion.button>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 w-full"
          >
            {/* Desktop */}
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={imageCard2}
              alt=""
              className="hidden lg:block w-full object-contain"
            />

            {/* Mobile */}
            <img
              loading="lazy"
              src={imageCard2Horizontal}
              alt=""
              className="lg:hidden w-full max-h-[220px] object-contain mx-auto"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Section2;
