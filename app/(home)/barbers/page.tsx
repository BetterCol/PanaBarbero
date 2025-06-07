import { Suspense } from "react";

import { BarbershopCard } from "@/components/barber/barbershops/barbershop-card";
import { SearchFilters } from "@/components/barber/search-filters";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getBarbershops } from "@/database/services/barbershops/get";

const Barbershops = async () => {
  const barbershops = await getBarbershops();

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 space-y-1">
        <Heading>Descubre barberías</Heading>
        <Paragraph muted>
          Explora las mejores barberías de tu zona y encuentra la que más se
          ajuste a tus necesidades.
        </Paragraph>
      </header>
      <Suspense
        fallback={
          <div className="flex min-h-96 w-full animate-pulse items-center justify-center rounded-xl bg-accent">
            <Paragraph muted>Cargando...</Paragraph>
          </div>
        }
      >
        <div className="space-y-4">
          <SearchFilters />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {barbershops.length > 0 ? (
              barbershops.map((barbershop) => (
                <BarbershopCard key={barbershop.uuid} barbershop={barbershop} />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
                <Paragraph muted>No se encontraron barberías.</Paragraph>
              </div>
            )}
          </div>
        </div>
      </Suspense>
    </div>
  );
};
export default Barbershops;
