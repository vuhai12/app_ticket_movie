import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import iconPlay from "@assets/Section1/icon-play.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMovies } from "store/slices/movieSlice";
import TrailerMovie from "@components/TrailerMovie";

const dataSection1 = [
  { id: 1, status: "now_showing", name: "Now Showing" },
  { id: 2, status: "coming_soon", name: "Coming Soon" },
];

const Section1 = () => {
  const [status, setStatus] = useState("now_showing");
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const { data, loading } = useAppSelector((state) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies({ status, from: 0, to: 9 }));
  }, [dispatch, status]);

  const handleShowTrailerMovie = (url: string) => {
    setTrailerUrl(url);
    setIsShowTrailerMovie(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 bg-[#0f0516]"
    >
      <div className="container px-[20px] lg:px-12 text-white">
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#451662] pb-6">
          {/* Tabs */}
          <div className="flex gap-8">
            {dataSection1.map((item) => (
              <button
                key={item.id}
                onClick={() => setStatus(item.status)}
                className={`relative text-sm md:text-base font-semibold transition ${
                  status === item.status
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}

                {status === item.status && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute left-0 -bottom-3 w-full h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* View All Desktop */}
          <Link
            to="/movie-list"
            className="hidden md:inline-block text-sm font-semibold border border-purple-500 text-purple-400 px-6 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition duration-300"
          >
            View All
          </Link>
        </div>

        {/* ================= MOVIE GRID ================= */}

        {loading && !data?.dataMovies?.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 pt-10">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full aspect-[2/3] bg-gray-700 rounded-xl"></div>
                <div className="mt-4 h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="mt-2 h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : data?.dataMovies?.length === 0 ? (
          "No movies available"
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 pt-10">
            {data?.dataMovies?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true }}
                className="group relative rounded-xl overflow-hidden transition duration-300 hover:-translate-y-2"
              >
                {/* Poster */}
                <div
                  onClick={() => handleShowTrailerMovie(item.trailer_url)}
                  className="relative cursor-pointer"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={item.poster_url}
                    alt={item.title}
                    className="w-full aspect-[2/3] object-cover rounded-xl"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center backdrop-blur-sm"
                    >
                      <img
                        src={iconPlay}
                        className="w-5"
                        alt="play"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4">
                  <h5 className="text-sm md:text-base font-semibold line-clamp-1">
                    {item.title}
                  </h5>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                    {item.category}
                  </p>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/booking-movie")}
                    className="flex-1 text-xs bg-gradient-to-r from-purple-600 to-pink-600 py-2 rounded-lg hover:opacity-90 transition"
                  >
                    Get Tickets
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/movie/${item.id}`)}
                    className="flex-1 text-xs border border-purple-500 py-2 rounded-lg hover:bg-purple-500 transition"
                  >
                    Detail
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View All Mobile */}
        <div className="flex justify-center md:hidden pt-10">
          <Link
            to="/movie-list"
            className="text-sm font-semibold border border-purple-500 text-purple-400 px-6 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition"
          >
            View All
          </Link>
        </div>
      </div>

      {/* ================= TRAILER MODAL ================= */}
      {isShowTrailerMovie && trailerUrl && (
        <TrailerMovie
          setIsShowTrailerMovie={setIsShowTrailerMovie}
          url_trailer={trailerUrl}
        />
      )}
    </motion.section>
  );
};

export default Section1;
