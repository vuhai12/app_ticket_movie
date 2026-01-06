import classNames from "classnames";

const Showtime = ({
  showtimesWithMovie,
  setTime,
  setPrice,
  time,
  setShowtimeId,
}: {
  showtimesWithMovie: {
    branch_id: string;
    id: string;
    end_time: string;
    price: number;
    show_date: string;
    start_time: string;
  }[];
  setPrice: (price: number) => void;
  time: string | null;
  setTime: (time: string | null) => void;
  setShowtimeId: (showtimeId: string) => void;
}) => {
  const handlePickTime = (item: {
    branch_id: string;
    id: string;
    end_time: string;
    price: number;
    show_date: string;
    start_time: string;
  }) => {
    setTime(item.start_time);
    setPrice(item.price);
    setShowtimeId(item.id);
  };

  return (
    <div>
      <div className="flex flex-col gap-[20px] w-full">
        <h3 className="text-[18px] text-white font-semibold">
          Select Show Time
        </h3>
        <div className="bg-white rounded-[8px] p-[20px] flex justify-between items-center">
          <p className="text-[20px] font-semibold text-black">Hall</p>
          <div className="flex gap-[10px] text-gray-500">
            {showtimesWithMovie &&
              showtimesWithMovie.length > 0 &&
              showtimesWithMovie.map((item) => {
                return (
                  <div
                    onClick={() => handlePickTime(item)}
                    className={classNames(
                      "p-[10px] border-[1px] border-gray-300 rounded-[5px] cursor-pointer",
                      time == item.start_time ? "bg-[#5f1a89] text-white" : ""
                    )}
                  >
                    {item.start_time}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showtime;
