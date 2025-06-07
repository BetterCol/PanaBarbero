import { Polar } from "@polar-sh/sdk";

import { db } from "@/database/config";
import { barbers } from "@/database/schemas";
import { serverEnv } from "@/env/server";
import type { Subscription } from "@polar-sh/sdk/models/components/subscription.js";

const isProductionEnv =
  process.env.NODE_ENV === "production" || !!process.env.CI;

export const client = new Polar({
  accessToken: serverEnv.POLAR_ACCESS_TOKEN,
  server: isProductionEnv ? "production" : "sandbox",
});

export async function getProductsFromPolar() {
  const products = await client.products.list({
    limit: 10,
    isArchived: false,
  });

  return products.result.items;
}

export async function getAppProducts() {
  const products = await client.products.list({
    limit: 10,
    isArchived: false,
  });

  return products.result.items.map((product) => ({
    productId: product.id,
    slug: product.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function subscribeCustomer(
  customerId: string,
  productId: string,
  data: Subscription,
) {
  const [barberSubscription] = await db
    .insert(barbers)
    .values({
      userId: customerId,
      barbershopId: data.metadata?.barbershopId ?? "",
      productId,
      subscriptionEndDate: data.currentPeriodEnd,
      subscriptionStartDate: data.currentPeriodStart,
    })
    .returning();

  return barberSubscription.uuid;
}

export async function isCustomerSubscribed(customerId: string) {
  const subscriptions = await client.subscriptions.list({
    customerId,
  });

  return subscriptions.result.items.length > 0;
}
