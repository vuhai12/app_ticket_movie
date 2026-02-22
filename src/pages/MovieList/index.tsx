import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";
import iconPlay from "@assets/Section1/icon-play.svg";
import Pagination from "@components/Pagination";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMovies } from "store/slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDebond } from "hook/useDebond";
import TrailerMovie from "@components/TrailerMovie";
import { motion, AnimatePresence } from "framer-motion";

const dataSection1 = [
  { id: 1, status: "now_showing", name: "Now Showing" },
  { id: 2, status: "coming_soon", name: "Coming Soon" },
];

/* =========================
   Animation Variants
========================= */

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const MovieList = () => {
  const [status, setStatus] = useState("now_showing");
  const [searchString, setSearchString] = useState<string | undefined>();
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState<string | null>(null);
  const [pageCurrent, setPageCurrent] = useState(1);

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.movies);

  const searchStringDebond = useDebond(searchString);
  const limit = 10;
  const from = (pageCurrent - 1) * limit;
  const to = from + limit - 1;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies({ title: searchStringDebond, status, from, to }));
  }, [dispatch, status, pageCurrent, searchStringDebond]);

  const handleShowTrailerMovie = (url: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(url);
  };

  return (
    <MainLayout>
      <section className="py-12 bg-[#0f0516] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-10">
          {/* ===== Header Section ===== */}
          <div className="flex flex-col lg:flex-row justify-between gap-6 lg:items-center">
            {/* Tabs */}
            <div className="flex gap-8 border-b border-white/10">
              {dataSection1.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setStatus(item.status);
                    setPageCurrent(1);
                  }}
                  className={`relative pb-4 text-sm md:text-base font-semibold transition ${
                    status === item.status
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.name}

                  {status === item.status && (
                    <motion.span
                      layoutId="activeTab"
                      className="absolute left-0 bottom-0 h-[3px] w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-[280px]">
              <input
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                placeholder="Search movie..."
                className="w-full bg-[#1e0d28] border border-white/10 rounded-full pl-12 pr-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
              />
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* ===== Movie Grid ===== */}
          <AnimatePresence mode="wait">
            <motion.div
              key={status + pageCurrent + searchStringDebond}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              {data?.dataMovies.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  transition={{ duration: 0.4 }}
                  className="group bg-[#1e0d28] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-700/20 transition duration-300"
                >
                  {/* Poster */}
                  <div
                    onClick={() => handleShowTrailerMovie(item.trailer_url)}
                    className="relative cursor-pointer aspect-[2/3] overflow-hidden"
                  >
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={item.poster_url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-white flex items-center justify-center">
                        <img src={iconPlay} className="w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3">
                    <h3 className="text-sm font-semibold line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400">{item.category}</p>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/booking-movie`)}
                        className="flex-1 text-xs py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition"
                      >
                        Get Ticket
                      </button>
                      <button
                        onClick={() => navigate(`/movie/${item.id}`)}
                        className="flex-1 text-xs py-2 rounded-lg border border-white/20 hover:bg-white/10 transition"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ===== Pagination ===== */}
          <Pagination
            limit={limit}
            setPageCurrent={setPageCurrent}
            pageCurrent={pageCurrent}
            totalItems={data?.total || 0}
          />
        </div>
      </section>

      {/* Trailer Modal */}
      <AnimatePresence>
        {isShowTrailerMovie && movieShowTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TrailerMovie
              setIsShowTrailerMovie={setIsShowTrailerMovie}
              url_trailer={movieShowTrailer}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default MovieList;
