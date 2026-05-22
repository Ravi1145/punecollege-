import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

// GET /api/reviews?college_slug=coep-college-of-engineering-pune
// TODO: Connect to Express API — endpoint: GET /api/reviews?college_slug=:slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("college_slug")
  if (!slug) return NextResponse.json({ error: "college_slug required" }, { status: 400 })

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/reviews?college_slug=${encodeURIComponent(slug)}`,
      { next: { revalidate: 300 } }
    )
    if (!res.ok) return NextResponse.json({ reviews: [], total: 0, avg: 0 })
    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ reviews: [], total: 0, avg: 0 })
  }
}

// POST /api/reviews
// TODO: Connect to Express API — endpoint: POST /api/reviews
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { college_slug, student_name, rating, review_body } = body

  // Basic validation
  if (!college_slug || !student_name || !rating || !review_body) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1–5" }, { status: 400 })
  }
  if (student_name.length < 2 || review_body.length < 30) {
    return NextResponse.json({ error: "Name too short or review too brief" }, { status: 400 })
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    const json = await res.json()
    if (!res.ok) return NextResponse.json({ error: json.error ?? "Failed to submit review" }, { status: 500 })
    return NextResponse.json({ success: true, message: "Review submitted! It will appear after moderation (1–2 days)." })
  } catch {
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}
