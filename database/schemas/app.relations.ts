import { relations } from "drizzle-orm";

import * as appSchemas from "./app";
import * as authSchemas from "./auth";

export const barbershopRelations = relations(
  appSchemas.barbershops,
  ({ one, many }) => ({
    owner: one(authSchemas.user, {
      fields: [appSchemas.barbershops.ownerId],
      references: [authSchemas.user.id],
    }),
    barbers: many(appSchemas.barbers),
    services: many(appSchemas.services),
    appointments: many(appSchemas.appointments),
  }),
);

export const barberRelations = relations(appSchemas.barbers, ({ one }) => ({
  user: one(authSchemas.user, {
    fields: [appSchemas.barbers.userId],
    references: [authSchemas.user.id],
  }),
  barbershop: one(appSchemas.barbershops, {
    fields: [appSchemas.barbers.barbershopId],
    references: [appSchemas.barbershops.id],
  }),
}));

export const appointmentRelations = relations(
  appSchemas.appointments,
  ({ one }) => ({
    barber: one(authSchemas.user, {
      fields: [appSchemas.appointments.barberId],
      references: [authSchemas.user.id],
    }),
    customer: one(authSchemas.user, {
      fields: [appSchemas.appointments.customerId],
      references: [authSchemas.user.id],
    }),
    service: one(appSchemas.services, {
      fields: [appSchemas.appointments.serviceId],
      references: [appSchemas.services.id],
    }),
    barbershop: one(appSchemas.barbershops, {
      fields: [appSchemas.appointments.barbershopId],
      references: [appSchemas.barbershops.id],
    }),
  }),
);

export const serviceRelations = relations(appSchemas.services, ({ one }) => ({
  barbershop: one(appSchemas.barbershops, {
    fields: [appSchemas.services.barbershopId],
    references: [appSchemas.barbershops.id],
  }),
}));
