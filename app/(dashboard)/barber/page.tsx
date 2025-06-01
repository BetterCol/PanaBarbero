import { Suspense } from "react";

import { redirect } from "next/navigation";

import { HeaderAnalytics } from "@/components/barber/header-analytics";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getAppointmentsByBarbershopId } from "@/database/services/appointments/get";
import { getBarbershopByUserId } from "@/database/services/barbershops/get";
import { getCurrentUser } from "@/lib/session";

const BarberDashboard = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const barbershop = await getBarbershopByUserId(user.id);

  const lastFiveAppointments = await getAppointmentsByBarbershopId(
    barbershop?.id ?? "",
    5,
  );

  return (
    <div className="px-4 2xl:px-0">
      <div className="mb-6">
        <Heading>Bienvenido de vuelta</Heading>
        <Paragraph muted>
          Aquí puedes ver las estadísticas de tus reservaciones y administrar tu
          agenda.
        </Paragraph>
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-96 w-full items-center justify-center rounded-xl bg-muted">
            <Paragraph>Cargando...</Paragraph>
          </div>
        }
      >
        <HeaderAnalytics appointments={lastFiveAppointments} />
      </Suspense>
    </div>
  );
};
export default BarberDashboard;
