import classNames from "classnames";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchSeats } from "store/slices/seatsSlice";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "J"];
const cols = Array.from({ length: 19 }, (_, i) => i + 1);

const Seats = ({
  selected,
  setSelected,
  countTiket,
  showtimeId,
}: {
  selected: { row: string; col: number }[];
  countTiket: number;
  setSelected: (selected: { row: string; col: number }[]) => void;
  showtimeId: string | null;
}) => {
  const dispatch = useAppDispatch();
  const { seatsByShowtime } = useAppSelector((state) => state.seats);

  useEffect(() => {
    if (showtimeId) {
      dispatch(fetchSeats(showtimeId));
    }
  }, [showtimeId, dispatch]);

  const handlePickSeat = (
    seat: { row: string; col: number },
    isBooked: boolean,
  ) => {
    const existed = selected.some(
      (item) => item.col === seat.col && item.row === seat.row,
    );

    if (isBooked) {
      toast.error("Ghế này đã được đặt");
      return;
    }

    if (existed) {
      setSelected(
        selected.filter(
          (item) => !(item.col === seat.col && item.row === seat.row),
        ),
      );
      return;
    }

    if (selected.length >= countTiket) {
      toast.error(`Chỉ được chọn tối đa ${countTiket} ghế`);
      return;
    }

    setSelected([...selected, seat]);
  };

  return (
    <div className="w-full bg-[#1f1f1f] rounded-2xl p-4 sm:p-6 border border-white/10 text-white">
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
        <Legend
          color="bg-green-500/20 border-2 border-green-400 border-b-4 border-b-green-600"
          label="Available"
        />
        <Legend color="bg-green-600 border-green-700" label="Selected" />
        <Legend color="bg-gray-500 border-gray-600" label="Booked" />
      </div>

      {/* Seat Map */}
      <div className="overflow-x-auto">
        <div className="min-w-max flex flex-col gap-2 items-center">
          {rows.map((itemRow) => (
            <div key={itemRow} className="flex gap-2">
              {cols.map((itemCol) => {
                const isBooked =
                  seatsByShowtime.length > 0 &&
                  seatsByShowtime.some(
                    (item) => item.col === itemCol && item.row === itemRow,
                  );

                const isBlocked =
                  (["J", "K", "H"].includes(itemRow) && itemCol <= 3) ||
                  (["J", "K", "H"].includes(itemRow) && itemCol >= 17);

                if (isBlocked) {
                  return (
                    <div key={`${itemRow}-${itemCol}`} className="w-6 sm:w-8" />
                  );
                }

                const isSelected = selected.some(
                  (item) => item.col === itemCol && item.row === itemRow,
                );

                return (
                  <div
                    key={`${itemRow}-${itemCol}`}
                    onClick={() =>
                      handlePickSeat({ row: itemRow, col: itemCol }, isBooked)
                    }
                    className={classNames(
                      "cursor-pointer rounded-md flex items-center justify-center text-[10px] sm:text-xs font-medium transition-all duration-200",
                      "w-6 h-6 sm:w-8 sm:h-8",
                      isSelected
                        ? "bg-green-600 border-b-4 border-green-800 text-white"
                        : isBooked
                          ? "bg-gray-500 border-b-4 border-gray-700 cursor-not-allowed text-white"
                          : "bg-green-500/10 border-2 border-green-400 border-b-4 border-b-green-600 hover:bg-green-500/20 hover:scale-105",
                    )}
                  >
                    {itemRow}
                    {itemCol}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Screen */}
          <div className="w-full mt-6 text-center">
            <div className="h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-2 shadow-lg"></div>
            <p className="text-sm tracking-widest text-gray-300">
              THEATER SCREEN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className={classNames("w-5 h-5 rounded-md border-b-4", color)} />
    <span>{label}</span>
  </div>
);

export default Seats;
