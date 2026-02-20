import MainLayout from "Layout/MainLayout";
import { useEffect } from "react";
import MovieHero from "./components/MovieHero";
import ShowtimeSection from "./components/ShowtimeSection";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMovieDetail } from "store/slices/movieDetailSlice";
import { formatDate } from "ultil/formatDate";
import { fetchShowtime } from "store/slices/showtimesSlice";

const MovieDetail = () => {
  const { movieId } = useParams();
  const dispatch = useAppDispatch();
  const { data: movieData } = useAppSelector((state) => state.movieDetail);
  const { data: showtimeData } = useAppSelector((state) => state.showtimes);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetail(movieId));
      dispatch(fetchShowtime(movieId));
    }
  }, [dispatch, movieId]);

  const movie = movieData?.[0];

  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-6 py-12 flex flex-col gap-16">
        {/* ================= HERO SECTION ================= */}
        {movie && (
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <MovieHero
              title={movie.title}
              category={movie.category}
              actor={movie.actor}
              release={formatDate(movie.release_date)}
              language="English"
              image={movie.poster_url}
              url_trailer={movie.trailer_url}
            />
          </div>
        )}

        {/* ================= SYNOPSIS ================= */}
        {movie && (
          <div className="bg-[#1a0f2a] rounded-3xl p-6 sm:p-10 shadow-lg flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-[5px] h-[40px] bg-[#5f1a89] rounded-full" />
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                SYNOPSIS
              </h3>
            </div>

            <p className="text-gray-300 leading-8 text-sm sm:text-base">
              {movie.description}
            </p>
          </div>
        )}

        {/* ================= SHOWTIMES ================= */}
        <div className="bg-[#1a0f2a] rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[5px] h-[40px] bg-[#5f1a89] rounded-full" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
              SHOWTIMES
            </h3>
          </div>

          <ShowtimeSection show_times={showtimeData} />
        </div>
      </div>
    </MainLayout>
  );
};

export default MovieDetail;
