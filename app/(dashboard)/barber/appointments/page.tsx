"use client";

import { useState } from "react";

import { columns } from "@/components/barber/appointments/columns";
import { AppointmentsTable } from "@/components/barber/appointments/data-table";
import { data } from "@/components/barber/appointments/utils";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 12, 31);

  const isToday = date?.toDateString() === new Date().toDateString();
  const label = isToday
    ? "hoy"
    : `el ${date?.toLocaleDateString("es-ES", { month: "long", day: "numeric" })}`;

  return (
    <div className="grid w-full grid-cols-1 place-items-start gap-4 px-2 md:grid-cols-3 md:gap-8 lg:grid-cols-5 xl:grid-cols-6 2xl:px-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto w-max rounded-xl border shadow"
        fromDate={today}
        toDate={endOfYear}
      />
      <Card className="col-span-1 mx-auto min-h-[18.4rem] w-full md:col-span-2 lg:col-span-4 lg:max-w-[42rem] xl:col-span-5 xl:max-w-4xl 2xl:max-w-full">
        <CardHeader>
          <CardTitle className="text-muted-foreground">Reservaciones para {label}</CardTitle>
        </CardHeader>
        <CardContent>
          <AppointmentsTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};
export default Appointments;
