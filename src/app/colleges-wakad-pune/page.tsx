import type { Metadata } from "next"
import Script from "next/script"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"

export const metadata: Metadata = genMeta({
  title: "Colleges in Wakad Pune 2026 | Engineering & Management Near Hinjewadi",
  description: "Top colleges in Wakad and Pimpri-Chinchwad area, Pune 2026. Near Hinjewadi IT Park â€” engineering, MBA, BBA programs. Fees, admissions for Wakad area Pune colleges.",
  path: "/colleges-wakad-pune",
  keywords: ["colleges in wakad pune", "wakad pune colleges 2026", "colleges near hinjewadi pune", "engineering colleges wakad pune"],
})

export const revalidate = 300

const colleges = [
  { name: "JSPM Rajarshi Shahu College of Engineering", location: "Tathawade, Wakad area", naac: "A", fees: "â‚¹1.2Lâ€“1.7L/yr", placement: "â‚¹5.2 LPA avg", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale (near Wakad)", naac: "A+", fees: "â‚¹3.6Lâ€“4.8L/yr", placement: "â‚¹9.8 LPA avg", slug: "symbiosis-institute-of-technology-pune" },
  { name: "Symbiosis Institute of Business Management (SIBM)", location: "Lavale (near Wakad)", naac: "A+", fees: "â‚¹8.5L (2yr)", placement: "â‚¹28 LPA avg", slug: "sibm-symbiosis-institute-of-business-management" },
  { name: "Suryadatta Institute of Management", location: "Wakad, Pune", naac: "B+", fees: "â‚¹3.8L (2yr MBA)", placement: "â‚¹6.5 LPA avg", slug: "suryadatta-institute-management-pune" },
  { name: "JSPM Imperial College of Engineering", location: "Wagholi/Wakad area", naac: "B+", fees: "â‚¹85Kâ€“1.25L/yr", placement: "â‚¹4 LPA avg", slug: "jspm-imperial-college-engineering-pune" },
  { name: "Indira College of Engineering & Management (Parandwadi)", location: "Wakad-Hinjewadi belt", naac: "B++", fees: "â‚¹95Kâ€“1.35L/yr", placement: "â‚¹4.2 LPA avg", slug: "indira-college-of-engineering-management-pune" },
  { name: "Balaji Institute of Management Research (BIMR)", location: "Tathawade, Wakad area", naac: "A", fees: "â‚¹5.2L (2yr)", placement: "â‚¹9 LPA avg", slug: "balaji-institute-management-research-pune" },
  { name: "AIISSMS College of Engineering â€” Wagholi", location: "Wagholi/Wakad belt", naac: "A", fees: "â‚¹1.1L/yr", placement: "â‚¹4.8 LPA avg", slug: "aissms-college-of-engineering-pune" },
]

const faqs = [
  { q: "Why is Wakad a good location for college students?", a: "Wakad is strategically located adjacent to Hinjewadi IT Park (India's 4th largest IT hub with 500+ companies). Students at Wakad area colleges get direct access to internships, campus drives, and part-time opportunities at leading IT companies without long commutes." },
  { q: "Which is the best college in Wakad, Pune?", a: "For management and engineering, Symbiosis University colleges (SIT Pune, SIBM) in nearby Lavale are the best institutions in the Wakad belt. For more affordable engineering, JSPM RSCOE in Tathawade is well-regarded with NAAC A grade and decent placements." },
  { q: "What is the accommodation scene near Wakad colleges?", a: "Wakad, Tathawade, Hinjewadi Phase 1 area has modern PG accommodations at â‚¹7,000â€“15,000/month due to IT professional demand. Student-specific PGs are cheaper (â‚¹5,500â€“9,000/month) on Hinjewadi Road. Many students share 2BHK flats in Wakad for â‚¹8,000â€“10,000/person per month." },
  { q: "Is Wakad well-connected to other parts of Pune?", a: "Wakad is well-connected via Baner-Balewadi Highway to central Pune. PMPML buses run regularly to Shivajinagar and Swargate. Ola/Uber availability is excellent. Pune Metro Phase 3 (planned) will improve Hinjewadi-Wakad connectivity significantly." },
  { q: "Are there Symbiosis colleges in Wakad area?", a: "Symbiosis International University's main campus in Lavale is 5â€“8 km from Wakad. This campus hosts SIT (engineering), SIBM (MBA), SCMHRD (MBA), SIIB (International Business), and multiple other Symbiosis institutes â€” making it the largest education hub in the Wakad-Hinjewadi belt." },
]

export default function CollegesWakadPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Colleges in Wakad, Pune", url: "/colleges-wakad-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Colleges in Wakad, Pune 2026",
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
        breadcrumb={[{ label: "Colleges in Wakad, Pune", href: "/colleges-wakad-pune" }]}
        h1="Colleges in Wakad, Pune 2026"
        subtitle="Discover colleges in Wakad and the Hinjewadi-Tathawade belt of Pune. Symbiosis University, JSPM RSCOE, and management institutes near India's 4th largest IT park."
        heroStats={[
          { value: "10+", label: "Colleges in Wakad Belt" },
          { value: "Hinjewadi", label: "IT Park Next Door" },
          { value: "â‚¹85Kâ€“8.5L", label: "Fees Range" },
          { value: "500+ IT Cos", label: "Placement Access" },
        ]}
        introHeading="Colleges in Wakad, Pune: Gateway to Hinjewadi IT Careers"
        introParagraphs={[
          "Wakad is one of Pune's fastest-growing residential and educational zones, strategically positioned between central Pune and Hinjewadi IT Park â€” home to TCS, Infosys, Wipro, Cognizant, HSBC Tech, and 500+ other technology companies. Colleges in the Wakad-Tathawade-Hinjewadi-Lavale belt are uniquely positioned to offer students direct access to India's 4th largest IT employment hub.",
          "The education landscape in Wakad is anchored by Symbiosis University's 100-acre Lavale campus (5â€“8 km from Wakad central), which hosts SIT Pune, SIBM, SCMHRD, and multiple other top-ranked institutes. For engineering, JSPM RSCOE in Tathawade (adjacent to Wakad) offers quality education at affordable fees with strong placement connections to Hinjewadi companies.",
          "Students choosing Wakad area colleges benefit from a unique lifestyle advantage: working at internships or part-time roles in Hinjewadi IT Park while studying, building 2+ years of industry experience before graduation. This pre-placement internship culture significantly boosts career outcomes compared to students at colleges far from IT hubs.",
        ]}
        colleges={colleges}
        whyHeading="Why Study in Wakad, Pune's IT Corridor?"
        whyPoints={[
          { title: "Hinjewadi IT Park at Doorstep", description: "Hinjewadi Phase 1, 2 & 3 IT parks are 3â€“8 km from Wakad area colleges. Infosys BPO, TCS, HSBC Tech, Deutsche Knowledge Services, and 500+ companies conduct campus drives and offer internships to nearby college students." },
          { title: "Symbiosis University Excellence", description: "Lavale (Wakad belt) hosts India's Symbiosis International University â€” ranked in India's top 50 universities with NAAC A+. Students at SIT and SIBM are among India's highest-placed engineering and MBA graduates." },
          { title: "Modern Student Infrastructure", description: "Wakad has Pune's best-developed modern student amenities: high-speed internet PGs, co-working study spaces, premium food courts, fitness centers, and entertainment options catering to the IT-professional student demographic." },
          { title: "Startup & Tech Community", description: "Hinjewadi's startup ecosystem (100+ funded startups) and innovation centers at Symbiosis provide Wakad-area students with entrepreneurship exposure, hackathon participation, and startup internship opportunities." },
          { title: "Mumbai Expressway Access", description: "Mumbai-Pune Expressway interchange at Wakad-Baner provides 90-minute access to Mumbai for industrial visits, networking, and weekend opportunities. Ideal for students targeting Mumbai careers after graduation." },
          { title: "Diverse Program Options", description: "Within 10 km radius of Wakad: Engineering (SIT, JSPM, Indira), MBA (SIBM, SCMHRD, BIMR), Management (Suryadatta), International Business (SIIB) â€” virtually every professional program within the Wakad belt." },
        ]}
        admissionHeading="Admission to Wakad Area Colleges in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Identify Which Colleges in Wakad Belt Suit You", description: "Symbiosis colleges in Lavale (near Wakad) are the premium options â€” engineering via SET/JEE/MHT-CET for SIT, MBA via SNAP for SIBM/SCMHRD. JSPM RSCOE in Tathawade uses MHT-CET. Management colleges accept MAH-CET/CAT." },
          { step: "2", title: "Apply to Symbiosis via SET or JEE/MHT-CET", description: "For SIT Pune: Apply via snaptest.org after registration. SIT accepts SET, JEE Main, and MHT-CET. Apply by February 2026 for 2026 batch. For SIBM/SCMHRD: Must appear for SNAP (December 2025) and CAT/XAT." },
          { step: "3", title: "JSPM RSCOE via MHT-CET CAP", description: "JSPM Rajarshi Shahu College in Tathawade participates in MHT-CET CAP. Register on cetcell.mahacet.org after MHT-CET results. With 65â€“75 percentile, you can target CS or E&TC branches at JSPM." },
          { step: "4", title: "Explore Management Colleges Near Wakad", description: "BIMR (Tathawade) and Suryadatta (Wakad) accept MAH-MBA-CET for MBA programs. Apply directly on their websites with entrance scores. GD/PI rounds are typically Marchâ€“April 2026." },
          { step: "5", title: "Book Accommodation Early â€” Wakad Books Fast", description: "Wakad PG accommodations fill up fast due to IT professional demand. For 2026 admission, start searching from Marchâ€“April 2026. College hostel applications at SIT Pune open with admissions â€” apply simultaneously." },
        ]}
        faqs={faqs}
        ctaHeading="Choose the Right College in Wakad for IT Career Success"
        ctaSubtext="Wakad is Pune's best location for tech careers. Our counsellors will help you find the right college â€” engineering, MBA, or management â€” in the Wakad-Hinjewadi belt for your scores and goals."
      relatedGuides={[
        { label: "Colleges in Hadapsar Pune", href: "/colleges-hadapsar-pune", icon: "📍" },
        { label: "Colleges in Kothrud Pune", href: "/colleges-kothrud-pune", icon: "📍" },
        { label: "Colleges with Hostel in Pune", href: "/colleges-in-pune-with-hostel", icon: "🏠" },
        { label: "All Colleges in Pune — Browse", href: "/colleges", icon: "🏛️" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
        { label: "Best Engineering Colleges Pune", href: "/engineering-colleges-pune", icon: "⚙️" },
        { label: "Best MBA Colleges in Pune", href: "/mba-colleges-pune", icon: "📈" },
      ]}
      />
    </>
  )
}

