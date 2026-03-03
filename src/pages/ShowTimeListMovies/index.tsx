import MainLayout from "Layout/MainLayout";
import { useEffect, useMemo, useState } from "react";
import ShowTimeItem from "./components/ShowTimeItem";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMoviesWithShowtimes } from "store/slices/moviesWithShowtimesSlice";
import TheatreLocations from "@components/TheatreLocations";
import { dataDate } from "@constants/dataDate";

const ShowTimeListMovies = () => {
  const dispatch = useAppDispatch();
  const { data = [] } = useAppSelector((state) => state.moviesWithShowtimes);

  const [weekday, setWeekday] = useState("Monday");
  const [timeChecked, setTimeChecked] = useState<string | null>(null);

  const [cinemaId, setcinemaId] = useState<string | null>(
    localStorage.getItem("cinemaId"),
  );

  const [locationCinema, setLocationCinema] = useState<string | null>(
    localStorage.getItem("location"),
  );

  const [isPopupTheatreLocations, setIsPopupTheatreLocations] =
    useState(!locationCinema);

  // Fetch data
  useEffect(() => {
    if (cinemaId) {
      dispatch(fetchMoviesWithShowtimes(cinemaId));
    }
  }, [dispatch, cinemaId]);

  // Change weekday
  const handleChangeDay = (day: string) => {
    setWeekday(day);
    setTimeChecked(null);
  };

  // Filter showtime theo weekday
  const showtimeWithDate = useMemo(() => {
    return data
      .map((movie) => {
        const filteredTimes =
          movie.show_times?.filter((st: any) => {
            return (
              new Date(st.show_date).toLocaleDateString("en-US", {
                weekday: "long",
              }) === weekday
            );
          }) ?? [];

        if (filteredTimes.length === 0) return null;

        return {
          ...movie,
          show_times: filteredTimes,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [data, weekday]);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Weekly Showtimes
          </h2>

          <p className="text-gray-400 text-sm">
            Location:{" "}
            <span
              onClick={() => setIsPopupTheatreLocations(true)}
              className="text-yellow-400 underline cursor-pointer"
            >
              {locationCinema || "Select Location"}
            </span>
          </p>
        </div>

        {/* Date selector */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 border-b border-purple-700">
            {dataDate.map((item) => {
              const active = item.weekday === weekday;

              return (
                <div
                  key={item.id}
                  onClick={() => handleChangeDay(item.weekday)}
                  className={`
            min-w-[95px] snap-start text-center cursor-pointer rounded-2xl p-4 transition-all duration-300
            ${
              active
                ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white scale-105 shadow-lg"
                : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
            }
          `}
                >
                  <h3 className="text-lg font-semibold">
                    {item.day}
                    <span className="text-xs ml-1 opacity-80">
                      {item.month}
                    </span>
                  </h3>
                  <p className="text-xs mt-1">{item.weekday}</p>
                </div>
              );
            })}
          </div>

          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-[#15061e] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-[#15061e] to-transparent" />
        </div>

        {/* Movie list */}
        <div className="flex flex-col gap-6 mt-8">
          {showtimeWithDate.length > 0 ? (
            showtimeWithDate.map((item) => (
              <div
                key={item.id}
                className="bg-[#1f1f1f] rounded-2xl p-4 sm:p-6 border border-white/10"
              >
                <ShowTimeItem
                  timeChecked={timeChecked}
                  setTimeChecked={setTimeChecked}
                  release_date={item.release_date ?? ""}
                  movie_id={item.id}
                  image={item.poster_url ?? ""}
                  title={item.title ?? ""}
                  category={item.category ?? ""}
                  actor={item.actor ?? ""}
                  release={item.release_date ?? ""}
                  language="English"
                  weekday={weekday}
                  trailer={item.trailer_url ?? ""}
                  show_times={item.show_times ?? []}
                />
              </div>
            ))
          ) : (
            <div className="bg-[#262626] rounded-xl p-6 text-center">
              <h3 className="text-white font-medium">
                No showtimes available for this day
              </h3>
            </div>
          )}
        </div>

        {/* Popup */}
        {isPopupTheatreLocations && (
          <TheatreLocations
            setLocationCinema={setLocationCinema}
            setIsPopupTheatreLocations={setIsPopupTheatreLocations}
            locationCinema={locationCinema}
            setcinemaId={setcinemaId}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default ShowTimeListMovies;
