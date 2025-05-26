import { getCache, setCache } from "./utils";

/**
 * Configuration options for rate limiting
 */
export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  limit: number;
  /** Window size in seconds */
  windowSizeSeconds: number;
  /** Optional prefix for Redis keys */
  keyPrefix?: string;
}

/**
 * Result of a rate limit check
 */
export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Current count of requests in the window */
  count: number;
  /** Maximum number of requests allowed */
  limit: number;
  /** Time remaining in the current window (seconds) */
  windowRemainingSeconds: number;
  /** Timestamp when the current window resets */
  windowResetTime: number;
}

/**
 * Internal structure stored in Redis for rate limiting
 */
interface RateLimitData {
  count: number;
  windowStart: number;
}

/**
 * Error thrown when rate limit configuration is invalid
 */
export class RateLimitConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RateLimitConfigError";
  }
}

/**
 * A type-safe, scalable rate limiter using the fixed window algorithm
 *
 * The fixed window algorithm divides time into fixed-size windows and counts
 * requests within each window. When a window expires, the count resets.
 *
 * @example
 * ```typescript
 * const rateLimiter = new RateLimit({
 *   limit: 100,
 *   windowSizeSeconds: 60,
 *   keyPrefix: 'api_rate_limit'
 * });
 *
 * const result = await rateLimiter.check('user:123');
 * if (!result.allowed) {
 *   throw new Error(`Rate limit exceeded. Try again in ${result.windowRemainingSeconds}s`);
 * }
 * ```
 */
export class RateLimit {
  private readonly config: Required<RateLimitConfig>;

  constructor(config: RateLimitConfig) {
    this.validateConfig(config);
    this.config = {
      keyPrefix: "rate_limit",
      ...config,
    };
  }

  /**
   * Validates the rate limit configuration
   */
  private validateConfig(config: RateLimitConfig): void {
    if (config.limit <= 0) {
      throw new RateLimitConfigError("Limit must be greater than 0");
    }
    if (config.windowSizeSeconds <= 0) {
      throw new RateLimitConfigError("Window size must be greater than 0 seconds");
    }
    if (config.keyPrefix !== undefined && typeof config.keyPrefix !== "string") {
      throw new RateLimitConfigError("Key prefix must be a string");
    }
  }

  /**
   * Generates a Redis key for the given identifier
   */
  private getRedisKey(identifier: string): string {
    return `${this.config.keyPrefix}:${identifier}`;
  }

  /**
   * Gets the current window start timestamp
   */
  private getCurrentWindowStart(): number {
    const now = Math.floor(Date.now() / 1000);
    return Math.floor(now / this.config.windowSizeSeconds) * this.config.windowSizeSeconds;
  }

  /**
   * Checks if a request is allowed under the rate limit
   *
   * @param identifier - Unique identifier for the rate limit (e.g., user ID, IP address)
   * @returns Promise<RateLimitResult> - Result containing whether the request is allowed and metadata
   */
  async check(identifier: string): Promise<RateLimitResult> {
    if (!identifier || typeof identifier !== "string") {
      throw new Error("Identifier must be a non-empty string");
    }

    const redisKey = this.getRedisKey(identifier);
    const currentWindowStart = this.getCurrentWindowStart();
    const windowEnd = currentWindowStart + this.config.windowSizeSeconds;
    const now = Math.floor(Date.now() / 1000);

    try {
      // Get current rate limit data
      const existingData = await getCache<RateLimitData>(redisKey);

      let count: number;

      if (!existingData || existingData.windowStart !== currentWindowStart) {
        // New window or no existing data - start fresh
        count = 1;
        await setCache(
          redisKey,
          { count, windowStart: currentWindowStart } as RateLimitData,
          this.config.windowSizeSeconds,
        );
      } else {
        // Existing window - increment count
        count = existingData.count + 1;
        await setCache(
          redisKey,
          { count, windowStart: currentWindowStart } as RateLimitData,
          windowEnd - now, // TTL based on remaining window time
        );
      }

      const allowed = count <= this.config.limit;
      const windowRemainingSeconds = windowEnd - now;

      return {
        allowed,
        count,
        limit: this.config.limit,
        windowRemainingSeconds: Math.max(0, windowRemainingSeconds),
        windowResetTime: windowEnd,
      };
    } catch (error) {
      // Log error but don't fail the request - fail open for availability
      console.error("Rate limit check failed:", error);

      // Return a permissive result when Redis is unavailable
      return {
        allowed: true,
        count: 0,
        limit: this.config.limit,
        windowRemainingSeconds: this.config.windowSizeSeconds,
        windowResetTime: windowEnd,
      };
    }
  }

  /**
   * Gets the current rate limit status without incrementing the count
   *
   * @param identifier - Unique identifier for the rate limit
   * @returns Promise<RateLimitResult> - Current rate limit status
   */
  async getStatus(identifier: string): Promise<RateLimitResult> {
    if (!identifier || typeof identifier !== "string") {
      throw new Error("Identifier must be a non-empty string");
    }

    const redisKey = this.getRedisKey(identifier);
    const currentWindowStart = this.getCurrentWindowStart();
    const windowEnd = currentWindowStart + this.config.windowSizeSeconds;
    const now = Math.floor(Date.now() / 1000);

    try {
      const existingData = await getCache<RateLimitData>(redisKey);

      let count: number;

      if (!existingData || existingData.windowStart !== currentWindowStart) {
        count = 0;
      } else {
        count = existingData.count;
      }

      const allowed = count < this.config.limit;
      const windowRemainingSeconds = windowEnd - now;

      return {
        allowed,
        count,
        limit: this.config.limit,
        windowRemainingSeconds: Math.max(0, windowRemainingSeconds),
        windowResetTime: windowEnd,
      };
    } catch (error) {
      console.error("Rate limit status check failed:", error);

      return {
        allowed: true,
        count: 0,
        limit: this.config.limit,
        windowRemainingSeconds: this.config.windowSizeSeconds,
        windowResetTime: windowEnd,
      };
    }
  }

  /**
   * Manually resets the rate limit for a specific identifier
   *
   * @param identifier - Unique identifier for the rate limit
   */
  async reset(identifier: string): Promise<void> {
    if (!identifier || typeof identifier !== "string") {
      throw new Error("Identifier must be a non-empty string");
    }

    const redisKey = this.getRedisKey(identifier);

    try {
      const { deleteCache } = await import("./utils");
      await deleteCache(redisKey);
    } catch (error) {
      console.error("Rate limit reset failed:", error);
      throw new Error("Failed to reset rate limit");
    }
  }

  /**
   * Creates multiple rate limiters with different configurations
   *
   * @param configs - Object mapping names to rate limit configurations
   * @returns Object mapping names to RateLimit instances
   */
  static createMultiple<T extends Record<string, RateLimitConfig>>(
    configs: T,
  ): { [K in keyof T]: RateLimit } {
    const result = {} as { [K in keyof T]: RateLimit };

    for (const [name, config] of Object.entries(configs)) {
      result[name as keyof T] = new RateLimit(config);
    }

    return result;
  }
}

// Export common rate limit configurations
export const ratelimits = {
  /** 100 requests per minute */
  standard: {
    limit: 100,
    windowSizeSeconds: 60,
  },
  /** 1000 requests per hour */
  generous: {
    limit: 1000,
    windowSizeSeconds: 3600,
  },
  /** 10 requests per minute */
  strict: {
    limit: 10,
    windowSizeSeconds: 60,
  },
  /** 5 requests per second */
  burst: {
    limit: 5,
    windowSizeSeconds: 1,
  },
} as const satisfies Record<string, RateLimitConfig>;
