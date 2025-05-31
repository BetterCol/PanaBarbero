import { getCache, setCache } from "@/cache/utils";
import { CACHE_KEYS } from "@/constants/keys";
import { db } from "@/database/config";
import type { AppointmentWithRelations } from "@/database/schemas";

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

export async function getAppointmentsByBarbershopId(
  barbershopId: string,
  limit = 10,
) {
  const cachedAppointments = await getCache<AppointmentWithRelations[]>(
    CACHE_KEYS.APPOINTMENTS_BY_BARBERSHOP(barbershopId),
  );

  if (cachedAppointments) {
    return cachedAppointments;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const appointments = await db.query.appointments.findMany({
    where: (appointments, { eq, and, gte }) =>
      and(
        eq(appointments.barbershopId, barbershopId),
        gte(appointments.appointmentDate, today),
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
    await setCache(
      CACHE_KEYS.APPOINTMENTS_BY_BARBERSHOP(barbershopId),
      appointments,
    );
  }

  return appointments;
}
