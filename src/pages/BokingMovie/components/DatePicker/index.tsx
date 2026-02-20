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
    <div className="flex flex-col gap-5">
      <h3 className="text-lg text-white font-semibold">Select Date</h3>

      {/* Scroll ngang trên mobile */}
      <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
        {dataDate.map((item) => {
          const isActive = weekday === item.weekday;

          return (
            <div
              key={item.id}
              onClick={() => handlePickDate(item.weekday)}
              className={classNames(
                "min-w-[100px] cursor-pointer flex flex-col gap-2 p-4 rounded-xl border transition-all duration-200",
                isActive
                  ? "bg-purple-700 border-purple-600 text-white scale-105 shadow-lg"
                  : "bg-[#1f1f1f] border-white/10 text-gray-300 hover:bg-purple-800/40 hover:scale-105",
              )}
            >
              <p className="text-xs">
                <span className="text-lg font-bold">{item.day}</span>{" "}
                {item.month}
              </p>

              <p className="text-sm font-semibold">{item.weekday}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;
