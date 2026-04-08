import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import HeroSection from "@/components/home/HeroSection"
import StatsCounter from "@/components/home/StatsCounter"
import FeaturedColleges from "@/components/home/FeaturedColleges"
import RankingTables from "@/components/home/RankingTables"
import AIRecommender from "@/components/ai/AIRecommender"
import ExamCalendar from "@/components/home/ExamCalendar"
import FAQSection from "@/components/home/FAQSection"
import BlogPreview from "@/components/home/BlogPreview"
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Pune 2026 | Rankings, Fees & Placements | CollegePune",
  description: "Find the best engineering, MBA, medical and arts colleges in Pune 2026. Compare COEP (NIRF #49), SIBM (NIRF #13), AFMC (NIRF #4) and 25+ colleges by fees (₹15K–25L/yr), placements (₹12–65 LPA), NAAC grade & reviews. Free AI counselor.",
  path: "/",
  keywords: [
    "best college in pune",
    "best college in pune 2026",
    "best engineering college in pune",
    "best btech college in pune 2026",
    "best mba college in pune 2026",
    "top engineering colleges pune 2026",
    "engineering colleges in pune",
    "colleges in pune with fees 2026",
    "pune university colleges list 2026",
    "best medical college pune",
    "coep pune admission 2026",
    "sibm pune 2026",
    "mht-cet colleges pune",
    "government engineering college pune",
  ],
})

const faqData = [
  { question: "Which is the best BTech college in Pune in 2026?", answer: "COEP (College of Engineering Pune) is the best B.Tech college in Pune in 2026 — NIRF Rank 49, NAAC A+, fees ₹80K–1.8L/yr, average placement ₹12 LPA, highest ₹45 LPA. MHT-CET cutoff: 97+ percentile for CSE. Followed by PICT (best for CS/IT), VIT Pune (NIRF #101), and SIT Pune (₹9.8 LPA avg placement)." },
  { question: "What is the best MBA college in Pune in 2026?", answer: "SIBM Pune (Symbiosis Institute of Business Management) is the best MBA college in Pune with NIRF Rank 13 and average placement of ₹28 LPA. Admission via SNAP 2026 (60+ percentile). Fees: ₹16–22L total. Recruiters include McKinsey, BCG, Deloitte, and P&G." },
  { question: "Which is the best medical college in Pune?", answer: "AFMC Pune (NIRF Rank 4, NAAC A++) is the best medical college in Pune with near-zero fees (₹50,000 total). Requires 650+ NEET score + AFMC entrance test. BJ Medical College (NIRF #18) is the best government option for state quota at 625+ NEET score and fees ₹60K–1.2L/yr." },
  { question: "What are the fees for engineering colleges in Pune 2026?", answer: "Engineering fees in Pune 2026: Government (COEP) ₹80K–1.8L/yr; Autonomous private (PICT, VIT Pune) ₹1.4L–2.2L/yr; Deemed universities (SIT Pune, MIT-WPU) ₹2L–4.8L/yr; Private colleges ₹95K–1.7L/yr. SC/ST/OBC categories get full fee waiver/concession at government colleges under EBC and government scholarship schemes." },
  { question: "What entrance exam is required for Pune colleges in 2026?", answer: "MHT-CET 2026 (April–May) for engineering at SPPU-affiliated colleges; JEE Main 2026 for COEP, SIT, MIT-WPU; NEET 2026 (May 3) for AFMC and BJ Medical College; CAT 2026 (November) and SNAP 2026 (December) for MBA at SIBM Pune; SET 2026 (May) for Symbiosis programs." },
  { question: "Which Pune college has the highest placement package in 2026?", answer: "SIBM Pune leads with ₹28 LPA average MBA placement and McKinsey/BCG offers. For engineering, COEP has the highest average (₹12 LPA) with individual offers reaching ₹45 LPA from Goldman Sachs and Google. PICT's CS branch sees highest median salary of ₹10 LPA with product company offers reaching ₹40+ LPA." },
  { question: "How to get admission in COEP Pune 2026?", answer: "For COEP Pune 2026 admission: Score 97+ percentile in MHT-CET (April–May 2026) or qualify JEE Main Session 1/2. Register on MHT-CET CAP portal after results (June 2026). Fill document verification at facilitation centre. Choose COEP in preference list during CAP Round 1 (July 2026). COEP is a government college — fees are just ₹80,000–1.8L/year." },
  { question: "What is the difference between COEP, PICT, and VIT Pune?", answer: "COEP: Government, NIRF #49, NAAC A+, fees ₹80K–1.8L/yr, avg placement ₹12 LPA — best overall value. PICT: Autonomous private, NAAC A, fees ₹1.4L–1.9L/yr, avg placement ₹7.5 LPA — best for CS/IT focus. VIT Pune: Autonomous, NIRF #101, NAAC A+, fees ₹1.6L–2.2L/yr, avg placement ₹8.5 LPA — best for Mechanical and Electronics. For CS/IT, COEP > PICT > VIT Pune. For Mechanical, COEP > VIT Pune > JSPM." },
]

export default function HomePage() {
  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqData)) }}
      />

      <main>
        <HeroSection />
        <StatsCounter />
        <FeaturedColleges />
        <RankingTables />
        <section className="py-16 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIRecommender />
          </div>
        </section>
        <ExamCalendar />

        {/* Tools Hub */}
        <section className="py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Free Tools for Smarter College Decisions</h2>
              <p className="text-gray-500 mt-2 text-sm">Everything you need to plan your college journey — all free, all in one place.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { href: "/predictor", icon: "🎯", label: "College Predictor", desc: "Find your best-fit colleges by exam score", bg: "bg-orange-50 hover:bg-orange-100 border-orange-100" },
                { href: "/compare", icon: "⚖️", label: "Compare Colleges", desc: "Side-by-side fees & placement comparison", bg: "bg-blue-50 hover:bg-blue-100 border-blue-100" },
                { href: "/roi-calculator", icon: "📈", label: "ROI Calculator", desc: "Is your degree worth the investment?", bg: "bg-green-50 hover:bg-green-100 border-green-100" },
                { href: "/nirf-insights", icon: "🏆", label: "NIRF Insights", desc: "Rankings & NAAC grades for Pune colleges", bg: "bg-purple-50 hover:bg-purple-100 border-purple-100" },
                { href: "/ai-finder", icon: "🤖", label: "AI College Finder", desc: "Chat with AI to find your ideal college", bg: "bg-pink-50 hover:bg-pink-100 border-pink-100" },
                { href: "/counselling", icon: "📞", label: "Free Counselling", desc: "Talk to an expert — free 15-min session", bg: "bg-teal-50 hover:bg-teal-100 border-teal-100" },
              ].map(({ href, icon, label, desc, bg }) => (
                <Link key={href} href={href} className={`flex flex-col items-center text-center p-4 rounded-2xl border transition-colors ${bg}`}>
                  <span className="text-3xl mb-2">{icon}</span>
                  <p className="text-xs font-bold text-gray-900 mb-1">{label}</p>
                  <p className="text-[11px] text-gray-500 hidden sm:block">{desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FAQSection />
        <BlogPreview />
      </main>
    </>
  )
}
