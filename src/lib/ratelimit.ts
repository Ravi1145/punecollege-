/**
 * Simple in-memory rate limiter for AI API routes.
 * Resets on server restart — sufficient for edge-case abuse protection.
 * For production scale, replace with Upstash Redis.
 */

interface Entry { count: number; resetAt: number }

const store = new Map<string, Entry>()

export function rateLimit(
  ip: string,
  limit = 20,       // max requests
  windowMs = 60_000 // per 1 minute
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(ip)

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: limit - entry.count }
}

// Cleanup stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key)
  }
}, 5 * 60_000)
