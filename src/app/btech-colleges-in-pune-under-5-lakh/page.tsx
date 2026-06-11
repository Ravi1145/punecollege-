import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { btechColleges } from "@/data/btechColleges"
import BTechClusterPage from "@/components/btech/BTechClusterPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune Under 5 Lakh Total Fees 2026 | Affordable Engineering",
  description: "BTech colleges in Pune with total 4-year fees under ₹5 lakh. COEP (₹3.2L), PICT (₹5.6L), PCCOE, DYPCOE — top NAAC-accredited engineering colleges under ₹5 lakh total fees.",
  path: "/btech-colleges-in-pune-under-5-lakh",
  keywords: [
    "btech colleges in pune under 5 lakh", "engineering colleges pune under 5 lakh fees",
    "cheap btech colleges pune", "btech pune affordable fees",
    "low cost engineering pune", "btech under 5 lakh total fees pune",
  ],
})
export const revalidate = 300

const affordableColleges = btechColleges.filter(c => c.feesTotal.min <= 500000)

const faqs = [
  { question: "Which BTech colleges in Pune have total fees under 5 lakh?", answer: "BTech colleges in Pune with total 4-year fees under ₹5 lakh: COEP (₹3.2L–7.2L, govt — cheapest option), PICT (₹5.6L–7.6L — just above ₹5L minimum), PCCOE (₹5.4L–7.4L), DYPCOE (₹4.2L–6.2L), AISSMS COE (₹4.4L–6.2L). Government-aided colleges are the only ones consistently under ₹5L total." },
  { question: "Is COEP BTech fees really under 5 lakh total?", answer: "Yes. COEP's 4-year B.Tech fees range from ₹3.2L to ₹7.2L total depending on the course. For most branches (CS, Mechanical, Civil), fees are approximately ₹80,000–1,80,000/year, making the total 4-year cost around ₹3.2L–7.2L. For government seats (MHT-CET CAP), fees are on the lower end. This is extraordinary value for a NIRF #49 college." },
  { question: "What is the quality of BTech education at low-fee Pune colleges?", answer: "COEP (lowest fees in Pune) is NIRF #49 — one of India's top 50 engineering colleges. PICT and VIT Pune (₹5.6L–8.8L total) have NAAC A and A+ grades respectively with 85%+ placement rates. Low fees in Pune do NOT mean low quality — government subsidies make excellence affordable." },
  { question: "Can I get scholarship to further reduce BTech fees in Pune?", answer: "Yes. MahaDBT scholarship covers full tuition for SC/ST/OBC/EBC students (family income < ₹8L/year). AICTE Pragati gives girl students ₹50,000/year. EBC Freeship gives full fee waiver for Open category with income < ₹8L. With these schemes, BTech from COEP can cost under ₹50,000 total for qualifying students." },
]

export default function BTechUnder5Lakh() {
  const faqSchema = generateFAQSchema(faqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-in-pune" },
    { name: "Under 5 Lakh", url: "/btech-colleges-in-pune-under-5-lakh" },
  ])

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BTechClusterPage
        h1="BTech Colleges in Pune Under 5 Lakh Total Fees 2026"
        subtitle="Top NAAC-accredited BTech colleges in Pune with 4-year total fees under ₹5 lakh. Government and affordable autonomous engineering colleges."
        quickAnswer="COEP has the lowest BTech fees in Pune at ₹3.2L–7.2L total (4 years), government subsidized. DYPCOE and AISSMS also offer BTech under ₹5L total. COEP is NIRF #49 — proof that low fees doesn't mean low quality. Admission via MHT-CET CAP."
        stats={[
          { value: `${affordableColleges.length}+`, label: "Colleges Under ₹5L" },
          { value: "₹3.2L", label: "COEP Total (4yr)" },
          { value: "NIRF #49", label: "COEP Rank" },
          { value: "₹12 LPA", label: "COEP Avg Pkg" },
        ]}
        colleges={affordableColleges.length > 0 ? affordableColleges : btechColleges.slice(0, 4)}
        breadcrumbLabel="Under 5 Lakh"
        introHeading="BTech Under ₹5 Lakh in Pune — Is the Quality Good?"
        introParagraphs={[
          "The best BTech college in Pune — COEP — also has the lowest fees. This is because COEP is a government-funded autonomous institution established in 1854. The Maharashtra state government subsidizes tuition, allowing COEP to charge ₹80,000–1,80,000/year despite being ranked #49 nationally by NIRF.",
          "For students seeking BTech under ₹5L total in Pune, COEP and government-aided colleges like PICT (partial grant-in-aid) and AISSMS are the primary targets. These colleges require high MHT-CET percentile — COEP needs 99+ percentile for CS, while AISSMS accepts 70+ percentile.",
          "With government scholarships (MahaDBT, EBC Freeship), even the ₹3.2L COEP total fees can become near-zero for eligible students. SC/ST students and EBC students with family income below ₹8 lakh/year effectively get a free world-class engineering education at COEP.",
        ]}
        faqs={faqs}
        internalLinks={[
          { label: "BTech Under 10 Lakh", href: "/btech-colleges-in-pune-under-10-lakh" },
          { label: "BTech Fees Comparison", href: "/btech-colleges-in-pune-with-fees" },
          { label: "Low Fee Engineering Pune", href: "/low-fees-engineering-colleges-pune" },
          { label: "Engineering Scholarships", href: "/engineering-colleges-pune-scholarship" },
          { label: "Best BTech Colleges", href: "/best-btech-colleges-in-pune" },
        ]}
        ctaHeading="Target COEP or Low-Fee BTech in Pune?"
        ctaSubtext="Free counselling — get your MHT-CET cutoff target and scholarship eligibility assessment."
      />
    </>
  )
}
