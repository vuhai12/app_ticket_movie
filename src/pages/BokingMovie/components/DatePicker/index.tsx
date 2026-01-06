import classNames from "classnames";

const dataDate = [
  { id: 1, day: 20, weekday: "Monday", month: "Oct" },
  { id: 2, day: 21, weekday: "Tuesday", month: "Oct" },
  { id: 3, day: 22, weekday: "Wednesday", month: "Oct" },
  { id: 4, day: 23, weekday: "Thursday", month: "Oct" },
  { id: 5, day: 24, weekday: "Friday", month: "Oct" },
  { id: 6, day: 25, weekday: "Saturday", month: "Oct" },
  { id: 7, day: 26, weekday: "Sunday", month: "Oct" },
];

const DatePicker = ({
  weekday,
  setWeekday,
}: {
  weekday: string | null;
  setWeekday: (weekday: string | null) => void;
}) => {
  const handlePickDate = (weekday: string) => {
    setWeekday(weekday);
  };

  return (
    <div className="flex flex-col gap-[20px] relative">
      <h3 className="text-[16px] text-white font-semibold">Select Date</h3>
      <div className="flex gap-[20px] flex-wrap">
        {dataDate.map((item) => {
          return (
            <div
              onClick={() => handlePickDate(item.weekday)}
              className={classNames(
                "flex w-[100px] cursor-pointer flex-col  gap-[5px] p-[10px] rounded-[5px] border-[1px] border-gray-300",
                weekday == item.weekday
                  ? "bg-[#5f1a89] text-white font-semibold"
                  : "text-gray-200"
              )}
            >
              <p className="text-[12px]">
                <span className="text-[16px]">{item.day}</span>{" "}
                <span>{item.month}</span>
              </p>
              <p className="text-[16px] font-semibold">{item.weekday}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
