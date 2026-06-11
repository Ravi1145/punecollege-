import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Direct Admission in Pune 2026 | Without MHT-CET | Management Quota",
  description: "BTech direct admission in Pune 2026 without MHT-CET. Management quota, NRI quota seats at top engineering colleges. Fees, process, eligibility and documents.",
  path: "/btech-colleges-in-pune-direct-admission",
  keywords: [
    "btech direct admission pune", "btech without mht cet pune",
    "engineering management quota pune", "direct btech admission pune 2026",
    "btech admission without entrance exam pune", "management quota btech pune fees",
  ],
})
export const revalidate = 300

const faqs = [
  { question: "How to get direct BTech admission in Pune without MHT-CET?", answer: "Direct BTech admission in Pune without MHT-CET is available through: (1) Management quota (15% of seats) at private engineering colleges — apply directly to the college. (2) NRI/NRI-sponsored quota. (3) Direct admission at deemed universities (MIT-WPU, SIT) through their own entrance test (no MHT-CET required). (4) Spot admission rounds after CAP for vacant seats." },
  { question: "What are the management quota BTech fees in Pune?", answer: "Management quota BTech fees in Pune are typically 1.5–2× the regular CAP fees. Examples: VIT Pune CAP ₹1.6L/yr, management quota ₹2.5–3L/yr. MIT-WPU direct: ₹3L–4.5L/yr. PCCOE management: ₹2–2.8L/yr. Note: COEP is a government college — no management quota available." },
  { question: "Is BTech direct admission valid and AICTE approved?", answer: "Yes. BTech management quota admission is 100% AICTE-approved and valid. The degree is identical to merit/CAP seats — same faculty, same exams, same university degree. Management quota students attend all the same classes and get the same SPPU/deemed university BTech certificate." },
  { question: "What documents are needed for BTech direct admission in Pune?", answer: "Documents for BTech direct admission in Pune: 12th (HSC) marksheet with PCM subjects and minimum 50% marks, 10th marksheet, Aadhar card, category certificate (if applicable), domicile certificate, passport photos, allotment refusal letter (if previously allotted in CAP but want direct at better college), and management quota fee payment." },
  { question: "Can I get direct BTech admission in COEP or PICT Pune?", answer: "COEP is a government autonomous college — no management quota. Direct admission not possible at COEP. PICT is an aided autonomous college — very limited management quota, if any. Direct admission is primarily at private unaided and deemed universities: MIT-WPU, SIT Pune, PCCOE, VIT Pune, DYPCOE, AISSMS, and Sinhgad group colleges." },
]

export default function BTechDirectAdmission() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Direct Admission", url: "/btech-colleges-in-pune-direct-admission" },
  ])
  const privateColleges = btechColleges.filter(c => c.type !== "Government")

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BTechClusterPage
        h1="BTech Direct Admission in Pune 2026 | Without MHT-CET"
        subtitle="Management quota and NRI quota BTech admission in Pune without MHT-CET. Fees, process and eligible colleges."
        quickAnswer="BTech direct admission in Pune (without MHT-CET) is available via management quota (15% of seats) at private colleges: MIT-WPU, SIT Pune, VIT Pune, PCCOE, DYPCOE. Fees are 1.5–2× higher than CAP seats. COEP/PICT don't have management quota."
        stats={[
          { value: "15%", label: "Mgmt Quota Seats" },
          { value: "No Exam", label: "MHT-CET Not Needed" },
          { value: "Same Degree", label: "Identical to CAP" },
          { value: "Aug 2026", label: "Classes Begin" },
        ]}
        colleges={privateColleges}
        breadcrumbLabel="Direct Admission"
        introHeading="BTech Direct Admission in Pune — Everything You Need to Know"
        introParagraphs={[
          "BTech direct admission (management quota) allows students to join top Pune engineering colleges without clearing MHT-CET or JEE Main. All private engineering colleges in Pune reserve 15% of their total intake for management quota under AICTE regulations.",
          "The direct admission process: Contact the college admissions office → Submit 12th marksheet (PCM, 50%+ aggregate) → Attend a brief interview at the college → Pay management quota fees → Submit documents → Complete enrollment. Most colleges process direct admissions July–September 2026.",
          "Important: Management quota at deemed universities (MIT-WPU, SIT Pune) works differently — they may require their own entrance test (MIT-WPU CET or SET for SIT) rather than MHT-CET. This is still a direct admission route without the DTE Maharashtra CAP process.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "BTech via MHT-CET", href: "/btech-colleges-in-pune-through-mht-cet" },
          { label: "BTech Admission Guide", href: "/btech-admission-in-pune" },
          { label: "BTech Fees Pune", href: "/btech-colleges-in-pune-with-fees" },
          { label: "Direct Engineering Admission", href: "/direct-admission-engineering-colleges-pune" },
          { label: "BTech without JEE", href: "/btech-colleges-in-pune-without-jee" },
        ]}
        ctaHeading="Need Help with BTech Direct Admission in Pune?"
        ctaSubtext="Our counsellors know which colleges have management quota available — free guidance, no middleman fees."
      />
    </>
  )
}
