import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune Through MHT-CET 2026 | CAP Cutoffs & Admission",
  description: "Complete guide to BTech admission in Pune through MHT-CET 2026. CAP round cutoffs for all top colleges — COEP, PICT, VIT Pune. Branch-wise percentile requirements and admission process.",
  path: "/btech-colleges-in-pune-through-mht-cet",
  keywords: [
    "btech colleges in pune through mht cet", "mht cet btech colleges pune",
    "mht cet cutoff pune engineering", "cap round engineering pune mht cet",
    "btech admission pune mht cet 2026", "mht cet colleges pune list",
  ],
})
export const revalidate = 300

const cutoffData = [
  { college: "COEP", branch: "Computer Engineering", open: "99.5+", obc: "98+", sc: "85+", st: "70+" },
  { college: "COEP", branch: "Mechanical Engineering", open: "97+", obc: "92+", sc: "75+", st: "60+" },
  { college: "PICT", branch: "Computer Engineering", open: "98–99", obc: "95+", sc: "78+", st: "62+" },
  { college: "VIT Pune", branch: "Computer Engineering", open: "94–97", obc: "88+", sc: "68+", st: "52+" },
  { college: "MIT-WPU", branch: "Computer Engineering", open: "85–92", obc: "78+", sc: "58+", st: "42+" },
  { college: "PCCOE", branch: "Computer Engineering", open: "88–93", obc: "80+", sc: "62+", st: "48+" },
  { college: "DYPCOE", branch: "Computer Engineering", open: "72–82", obc: "65+", sc: "45+", st: "30+" },
  { college: "AISSMS COE", branch: "Computer Engineering", open: "70–80", obc: "63+", sc: "42+", st: "28+" },
]

const faqs = [
  { question: "What is the MHT-CET cutoff for COEP Pune 2026?", answer: "COEP MHT-CET 2026 cutoff (expected, Open category): Computer Engineering: 99.5+ percentile, Mechanical: 97+, Civil: 94+, Electronics: 96+. These are closing percentiles from Round 1. Cutoffs drop 1–3 percentile in subsequent rounds. Reserved category cutoffs are 15–25 percentile lower." },
  { question: "Which Pune BTech colleges accept MHT-CET for admission?", answer: "All 50+ SPPU-affiliated engineering colleges in Pune accept MHT-CET through DTE Maharashtra's CAP process. This includes COEP, PICT, VIT Pune, MIT-WPU (also own test), SIT Pune (also SET), PCCOE, DYPCOE, AISSMS, Bharati Vidyapeeth, Sinhgad group, JSPM group, and all government-aided and private unaided engineering colleges." },
  { question: "How are BTech seats allocated through MHT-CET CAP in Pune?", answer: "DTE Maharashtra's CAP (Centralized Admission Process) allots BTech seats based on MHT-CET percentile, category, domicile, and college-branch preferences filled by the student. Three CAP rounds are conducted (July–August). Cutoffs are determined by the lowest percentile admitted in each round. Students can float to higher-preference allotments in subsequent rounds." },
  { question: "What is the MHT-CET pattern for BTech 2026?", answer: "MHT-CET PCM (for BTech) 2026 pattern: 150 questions, 180 minutes. Physics: 50 questions (100 marks), Chemistry: 50 questions (100 marks), Mathematics: 50 questions (200 marks — 4 marks each). Difficulty level: 60% NCERT, 40% Maharashtra state board. No negative marking." },
  { question: "Can I improve my MHT-CET seat in later CAP rounds?", answer: "Yes. If you get a seat in CAP Round 1 but were allotted a lower-preference college/branch, you can participate in Round 2 and 3 with your original preferences intact. This is called 'floating.' In Round 2 and 3, if a better preference opens up, you'll be upgraded. Your Round 1 seat is cancelled only if you get a better allotment." },
]

export default function BTechThroughMHTCET() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Through MHT-CET", url: "/btech-colleges-in-pune-through-mht-cet" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BTechClusterPage
        h1="BTech Colleges in Pune Through MHT-CET 2026"
        subtitle="Complete MHT-CET cutoffs, CAP round process and college-wise branch cutoffs for BTech admission in Pune."
        quickAnswer="All 50+ Pune BTech colleges are accessible via MHT-CET CAP. COEP CS needs 99.5+ percentile. PICT CS: 98–99%. VIT Pune: 94–97%. MIT-WPU: 85–92%. DTE Maharashtra runs 3 CAP rounds in July–August 2026 based on your MHT-CET score."
        stats={[
          { value: "50+", label: "MHT-CET Colleges" },
          { value: "3 Rounds", label: "CAP Process" },
          { value: "99.5+", label: "COEP CS Cutoff" },
          { value: "68+", label: "Min Cutoff" },
        ]}
        colleges={btechColleges}
        breadcrumbLabel="Through MHT-CET"
        introHeading="BTech Admission via MHT-CET in Pune — How CAP Works"
        introParagraphs={[
          "MHT-CET (Maharashtra Common Entrance Test) is the gateway to BTech admission at all government, autonomous, and private engineering colleges in Pune. Unlike national exams like JEE, MHT-CET is specifically designed for Maharashtra state's engineering seats, with syllabus aligned to Maharashtra State Board and NCERT.",
          "After MHT-CET results (June 2026), DTE Maharashtra runs the CAP — a centralized online seat allotment system. You register, submit documents, fill up to 300 college-branch preferences, and receive allotments in 3 rounds. The entire process is transparent and merit-based with category-wise reservations.",
          "Key CAP strategy: Fill your option form carefully. Place COEP CS or PICT CS first if you score 97+ percentile. For 85–95 percentile, target VIT Pune, PCCOE, MIT-WPU. For 70–84 percentile, DYPCOE, AISSMS, and other SPPU colleges are realistic. Always fill 15–20 options, not just 5.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MHT-CET Counselling 2026", href: "/mht-cet-counselling-pune-2026" },
          { label: "BTech Admission Guide", href: "/btech-admission-in-pune" },
          { label: "BTech without JEE", href: "/btech-colleges-in-pune-without-jee" },
          { label: "MHT-CET Colleges List", href: "/mht-cet-colleges-pune" },
          { label: "College Predictor", href: "/predictor" },
        ]}
        ctaHeading="Know Your MHT-CET Score? Get Your College List"
        ctaSubtext="Free counselling — personalised CAP option form strategy based on your percentile, branch, and category."
      />
    </>
  )
}
