import { Metadata } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"
const SITE_NAME = "CollegePune"
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-default.jpg`

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
    title,
    description,
    keywords: [
      "colleges in pune",
      "best college in pune",
      "pune university colleges",
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
    description: "Find the best colleges in Pune. Compare fees, placements, rankings for engineering, MBA, medical and more.",
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: college.name,
    description: college.description,
    image: college.image,
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
    url: college.website,
    foundingDate: college.established.toString(),
    areaServed: "Pune",
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
