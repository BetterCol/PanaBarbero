import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getBarbershopByUuid } from "@/database/services/barbershops/get";
import { getAvailableDays } from "@/lib/appointments";
import { price } from "@/lib/utils";

type BarberParams = {
  uuid: string;
};

const Barber = async ({
  params,
}: {
  params: Promise<BarberParams>;
}) => {
  const { uuid } = await params;

  const barbershop = await getBarbershopByUuid(uuid);

  const initials = barbershop
    ? barbershop.name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
    : "N/A";

  const availableDays = getAvailableDays(barbershop?.availability!);

  const translated = {
    monday: "Lunes",
    tuesday: "Martes",
    wednesday: "Miércoles",
    thursday: "Jueves",
    friday: "Viernes",
    saturday: "Sábado",
    sunday: "Domingo",
  };

  for (const day of availableDays) {
    day.day = translated[day.day as keyof typeof translated] ?? day.day;
  }

  return (
    <div className="w-full p-4">
      <article className="mx-auto w-full max-w-sm rounded-xl border border-border/80 bg-card p-4 sm:max-w-md md:max-w-xl md:p-8 lg:max-w-4xl">
        <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Heading>{barbershop?.name}</Heading>
            <Paragraph variant="body">
              {barbershop?.city}, {barbershop?.state}
            </Paragraph>
            <Paragraph muted>{barbershop?.address}</Paragraph>
          </div>
          <Avatar className="size-16 md:size-24">
            <AvatarImage
              src={barbershop?.logoUrl ?? ""}
              alt={barbershop?.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </header>
        <Separator className="my-4" />

        <Heading as="h2" className="mb-4">
          Servicios ofrecidos
        </Heading>

        <ul className="list-disc pl-5">
          {barbershop?.services.map((service) => (
            <li key={service.uuid} className="space-y-2">
              <Paragraph variant="body">{service.name}</Paragraph>
              <Paragraph>{price(service.price)}</Paragraph>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        <Heading as="h2" className="mb-4">
          Horarios disponibles
        </Heading>
        <ul className="list-disc pl-5">
          {availableDays.map((day) => (
            <li key={day.day} className="space-y-2">
              <Paragraph variant="body">
                {day.day.charAt(0).toUpperCase() + day.day.slice(1)}: {day.open}{" "}
                - {day.close}
              </Paragraph>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
};
export default Barber;
