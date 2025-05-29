import type { SelectSingleEventHandler } from "react-day-picker"; // Import the type
import { create } from "zustand";

// Define the state shape
interface DateState {
  selectedDate: Date | undefined; // Use undefined to match react-day-picker's behavior
  defaultDate: Date;
}

// Define the actions
interface DateActions {
  handleSelectDate: SelectSingleEventHandler; // Use the react-day-picker event handler type
  resetToDefault: () => void;
  setDefaultDate: (date: Date) => void;
}

// Combine the state and actions interfaces
type DateStore = DateState & DateActions;

// Create the Zustand store
export const useDateStore = create<DateStore>((set) => ({
  // Initial state
  selectedDate: undefined, // Start with undefined
  defaultDate: new Date(), // Initialize with the current date

  // Actions
  handleSelectDate: (date, _modifiers, _e) => {
    set({ selectedDate: date });
  },
  resetToDefault: () => set((state) => ({ selectedDate: state.defaultDate })),
  setDefaultDate: (date) => set({ defaultDate: date }),
}));
