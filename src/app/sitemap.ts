import { MetadataRoute } from "next"
import { colleges } from "@/data/colleges"
import { getAllBlogs } from "@/lib/db"
import { blogs as staticBlogs } from "@/data/blogs"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                       lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/colleges`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/blog`,             lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/compare`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/counselling`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/predictor`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`, lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ]

  // Stream filter pages
  const streams = ["Engineering", "MBA", "Medical", "Arts & Science", "Law", "Architecture"]
  const streamPages: MetadataRoute.Sitemap = streams.map((s) => ({
    url: `${BASE_URL}/colleges?stream=${encodeURIComponent(s)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  // All 103 college detail pages
  const collegePages: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${BASE_URL}/colleges/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Blog pages — DB first, fall back to static
  let blogSlugs: string[] = []
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", limit: 500 })
    blogSlugs = dbBlogs.map((b) => b.slug)
  } catch {
    blogSlugs = staticBlogs.map((b) => b.slug)
  }
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...streamPages, ...collegePages, ...blogPages]
}
