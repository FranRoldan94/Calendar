import React, { useEffect, useState } from "react";
import { format, set, setDate } from "date-fns";

import { Event, Label, useStore } from "../../store/calendar.store";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
} from "@nextui-org/react";

export default function EventModal() {
  const {
    setShowEventModal,
    dateSelected,
    dispatchCallEvent,
    selectedEvent,
    labels,
    showModalEvent,
    } = useStore((state) => ({
    setShowEventModal: state.setShowEventModal,
    dateSelected: state.dateSelected,
    labels: state.labels,
    dispatchCallEvent: state.dispatchCallEvent,
    selectedEvent: state.selectedEvent,
    showModalEvent: state.showEventModal,
  }));

  const [title, setTitle] = useState<string>(
    selectedEvent ? selectedEvent.title : ""
  );
  const [startTime, setStartTime] = useState<Date>(selectedEvent?.date || dateSelected);
  const [endDate, setEndDate] = useState<Date>(selectedEvent?.endDate || dateSelected);
  const [description, setDescription] = useState<string>(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState<Label | undefined>(
    selectedEvent
      ? labels.find((lbl) => lbl.label === selectedEvent.label.label)
      : labels[0]
  );

  useEffect(() => {
    setStartTime(dateSelected);
  }, [dateSelected] );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const calendarEvent: Event = {
      title,
      description,
      label: selectedLabel as Label,
      day: dateSelected.valueOf(),
      date: startTime,
      endDate,
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };

    if (selectedEvent) {
      dispatchCallEvent({ type: "update", payload: calendarEvent as Event });
    } else {
      dispatchCallEvent({ type: "push", payload: calendarEvent as Event });
    }

    setShowEventModal(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      onClose={() => setShowEventModal(false)}
      isOpen={showModalEvent}
    >
      <ModalContent>
        <ModalHeader>
          <h2 id="modal-title">Add Event</h2>
        </ModalHeader>
        <ModalBody>
          <Input
            label="Event Title"
            placeholder="Enter event title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Spacer y={0.5} />
          <div className="flex justify-between">
            <Input
              label="Start Time"
              id="start-time"
              type="time"
              value={format(startTime, "HH:mm")}
              onChange={(e) => {
               
                console.log('startTime', startTime)
                setStartTime(new Date(
                startTime.setHours(
                  Number(e.target.value.split(":")[0]),
                  Number(e.target.value.split(":")[1])
                )
              ))}}
            />
            <Input
              label="End Time"
              id="end-time"
              type="time"
              value={endDate ? format(endDate, "HH:mm") : ""}
              onChange={(e) =>
                setEndDate(
                  new Date(
                    startTime.setHours(
                      Number(e.target.value.split(":")[0]),
                      Number(e.target.value.split(":")[1])
                    )
                  )
                )
              }
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={() => setShowEventModal(false)}>
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)}>Add Event</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
