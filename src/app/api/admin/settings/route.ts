import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

function auth(req: NextRequest) {
  return req.headers.get("x-admin-key") === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { data, error } = await supabaseAdmin
      .from("site_settings")
      .select("key, value")

    if (error) throw error
    return NextResponse.json({ settings: data ?? [] })
  } catch {
    // Table may not exist yet — return empty
    return NextResponse.json({ settings: [] })
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  try {
    const { settings } = await req.json() as { settings: { key: string; value: string }[] }
    if (!Array.isArray(settings)) {
      return NextResponse.json({ error: "settings must be an array" }, { status: 400 })
    }

    // Upsert all settings
    const { error } = await supabaseAdmin
      .from("site_settings")
      .upsert(
        settings.map(({ key, value }) => ({ key, value, updated_at: new Date().toISOString() })),
        { onConflict: "key" }
      )

    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Settings save error:", err)
    return NextResponse.json({ error: "Save failed" }, { status: 500 })
  }
}
