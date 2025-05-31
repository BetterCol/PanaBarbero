import { createInsertSchema } from "drizzle-zod";
import type { output } from "zod/v4";

import { barbershops } from "./app";

export const createBarbershopSchema = createInsertSchema(barbershops);

export type CreateBarbershopSchema = output<typeof createBarbershopSchema>;
