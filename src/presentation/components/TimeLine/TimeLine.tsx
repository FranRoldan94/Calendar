import React, { useEffect, useState } from 'react'

interface TimeLineProps {
    day: Date
    hour: number
}

const TimeLine: React.FC<TimeLineProps> = ({day, hour}) => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date());
      }, 60000); // Actualiza cada minuto
      return () => clearInterval(interval);
    }, []);

    return day.getDate() === currentTime.getDate() &&
        day.getMonth() === currentTime.getMonth() &&
        hour === currentTime.getHours() && (
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'red',
              zIndex: 2,
            }}
          ></div>
        )
}

export default TimeLine