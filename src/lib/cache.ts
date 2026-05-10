import { Redis } from '@upstash/redis';

// Check if Redis is configured
const REDIS_URL = process.env.REDIS_URL;
const REDIS_TOKEN = process.env.REDIS_TOKEN;
const isRedisConfigured = !!(REDIS_URL && REDIS_TOKEN);

// Initialize Redis client only if configured
let redis: Redis | null = null;
if (isRedisConfigured) {
  redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
  });
} else {
  console.warn('[Cache] Redis not configured. Caching disabled.');
}

// Cache key prefixes (same as in types)
const CACHE_KEYS = {
  SEARCH: 'search:',
  DRUG: 'drug:',
  BRAND_MAPPING: 'mapping:brand:',
  GENERIC_MAPPING: 'mapping:generic:',
  BPOM_ALL: 'bpom:all',
} as const;

// Cache TTL (in seconds)
const CACHE_TTL = {
  SEARCH: 86400, // 24 hours
  DRUG: 86400, // 24 hours
  MAPPING: 604800, // 7 days
  BPOM: 21600, // 6 hours
} as const;

/**
 * Get cached search results
 */
export async function getCachedSearch(query: string): Promise<import('../types/drug').Drug[] | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(`${CACHE_KEYS.SEARCH}${query}`);
    return cached ? JSON.parse(cached as string) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set cached search results
 */
export async function setCachedSearch(query: string, results: import('../types/drug').Drug[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(`${CACHE_KEYS.SEARCH}${query}`, CACHE_TTL.SEARCH, JSON.stringify(results));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Get cached drug details
 */
export async function getCachedDrug(id: string): Promise<import('../types/drug').Drug | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(`${CACHE_KEYS.DRUG}${id}`);
    return cached ? JSON.parse(cached as string) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set cached drug details
 */
export async function setCachedDrug(id: string, drug: import('../types/drug').Drug): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(`${CACHE_KEYS.DRUG}${id}`, CACHE_TTL.DRUG, JSON.stringify(drug));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Get brand-to-generic mapping from cache
 */
export async function getBrandMapping(brand: string): Promise<string | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(`${CACHE_KEYS.BRAND_MAPPING}${brand}`);
    return cached ? JSON.parse(cached as string) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set brand-to-generic mapping in cache
 */
export async function setBrandMapping(brand: string, generic: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(`${CACHE_KEYS.BRAND_MAPPING}${brand}`, CACHE_TTL.MAPPING, JSON.stringify(generic));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Get generic-to-brands mapping from cache
 */
export async function getGenericMapping(generic: string): Promise<string[] | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(`${CACHE_KEYS.GENERIC_MAPPING}${generic}`);
    return cached ? JSON.parse(cached as string) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set generic-to-brands mapping in cache
 */
export async function setGenericMapping(generic: string, brands: string[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(`${CACHE_KEYS.GENERIC_MAPPING}${generic}`, CACHE_TTL.MAPPING, JSON.stringify(brands));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Get full BPOM dataset from cache
 */
export async function getCachedBPOM(): Promise<import('../types/drug').Drug[] | null> {
  if (!redis) return null;
  try {
    const cached = await redis.get(CACHE_KEYS.BPOM_ALL);
    return cached ? JSON.parse(cached as string) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

/**
 * Set full BPOM dataset in cache
 */
export async function setCachedBPOM(drugs: import('../types/drug').Drug[]): Promise<void> {
  if (!redis) return;
  try {
    await redis.setex(CACHE_KEYS.BPOM_ALL, CACHE_TTL.BPOM, JSON.stringify(drugs));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

/**
 * Invalidate specific search cache
 */
export async function invalidateSearch(query: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(`${CACHE_KEYS.SEARCH}${query}`);
  } catch (error) {
    console.error('Cache invalidate error:', error);
  }
}

/**
 * Invalidate specific drug cache
 */
export async function invalidateDrug(id: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(`${CACHE_KEYS.DRUG}${id}`);
  } catch (error) {
    console.error('Cache invalidate error:', error);
  }
}

/**
 * Invalidate all BPOM cache
 */
export async function invalidateAllBPOM(): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(CACHE_KEYS.BPOM_ALL);
  } catch (error) {
    console.error('Cache invalidate error:', error);
  }
}

/**
 * Invalidate on API error (aggressive invalidation)
 */
export async function invalidateOnAPIError(query: string): Promise<void> {
  if (!redis) return;
  try {
    await redis.del(`${CACHE_KEYS.SEARCH}${query}`);
    // Optionally invalidate related mappings if needed
  } catch (error) {
    console.error('Cache invalidate error:', error);
  }
}