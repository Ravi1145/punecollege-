import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "College Predictor Pune 2026 — MHT-CET, JEE, NEET, CAT Score to College",
  description: "Free college predictor for Pune 2026. Enter your MHT-CET percentile, JEE Main score, NEET score, or CAT percentile to instantly see which Pune colleges you can get admission in — with probability estimates.",
  path: "/predictor",
  keywords: [
    "college predictor pune",
    "MHT-CET college predictor 2026",
    "JEE main college predictor pune",
    "NEET college predictor pune 2026",
    "CAT college predictor pune",
    "which college can I get with 90 percentile MHT-CET",
    "pune college admission chances",
    "SNAP score predictor pune MBA",
  ],
})

const faqs = [
  { question: "How does the Pune college predictor work?", answer: "Enter your exam score (MHT-CET percentile, JEE Main percentile, NEET score, CAT percentile, or SNAP score), select your category (General/OBC/SC/ST), and the predictor calculates your admission probability for each Pune college based on historical cutoff trends." },
  { question: "How accurate is the college predictor for Pune?", answer: "The predictor uses 3+ years of CAP Round cutoff data and is accurate within ±5 percentile. It gives probability bands (High/Medium/Low chance) rather than guarantees, as exact cutoffs vary each year. Always cross-check with official DTE Maharashtra CAP portal." },
  { question: "What score do I need for COEP in MHT-CET 2026?", answer: "You need 95+ percentile in MHT-CET 2026 for most Computer Engineering seats at COEP. The CSE branch is the most competitive at 99.5+ percentile. Mechanical and Civil branches at COEP require 90+ percentile. SC/ST candidates get 15 percentile relaxation." },
  { question: "Can I get SIBM Pune with a low SNAP score?", answer: "SIBM Pune requires 60+ percentile in SNAP. If your score is below 60, you can target MIT-SOM (no SNAP requirement, accepts CAT/MAT/CMAT), BIMM Pune (₹5–7.5L fees), or Indira Institute of Management (best ROI in Pune). For SCMHRD you need 55+ percentile." },
]

const breadcrumbs = [
  { name: "Home", url: "/" },
  { name: "College Predictor", url: "/predictor" },
]

export default function PredictorLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs)
  return (
    <>
      <Script id="predictor-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="predictor-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  )
}
