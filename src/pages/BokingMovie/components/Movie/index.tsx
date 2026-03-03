import { MdCheck } from "react-icons/md";
import { moviesWithShowtimes } from "../../../../types/movie.types";

const Movie = ({
  movieShowtimeWithDate,
  selectMovie,
  setSelectMovie,
}: {
  movieShowtimeWithDate: moviesWithShowtimes[];
  setSelectMovie: (selectMovie: string | null) => void;
  selectMovie: string | null;
}) => {
  const handlePickMovie = (id: string) => {
    setSelectMovie(id);
  };
  return (
    <div className="flex flex-col gap-[20px]">
      {movieShowtimeWithDate.length > 0 ? (
        <h3 className="text-[18px] text-white font-semibold">Select Movie</h3>
      ) : (
        <div className="bg-[#262626] p-[20px]">
          <h3 className="text-[16px] text-white font-medium">
            No films available yet
          </h3>
        </div>
      )}

      <div className="grid lg:grid-cols-6 gap-[20px] md:grid-cols-3  grid-cols-2 cursor-pointer">
        {movieShowtimeWithDate.map((item) => {
          return (
            <div
              className="flex flex-col gap-[10px]"
              onClick={() => handlePickMovie(item.id)}
            >
              <div className="rounded-[5px] overflow-hidden relative">
                <img
                  loading="lazy"
                  src={item.poster_url}
                  className="h-full object-cover object-center w-full"
                />
                {selectMovie == item.id && (
                  <MdCheck className="text-[#5f1a89] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[30px] h-[30px] rounded-[50%]" />
                )}
              </div>
              <p className="text-[14px] text-gray-500">{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Movie;
