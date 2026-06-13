import { NextRequest } from "next/server"

/**
 * CSRF protection: verify the Origin header matches the site's own origin.
 * Blocks cross-site POST requests that carry cookies/credentials.
 *
 * Returns true when the request is safe to process.
 * Returns false when the origin is unrecognised and the request should be rejected.
 */
export function isAllowedOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin")

  // No Origin header — direct server-to-server call (cURL, Postman, server action).
  if (!origin) return true

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://collegepune.com").replace(/\/$/, "")

  // Derive www / non-www sibling automatically
  let sibling = ""
  if (base.includes("://www.")) {
    sibling = base.replace("://www.", "://")
  } else {
    sibling = base.replace("://", "://www.")
  }

  // Allow any localhost port for local development
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true

  const allowed = [base, sibling]

  return allowed.some((a) => origin === a || origin.startsWith(a))
}
