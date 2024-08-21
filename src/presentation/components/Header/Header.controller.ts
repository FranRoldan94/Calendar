import { useStore } from "@/presentation/store/calendar.store";
import { useViewStore } from "@/presentation/store/views.store";

const HeaderController = () => {
  const { monthIndex, setMonthIndex, setShowEventModal } = useStore(
    (state) => ({
      monthIndex: state.monthIndex,
      setMonthIndex: state.setMonthIndex,
      setShowEventModal: state.setShowEventModal,
    })
  );

  const { setView, selectedView } = useViewStore((state) => ({
    selectedView: state.selectedView,
    setView: state.setView,
  }));

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    setMonthIndex(
      monthIndex === new Date().getMonth()
        ? monthIndex + Math.random()
        : new Date().getMonth()
    );
  };

  return {
    monthIndex,
    handlePrevMonth,
    handleNextMonth,
    handleReset,
    selectedView,
    setView,
    setShowEventModal,
  };
};

export default HeaderController;
