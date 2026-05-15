import Link from "next/link"

interface Testimonial {
  id: number
  name: string
  college: string
  course: string
  year: string
  rating: number
  text: string
  initials: string
  color: string
}

// Static testimonials — replace with Supabase fetch once testimonials table is seeded
const staticTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Rohan Deshmukh",
    college: "COEP Pune",
    course: "B.Tech Computer Engineering",
    year: "2024",
    rating: 5,
    text: "CollegePune helped me find COEP's exact MHT-CET cutoff category-wise. The counsellor called within 2 hours and explained the entire CAP process. Got into COEP CSE with 99.2 percentile!",
    initials: "RD",
    color: "bg-blue-600",
  },
  {
    id: 2,
    name: "Priya Kulkarni",
    college: "SIBM Pune",
    course: "MBA Marketing",
    year: "2024",
    rating: 5,
    text: "I was confused between SIBM and SCMHRD. The comparison tool on CollegePune showed me fees, placement, SNAP cutoffs side-by-side. Enrolled in SIBM — best decision ever. Placed at ₹26 LPA.",
    initials: "PK",
    color: "bg-orange-500",
  },
  {
    id: 3,
    name: "Aditya Sharma",
    college: "PICT Pune",
    course: "B.Tech IT",
    year: "2025",
    rating: 5,
    text: "The AI college finder matched me to PICT when I entered my 95.7 percentile. The free counselling session cleared all my doubts about PICT vs VIT Pune. Placed at Persistent Systems in 3rd year!",
    initials: "AS",
    color: "bg-green-600",
  },
  {
    id: 4,
    name: "Sneha Patil",
    college: "AFMC Pune",
    course: "MBBS",
    year: "2023",
    rating: 5,
    text: "AFMC cutoffs are hard to find anywhere. CollegePune had NEET category-wise cutoffs going back to 2020. The team also helped me prepare my AFMC entrance test application. Forever grateful!",
    initials: "SP",
    color: "bg-red-600",
  },
  {
    id: 5,
    name: "Karan Mehta",
    college: "VIT Pune",
    course: "B.Tech Mechanical",
    year: "2024",
    rating: 4,
    text: "Was worried about hostel availability. CollegePune showed VIT Pune hostel fees, capacity, and application process clearly. The WhatsApp alert for admission deadline saved me from missing the cutoff date.",
    initials: "KM",
    color: "bg-purple-600",
  },
  {
    id: 6,
    name: "Ananya Joshi",
    college: "MIT-WPU Pune",
    course: "MBA Finance",
    year: "2025",
    rating: 5,
    text: "Got a scholarship of ₹2L through the MahaDBT guide on CollegePune. The step-by-step application walkthrough was incredibly helpful. The team is super responsive on WhatsApp too!",
    initials: "AJ",
    color: "bg-teal-600",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-3">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">Student Stories</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Real Students. Real Results.
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-lg">
              Join 50,000+ students who found their college with CollegePune — free, fast, and personalised.
            </p>
          </div>
          {/* Aggregate rating */}
          <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-100 rounded-2xl px-5 py-3 flex-shrink-0">
            <div>
              <p className="text-3xl font-extrabold text-gray-900 leading-none">4.9</p>
              <StarRating rating={5} />
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-semibold">Excellent</p>
              <p className="text-gray-400 text-xs">Based on 2,400+ reviews</p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staticTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              {/* Stars */}
              <StarRating rating={t.rating} />

              {/* Quote */}
              <p className="text-sm text-gray-700 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.course} · {t.college} &rsquo;{t.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/counselling"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm"
          >
            Get Free Counselling Like Them →
          </Link>
          <p className="text-xs text-gray-400 mt-3">247 students counselled this week · 100% free</p>
        </div>
      </div>
    </section>
  )
}
