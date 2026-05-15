import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import HeroSection from "@/components/home/HeroSection"
import CollegeMarquee from "@/components/home/CollegeMarquee"
import FeaturedColleges from "@/components/home/FeaturedColleges"
import RankingTables from "@/components/home/RankingTables"
import AIRecommender from "@/components/ai/AIRecommender"
import ExamCalendar from "@/components/home/ExamCalendar"
import FAQSection from "@/components/home/FAQSection"
import GuidesScrollSection from "@/components/home/GuidesScrollSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import QuickExploreSection from "@/components/home/QuickExploreSection"
import HomepageNewsSection from "@/components/home/HomepageNewsSection"
import AlumniQASection from "@/components/home/AlumniQASection"
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateLocalBusinessSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Pune 2026 | Rankings, Fees & Placements | CollegePune",
  description: "Find the best engineering, MBA, medical and arts colleges in Pune 2026. Compare COEP (NIRF #49), SIBM (NIRF #13), AFMC (NIRF #4) and 25+ colleges by fees (₹15K–25L/yr), placements (₹12–65 LPA), NAAC grade & reviews. Free AI counselor.",
  path: "/",
  keywords: [
    "colleges in pune 2026",
    "best college in pune 2026",
    "top colleges in pune 2026",
    "top 10 colleges in pune 2026",
    "best engineering college in pune 2026",
    "best btech college in pune 2026",
    "best mba college in pune 2026",
    "best medical college in pune 2026",
    "top engineering colleges pune 2026",
    "engineering colleges in pune",
    "colleges in pune with fees 2026",
    "pune college list 2026",
    "pune university colleges list 2026",
    "naac a+ colleges in pune 2026",
    "nirf ranked colleges pune 2026",
    "government colleges in pune 2026",
    "private colleges in pune 2026",
    "college admission pune 2026",
    "mht-cet colleges pune 2026",
    "low fee colleges pune 2026",
    "coep pune admission 2026",
    "sibm pune 2026",
    "government engineering college pune",
    "sppu affiliated colleges 2026",
    "colleges in pune with hostel 2026",
    "bca colleges in pune 2026",
    "bba colleges in pune 2026",
    "design colleges in pune 2026",
    "direct admission colleges pune 2026",
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
  { question: "Which is the No. 1 college in Pune in 2026?", answer: "AFMC (Armed Forces Medical College) holds the highest NIRF rank among Pune colleges at #4 nationally. Among engineering colleges, COEP is #1 in Pune (NIRF #49). Among MBA colleges, SIBM Pune is #1 (NIRF #13). For arts and science, Fergusson College (Est. 1885) is the most prestigious. For design, Symbiosis Institute of Design (SID) is ranked among India's top 5." },
  { question: "Which colleges in Pune are NAAC A+ accredited in 2026?", answer: "NAAC A+ colleges in Pune (2026): AFMC (A++), COEP, MIT-WPU, SIT Pune (Symbiosis), VIT Pune, Cummins College, Fergusson College, SP College, Garware College, SIBM Pune, SID (Symbiosis Institute of Design), and MIT-ADT University. NAAC A+ is the second-highest grade and indicates excellent academic quality, infrastructure, and student outcomes." },
  { question: "When does college admission start in Pune for 2026?", answer: "Pune college admissions 2026 timeline: MHT-CET exam — April 20–May 15, 2026. NEET — May 3, 2026. MHT-CET results — June 2026. CAP Round 1 (engineering) — July 2026. Arts, Commerce, Science (CUET-based) — June–July 2026. MBA (CAT/SNAP-based) — December 2026 for the 2027 batch. Direct admissions (management quota) open in July–August 2026 after CAP rounds." },
  { question: "Which colleges in Pune have hostel facilities in 2026?", answer: "Top Pune colleges with hostel in 2026: COEP (₹55K–70K/yr), VIT Pune (₹80K–1L/yr), SIT Pune (₹1.1L–1.4L/yr), MIT-WPU (₹90K–1.2L/yr), SIBM Pune MBA (₹1.2L–1.6L/yr), AFMC (free hostel for all students), BJ Medical College (₹60K–75K/yr), Fergusson College (₹40K–55K/yr), SMCW (₹1.85L/yr, mandatory for outstation). Apply immediately after admission — government college hostels fill within days." },
  { question: "What is the cheapest college in Pune for engineering in 2026?", answer: "The cheapest engineering colleges in Pune 2026: COEP (₹80,000/year — government), AISSMS COE (₹1.1L/year), JSPM RSCOE (₹1.2L/year), Indira College of Engineering (₹95K/year). SC/ST/OBC students at government colleges get full fee waiver through state government scholarships. EBC (Economically Backward Class) scholarship available for annual family income below ₹8 lakh." },
  { question: "Which areas of Pune have the most colleges?", answer: "Major college hubs in Pune 2026: Shivajinagar / Deccan — COEP, SP College, Fergusson College, Garware College. Katraj / Dhankawadi — PICT, Sinhgad COE. Bibwewadi — VIT Pune. Akurdi / Pimpri-Chinchwad — DY Patil Engineering, AISSMS. Lavale / Mulshi — Symbiosis campus (SIBM, SIT, SID, SMCW). Alandi — MIT-ADT campus (MITAOE, MIT ACS). Hadapsar / Loni Kalbhor — MIT-ID, MITWPU satellite. Erandwane — SCACS, other Sinhgad colleges." },
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
      <Script
        id="local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* College Marquee — scrolling college cards */}
        <CollegeMarquee />

        {/* Browse by Stream */}
        <QuickExploreSection />

        {/* Cutoff Predictor Teaser */}
        <section className="py-14 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto lg:mx-0">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
                ⚡ 30-Second Check
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                Know Your Chances<br />in 30 Seconds
              </h2>
              <p className="text-gray-500 text-sm mb-5">
                Enter your MHT-CET percentile, JEE rank, NEET score, or CAT percentile. We&apos;ll show you which Pune colleges are within reach — based on real 2020–2026 cutoff data.
              </p>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: "MHT-CET", sub: "Percentile", href: "/cutoffs/mht-cet/coep-college-of-engineering-pune" },
                    { label: "JEE Main",  sub: "Percentile", href: "/cutoffs/jee/coep-college-of-engineering-pune" },
                    { label: "NEET",      sub: "Score",      href: "/cutoffs/neet/afmc-armed-forces-medical-college-pune" },
                    { label: "SNAP",      sub: "Percentile", href: "/cutoffs/snap/sibm-symbiosis-institute-business-management-pune" },
                  ].map(({ label, sub, href }) => (
                    <a key={label} href={href} className="flex flex-col p-3 rounded-xl border border-gray-100 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                      <span className="font-bold text-sm text-gray-900">{label}</span>
                      <span className="text-xs text-gray-400">{sub} cutoffs</span>
                    </a>
                  ))}
                </div>
                <a href="/predictor" className="flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  Open Full Predictor →
                </a>
                <p className="text-[11px] text-center text-gray-400">Based on CET Cell Maharashtra data 2020–2026 · Free</p>
              </div>
            </div>
          </div>
        </section>

        <FeaturedColleges />
        <RankingTables />
        <section className="py-16 bg-[#0A1628]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AIRecommender />
          </div>
        </section>
        <ExamCalendar />
        <HomepageNewsSection />

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

        {/* Guides & Tools Hub */}
        <section className="py-14 bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Explore College Guides & Tools</h2>
              <p className="text-gray-500 mt-2 text-sm">In-depth guides for every step of your college journey — rankings, fees, placements, and admissions.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Engineering */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-lg">⚙️</span>
                  Engineering Colleges
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Best Engineering Colleges Pune 2026", href: "/engineering-colleges-pune" },
                    { label: "Top 10 Engineering Colleges Ranked", href: "/top-10-engineering-colleges-in-pune" },
                    { label: "Placement Guide — Avg & Highest LPA", href: "/engineering-colleges-pune-placement" },
                    { label: "Low Fees Colleges (Under ₹5L)", href: "/low-fees-engineering-colleges-pune" },
                    { label: "Scholarships for Engineering", href: "/engineering-colleges-pune-scholarship" },
                    { label: "Admission Without JEE (MHT-CET)", href: "/engineering-admission-pune-without-jee" },
                    { label: "Private Engineering Colleges", href: "/private-engineering-colleges-pune" },
                    { label: "Direct Admission (Management Quota)", href: "/direct-admission-engineering-colleges-pune" },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-1.5">
                        <span className="text-orange-400">›</span> {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* MBA */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-lg">💼</span>
                  MBA Colleges
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Best MBA Colleges Pune 2026", href: "/mba-colleges-pune" },
                    { label: "Top 10 MBA Colleges Ranked", href: "/top-10-mba-colleges-in-pune" },
                    { label: "MBA Placement Guide — LPA & Recruiters", href: "/mba-colleges-pune-placement" },
                    { label: "Low Fees MBA Colleges", href: "/low-fees-mba-colleges-pune" },
                    { label: "MBA Scholarships Pune", href: "/mba-colleges-pune-scholarship" },
                    { label: "MBA Without CAT (MAT/CMAT/SNAP)", href: "/mba-admission-pune-without-cat" },
                    { label: "Private MBA Colleges Pune", href: "/private-mba-colleges-pune" },
                    { label: "Direct Admission MBA Pune", href: "/direct-admission-mba-colleges-pune" },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-1.5">
                        <span className="text-orange-400">›</span> {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Comparisons */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-lg">🛠️</span>
                  Tools & Comparisons
                </h3>
                <ul className="space-y-2.5">
                  {[
                    { label: "Engineering vs MBA — Which is Better?", href: "/pune-colleges-comparison-engineering-mba" },
                    { label: "Placement Comparator (Interactive)", href: "/pune-college-placement-comparator" },
                    { label: "Fees Calculator — 4-Year Total", href: "/pune-college-fees-calculator" },
                    { label: "Admission Deadline Tracker 2026", href: "/pune-admission-deadline-tracker-2026" },
                    { label: "AI College Finder", href: "/ai-finder" },
                    { label: "Compare Colleges Side-by-Side", href: "/compare" },
                    { label: "College Predictor by Score", href: "/predictor" },
                    { label: "Free Expert Counselling", href: "/counselling" },
                  ].map(({ label, href }) => (
                    <li key={href}>
                      <Link href={href} className="text-sm text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-1.5">
                        <span className="text-orange-400">›</span> {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <TestimonialsSection />
        <AlumniQASection />
        <FAQSection />
        <GuidesScrollSection />
      </main>
    </>
  )
}
