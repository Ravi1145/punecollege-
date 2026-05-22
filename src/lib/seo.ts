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
    name: "CollegePune",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description: "India's leading AI-powered college discovery portal for Pune. Find the best engineering, MBA, and medical colleges in Pune with fees, placements, and rankings.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Undri",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      postalCode: "411060",
      addressCountry: "IN",
    },
    telephone: "+917753831118",
    email: "Support@collegepune.com",
    sameAs: [
      "https://twitter.com/collegepune",
      "https://www.facebook.com/collegepune",
      "https://www.instagram.com/collegepune",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+917753831118",
      email: "Support@collegepune.com",
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CollegePune",
    url: BASE_URL,
    description: "Find the best colleges in Pune 2026. Compare fees, placements, NAAC grades and 2026 admission details for engineering, MBA, medical, arts, design and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/colleges?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
  image?: string
  rating?: number
  reviewCount?: number
  slug?: string
  reviews?: { studentName: string; course: string; year: number; rating: number; title: string; body: string }[]
}) {
  const pageUrl = `${BASE_URL}/colleges/${college.slug ?? ''}`

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    // CollegeOrUniversity is more specific and better recognised by Google for education rich results
    "@type": "CollegeOrUniversity",
    "@id": pageUrl,
    name: college.name,
    description: college.description,
    image: college.image
      ? { "@type": "ImageObject", url: college.image, name: college.name }
      : undefined,
    logo: `${BASE_URL}/logo.png`,
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
    sameAs: [college.website].filter(Boolean),
    foundingDate: college.established.toString(),
    areaServed: {
      "@type": "City",
      name: "Pune",
      sameAs: "https://en.wikipedia.org/wiki/Pune",
    },
    hasOfferCatalog: college.courses?.length ? {
      "@type": "OfferCatalog",
      name: "Academic Programs",
      itemListElement: college.courses.slice(0, 8).map((c, i) => ({
        "@type": "Offer",
        position: i + 1,
        itemOffered: { "@type": "Course", name: c },
      })),
    } : undefined,
  }

  // AggregateRating — unlocks gold star rich snippets in Google SERPs
  if (college.rating && college.rating > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: college.rating.toFixed(1),
      reviewCount: college.reviewCount && college.reviewCount > 0 ? college.reviewCount : 1,
      bestRating: "5",
      worstRating: "1",
    }
  }

  // Individual Review items — Google surfaces these in rich results below the star rating
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
    servesCuisine: undefined,
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
    "@type": ["Article", "BlogPosting"],
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
