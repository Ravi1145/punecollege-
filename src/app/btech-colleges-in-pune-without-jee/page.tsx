import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune Without JEE 2026 | MHT-CET Direct Admission",
  description: "Get BTech admission in Pune without JEE Main 2026. All Pune engineering colleges accept MHT-CET. 50+ NAAC-accredited BTech colleges without JEE requirement — COEP, PICT, VIT Pune.",
  path: "/btech-colleges-in-pune-without-jee",
  keywords: [
    "btech colleges in pune without jee", "engineering admission pune without jee",
    "btech pune mht cet only", "btech admission without jee pune",
    "can i get btech in pune without jee", "pune engineering college without jee main",
  ],
})
export const revalidate = 300

const faqs = [
  { question: "Can I get BTech admission in Pune without JEE Main?", answer: "Yes, absolutely. BTech admission in Pune does NOT require JEE Main. The primary entrance exam for Pune BTech colleges is MHT-CET (Maharashtra Common Entrance Test). All 50+ engineering colleges in Pune accept MHT-CET for CAP (state quota) seats. JEE Main is only required for management quota seats at some colleges or for IITs/NITs." },
  { question: "Is JEE required for COEP Pune?", answer: "JEE Main is NOT required for COEP's MHT-CET CAP seats (which are the majority of seats). COEP accepts MHT-CET scores for the DTE Maharashtra CAP process. JEE Advanced is accepted for a small number of seats under a special scheme. Most COEP students get in through MHT-CET — JEE is not needed." },
  { question: "Which BTech colleges in Pune accept MHT-CET without JEE?", answer: "All 50+ BTech colleges in Pune accept MHT-CET without JEE Main: COEP, PICT, VIT Pune, MIT-WPU, SIT Pune, PCCOE, DYPCOE, AISSMS, Bharati Vidyapeeth, Sinhgad group, JSPM group, and all SPPU-affiliated engineering colleges. JEE Main is an additional option, not a requirement." },
  { question: "What is the difference between MHT-CET and JEE for Pune BTech?", answer: "MHT-CET is a Maharashtra state exam (60% NCERT + 40% Maharashtra state board syllabus) that controls 90%+ of BTech seats in Pune. JEE Main is a national exam used for IITs/NITs and as an alternative for management quota. For Pune specifically, MHT-CET is the primary and more important exam — most top students at COEP and PICT got in through MHT-CET." },
  { question: "What MHT-CET score is needed for BTech in Pune without JEE?", answer: "MHT-CET cutoffs for Pune BTech without JEE: COEP (CS): 99+ percentile, PICT (CS): 97–99 percentile, VIT Pune: 92–97 percentile, PCCOE: 85–93 percentile, MIT-WPU: 82–90 percentile, DYPCOE/AISSMS: 68–82 percentile. You don't need JEE for any of these colleges." },
]

export default function BTechWithoutJEE() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Without JEE", url: "/btech-colleges-in-pune-without-jee" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BTechClusterPage
        h1="BTech Colleges in Pune Without JEE 2026"
        subtitle="All 50+ BTech engineering colleges in Pune accept MHT-CET — JEE Main is NOT required. Get into COEP, PICT, VIT Pune without clearing JEE."
        quickAnswer="BTech admission in Pune does NOT require JEE Main. All Pune engineering colleges accept MHT-CET for state quota seats. COEP, PICT, VIT Pune, MIT-WPU — all accessible via MHT-CET alone. JEE Main is an alternative for management quota only, not mandatory."
        stats={[
          { value: "50+", label: "Colleges — No JEE" },
          { value: "MHT-CET", label: "Primary Exam" },
          { value: "99%+", label: "COEP via MHT-CET" },
          { value: "0", label: "JEE Requirement" },
        ]}
        colleges={btechColleges}
        breadcrumbLabel="Without JEE"
        introHeading="BTech in Pune Without JEE — The Complete Picture"
        introParagraphs={[
          "One of the biggest misconceptions about Pune engineering admissions is that JEE Main is required. It is not. Maharashtra has its own state-level engineering entrance exam — MHT-CET — which is the primary (and often only) requirement for 90%+ of BTech seats across all 50+ engineering colleges in Pune.",
          "COEP (NIRF #49), PICT, VIT Pune, MIT-WPU, SIT Pune — every single one of these top colleges fills its main intake through MHT-CET via the DTE Maharashtra CAP process. JEE Main is only relevant if you're targeting IITs or NITs, or if you want to use it as an alternative route for management quota seats at some private colleges.",
          "The MHT-CET PCM exam covers Physics, Chemistry, and Mathematics from Maharashtra state board and NCERT syllabus. It is offered in Computer-Based Test (CBT) mode in April–May each year. Students from any state board (not just Maharashtra) can appear — but domicile certificate matters for reservations in Maharashtra colleges.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
          { label: "BTech Admission Guide", href: "/btech-admission-in-pune" },
          { label: "Engineering without JEE", href: "/engineering-admission-pune-without-jee" },
          { label: "Best BTech Colleges", href: "/best-btech-colleges-in-pune" },
          { label: "BTech Fees Pune", href: "/btech-colleges-in-pune-with-fees" },
          { label: "MHT-CET Counselling", href: "/mht-cet-counselling-pune-2026" },
        ]}
        ctaHeading="MHT-CET Score Ready? Find Your Best BTech College"
        ctaSubtext="Free counselling — get a personalised college list based on your MHT-CET percentile, branch, and budget."
      />
    </>
  )
}
