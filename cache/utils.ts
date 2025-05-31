import { Redis } from "@upstash/redis";

import { serverEnv } from "@/env/server";

const client = new Redis({
  url: serverEnv.UPSTASH_REDIS_REST_URL ?? "",
  token: serverEnv.UPSTASH_REDIS_REST_TOKEN ?? "",
});

export const getCache = async <T>(key: string) => {
  const value = (await client.get(key)) as unknown as string;

  return value as T;
};

export const setCache = async (key: string, value: unknown, ttl?: number) => {
  await client.set(key, JSON.stringify(value), {
    ex: ttl ?? 60 * 60,
  });
};

export const deleteCache = async (key: string) => {
  await client.del(key);
};
