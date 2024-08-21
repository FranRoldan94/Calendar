import MonthView from "./presentation/views/Month.view"
import EventModal from "./presentation/components/Modal/EventModal.component"
import './index.css'
import CalendarHeader from "./presentation/components/Header/Header.component"

import { Label, useStore } from "./presentation/store/calendar.store";
import Sidebar from "./presentation/components/Sidebar/Sidebar.component";
import WeekView from "./presentation/views/Week.view";
import { useViewStore } from "./presentation/store/views.store";
import { useEffect } from "react";

interface AppProps {
  renderDayType:  React.ReactNode
  labels: Label[]
}

const App: React.FC<AppProps> = ({renderDayType, labels}) => {

  const { showEventModal, setLabels } = useStore((state) => ({
    showEventModal: state.showEventModal,
    setLabels: state.setLabels,
  }));

  const { selectedView } = useViewStore((state) => ({
    selectedView: state.selectedView,
  }))

  useEffect(() => {
    setLabels(labels)
  }, [labels])

  const renderView = () => { 
    switch (selectedView?.title) {
      case 'month':
        return <MonthView renderDayType={renderDayType} />
      case 'week':
        return <WeekView />
      case 'day':
      break
      default:
        return <MonthView />
  }}

  return (
    <>
   {showEventModal && <EventModal />}

<div className="h-screen flex flex-col">
  <CalendarHeader configHeader={{}} />
  <div className="flex flex-1">
    {renderView()}
  </div>
</div>
    </>
  )
}

export default App
