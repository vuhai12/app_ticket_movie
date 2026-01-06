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

  const handleShowTrailerMovie = (id: string) => {
    setIsShowTrailerMovie(true);
    setMovieShowTrailer(id);
  };

  const navigate = useNavigate();
  return (
    <div className="flex lg:flex-row flex-col bg-[#252629]">
      <div className="lg:flex-[1] flex-[1] px-[20px] py-[10px] bg-no-repeat bg-cover bg-center">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="w-full xl:h-full h-[300px] bg-no-repeat bg-cover bg-center rounded-[10px]"
        />
      </div>
      <div className="w-[1px] bg-gray-700" />
      <div className="lg:flex-[1]  md:flex-[1] flex-1 flex flex-col gap-[20px] text-white px-[20px] py-[10px]">
        <h3 className="text-[25px] font-semibold">{title}</h3>
        <div className="flex flex-col gap-[10px] text-[14px]">
          <p className="flex flex-wrap gap-[10px] items-center">
            <FaClock className="text-yellow-400" />
            <span>{dayjs(release_date).format("DD-MM-YYYY")}</span>
          </p>
          <p>
            Category: <span>{category}</span>
          </p>
          <p className="line-clamp-2">
            Actor: <span>{actor}</span>
          </p>
          <p>
            Release: <span>{release}</span>
          </p>
          <p>
            Language: <span>{language}</span>
          </p>
        </div>
        <div className="flex gap-[10px] text-[12px]">
          <button
            onClick={() => navigate(`/movie/${movie_id}`)}
            className="py-[10px] px-[15px] bg-[#5f1a89] text-white rounded-[5px]"
          >
            Detail
          </button>
          <button
            onClick={() => handleShowTrailerMovie(movie_id)}
            className="py-[10px] px-[15px] border-[1px] border-white text-white rounded-[5px]"
          >
            Watch Trailer
          </button>
        </div>
      </div>
      <div className="w-[1px] bg-gray-700" />
      <div className="lg:flex-[3] md:flex-[2] ">
        <ShowtimeList
          weekday={weekday}
          show_times={show_times}
          timeChecked={timeChecked}
          setTimeChecked={setTimeChecked}
        />
      </div>
      {isShowTrailerMovie && movieShowTrailer == movie_id && (
        <TrailerMovie
          setIsShowTrailerMovie={setIsShowTrailerMovie}
          url_trailer={trailer}
        />
      )}
    </div>
  );
};

export default ShowTimeItem;
