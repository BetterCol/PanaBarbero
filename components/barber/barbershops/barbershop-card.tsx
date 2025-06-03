"use client";

import type { FC } from "react";

import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paragraph } from "@/components/ui/typography";
import type { Barbershop } from "@/database/schemas";

interface BarbershopCardProps {
  barbershop: Barbershop;
}

export const BarbershopCard: FC<BarbershopCardProps> = ({ barbershop }) => {
  const initials = barbershop.name
    ? barbershop.name
        .split(" ")
        .map((name) => name.charAt(0).toUpperCase())
        .join("")
    : "N/A";

  return (
    <Card className="mx-auto w-full max-w-sm border border-border/80 shadow-none">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>{barbershop.name}</CardTitle>
        <CardAction>
          <Avatar className="size-10">
            <AvatarImage src={barbershop.logoUrl ?? ""} alt={barbershop.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Paragraph muted>
          {barbershop.city}, {barbershop.state}
        </Paragraph>
      </CardContent>
      <CardFooter>
        <Button asChild fullWidth>
          <Link href={`/barbers/${barbershop.uuid}`}>
            <ArrowRight />
            Ver disponibilidad
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
