import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "MBBS Colleges in Pune 2026 | Medical Admission | NEET Cutoffs & Fees",
  description: "Top MBBS colleges in Pune 2026. BJ Medical College, Armed Forces Medical College, DY Patil Medical - NEET cutoffs, fees (₹1L-1.5Cr), seats & admission guide.",
  path: "/mbbs-colleges-pune",
  keywords: ["mbbs colleges pune", "medical colleges pune neet", "mbbs admission pune 2026", "neet cutoff pune mbbs", "mbbs fees pune"],
})

export const revalidate = 300

const colleges = [
  { name: "BJ Government Medical College (BJMC)", location: "Shivajinagar", naac: "A+", fees: "₹1L-2L/yr", placement: "100% match rate", slug: "bj-government-medical-college-pune" },
  { name: "Armed Forces Medical College (AFMC)", location: "Wanowrie", naac: "A++", fees: "Fully Sponsored", placement: "Army Medical Service", slug: "afmc-armed-forces-medical-college-pune" },
  { name: "D.Y. Patil Medical College Pimpri", location: "Pimpri", naac: "A+", fees: "₹18L-22L/yr", placement: "Hospital Residency", slug: "dy-patil-medical-college-pimpri-pune" },
  { name: "Bharati Vidyapeeth Medical College", location: "Dhankawadi", naac: "A", fees: "₹12L-16L/yr", placement: "Hospital Placements", slug: "bharati-vidyapeeth-medical-college-pune" },
  { name: "Dr. D.Y. Patil Medical College (Nerul)", location: "Nerul/Pune", naac: "A", fees: "₹14L-18L/yr", placement: "Residency Programs", slug: "dy-patil-medical-college-pune" },
  { name: "Sinhgad Institute of Medical Sciences", location: "Ambegaon", naac: "B+", fees: "₹8L-12L/yr", placement: "Hospital Network", slug: "sinhgad-institute-medical-sciences-pune" },
  { name: "Command Hospital Medical College", location: "Pune Cantonment", naac: "A", fees: "₹6L-10L/yr", placement: "Armed Forces Priority", slug: "command-hospital-medical-college-pune" },
  { name: "Datta Meghe Medical College", location: "Hingna/Pune", naac: "A", fees: "₹10L-14L/yr", placement: "Hospital Residency", slug: "datta-meghe-medical-college-pune" },
]

const faqs = [
  { q: "What is the NEET cutoff for MBBS in Pune government colleges?", a: "BJ Government Medical College (BJMC) requires 630-650+ NEET score for general category students. SC/ST candidates require 560-590. AFMC has its own selection process - NEET + AFMC written test + SSB interview. Government MBBS seats in Pune are extremely competitive." },
  { q: "What is the fee for MBBS in Pune?", a: "Government MBBS (BJMC) costs ₹1-2L/year (₹5-10L total). AFMC is fully sponsored by the Army. Private MBBS colleges charge ₹8-22L/year (₹40L-1.5Cr total for 5.5 years). Government-aided private colleges offer some subsidized seats via MCC/State Quota." },
  { q: "How many MBBS seats are there in Pune government colleges?", a: "BJ Government Medical College has 150 MBBS seats per year. 85 seats are under All India Quota (MCC), remaining 65 under State Quota (Maharashtra DMER). AFMC has 150 seats per year reserved for Armed Forces and civilian candidates." },
  { q: "Can I get MBBS in Pune with 600 NEET score?", a: "With 600 NEET score, government colleges like BJMC are unlikely unless you're in SC/ST/OBC category. Private MBBS colleges in Pune (DY Patil, Bharati Vidyapeeth) accept 530-580 NEET scores for management quota seats. NRI seats have no NEET score requirement but cost ₹80L-1.5Cr." },
  { q: "What is the duration of MBBS in Pune?", a: "MBBS is a 5.5-year program (4.5 years academic + 1 year compulsory rotating internship). All Pune MBBS colleges follow the National Medical Commission (NMC) approved curriculum. After MBBS, most graduates pursue MD/MS (3 years) through NEET PG." },
]

export default function MbbsCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBBS Colleges in Pune", url: "/mbbs-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MBBS Colleges in Pune 2026",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `https://collegepune.com/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "MBBS Colleges in Pune", href: "/mbbs-colleges-pune" }]}
        h1="MBBS Colleges in Pune 2026"
        subtitle="Complete guide to MBBS admission in Pune. Compare NEET cutoffs, fees, seats, and hospitals attached to Pune's government and private MBBS colleges for 2026 admission."
        heroStats={[
          { value: "10+", label: "MBBS Colleges" },
          { value: "NEET 630+", label: "Govt College Cutoff" },
          { value: "₹1L-22L/yr", label: "Annual Fees Range" },
          { value: "5.5 Years", label: "Program Duration" },
        ]}
        introHeading="MBBS Colleges in Pune: Complete Admission Guide 2026"
        introParagraphs={[
          "Pune is home to some of India's most prestigious MBBS colleges, led by the historic BJ Government Medical College (BJMC) established in 1946 and the Armed Forces Medical College (AFMC), one of only three Army medical colleges in India. These institutions are supplemented by several private medical colleges under deemed universities, offering 1,500+ MBBS seats annually.",
          "MBBS admission in Pune is entirely NEET-based. The National Medical Commission (NMC) mandates NEET scores for all MBBS admissions. 15% of seats in government colleges go through All India Quota (controlled by MCC, New Delhi), while 85% go through State Quota (controlled by Maharashtra DMER, Mumbai). Private colleges split seats into Government Quota, Management Quota, and NRI Quota.",
          "The fee structure for MBBS in Pune varies dramatically: BJ Government Medical College charges just ₹1-2L/year for government quota seats, while private medical colleges like DY Patil Pimpri charge ₹18-22L/year for management quota seats. AFMC is unique - the Army fully sponsors MBBS with stipend, in exchange for 7 years of Army medical service commitment.",
        ]}
        colleges={colleges}
        whyHeading="Why Study MBBS in Pune?"
        whyPoints={[
          { title: "World-Class Hospital Exposure", description: "Pune MBBS students get clinical training at KEM Hospital, Sassoon General Hospital, DY Patil Hospital, and Jehangir Hospital - exposing them to 1,000+ bed multi-specialty hospitals with diverse patient cases." },
          { title: "Medical Research Culture", description: "BJMC and AFMC have active medical research programs funded by ICMR and DST. Students can participate in clinical trials, publish papers, and gain research experience during MBBS itself." },
          { title: "NEET PG Preparation Support", description: "Pune's medical coaching ecosystem and college libraries support intensive NEET PG preparation. Hundreds of Pune MBBS graduates qualify NEET PG annually for MD/MS admissions at AIIMS and top medical institutions." },
          { title: "PG & Specialization Opportunities", description: "After MBBS from Pune, graduates can pursue MD/MS at BJMC, Armed Forces Medical Center, or private medical colleges in Pune - making it a complete medical education ecosystem." },
          { title: "Strong Medical Community", description: "The Pune Indian Medical Association (IMA) chapter, medical conferences at BJMC, and Maharashtra Medical Council events give Pune MBBS students strong professional networking from college days." },
          { title: "Affordable City for Medical Students", description: "Compared to Mumbai medical colleges, Pune offers 40% lower accommodation costs. Private medical coaching institutes in Pune for NEET PG preparation are also more affordable." },
        ]}
        admissionHeading="MBBS Admission Process in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Qualify NEET UG 2026", description: "NEET UG is conducted in May 2026. Target 650+ for government MBBS colleges in Pune. AFMC requires NEET + separate AFMC written exam. Register on nta.ac.in for NEET and afmc.nic.in for AFMC." },
          { step: "2", title: "Register for MCC Counselling (All India Quota)", description: "15% seats in BJMC fall under All India Quota, counselled by Medical Counselling Committee (MCC) at mcc.nic.in. Register, pay fees, and lock choices during Round 1 counselling (July 2026)." },
          { step: "3", title: "Maharashtra DMER State Quota (85% Seats)", description: "85% of government MBBS seats are allocated by Maharashtra DMER (Directorate of Medical Education and Research). Register on cetcell.mahacet.org. Domicile certificate is required for state quota." },
          { step: "4", title: "Private College Direct/Management Quota", description: "If state quota NEET cutoff is too high, apply to private MBBS colleges like DY Patil, Bharati Vidyapeeth directly. Management quota seats cost more but have lower NEET cutoffs (530-580)." },
          { step: "5", title: "Document Verification & Reporting", description: "After seat allotment, report to the college with original documents (NEET scorecard, class 10/12 certificates, caste certificate, medical fitness certificate, migration certificate). Pay fees and begin MBBS." },
        ]}
        faqs={faqs}
        ctaHeading="Need Help with MBBS Admission in Pune?"
        ctaSubtext="Our medical admission counsellors guide NEET aspirants through BJMC, AFMC, and private MBBS college admissions in Pune. Get free, expert guidance on state quota vs management quota strategy."
      relatedGuides={[
        { label: "All Medical Colleges in Pune 2026", href: "/medical-colleges-pune", icon: "🏥" },
        { label: "NEET Colleges & Category Cutoffs", href: "/neet-colleges-pune", icon: "📝" },
        { label: "Top 10 Medical Colleges — Ranked", href: "/top-10-medical-colleges-in-pune", icon: "🏆" },
        { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
        { label: "Pharmacy Colleges in Pune", href: "/pharmacy-colleges-pune", icon: "💊" },
        { label: "Free Medical Counselling", href: "/counselling", icon: "📞" },
      ]}
      />
    </>
  )
}
