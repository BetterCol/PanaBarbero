"use client";

import Link from "next/link";

import { ArrowRight, Book, Calendar, DollarSign } from "lucide-react";

import type { BadgeProps } from "@/components/ui/badge";
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
import { APPOINTMENT_STATUS } from "@/database/schemas";

export const HeaderAnalytics = () => {
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
