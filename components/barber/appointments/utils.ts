import type { BadgeProps } from "@/components/ui/badge";
import { APPOINTMENT_STATUS } from "@/database/schemas";
import type { AppointmentStatus } from "@/database/schemas";
import type { AppointmentColumn } from "./columns";

export const status: Record<AppointmentStatus, string> = {
  [APPOINTMENT_STATUS.CREATED]: "Creada",
  [APPOINTMENT_STATUS.CANCELLED]: "Cancelada",
  [APPOINTMENT_STATUS.COMPLETED]: "Completada",
  [APPOINTMENT_STATUS.RESCHEDULED]: "Reprogramada",
  [APPOINTMENT_STATUS.NO_SHOW]: "No asistió",
  [APPOINTMENT_STATUS.CONFIRMED]: "Confirmada",
};

export function getBadgeVariant(status: AppointmentStatus): BadgeProps["variant"] {
  switch (status) {
    case APPOINTMENT_STATUS.CREATED:
      return "default";
    case APPOINTMENT_STATUS.CANCELLED:
      return "destructive";
    case APPOINTMENT_STATUS.COMPLETED:
      return "success";
    case APPOINTMENT_STATUS.RESCHEDULED:
      return "info";
    case APPOINTMENT_STATUS.NO_SHOW:
      return "warning";
    default:
      return "default";
  }
}

export const data: AppointmentColumn[] = [
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-01T10:00:00Z"),
    status: "created",
    barberId: "barber-123",
    barbershopId: "barbershop-456",
    serviceId: "service-789",
    customerId: "customer-101",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-02T11:30:00Z"),
    status: "rescheduled",
    barberId: "barber-124",
    barbershopId: "barbershop-457",
    serviceId: "service-790",
    customerId: "customer-102",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-03T14:15:00Z"),
    status: "completed",
    barberId: "barber-125",
    barbershopId: "barbershop-458",
    serviceId: "service-791",
    customerId: "customer-103",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-04T09:45:00Z"),
    status: "cancelled",
    barberId: "barber-126",
    barbershopId: "barbershop-459",
    serviceId: "service-792",
    customerId: "customer-104",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-05T16:00:00Z"),
    status: "no_show",
    barberId: "barber-127",
    barbershopId: "barbershop-460",
    serviceId: "service-793",
    customerId: "customer-105",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-06T13:30:00Z"),
    status: "cancelled",
    barberId: "barber-128",
    barbershopId: "barbershop-461",
    serviceId: "service-794",
    customerId: "customer-106",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-07T08:00:00Z"),
    status: "created",
    barberId: "barber-129",
    barbershopId: "barbershop-462",
    serviceId: "service-795",
    customerId: "customer-107",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-01T10:00:00Z"),
    status: "created",
    barberId: "barber-123",
    barbershopId: "barbershop-456",
    serviceId: "service-789",
    customerId: "customer-101",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-02T11:30:00Z"),
    status: "rescheduled",
    barberId: "barber-124",
    barbershopId: "barbershop-457",
    serviceId: "service-790",
    customerId: "customer-102",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-03T14:15:00Z"),
    status: "completed",
    barberId: "barber-125",
    barbershopId: "barbershop-458",
    serviceId: "service-791",
    customerId: "customer-103",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-04T09:45:00Z"),
    status: "cancelled",
    barberId: "barber-126",
    barbershopId: "barbershop-459",
    serviceId: "service-792",
    customerId: "customer-104",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-05T16:00:00Z"),
    status: "no_show",
    barberId: "barber-127",
    barbershopId: "barbershop-460",
    serviceId: "service-793",
    customerId: "customer-105",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-06T13:30:00Z"),
    status: "cancelled",
    barberId: "barber-128",
    barbershopId: "barbershop-461",
    serviceId: "service-794",
    customerId: "customer-106",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-07T08:00:00Z"),
    status: "created",
    barberId: "barber-129",
    barbershopId: "barbershop-462",
    serviceId: "service-795",
    customerId: "customer-107",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-07T08:00:00Z"),
    status: "created",
    barberId: "barber-129",
    barbershopId: "barbershop-462",
    serviceId: "service-795",
    customerId: "customer-107",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-01T10:00:00Z"),
    status: "created",
    barberId: "barber-123",
    barbershopId: "barbershop-456",
    serviceId: "service-789",
    customerId: "customer-101",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-02T11:30:00Z"),
    status: "rescheduled",
    barberId: "barber-124",
    barbershopId: "barbershop-457",
    serviceId: "service-790",
    customerId: "customer-102",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-03T14:15:00Z"),
    status: "completed",
    barberId: "barber-125",
    barbershopId: "barbershop-458",
    serviceId: "service-791",
    customerId: "customer-103",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-04T09:45:00Z"),
    status: "cancelled",
    barberId: "barber-126",
    barbershopId: "barbershop-459",
    serviceId: "service-792",
    customerId: "customer-104",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-05T16:00:00Z"),
    status: "no_show",
    barberId: "barber-127",
    barbershopId: "barbershop-460",
    serviceId: "service-793",
    customerId: "customer-105",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-06T13:30:00Z"),
    status: "cancelled",
    barberId: "barber-128",
    barbershopId: "barbershop-461",
    serviceId: "service-794",
    customerId: "customer-106",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2023-10-07T08:00:00Z"),
    status: "created",
    barberId: "barber-129",
    barbershopId: "barbershop-462",
    serviceId: "service-795",
    customerId: "customer-107",
  },
];
