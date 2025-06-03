import { Suspense } from "react";

import { BarbershopCard } from "@/components/barber/barbershops/barbershop-card";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getBarbershops } from "@/database/services/barbershops/get";

const Barbershops = async () => {
  const barbershops = await getBarbershops();

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 space-y-1">
        <Heading>Descubre nuestras barberías</Heading>
        <Paragraph muted>
          Aquí puedes encontrar una lista de todas las barberías disponibles.
          Haz clic en una para ver más detalles y reservar tu cita.
        </Paragraph>
      </header>
      <Suspense
        fallback={
          <div className="flex min-h-96 w-full animate-pulse items-center justify-center rounded-xl bg-accent">
            <Paragraph muted>Cargando...</Paragraph>
          </div>
        }
      >
        {barbershops.map((barbershop) => (
          <BarbershopCard key={barbershop.uuid} barbershop={barbershop} />
        ))}
      </Suspense>
    </div>
  );
};
export default Barbershops;
