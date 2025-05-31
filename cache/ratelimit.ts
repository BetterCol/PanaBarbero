import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const cache = new Map();

const rlClient = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  timeout: 5000,
  analytics: true,
  ephemeralCache: cache,
});

export async function limitByKey(key: string) {
  const result = await rlClient.limit(key);

  return {
    success: result.success,
    requestsRemaining: result.remaining,
    unixRemaining: result.reset,
  };
}
