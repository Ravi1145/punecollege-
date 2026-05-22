import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "BTech Colleges in Pune 2026 | Best B.Tech Colleges | Fees & Admission",
  description: "Complete list of BTech colleges in Pune 2026. Compare fees (₹80K-4.8L/yr), MHT-CET cutoffs, placements, and NAAC grades for B.Tech admission in Pune.",
  path: "/btech-colleges-pune",
  keywords: ["btech colleges pune", "b.tech colleges in pune 2026", "btech admission pune", "btech fees pune", "btech engineering pune"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP)", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "₹12 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "₹8.5 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "₹9.8 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "MIT World Peace University (MIT-WPU)", location: "Kothrud", naac: "A+", fees: "₹2.0L-3.8L/yr", placement: "₹7.2 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.4L-1.9L/yr", placement: "₹7.5 LPA avg", slug: "pict-pune-institute-of-computer-technology" },
  { name: "AISSMS College of Engineering", location: "Kennedy Road", naac: "A", fees: "₹1.1L-1.55L/yr", placement: "₹4.8 LPA avg", slug: "aissms-college-of-engineering-pune" },
  { name: "D.Y. Patil College of Engineering Akurdi", location: "Akurdi", naac: "A", fees: "₹1.05L-1.55L/yr", placement: "₹5.1 LPA avg", slug: "dy-patil-college-engineering-akurdi-pune" },
  { name: "Bharati Vidyapeeth College of Engineering", location: "Dhankawadi", naac: "A", fees: "₹1.45L-1.95L/yr", placement: "₹5.6 LPA avg", slug: "bharati-vidyapeeth-college-engineering-pune" },
]

const faqs = [
  { q: "Which BTech college in Pune is best for Computer Science?", a: "PICT (Pune Institute of Computer Technology) is considered the best for CS/IT BTech in Pune with ₹7.5 LPA average placement and 98%+ placement rate. COEP is best for overall CS but harder to get into (99.5+ percentile)." },
  { q: "What is the duration of BTech in Pune colleges?", a: "BTech (Bachelor of Technology) is a 4-year full-time program. Semesters run from June-November and December-May. Some colleges also offer integrated BTech + MTech (5-year) programs." },
  { q: "What is the minimum MHT-CET score for BTech in Pune?", a: "For top BTech colleges like COEP, you need 95+ percentile. For mid-tier autonomous colleges (VIT Pune, MIT-WPU), 80-90 percentile suffices. Private unaided colleges accept 60-70 percentile for most branches." },
  { q: "Can I do BTech in Pune without MHT-CET?", a: "Yes. Several Pune BTech colleges accept JEE Main, SET (Symbiosis), or direct admission under management quota without MHT-CET. Deemed universities like SIT Pune and MIT-WPU have their own entrance routes." },
  { q: "What are the top BTech branches in Pune?", a: "Computer Science Engineering (CSE) and Information Technology (IT) are the most popular and highest-paying BTech branches in Pune. Mechanical Engineering is popular for Pune's auto sector. Electronics & Telecommunication (E&TC) is strong at COEP and VIT Pune." },
]

export default function BtechCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "BTech Colleges in Pune", url: "/btech-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BTech Colleges in Pune 2026",
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
        breadcrumb={[{ label: "BTech Colleges in Pune", href: "/btech-colleges-pune" }]}
        h1="BTech Colleges in Pune 2026"
        subtitle="Explore top B.Tech colleges in Pune. Compare fees, MHT-CET cutoffs, branch options, placement packages, and NAAC ratings for 2026 admission."
        heroStats={[
          { value: "50+", label: "BTech Colleges" },
          { value: "₹80K-4.8L", label: "Annual Fees Range" },
          { value: "30+", label: "Specializations" },
          { value: "MHT-CET/JEE", label: "Entrance Exams" },
        ]}
        introHeading="BTech Colleges in Pune: Complete Admission Guide 2026"
        introParagraphs={[
          "Pune is one of India's top cities for BTech education, offering over 50 AICTE-approved colleges across government, autonomous, private, and deemed university categories. The Bachelor of Technology (BTech) is a 4-year degree program offered in branches ranging from Computer Science and Mechanical Engineering to Civil, Electronics, Chemical, and emerging fields like AI & Data Science.",
          "The primary admission route for BTech in Pune is through MHT-CET (Maharashtra Common Entrance Test), followed by a centralized admission process managed by MHT-CET Cell. JEE Main scores are also accepted at several colleges for management quota and some state-level seats. The 2026 batch admissions will follow the same CAP (Centralized Admission Process) structure.",
          "Selecting the right BTech college in Pune depends on your preferred branch, budget, MHT-CET percentile, and career goals. Government colleges offer excellent value with fees starting at ₹80,000/year, while deemed universities like SIT Pune and MIT-WPU offer premium infrastructure at ₹3.6L-4.8L/year. This guide covers all key parameters to help you choose wisely.",
        ]}
        colleges={colleges}
        whyHeading="Why Pursue BTech in Pune?"
        whyPoints={[
          { title: "Industry Capital of Maharashtra", description: "Pune hosts 600+ manufacturing plants, 500+ IT companies, and 100+ auto sector firms. BTech graduates from Pune colleges have direct access to campus placements from these industry leaders." },
          { title: "SPPU Affiliation", description: "Most Pune BTech colleges are affiliated to Savitribai Phule Pune University (SPPU), one of India's top technical universities, ensuring nationally recognized degrees and examination standards." },
          { title: "Specialization Options", description: "Pune BTech colleges offer 30+ specializations including CSE, AI & ML, Data Science, Cyber Security, Robotics, Mechanical, Civil, Chemical, and Electrical - covering every engineering interest." },
          { title: "Affordable Government Seats", description: "MHT-CET CAP merit seats in government-aided colleges have fees capped by the government. COEP charges just ₹80,000/year for one of India's best engineering educations." },
          { title: "Startup Ecosystem", description: "Pune's growing startup ecosystem, incubated at COEP, MIT-WPU, and SIT, gives BTech students opportunities to launch ventures during college with mentorship and seed funding access." },
          { title: "Proximity to IT Hubs", description: "Hinjewadi Phase 1, 2 & 3 IT parks are within 20 km of most Pune engineering colleges, enabling students to take up paid internships from second year onwards." },
        ]}
        admissionHeading="BTech Admission Process in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Appear for MHT-CET / JEE Main 2026", description: "Register and appear for MHT-CET (April-May 2026) or JEE Main (January & April 2026). MHT-CET is based on PCM at Class 12 level. Aim for 90+ percentile for mid-tier colleges, 95+ for top colleges." },
          { step: "2", title: "Check Results & Merit Position", description: "MHT-CET results are declared in June 2026. Check your percentile and category rank. Use CollegePune's College Predictor to see which BTech colleges you can target." },
          { step: "3", title: "Register on CAP Portal", description: "Register on cetcell.mahacet.org, fill in personal details, upload documents (10th/12th marksheets, caste certificate, Aadhar), and get eligibility verified." },
          { step: "4", title: "Fill College Preferences", description: "Fill preferences for BTech colleges in Pune in order of priority. You can list 50+ college-branch combinations. Seat allotment is strictly merit-based within category." },
          { step: "5", title: "Accept Allotment & Pay Fees", description: "Once a seat is allotted in CAP Round 1 (July), accept it online and pay seat confirmation fees. Collect original documents and report to the college within the specified deadline." },
        ]}
        faqs={faqs}
        ctaHeading="Get Personalized BTech Admission Guidance for Pune"
        ctaSubtext="Tell us your MHT-CET percentile and branch preference - our counsellors will suggest the best BTech colleges in Pune matching your profile and budget."
      relatedGuides={[
        { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
        { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
        { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune-placement", icon: "💼" },
        { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
        { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
        { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
        { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
        { label: "Computer Engineering Colleges Pune", href: "/computer-engineering-colleges-pune", icon: "💻" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
      ]}
      />
    </>
  )
}
