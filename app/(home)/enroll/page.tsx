import { Suspense } from "react";

import { Calendar, Scissors } from "lucide-react";

import { ProductList } from "@/components/barber/products-list";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getProductsFromPolar } from "@/lib/polar";

const Enroll = async () => {
  const products = await getProductsFromPolar();

  return (
    <div className="p-4 md:p-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-1">
        <Heading center>Empieza a recibir clientes hoy mismo</Heading>
        <Paragraph center muted>
          Si eres dueño de una barberia y quieres que tus clientes puedan
          reservar citas contigo, puedes inscribirte aqui.
        </Paragraph>

        <Separator className="my-4 max-w-6xl" />

        <section className="mx-auto flex w-full max-w-sm flex-col items-center justify-between gap-4 rounded-xl border bg-gradient-to-br from-card to-secondary p-4 sm:max-w-lg sm:flex-row md:items-start md:gap-8 lg:max-w-xl xl:max-w-2xl dark:from-secondary dark:to-card">
          <div>
            <Heading as="h2" className="mb-2">
              Funcionalidades
            </Heading>
            <Paragraph muted>
              - Crear tu barberia y servicios ofrecidos
            </Paragraph>
            <Paragraph muted>- Gestionar tus reservas y clientes</Paragraph>
            <Paragraph muted>
              - Personalizar tu perfil y horarios de atención
            </Paragraph>
          </div>
          <div className="flex size-32 items-center justify-center gap-1 rounded-lg border">
            <Scissors className="size-8" />
            <Calendar className="size-8" />
          </div>
        </section>

        <Heading as="h2" className="mt-14" center>
          Trabaja sin costo en el 99% de los casos y solo pagas cuando realmente
          lo requieras
        </Heading>

        <Suspense
          fallback={
            <div className="w-full">
              <Skeleton className="h-16 max-w-xs" />
            </div>
          }
        >
          <section className="mx-auto mt-16 flex min-h-96 w-full max-w-4xl flex-col items-center justify-center gap-2 lg:mt-0 lg:flex-row">
            {products.map((product) => {
              const isPaid = product.prices.some(
                (price) => price.amountType === "fixed",
              );

              return (
                <ProductList
                  key={product.id}
                  product={product}
                  isPaid={isPaid}
                />
              );
            })}
          </section>
        </Suspense>
      </div>
    </div>
  );
};
export default Enroll;
