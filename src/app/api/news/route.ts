import { NextRequest, NextResponse } from "next/server"
import { blogs as staticBlogs } from "@/data/blogs"

export const revalidate = 3600 // ISR — revalidate every hour

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export interface NewsItem {
  id:           string
  title:        string
  url:          string
  source:       string
  category:     string
  published_at: string
  summary:      string | null
}

/** Static fallback — convert blog posts to news items */
function blogsAsNews(limit: number): NewsItem[] {
  return staticBlogs.slice(0, limit).map((b) => ({
    id:           b.slug,
    title:        b.title,
    url:          `/blog/${b.slug}`,
    source:       "CollegePune Blog",
    category:     b.category ?? "general",
    published_at: b.publishedAt ?? new Date().toISOString(),
    summary:      b.excerpt ?? null,
  }))
}

// GET /api/news
// TODO: Connect to Express API — endpoint: GET /api/news
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit    = Math.min(parseInt(searchParams.get("limit") ?? "10"), 50)
  const category = searchParams.get("category") ?? undefined

  try {
    const qs = new URLSearchParams({ limit: String(limit) })
    if (category) qs.set("category", category)

    const res = await fetch(`${API_BASE_URL}/api/news?${qs.toString()}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) throw new Error("Express API unavailable")
    const data = await res.json()
    return NextResponse.json({ items: data.items ?? [], source: "api" })
  } catch {
    // Fall back to static blogs as news items
    const fallback = blogsAsNews(limit)
    return NextResponse.json({ items: fallback, source: "static" })
  }
}
