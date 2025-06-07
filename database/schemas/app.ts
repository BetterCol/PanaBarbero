import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
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

export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export type BarbershopAvailability = {
  [day in Day]: {
    open: string;
    close: string;
  };
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
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};

/**
 * isActive logic:
 * ```ts
 * const isActive = !!barbers.subscriptionStartDate && !!barbers.subscriptionEndDate
 * ```
 */
export const barbers = pgTable(
  "barbers",
  {
    subscriptionStartDate: timestamp(),
    subscriptionEndDate: timestamp(),
    userId: text()
      .notNull()
      .references(() => authSchemas.user.id, { onDelete: "cascade" }),
    productId: text().notNull(),
    barbershopId: text()
      .notNull()
      .references(() => barbershops.id, { onDelete: "cascade" }),
    ...baseColumns,
  },
  (table) => [uniqueIndex("barbers_uuid_idx").on(table.uuid)],
);

export const barbershops = pgTable(
  "barbershops",
  {
    name: text().notNull(),
    address: text().notNull(),
    state: text().notNull(),
    city: text().notNull(),
    phone: text().notNull(),
    availability: jsonb().$type<BarbershopAvailability>().notNull(),
    logoUrl: text(),
    socialMedia: jsonb().$type<SocialMedia>(),
    ownerId: text()
      .notNull()
      .references(() => authSchemas.user.id, { onDelete: "cascade" }),
    ...baseColumns,
  },
  (table) => [
    index("barbershops_ownerId_idx").on(table.ownerId),
    uniqueIndex("barbershops_uuid_idx").on(table.uuid),
  ],
);

export type Barbershop = typeof barbershops.$inferSelect;
export type BarbershopInsert = typeof barbershops.$inferInsert;
export type BarbershopWithRelations = Barbershop & {
  owner: Pick<authSchemas.User, "id" | "name">;
  barbers: Pick<Barbershop, "id" | "name">[];
  services: Pick<Service, "id" | "name" | "price" | "duration" | "uuid">[];
  appointments: Pick<Appointment, "id" | "appointmentDate">[];
};

export const services = pgTable(
  "services",
  {
    name: text().notNull(),
    description: text(),
    price: integer().notNull(),
    duration: integer().notNull(),
    barbershopId: text()
      .notNull()
      .references(() => barbershops.id, { onDelete: "cascade" }),
    ...baseColumns,
  },
  (table) => [uniqueIndex("services_uuid_idx").on(table.uuid)],
);

export type Service = typeof services.$inferSelect;
export type ServiceInsert = typeof services.$inferInsert;

export const appointments = pgTable(
  "appointments",
  {
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
  },
  (table) => [
    index("appointments_barbershopId_idx").on(table.barbershopId),
    index("appointments_barberId_idx").on(table.barberId),
    index("appointments_serviceId_idx").on(table.serviceId),
    index("appointments_customerId_idx").on(table.customerId),
    uniqueIndex("appointments_uuid_idx").on(table.uuid),
  ],
);

export type Appointment = typeof appointments.$inferSelect;
export type AppointmentInsert = typeof appointments.$inferInsert;
export type AppointmentWithRelations = Appointment & {
  customer: Pick<authSchemas.User, "id" | "name">;
  service: Pick<Service, "id" | "name">;
};
