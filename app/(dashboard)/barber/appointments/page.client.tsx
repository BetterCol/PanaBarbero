"use client";

import { Calendar } from "@/components/ui/calendar";
import { CardHeader, CardTitle } from "@/components/ui/card";
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

export const AppointmentsCardHeader = () => {
  const { selectedDate, defaultDate } = useDateStore();

  const isToday = selectedDate
    ? selectedDate.toDateString() === new Date().toDateString()
    : defaultDate.toDateString() === new Date().toDateString();

  const label = isToday
    ? "hoy"
    : `el ${selectedDate?.toLocaleDateString("es-CO", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })}`;

  return (
    <CardHeader>
      <CardTitle className="text-muted-foreground">Reservaciones para {label}</CardTitle>
    </CardHeader>
  );
};
