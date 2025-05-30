"use client";

import type { FC } from "react";

import Link from "next/link";

import { ArrowRight, Book, Calendar, DollarSign } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Paragraph } from "@/components/ui/typography";
import type { Appointment } from "@/database/schemas";
import { TRANSLATED_APPOINTMENT_STATUS } from "@/database/schemas";
import { getBadgeVariant } from "./appointments/utils";

interface HeaderAnalyticsProps {
  appointments: Appointment[];
}

export const HeaderAnalytics: FC<HeaderAnalyticsProps> = ({ appointments }) => {
  return (
    <div className="grid grid-cols-1 place-items-start gap-4 sm:grid-cols-2 md:grid-cols-4">
      <div className="col-span-3 grid w-full gap-4 sm:col-span-2">
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Reservaciones</CardTitle>
            <CardAction>
              <Book className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <Paragraph weight="bold" className="font-mono text-xl tabular-nums">
              500
            </Paragraph>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/barber/my-barbershop">
                Gestionar disponibilidad
                <ArrowRight />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-muted-foreground">Ingresos estimados</CardTitle>
            <CardAction>
              <DollarSign className="size-4" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <Paragraph weight="bold" className="font-mono text-xl tabular-nums">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                currencyDisplay: "code",
                maximumFractionDigits: 0,
              }).format(250000)}
            </Paragraph>
          </CardContent>
          <CardFooter className="pt-3">
            <Paragraph muted className="text-xs">
              Valor aproximado basado en reservas completadas
            </Paragraph>
          </CardFooter>
        </Card>
      </div>
      <Card className="col-span-3 w-full sm:col-span-2 md:min-h-[23.9rem]">
        <CardHeader>
          <CardTitle className="text-muted-foreground">Próximas citas</CardTitle>
          <CardAction>
            <Calendar className="size-4" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Tus citas mas recientes (limite de 5 citas).</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">Servicio</TableHead>
                <TableHead className="text-right">Hora de reserva</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => {
                const variant = getBadgeVariant(appointment.status);
                const statusLabel = TRANSLATED_APPOINTMENT_STATUS[appointment.status];

                return (
                  <TableRow key={appointment.uuid}>
                    <TableCell>
                      {appointment.appointmentDate.toLocaleDateString("es-CO", {
                        weekday: "long",
                        month: "2-digit",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant={variant} className="rounded-full">
                        {statusLabel}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{appointment.serviceId}</TableCell>
                    <TableCell className="text-right">
                      {appointment.appointmentDate.toLocaleTimeString("es-CO", {
                        hour12: true,
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
