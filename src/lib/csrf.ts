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
  // Allow it so internal tooling and server-side integrations still work.
  if (!origin) return true

  const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "https://collegepune.com").replace(/\/$/, "")

  // Allow the production domain and localhost variants for dev
  const allowed = [
    base,
    "http://localhost:3000",
    "http://localhost:4321",
  ]

  return allowed.some((a) => origin === a || origin.startsWith(a))
}
