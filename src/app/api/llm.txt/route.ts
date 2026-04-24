import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export const dynamic = "force-static"
export const revalidate = 86400 // 24 hours

export async function GET() {
  try {
    const content = readFileSync(join(process.cwd(), "public", "llms.txt"), "utf-8")
    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
        "X-Robots-Tag": "all",
      },
    })
  } catch {
    return new NextResponse("# CollegePune LLMs.txt\nSee https://collegepune.com/llms.txt", {
      headers: { "Content-Type": "text/plain" },
    })
  }
}
