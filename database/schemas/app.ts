import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";

import * as authSchemas from "./auth";

export type Platform =
  | "facebook"
  | "instagram"
  | "twitter"
  | "youtube"
  | "tiktok";

export type SocialMedia = {
  [MediaPlatform in Platform]: string | null;
};

export const APPOINTMENT_STATUS = {
  CREATED: "created",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  NO_SHOW: "no_show",
  RESCHEDULED: "rescheduled",
} as const;

export type AppointmentStatus =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export const TRANSLATED_APPOINTMENT_STATUS: Record<AppointmentStatus, string> =
  {
    [APPOINTMENT_STATUS.CREATED]: "Creado",
    [APPOINTMENT_STATUS.COMPLETED]: "Completado",
    [APPOINTMENT_STATUS.CANCELLED]: "Cancelado",
    [APPOINTMENT_STATUS.NO_SHOW]: "No asistió",
    [APPOINTMENT_STATUS.RESCHEDULED]: "Reprogramado",
  };

export const appointmentStatusEnum = pgEnum("appintment_status", [
  APPOINTMENT_STATUS.CREATED,
  APPOINTMENT_STATUS.COMPLETED,
  APPOINTMENT_STATUS.CANCELLED,
  APPOINTMENT_STATUS.NO_SHOW,
  APPOINTMENT_STATUS.RESCHEDULED,
]);

const baseColumns = {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => ulid(Date.now())),
  uuid: uuid()
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
  createdAt: timestamp().$defaultFn(() => new Date()),
  updatedAt: timestamp()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
};

/**
 * isActive logic:
 * ```ts
 * const isActive = !!barbers.subscriptionStartDate && !!barbers.subscriptionEndDate
 * ```
 */
export const barbers = pgTable("barbers", {
  subscriptionStartDate: timestamp(),
  subscriptionEndDate: timestamp(),
  userId: text()
    .notNull()
    .references(() => authSchemas.user.id, { onDelete: "cascade" }),
  barbershopId: text()
    .notNull()
    .references(() => barbershops.id, { onDelete: "cascade" }),
  ...baseColumns,
});

export const barbershops = pgTable(
  "barbershops",
  {
    name: text().notNull(),
    address: text().notNull(),
    state: text().notNull(),
    city: text().notNull(),
    phone: text().notNull(),
    logoUrl: text(),
    socialMedia: jsonb().$type<SocialMedia>(),
    ownerId: text()
      .notNull()
      .references(() => authSchemas.user.id, { onDelete: "cascade" }),
    ...baseColumns,
  },
  (table) => [index("barbershops_ownerId_idx").on(table.ownerId)],
);

export type Barbershop = typeof barbershops.$inferSelect;
export type BarbershopInsert = typeof barbershops.$inferInsert;

export const services = pgTable("services", {
  name: text().notNull(),
  description: text(),
  price: integer().notNull(),
  duration: integer().notNull(),
  barbershopId: text()
    .notNull()
    .references(() => barbershops.id, { onDelete: "cascade" }),
  ...baseColumns,
});

export type Service = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export const appointments = pgTable("appointments", {
  barbershopId: text()
    .notNull()
    .references(() => barbershops.id, { onDelete: "cascade" }),
  barberId: text()
    .notNull()
    .references(() => barbers.id, { onDelete: "cascade" }),
  serviceId: text()
    .notNull()
    .references(() => services.id, { onDelete: "cascade" }),
  customerId: text()
    .notNull()
    .references(() => authSchemas.user.id, { onDelete: "cascade" }),
  appointmentDate: timestamp().notNull(),
  status: appointmentStatusEnum().notNull().default("created"),
  ...baseColumns,
});

export type Appointment = typeof appointments.$inferSelect;
export type AppointmentInsert = typeof appointments.$inferInsert;
export type AppointmentWithRelations = Appointment & {
  customer: Pick<authSchemas.User, "id" | "name">;
  service: Pick<Service, "id" | "name">;
};
