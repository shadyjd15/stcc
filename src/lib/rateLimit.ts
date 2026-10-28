/**
 * In-memory sliding-window rate limiter for public endpoints (forms, applications,
 * vendor sign-up, analytics beacon). Good for a single container; when running several
 * replicas, add a Cloudflare WAF rate-limiting rule as the outer layer (see README).
 */
type Bucket = { hits: number[] }
const buckets = new Map<string, Bucket>()
let lastSweep = Date.now()

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  if (now - lastSweep > 60_000) {
    for (const [k, b] of buckets) {
      if (!b.hits.length || now - b.hits[b.hits.length - 1] > 3600_000) buckets.delete(k)
    }
    lastSweep = now
  }
  const bucket = buckets.get(key) || { hits: [] }
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs)
  if (bucket.hits.length >= limit) {
    buckets.set(key, bucket)
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - bucket.hits[0])) / 1000) }
  }
  bucket.hits.push(now)
  buckets.set(key, bucket)
  return { ok: true, retryAfter: 0 }
}
