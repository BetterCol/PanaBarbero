import { relations } from "drizzle-orm";

import * as appSchemas from "./app";
import * as authSchemas from "./auth";

export const barbershopRelations = relations(appSchemas.barbershops, ({ one, many }) => ({
  owner: one(authSchemas.user, {
    fields: [appSchemas.barbershops.ownerId],
    references: [authSchemas.user.id],
  }),
  barbers: many(appSchemas.barbers),
}));

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
