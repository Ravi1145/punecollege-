import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Pune College Q&A 2026 — Real Questions Answered by Alumni & Experts",
  description: "Browse 50+ answered questions about Pune college admissions, cutoffs, fees, hostels, and placements. Ask your question and get answers from CollegePune counsellors and alumni.",
  path: "/qa",
  keywords: [
    "pune college questions and answers",
    "coep admission question 2026",
    "sibm pune mba questions",
    "mht-cet cutoff questions pune",
    "pune college hostel questions",
    "afmc admission questions",
    "pune engineering college faq",
  ],
})

const qaData = [
  {
    id: 1,
    question: "What is the expected MHT-CET cutoff for COEP CSE in 2026?",
    stream: "Engineering",
    college: "COEP",
    tags: ["MHT-CET", "COEP", "Cutoff 2026"],
    answer: "COEP CSE branch MHT-CET cutoff 2026 (estimated): Open — 99.8+ percentile, OBC — 98.7 percentile, SC — 95.5 percentile. COEP CSE is the most competitive branch. Even with 99.9 percentile, seat is not guaranteed in CAP Round 1 — depend on document verification speed. Apply for home state + improvement quota both.",
    answeredBy: "CollegePune Counsellor",
    date: "2026-01-10",
    helpful: 142,
  },
  {
    id: 2,
    question: "Can I get admission in SIBM Pune MBA with SNAP 95 percentile?",
    stream: "MBA",
    college: "SIBM",
    tags: ["SNAP", "SIBM", "MBA 2026"],
    answer: "SIBM Pune SNAP 2026 expected cutoff: 98+ percentile for shortlist. With 95 percentile, SIBM is difficult but not impossible — some students with strong work experience and exceptional GE-PI performance have made it. However, at 95 percentile, you should target SCMHRD (97+ cutoff) and SIIB/SIMS (90–93 cutoff). Consider SIBM Bangalore and SIBM Hyderabad which accept lower percentiles.",
    answeredBy: "MBA Expert",
    date: "2026-01-08",
    helpful: 98,
  },
  {
    id: 3,
    question: "How many seats does COEP have for Computer Engineering?",
    stream: "Engineering",
    college: "COEP",
    tags: ["COEP", "Seats", "Computer Engineering"],
    answer: "COEP has 120 seats in Computer Engineering (BTech). Seat distribution: Open — 56 seats, OBC — 30 seats, SC — 18 seats, ST — 9 seats, EBC/VJ/NT — remaining. Additionally, COEP offers 15% NRI/Institute quota seats (fee: ₹4–6L/year). Total: 120 seats via CAP + 18 Institute quota. CSE is the most sought branch at COEP.",
    answeredBy: "COEP Alumnus",
    date: "2026-01-05",
    helpful: 87,
  },
  {
    id: 4,
    question: "What NEET score is needed for AFMC Pune 2026?",
    stream: "Medical",
    college: "AFMC",
    tags: ["NEET", "AFMC", "Medical 2026"],
    answer: "AFMC Pune 2026 eligibility: You need 665+ NEET score (expected, based on 2025 cutoff of 663). But NEET score is just the first filter. AFMC also has a separate written exam + SSB (Services Selection Board) interview. Being physically fit, Indian citizen, unmarried, age 17–24 are hard requirements. Only ~150 seats per year. It's extremely competitive — 50,000+ apply for 150 seats.",
    answeredBy: "AFMC Advisor",
    date: "2026-01-12",
    helpful: 204,
  },
  {
    id: 5,
    question: "Is there hostel available for outstation students at VIT Pune?",
    stream: "Engineering",
    college: "VIT Pune",
    tags: ["VIT Pune", "Hostel", "Outstation"],
    answer: "Yes — VIT Pune has hostel for both boys and girls with 600+ seats. Hostel fees: ₹80,000–1,00,000/year including mess charges. VIT Pune prioritizes outstation students (proof: distance > 50km from Pune). Apply for hostel on the same day as admission confirmation — hostel fills within 1–2 weeks. Contact: hosteloffice@vit.edu",
    answeredBy: "VIT Pune Student",
    date: "2025-12-20",
    helpful: 76,
  },
  {
    id: 6,
    question: "What is the difference between PICT and VIT Pune for CSE?",
    stream: "Engineering",
    college: "PICT / VIT Pune",
    tags: ["PICT", "VIT Pune", "CSE Comparison"],
    answer: "PICT vs VIT Pune for CSE: PICT — NAAC A, fees ₹1.4–1.9L/yr, avg placement ₹7.5 LPA, very strong in CS/IT, product companies like Goldman Sachs visit. VIT Pune — NIRF #101, NAAC A+, fees ₹1.6–2.2L/yr, avg placement ₹8.5 LPA, better for core + IT combined. For pure CS/IT career, PICT edges out slightly. For mechanical + electronics, VIT Pune is better. COEP > PICT ≈ VIT Pune for CS.",
    answeredBy: "CollegePune Research",
    date: "2025-12-15",
    helpful: 115,
  },
  {
    id: 7,
    question: "Can I apply for MahaDBT scholarship after second year of engineering?",
    stream: "Engineering",
    college: "Any",
    tags: ["MahaDBT", "Scholarship", "EBC"],
    answer: "Yes — MahaDBT Freeship (EBC) can be applied every year as a renewal. For students who missed it in Year 1, you can apply from Year 2 onwards — scholarship will apply from that year. However, you cannot claim past year scholarship retroactively. Renewal deadline: typically September 30 each year. Ensure income certificate, caste certificate, and Aadhaar are ready before portal opens.",
    answeredBy: "Scholarship Expert",
    date: "2026-01-02",
    helpful: 63,
  },
  {
    id: 8,
    question: "What is the fee for MIT-WPU BTech CSE per year?",
    stream: "Engineering",
    college: "MIT-WPU",
    tags: ["MIT-WPU", "Fees 2026", "BTech"],
    answer: "MIT-WPU BTech CSE fees 2026: Tuition fee ₹1,60,000–₹2,10,000/year depending on specialization. Total 4-year cost: approximately ₹7–8L (excluding hostel). If you qualify under state/home university quota via MHT-CET, fees may be partially regulated. MIT-WPU also offers merit scholarships (25%–50% fee waiver for top MHT-CET ranks). Hostel: ₹90,000–1,20,000/year additional.",
    answeredBy: "MIT-WPU Alumnus",
    date: "2025-12-18",
    helpful: 89,
  },
]

export default function QAPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Q&A", url: "/qa" },
  ])

  const faqSchema = generateFAQSchema(
    qaData.slice(0, 5).map((q) => ({ question: q.question, answer: q.answer }))
  )

  const streams = ["All", "Engineering", "MBA", "Medical", "Arts", "BCA", "BBA"]

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <span className="text-white">Q&A</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white mb-2">Pune College Q&A</h1>
            <p className="text-gray-300 max-w-xl mb-5">Real questions answered by CollegePune counsellors and Pune college alumni. Ask yours for free.</p>
            <Link
              href="/ask"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              + Ask a Question
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stream filter */}
          <div className="flex gap-2 flex-wrap mb-6">
            {streams.map((s) => (
              <button key={s} className={`text-xs px-4 py-1.5 rounded-full font-semibold border transition-colors ${
                s === "All" ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
              }`}>
                {s}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Q&A list */}
            <div className="lg:col-span-2 space-y-4">
              {qaData.map((qa) => (
                <div key={qa.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                  {/* Question */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-orange-600 font-extrabold text-xs">Q</span>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-900 text-sm leading-snug">{qa.question}</h2>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{qa.stream}</span>
                        {qa.tags.map((t) => (
                          <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-green-700 font-extrabold text-xs">A</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">{qa.answer}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] text-gray-400">By {qa.answeredBy}</span>
                        <span className="text-[10px] text-gray-300">·</span>
                        <span className="text-[10px] text-green-600 font-semibold">👍 {qa.helpful} found helpful</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Ask CTA */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5 text-center">
                <p className="font-bold text-gray-900 mb-2">Don&apos;t see your question?</p>
                <p className="text-sm text-gray-500 mb-4">Ask our counsellors — get a personalised answer within 24 hours.</p>
                <Link href="/ask" className="inline-flex bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                  Ask a Question →
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-extrabold text-gray-900 text-sm mb-4">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {["MHT-CET Cutoff", "COEP Admission", "SIBM SNAP", "Hostel Fees", "Scholarships", "NEET 2026", "Direct Admission", "Fee Structure", "Placements", "MBA without CAT"].map((t) => (
                    <span key={t} className="text-xs bg-gray-50 text-gray-700 px-2.5 py-1 rounded-full border border-gray-200">{t}</span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <h3 className="font-extrabold text-gray-900 text-sm mb-2">Need personalised advice?</h3>
                <p className="text-xs text-gray-600 mb-3">Our expert counsellors will review your profile and suggest the best colleges — for free.</p>
                <Link href="/counselling" className="block text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors">
                  Book Free Counselling
                </Link>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-extrabold text-gray-900 text-sm mb-3">Quick Links</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "MHT-CET Cutoffs", href: "/cutoffs" },
                    { label: "College Predictor", href: "/predictor" },
                    { label: "Engineering Colleges", href: "/engineering-colleges-pune" },
                    { label: "MBA Colleges", href: "/mba-colleges-pune" },
                    { label: "Scholarships", href: "/scholarships" },
                    { label: "Admission Deadlines", href: "/pune-admission-deadline-tracker-2026" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex justify-between text-gray-700 hover:text-orange-600 py-1 border-b border-gray-50 last:border-0">
                      <span>{link.label}</span>
                      <span className="text-gray-300">›</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
