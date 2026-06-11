/**
 * POST /api/revalidate
 *
 * On-demand ISR cache busting. Requires Authorization header.
 * Secret must NOT be sent as a URL query param (logged by CDNs/Vercel).
 *
 * Usage:
 *   curl -X POST https://collegepune.com/api/revalidate \
 *     -H "Authorization: Bearer <REVALIDATE_SECRET>" \
 *     -H "Content-Type: application/json" \
 *     -d '{"path":"/blog/some-slug"}'
 *
 * Special path values:
 *   "all"  — busts all known listing pages
 */
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { timingSafeEqual, createHash } from 'crypto'

const LISTING_PATHS = [
  '/blog', '/colleges', '/engineering-colleges-pune', '/mba-colleges-pune',
  '/medical-colleges-pune', '/arts-colleges-pune', '/bca-colleges-pune',
  '/pharmacy-colleges-pune', '/law-colleges-pune', '/design-colleges-pune',
  '/government-colleges-pune', '/top-10-engineering-colleges-in-pune',
  '/top-10-mba-colleges-in-pune',
]

// Allowed path prefixes — prevents revalidating arbitrary strings
const ALLOWED_PREFIXES = [
  '/blog/', '/colleges/', '/courses/', '/exams/', '/career-paths/', '/cutoffs/',
  '/blog', '/colleges', '/exams', '/courses', '/news', '/qa',
]

function isSafeEqual(a: string, b: string): boolean {
  try {
    const ha = createHash('sha256').update(a).digest()
    const hb = createHash('sha256').update(b).digest()
    return timingSafeEqual(ha, hb)
  } catch {
    return false
  }
}

function isAllowedPath(path: string): boolean {
  if (path === 'all') return true
  return ALLOWED_PREFIXES.some(p => path === p || path.startsWith(p))
}

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  const secret = process.env.REVALIDATE_SECRET ?? process.env.ADMIN_PASSWORD ?? ''

  if (!token || !isSafeEqual(token, secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let path: string | null = null
  try {
    const body = await req.json()
    path = body?.path ?? null
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!path) {
    return NextResponse.json({ error: 'path is required in request body' }, { status: 400 })
  }

  if (!isAllowedPath(path)) {
    return NextResponse.json({ error: 'Path not in allowed revalidation list' }, { status: 400 })
  }

  const revalidated: string[] = []

  if (path === 'all') {
    LISTING_PATHS.forEach((p) => { revalidatePath(p); revalidated.push(p) })
  } else {
    revalidatePath(path)
    revalidated.push(path)
  }

  return NextResponse.json({
    revalidated,
    timestamp: new Date().toISOString(),
    message: `${revalidated.length} path(s) revalidated`,
  })
}

// Keep backward-compat GET for existing webhooks — but warn it's deprecated
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret') ?? ''
  const path   = searchParams.get('path')
  const envSecret = process.env.REVALIDATE_SECRET ?? process.env.ADMIN_PASSWORD ?? ''

  if (!secret || !isSafeEqual(secret, envSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (!path || !isAllowedPath(path)) {
    return NextResponse.json({ error: 'Invalid or missing path' }, { status: 400 })
  }

  const revalidated: string[] = []
  if (path === 'all') {
    LISTING_PATHS.forEach((p) => { revalidatePath(p); revalidated.push(p) })
  } else {
    revalidatePath(path)
    revalidated.push(path)
  }

  return NextResponse.json({ revalidated, deprecated: 'Use POST with Authorization header instead' })
}
