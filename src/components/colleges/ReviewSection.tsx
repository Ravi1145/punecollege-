"use client"
import { useState, useEffect, useCallback } from "react"
import Script from "next/script"
import { Star, ThumbsUp, ThumbsDown, PenLine, ChevronDown, ChevronUp, Loader2, CheckCircle } from "lucide-react"

interface Review {
  id: string
  student_name: string
  course: string
  year: string
  rating: number
  title: string
  body: string
  pros: string[]
  cons: string[]
  created_at: string
}

interface ReviewSectionProps {
  collegeSlug: string
  collegeName: string
  /** Static reviews from colleges.ts (always shown even before DB loads) */
  staticReviews?: {
    id: number
    studentName: string
    course: string
    year: string
    rating: number
    title: string
    body: string
    pros: string[]
    cons: string[]
  }[]
  staticRating?: number
}

function StarRating({ value, onChange, size = "md" }: { value: number; onChange?: (v: number) => void; size?: "sm" | "md" }) {
  const [hover, setHover] = useState(0)
  const sz = size === "sm" ? "w-4 h-4" : "w-6 h-6"
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange?.(n)}
          onMouseEnter={() => onChange && setHover(n)}
          onMouseLeave={() => onChange && setHover(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            className={`${sz} transition-colors ${n <= (hover || value) ? "fill-orange-400 stroke-orange-400" : "stroke-gray-300 fill-transparent"}`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false)
  const isLong = review.body.length > 200

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {review.student_name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{review.student_name}</p>
            <p className="text-xs text-gray-500">{review.course}{review.year ? ` · ${review.year}` : ""}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating value={review.rating} size="sm" />
          <span className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
        </div>
      </div>

      {/* Title */}
      {review.title && <p className="font-semibold text-gray-800 text-sm mb-2">&ldquo;{review.title}&rdquo;</p>}

      {/* Body */}
      <p className="text-sm text-gray-600 leading-relaxed mb-3">
        {isLong && !expanded ? review.body.slice(0, 200) + "…" : review.body}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-orange-600 font-medium flex items-center gap-1 mb-3"
        >
          {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Read more</>}
        </button>
      )}

      {/* Pros & Cons */}
      {(review.pros?.length > 0 || review.cons?.length > 0) && (
        <div className="grid grid-cols-2 gap-3">
          {review.pros?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-green-700 flex items-center gap-1 mb-1.5">
                <ThumbsUp className="w-3 h-3" /> Pros
              </p>
              <ul className="space-y-1">
                {review.pros.map(p => (
                  <li key={p} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-green-500 mt-0.5">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {review.cons?.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-red-700 flex items-center gap-1 mb-1.5">
                <ThumbsDown className="w-3 h-3" /> Cons
              </p>
              <ul className="space-y-1">
                {review.cons.map(c => (
                  <li key={c} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-red-400 mt-0.5">✗</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function SubmitForm({ collegeSlug, collegeName, onSuccess }: { collegeSlug: string; collegeName: string; onSuccess: () => void }) {
  const [rating, setRating] = useState(0)
  const [form, setForm] = useState({ student_name: "", course: "", year: "", title: "", review_body: "", pros: "", cons: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.student_name.trim()) e.student_name = "Name is required"
    if (!rating) e.rating = "Please select a star rating"
    if (!form.review_body.trim() || form.review_body.trim().length < 30) e.review_body = "Review must be at least 30 characters"
    return e
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setErrors({})
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          college_slug: collegeSlug,
          college_name: collegeName,
          ...form,
          rating,
          pros: form.pros.split("\n").map(s => s.trim()).filter(Boolean),
          cons: form.cons.split("\n").map(s => s.trim()).filter(Boolean),
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setDone(true)
      setTimeout(onSuccess, 2000)
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
        <p className="font-bold text-gray-900 text-lg mb-1">Review Submitted! 🎉</p>
        <p className="text-sm text-gray-500">Your review will appear after moderation (1–2 days). Thank you!</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name *</label>
          <input
            value={form.student_name}
            onChange={e => set("student_name", e.target.value)}
            placeholder="e.g. Rahul Deshmukh"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.student_name && <p className="text-xs text-red-500 mt-1">{errors.student_name}</p>}
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Course</label>
          <input
            value={form.course}
            onChange={e => set("course", e.target.value)}
            placeholder="e.g. B.Tech Computer Engg"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Passout Year</label>
          <select
            value={form.year}
            onChange={e => set("year", e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select year</option>
            {["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019"].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
            <option value="Current Student">Current Student</option>
          </select>
        </div>
      </div>

      {/* Star rating */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Overall Rating *</label>
        <StarRating value={rating} onChange={setRating} />
        {errors.rating && <p className="text-xs text-red-500 mt-1">{errors.rating}</p>}
      </div>

      {/* Review title */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Review Title</label>
        <input
          value={form.title}
          onChange={e => set("title", e.target.value)}
          placeholder="e.g. Best decision of my life!"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          maxLength={120}
        />
      </div>

      {/* Review body */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Your Review * <span className="text-gray-400 font-normal">(min. 30 characters)</span></label>
        <textarea
          value={form.review_body}
          onChange={e => set("review_body", e.target.value)}
          rows={4}
          placeholder="Share your experience — campus, faculty, placements, hostel, canteen, culture..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
        />
        {errors.review_body && <p className="text-xs text-red-500 mt-1">{errors.review_body}</p>}
      </div>

      {/* Pros / Cons */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-green-700 mb-1">✓ Pros (one per line)</label>
          <textarea
            value={form.pros}
            onChange={e => set("pros", e.target.value)}
            rows={3}
            placeholder={"Great faculty\nStrong placements\nAffordable fees"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-red-700 mb-1">✗ Cons (one per line)</label>
          <textarea
            value={form.cons}
            onChange={e => set("cons", e.target.value)}
            rows={3}
            placeholder={"Traffic near campus\nLimited hostel seats"}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
          />
        </div>
      </div>

      {errors.submit && <p className="text-sm text-red-500">{errors.submit}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 font-bold text-white py-3 rounded-xl text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}
      >
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</> : "Submit Review"}
      </button>
      <p className="text-xs text-gray-400 text-center">All reviews are moderated within 1–2 days before appearing publicly.</p>
    </form>
  )
}

export default function ReviewSection({ collegeSlug, collegeName, staticReviews = [], staticRating }: ReviewSectionProps) {
  const [dbReviews, setDbReviews] = useState<Review[]>([])
  const [dbAvg, setDbAvg] = useState(0)
  const [dbTotal, setDbTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?college_slug=${encodeURIComponent(collegeSlug)}`)
      const data = await res.json()
      setDbReviews(data.reviews ?? [])
      setDbAvg(data.avg ?? 0)
      setDbTotal(data.total ?? 0)
    } catch { /* silently fail — static reviews still shown */ }
    finally { setLoading(false) }
  }, [collegeSlug])

  useEffect(() => { fetchReviews() }, [fetchReviews])

  // Merge static + DB reviews, DB first
  const allReviews: Review[] = [
    ...dbReviews,
    ...staticReviews.map(r => ({
      id: String(r.id),
      student_name: r.studentName,
      course: r.course,
      year: r.year,
      rating: r.rating,
      title: r.title,
      body: r.body,
      pros: r.pros,
      cons: r.cons,
      created_at: new Date().toISOString(),
    })),
  ]

  const totalCount = dbTotal + staticReviews.length
  const avgRating = dbAvg || staticRating || (
    allReviews.length
      ? Math.round((allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length) * 10) / 10
      : 0
  )

  // AggregateRating JSON-LD for rich snippets
  const aggregateRatingSchema = totalCount > 0 ? {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": collegeName,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": avgRating.toFixed(1),
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": totalCount,
      "reviewCount": totalCount,
    },
    "review": allReviews.slice(0, 5).map(r => ({
      "@type": "Review",
      "author": { "@type": "Person", "name": r.student_name },
      "reviewRating": { "@type": "Rating", "ratingValue": r.rating, "bestRating": "5" },
      "reviewBody": r.body,
      "name": r.title,
    })),
  } : null

  const ratingBars = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: allReviews.filter(r => r.rating === star).length,
    pct: allReviews.length ? Math.round((allReviews.filter(r => r.rating === star).length / allReviews.length) * 100) : 0,
  }))

  return (
    <>
      {aggregateRatingSchema && (
        <Script
          id={`schema-aggregate-rating-${collegeSlug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
        />
      )}

      <div className="space-y-6">
        {/* Rating summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Big number */}
            <div className="text-center shrink-0">
              <div className="text-5xl font-extrabold text-gray-900">{avgRating > 0 ? avgRating.toFixed(1) : "–"}</div>
              <StarRating value={Math.round(avgRating)} size="sm" />
              <p className="text-xs text-gray-400 mt-1">{totalCount} review{totalCount !== 1 ? "s" : ""}</p>
            </div>

            {/* Bar chart */}
            {allReviews.length > 0 && (
              <div className="flex-1 space-y-1.5 w-full">
                {ratingBars.map(({ star, count, pct }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="w-6 text-right text-gray-500">{star}★</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}
                      />
                    </div>
                    <span className="w-8 text-gray-500">{count}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Write review CTA */}
            <div className="shrink-0">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 font-semibold text-white px-5 py-2.5 rounded-xl text-sm transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}
              >
                <PenLine className="w-4 h-4" />
                Write a Review
              </button>
            </div>
          </div>
        </div>

        {/* Submit form (toggle) */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-orange-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
              <PenLine className="w-4 h-4 text-orange-500" />
              Share Your Experience — {collegeName}
            </h3>
            <SubmitForm
              collegeSlug={collegeSlug}
              collegeName={collegeName}
              onSuccess={() => { setShowForm(false); fetchReviews() }}
            />
          </div>
        )}

        {/* Reviews list */}
        {loading ? (
          <div className="flex items-center justify-center py-8 gap-2 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading reviews…</span>
          </div>
        ) : allReviews.length > 0 ? (
          <div className="space-y-4">
            {allReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="font-semibold text-gray-700 mb-1">Be the first to review {collegeName}!</p>
            <p className="text-sm text-gray-400 mb-4">Your experience helps thousands of students choose the right college.</p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 font-semibold text-white px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 70%, #FFD000))" }}
            >
              <PenLine className="w-4 h-4" /> Write a Review
            </button>
          </div>
        )}
      </div>
    </>
  )
}
