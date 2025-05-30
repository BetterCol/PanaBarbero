"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { useDateStore } from "@/hooks/use-appointment-date";

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
