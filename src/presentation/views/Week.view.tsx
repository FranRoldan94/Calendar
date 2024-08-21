import React from 'react';
import { startOfWeek, addDays, format, } from 'date-fns';



const hours = Array.from({ length: 24 }).map((_, i) => i +1);

const WeekView: React.FC = () => {
  const today = new Date();
  const start = startOfWeek(today);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  return (
    <div className="h-full grid grid-cols-8 grid-rows-25 w-full">
      <div className="row-span-1 col-span-1"></div>
      {days.map(day => (
        <div key={day.toString()} className="col-span-1 text-center font-bold p-2 border">
          {format(day, 'EEE, MMM d')}
        </div>
      ))}
      {hours.map(hour => (
        <>
          <div key={hour} className="row-span-1 col-span-1 p-2 text-right border">
            {format(new Date(2024, 0, 1, hour), 'h a')}
          </div>
          {days.map(day => (
            <div
              key={`${day}-${hour}`}
              className="col-span-1 row-span-1 border p-2 relative"
            >
              
            </div>
          ))}
        </>
      ))}
    </div>
  );
};

export default WeekView;
