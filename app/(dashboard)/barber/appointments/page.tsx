"use client";

import { useState } from "react";

import type { BadgeProps } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPOINTMENT_STATUS } from "@/database/schemas";

const Appointments = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const status = [
    { label: APPOINTMENT_STATUS.CREATED, color: "bg-green-500" },
    { label: APPOINTMENT_STATUS.CANCELLED, color: "bg-yellow-500" },
    { label: APPOINTMENT_STATUS.COMPLETED, color: "bg-blue-500" },
    { label: APPOINTMENT_STATUS.RESCHEDULED, color: "bg-red-500" },
    { label: APPOINTMENT_STATUS.NO_SHOW, color: "bg-red-500" },
  ];

  const badgeVariant = (statusLabel: string): BadgeProps["variant"] => {
    const statusItem = status.find((item) => item.label === statusLabel);

    switch (statusItem?.label) {
      case APPOINTMENT_STATUS.CREATED:
        return "default";
      case APPOINTMENT_STATUS.CANCELLED:
        return "destructive";
      case APPOINTMENT_STATUS.COMPLETED:
        return "success";
      case APPOINTMENT_STATUS.RESCHEDULED:
        return "outline";
      case APPOINTMENT_STATUS.NO_SHOW:
        return "warning";
      default:
        return "default";
    }
  };

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 12, 31);

  const isToday = date?.toDateString() === new Date().toDateString();
  const label = isToday
    ? "hoy"
    : `el ${date?.toLocaleDateString("es-ES", { weekday: "long", month: "long", day: "numeric" })}`;

  return (
    <div className="grid w-full grid-cols-1 place-items-start gap-4 px-2 sm:grid-cols-2 md:grid-cols-3 md:gap-8 lg:grid-cols-4 xl:grid-cols-5 2xl:px-0">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="mx-auto w-max rounded-xl border shadow"
        fromDate={today}
        toDate={endOfYear}
      />
      <Card className="col-span-1 mx-auto min-h-[18.4rem] w-full sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
        <CardHeader>
          <CardTitle className="text-muted-foreground">Reservaciones para {label}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Servicio</TableHead>
                <TableHead className="text-right">Hora de reserva</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>27 de julio</TableCell>
                <TableCell className="text-center">
                  <Badge variant={badgeVariant(status[0].label)} className="rounded-full">
                    Creado
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Corte de pelo</TableCell>
                <TableCell className="text-right">5:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>27 de julio</TableCell>
                <TableCell className="text-center">
                  <Badge variant={badgeVariant(status[1].label)} className="rounded-full">
                    Cancelado
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Corte de barba</TableCell>
                <TableCell className="text-right">5:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>27 de julio</TableCell>
                <TableCell className="text-center">
                  <Badge variant={badgeVariant(status[2].label)} className="rounded-full">
                    Completado
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Arreglo de cejas</TableCell>
                <TableCell className="text-right">5:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>27 de julio</TableCell>
                <TableCell className="text-center">
                  <Badge variant={badgeVariant(status[3].label)} className="rounded-full">
                    Reagendado
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Bigote</TableCell>
                <TableCell className="text-right">5:00 PM</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>27 de julio</TableCell>
                <TableCell className="text-center">
                  <Badge variant={badgeVariant(status[4].label)} className="rounded-full">
                    No asistió
                  </Badge>
                </TableCell>
                <TableCell className="text-center">Limpieza facial</TableCell>
                <TableCell className="text-right">5:00 PM</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
export default Appointments;
