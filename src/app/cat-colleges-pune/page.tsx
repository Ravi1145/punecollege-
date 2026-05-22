import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "CAT Colleges in Pune 2026 | MBA Colleges Accepting CAT | Cutoffs & Fees",
  description: "Top MBA colleges in Pune accepting CAT 2025 scores for 2026 admission. SIBM, SCMHRD, FLAME, MIT-WPU - CAT cutoffs (percentile-wise), fees, placement packages.",
  path: "/cat-colleges-pune",
  keywords: ["cat colleges pune", "mba colleges pune cat 2025", "cat cutoff pune mba", "cat accepting colleges pune 2026"],
})

export const revalidate = 300

const colleges = [
  { name: "Symbiosis Institute of Business Management (SIBM)", location: "Lavale", naac: "A+", fees: "₹8.5L (2yr)", placement: "₹28 LPA avg | CAT: 85%ile", slug: "sibm-symbiosis-institute-of-business-management" },
  { name: "Symbiosis Centre for Management & HRD (SCMHRD)", location: "Hinjewadi", naac: "A+", fees: "₹8.2L (2yr)", placement: "₹24 LPA avg | CAT: 80%ile", slug: "scmhrd-symbiosis-centre-management-hrd" },
  { name: "FLAME University School of Business", location: "Lavale", naac: "A+", fees: "₹12L (2yr)", placement: "₹14 LPA avg | CAT: 75%ile", slug: "flame-university-pune" },
  { name: "MIT School of Business (MIT-SOB)", location: "Kothrud", naac: "A+", fees: "₹6.5L (2yr)", placement: "₹10.5 LPA avg | CAT: 65%ile", slug: "mit-school-of-business-pune" },
  { name: "IIMS Pune", location: "Karve Nagar", naac: "A", fees: "₹5.5L (2yr)", placement: "₹12 LPA avg | CAT: 70%ile", slug: "iims-pune" },
  { name: "Balaji Institute of Modern Management (BIMM)", location: "Tathawade", naac: "A", fees: "₹5.5L (2yr)", placement: "₹9.5 LPA avg | CAT: 60%ile", slug: "bimm-balaji-institute-modern-management" },
  { name: "IndSearch Institute of Management", location: "Baner", naac: "A", fees: "₹4.5L (2yr)", placement: "₹8 LPA avg | CAT: 55%ile", slug: "indsearch-institute-management-pune" },
  { name: "Symbiosis Institute of Management Studies (SIMS)", location: "Wakad", naac: "A+", fees: "₹5.2L (2yr)", placement: "₹9 LPA avg | CAT: 60%ile", slug: "sims-symbiosis-pune" },
]

const faqs = [
  { q: "Which Pune MBA colleges accept CAT 2025 scores?", a: "Major Pune MBA colleges accepting CAT 2025: SIBM (cutoff 85+ percentile), SCMHRD (80+), FLAME University (75+), MIT-SOB (65+), IIMS Pune (70+), BIMM (60+), IndSearch (55+). Note: Symbiosis colleges primarily use SNAP, but also accept CAT as additional qualifying exam." },
  { q: "What CAT percentile is needed for top MBA colleges in Pune?", a: "SIBM Pune: 85+ percentile. SCMHRD: 80+ percentile. FLAME University: 75+ percentile. MIT-WPU MBA: 70+ percentile. IIMS Pune: 65-70 percentile. Mid-tier Pune MBA colleges: 55-65 percentile. These are minimum cutoffs - actual selection includes GD/PI performance." },
  { q: "Is CAT mandatory for MBA admission in Pune?", a: "No. Pune MBA colleges accept multiple entrance tests. CAT is one option. MAH-MBA-CET (for Maharashtra state quota), SNAP (Symbiosis), XAT, and GMAT are also widely accepted. MAH-CET is particularly important for state-level MBA CAP process." },
  { q: "What is the difference between CAT and SNAP for Pune MBA?", a: "SNAP (Symbiosis National Aptitude Test) is conducted by Symbiosis University specifically for its colleges including SIBM and SCMHRD. CAT is IIM-conducted and accepted more broadly. For Symbiosis colleges, SNAP score is mandatory in addition to CAT. Both are required for SIBM/SCMHRD admission." },
  { q: "Can I get MBA in SIBM Pune with 80 CAT percentile?", a: "CAT 80 percentile meets SIBM's minimum cutoff, but admission depends on SNAP score, GD/PI performance, work experience, and academics. In 2025 batch, SIBM Pune had final selection percentile of 90+ after including SNAP and interview rounds. 80 CAT percentile requires exceptional interview performance." },
]

export default function CatCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "CAT Colleges in Pune", url: "/cat-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CAT MBA Colleges in Pune 2026",
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
        breadcrumb={[{ label: "CAT Colleges in Pune", href: "/cat-colleges-pune" }]}
        h1="CAT MBA Colleges in Pune 2026"
        subtitle="MBA colleges in Pune accepting CAT 2025 scores. Compare CAT cutoffs (percentile-wise), total fees, placement packages, and GD/PI requirements for 2026 admission."
        heroStats={[
          { value: "15+", label: "CAT MBA Colleges" },
          { value: "₹28 LPA", label: "Best Avg Package" },
          { value: "55-85%ile", label: "CAT Cutoff Range" },
          { value: "Nov 2025", label: "CAT 2025 Date" },
        ]}
        introHeading="CAT MBA Colleges in Pune: Percentile Guide for 2026"
        introParagraphs={[
          "CAT (Common Admission Test) conducted by IIMs is India's most prestigious MBA entrance exam, accepted by hundreds of B-schools including top Pune management colleges. While IIMs require 98+ percentile, Pune's best MBA colleges - SIBM, SCMHRD, and FLAME University - accept CAT scores starting at 75-85 percentile, making them realistic aspirations for strong CAT performers.",
          "Pune's MBA ecosystem built around Symbiosis International University is unique because these colleges primarily use SNAP (Symbiosis National Aptitude Test) but also consider CAT/XAT scores. Students who clear both SNAP and have a good CAT score significantly strengthen their SIBM/SCMHRD application. For non-Symbiosis colleges, CAT alone is sufficient.",
          "The 2026 MBA admission season begins with CAT 2025 (November 2025). After results (January 2026), Pune MBA colleges issue shortlists for GD/PI/WAT rounds (February-April 2026). Merit lists follow in April-May 2026, with programs starting June 2026. Preparing a strong profile - work experience, leadership activities, SOP - is as crucial as CAT score for top Pune B-schools.",
        ]}
        colleges={colleges}
        whyHeading="CAT MBA in Pune vs Other Cities"
        whyPoints={[
          { title: "SIBM as IIM Alternative", description: "SIBM Pune consistently ranks in India's top 15 B-schools and is often called 'the best non-IIM MBA' by recruiters. With a 85+ CAT percentile, SIBM offers IIM-comparable placements at significantly lower fees." },
          { title: "Industry-Integrated Learning", description: "Pune's MBA colleges leverage the city's corporate density for live projects with Bajaj, Infosys, and Whirlpool. Students apply classroom learning to real business challenges, creating stronger career-ready graduates." },
          { title: "Symbiosis Ecosystem Advantage", description: "Pune hosts SIBM, SCMHRD, SIIB, SIMS - multiple Symbiosis MBA colleges. With one SNAP exam, students can apply to all simultaneously, maximizing admission chances across the Symbiosis network." },
          { title: "Lower Fees Than Delhi/Mumbai", description: "SIBM charges ₹8.5L for 2 years vs ₹20L+ at equivalent Delhi B-schools. Pune living costs are 30% lower than Mumbai. The total 2-year investment is significantly lower than comparable metros." },
          { title: "Finance & Consulting Roles", description: "Pune MBA graduates access finance roles at Deutsche Bank, BNY Mellon, and HSBC; consulting roles at McKinsey, BCG, and Deloitte; and product management roles at IT companies - a diverse career spectrum." },
          { title: "CAT + SNAP Double Strategy", description: "Preparing for both CAT and SNAP allows Pune MBA aspirants to maximize college options. SNAP preparation (different pattern) adds minimal effort while opening doors to all Symbiosis colleges." },
        ]}
        admissionHeading="CAT to Pune MBA: Complete Admission Timeline 2026"
        admissionSteps={[
          { step: "1", title: "Register for CAT 2025 (August-September 2025)", description: "Register at iimcat.ac.in from August-September 2025. Exam fee: ₹2,200 (general). Prepare 6 months in advance. Target: 80+ for SCMHRD, 85+ for SIBM. Focus on Verbal, DI/LR, and Quantitative Ability." },
          { step: "2", title: "Register for SNAP 2025 (if targeting Symbiosis)", description: "SNAP 2025 registration opens at snaptest.org around August 2025. SNAP is conducted in 3 slots in December. SNAP score is mandatory for SIBM/SCMHRD. Prepare SNAP alongside CAT." },
          { step: "3", title: "Apply to Pune MBA Colleges (Jan-Feb 2026)", description: "After CAT results (January 2026), apply to shortlisted colleges. Submit: SOP, updated CV, academic transcripts, work experience certificates. Application fees range from ₹1,500-2,500 per college." },
          { step: "4", title: "Attend GD/PI/WAT Rounds (Feb-April 2026)", description: "Prepare for: Group Discussion (current business events, Pune industry context), Personal Interview (HR questions, career story, MBA goal clarity), Written Ability Test (structured essay on business topics). SIBM and SCMHRD are very competitive at this stage." },
          { step: "5", title: "Accept Offer & Plan Finances", description: "Final merit lists released April-May 2026. Accept offer within 7 days to secure seat. Arrange education loan or fees payment. Orientation begins June 2026 at most Pune MBA colleges." },
        ]}
        faqs={faqs}
        ctaHeading="Maximize Your CAT Score for the Best Pune MBA College"
        ctaSubtext="Get personalized college shortlisting based on your CAT percentile, work experience, and academic profile. Our MBA counsellors have placed 1,000+ students in top Pune B-schools."
      relatedGuides={[
        { label: "Best MBA Colleges in Pune 2026", href: "/mba-colleges-pune", icon: "🏛️" },
        { label: "Top 10 MBA Colleges — Ranked", href: "/top-10-mba-colleges-in-pune", icon: "🏆" },
        { label: "MBA Placement Guide — LPA Stats", href: "/mba-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees MBA Colleges in Pune", href: "/low-fees-mba-colleges-pune", icon: "💰" },
        { label: "MBA Scholarships in Pune", href: "/mba-colleges-pune-scholarship", icon: "🎓" },
        { label: "PGDM Colleges in Pune", href: "/pgdm-colleges-pune", icon: "📊" },
        { label: "Admission Without CAT (MAH-CET)", href: "/mba-admission-pune-without-cat", icon: "🚀" },
      ]}
      />
    </>
  )
}
