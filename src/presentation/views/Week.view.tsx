import React from 'react';
import { startOfWeek, addDays, format, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

import { Card, CardBody } from '@nextui-org/react';
import { useStore } from '../store/calendar.store';
import TimeLine from '../components/TimeLine/TimeLine';


const hours = Array.from({ length: 24 }).map((_, i) => i + 1);

const WeekView: React.FC = () => {
  const today = new Date();
  const start = startOfWeek(today);
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i));

  // Recuperar y actualizar eventos desde la store de Zustand
  const { events, setShowEventModal, setDateSelected, dispatchEvent } = useStore((state) => ({
    events: state.savedEvents,
    setShowEventModal: state.setShowEventModal,
    setDateSelected: state.setDateSelected,
    dispatchEvent: state.dispatchCallEvent,
  }));




  const getEventsForCell = (day: Date, hour: number) => {
    return events.filter((event) => {
      const eventDate = event.date ? new Date(event.date) : null;
      return (
        eventDate &&
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear() &&
        eventDate.getHours() === hour
      );
    });
  };

  return (
    <div className="relative h-full grid grid-cols-8 w-full">
      <div className="row-span-1 col-span-1"></div>
      {days.map((day) => (
        <div
          key={day.toString()}
          className="col-span-1 text-center font-bold p-2 border"
        >
          {format(day, 'EEE, MMM d', { locale: es })}
        </div>
      ))}
      {hours.map((hour) => (
        <>
          <div
            key={hour}
            className="row-span-1 col-span-1 p-2 text-right border"
            
          >
            {format(new Date().setHours(hour), 'h a')}
          </div>
          {days.map((day) => (
            <div
              key={`${day}-${hour}`}
              className="col-span-1 row-span-1 border p-2 relative"
              onClick={() => {
                setDateSelected(new Date(new Date(day).setHours(hour)));
                setShowEventModal(true)}}
            >
              {getEventsForCell(day, hour).map((event, index) => {
                const eventStartHour = event.date ? new Date(event.date).getHours() : 0;
      
                const durationInMinutes = event.date && event.endDate ? differenceInMinutes(new Date(event.endDate), new Date(event.date)) : 0;
                const eventHeight = (durationInMinutes / 60) * 100; 
                
                return (
                  <Card
                    key={index}
                    onClick={() => {dispatchEvent({ type: 'update', payload: event }); setShowEventModal(true)}}
                    style={{
                      position: 'absolute',
                      top: `${(eventStartHour - hour) * 100}%`,
                      left: 0,
                      right: 0,
                      height: `${eventHeight}%`,
                      zIndex: 10,
                      overflow: 'visible',
                      backgroundColor: event.label?.color || 'blue',
                    }}
                  >
                    <CardBody>
                      <p className="text-white">{event.title}</p>
                    </CardBody>
                  </Card>
                );
              })}
              {/* Línea de tiempo actual */}
         
              <TimeLine day={day} hour={hour} />
            </div>
          ))}
        </>
      ))}

 
    </div>
  );
};

export default WeekView;
