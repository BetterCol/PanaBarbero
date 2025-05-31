"use client";

import { Calendar } from "@/components/ui/calendar";
import { useDateStore } from "@/hooks/use-appointment-date";

export const CalendarClient = () => {
  const { selectedDate, handleSelectDate, defaultDate } = useDateStore();

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 12, 31);

  return (
    <Calendar
      mode="single"
      selected={selectedDate ?? defaultDate}
      onSelect={handleSelectDate}
      className="mx-auto w-max rounded-xl border shadow"
      fromDate={today}
      toDate={endOfYear}
    />
  );
};
