import { create } from 'zustand';
import { getMonth } from 'date-fns';

type EventType = "push" | "update" | "delete" | "saveAll";

export interface Label {
  label: string;
  color?: string;
  textColor?: string;
  checked: boolean;
  type: string;
}

export interface Event {
    id: string | number;
    label: Label;
    date?: Date;
    title: string;
    description: string;
    day: Date | number;
    endDate?: Date;
    [key: string]: unknown;
  }
  

  
  interface StoreState {
    monthIndex: number;
    setMonthIndex: (monthIndex: number) => void;
  
    smallCalendarMonth: number | null;
    setSmallCalendarMonth: (smallCalendarMonth: number ) => void;
  
    dateSelected: Date;
    setDateSelected: (dateSelected: Date) => void;
  
    showEventModal: boolean;
    setShowEventModal: (showEventModal: boolean) => void;
  
    selectedEvent: Event | null;
    setSelectedEvent: (selectedEvent: Event | null) => void;
  
    labels: Label[];
    setLabels: (newLabels: Label[]) => void;
    updateLabel: (updatedLabel: Label) => void;
  
    savedEvents: Event[];
    setSavedEvents: (savedEvents: Event[]) => void;
    dispatchCallEvent: (action: { type: EventType; payload: Event }) => void;
  
    filteredEvents: () => Event[];
  }

export const useStore = create<StoreState>((set, get) => ({
  monthIndex: getMonth(new Date()), 
  setMonthIndex: (monthIndex) => set({ monthIndex }),

  smallCalendarMonth: null,
  setSmallCalendarMonth: (smallCalendarMonth) => {
    set({ smallCalendarMonth });
    set({ monthIndex: smallCalendarMonth });
  },

  dateSelected: new Date(), 
  setDateSelected: (dateSelected) => set({ dateSelected }),

  showEventModal: false,
  setShowEventModal: (showEventModal: boolean) => {
    set({ showEventModal });
    if (!showEventModal) {
      set({ selectedEvent: null });
    }
  },

  selectedEvent: null,
  setSelectedEvent: (selectedEvent) => set({ selectedEvent }),

  labels: [],
  setLabels: (newLabels) => set({ labels: newLabels }),

  updateLabel: (updatedLabel) => {
    set({
      labels: get().labels.map((lbl) =>
        lbl.label === updatedLabel.label ? updatedLabel : lbl
      ),
    });
  },

  savedEvents: (() => {
    const storageEvents = localStorage.getItem("savedEvents");
    return storageEvents ? JSON.parse(storageEvents) : [];
  })(),
  setSavedEvents: (savedEvents) => {
    set({ savedEvents });
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  },
  dispatchCallEvent: (action) => {
    switch (action.type) {
      case "push":
        set({ savedEvents: [...get().savedEvents, action.payload] });
        break;
      case "update":
        set({
          savedEvents: get().savedEvents.map((evt) =>
            evt.id === action.payload.id ? action.payload : evt
          ),
        });
        break;
      case "delete":
        set({
          savedEvents: get().savedEvents.filter((evt) => evt.id !== action.payload.id),
        });
        break;
      default:
        throw new Error();
    }
    localStorage.setItem("savedEvents", JSON.stringify(get().savedEvents));
  },

  filteredEvents: () => {
    const { savedEvents, labels } = get();
    const returnedEvents = savedEvents.filter((evt) => {
      return evt.label ? labels.filter((lbl) => lbl.checked).map((lbl) => lbl.type).includes(evt.label.type) : evt
    });

    return returnedEvents
  },
}));
