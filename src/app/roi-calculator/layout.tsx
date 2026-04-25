import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "College ROI Calculator Pune 2026 — Is Your College Worth It?",
  description: "Free ROI calculator for Pune colleges. Compare fees vs expected salary to calculate payback period and lifetime earnings for B.Tech, MBA, MBBS, and other programs at Pune colleges.",
  path: "/roi-calculator",
  keywords: [
    "college ROI calculator pune",
    "is engineering college worth it pune",
    "MBA fees vs salary Pune",
    "college investment return pune 2026",
    "COEP vs SIBM ROI comparison",
    "best value college pune fees salary",
    "B.Tech salary vs fees pune",
    "MBA ROI pune colleges",
  ],
})

const faqs = [
  { question: "Is MBA from SIBM Pune worth the ₹22L fees?", answer: "Yes — SIBM Pune's average placement of ₹28 LPA means the ₹22L investment is recovered in under 10 months. Over 10 years, the salary premium over a non-MBA career is ₹1.2–1.8 Crore. The ROI is strongest for students targeting Pune's consulting, FMCG, and finance sectors." },
  { question: "Is B.Tech from COEP Pune worth it?", answer: "COEP B.Tech is one of India's highest ROI engineering degrees — fees of just ₹80K–₹1.8L/year vs ₹12 LPA average placement. The 4-year investment is recovered within 2–3 months of your first job. At ₹45 LPA highest package, top COEP graduates recover costs in weeks." },
  { question: "Which Pune college has the best ROI?", answer: "For engineering: COEP (government fees + ₹12 LPA avg). For MBA: Indira Institute of Management (₹4.2–6.5L total fees, ₹7.2 LPA avg) and MIT-SOM (₹7–11L total, ₹12 LPA avg) offer better ROI than SIBM if you're cost-sensitive. For medical: AFMC (nearly free + guaranteed job) is unmatched." },
  { question: "How long does it take to recover MBA fees in Pune?", answer: "At SIBM Pune (₹22L fees, ₹28 LPA avg): ~9–10 months payback. At MIT-SOM (₹9L fees, ₹12 LPA avg): ~9 months. At Indira Institute (₹5.5L fees, ₹7.2 LPA avg): ~9 months. All top Pune MBA colleges offer payback within the first year if placed at average salary." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "ROI Calculator", url: "/roi-calculator" },
]

export default function ROICalculatorLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  return (
    <>
      <Script id="roi-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="roi-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
