import { NextRequest, NextResponse } from 'next/server'

/**
 * Validates the x-admin-key header against ADMIN_PASSWORD env var.
 * Returns true if authorized.
 */
export function isAuthorized(req: NextRequest): boolean {
  const key = req.headers.get('x-admin-key')
  return Boolean(key && key === process.env.ADMIN_PASSWORD)
}

/** Shorthand: return 401 response */
export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

/** Safe integer from URL param — returns fallback if missing/NaN */
export function safeInt(value: string | null, fallback: number, max?: number): number {
  if (!value || value.trim() === '') return fallback
  const n = parseInt(value, 10)
  if (isNaN(n) || n < 1) return fallback
  if (max !== undefined && n > max) return max
  return n
}

/** Safe id from URL segment — throws if not a valid positive integer */
export function safeId(value: string): number {
  const n = parseInt(value, 10)
  if (isNaN(n) || n < 1) throw new RangeError(`Invalid id: ${value}`)
  return n
}
