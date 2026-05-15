/**
 * GET /api/revalidate?secret=<ADMIN_PASSWORD>&path=/blog/some-slug
 *
 * On-demand ISR cache busting. Call this from CI/CD, Supabase webhooks,
 * or any external tool to force a specific page to re-render from the DB.
 *
 * Examples:
 *   /api/revalidate?secret=xxx&path=/blog
 *   /api/revalidate?secret=xxx&path=/colleges/coep-college-of-engineering-pune
 *   /api/revalidate?secret=xxx&path=all   (busts all known listing pages)
 */
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

const LISTING_PATHS = [
  '/blog',
  '/colleges',
  '/engineering-colleges-pune',
  '/mba-colleges-pune',
  '/medical-colleges-pune',
  '/arts-colleges-pune',
  '/bca-colleges-pune',
  '/pharmacy-colleges-pune',
  '/law-colleges-pune',
  '/design-colleges-pune',
  '/government-colleges-pune',
  '/top-10-engineering-colleges-in-pune',
  '/top-10-mba-colleges-in-pune',
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const path   = searchParams.get('path')

  if (!secret || secret !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  if (!path) {
    return NextResponse.json({ error: 'path parameter is required' }, { status: 400 })
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
    message: `${revalidated.length} path(s) revalidated successfully`,
  })
}
