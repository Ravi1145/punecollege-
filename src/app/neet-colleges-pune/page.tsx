import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "NEET Colleges in Pune 2026 | Medical Colleges | NEET Cutoffs & Seats",
  description: "Medical colleges in Pune accepting NEET 2026. BJMC, AFMC, DY Patil, Bharati Vidyapeeth - NEET cutoffs (score-wise), MBBS seats, fees, and Maharashtra state quota admission.",
  path: "/neet-colleges-pune",
  keywords: ["neet colleges pune", "medical colleges pune neet 2026", "neet cutoff pune mbbs", "neet admission pune", "mbbs neet pune"],
})

export const revalidate = 300

const colleges = [
  { name: "BJ Government Medical College (BJMC)", location: "Shivajinagar", naac: "A+", fees: "₹1L-2L/yr", placement: "NEET Cutoff: 630+ (General)", slug: "bj-government-medical-college-pune" },
  { name: "Armed Forces Medical College (AFMC)", location: "Wanowrie", naac: "A++", fees: "Fully Sponsored", placement: "NEET + AFMC Test Required", slug: "afmc-armed-forces-medical-college-pune" },
  { name: "D.Y. Patil Medical College Pimpri", location: "Pimpri", naac: "A+", fees: "₹18L-22L/yr", placement: "NEET Cutoff: 540+ (Mgmt)", slug: "dy-patil-medical-college-pimpri-pune" },
  { name: "Bharati Vidyapeeth Medical College", location: "Dhankawadi", naac: "A", fees: "₹12L-16L/yr", placement: "NEET Cutoff: 530+ (Mgmt)", slug: "bharati-vidyapeeth-medical-college-pune" },
  { name: "Sinhgad Institute of Medical Sciences", location: "Ambegaon", naac: "B+", fees: "₹8L-12L/yr", placement: "NEET Cutoff: 510+ (Mgmt)", slug: "sinhgad-institute-medical-sciences-pune" },
  { name: "Command Hospital Medical College", location: "Pune Cantonment", naac: "A", fees: "₹6L-10L/yr", placement: "Armed Forces Priority", slug: "command-hospital-medical-college-pune" },
  { name: "Dr. D.Y. Patil Medical College (DYPMC)", location: "Nerul/DY Patil Campus", naac: "A", fees: "₹14L-18L/yr", placement: "NEET Cutoff: 520+ (Mgmt)", slug: "dy-patil-medical-college-pune" },
  { name: "Dr. Vithalrao Vikhe Patil College of Medicine", location: "Ahmednagar Road", naac: "A", fees: "₹10L-15L/yr", placement: "NEET Cutoff: 520+", slug: "vvpmc-pune" },
]

const faqs = [
  { q: "What NEET score is required for MBBS at BJMC Pune?", a: "BJ Government Medical College (BJMC) requires 630-650+ NEET score for General category via All India Quota. State Quota (Maharashtra residents) requires approximately 600-640 NEET score. OBC requires 580-620. SC/ST requires 550-590. Exact cutoffs vary yearly based on total candidates." },
  { q: "How many MBBS seats are available in Pune via NEET 2026?", a: "Pune medical colleges have approximately 1,200+ MBBS seats total: BJMC (150 seats), AFMC (150 seats), DY Patil Pimpri (250 seats), Bharati Vidyapeeth (150 seats), Sinhgad Medical (150 seats), Command Hospital (100 seats), DYPMC (150 seats). Actual seat matrix varies by year." },
  { q: "What is the process for NEET to MBBS admission in Pune?", a: "Step 1: Qualify NEET UG (May 2026). Step 2: Apply for MCC counselling for 15% AIQ seats at BJMC. Step 3: Register for Maharashtra DMER State Quota counselling (85% seats). Step 4: Apply directly to private medical colleges for management quota." },
  { q: "Can I get MBBS in Pune with 500 NEET score?", a: "Government MBBS at BJMC is not possible with 500 score (requires 600-640). Private management quota seats at lower-tier Pune medical colleges (Sinhgad Medical, DYPMC) may be possible with 500+ score but cost ₹8-18L/year. NRI quota seats have no minimum NEET score requirement but cost ₹80L-1.5Cr total." },
  { q: "Does AFMC Pune require only NEET?", a: "No. AFMC admission requires: NEET UG score (600+) + AFMC written exam (conducted separately by AFMC) + SSB (Services Selection Board) interview. It's the most competitive medical college in Pune, with less than 150 seats for civilian candidates. Army commitments apply post-graduation." },
]

export default function NeetCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "NEET Colleges in Pune", url: "/neet-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NEET Medical Colleges in Pune 2026",
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
        breadcrumb={[{ label: "NEET Colleges in Pune", href: "/neet-colleges-pune" }]}
        h1="NEET Colleges in Pune 2026"
        subtitle="Complete guide to medical colleges in Pune accepting NEET 2026. Includes BJMC, AFMC, DY Patil Medical - NEET cutoffs, MBBS seats, fees, and state quota vs management quota strategy."
        heroStats={[
          { value: "10+", label: "NEET Medical Colleges" },
          { value: "1,200+", label: "MBBS Seats" },
          { value: "NEET 630+", label: "Govt College Cutoff" },
          { value: "May 2026", label: "NEET UG Date" },
        ]}
        introHeading="NEET Colleges in Pune: MBBS Admission Guide 2026"
        introParagraphs={[
          "NEET UG (National Eligibility cum Entrance Test) is the only pathway to MBBS admission in Pune. All 10+ medical colleges in Pune mandatorily use NEET scores for MBBS seat allotment since 2020. The test covers Physics, Chemistry, and Biology (Botany + Zoology) from Class 11 and 12 curricula and is conducted by NTA annually in May.",
          "Pune's medical colleges range from the historic BJ Government Medical College (est. 1946) - one of Maharashtra's premier MBBS institutions - to modern private colleges under DY Patil University and Bharati Vidyapeeth. The spectrum of fee structures (₹1L/year at BJMC to ₹22L/year at private colleges) creates options across different NEET score ranges.",
          "Maharashtra's medical seat allocation follows a dual-track system: 15% All India Quota (AIQ) allotted by Medical Counselling Committee (MCC) at New Delhi through josaa counselling, and 85% State Quota managed by Maharashtra DMER (Directorate of Medical Education and Research) in Mumbai. Private college management quota seats are filled directly through college-level counselling.",
        ]}
        colleges={colleges}
        whyHeading="Why Study Medicine in Pune?"
        whyPoints={[
          { title: "Prestigious BJMC Hospital Training", description: "BJMC students train at Sassoon General Hospital (1,400+ beds) - one of Maharashtra's largest public hospitals with enormous patient diversity, creating unparalleled clinical training exposure." },
          { title: "AFMC - Army Medical College", description: "AFMC Pune is India's premier armed forces medical college. Graduates serve as Army Medical Corps officers with excellent career progression, travel opportunities, and post-service civilian careers." },
          { title: "Strong NEET PG Preparation", description: "Pune's medical coaching ecosystem (coaching institutes in Shivajinagar, Deccan) and college libraries are excellent for NEET PG preparation. Pune consistently produces NEET PG qualifiers for MD/MS admissions." },
          { title: "Research & Specialization Hub", description: "Pune's medical colleges collaborate with Aga Khan University Hospital, Ruby Hall Clinic, and Jehangir Hospital for specialty training. These teaching hospital attachments enhance clinical skills during MBBS." },
          { title: "Post-MBBS Career Options", description: "MBBS from Pune qualifies you for: MD/MS (specialization), MBBS government job (PHC, civil hospital), private practice, medical research, pharmaceutical industry, hospital management MBA, and international medical licensing exams (USMLE, PLAB)." },
          { title: "Relatively Lower Cost Than Mumbai", description: "Medical college fees and living costs in Pune are 20-30% lower than equivalent Mumbai medical colleges. BJMC government fee is one of Maharashtra's lowest at ₹1-2L/year for top-quality education." },
        ]}
        admissionHeading="NEET to MBBS Admission in Pune: Step-by-Step 2026"
        admissionSteps={[
          { step: "1", title: "Register for NEET UG 2026 at NTA", description: "Register at nta.ac.in from January-February 2026. NEET exam fee: ₹1,700 (general). Exam date: typically May 2026 (Sunday). Prepare with NCERT Biology (60% weightage), Physics and Chemistry (40% combined). Target 600+ for government MBBS." },
          { step: "2", title: "AFMC Aspirants: Register Separately", description: "AFMC has a separate application at afmc.nic.in. Along with NEET, candidates must qualify AFMC's own written test and SSB interview. Applications typically open March-April 2026. Limited to Indian nationals." },
          { step: "3", title: "Check NEET Results & Rank (June 2026)", description: "NEET results published at nta.ac.in. Download your scorecard. Your rank determines AIQ (All India Quota) eligibility via MCC and Maharashtra State Quota eligibility via DMER." },
          { step: "4", title: "MCC Counselling for AIQ (15% BJMC Seats)", description: "Register on mcc.nic.in after NEET results. AIQ counselling happens in 2 rounds (July 2026). 15% BJMC seats are allotted here. Requires NEET 630+ for general category at BJMC." },
          { step: "5", title: "Maharashtra DMER State Quota (85% Seats)", description: "Register on Maharashtra DMER portal for state quota counselling (85% seats). Requires Maharashtra domicile. Slightly lower cutoffs than AIQ. Private college management quota: apply directly to colleges - fees are higher but NEET cutoffs are lower." },
        ]}
        faqs={faqs}
        ctaHeading="Need NEET Admission Guidance for Pune Medical Colleges?"
        ctaSubtext="Our medical admission counsellors specialize in Maharashtra NEET quotas. Get free guidance on state quota vs management quota strategy, BJMC vs private college trade-offs, and scholarship options."
      relatedGuides={[
        { label: "All Medical Colleges in Pune 2026", href: "/medical-colleges-pune", icon: "🏥" },
        { label: "MBBS Colleges — NEET Cutoffs & Fees", href: "/mbbs-colleges-pune", icon: "🎓" },
        { label: "Top 10 Medical Colleges — Ranked", href: "/top-10-medical-colleges-in-pune", icon: "🏆" },
        { label: "NAAC A+ Colleges in Pune", href: "/naac-a-plus-colleges-pune", icon: "⭐" },
        { label: "Pharmacy Colleges in Pune", href: "/pharmacy-colleges-pune", icon: "💊" },
        { label: "Free Medical Counselling", href: "/counselling", icon: "📞" },
      ]}
      />
    </>
  )
}
