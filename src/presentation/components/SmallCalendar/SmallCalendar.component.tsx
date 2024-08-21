import React, { useEffect, useState } from "react";
import {

  format,

} from "date-fns";
import { useStore } from "../../store/calendar.store";
import { getMonthMatrix } from "../../../utils/calendarDay";


export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState<number>(
    new Date().getMonth()
  );
  const [currentMonth, setCurrentMonth] = useState<Date[][]>(getMonthMatrix());

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useStore((state) => ({
    monthIndex: state.monthIndex,
    setSmallCalendarMonth: state.setSmallCalendarMonth,
    setDaySelected: state.setDaySelected,
    daySelected: state.daySelected,
  }));

  useEffect(() => {
    setCurrentMonth(getMonthMatrix(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx((prev) => prev - 1);
  }

  function handleNextMonth() {
    setCurrentMonthIdx((prev) => prev + 1);
  }

  function getDayClass(day: Date) {
    const formatStr = "dd-MM-yyyy";
    const nowDay = format(new Date(), formatStr);
    const currDay = format(day, formatStr);
    const slcDay = daySelected ? format(daySelected, formatStr) : "";

    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }

  return (
    <div className="mt-9">
      <header className="flex justify-between">
        <p className="text-gray-500 font-bold">
          {format(new Date(new Date().getFullYear(), currentMonthIdx), "MMMM yyyy")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="text-sm py-1 text-center">
            {format(day, "EEEEE")}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className="text-sm">{format(day, "d")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
