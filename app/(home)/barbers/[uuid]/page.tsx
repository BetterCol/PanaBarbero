import { Fragment } from "react";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { AppointmentSelectionForm } from "@/components/barber/appointments/appointment-selection-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Heading, Paragraph } from "@/components/ui/typography";
import { getBarbershopByUuid } from "@/database/services/barbershops/get";
import { getAvailableDays, getSocialMedia } from "@/lib/barbershop.utils";
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
  const media = getSocialMedia(barbershop?.socialMedia!);

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

  const orderedDays = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  availableDays.sort((a, b) => {
    return orderedDays.indexOf(a.day) - orderedDays.indexOf(b.day);
  });

  return (
    <div className="w-full p-4">
      <article className="mx-auto w-full max-w-sm rounded-xl border border-border/80 bg-card p-4 sm:max-w-xl md:max-w-3xl lg:p-8 xl:max-w-4xl">
        <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Heading>{barbershop?.name}</Heading>
            <Paragraph variant="body">
              {barbershop?.city}, {barbershop?.state}
            </Paragraph>
            <Paragraph muted>{barbershop?.address}</Paragraph>
          </div>
          <Avatar className="size-16 md:size-24 lg:size-32">
            <AvatarImage
              src={barbershop?.logoUrl ?? ""}
              alt={barbershop?.name}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </header>

        <Separator className="my-4" />

        <Heading as="h2" className="mb-4" weight="semibold">
          Servicios ofrecidos
        </Heading>

        <div className="mx-auto w-full max-w-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Servicio</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Duracion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {barbershop?.services.map((service) => (
                  <Fragment key={service.uuid}>
                    <TableCell>{service.name}</TableCell>
                    <TableCell>{price(service.price)}</TableCell>
                    <TableCell>{service.duration} minuto(s)</TableCell>
                  </Fragment>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Separator className="my-4" />

        <Heading as="h2" className="mb-4" weight="semibold">
          Horarios disponibles
        </Heading>

        <div className="mx-auto w-full max-w-2xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-24"></TableHead>
                {availableDays.map((day) => (
                  <TableHead key={day.day} className="font-medium">
                    {day.day}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Apertura</TableCell>
                {availableDays.map((day) => (
                  <TableCell key={day.day}>{day.open}</TableCell>
                ))}
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">Cierre</TableCell>
                {availableDays.map((day) => (
                  <TableCell key={day.day}>{day.close}</TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col items-start">
          <Heading as="h2" className="mb-4" weight="semibold">
            Reservar
          </Heading>

          <AppointmentSelectionForm />
        </div>

        <Separator className="my-4" />

        <Heading as="h3" className="mb-4" weight="semibold">
          Redes sociales
        </Heading>

        <div className="flex flex-wrap items-center gap-2">
          {media.map((item) => (
            <Button variant="outline" key={item.media} asChild>
              <Link
                href={`${item.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.media.charAt(0).toUpperCase() + item.media.slice(1)}
                <ArrowUpRight />
              </Link>
            </Button>
          ))}
        </div>
      </article>
    </div>
  );
};
export default Barber;
