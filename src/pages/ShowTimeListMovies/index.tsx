import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";
import ShowTimeItem from "./components/ShowTimeItem";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMoviesWithShowtimes } from "store/slices/moviesWithShowtimesSlice";
import TheatreLocations from "@components/TheatreLocations";

const dateInfo = [
  { id: 1, day: 20, weekday: "Monday", month: "Oct" },
  { id: 2, day: 21, weekday: "Tuesday", month: "Oct" },
  { id: 3, day: 22, weekday: "Wednesday", month: "Oct" },
  { id: 4, day: 23, weekday: "Thursday", month: "Oct" },
  { id: 5, day: 24, weekday: "Friday", month: "Oct" },
  { id: 6, day: 25, weekday: "Saturday", month: "Oct" },
  { id: 7, day: 26, weekday: "Sunday", month: "Oct" },
];

const ShowTimeListMovies = () => {
  const [weekday, setWeekday] = useState("Monday");
  const [timeChecked, setTimeChecked] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const [cinemaId, setcinemaId] = useState<null | string>(() =>
    localStorage.getItem("cinemaId")
  );

  const [locationCinema, setLocationCinema] = useState<null | string>(() =>
    localStorage.getItem("location")
  );

  const [isPopupTheatreLocations, setIsPopupTheatreLocations] = useState(
    !locationCinema
  );

  const { data } = useAppSelector((state) => state.moviesWithShowtimes);

  useEffect(() => {
    if (cinemaId) {
      dispatch(fetchMoviesWithShowtimes(cinemaId));
    }
  }, [dispatch, cinemaId]);

  const handleChangeDay = (weekday: string) => {
    setWeekday(weekday);
    setTimeChecked(null);
  };

  const showtimeWithDate = data
    .map((item) => {
      if (item.show_times.length == 0) return null;
      const show_times = item.show_times.filter((item) => {
        return (
          new Date(item.show_date).toLocaleDateString("en-US", {
            weekday: "long",
          }) == weekday
        );
      });
      if (show_times.length == 0) return null;
      return {
        ...item,
        show_times,
      };
    })
    .filter((item): item is NonNullable<typeof item> => !!item);

  return (
    <MainLayout>
      <div className="my-[30px] flex gap-[30px]">
        <div className="w-[5px] bg-[#5f1a89]" />
        <div className="flex flex-col gap-[20px]">
          <div className="font-semibold text-white">
            <h3 className="text-[23px]">Weekly Showtime</h3>
          </div>
        </div>
      </div>
      <h3 className="text-white text-[16px] font-semibold my-[20px]">
        Location:{" "}
        <span
          onClick={() => setIsPopupTheatreLocations(true)}
          className="underline cursor-pointer"
        >
          {locationCinema}
        </span>
      </h3>
      <div className="flex flex-col gap-[10px] text-white">
        <div className="flex gap-[30px] border-b-[1px] border-[#5f1a89] font-semibold flex-wrap">
          {dateInfo.map((item) => {
            return (
              <div
                key={item.id}
                className="flex cursor-pointer gap-[10px] items-center py-[10px] flex-col relative"
                onClick={() => handleChangeDay(item.weekday)}
              >
                <div className="flex gap-[10px] items-center justify-center flex-col">
                  <h3 className="text-[25px]">
                    {item.day} <span className="text-[16px]">{item.month}</span>
                  </h3>
                  <p className="text-[12px] text-gray-400">{item.weekday}</p>
                </div>
                {item.weekday == weekday && (
                  <div className="h-[3px] w-[60px] bg-white absolute bottom-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-[20px] mt-[30px]">
        {showtimeWithDate.length > 0 ? (
          showtimeWithDate.map((item) => {
            return (
              <ShowTimeItem
                timeChecked={timeChecked}
                setTimeChecked={setTimeChecked}
                release_date={item.release_date}
                movie_id={item.id}
                image={item.poster_url}
                title={item.title}
                category={item.category}
                actor={item.actor}
                release={item.release_date}
                language={"English"}
                weekday={weekday}
                trailer={item.trailer_url}
                show_times={item.show_times}
              />
            );
          })
        ) : (
          <div className="bg-[#262626] p-[20px]">
            <h3 className="text-[16px] text-white font-medium">
              No showtimes available yet
            </h3>
          </div>
        )}
      </div>
      {isPopupTheatreLocations && (
        <TheatreLocations
          setLocationCinema={setLocationCinema}
          setIsPopupTheatreLocations={setIsPopupTheatreLocations}
          locationCinema={locationCinema}
          setcinemaId={setcinemaId}
        />
      )}
    </MainLayout>
  );
};

export default ShowTimeListMovies;
