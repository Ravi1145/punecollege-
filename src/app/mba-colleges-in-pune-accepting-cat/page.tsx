import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Accepting CAT 2025-26 | CAT Cutoff & Admission",
  description: "MBA colleges in Pune accepting CAT score 2025-26. CAT cutoffs, fees, placements for SIBM, SCMHRD, PUMBA, MIT-SOM and 30+ Pune MBA colleges that accept CAT.",
  path: "/mba-colleges-in-pune-accepting-cat",
  keywords: ["mba colleges in pune accepting cat", "cat score mba pune", "cat cutoff mba pune", "mba admission pune cat", "pune mba cat 2025"],
})
export const revalidate = 300

const catColleges = mbaColleges.filter(c => c.entranceExams.includes("CAT"))

const faqs = [
  { question: "Which MBA colleges in Pune accept CAT score?", answer: "MBA colleges in Pune that accept CAT: SIBM Pune (90+ percentile), SCMHRD (88+), PUMBA (75+), MIT-SOM (70+), FLAME University (80+), DYPIM (65+), BVIMR (60+), and 30+ other SPPU-affiliated and private MBA colleges. CAT is accepted alongside MAH-CET MBA at most colleges." },
  { question: "What CAT percentile is needed for MBA in Pune?", answer: "CAT cutoffs for MBA in Pune: SIBM Pune requires 90+ percentile, SCMHRD requires 88+, PUMBA requires 75+, MIT-SOM requires 70+, and FLAME requires 80+. Most mid-tier and lower-tier Pune MBA colleges accept 50–70 percentile CAT for management quota or institutional quota seats." },
  { question: "Is CAT required for MBA in Pune or is MAH-CET enough?", answer: "MAH-CET MBA is the primary exam for most Pune MBA colleges and is sufficient for admission through the DTE Maharashtra CAP process. CAT is additionally required for Symbiosis (SIBM, SCMHRD), FLAME, and some deemed universities. You do NOT need CAT for the majority of Pune MBA programs." },
  { question: "Can I get MBA admission in Pune with 60-70 percentile CAT?", answer: "Yes. With 60-70 percentile CAT, you can get admission at MIT-SOM management quota, DYPIM, BVIMR, Indira MBA, and 50+ other Pune MBA colleges. Most SPPU-affiliated private MBA colleges accept 50-60 percentile for management/institutional quota seats." },
]

export default function MBAAcceptingCAT() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Accepting CAT", url: "/mba-colleges-in-pune-accepting-cat" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Accepting CAT Score 2026"
        subtitle="30+ MBA colleges in Pune accept CAT scores for admission. Compare CAT cutoffs, fees, and placements across Pune's top MBA programs."
        quickAnswer="SIBM Pune (90+ CAT percentile, avg ₹24 LPA) is the top CAT-accepting MBA college in Pune. SCMHRD requires 88+. PUMBA accepts 75+. Most Pune MBA colleges accept MAH-CET as primary and CAT as alternative — you need just one."
        stats={[
          { value: `${catColleges.length}+`, label: "Colleges Accept CAT" },
          { value: "50–90+", label: "CAT Percentile Range" },
          { value: "₹7–24 LPA", label: "Placement Range" },
          { value: "₹1.25L–16L", label: "Annual Fees" },
        ]}
        colleges={catColleges}
        introHeading="MBA Admission via CAT in Pune — Complete Guide"
        introParagraphs={[
          "While MAH-CET MBA is the primary entrance exam for most Pune MBA programs, CAT (Common Admission Test) by IIMs is accepted at many premium and mid-tier Pune MBA colleges. CAT scores are especially important for SIBM Pune, SCMHRD, PUMBA, and FLAME University.",
          "Important: CAT and MAH-CET MBA are separate exams targeting different types of colleges. For the top 5 Pune MBA colleges, CAT is typically required or preferred. For the majority of 120+ Pune MBA colleges, MAH-CET MBA is sufficient. Appearing in both exams gives you maximum options.",
          "CAT exam is held in November each year. Results come in January. Admissions for Pune MBA colleges begin January–March. Top Pune MBA colleges shortlist CAT scorers for GD-PI rounds, unlike MAH-CET which uses direct CAP allotment.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Accepting CMAT", href: "/mba-colleges-in-pune-accepting-cmat" },
          { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
          { label: "MBA Colleges in Pune", href: "/mba-colleges-in-pune" },
          { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
          { label: "MBA Admission Process", href: "/mba-admission-process-pune" },
        ]}
        ctaHeading="Know Your CAT Score? Find Your Best MBA College"
        ctaSubtext="Enter your CAT percentile and get a personalised list of Pune MBA colleges you can target — free."
      />
    </>
  )
}
