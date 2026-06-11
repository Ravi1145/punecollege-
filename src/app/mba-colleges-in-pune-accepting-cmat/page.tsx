import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Accepting CMAT 2025-26 | CMAT Cutoff & Admission",
  description: "MBA colleges in Pune accepting CMAT score 2025-26. CMAT cutoffs, fees and placements for Pune MBA colleges. Which Pune colleges accept CMAT for MBA admission?",
  path: "/mba-colleges-in-pune-accepting-cmat",
  keywords: ["mba colleges in pune accepting cmat", "cmat score mba pune", "cmat cutoff mba pune", "mba pune cmat 2025", "cmat colleges pune"],
})
export const revalidate = 300

const faqs = [
  { question: "Which MBA colleges in Pune accept CMAT?", answer: "Most private MBA colleges in Pune accept CMAT along with MAH-CET. Top CMAT-accepting MBA colleges: MIT-SOM (90+ CMAT percentile), DYPIM (80+), BVIMR (80+), Indira MBA (80+), and 60+ other SPPU-affiliated private MBA colleges. CMAT is a national exam by NTA — higher CMAT score improves your options beyond just Pune." },
  { question: "What CMAT score is needed for MBA in Pune?", answer: "CMAT cutoffs for Pune MBA colleges: MIT-SOM and DYPIM require 90+ percentile, BVIMR and Indira MBA require 80+, and most private Pune MBA colleges accept 70-80 percentile. Some management quota seats are available with 50-60 percentile CMAT." },
  { question: "Is CMAT better than MAH-CET for Pune MBA?", answer: "For Pune MBA specifically, MAH-CET MBA is more important — it is the state-level exam that controls most CAP seats. CMAT additionally opens national options. Most Pune colleges accept both. Appearing in both CMAT and MAH-CET maximises your admission chances across 500+ national MBA colleges." },
]

export default function MBAAcceptingCMAT() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Accepting CMAT", url: "/mba-colleges-in-pune-accepting-cmat" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Accepting CMAT Score 2026"
        subtitle="60+ MBA colleges in Pune accept CMAT for admission. Compare CMAT cutoffs, fees and placements for Pune MBA programs."
        quickAnswer="MIT-SOM (90+ CMAT percentile), DYPIM (80+), BVIMR (80+), and 60+ Pune MBA colleges accept CMAT. Most Pune colleges prefer MAH-CET for state seats; CMAT is accepted as an alternative or for institutional quota. Appear in both for maximum options."
        stats={[
          { value: "60+", label: "CMAT Colleges Pune" },
          { value: "70–90+", label: "CMAT Percentile Range" },
          { value: "₹6–11 LPA", label: "Avg Placement" },
          { value: "₹3.5L–14L", label: "2-yr Fees Range" },
        ]}
        colleges={mbaColleges}
        filterFn={c => c.entranceExams.includes("CMAT")}
        introHeading="CMAT for MBA Admission in Pune — What You Need to Know"
        introParagraphs={[
          "CMAT (Common Management Admission Test) is conducted by NTA (National Testing Agency) and is accepted by 2,000+ MBA colleges across India, including 60+ in Pune. While MAH-CET MBA is the primary exam for CAP seats, CMAT provides an alternative route especially for institutional quota seats.",
          "CMAT is held in January each year. Results come in February. Unlike MAH-CET which leads to a centralized CAP process, CMAT scores are submitted directly to individual colleges. Each Pune college sets its own CMAT cutoff for institutional quota seats.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Accepting CAT", href: "/mba-colleges-in-pune-accepting-cat" },
          { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
          { label: "MBA Accepting MAT", href: "/mba-colleges-in-pune-accepting-mat" },
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
        ]}
        ctaHeading="CMAT Score Ready? Find Your MBA College in Pune"
        ctaSubtext="Free counselling — we'll match your CMAT score to the best Pune MBA programs in 15 minutes."
      />
    </>
  )
}
