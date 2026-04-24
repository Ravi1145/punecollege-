import type { MetadataRoute } from "next"
import { colleges } from "@/data/colleges"
import { seoPages } from "@/data/seoPages"

const BASE_URL = "https://collegepune.in"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/colleges`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/colleges-in-pune`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/courses`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/exams`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/counselling`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/predictor`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/nirf-insights`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/engineering-colleges-pune`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/mba-colleges-pune`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/medical-colleges-pune`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ]

  const collegeRoutes: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${BASE_URL}/colleges/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const seoRoutes: MetadataRoute.Sitemap = seoPages.map((p) => ({
    url: `${BASE_URL}/colleges-in-pune/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }))

  const cityStreams = [
    "pune", "nashik", "nagpur", "aurangabad", "kolhapur",
    "solapur", "thane", "navi-mumbai", "amravati", "latur",
  ]
  const streams = [
    "engineering", "mba", "medical", "law", "arts-science", "pharmacy", "architecture",
  ]

  const cityRoutes: MetadataRoute.Sitemap = cityStreams.flatMap((city) =>
    streams.map((stream) => ({
      url: `${BASE_URL}/city/${city}/${stream}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    }))
  )

  return [...staticRoutes, ...collegeRoutes, ...seoRoutes, ...cityRoutes]
}
