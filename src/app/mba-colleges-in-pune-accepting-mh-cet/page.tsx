import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Colleges in Pune Accepting MAH-CET 2026 | CAP Cutoff List",
  description: "All MBA colleges in Pune accepting MAH-CET MBA 2026. CAP round cutoffs, fees, placements and DTE Maharashtra admission process for 120+ Pune MBA colleges.",
  path: "/mba-colleges-in-pune-accepting-mh-cet",
  keywords: ["mba colleges in pune accepting mah cet", "mh cet mba colleges pune", "mah cet mba cutoff pune", "dte maharashtra mba pune", "cap round mba pune 2026"],
})
export const revalidate = 300

const faqs = [
  { question: "Which MBA colleges in Pune accept MAH-CET MBA?", answer: "All 120+ AICTE-approved MBA colleges in Pune affiliated with SPPU and other Maharashtra universities accept MAH-CET MBA through DTE Maharashtra's CAP process. This includes PUMBA, MIT-SOM, DYPIM, BVIMR, Indira MBA, and 100+ private colleges. Symbiosis colleges (SIBM, SCMHRD) do NOT accept MAH-CET â€” they use SNAP exclusively." },
  { question: "What is the MAH-CET MBA cutoff for Pune colleges in 2026?", answer: "MAH-CET MBA cutoffs for Pune 2026 (Open category): PUMBA: 95+ percentile, MIT-SOM: 85-95 percentile, SCMHRD: 90+ (SNAP), DYPIM: 75-85 percentile, BVIMR: 65-75 percentile, Indira MBA: 70-80 percentile. Reserved category cutoffs are 15-20 percentile lower." },
  { question: "What is the DTE Maharashtra MBA CAP process?", answer: "DTE Maharashtra MBA CAP (Centralized Admission Process): 1) Appear in MAH-CET MBA (March). 2) Register on DTE portal after results (May-June). 3) Document verification. 4) Fill college preferences. 5) CAP Round 1 allotment. 6) Seat acceptance. 7) CAP Round 2-3 for remaining seats. Process runs Mayâ€“August 2026." },
  { question: "Can I use both MAH-CET MBA and CAT scores for Pune MBA?", answer: "Yes. Most Pune MBA colleges that accept MAH-CET also accept CAT, CMAT, and MAT for their institutional quota seats. You can use MAH-CET for CAP (state quota) seats and CAT/CMAT for additional institutional quota seats at the same college. Appearing in multiple exams maximises your options." },
]

export default function MBAAcceptingMHCET() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Accepting MAH-CET", url: "/mba-colleges-in-pune-accepting-mh-cet" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Colleges in Pune Accepting MAH-CET MBA 2026"
        subtitle="120+ MBA colleges in Pune accept MAH-CET MBA through DTE Maharashtra's CAP process. Complete cutoffs, fees, and CAP round guide."
        quickAnswer="All 120+ SPPU-affiliated MBA colleges in Pune accept MAH-CET MBA via DTE Maharashtra CAP. PUMBA cutoff: 95+ percentile. MIT-SOM: 85-95 percentile. DYPIM: 75-85 percentile. Note: Symbiosis (SIBM, SCMHRD) requires SNAP, not MAH-CET."
        stats={[
          { value: "120+", label: "MAH-CET Colleges" },
          { value: "65â€“95+", label: "Percentile Range" },
          { value: "3 Rounds", label: "CAP Rounds" },
          { value: "â‚¹1.25Lâ€“7L/yr", label: "Fees" },
        ]}
                colleges={mbaColleges.filter(c => c.entranceExams.includes("MAH-CET MBA"))}
        introHeading="MAH-CET MBA Colleges in Pune â€” How CAP Works"
        introParagraphs={[
          "MAH-CET MBA (Maharashtra Common Entrance Test for MBA) is conducted by the Maharashtra State CET Cell in March each year. It is the gateway to 120+ MBA colleges in Pune through DTE Maharashtra's Centralized Admission Process (CAP).",
          "Unlike CAT which requires GD-PI at each college, MAH-CET MBA leads to a direct merit-based allotment through CAP rounds. Students fill up to 300 college-branch preferences. Seats are allotted based on MAH-CET score, academic record, and category. No separate GD-PI required at most colleges.",
          "MAH-CET MBA exam tests Logical Reasoning (75 questions), Abstract Reasoning (25), Quantitative Aptitude (50), and Verbal Ability/Reading Comprehension (50) â€” 200 questions in 150 minutes. Score is valid for 1 year.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Accepting CAT", href: "/mba-colleges-in-pune-accepting-cat" },
          { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
          { label: "MBA Admission Process", href: "/mba-admission-process-pune" },
          { label: "MHT-CET Counselling Guide", href: "/mht-cet-counselling-pune-2026" },
          { label: "All MBA Colleges Pune", href: "/mba-colleges-in-pune" },
        ]}
        ctaHeading="Appearing in MAH-CET MBA 2026? Start Planning Now"
        ctaSubtext="Free counselling â€” get your college shortlist and cutoff targets based on your preparation level."
      />
    </>
  )
}
