import { NextRequest, NextResponse } from 'next/server'

// ── In-memory rate limiter (per IP, resets on cold start) ─────────
// For production, replace with Upstash Redis: https://upstash.com
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string, limit = 10, windowMs = 60_000): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return false
  }

  if (entry.count >= limit) return true
  entry.count++
  return false
}

// Clean up old entries every 5 minutes to prevent memory leak
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60_000) return
  lastCleanup = now
  for (const [key, val] of rateLimitMap.entries()) {
    if (now > val.resetAt) rateLimitMap.delete(key)
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Rate limit AI endpoints ──────────────────────────────────────
  if (pathname.startsWith('/api/ai')) {
    maybeCleanup()
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      '127.0.0.1'

    if (isRateLimited(ip, 10, 60_000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before trying again.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
  }

  // ── Protect admin API routes (skip login endpoint itself) ────────
  if (pathname.startsWith('/api/admin') && pathname !== '/api/admin/login') {
    const adminKey = request.headers.get('x-admin-key')
    const validKey = process.env.ADMIN_PASSWORD   // same key stored in localStorage

    if (!validKey || adminKey !== validKey) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/ai/:path*', '/api/admin/:path*'],
}
