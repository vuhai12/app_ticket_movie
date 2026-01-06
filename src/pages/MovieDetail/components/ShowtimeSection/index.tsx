import ShowtimeList from "../ShowtimeList";
import { useState } from "react";
import { Showtime } from "../../../../types/showtime.type";

const dateInfo = [
  { id: 1, day: 20, weekday: "Monday", month: "Oct" },
  { id: 2, day: 21, weekday: "Tuesday", month: "Oct" },
  { id: 3, day: 22, weekday: "Wednesday", month: "Oct" },
  { id: 4, day: 23, weekday: "Thursday", month: "Oct" },
  { id: 5, day: 24, weekday: "Friday", month: "Oct" },
  { id: 6, day: 25, weekday: "Saturday", month: "Oct" },
  { id: 7, day: 26, weekday: "Sunday", month: "Oct" },
];

const ShowtimeSection = ({ show_times }: { show_times: Showtime[] }) => {
  const [weekday, setWeekday] = useState("Monday");
  const [timeChecked, setTimeChecked] = useState<string | null>(null);

  const handleChangeDay = (weekday: string) => {
    setWeekday(weekday);
    setTimeChecked(null);
  };

  const showtimeWithDate = show_times.filter((item) => {
    return (
      new Date(item.show_date).toLocaleDateString("en-US", {
        weekday: "long",
      }) == weekday
    );
  });

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex gap-[30px] border-b-[1px] border-[#5f1a89] font-semibold flex-wrap">
        {dateInfo.map((item) => {
          return (
            <div
              className="flex cursor-pointer gap-[10px] items-center py-[10px] flex-col relative"
              onClick={() => handleChangeDay(item.weekday)}
            >
              <div className="flex gap-[10px] items-center justify-center flex-col">
                <h3 className="text-[25px] text-white">
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
      <ShowtimeList
        weekday={weekday}
        timeChecked={timeChecked}
        setTimeChecked={setTimeChecked}
        show_times={showtimeWithDate}
      />
    </div>
  );
};

export default ShowtimeSection;
