import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { mbaColleges } from "@/data/mbaColleges"
import MBAClusterPage from "@/components/mba/MBAClusterPage"

export const metadata: Metadata = genMeta({
  title: "MBA Direct Admission in Pune 2026 | Without MAH-CET | Management Quota",
  description: "MBA direct admission in Pune 2026 without MAH-CET. Management quota, NRI quota, and institutional quota seats available. Fees, process and top colleges for direct MBA admission.",
  path: "/mba-colleges-in-pune-direct-admission",
  keywords: ["mba direct admission pune", "mba without mah cet pune", "mba management quota pune", "direct mba admission pune 2026", "mba admission without entrance exam pune"],
})
export const revalidate = 300

const faqs = [
  { question: "Can I get MBA admission in Pune without MAH-CET?", answer: "Yes. MBA direct admission in Pune is possible through: (1) Management Quota seats (15-20% of intake) at private colleges — no MAH-CET required. (2) Institutional Quota at deemed universities (MIT-WPU, DYPIM) via direct application. (3) NRI/NRI-sponsored quota. (4) Spot admission rounds after CAP for vacant seats at lower-cutoff colleges." },
  { question: "What is the process for MBA direct admission in Pune?", answer: "MBA direct admission process in Pune: (1) Contact the college admission office directly. (2) Submit your graduation certificate, 10+2 marksheets, and any entrance score (optional). (3) Attend an interview (most colleges conduct GD-PI even for direct admission). (4) Pay the management quota fee (typically 1.5-2× regular fees). (5) Complete document verification and enrollment." },
  { question: "What are the fees for MBA direct/management quota in Pune?", answer: "MBA management quota fees in Pune are typically 1.5–2× the CAP (regular) fees. Examples: MIT-SOM CAP fees ₹7L (2yr), management quota ₹10–12L (2yr). DYPIM CAP ₹12L, management quota ₹15–18L. Management quota is usually not eligible for government scholarships." },
  { question: "Is MBA direct admission valid and recognized?", answer: "Yes. MBA direct admission through management quota is 100% valid and the degree is identical to CAP-allotted seats. Both CAP and management quota students attend the same classes, sit the same exams, and receive the same university degree. There is no academic difference." },
]

export default function MBADirectAdmission() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" }, { name: "MBA Colleges in Pune", url: "/mba-colleges-in-pune" },
    { name: "Direct Admission", url: "/mba-colleges-in-pune-direct-admission" },
  ])
  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MBAClusterPage
        h1="MBA Direct Admission in Pune 2026 | Without MAH-CET"
        subtitle="Get MBA admission in Pune without MAH-CET through management quota, institutional quota, or NRI quota at top private and deemed university colleges."
        quickAnswer="MBA direct admission in Pune is available through management quota (15-20% seats) at private colleges. No MAH-CET required. MIT-SOM, DYPIM, BVIMR, Indira MBA all offer management quota. Fees are 1.5-2× regular (CAP) fees. Degree is identical — fully valid."
        stats={[
          { value: "15–20%", label: "Management Quota" },
          { value: "No Exam", label: "MAH-CET Not Needed" },
          { value: "Same Degree", label: "Identical to CAP" },
          { value: "Aug 2026", label: "Classes Begin" },
        ]}
        colleges={mbaColleges}
        filterFn={c => c.type !== "Government"}
        introHeading="MBA Direct Admission in Pune — Everything You Need to Know"
        introParagraphs={[
          "MBA direct admission (management quota) is a legitimate, AICTE-recognized route for students who want to join Pune MBA colleges without competing in MAH-CET, CAT, or other entrance exams. All private and deemed university MBA colleges in Pune reserve 15-20% of their total intake for management/institutional quota.",
          "Direct admission at private Pune MBA colleges typically requires: graduation with 50% marks, a brief interview or GD-PI at the college, and payment of the management quota fees. Some colleges also conduct their own aptitude test for management quota shortlisting.",
          "Key advantage of direct admission: you can target the college you want regardless of MAH-CET score. Key disadvantage: you pay 1.5–2× higher fees and are not eligible for government EBC/scholarship programs. Calculate ROI carefully — if placement outcomes are the same, the higher fee may be justified.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "MBA Admission Process", href: "/mba-admission-process-pune" },
          { label: "MBA Cutoff Pune", href: "/mba-cutoff-pune" },
          { label: "MBA Under 10 Lakh", href: "/mba-colleges-in-pune-under-10-lakh" },
          { label: "MBA Accepting MAH-CET", href: "/mba-colleges-in-pune-accepting-mh-cet" },
          { label: "Direct Engineering Admission", href: "/direct-admission-engineering-colleges-pune" },
        ]}
        ctaHeading="Need Help with MBA Direct Admission in Pune?"
        ctaSubtext="Our counsellors know which colleges have management quota seats available — free guidance."
      />
    </>
  )
}
