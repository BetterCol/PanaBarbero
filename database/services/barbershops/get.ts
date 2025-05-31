import { getCache, setCache } from "@/cache/utils";
import { CACHE_KEYS } from "@/constants/keys";
import { db } from "@/database/config";
import type { Barbershop } from "@/database/schemas";

export async function getBarbershopByUuid(barbershopUuid: string) {
  //   const cachedBarbershop = await getCache<BarbershopWithRelations>(
  //     CACHE_KEYS.BARBERSHOP(barbershopUuid),
  //   );

  //   if (cachedBarbershop) {
  //     return cachedBarbershop;
  //   }

  const barbershop = await db.query.barbershops.findFirst({
    where: (barbershops, { eq }) => eq(barbershops.uuid, barbershopUuid),
    with: {
      owner: {
        columns: {
          id: true,
          name: true,
        },
      },
      appointments: {
        columns: {
          id: true,
          appointmentDate: true,
        },
      },
      services: true,
    },
  });

  if (barbershop) {
    await setCache(CACHE_KEYS.BARBERSHOP(barbershopUuid), barbershop);
  }

  return barbershop;
}

export async function getBarbershops() {
  const cachedBarbershops = await getCache<Barbershop[]>(
    CACHE_KEYS.BARBERSHOPS,
  );

  if (cachedBarbershops) {
    return cachedBarbershops;
  }

  const barbershops = await db.query.barbershops.findMany();

  await setCache(CACHE_KEYS.BARBERSHOPS, barbershops);

  return barbershops;
}
