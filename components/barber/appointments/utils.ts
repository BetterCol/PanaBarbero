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
    appointmentDate: new Date("2025-05-29T09:30:00.000Z"), // Example Today (8 AM - 6 PM)
    status: "created",
    barbershopId: "barbershop-fghij",
    serviceId: "service-klmno",
    customerId: "customer-pqrst",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-05-29T14:15:00.000Z"), // Example Today (8 AM - 6 PM)
    status: "confirmed",
    barbershopId: "barbershop-z1234",
    serviceId: "service-56789",
    customerId: "customer-0abc",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-05-29T11:00:00.000Z"), // Example Today (8 AM - 6 PM)
    status: "completed",
    barbershopId: "barbershop-ijklm",
    serviceId: "service-nopqr",
    customerId: "customer-stuvw",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-05-29T17:45:00.000Z"), // Example Today (8 AM - 6 PM)
    status: "cancelled",
    barbershopId: "barbershop-34567",
    serviceId: "service-890ab",
    customerId: "customer-cdefg",
  },
  // --- Dates after today ---
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-06-10T10:00:00.000Z"), // Example Date in Future
    status: "created",
    barbershopId: "barbershop-mnopq",
    serviceId: "service-rstuv",
    customerId: "customer-wxyz1",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-07-01T15:30:00.000Z"), // Example Date in Future
    status: "confirmed",
    barbershopId: "barbershop-7890a",
    serviceId: "service-bcdef",
    customerId: "customer-ghijk",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-08-20T09:00:00.000Z"), // Example Date in Future
    status: "completed",
    barbershopId: "barbershop-qrstu",
    serviceId: "service-vwxyz",
    customerId: "customer-12345",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-09-05T11:45:00.000Z"), // Example Date in Future
    status: "cancelled",
    barbershopId: "barbershop-abcde",
    serviceId: "service-fghij",
    customerId: "customer-klmno",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-10-15T14:00:00.000Z"), // Example Date in Future
    status: "created",
    barbershopId: "barbershop-uvwxy",
    serviceId: "service-z1234",
    customerId: "customer-56789",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2025-11-30T16:30:00.000Z"), // Example Date in Future
    status: "confirmed",
    barbershopId: "barbershop-defgh",
    serviceId: "service-ijklm",
    customerId: "customer-nopqr",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-01-10T08:00:00.000Z"), // Example Date in Future
    status: "completed",
    barbershopId: "barbershop-xyz12",
    serviceId: "service-34567",
    customerId: "customer-890ab",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-02-14T10:00:00.000Z"), // Example Date in Future
    status: "cancelled",
    barbershopId: "barbershop-hijkl",
    serviceId: "service-mnopq",
    customerId: "customer-rstuv",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-03-25T13:00:00.000Z"), // Example Date in Future
    status: "created",
    barbershopId: "barbershop-23456",
    serviceId: "service-7890a",
    customerId: "customer-bcdef",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-04-01T17:00:00.000Z"), // Example Date in Future
    status: "confirmed",
    barbershopId: "barbershop-lmnop",
    serviceId: "service-qrstu",
    customerId: "customer-vwxyz",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-05-01T09:45:00.000Z"), // Example Date in Future
    status: "completed",
    barbershopId: "barbershop-67890",
    serviceId: "service-abcde",
    customerId: "customer-fghij",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-05-18T12:00:00.000Z"), // Example Date in Future
    status: "cancelled",
    barbershopId: "barbershop-pqrst",
    serviceId: "service-uvwxy",
    customerId: "customer-z1234",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-06-22T14:30:00.000Z"), // Example Date in Future
    status: "created",
    barbershopId: "barbershop-0abc",
    serviceId: "service-defgh",
    customerId: "customer-ijklm",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-07-04T10:00:00.000Z"), // Example Date in Future
    status: "confirmed",
    barbershopId: "barbershop-stuvw",
    serviceId: "service-xyz12",
    customerId: "customer-34567",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-08-11T11:00:00.000Z"), // Example Date in Future
    status: "completed",
    barbershopId: "barbershop-cdefg",
    serviceId: "service-hijkl",
    customerId: "customer-mnopq",
  },
  {
    uuid: crypto.randomUUID(),
    appointmentDate: new Date("2026-09-01T15:00:00.000Z"), // Example Date in Future
    status: "cancelled",
    barbershopId: "barbershop-wxyz1",
    serviceId: "service-23456",
    customerId: "customer-7890a",
  },
];
