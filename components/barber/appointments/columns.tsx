"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Check, Clock, Copy, MoreHorizontal } from "lucide-react";

import { DataTableColumnHeader } from "@/components/table/column-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Appointment, AppointmentWithRelations } from "@/database/schemas";
import { useClipboard } from "@/hooks/use-clipboard";
import { getBadgeVariant, status } from "./utils";

export type CustomerColumn = Pick<
  AppointmentWithRelations["customer"],
  "id" | "name"
>;
export type ServiceColumn = Pick<
  AppointmentWithRelations["service"],
  "id" | "name"
>;

export type AppointmentWithRelationsColumn = Appointment & {
  customer: CustomerColumn;
  service: ServiceColumn;
};

export const columns: ColumnDef<AppointmentWithRelationsColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todas las filas"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "appointmentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hora de reserva" />
    ),
    cell: ({ row }) => {
      const date = row.original.appointmentDate;

      return (
        <span>
          {new Date(date).toLocaleTimeString("es-CO", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => {
      const statusRow = row.original.status;

      return (
        <Badge variant={getBadgeVariant(statusRow)}>{status[statusRow]}</Badge>
      );
    },
  },
  {
    accessorKey: "service",
    header: "Servicio",
    cell: ({ row }) => {
      const service = row.original.service;

      return <span>{service.name}</span>;
    },
  },
  {
    accessorKey: "customer",
    header: "Cliente",
    cell: ({ row }) => {
      const customer = row.original.customer;

      return <span>{customer.name}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Acciones"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const { copyToClipboard } = useClipboard();

      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Abrir menú de acciones</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Selecciona una acción</DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => copyToClipboard(appointment.customer.id)}
            >
              <Copy />
              Copiar ID del cliente
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Clock />
              Reagendar cita
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-green-600">
              <Check />
              Marcar como completada
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
