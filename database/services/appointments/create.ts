import { setCache } from "@/cache/utils";
import { CACHE_KEYS } from "@/constants/keys";
import { db } from "@/database/config";
import { appointments } from "@/database/schemas";
import type { AppointmentInsert } from "@/database/schemas";

export async function createAppointmentWithBarberId(appointmentData: AppointmentInsert) {
  const [createdAppointment] = await db.insert(appointments).values(appointmentData).returning();

  if (createdAppointment) {
    await setCache(CACHE_KEYS.APPOINTMENT(createdAppointment.id), createdAppointment);
  }

  return createdAppointment;
}
