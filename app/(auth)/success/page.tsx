"use client";

import { use } from "react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";

type SuccessSearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

const Success = (props: {
  searchParams: SuccessSearchParams;
}) => {
  const searchParams = use(props.searchParams);

  const { checkout_id } = searchParams;

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background p-4">
      <Heading>¡Éxito!</Heading>

      <Paragraph center muted className="my-4">
        ID de la transacción: {checkout_id}
      </Paragraph>

      <Paragraph variant="sub1" className="mb-4">
        Tu operación se ha completado con éxito.
      </Paragraph>

      <Button>Cerrar</Button>
    </div>
  );
};
export default Success;
