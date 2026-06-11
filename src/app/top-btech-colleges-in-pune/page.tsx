import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { btechColleges, btechFAQs } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "Top BTech Colleges in Pune 2026 | Rankings, Fees & Admission",
  description: "Top BTech colleges in Pune 2026 with NIRF rankings, fees, MHT-CET cutoffs and placement data. COEP, PICT, VIT Pune, MIT-WPU, SIT Pune ranked and compared.",
  path: "/top-btech-colleges-in-pune",
  keywords: [
    "top btech colleges in pune", "top engineering colleges in pune 2026",
    "top btech college pune ranking", "top 10 engineering colleges pune",
    "top btech colleges pune nirf", "top btech colleges pune placement",
  ],
})
export const revalidate = 300

const rankingData = [
  { college: "COEP", nirf: 49, naac: "A+", type: "Govt", avgLPA: 12, feesLakh: 0.8 },
  { college: "VIT Pune", nirf: 101, naac: "A+", type: "Auto", avgLPA: 8.5, feesLakh: 1.6 },
  { college: "PICT", nirf: "—", naac: "A", type: "Auto", avgLPA: 7.5, feesLakh: 1.4 },
  { college: "MIT-WPU", nirf: "—", naac: "A+", type: "Deemed", avgLPA: 7.2, feesLakh: 2.0 },
  { college: "SIT Pune", nirf: "—", naac: "A+", type: "Deemed", avgLPA: 9.8, feesLakh: 3.6 },
  { college: "PCCOE", nirf: "—", naac: "A+", type: "Auto", avgLPA: 6.5, feesLakh: 1.35 },
]

export default function TopBTechCollegesInPune() {
  const faqSchema = generateFAQSchema(btechFAQs.general.slice(0, 5))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Top BTech Colleges", url: "/top-btech-colleges-in-pune" },
  ])
  const itemListSchema = generateCollegeListSchema(
    btechColleges.map(c => ({ name: c.name, slug: c.slug })),
    "Top BTech Colleges in Pune 2026"
  )

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <BTechClusterPage
        h1="Top BTech Colleges in Pune 2026"
        subtitle="NIRF and NAAC ranked top BTech engineering colleges in Pune with fees, cutoffs, and placement data for 2026 admission."
        quickAnswer="Top BTech colleges in Pune by NIRF 2024: #1 COEP (NIRF 49, Govt, ₹12 LPA avg), #2 VIT Pune (NIRF 101, ₹8.5 LPA), followed by PICT, MIT-WPU, SIT Pune and PCCOE (all NAAC A+). Admission via MHT-CET CAP rounds."
        stats={[
          { value: "NIRF #49", label: "COEP Rank" },
          { value: "NIRF #101", label: "VIT Pune Rank" },
          { value: "6 NAAC A+", label: "Top Colleges" },
          { value: "₹9.8 LPA", label: "Highest Avg (SIT)" },
        ]}
        colleges={btechColleges}
        breadcrumbLabel="Top BTech Colleges"
        introHeading="Top BTech Colleges in Pune — NIRF & NAAC Rankings 2026"
        introParagraphs={[
          "The National Institutional Ranking Framework (NIRF) by the Government of India is the most authoritative ranking for engineering colleges. Among Pune colleges, COEP is ranked #49 nationally (Engineering category, NIRF 2024) — the only Pune engineering college in the top 50. VIT Pune holds NIRF #101.",
          "NAAC accreditation is a key quality signal. Six Pune BTech colleges hold the top NAAC A+ grade: COEP, VIT Pune, MIT-WPU, SIT Pune, PCCOE, and Bharati Vidyapeeth College of Engineering. NAAC A+ means the college has been independently assessed as excellent in academics, research, and governance.",
          "Beyond NIRF and NAAC, placement outcomes are the most practical measure for students. SIT Pune leads private colleges with ₹9.8 LPA average. COEP leads government colleges with ₹12 LPA. PICT leads in placement rate (98%+) and finance-sector placements.",
        ]}
        faqs={btechFAQs.general.slice(0, 5)}
        internalLinks={[
          { label: "Best BTech Colleges Pune", href: "/best-btech-colleges-in-pune" },
          { label: "All BTech Colleges Pune", href: "/btech-colleges-in-pune" },
          { label: "BTech Fees Comparison", href: "/btech-colleges-in-pune-with-fees" },
          { label: "BTech Placements Pune", href: "/btech-colleges-in-pune-with-placement" },
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
          { label: "NIRF Rankings Pune", href: "/nirf-insights" },
        ]}
        ctaHeading="Get Into a Top BTech College in Pune"
        ctaSubtext="Free counselling — identify your best-fit college based on your MHT-CET percentile and branch preference."
      />
    </>
  )
}
