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

  return (
    <MainLayout>
      <div className="flex flex-col gap-[50px]">
        {movieData && movieData.length > 0 && (
          <MovieHero
            title={movieData[0].title}
            category={movieData[0].category}
            actor={movieData[0].actor}
            release={formatDate(movieData[0].release_date)}
            language="English"
            image={movieData[0].poster_url}
            url_trailer={movieData[0].trailer_url}
          />
        )}

        <div className=" flex gap-[30px]">
          <div className="w-[5px] bg-[#5f1a89]" />
          <div className="flex flex-col gap-[20px]">
            <div className="font-semibold text-white">
              <h3 className="text-[23px]">SYNOPSIS</h3>
            </div>
          </div>
        </div>
        {movieData && movieData.length > 0 && (
          <div>
            <p className="text-[16px] text-white">{movieData[0].description}</p>
          </div>
        )}

        <ShowtimeSection show_times={showtimeData} />
      </div>
    </MainLayout>
  );
};

export default MovieDetail;
