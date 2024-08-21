import { create } from 'zustand';
import { getMonth } from 'date-fns';

type EventType = "push" | "update" | "delete";

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
    [key: string]: unknown;
  }
  

  
  interface StoreState {
    monthIndex: number;
    setMonthIndex: (monthIndex: number) => void;
  
    smallCalendarMonth: number | null;
    setSmallCalendarMonth: (smallCalendarMonth: number ) => void;
  
    daySelected: Date;
    setDaySelected: (daySelected: Date) => void;
  
    showEventModal: boolean;
    setShowEventModal: (showEventModal: boolean) => void;
  
    selectedEvent: Event | null;
    setSelectedEvent: (selectedEvent: Event | null) => void;
  
    labels: Label[];
    setLabels: (newLabels: Label[]) => void;
    updateLabel: (updatedLabel: Label) => void;
  
    savedEvents: Event[];
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

  daySelected: new Date(), 
  setDaySelected: (daySelected) => set({ daySelected }),

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
  dispatchCallEvent: (action) => {
    console.log('first', action.payload)
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
    const returnedEvents = savedEvents.filter((evt) =>
      labels.filter((lbl) => lbl.checked).map((lbl) => lbl.type).includes(evt.label.type)
    );
    console.log('returnedEvents', returnedEvents)
    return savedEvents.filter((evt) =>
      labels.filter((lbl) => lbl.checked).map((lbl) => lbl.type).includes(evt.label.type)
    );
  },
}));
