import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { btechColleges, btechFAQs } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "Best BTech Colleges in Pune 2026 | NIRF Ranked | Fees & Placements",
  description: "Best BTech colleges in Pune 2026 ranked by NIRF, NAAC and placements. COEP (NIRF #49), PICT, VIT Pune, MIT-WPU, SIT Pune. Fees ₹80K–4.8L/yr, avg ₹7–12 LPA.",
  path: "/best-btech-colleges-in-pune",
  keywords: [
    "best btech colleges in pune", "best engineering colleges in pune",
    "best btech college pune 2026", "top ranked engineering college pune",
    "best btech for cs pune", "best btech for mechanical pune",
  ],
})
export const revalidate = 300

const faqs = [
  { question: "Which is the best BTech college in Pune overall?", answer: "COEP (College of Engineering Pune) is the best BTech college in Pune overall — NIRF #49, NAAC A+, government fees (₹80K/yr), and ₹12 LPA average placement. For Computer Science specifically, PICT Pune is the best with Goldman Sachs, Deutsche Bank recruiting on campus at ₹7.5 LPA average." },
  { question: "What is the best BTech college in Pune for placements?", answer: "For highest placements, SIT Pune (₹9.8 LPA avg, Microsoft/Amazon) leads among private colleges. COEP (₹12 LPA avg) leads overall. PICT has the best placement rate (98%+) with top finance sector recruiters. VIT Pune offers ₹8.5 LPA average with consistent 85%+ placement." },
  { question: "Is COEP better than PICT for BTech?", answer: "COEP is better overall (NIRF #49, lower fees, broader branches, stronger alumni). PICT is better specifically for Computer Science and IT branches due to its fintech/banking sector recruiters and coding culture. If you can get COEP in CS branch, that is the gold standard. PICT is the best alternative for CS in Pune." },
  { question: "Which is the best BTech college in Pune under 2 lakh fees?", answer: "Best BTech colleges in Pune with fees under ₹2L/year: COEP (₹80K–1.8L, NIRF #49), PICT (₹1.4L–1.9L, best CS), VIT Pune (₹1.6L–2.2L, NAAC A+), PCCOE (₹1.35L–1.85L, NAAC A+), DYPCOE (₹1.05L–1.55L). All are NAAC-accredited autonomous colleges." },
  ...btechFAQs.general.slice(5),
]

export default function BestBTechCollegesInPune() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Best BTech Colleges", url: "/best-btech-colleges-in-pune" },
  ])
  const itemListSchema = generateCollegeListSchema(
    btechColleges.map(c => ({ name: c.name, slug: c.slug, description: c.highlights[0] })),
    "Best BTech Colleges in Pune 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <BTechClusterPage
        h1="Best BTech Colleges in Pune 2026"
        subtitle="Top-ranked BTech engineering colleges in Pune by NIRF, NAAC, placements and fees. Verified 2026 data."
        quickAnswer="COEP (NIRF #49, NAAC A+, ₹80K/yr, avg ₹12 LPA) is the best BTech college in Pune. For CS/IT, PICT Pune is #1 (Goldman Sachs recruiter, ₹7.5 LPA avg). VIT Pune (NAAC A+, NIRF 101) is the best private autonomous college. SIT Pune has the highest private placement at ₹9.8 LPA avg."
        stats={[
          { value: "COEP #1", label: "Top Government" },
          { value: "PICT #1", label: "Best for CS/IT" },
          { value: "₹12 LPA", label: "COEP Avg Package" },
          { value: "NAAC A+", label: "Top 3 Accreditation" },
        ]}
        colleges={btechColleges}
        breadcrumbLabel="Best BTech Colleges"
        introHeading="Best BTech Colleges in Pune — How We Rank Them"
        introParagraphs={[
          "The best BTech college in Pune depends on your priorities: COEP is the most prestigious (NIRF #49, cheapest government fees), PICT is the best for CS/IT placement outcomes, SIT Pune offers the highest overall placement packages, and MIT-WPU/VIT Pune offer the best infrastructure in the autonomous category.",
          "Our ranking is based on: (1) NIRF and NAAC accreditation, (2) average and highest placement packages from official NIRF data, (3) MHT-CET cutoff (higher cutoff = more demand = better college), (4) infrastructure and research facilities, and (5) alumni network quality.",
          "Key insight: The best BTech college varies by branch. COEP dominates overall. PICT is unbeatable for CS (Goldman Sachs, Deutsche Bank on campus). VIT Pune is best for Electronics. MIT-WPU leads in emerging branches (AI/ML, Data Science). SIT Pune leads in overall campus quality and placement outcomes.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "All BTech Colleges Pune", href: "/btech-colleges-in-pune" },
          { label: "Top BTech Colleges", href: "/top-btech-colleges-in-pune" },
          { label: "BTech Fees Comparison", href: "/btech-colleges-in-pune-with-fees" },
          { label: "BTech Placements Pune", href: "/btech-colleges-in-pune-with-placement" },
          { label: "COEP Profile", href: "/colleges/coep-college-of-engineering-pune" },
          { label: "PICT Profile", href: "/colleges/pict-pune-institute-of-computer-technology" },
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
        ]}
        ctaHeading="Which BTech College is Best for You?"
        ctaSubtext="Free counselling — our engineers help you pick based on your MHT-CET score, branch preference and budget."
      />
    </>
  )
}
