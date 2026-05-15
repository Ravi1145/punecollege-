import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

function auth(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD
}

/** GET — list all news items (incl. unapproved) for admin */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { data, error } = await supabaseAdmin
      .from("news_cache")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(100)

    if (error) throw error
    return NextResponse.json({ items: data ?? [] })
  } catch {
    return NextResponse.json({ items: [] })
  }
}

/** POST — manually add a news article */
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const body = await req.json()
    const { title, url, source, category, summary, published_at } = body
    if (!title || !url) return NextResponse.json({ error: "title and url required" }, { status: 400 })

    const { error } = await supabaseAdmin.from("news_cache").insert({
      title,
      url,
      source:       source ?? "Manual",
      category:     category ?? "general",
      summary:      summary ?? null,
      published_at: published_at ?? new Date().toISOString(),
      approved:     true,
    })
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Admin news POST error:", err)
    return NextResponse.json({ error: "Insert failed" }, { status: 500 })
  }
}

/** PATCH — approve or reject a news item */
export async function PATCH(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { id, approved } = await req.json()
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 })

    const { error } = await supabaseAdmin
      .from("news_cache")
      .update({ approved })
      .eq("id", id)

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Admin news PATCH error:", err)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
