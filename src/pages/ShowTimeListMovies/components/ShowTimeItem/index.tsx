import { useState } from "react";
import ShowtimeList from "@pages/MovieDetail/components/ShowtimeList";
import { FaClock } from "react-icons/fa";
import TrailerMovie from "@components/TrailerMovie";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const ShowTimeItem = ({
  release_date,
  image,
  title,
  category,
  actor,
  release,
  language,
  weekday,
  trailer,
  movie_id,
  show_times,
  timeChecked,
  setTimeChecked,
}: {
  setTimeChecked: (timeChecked: string | null) => void;
  timeChecked: string | null;
  release_date: string;
  image: string;
  title: string;
  category: string;
  actor: string;
  release: string;
  language: string;
  weekday: string;
  trailer: string;
  movie_id: string;
  show_times: {
    branch_id: string;
    end_time: string;
    id: string;
    price: number;
    show_date: string;
    start_time: string;
  }[];
}) => {
  const [isShowTrailerMovie, setIsShowTrailerMovie] = useState(false);
  const [movieShowTrailer, setMovieShowTrailer] = useState("");
  const navigate = useNavigate();

  const handleShowTrailerMovie = (id: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(id);
  };

  return (
    <div className="w-full bg-[#1f1f1f] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
      <div className="flex flex-col lg:flex-row">
        {/* Poster */}
        <div className="lg:w-[280px] w-full h-[350px] lg:h-auto">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Movie Info */}
        <div className="flex-1 p-6 text-white flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <h3 className="text-xl lg:text-2xl font-semibold">{title}</h3>

            <div className="space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <FaClock className="text-yellow-400" />
                {dayjs(release_date).format("DD-MM-YYYY")}
              </p>

              <p>
                <span className="text-gray-400">Category:</span> {category}
              </p>

              <p className="line-clamp-2">
                <span className="text-gray-400">Actor:</span> {actor}
              </p>

              <p>
                <span className="text-gray-400">Release:</span> {release}
              </p>

              <p>
                <span className="text-gray-400">Language:</span> {language}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => navigate(`/movie/${movie_id}`)}
              className="px-4 py-2 rounded-lg bg-[#5f1a89] hover:bg-purple-700 transition text-sm font-medium"
            >
              View Detail
            </button>

            <button
              onClick={() => handleShowTrailerMovie(movie_id)}
              className="px-4 py-2 rounded-lg border border-white/30 hover:bg-white/10 transition text-sm font-medium"
            >
              Watch Trailer
            </button>
          </div>
        </div>

        {/* Showtime Section */}
        <div className="lg:w-[45%] w-full border-t lg:border-t-0 lg:border-l border-white/10 p-4 bg-[#242424]">
          <ShowtimeList
            weekday={weekday}
            show_times={show_times}
            timeChecked={timeChecked}
            setTimeChecked={setTimeChecked}
          />
        </div>
      </div>

      {/* Trailer Popup */}
      {isShowTrailerMovie && movieShowTrailer === movie_id && (
        <TrailerMovie
          setIsShowTrailerMovie={setIsShowTrailerMovie}
          url_trailer={trailer}
        />
      )}
    </div>
  );
};

export default ShowTimeItem;
