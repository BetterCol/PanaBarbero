import { getCache, setCache } from "@/cache/utils";
import { CACHE_KEYS } from "@/constants/keys";
import { db } from "@/database/config";

export async function getAppointmentById(appointmentId: string) {
  const appointment = await db.query.appointments.findFirst({
    where: (appointments, { eq }) => eq(appointments.id, appointmentId),
    with: {
      customer: {
        columns: {
          id: true,
          name: true,
        },
      },
      service: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (appointment) {
    await setCache(CACHE_KEYS.APPOINTMENT(appointmentId), appointment);
  }

  return appointment;
}

export async function getAppointmentsByBarbershopId(barbershopId: string, limit = 10) {
  const appointments = await db.query.appointments.findMany({
    where: (appointments, { eq, and }) =>
      and(
        eq(appointments.barbershopId, barbershopId),
        eq(appointments.appointmentDate, new Date()),
      ),
    with: {
      customer: {
        columns: {
          id: true,
          name: true,
        },
      },
      service: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
    limit,
  });

  if (appointments.length > 0) {
    await setCache(CACHE_KEYS.APPOINTMENTS_BY_BARBERSHOP(barbershopId), appointments);
  }

  return appointments;
}
