import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "MHT-CET Colleges in Pune 2026 | Cutoffs, Seats & Admission Guide",
  description: "Best colleges in Pune accepting MHT-CET 2026. Compare MHT-CET cutoffs (percentile-wise), seats, fees, and admission process for engineering colleges via CAP rounds.",
  path: "/mht-cet-colleges-pune",
  keywords: ["mht cet colleges pune", "mht cet pune admission 2026", "mht cet cutoff pune", "cap round pune 2026", "mht cet engineering colleges pune"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K/yr", placement: "₹12 LPA avg | Cutoff: 99.5%ile CSE", slug: "coep-college-of-engineering-pune" },
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.4L/yr", placement: "₹7.5 LPA avg | Cutoff: 95-97%ile CS", slug: "pict-pune-institute-of-computer-technology" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L/yr", placement: "₹8.5 LPA avg | Cutoff: 88-92%ile", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "JSPM Rajarshi Shahu College of Engineering", location: "Tathawade", naac: "A", fees: "₹1.2L/yr", placement: "₹5.2 LPA avg | Cutoff: 65-75%ile", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
  { name: "Sinhgad College of Engineering", location: "Vadgaon", naac: "A", fees: "₹1.15L/yr", placement: "₹4.9 LPA avg | Cutoff: 60-70%ile", slug: "sinhgad-college-of-engineering-pune" },
  { name: "AISSMS College of Engineering", location: "Kennedy Road", naac: "A", fees: "₹1.1L/yr", placement: "₹4.8 LPA avg | Cutoff: 60-70%ile", slug: "aissms-college-of-engineering-pune" },
  { name: "Bharati Vidyapeeth College of Engineering", location: "Dhankawadi", naac: "A", fees: "₹1.45L/yr", placement: "₹5.6 LPA avg | Cutoff: 68-78%ile", slug: "bharati-vidyapeeth-college-engineering-pune" },
  { name: "D.Y. Patil College of Engineering Akurdi", location: "Akurdi", naac: "A", fees: "₹1.05L/yr", placement: "₹5.1 LPA avg | Cutoff: 55-65%ile", slug: "dy-patil-college-engineering-akurdi-pune" },
]

const faqs = [
  { q: "What is MHT-CET and which Pune colleges accept it?", a: "MHT-CET (Maharashtra Common Entrance Test) is conducted by Maharashtra State Common Entrance Test Cell. Almost all 50+ engineering colleges in Pune accept MHT-CET for state quota seats. Government engineering colleges like COEP exclusively use MHT-CET/JEE for admissions." },
  { q: "What MHT-CET percentile is needed for COEP Pune?", a: "COEP Computer Engineering requires 99.5+ percentile in MHT-CET. COEP Mechanical/Electronics requires 90-95 percentile. These cutoffs are for Open (General) category. OBC: 5-8 percentile relaxation. SC/ST: 15-20 percentile relaxation." },
  { q: "What is the CAP (Centralized Admission Process) for MHT-CET?", a: "CAP is the merit-based seat allotment process conducted by MHT-CET Cell in 3 rounds (July-August). Students register on cetcell.mahacet.org, fill college preferences, and seats are allotted based on percentile and category. No direct admission in government/aided colleges - only through CAP." },
  { q: "Can I use MHT-CET score for MBA admission in Pune?", a: "Yes. MAH-MBA-CET (different from PCM-based MHT-CET) is the MBA entrance test for CAP in Maharashtra. Score required for SIBM/SCMHRD via MAH-CET: 99+ percentile. For mid-tier MBA colleges: 80-90 percentile. Apply at cetcell.mahacet.org for MBA CAP." },
  { q: "What happens if I don't get allotted in CAP Round 1?", a: "If Round 1 does not allot your preferred college, you can freeze (accept current allotment), float (upgrade if better seat opens in Round 2), or slide (upgrade only within same college). Round 2 and Round 3 fill remaining seats. After all rounds, vacant seats go for direct admission at colleges." },
]

export default function MhtCetCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MHT-CET Colleges in Pune", url: "/mht-cet-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MHT-CET Colleges in Pune 2026",
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
        breadcrumb={[{ label: "MHT-CET Colleges in Pune", href: "/mht-cet-colleges-pune" }]}
        h1="MHT-CET Colleges in Pune 2026"
        subtitle="Complete guide to Pune engineering colleges accepting MHT-CET scores. Includes percentile-wise cutoffs for COEP, PICT, VIT Pune and the full CAP round process."
        heroStats={[
          { value: "50+", label: "MHT-CET Colleges" },
          { value: "99.5%ile", label: "COEP CS Cutoff" },
          { value: "3 Rounds", label: "CAP Process" },
          { value: "July-Aug", label: "Allotment Period" },
        ]}
        introHeading="MHT-CET Colleges in Pune: Percentile Guide & CAP Process 2026"
        introParagraphs={[
          "MHT-CET (Maharashtra Common Entrance Test) is the gateway to engineering admissions in Pune for Maharashtra residents. Conducted by Maharashtra State Common Entrance Test Cell, MHT-CET PCM tests Class 11 and 12 content in Physics, Chemistry, and Mathematics. The exam is conducted in April-May 2026 and results determine eligibility for 50+ engineering colleges in Pune via the Centralized Admission Process (CAP).",
          "The CAP (Centralized Admission Process) is Pune's seat allotment mechanism - a transparent, online merit-based system where students fill college preferences in priority order and seats are allotted based on percentile rank within category. Three rounds of allotment happen in July-August, with options to Freeze (keep current seat), Float (upgrade to better seat if available), or Slide (upgrade within same college).",
          "MHT-CET cutoffs vary dramatically across branches and colleges. Computer Engineering is the most competitive branch at top colleges. Mechanical, Civil, and Chemical Engineering branches have lower cutoffs at the same colleges. Understanding category-wise cutoffs (Open, OBC, SC, ST, EWS) is crucial for planning your college preferences in CAP rounds.",
        ]}
        colleges={colleges}
        whyHeading="Understanding MHT-CET Admission in Pune"
        whyPoints={[
          { title: "Transparent Merit-Based Process", description: "CAP eliminates capitation fees and corruption in engineering admissions. Seat allotment is 100% based on MHT-CET percentile and category, ensuring fair access to government college seats." },
          { title: "Category-Wise Reservation Benefits", description: "Maharashtra reservation: OBC 19%, SC 13%, ST 7%, EWS 10%, SEBC 16%. Reserved category students have significantly lower cutoffs - OBC students can get COEP seats at 90-92 percentile instead of 99.5+." },
          { title: "Multiple Attempts Possible", description: "MHT-CET can be attempted every year. Students who do not get their target college can take a drop year, repeat Class 12, or improve MHT-CET in 2027 admissions. Many COEP/PICT students give MHT-CET 2-3 times." },
          { title: "JEE Main as Alternative", description: "For deemed universities (SIT Pune, MIT-WPU) and management quota seats, JEE Main scores are also accepted. Students strong in JEE Main can use it for premium college admissions alongside MHT-CET." },
          { title: "Preference Order Strategy Matters", description: "CAP outcome depends critically on preference order. Always put dream college-branch combinations first, realistic options in middle, and safe options last. Use CollegePune's predictor to optimize preferences." },
          { title: "Document Preparation Is Critical", description: "CAP requires Maharashtra domicile certificate, caste certificate, income certificate, and other documents. Prepare these before MHT-CET results to avoid missing CAP deadlines." },
        ]}
        admissionHeading="MHT-CET to Pune College: Step-by-Step 2026"
        admissionSteps={[
          { step: "1", title: "Register & Appear for MHT-CET PCM 2026", description: "Register at mahacet.org (typically January-February 2026). Exam fee: ₹800 (general), ₹600 (reserved). Exam is conducted April-May 2026 in computer-based mode. Paper covers PCM (Class 11+12 syllabus)." },
          { step: "2", title: "Check MHT-CET Results (June 2026)", description: "Results declared on mahacet.org. Download your scorecard showing raw score, percentile, and All-India Rank. Use CollegePune's predictor to estimate college chances based on your percentile." },
          { step: "3", title: "Register on CAP Portal", description: "Visit cetcell.mahacet.org and register for engineering CAP. Upload documents: 10th/12th marksheets, CET scorecard, caste certificate, domicile certificate, income certificate. Registration is free." },
          { step: "4", title: "Fill College Preferences for CAP Round 1", description: "Fill 50+ college-branch combinations in priority order. Use previous year cutoffs as reference. Put all government college-CS combinations first, then private autonomous colleges, then private unaided." },
          { step: "5", title: "Accept Allotment (Freeze/Float/Slide)", description: "After Round 1 allotment, choose: Freeze (accept current seat, no more rounds), Float (participate in next round for better seat, keep current as backup), or Slide (upgrade only within same college). Missing deadline forfeits the seat." },
        ]}
        faqs={faqs}
        ctaHeading="Predict Your MHT-CET College in Pune"
        ctaSubtext="Enter your MHT-CET percentile and category to see which engineering colleges in Pune you qualify for. Free AI-powered predictor with 95% accuracy based on last 5 years of CAP data."
      relatedGuides={[
        { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
        { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
        { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
        { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
        { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
        { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
      ]}
      />
    </>
  )
}
