import { dataDate } from "@constants/dataDate";

const DatePicker = ({
  weekday,
  setWeekday,
}: {
  weekday: string | null;
  setWeekday: (weekday: string | null) => void;
}) => {
  const handleChangeDay = (weekday: string) => {
    setWeekday(weekday);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-lg text-white font-semibold">Select Date</h3>

      {/* Scroll ngang trên mobile */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 border-b border-purple-700">
          {dataDate.map((item) => {
            const active = item.weekday === weekday;

            return (
              <div
                key={item.id}
                onClick={() => handleChangeDay(item.weekday)}
                className={`
            min-w-[95px] snap-start text-center cursor-pointer rounded-2xl p-4 transition-all duration-300
            ${
              active
                ? "bg-gradient-to-br from-purple-600 to-pink-500 text-white scale-105 shadow-lg"
                : "bg-[#1f1f1f] text-gray-300 hover:bg-[#2a2a2a]"
            }
          `}
              >
                <h3 className="text-lg font-semibold">
                  {item.day}
                  <span className="text-xs ml-1 opacity-80">{item.month}</span>
                </h3>
                <p className="text-xs mt-1">{item.weekday}</p>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-[#15061e] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-[#15061e] to-transparent" />
      </div>
    </div>
  );
};

export default DatePicker;
