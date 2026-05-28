// In-memory rate limiter (per user, 20 messages/min)
// For production, replace the store with Redis

const store = new Map() // userId -> { count, resetAt }

const LIMIT = 20
const WINDOW_MS = 60 * 1000 // 1 minute

export function checkRateLimit(userId) {
  const now = Date.now()
  const entry = store.get(userId)

  if (!entry || now > entry.resetAt) {
    store.set(userId, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, remaining: LIMIT - 1, resetAt: now + WINDOW_MS }
  }

  if (entry.count >= LIMIT) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000)
    return { allowed: false, remaining: 0, retryAfter, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: LIMIT - entry.count, resetAt: entry.resetAt }
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, val] of store.entries()) {
    if (now > val.resetAt) store.delete(key)
  }
}, 5 * 60 * 1000)
