import { MetadataRoute } from "next"
import { colleges } from "@/data/colleges"
import { getAllBlogs } from "@/lib/db"
import { blogs as staticBlogs } from "@/data/blogs"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — only routes that actually exist
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                               lastModified: new Date(), changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/colleges`,                 lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/colleges-in-pune`,         lastModified: new Date(), changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/blog`,                     lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/exams`,                    lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/courses`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/ai-finder`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare`,                  lastModified: new Date(), changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/counselling`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/predictor`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/roi-calculator`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/nirf-insights`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`,                  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,                    lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
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

  // SEO landing pages — guides, rankings, tools
  const seoPages: MetadataRoute.Sitemap = [
    // Canonical stream guides
    { url: `${BASE_URL}/engineering-colleges-pune`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-pune`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/medical-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Ranking pages
    { url: `${BASE_URL}/top-10-engineering-colleges-in-pune`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-10-mba-colleges-in-pune`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    // Placement guides
    { url: `${BASE_URL}/engineering-colleges-pune-placement`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-pune-placement`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Private college comparisons
    { url: `${BASE_URL}/private-engineering-colleges-pune`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/private-mba-colleges-pune`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Fees & scholarship guides
    { url: `${BASE_URL}/low-fees-engineering-colleges-pune`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/low-fees-mba-colleges-pune`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/engineering-colleges-pune-scholarship`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mba-colleges-pune-scholarship`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Admission without entrance exam guides
    { url: `${BASE_URL}/engineering-admission-pune-without-jee`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mba-admission-pune-without-cat`,            lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Direct admission (commercial)
    { url: `${BASE_URL}/direct-admission-engineering-colleges-pune`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/direct-admission-mba-colleges-pune`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    // Comparison page
    { url: `${BASE_URL}/pune-colleges-comparison-engineering-mba`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Deadline tracker
    { url: `${BASE_URL}/pune-admission-deadline-tracker-2026`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    // Interactive tools
    { url: `${BASE_URL}/pune-college-fees-calculator`,              lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/pune-college-placement-comparator`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.75 },
  ]

  return [...staticPages, ...seoPages, ...streamPages, ...collegePages, ...blogPages]
}
