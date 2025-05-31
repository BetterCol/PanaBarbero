import { Suspense } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getBarbershops } from "@/database/services/barbershops/get";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const Barbershops = async () => {
  const user = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(user);

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
        <ul>
          {barbershops.map((barbershop) => (
            <li
              key={barbershop.uuid}
              className="mx-auto w-full max-w-sm border p-4"
            >
              <Button asChild variant="link-neutral">
                <Link href={`/barbers/${barbershop.uuid}`}>
                  {barbershop.address} - {barbershop.city}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </Suspense>
    </div>
  );
};
export default Barbershops;
