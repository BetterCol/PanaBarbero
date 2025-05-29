"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

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
import type { Appointment } from "@/database/schemas";
import { useClipboard } from "@/hooks/use-clipboard";
import { getBadgeVariant, status } from "./utils";

export type AppointmentColumn = Omit<Appointment, "id" | "createdAt" | "updatedAt">;

export const columns: ColumnDef<AppointmentColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
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
      <DataTableColumnHeader column={column} title="Fecha y hora de reserva" />
    ),
    cell: ({ row }) => {
      const date = row.original.appointmentDate;

      return (
        <span>
          {date.toLocaleTimeString("es-CO", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "America/Bogota",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const statusRow = row.original.status;

      return <Badge variant={getBadgeVariant(statusRow)}>{status[statusRow]}</Badge>;
    },
  },
  {
    accessorKey: "serviceId",
    header: "Servicio",
  },
  {
    accessorKey: "barberId",
    header: "Barbero",
  },
  {
    accessorKey: "customerId",
    header: "Cliente",
  },
  {
    id: "actions",
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Acciones" className="justify-end" />
    ),
    cell: ({ row }) => {
      const { copyToClipboard } = useClipboard();

      const appointment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <span className="sr-only">Abrir menú de acciones</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => copyToClipboard(appointment.customerId)}>
              Copiar ID del cliente
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver cliente</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
