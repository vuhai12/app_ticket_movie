import { CheckIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { formatTimeAMPM } from "ultil/formatDate";
import { useNavigate } from "react-router-dom";

const dataShowtimeList = [
  {
    id: 1,
    day: "Monday",
  },
  {
    id: 2,
    day: "Tuesday",
  },
  {
    id: 3,
    day: "Wednesday",
  },
  {
    id: 4,
    day: "Thursday",
  },
  {
    id: 5,
    day: "Friday",
  },
  {
    id: 6,
    day: "Saturday",
  },
  {
    id: 7,
    day: "Sunday",
  },
];

const ShowtimeList = ({
  weekday,
  timeChecked,
  show_times,
  setTimeChecked,
}: {
  weekday: string;
  timeChecked: string | null;
  setTimeChecked: (timeChecked: string | null) => void;
  show_times: {
    branch_id: string;
    end_time: string;
    id: string;
    price: number;
    show_date: string;
    start_time: string;
  }[];
}) => {
  const navigate = useNavigate();

  const handleCheckTime = (time: string) => {
    setTimeChecked(time);
  };

  return (
    <div>
      <div className="flex flex-col gap-[20px] p-[20px] bg-[#262626]">
        <h3 className="text-[16px] text-white font-medium">
          {show_times && show_times.length > 0
            ? "Select Show Time"
            : "No showtimes available yet"}
        </h3>
        <div className="flex md:flex-row flex-col md:flex-wrap">
          {dataShowtimeList.map((item) => {
            if (item.day != weekday) return null;
            return (
              <div className="flex gap-[20px] flex-wrap">
                {show_times &&
                  show_times.length > 0 &&
                  show_times.map((item) => {
                    return (
                      <div
                        className={classNames(
                          `relative p-[10px] w-[110px] justify-center bg-[#55c8ff] cursor-pointer flex items-center gap-[5px]`,
                          item.start_time == timeChecked ? "bg-white" : ""
                        )}
                        onClick={() => handleCheckTime(item.start_time)}
                      >
                        <CheckIcon
                          className={classNames(
                            `text-black w-[15px] font-semibold`,
                            item.start_time == timeChecked ? "block" : "hidden"
                          )}
                        />

                        <p className="text-black text-[14px]">
                          {formatTimeAMPM(item.start_time)}
                        </p>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[15px] h-[15px] rounded-[50%] bg-[#252629]" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[15px] h-[15px] rounded-[50%] bg-[#252629]" />
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        {timeChecked && (
          <button
            onClick={() => navigate("/booking-movie")}
            className="mt-[10px] text-[14px] w-fit px-[20px] py-[10px] bg-[#5f1a89] text-white rounded-[5px]"
          >
            Get Tickets
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowtimeList;
