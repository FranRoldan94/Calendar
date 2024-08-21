import React from 'react';
import { useViewStore } from '../../store/views.store';
import {Button, ButtonGroup} from "@nextui-org/react";

interface CalendarNavProps {
  navButtons: {title: string, id: string}[];
}

const CalendarNav: React.FC<CalendarNavProps> = ({navButtons}) => {
  const {setView, selectedView} = useViewStore((state) => ({
    selectedView: state.selectedView,
    setView: state.setView,
  }));
    
  return (
    <div>
      <div className="flex justify-around mb-4">
        <ButtonGroup>
          {navButtons.map((button) => (
            <Button
              key={button.id}
              color={selectedView?.id === button.id ? 'primary' : 'default'}
              onClick={() => setView(button)}
            >
              {button.title}
            </Button>
          ))}
         
        </ButtonGroup>
      
      </div>
    </div>
  );
};

export default CalendarNav;
