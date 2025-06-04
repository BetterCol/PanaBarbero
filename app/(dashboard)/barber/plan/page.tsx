import { CreditCard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Heading, Paragraph } from "@/components/ui/typography";

const Plan = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 space-y-1">
        <Heading>Tu plan actual es: gratuito</Heading>
        <Paragraph muted>
          Puedes actualizar a un plan Pro para obtener más funciones y
          beneficios por $9.99 al mes.
        </Paragraph>
      </header>

      <Button>
        <CreditCard />
        Actualizar a Pro
      </Button>
    </div>
  );
};
export default Plan;
