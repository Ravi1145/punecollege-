import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/reviews?college_slug=coep-college-of-engineering-pune
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("college_slug")
  if (!slug) return NextResponse.json({ error: "college_slug required" }, { status: 400 })

  const { data, error } = await supabase
    .from("college_reviews")
    .select("id, student_name, course, year, rating, title, body, pros, cons, created_at")
    .eq("college_slug", slug)
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) return NextResponse.json({ reviews: [], total: 0, avg: 0 })

  const reviews = data ?? []
  const avg = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0

  return NextResponse.json({ reviews, total: reviews.length, avg })
}

// POST /api/reviews
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { college_slug, college_name, student_name, course, year, rating, title, review_body, pros, cons } = body

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

  const { error } = await supabase.from("college_reviews").insert({
    college_slug,
    college_name,
    student_name: student_name.trim(),
    course: course?.trim() ?? "",
    year: year?.trim() ?? "",
    rating: Number(rating),
    title: title?.trim() ?? "",
    body: review_body.trim(),
    pros: pros ?? [],
    cons: cons ?? [],
    status: "pending",   // all reviews start as pending — admin approves
  })

  if (error) {
    console.error("[reviews POST]", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }

  return NextResponse.json({ success: true, message: "Review submitted! It will appear after moderation (1–2 days)." })
}
