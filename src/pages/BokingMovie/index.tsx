import Movie from "./components/Movie";
import Showtime from "./components/ShowTime";
import TicketSummary from "./components/TicketSummary";
import Quantity from "./components/Quantity";
import Seats from "./components/Seats";
import MainLayout from "Layout/MainLayout";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchMoviesWithShowtimes } from "store/slices/moviesWithShowtimesSlice";
import DatePicker from "./components/DatePicker";
import TheatreLocations from "@components/TheatreLocations";

const BookingMovie = () => {
  const [weekday, setWeekday] = useState<string | null>("Monday");
  const [selectMovie, setSelectMovie] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [countTiket, setCountTiket] = useState(0);
  const [selected, setSelected] = useState<{ row: string; col: number }[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [showtimeId, setShowtimeId] = useState<null | string>(null);
  const [locationCinema, setLocationCinema] = useState<null | string>(() =>
    localStorage.getItem("location")
  );
  const [cinemaId, setcinemaId] = useState<null | string>(() =>
    localStorage.getItem("cinemaId")
  );
  const [isPopupTheatreLocations, setIsPopupTheatreLocations] = useState(
    !locationCinema
  );
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.moviesWithShowtimes);

  useEffect(() => {
    setSelectMovie(null);
    setTime(null);
    setSelected([]);
  }, [weekday]);

  useEffect(() => {
    setTime(null);
    setCountTiket(0);
    setSelected([]);
  }, [selectMovie]);

  useEffect(() => {
    if (cinemaId) {
      dispatch(fetchMoviesWithShowtimes(cinemaId));
    }
  }, [dispatch, cinemaId]);

  const movieShowtimeWithDate = data
    .map((item) => {
      if (item.show_times.length == 0) return null;
      const show_times = item.show_times.filter((showtime) => {
        return (
          new Date(showtime.show_date).toLocaleDateString("en-US", {
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

  const showtimesWithMovie = movieShowtimeWithDate.filter((item) => {
    return item.id == selectMovie;
  })[0]?.show_times;

  const movieInfo = movieShowtimeWithDate.filter((item) => {
    return item.id == selectMovie;
  })[0];

  return (
    <MainLayout>
      <div className="flex gap-[30px] py-[30px] lg:flex-row flex-col">
        <div className="md:flex-[3] gap-[20px] flex-col flex">
          <h3 className="text-white text-[16px] font-semibold">
            Location:{" "}
            <span
              onClick={() => setIsPopupTheatreLocations(true)}
              className="underline cursor-pointer"
            >
              {locationCinema}
            </span>
          </h3>
          <DatePicker setWeekday={setWeekday} weekday={weekday} />
          {weekday && (
            <Movie
              movieShowtimeWithDate={movieShowtimeWithDate}
              selectMovie={selectMovie}
              setSelectMovie={setSelectMovie}
            />
          )}
          {selectMovie && (
            <Showtime
              setPrice={setPrice}
              setTime={setTime}
              time={time}
              showtimesWithMovie={showtimesWithMovie}
              setShowtimeId={setShowtimeId}
            />
          )}
          {time && (
            <>
              <Quantity setCountTiket={setCountTiket} countTiket={countTiket} />{" "}
              {countTiket > 0 && (
                <Seats
                  setSelected={setSelected}
                  selected={selected}
                  countTiket={countTiket}
                  showtimeId={showtimeId}
                />
              )}
            </>
          )}
        </div>
        <div className="md:flex-[1]">
          <TicketSummary
            image={movieInfo?.poster_url}
            title={movieInfo?.title}
            duration={movieInfo?.release_date}
            showtime={showtimeId}
            quantity={countTiket}
            seat={selected}
            totalAmount={price * countTiket}
            selectMovie={selectMovie}
            locationCinema={locationCinema}
            time={time}
          />
        </div>
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

export default BookingMovie;
