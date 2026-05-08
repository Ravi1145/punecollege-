import { NextRequest, NextResponse } from "next/server"

// Pass all requests through — no custom middleware logic needed.
// Using proxy.ts (Next.js 16+ convention) instead of deprecated middleware.ts.
export function proxy(req: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
