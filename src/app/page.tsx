import { Metadata } from "next"
import Script from "next/script"
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
  title: "Best Colleges in Pune 2025 | AI-Powered Discovery | CollegePune",
  description: "Find the best engineering, MBA, medical and arts colleges in Pune. Compare COEP, SIBM, AFMC and 25+ colleges by fees (₹15K-25L/yr), placements (₹12-65 LPA), NAAC grade & reviews. Free AI counselor.",
  path: "/",
  keywords: [
    "best college in pune",
    "best btech college in pune",
    "best mba college in pune",
    "top engineering colleges pune",
    "colleges in pune with fees",
    "pune university colleges list",
    "best medical college pune",
    "coep pune admission",
    "sibm pune",
  ],
})

const faqData = [
  { question: "Which is the best BTech college in Pune?", answer: "COEP (College of Engineering Pune) is the best B.Tech college in Pune with NIRF Rank 49, NAAC A+, fees Rs 80K-1.8L/yr, and average placement of Rs 12 LPA. It is followed by PICT, VIT Pune, and SIT Pune (Symbiosis)." },
  { question: "What is the best MBA college in Pune?", answer: "SIBM Pune (Symbiosis Institute of Business Management) is the best MBA college in Pune with NIRF Rank 13. Average placement is Rs 28 LPA. Entrance via SNAP exam with 60+ percentile required." },
  { question: "Which is the best medical college in Pune?", answer: "AFMC Pune is the best medical college in Pune with NIRF Rank 4 and NAAC A++. For government quota MBBS, BJ Medical College (NIRF Rank 18) is excellent with fees just Rs 60K-1.2L/yr." },
  { question: "What are the fees for engineering colleges in Pune?", answer: "Engineering fees in Pune range from Rs 80,000/yr (COEP Government) to Rs 4.8L/yr (SIT Pune Symbiosis). Most autonomous private engineering colleges charge Rs 1.2L-2.2L per year." },
  { question: "What entrance exam is required for Pune colleges?", answer: "MHT-CET is required for engineering, JEE Main for top colleges, NEET for medical, CAT/SNAP for MBA. MHT-CET exam is held April-May and results come in June." },
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
        <FAQSection />
        <BlogPreview />
      </main>
    </>
  )
}
