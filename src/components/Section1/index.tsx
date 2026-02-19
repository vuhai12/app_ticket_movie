import { useEffect, useState } from "react";
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
  const [movieShowTrailer, setMovieShowTrailer] = useState("");

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies({ status, from: 0, to: 9 }));
  }, [dispatch, status]);

  const handleShowTrailerMovie = (id: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(id);
  };

  return (
    <section className="py-16">
      {/* Container 1200px */}
      <div className="max-w-[900px] mx-auto px-4 text-white">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#451662] pb-4">
          {/* Tabs */}
          <div className="flex gap-6">
            {dataSection1.map((item) => (
              <button
                key={item.id}
                onClick={() => setStatus(item.status)}
                className={`relative font-semibold text-sm sm:text-base ${
                  status === item.status ? "text-white" : "text-gray-400"
                }`}
              >
                {item.name}
                {status === item.status && (
                  <span className="absolute left-0 -bottom-2 w-full h-[3px] bg-white rounded"></span>
                )}
              </button>
            ))}
          </div>

          {/* View All (desktop) */}
          <Link
            to="/movie-list"
            className="hidden sm:inline-block text-sm font-semibold border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            View All
          </Link>
        </div>

        {/* MOVIE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 py-8">
          {data?.dataMovies?.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-lg overflow-hidden"
            >
              {/* Poster */}
              <div
                onClick={() => handleShowTrailerMovie(item.id)}
                className="relative cursor-pointer"
              >
                <img
                  src={item.poster_url}
                  alt={item.title}
                  className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 hidden md:flex items-center justify-center">
                  <div className="w-14 h-14 border-2 border-white rounded-full flex items-center justify-center">
                    <img src={iconPlay} className="w-4" />
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-3 flex flex-col gap-1">
                <h5 className="text-sm font-semibold line-clamp-1">
                  {item.title}
                </h5>
                <p className="text-xs text-gray-400 line-clamp-1">
                  {item.category}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-3 flex gap-2 md:opacity-0 md:group-hover:opacity-100 transition">
                <button
                  onClick={() => navigate("/booking-movie")}
                  className="flex-1 text-xs bg-[#5f1a89] py-2 rounded hover:bg-[#7a2bb5] transition"
                >
                  Get Tickets
                </button>
                <button
                  onClick={() => navigate(`/movie/${item.id}`)}
                  className="flex-1 text-xs bg-[#5f1a89] py-2 rounded hover:bg-[#7a2bb5] transition"
                >
                  Detail
                </button>
              </div>

              {/* Trailer Modal */}
              {isShowTrailerMovie && movieShowTrailer === item.id && (
                <TrailerMovie
                  setIsShowTrailerMovie={setIsShowTrailerMovie}
                  url_trailer={item.trailer_url}
                />
              )}
            </div>
          ))}
        </div>

        {/* View All (mobile) */}
        <div className="flex justify-center sm:hidden">
          <Link
            to="/movie-list"
            className="text-sm font-semibold border border-white px-6 py-2 rounded-lg"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section1;
