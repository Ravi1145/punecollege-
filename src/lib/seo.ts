import { Metadata } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"
const SITE_NAME = "CollegePune"
const DEFAULT_OG_IMAGE = `${BASE_URL}/api/og`

export function generateMetadata({
  title,
  description,
  path = "",
  ogImage = DEFAULT_OG_IMAGE,
  keywords = [],
}: {
  title: string
  description: string
  path?: string
  ogImage?: string
  keywords?: string[]
}): Metadata {
  const canonicalUrl = `${BASE_URL}${path}`

  return {
    title: { absolute: title },
    description,
    keywords: [
      "colleges in pune",
      "colleges in pune 2026",
      "best college in pune",
      "best college in pune 2026",
      "top colleges in pune 2026",
      "college admission pune 2026",
      "pune university colleges",
      "sppu affiliated colleges 2026",
      ...keywords,
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    robots: {
      // Base <meta name="robots"> — read by ALL crawlers including AI bots
      index: true,
      follow: true,
      "max-snippet": -1,          // unlimited snippet extraction (key for AI answers)
      "max-image-preview": "large",
      "max-video-preview": -1,
      // Googlebot-specific <meta name="googlebot"> — belt-and-suspenders
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "en-IN": canonicalUrl,
        "mr-IN": canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@collegepune",
      site: "@collegepune",
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "CollegePune",
    alternateName: ["College Pune", "CollegePune.com"],
    slogan: "India's AI-Powered College Discovery Portal for Pune",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 200,
      height: 60,
    },
    image: `${BASE_URL}/og-image.png`,
    description: "India's leading AI-powered college discovery portal for Pune. Find and compare 108+ engineering, MBA, medical, and arts colleges in Pune with verified fees, NIRF rankings, NAAC grades, cutoffs, and placement data.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Undri",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411060",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Pune",
      sameAs: "https://en.wikipedia.org/wiki/Pune",
    },
    telephone: "+917753831118",
    email: "support@collegepune.com",
    // knowsAbout — signals topical authority to AI models + knowledge graphs
    knowsAbout: [
      "College admissions in Pune 2026",
      "Engineering colleges in Pune",
      "MBA colleges in Pune",
      "Medical colleges in Pune",
      "MHT-CET exam and cutoffs",
      "JEE Main colleges in Maharashtra",
      "NEET medical admissions Pune",
      "SNAP exam Symbiosis colleges",
      "CAT exam MBA admissions Pune",
      "NIRF rankings Pune colleges",
      "NAAC accreditation grades",
      "College fees and scholarships in Maharashtra",
      "SPPU affiliated colleges",
      "Government colleges in Pune",
      "B.Tech admission Pune 2026",
      "MBA admission Pune 2026",
      "MBBS admission Pune 2026",
      "MahaDBT scholarship",
      "College placement records Pune",
      "DTE Maharashtra CAP admission process",
    ],
    sameAs: [
      "https://twitter.com/collegepune",
      "https://www.facebook.com/collegepune",
      "https://www.instagram.com/collegepune",
      "https://www.youtube.com/@collegepune",
      "https://www.linkedin.com/company/collegepune",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917753831118",
      email: "support@collegepune.com",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    // speakable — marks key content for voice assistants and AI audio responses
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".speakable", "[data-speakable='true']"],
    },
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "CollegePune",
    url: BASE_URL,
    description: "Find the best colleges in Pune 2026. Compare fees, placements, NAAC grades and 2026 admission details for engineering, MBA, medical, arts, design and more.",
    inLanguage: "en-IN",
    publisher: { "@id": `${BASE_URL}/#organization` },
    about: {
      "@type": "Thing",
      name: "Higher Education in Pune, Maharashtra, India",
      description: "Comprehensive guide to colleges, universities, entrance exams, cutoffs, fees, and placement data for students seeking admission in Pune.",
    },
    audience: {
      "@type": "Audience",
      audienceType: "Students and parents seeking college admission in Pune",
      geographicArea: {
        "@type": "City",
        name: "Pune",
        sameAs: "https://en.wikipedia.org/wiki/Pune",
      },
    },
    // AI context endpoint — structured data for AI models and agents
    subjectOf: {
      "@type": "DataFeed",
      url: `${BASE_URL}/api/ai-context`,
      description: "Structured JSON context about CollegePune for AI models",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/colleges?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    ],
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}

export function generateCollegeSchema(college: {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  established: number
  postalCode?: string
  naac?: string
  nirfRank?: number | null
  courses?: string[]
  feesMin?: number
  feesMax?: number
  avgPlacement?: number
  type?: string
  image?: string
  rating?: number
  reviewCount?: number
  slug?: string
  reviews?: { studentName: string; course: string; year: number; rating: number; title: string; body: string }[]
}) {
  const pageUrl = `${BASE_URL}/colleges/${college.slug ?? ''}`
  const today = new Date().toISOString().split('T')[0]

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    "@id": `${pageUrl}#college`,
    name: college.name,
    description: college.description,
    image: college.image
      ? { "@type": "ImageObject", url: college.image, name: college.name, width: 1200, height: 630 }
      : { "@type": "ImageObject", url: `${BASE_URL}/college-default-banner.jpg`, name: college.name },
    logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 200, height: 60 },
    address: {
      "@type": "PostalAddress",
      streetAddress: college.address,
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: college.postalCode ?? "411001",
      addressCountry: "IN",
    },
    telephone: college.phone,
    email: college.email,
    url: college.website || pageUrl,
    sameAs: [college.website, `https://en.wikipedia.org/wiki/${encodeURIComponent(college.name)}`].filter(Boolean),
    foundingDate: college.established.toString(),
    dateModified: `${today}`,
    areaServed: { "@type": "City", name: "Pune", sameAs: "https://en.wikipedia.org/wiki/Pune" },
    // Accreditation signals — key for Google AI Overview on education queries
    ...(college.naac ? {
      accreditedBy: {
        "@type": "Organization",
        name: "National Assessment and Accreditation Council (NAAC)",
        url: "https://www.naac.gov.in",
        sameAs: "https://en.wikipedia.org/wiki/National_Assessment_and_Accreditation_Council",
      },
    } : {}),
    // Fees as PriceSpecification — helps AI extract "how much does X cost"
    ...(college.feesMin && college.feesMax ? {
      tuitionFeeSpecification: {
        "@type": "MonetaryAmountDistribution",
        currency: "INR",
        minValue: college.feesMin,
        maxValue: college.feesMax,
        unitText: "per year",
      },
    } : {}),
    // Courses as educational credentials
    hasOfferCatalog: college.courses?.length ? {
      "@type": "OfferCatalog",
      name: `${college.name} Academic Programs`,
      itemListElement: college.courses.slice(0, 10).map((c, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: {
          "@type": "Course",
          name: c,
          provider: { "@type": "CollegeOrUniversity", name: college.name },
          courseMode: "on-site",
          inLanguage: "en-IN",
          educationalCredentialAwarded: c,
          locationCreated: { "@type": "City", name: "Pune" },
        },
      })),
    } : undefined,
    // Speakable — marks content sections for Google AI Overview & voice assistants
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".college-overview", ".key-facts", "[data-speakable]"],
      xpath: [
        "/html/body//h1",
        "/html/body//*[contains(@class,'overview')]",
        "/html/body//*[contains(@class,'key-facts')]",
      ],
    },
    // mainEntityOfPage links the schema to the actual webpage
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      name: college.name,
      url: pageUrl,
      inLanguage: "en-IN",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${pageUrl}#college` },
      dateModified: `${today}`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Colleges", item: `${BASE_URL}/colleges` },
          { "@type": "ListItem", position: 3, name: college.name, item: pageUrl },
        ],
      },
    },
  }

  // AggregateRating — unlocks gold star rich snippets
  if (college.rating && college.rating > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: college.rating.toFixed(1),
      reviewCount: college.reviewCount && college.reviewCount > 0 ? college.reviewCount : 1,
      bestRating: "5",
      worstRating: "1",
    }
  }

  // Individual Review items
  if (college.reviews && college.reviews.length > 0) {
    schema.review = college.reviews.slice(0, 5).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.studentName },
      datePublished: `${r.year}-01-01`,
      name: r.title,
      reviewBody: r.body,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toFixed(1),
        bestRating: "5",
        worstRating: "1",
      },
    }))
  }

  return schema
}

// ── WebPage schema for college pages — enables AI Overview entity linking ─────
export function generateCollegeWebPageSchema(college: {
  name: string
  shortName: string
  slug: string
  naac?: string
  nirfRank?: number | null
  type?: string
  feesMin?: number
  feesMax?: number
  avgPlacement?: number
  entranceExams?: string[]
}) {
  const pageUrl = `${BASE_URL}/colleges/${college.slug}`
  const today = new Date().toISOString().split('T')[0]
  const feesText = college.feesMin ? `₹${(college.feesMin / 100000).toFixed(1)}L–₹${(college.feesMax! / 100000).toFixed(1)}L/yr` : ''
  const placText = college.avgPlacement ? `, avg placement ₹${(college.avgPlacement / 100000).toFixed(1)} LPA` : ''
  const naacText = college.naac ? `NAAC ${college.naac}` : ''
  const nirfText = college.nirfRank ? `, NIRF #${college.nirfRank}` : ''

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${college.name} 2026 — Admission, Fees, Cutoff & Placement`,
    description: `${college.name} (${college.shortName}) is a ${college.type ?? ''} college in Pune. ${naacText}${nirfText}. Fees ${feesText}${placText}. Admission via ${college.entranceExams?.slice(0, 2).join(' / ') ?? 'entrance exam'}.`,
    inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@type": "CollegeOrUniversity", "@id": `${pageUrl}#college`, name: college.name },
    dateModified: `${today}`,
    // speakable tells Google AI which sections to use for AI Overview answers
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".overview-intro", ".key-facts-table", ".faq-section"],
    },
    potentialAction: {
      "@type": "ReadAction",
      target: [pageUrl],
    },
  }
}

// ── ItemList schema for stream/listing pages — helps AI Overview list colleges ─
export function generateCollegeListSchema(colleges: { name: string; slug: string; description?: string }[], heading: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    description: `Complete list of ${heading.toLowerCase()} in Pune 2026 with fees, NAAC grades, NIRF ranks, placements and admission details.`,
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${BASE_URL}/colleges/${c.slug}`,
      ...(c.description ? { description: c.description } : {}),
    })),
  }
}

// ── HowTo schema for admission process — surfaces in AI Overview step snippets ─
export function generateHowToSchema(title: string, steps: { step: number; title: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    description: `Step-by-step guide for ${title.toLowerCase()}`,
    step: steps.map(s => ({
      "@type": "HowToStep",
      position: s.step,
      name: s.title,
      text: s.description,
    })),
    inLanguage: "en-IN",
  }
}

export function generateItemListSchema(items: { name: string; url: string; description?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${BASE_URL}${item.url}`,
      description: item.description,
    })),
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "CollegePune",
    description: "AI-powered college discovery portal for Pune. Compare engineering, MBA, medical and law colleges by fees, placements, and NAAC rankings.",
    url: BASE_URL,
    telephone: "+917753831118",
    email: "support@collegepune.com",
    image: `${BASE_URL}/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Undri",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411060",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.5204,
      longitude: 73.8567,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    priceRange: "Free",
    areaServed: {
      "@type": "City",
      name: "Pune",
      sameAs: "https://en.wikipedia.org/wiki/Pune",
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  description: string
  author: string
  datePublished: string   // ISO 8601
  dateModified?: string
  url: string             // full path e.g. "/blog/my-slug"
  imageUrl?: string
  category?: string
  tags?: string[]
  wordCount?: number
}) {
  const isoPublished = (() => {
    try { return new Date(article.datePublished).toISOString() } catch { return new Date().toISOString() }
  })()
  const isoModified = article.dateModified
    ? (() => { try { return new Date(article.dateModified!).toISOString() } catch { return isoPublished } })()
    : isoPublished
  const pageUrl = `${BASE_URL}${article.url}`

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    headline: article.title.slice(0, 110),
    description: article.description,
    author: { "@type": "Person", name: article.author, url: `${BASE_URL}/blog` },
    publisher: {
      "@type": "Organization",
      name: "CollegePune",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png`, width: 200, height: 60 },
    },
    datePublished: isoPublished,
    dateModified: isoModified,
    url: pageUrl,
    image: {
      "@type": "ImageObject",
      url: article.imageUrl ?? `${BASE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    keywords: article.tags?.join(", "),
    articleSection: article.category,
    inLanguage: "en-IN",
    ...(article.wordCount ? { wordCount: article.wordCount } : {}),
    isPartOf: {
      "@type": "Blog",
      "@id": `${BASE_URL}/blog`,
      name: "CollegePune Blog",
      publisher: { "@type": "Organization", name: "CollegePune", url: BASE_URL },
    },
  }
}

export function generateCourseSchema(course: {
  name: string
  description: string
  provider: string
  duration: string
  url: string
  fees?: { min: number; max: number }
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    provider: {
      "@type": "CollegeOrUniversity",
      name: course.provider,
      sameAs: `${BASE_URL}`,
    },
    timeRequired: course.duration,
    url: `${BASE_URL}${course.url}`,
    offers: course.fees ? {
      "@type": "Offer",
      priceCurrency: "INR",
      price: course.fees.min,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: course.fees.min,
        maxPrice: course.fees.max,
        priceCurrency: "INR",
      },
    } : undefined,
  }
}
