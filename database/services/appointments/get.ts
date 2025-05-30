import { getCache, setCache } from "@/cache/utils";
import { CACHE_KEYS } from "@/constants/keys";
import { db } from "@/database/config";
import type { AppointmentWithRelations } from "@/database/schemas";

export async function getAppointmentById(appointmentId: string) {
  const cachedAppointment = await getCache<AppointmentWithRelations>(
    CACHE_KEYS.APPOINTMENT(appointmentId),
  );

  if (cachedAppointment) {
    return cachedAppointment;
  }

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

  const parsedAppointment = {
    ...appointment,
    customerId: appointment?.customer?.name ?? "",
    serviceId: appointment?.service?.name ?? "",
  };

  delete parsedAppointment.customer;
  delete parsedAppointment.service;

  return parsedAppointment;
}

export async function getAppointmentsByBarbershopId(barbershopId: string, limit = 10) {
  const cachedAppointments = await getCache<AppointmentWithRelations[]>(
    CACHE_KEYS.APPOINTMENTS_BY_BARBERSHOP(barbershopId),
  );

  if (cachedAppointments) {
    return cachedAppointments;
  }

  const appointmentsList = await db.query.appointments.findMany({
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
  const parsedAppointments = appointmentsList.map((appointment) => ({
    ...appointment,
    customerId: appointment.customer?.name ?? "",
    serviceId: appointment.service?.name ?? "",
  }));

  if (appointmentsList.length > 0) {
    await setCache(CACHE_KEYS.APPOINTMENTS, parsedAppointments);
  }

  return parsedAppointments;
}
