import React from "react";
import { format, Locale } from "date-fns";
import { Event, useStore } from "../../store/calendar.store";
import { es } from "date-fns/locale";
export interface DayProps {
  day: Date;
  rowIdx: number;
  renderDayType?: React.ReactNode;
  locale?: Locale;
}

const Day: React.FC<DayProps> = ({ day, rowIdx, renderDayType, locale = es }) => {
  const {
    setDateSelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useStore((state) => ({
    setDateSelected: state.setDateSelected,
    setShowEventModal: state.setShowEventModal,
    filteredEvents: state.filteredEvents(),
    setSelectedEvent: state.setSelectedEvent,
    dateSelected: state.dateSelected,
  }));

  const getCurrentDayClass = () => {
    return format(day, "dd-MM-yy") === format(new Date(), "dd-MM-yy")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  
  const eventsPerDay: Event[] = []
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{format(day, "eee", {locale}).toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {format(day, "dd")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer px-2"
        onClick={() => {
          setDateSelected(day);
          setShowEventModal(true);
        }}
      >
        
        {filteredEvents.map((evt, idx) => {
            
          if (format(evt.day, "dd-MM-yy") !== format(day, "dd-MM-yy"))
            return null;
          eventsPerDay.push(evt)
         if(eventsPerDay.length <= 5){
          return (
            <div
              key={idx}
              onClick={() => setSelectedEvent(evt)}
              className={`bg-${evt.label?.color || "blue-500"} ${
                evt.label?.textColor || "text-white"
              } p-1  text-sm rounded mb-1 truncate`}
            >
              {renderDayType || evt.title}
            </div>
          );
         }
          
        })}
        {eventsPerDay.length > 5 && (
          <div
            className="bg-gray-300 text-sm p-1 text-center rounded"
            onClick={() => {
              setDateSelected(day);
              setShowEventModal(true);
            }}
          >
            +{eventsPerDay.length - 5} more
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
