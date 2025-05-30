import { Redis } from "ioredis";

const client = new Redis(process.env.REDIS_URL!);

export const getCache = async <T>(key: string): Promise<T | null> => {
  const value = await client.get(key);

  if (!value) return null;

  const parsedValue = JSON.parse(value) as T;

  return parsedValue;
};

export const setCache = async (key: string, value: unknown, ttl?: number) => {
  await client.set(key, JSON.stringify(value), "EX", ttl ?? 60 * 60);
};

export const deleteCache = async (key: string) => {
  await client.del(key);
};
