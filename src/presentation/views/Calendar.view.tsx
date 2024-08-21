import { Locale } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import CalendarHeader, { ConfigHeader } from "../components/Header/Header.component";
import EventModal from "../components/Modal/EventModal.component";
import { Label, useStore, Event } from "../store/calendar.store";
import { useViewStore } from "../store/views.store";
import DayView from "./Day.view";
import MonthView from "./Month.view";
import WeekView from "./Week.view";



const defaultLabels: Label[] = [
  { label: "indigo", checked: true, color: "indigo-500", type: "indigo" },
  { label: "gray", checked: true, color: "gray-500", type: "gray" },
  { label: "green", checked: true, color: "green-500", type: "green" },
  { label: "blue", checked: true, color: "blue-500", type: "blue" },
  { label: "red", checked: true, color: "red-500", type: "red" },
  { label: "purple", checked: true, color: "purple-500", type: "purple" },
];

const defaultConfigHeader = {
  title: "Calendar",
  buttonText: "Today",
  buttonClass: "ml-4",
  iconPrev: "chevron_left",
  iconNext: "chevron_right",
  navButtons: [
    { title: "Month", id: "month" },
    { title: "Week", id: "week" },
    { title: "Day", id: "day" },
  ],
  buttonEvent: {
    text: "chevron_left",
    className: " cursor-pointer ",
  },
};

const defaultViews = [
  { title: "Month", id: "month" },
  { title: "Week", id: "week" },
  { title: "Day", id: "day" },
];

interface AppProps {
  events: Event[];
  renderDayType: React.ReactNode;
  labels: Label[];
  locale?: Locale;
  configHeader: ConfigHeader
  views: { title: string; id: string }[];
}

const Calendar: React.FC<AppProps> = ({
  events = [],
  renderDayType,
  labels = defaultLabels,
  locale = es,
  configHeader = defaultConfigHeader,
  views = defaultViews,
}) => {
  const { setLabels,} = useStore((state) => ({
    setLabels: state.setLabels,


  }));

  const { selectedView, setViews, setView } = useViewStore((state) => ({
    selectedView: state.selectedView,
    setViews: state.setViews,
    setView: state.setView,
  }));


  useEffect(() => {
    setLabels(labels);
    setViews(views);
    setView(views[0]);
  }, [labels, views]);



  const renderView = () => {
    switch (selectedView?.id) {
      case "month":
        return <MonthView renderDayType={renderDayType} locale={locale} />;
      case "week":
        return <WeekView />;
      case "day":
        return <DayView />;
        break;
      default:
        return <MonthView />;
    }
  };

  return (
    <>
      <EventModal />

      {<div className="h-screen flex flex-col">
        <CalendarHeader configHeader={configHeader} locale={locale} />
        <div className="flex flex-1">{renderView()}</div>
      </div>}
    </>
  );
};

export default Calendar;