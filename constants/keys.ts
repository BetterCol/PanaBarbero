export const CACHE_KEYS = {
  BARBERSHOP: (barbershopId: string) => `barbershop:${barbershopId}`,
  BARBER: (barberId: string) => `barber:${barberId}`,
  SERVICE: (serviceId: string) => `service:${serviceId}`,
  APPOINTMENT: (appointmentId: string) => `appointment:${appointmentId}`,
  BARBERSHOPS: "barbershops",
  BARBERS: "barbers",
  SERVICES: "services",
  APPOINTMENTS: "appointments",
  APPOINTMENTS_BY_BARBERSHOP: (barbershopId: string) => `appointments:barbershop:${barbershopId}`,
  USER: (userId: string) => `user:${userId}`,
  USERS: "users",
} as const;

export type CacheKeys = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];
