import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bgSlide1 from "../../assets/Hero/bg-image1.svg";
import bgSlide2 from "../../assets/Hero/bg-image2.jpg";
import bgSlide3 from "../../assets/Hero/bg-image3.jpg";
import iconPlay from "@assets/Section1/icon-play.svg";
import TrailerMovie from "@components/TrailerMovie";

const dataSlide = [
  {
    id: 1,
    bgImage: bgSlide1,
    title: "Avatar: The Way of Water (3D)",
    genre: "Action, Adventure",
    time: "2hr 35mins",
    url_trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0",
  },
  {
    id: 2,
    bgImage: bgSlide2,
    title: "X-Men: Days of Future Past",
    genre: "Action, Adventure",
    time: "2hr 30mins",
    url_trailer: "https://www.youtube.com/watch?v=pK2zYHWDZKo",
  },
  {
    id: 3,
    bgImage: bgSlide3,
    title: "The Fate of the Furious",
    genre: "Action, Adventure",
    time: "3hr 30mins",
    url_trailer: "https://www.youtube.com/watch?v=JwMKRevYa_M",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % dataSlide.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChangeSlide = (index: number) => {
    setCurrent(index);
  };

  const handleShowTrailerMovie = (url: string | null) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(url);
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[400px] md:h-[85vh] overflow-hidden text-white">
      {/* SLIDES WRAPPER */}
      <motion.div
        className="flex h-full"
        animate={{ x: `-${current * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {dataSlide.map((item) => (
          <div
            key={item.id}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            // style={{
            //   backgroundImage: `url(${item.bgImage})`,
            // }}
          >
            <img
              src={item.bgImage}
              alt={item.title}
              loading={item.id === 1 ? "eager" : "lazy"}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#12041a]" />

            {/* Content */}
            <div className="relative z-[50] h-full flex items-center">
              <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full">
                <div className="max-w-2xl flex flex-col gap-4 md:gap-6">
                  <motion.h1
                    key={`title-${current}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="font-medium text-2xl sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[80px] leading-[1.5] tracking-normal"
                  >
                    {item.title}
                  </motion.h1>

                  <motion.div
                    key={`info-${current}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center gap-4 text-sm md:text-base text-gray-200 flex-wrap"
                  >
                    <span>{item.genre}</span>
                    <span className="w-1 h-1 bg-white rounded-full" />
                    <span>{item.time}</span>
                  </motion.div>

                  <motion.div
                    key={`btn-${current}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex items-center gap-6 mt-4"
                  >
                    <button
                      onClick={() => handleShowTrailerMovie(item.url_trailer)}
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 rounded-full hover:opacity-90 transition"
                    >
                      <img src={iconPlay} className="w-4" loading="lazy" />
                      <span className="text-sm md:text-base">
                        Watch Trailer
                      </span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {dataSlide.map((_, index) => (
          <button
            key={index}
            onClick={() => handleChangeSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-white"
                : "w-3 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      {/* Trailer Modal */}
      {isShowTrailerMovie && movieShowTrailer && (
        <TrailerMovie
          setIsShowTrailerMovie={setIsShowTrailerMovie}
          url_trailer={movieShowTrailer}
        />
      )}
    </section>
  );
};

export default Hero;
