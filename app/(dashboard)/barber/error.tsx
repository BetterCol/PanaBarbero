"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/typography";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100dvh-9.3rem)] w-full flex-col items-center justify-center gap-4 rounded-xl bg-background">
      <Heading>Algo salió mal</Heading>
      <Button onClick={() => reset()}>Volver a intentar</Button>
    </div>
  );
};

export default Error;
