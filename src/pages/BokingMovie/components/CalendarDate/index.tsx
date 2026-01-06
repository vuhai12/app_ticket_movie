import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarDate() {
  const [date, setDate] = useState<any>(new Date());

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
}
