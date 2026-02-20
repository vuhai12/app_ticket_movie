import Movie from "./components/Movie";
import Showtime from "./components/ShowTime";
import TicketSummary from "./components/TicketSummary";
import Quantity from "./components/Quantity";
import Seats from "./components/Seats";
import MainLayout from "Layout/MainLayout";
import { useEffect, useMemo, useState } from "react";
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
    localStorage.getItem("location"),
  );

  const [cinemaId, setcinemaId] = useState<null | string>(() =>
    localStorage.getItem("cinemaId"),
  );

  const [isPopupTheatreLocations, setIsPopupTheatreLocations] =
    useState(!locationCinema);

  const dispatch = useAppDispatch();
  const { data = [] } = useAppSelector((state) => state.moviesWithShowtimes);

  /* Reset logic */
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

  /* Filter showtime by weekday */
  const movieShowtimeWithDate = useMemo(() => {
    return data
      .map((item) => {
        const show_times = item.show_times?.filter((showtime) => {
          return (
            new Date(showtime.show_date).toLocaleDateString("en-US", {
              weekday: "long",
            }) === weekday
          );
        });

        if (!show_times || show_times.length === 0) return null;

        return { ...item, show_times };
      })
      .filter((item): item is NonNullable<typeof item> => !!item);
  }, [data, weekday]);

  const selectedMovieData = movieShowtimeWithDate.find(
    (item) => item.id === selectMovie,
  );

  const showtimesWithMovie = selectedMovieData?.show_times;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Location */}
            <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
              <h3 className="text-white text-sm">
                Location:{" "}
                <span
                  onClick={() => setIsPopupTheatreLocations(true)}
                  className="text-yellow-400 underline cursor-pointer"
                >
                  {locationCinema || "Select location"}
                </span>
              </h3>
            </div>

            {/* Date Picker */}
            <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
              <DatePicker setWeekday={setWeekday} weekday={weekday} />
            </div>

            {/* Movie */}
            {weekday && (
              <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
                <Movie
                  movieShowtimeWithDate={movieShowtimeWithDate}
                  selectMovie={selectMovie}
                  setSelectMovie={setSelectMovie}
                />
              </div>
            )}

            {/* Showtime */}
            {selectMovie && (
              <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
                <Showtime
                  setPrice={setPrice}
                  setTime={setTime}
                  time={time}
                  showtimesWithMovie={showtimesWithMovie ?? []}
                  setShowtimeId={setShowtimeId}
                />
              </div>
            )}

            {/* Quantity + Seats */}
            {time && (
              <>
                <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
                  <Quantity
                    setCountTiket={setCountTiket}
                    countTiket={countTiket}
                  />
                </div>

                {countTiket > 0 && (
                  <div className="bg-[#1f1f1f] p-4 rounded-xl border border-white/10">
                    <Seats
                      setSelected={setSelected}
                      selected={selected}
                      countTiket={countTiket}
                      showtimeId={showtimeId}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT - TICKET SUMMARY */}
          <div className="lg:w-[350px] w-full">
            <div className="lg:sticky lg:top-24">
              <TicketSummary
                image={selectedMovieData?.poster_url ?? ""}
                title={selectedMovieData?.title ?? ""}
                duration={selectedMovieData?.release_date ?? ""}
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
