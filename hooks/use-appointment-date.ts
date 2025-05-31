import type { SelectSingleEventHandler } from "react-day-picker";
import { create } from "zustand";

interface DateState {
  selectedDate: Date | undefined;
  defaultDate: Date;
}

interface DateActions {
  handleSelectDate: SelectSingleEventHandler;
  resetToDefault: () => void;
  setDefaultDate: (date: Date) => void;
}

type DateStore = DateState & DateActions;

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: undefined,
  defaultDate: new Date(),

  handleSelectDate: (date, _modifiers, _e) => {
    set({ selectedDate: date });
  },
  resetToDefault: () => set((state) => ({ selectedDate: state.defaultDate })),
  setDefaultDate: (date) => set({ defaultDate: date }),
}));
