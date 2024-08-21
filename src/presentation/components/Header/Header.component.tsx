

import { format, set } from "date-fns";
import { useStore } from "../../store/calendar.store";
import CalendarNav from "../Nav/CalendarNav.component";
import CreateEventButton from "../Button/Button.component";

interface CalendarHeaderProps {
  configHeader: {
    title: React.ReactNode;
    buttonText: string;
    buttonClass: string;
  }
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({configHeader}) => {
    const { monthIndex, setMonthIndex } = useStore((state) => ({
        monthIndex: state.monthIndex,
        setMonthIndex: state.setMonthIndex,
      }));
  const handlePrevMonth= () => {
    setMonthIndex(monthIndex - 1);
  }
  const handleNextMonth= () => {
    setMonthIndex(monthIndex + 1);
  }
  const handleReset = () => {
    setMonthIndex(
      monthIndex === new Date().getMonth()
        ? monthIndex + Math.random()
        : new Date().getMonth()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="px-4 py-2 flex items-center">
      {configHeader.title}
      <button
        onClick={handleReset}
        className={`border rounded py-2 px-4 mr-5 ${configHeader.buttonClass}`}
      >
        {configHeader.buttonText}
      </button>
      <button onClick={handlePrevMonth}>
        <span className=" cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className=" cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
       
        {format(set(new Date(), { month: monthIndex }), "MMMM yyyy")}
      </h2>
      </div>
      
      <CalendarNav />
      <CreateEventButton />
    </header>
  );
}

export default CalendarHeader;