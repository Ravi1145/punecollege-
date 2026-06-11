import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "Mba Colleges In Pune Accepting Xat | CollegePune 2026",
  description: "Complete guide to Mba Colleges In Pune Accepting Xat in Pune 2026. Fees, cutoffs, placements and admission process for Pune MBA colleges.",
  path: "/mba-colleges-in-pune-accepting-xat",
  keywords: ["mba colleges in pune accepting xat", "mba colleges pune 2026", "mba admission pune"],
})
export const revalidate = 300

const faqs = [
  { question: "What is the best option for Mba Colleges In Pune Accepting Xat in Pune?", answer: "Top MBA colleges in Pune for this category: SIBM Pune (avg ₹24 LPA), SCMHRD (₹19 LPA), MIT-SOM (₹11 LPA, ₹7L/yr fees), and PUMBA (government, ₹1.25L/yr). Choose based on your entrance score, budget and specialisation preference." },
  { question: "How to apply for MBA in Pune 2026?", answer: "MBA admission in Pune: Appear in MAH-CET MBA (March 2026) or SNAP (December 2025 for Symbiosis). Register on DTE Maharashtra portal after results. Fill college preferences. Attend CAP Rounds (July-August 2026). Classes begin August 2026." },
]

export default function Page() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Mba Colleges In Pune Accepting Xat", url: "/mba-colleges-in-pune-accepting-xat" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="Mba Colleges In Pune Accepting Xat — Pune 2026"
        subtitle="Complete guide to Mba Colleges In Pune Accepting Xat in Pune. Compare top MBA colleges, fees, cutoffs and placements."
        quickAnswer="Top Pune MBA colleges: SIBM (avg ₹24 LPA), SCMHRD (₹19 LPA), MIT-SOM (₹11 LPA, ₹7L/yr). Admission via MAH-CET MBA or SNAP. Classes begin August 2026."
        stats={[
          { value: "120+", label: "MBA Colleges" },
          { value: "₹7–24 LPA", label: "Avg Placement" },
          { value: "₹1.25L–16L", label: "Annual Fees" },
          { value: "MAH-CET", label: "Primary Exam" },
        ]}
        colleges={mbaColleges}
        introHeading="Mba Colleges In Pune Accepting Xat in Pune — Key Facts"
        introParagraphs={[
          "Pune has 120+ AICTE-approved MBA colleges covering every specialization, fee range, and entrance exam requirement. This page covers the best options for your specific search.",
          "For detailed fee comparison, cutoff predictions, and placement data, explore the related pages below or book a free counselling session.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
          { label: "MBA Admission Process", href: "/mba-admission-process-pune" },
          { label: "MBA Placements Pune", href: "/mba-placements-pune" },
        ]}
        ctaHeading="Get Personalised MBA Guidance for Pune"
        ctaSubtext="Free counselling from our Pune-based MBA experts — 15 minutes, zero cost."
      />
    </>
  )
}
