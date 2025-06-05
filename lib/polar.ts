import { Polar } from "@polar-sh/sdk";

import { serverEnv } from "@/env/server";

const isProductionEnv =
  process.env.NODE_ENV === "production" || !!process.env.CI;

export const client = new Polar({
  accessToken: serverEnv.POLAR_ACCESS_TOKEN,
  server: isProductionEnv ? "production" : "sandbox",
});

export async function getProductsFromPolar() {
  const products = await client.products.list({
    limit: 10,
  });

  return products.result.items;
}

export async function getAppProducts() {
  const products = await client.products.list({
    limit: 10,
  });

  return products.result.items.map((product) => ({
    productId: product.id,
    slug: product.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}
