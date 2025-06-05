import { Calendar, Scissors } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getProductsFromPolar } from "@/lib/polar";
import { cn, priceDollar } from "@/lib/utils";
import { Suspense } from "react";

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

        <Heading className="mt-14 max-w-prose" center>
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
                <Card
                  key={product.id}
                  className={cn(
                    "hover:-translate-y-8 mx-auto mb-4 max-h-full w-full max-w-sm border-2 border-border/50 transition-transform duration-500 ease-in-out sm:min-w-sm",
                    {
                      "border-2 border-primary": isPaid,
                    },
                  )}
                >
                  <CardHeader>
                    <CardTitle className="font-bold text-3xl">
                      {product.name}
                    </CardTitle>
                    {product.prices.map((price) => (
                      <CardAction
                        key={price.id}
                        className="font-semibold text-xl"
                      >
                        {price.amountType === "fixed"
                          ? `${priceDollar(price.priceAmount / 100)}/mes`
                          : price.amountType === "free" && priceDollar(0)}
                      </CardAction>
                    ))}
                  </CardHeader>
                  <CardContent>
                    <Paragraph variant="sub1" muted>
                      {product.description}
                    </Paragraph>
                  </CardContent>
                  <CardFooter>
                    <Button fullWidth>
                      {isPaid ? "Actualizar" : "Empezar gratis"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </section>
        </Suspense>
      </div>
    </div>
  );
};
export default Enroll;
