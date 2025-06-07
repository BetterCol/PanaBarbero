"use client";

import type { FC } from "react";

import type { Product } from "@polar-sh/sdk/models/components/product.js";

import { Badge } from "@/components/ui/badge";
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
import { useCustomer } from "@/hooks/use-customer";
import { checkout } from "@/lib/auth-client";
import { cn, priceDollar } from "@/lib/utils";

interface ProductListProps {
  product: Product;
  isPaid: boolean;
}

export const ProductList: FC<ProductListProps> = ({ product, isPaid }) => {
  const customer = useCustomer();

  const toCheckout = async (productId: Product["id"]) =>
    await checkout({
      products: [productId],
      slug: product.name.toLowerCase().replace(/\s+/g, "-"),
    });

  const isSubscribed = customer?.activeSubscriptions.length! > 0;
  const subscriptionProduct = customer?.activeSubscriptions.find(
    (subscription) => subscription.productId === product.id,
  );

  console.log(customer);

  return (
    <Card
      key={product.id}
      className={cn(
        "hover:-translate-y-4 relative mx-auto mb-4 max-h-full w-full border-2 border-border/50 transition-transform duration-500 ease-in-out sm:min-w-sm sm:max-w-sm",
        {
          "border-2 border-primary": isPaid,
        },
      )}
    >
      {product.id === subscriptionProduct?.productId && isSubscribed && (
        <Badge className="-top-2 -right-4 absolute">Actual</Badge>
      )}

      {!isSubscribed && isPaid && (
        <Badge className="-top-2 -right-4 absolute">Recomendado</Badge>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        {product.prices.map((price) => (
          <CardAction
            key={price.id}
            className="font-bold text-2xl tracking-tighter"
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
        <Button
          fullWidth
          onClick={() => toCheckout(product.id)}
          disabled={isPaid && isSubscribed}
        >
          {isPaid
            ? "Actualizar"
            : isSubscribed
              ? "Volver al plan gratuito"
              : "Empezar gratis"}
        </Button>
      </CardFooter>
    </Card>
  );
};
