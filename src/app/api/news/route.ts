import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { blogs as staticBlogs } from "@/data/blogs"

export const revalidate = 3600 // ISR — revalidate every hour

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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit    = Math.min(parseInt(searchParams.get("limit") ?? "10"), 50)
  const category = searchParams.get("category") ?? undefined
  const approved = searchParams.get("approved") !== "false" // default true

  try {
    let query = supabaseAdmin
      .from("news_cache")
      .select("id, title, url, source, category, published_at, summary")
      .order("published_at", { ascending: false })
      .limit(limit)

    if (approved) query = query.eq("approved", true)
    if (category) query = query.eq("category", category)

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      // Fall back to blogs-as-news
      const fallback = blogsAsNews(limit)
      return NextResponse.json({ items: fallback, source: "static" })
    }

    return NextResponse.json({ items: data as NewsItem[], source: "db" })
  } catch {
    const fallback = blogsAsNews(limit)
    return NextResponse.json({ items: fallback, source: "static" })
  }
}
