import React from 'react';
import { format } from 'date-fns';

const hours = Array.from({ length: 24 }).map((_, i) => i + 1);

const DayView: React.FC = () => {


  return (
    <div className="h-full grid grid-rows-24">
      {hours.map(hour => (
        <div
          key={hour}
          className="row-span-1 border p-2 relative"
        >
          <span className="font-medium">{format(new Date(2024, 0, 1, hour), 'h a')}</span>
          <div className="mt-2 flex flex-col space-y-1 overflow-hidden">
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayView;
