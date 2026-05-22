import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Mechanical Engineering Colleges in Pune 2026 | Fees, Placements & Cutoffs",
  description: "Top mechanical engineering colleges in Pune 2026. COEP, VIT Pune, MIT-WPU - compare fees (₹80K-3.8L), MHT-CET cutoffs, and placement data for Mech BTech admission.",
  path: "/mechanical-engineering-colleges-pune",
  keywords: ["mechanical engineering colleges pune", "mech engineering colleges pune 2026", "best mechanical college pune", "mechanical btech pune"],
})

export const revalidate = 300

const colleges = [
  { name: "College of Engineering Pune (COEP) - Mech", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "₹10 LPA avg", slug: "coep-college-of-engineering-pune" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "₹8.5 LPA avg", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "MIT World Peace University - Mech", location: "Kothrud", naac: "A+", fees: "₹2.0L-3.8L/yr", placement: "₹6.8 LPA avg", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Symbiosis Institute of Technology - Mech", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "₹7.5 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "JSPM Rajarshi Shahu College of Engineering", location: "Tathawade", naac: "A", fees: "₹1.2L-1.7L/yr", placement: "₹5.2 LPA avg", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
  { name: "Sinhgad College of Engineering - Mech", location: "Vadgaon", naac: "A", fees: "₹1.15L-1.6L/yr", placement: "₹4.5 LPA avg", slug: "sinhgad-college-of-engineering-pune" },
  { name: "Bharati Vidyapeeth College of Engineering", location: "Dhankawadi", naac: "A", fees: "₹1.45L-1.95L/yr", placement: "₹5.2 LPA avg", slug: "bharati-vidyapeeth-college-engineering-pune" },
  { name: "D.Y. Patil College of Engineering Akurdi", location: "Akurdi", naac: "A", fees: "₹1.05L-1.55L/yr", placement: "₹4.8 LPA avg", slug: "dy-patil-college-engineering-akurdi-pune" },
]

const faqs = [
  { q: "Which is the best mechanical engineering college in Pune?", a: "COEP (College of Engineering Pune) is best for Mechanical Engineering in Pune due to its government status, NIRF ranking, and strong ties with Bajaj Auto, Tata Motors, and Cummins India. VIT Pune is the top private option for Mech." },
  { q: "What are the job opportunities for mechanical engineers from Pune?", a: "Pune's auto sector (Bajaj Auto, Tata Motors, Force Motors, Mahindra), manufacturing companies (Thermax, Cummins, Honeywell), and defense sector (HAL, DRDO) are major recruiters. Average starting salary is ₹4-8 LPA." },
  { q: "What is the MHT-CET cutoff for mechanical engineering in Pune?", a: "COEP Mechanical requires 90-95 percentile in MHT-CET. VIT Pune Mech requires 80-88 percentile. MIT-WPU Mech requires 70-80 percentile. Private colleges like JSPM and Sinhgad accept 55-65 percentile." },
  { q: "Is mechanical engineering a good choice in Pune in 2026?", a: "Yes. Pune remains India's manufacturing capital with Bajaj Auto, Tata Motors, Force Motors, Kirloskar, and 500+ auto-ancillary companies offering strong mechanical engineering placements. The electric vehicle transition also creates new opportunities in EV design and battery systems." },
  { q: "Which companies recruit mechanical engineers from Pune colleges?", a: "Top recruiters for Mech from Pune colleges include Bajaj Auto (highest recruiter), Tata Motors, Cummins India, Thermax, L&T, Emerson, Bosch India, KPIT, Honeywell, and multinational auto component manufacturers." },
]

export default function MechanicalEngineeringCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Mechanical Engineering Colleges Pune", url: "/mechanical-engineering-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Mechanical Engineering Colleges in Pune 2026",
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
        breadcrumb={[{ label: "Mechanical Engineering Colleges in Pune", href: "/mechanical-engineering-colleges-pune" }]}
        h1="Mechanical Engineering Colleges in Pune 2026"
        subtitle="Compare the best mechanical engineering colleges in Pune for 2026 BTech admission. Real data on MHT-CET cutoffs, fees, auto-sector placements, and NAAC grades."
        heroStats={[
          { value: "30+", label: "Mech Colleges" },
          { value: "₹80K-3.8L", label: "Annual Fees" },
          { value: "Bajaj Auto", label: "Top Recruiter" },
          { value: "₹10 LPA", label: "Best Avg Package" },
        ]}
        introHeading="Mechanical Engineering Colleges in Pune: The Auto Capital's Best"
        introParagraphs={[
          "Pune is India's undisputed manufacturing capital and home to the headquarters of Bajaj Auto, Tata Motors R&D, Force Motors, and Cummins India. This industrial ecosystem makes Pune uniquely advantageous for mechanical engineering students, offering unparalleled internship and placement opportunities with global automotive and manufacturing giants.",
          "Mechanical engineering colleges in Pune range from the prestigious COEP (one of India's oldest and best engineering institutions, est. 1854) to modern autonomous colleges like VIT Pune with world-class mechanical labs, CNC machining centers, and CAD/CAM facilities. The 2026 batch can also access new BTech specializations in Mechatronics, Automobile Engineering, and Manufacturing Engineering.",
          "With Pune's transition to electric vehicles, colleges like MIT-WPU and SIT Pune have introduced EV-specific courses within mechanical engineering programs. Battery management systems, motor design, and EV powertrain are being integrated into the 2026 curriculum - making Pune mechanical engineers well-positioned for India's ₹10 trillion EV industry.",
        ]}
        colleges={colleges}
        whyHeading="Why Study Mechanical Engineering in Pune?"
        whyPoints={[
          { title: "Auto Industry Access", description: "Pune hosts Bajaj Auto, Tata Motors, Force Motors, Mahindra, and 500+ auto-ancillary firms. Mechanical engineering students get direct campus placement opportunities from these industry leaders." },
          { title: "Advanced Lab Infrastructure", description: "Top Pune mech colleges have CNC machining centers, FEM analysis labs, rapid prototyping facilities, and CAD/CAM suites sponsored by industry partners like Siemens, ANSYS, and Autodesk." },
          { title: "EV & Future Tech Readiness", description: "Pune's leadership in EV adoption means mech engineers learn EV powertrain design, battery systems, and motor engineering - skills valued at ₹8-15 LPA by EV companies like Ather, Ola Electric, and Bajaj." },
          { title: "Diverse Industry Base", description: "Beyond autos, Pune has aerospace (HAL, Bharat Forge), defense (DRDO), FMCG machinery, and IT hardware companies creating diverse mechanical engineering career paths." },
          { title: "Research Opportunities", description: "COEP and VIT Pune have active mechanical engineering research labs funded by DST and industry, offering students publication opportunities and exposure to cutting-edge R&D." },
          { title: "Core + IT Hybrid Roles", description: "Pune mechanical engineers are increasingly recruited into product design, simulation engineering, and digital manufacturing roles at IT companies and global MNCs at ₹6-12 LPA." },
        ]}
        admissionHeading="Mechanical Engineering Admission Process in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Target MHT-CET PCM Percentile", description: "Mechanical is less competitive than CS in MHT-CET. COEP Mech: aim 90-95 percentile. VIT Pune Mech: 80-88 percentile. Private colleges: 55-70 percentile. Start MHT-CET prep from November 2025." },
          { step: "2", title: "Research College Labs & Industry Connections", description: "Before CAP, visit mechanical engineering labs at shortlisted colleges. Check their industry MoUs (Bajaj Auto, Tata Motors, Cummins), placement records, and alumni working in core mechanical roles." },
          { step: "3", title: "Register on CAP Portal Post-Results", description: "After MHT-CET results in June 2026, register on cetcell.mahacet.org. Submit documents including 10th/12th marksheets, caste certificate, and domicile proof for Maharashtra seat eligibility." },
          { step: "4", title: "Fill Preferences (Mech First at Top Colleges)", description: "List college-branch combinations with Mechanical Engineering at COEP, VIT Pune, MIT-WPU as first preferences, followed by realistic targets. Include non-Pune options as safety nets." },
          { step: "5", title: "Explore Management Quota if CAP Does Not Work", description: "If CAP allotment is unsatisfactory, approach private colleges for management quota seats. These require direct applications to colleges and typically cost 20-30% more than government-controlled fees." },
        ]}
        faqs={faqs}
        ctaHeading="Find the Best Mech Engineering College for Your MHT-CET Score"
        ctaSubtext="Our counsellors specialize in mechanical engineering admissions in Pune. Get personalized college recommendations, scholarship guidance, and admission support - all free."
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
