import classNames from "classnames";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "store/hook";
import { fetchSeats } from "store/slices/seatsSlice";

const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "K", "J"];
const cols = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

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
  }, [showtimeId]);

  const handlePickSeat = (
    seat: { row: string; col: number },
    isBooked: boolean
  ) => {
    const exied = selected?.some(
      (item) => item.col == seat.col && item.row == seat.row
    );

    if (isBooked) {
      toast.error(`ghế đã được chọn rồi `);
    } else {
      if (exied) {
        const selectedNew = selected?.filter(
          (item) => !(item.col == seat.col && item.row == seat.row)
        );

        setSelected(selectedNew);
      } else {
        if (selected.length < countTiket) {
          setSelected([...selected, seat]);
        }
        if (selected.length == countTiket) {
          toast.error(`Bạn chỉ được chọn tối đa ${countTiket} ghế`);
        }
      }
    }
  };

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center p-[20px] bg-white rounded-[10px]">
      <div className="flex md:gap-[20px] justify-center md:flex-row flex-col gap-[10px]">
        <div className="flex gap-[10px] items-end">
          <div className="w-[30px] h-[30px] border-[2px] border-green-500 border-b-[5px]  rounded-[5px]"></div>
          <p>Available</p>
        </div>
        <div className="flex gap-[10px] items-end">
          <div className="w-[30px] h-[30px] bg-green-600 border-b-[5px] border-green-700 rounded-[5px]"></div>
          <p>Selected</p>
        </div>
        <div className="flex gap-[10px] items-end">
          <div className="w-[30px] h-[30px] bg-gray-400 rounded-[5px] border-b-[5px] border-gray-500"></div>
          <p>Not Available</p>
        </div>
      </div>
      <div className=" overflow-auto  md:max-w-[600px] w-full ">
        <div className="flex flex-col gap-[10px] text-[12px] min-w-max">
          {rows.map((itemRow) => {
            return (
              <div className="flex gap-[10px] ">
                {cols.map((itemCol) => {
                  const isBooked =
                    seatsByShowtime.length > 0 &&
                    seatsByShowtime.some(
                      (item) => item.col == itemCol && item.row == itemRow
                    );

                  const isBlocked =
                    (["J", "K", "H"].includes(itemRow) && itemCol <= 3) ||
                    (["J", "K", "H"].includes(itemRow) && itemCol >= 17);
                  return (
                    <>
                      {isBlocked ? (
                        <div className="w-[30px]" />
                      ) : (
                        <div
                          onClick={() =>
                            handlePickSeat(
                              { row: itemRow, col: itemCol },
                              isBooked
                            )
                          }
                          className={classNames(
                            "cursor-pointer rounded-[5px] w-[30px]  h-[30px]  flex items-center justify-center",
                            selected?.some(
                              (item) =>
                                item.col == itemCol && item.row == itemRow
                            )
                              ? "bg-green-600 border-b-[5px] border-green-700 text-white"
                              : isBooked
                              ? "bg-gray-400 rounded-[5px] text-white border-b-[5px] border-gray-500"
                              : "border-b-[5px] border-green-500 border-[2px]"
                          )}
                        >
                          {itemRow}
                          {itemCol}
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
            );
          })}
          <div className="flex flex-col gap-[10px]  w-full text-center">
            <div className="h-[10px] bg-[#5f1a89] rounded-[10px]"></div>
            <h3 className="font-semibold text-[20px] text-black">
              THEATER SCREEN
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seats;
