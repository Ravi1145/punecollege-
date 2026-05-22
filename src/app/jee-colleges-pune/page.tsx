import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "JEE Colleges in Pune 2026 | Engineering Colleges Accepting JEE Main",
  description: "Engineering colleges in Pune accepting JEE Main 2026. COEP, SIT Pune, MIT-WPU - JEE cutoffs, management quota seats, fees, and admission process for Pune colleges.",
  path: "/jee-colleges-pune",
  keywords: ["jee colleges pune", "jee main colleges pune 2026", "engineering colleges pune jee main", "jee cutoff pune colleges"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "₹12 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "₹9.8 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud", naac: "A+", fees: "₹2.0L-3.8L/yr", placement: "₹7.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "₹8.5 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "Bharati Vidyapeeth College of Engineering", location: "Dhankawadi", naac: "A", fees: "₹1.45L-1.95L/yr", placement: "₹5.6 LPA avg", slug: "bharati-vidyapeeth-college-engineering-pune" },
  { name: "Cummins College of Engineering for Women", location: "Karvenagar", naac: "A+", fees: "₹1.3L-1.75L/yr", placement: "₹6.8 LPA avg", slug: "cummins-college-of-engineering-pune" },
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.4L-1.9L/yr", placement: "₹7.5 LPA avg", slug: "pict-pune-institute-of-computer-technology" },
  { name: "JSPM Rajarshi Shahu College of Engineering", location: "Tathawade", naac: "A", fees: "₹1.2L-1.7L/yr", placement: "₹5.2 LPA avg", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
]

const faqs = [
  { q: "Which Pune engineering colleges accept JEE Main?", a: "Most Pune engineering colleges accept JEE Main: COEP (state quota), SIT Pune, MIT-WPU, VIT Pune, PICT, Bharati Vidyapeeth, and Cummins College. JEE scores are used for management quota seats and some all-India quota seats at government-aided colleges." },
  { q: "What JEE Main percentile is needed for COEP Pune?", a: "COEP's All India Quota seats require JEE Main 95+ percentile for Computer Engineering. For Mechanical and Electronics at COEP, 85-90 percentile suffices. COEP state quota seats are allotted via MHT-CET CAP, not directly through JEE." },
  { q: "Is JEE Main required for admission in Pune?", a: "No. MHT-CET is the primary exam for Pune engineering colleges. JEE Main is an alternative accepted at many private colleges. Government college state quota seats exclusively use MHT-CET. JEE is required for All India Quota (AIQ) seats at COEP and for direct admission at deemed universities." },
  { q: "What JEE score is needed for SIT Pune (Symbiosis)?", a: "SIT Pune (Symbiosis Institute of Technology) accepts JEE Main 75+ percentile for most branches and 85+ for CS Engineering. They also conduct their own SET (Symbiosis Entrance Test). JEE Main is not mandatory - SET scores alone can qualify you for admission." },
  { q: "Can Out-of-State students use JEE Main for Pune college admission?", a: "Yes. Out-of-Maharashtra students can use JEE Main for management quota seats at private Pune engineering colleges. For state quota seats in government colleges, Maharashtra domicile is required. Deemed universities (SIT, MIT-WPU) welcome students from all states via JEE/SET." },
]

export default function JeeCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "JEE Colleges in Pune", url: "/jee-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "JEE Main Colleges in Pune 2026",
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
        breadcrumb={[{ label: "JEE Colleges in Pune", href: "/jee-colleges-pune" }]}
        h1="JEE Main Colleges in Pune 2026"
        subtitle="Explore Pune engineering colleges accepting JEE Main scores for 2026 admission. State quota vs management quota options, JEE cutoffs, fees, and direct admission guidance."
        heroStats={[
          { value: "25+", label: "JEE Accepting Colleges" },
          { value: "75%ile+", label: "Min JEE (SIT/MIT-WPU)" },
          { value: "95%ile+", label: "JEE for COEP AIQ" },
          { value: "Jan & Apr", label: "JEE Main Sessions" },
        ]}
        introHeading="JEE Main Colleges in Pune: Your Options for 2026"
        introParagraphs={[
          "JEE Main (Joint Entrance Examination Main) is accepted by a wide range of Pune engineering colleges for management quota admissions, All India Quota (AIQ) seats, and direct admissions at deemed universities. While MHT-CET is the primary route for Maharashtra state quota seats, JEE Main opens additional pathways - especially for students from outside Maharashtra or those seeking premium deemed university seats.",
          "For 2026, JEE Main will be conducted in two sessions: January and April. The best of two session scores is used for admission. NTA (National Testing Agency) conducts JEE Main, and scores are accepted by COEP (AIQ seats), SIT Pune, MIT-WPU, Bharati Vidyapeeth, and many other Pune engineering colleges.",
          "A strategic advantage of strong JEE Main performance is access to management quota seats at autonomous colleges and deemed universities, bypassing the MHT-CET CAP queue. Students who did not perform well in MHT-CET can use JEE Main scores to secure admissions at VIT Pune, MIT-WPU, or SIT Pune directly through college-level admissions.",
        ]}
        colleges={colleges}
        whyHeading="JEE Main Advantages for Pune College Admission"
        whyPoints={[
          { title: "Access to Premium Deemed Universities", description: "SIT Pune, MIT-WPU, and DY Patil University accept JEE Main for direct admission without MHT-CET. These institutions offer excellent placement at ₹7-10 LPA average for qualified JEE students." },
          { title: "Management Quota Flexibility", description: "Private engineering colleges in Pune fill management quota seats based on JEE Main scores (and sometimes direct payment). This provides a parallel admission route alongside MHT-CET CAP." },
          { title: "All India Quota at COEP", description: "COEP (India's #49 engineering college) reserves seats for All India Quota filled through JoSAA counselling based on JEE Main scores - giving non-Maharashtra students access to COEP's exceptional education." },
          { title: "Two Attempts Per Year", description: "JEE Main in January and April allows students to improve scores. The better of two scores is used. This gives an advantage over MHT-CET (one attempt per year) for strategic test-takers." },
          { title: "JEE Advanced Pathway", description: "Top JEE Main performers can appear for JEE Advanced, qualifying for IITs. Pune engineering college students who clear JEE Advanced from a college (gap year strategy) have successfully transferred to IITs." },
          { title: "National-Level Recognition", description: "JEE Main scores are recognized across all 31 NITs, 25 IIITs, and 28 GFTIs in India. A good JEE Main score gives maximum flexibility in national college choices beyond Pune." },
        ]}
        admissionHeading="JEE Main to Pune College: Admission Process 2026"
        admissionSteps={[
          { step: "1", title: "Register for JEE Main January 2026", description: "Register at jeemain.nta.nic.in from October-November 2025. Exam fee: ₹1,000 (general). JEE Main January session is typically held in January 2026, April session in April 2026." },
          { step: "2", title: "Attempt Both Sessions for Best Score", description: "Appear for both January and April sessions. NTA uses the best of two session percentiles. The April session result is typically higher due to additional preparation." },
          { step: "3", title: "Apply Directly to Deemed Universities (May-June)", description: "After JEE April results, apply to SIT Pune, MIT-WPU, and other Pune deemed universities directly on their websites. These colleges have rolling admissions based on JEE scores - apply early for best branch choices." },
          { step: "4", title: "JoSAA Counselling for COEP AIQ (if eligible)", description: "If JEE Main qualifies for JoSAA, register at josaa.nic.in for COEP and other technical institutes' All India Quota seats. JoSAA rounds happen in June-July 2026." },
          { step: "5", title: "Parallel MHT-CET CAP for Maharashtra Students", description: "If you're a Maharashtra resident, simultaneously participate in MHT-CET CAP for state quota seats. Having both JEE Main and MHT-CET scores maximizes your admission options." },
        ]}
        faqs={faqs}
        ctaHeading="Which Pune College Can You Get with Your JEE Score?"
        ctaSubtext="Tell us your JEE Main percentile and category. Our AI predictor will show you the exact Pune engineering colleges where you qualify for direct admission in 2026."
      relatedGuides={[
        { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
        { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
        { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
        { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
        { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
        { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
      ]}
      />
    </>
  )
}
