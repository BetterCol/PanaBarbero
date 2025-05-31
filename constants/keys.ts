import type { AppointmentStatus } from "@/database/schemas";
import { APPOINTMENT_STATUS } from "@/database/schemas";

export const CACHE_KEYS = {
  BARBERSHOP: (barbershopId: string) => `barbershop:${barbershopId}`,
  BARBER: (barberId: string) => `barber:${barberId}`,
  SERVICE: (serviceId: string) => `service:${serviceId}`,
  APPOINTMENT: (appointmentId: string) => `appointment:${appointmentId}`,
  BARBERSHOPS: "barbershops",
  BARBERSHOP_BY_USER: (userId: string) => `barbershop:user:${userId}`,
  BARBERS: "barbers",
  SERVICES: "services",
  APPOINTMENTS: "appointments",
  APPOINTMENTS_BY_BARBERSHOP: (barbershopId: string) =>
    `appointments:barbershop:${barbershopId}`,
  USER: (userId: string) => `user:${userId}`,
  USERS: "users",
} as const;

export type CacheKeys = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

export const TRANSLATED_APPOINTMENT_STATUS: Record<AppointmentStatus, string> =
  {
    [APPOINTMENT_STATUS.CREATED]: "Creado",
    [APPOINTMENT_STATUS.COMPLETED]: "Completado",
    [APPOINTMENT_STATUS.CANCELLED]: "Cancelado",
    [APPOINTMENT_STATUS.NO_SHOW]: "No asistió",
    [APPOINTMENT_STATUS.RESCHEDULED]: "Reprogramado",
  };
