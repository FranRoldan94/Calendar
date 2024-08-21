import { format, Locale, set } from "date-fns";
import { Button, ButtonGroup } from "@nextui-org/react";
import React from "react";
import HeaderController from "./Header.controller";
import { capitalize } from "@/utils/capitalize";

export interface ConfigHeader {
  title: React.ReactNode;
  buttonText: string;
  buttonClass: string;
  navButtons: { title: string; id: string }[];
  iconPrev: React.ReactNode;
  iconNext: React.ReactNode;
  buttonEvent: {
    icon?: React.ReactNode;
    text: string;
    className?: string;
  };
}

interface CalendarHeaderProps {
  locale?: Locale;
  configHeader: ConfigHeader
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ configHeader, locale }) => {
  const {
    monthIndex,
    handlePrevMonth,
    handleNextMonth,
    handleReset,
    selectedView,
    setView,
    setShowEventModal,
  } = HeaderController();
  return (
    <header className="px-4 py-2 flex items-center justify-between">
        <ButtonGroup>
          <Button variant="shadow"  className="bg-gray-100 text-primary">Calendar</Button>
          <Button variant= "ghost" className="bg-gray-100">Listado</Button>
        </ButtonGroup>
      <div className="flex gap-4 items-center">
        <Button className={`text-primary ${configHeader.buttonClass}`} variant="faded" onClick={handleReset}>
          {configHeader.buttonText}
        </Button>
        <div className="flex items-center gap-8">

        <Button isIconOnly radius="full" className="bg-white" variant="shadow" onClick={handlePrevMonth}>{configHeader.iconPrev}</Button>
        <h3 className="text-gray-400">{capitalize(format(set(new Date(), { month: monthIndex }), "MMMM yyyy", {locale}))}</h3>
        <Button isIconOnly radius="full" className="bg-white" variant="shadow" onClick={handleNextMonth}>{configHeader.iconNext}</Button>
        </div>

      </div>
      <div className="flex gap-4 items-center">
        <ButtonGroup>
          {configHeader.navButtons?.map((button) => (
            <Button
              key={button.id}
              variant={selectedView?.id === button.id ? "shadow" : "ghost"}
              onClick={() => setView(button)}
              className={`${
                selectedView?.id === button.id ? "text-primary" : ""
              } bg-gray-100`}
            >
              {button.title}
            </Button>
          ))}
        </ButtonGroup>
        <Button
          className={`bg-primary text-white ${configHeader.buttonEvent.className}`}
          onClick={() => setShowEventModal(true)}
          startContent={configHeader.buttonEvent.icon}
        >
          {configHeader.buttonEvent.text}
        </Button>
      </div>
    </header>
  );
};

export default CalendarHeader;
