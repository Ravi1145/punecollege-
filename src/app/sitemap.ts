import { MetadataRoute } from "next"
import { colleges } from "@/data/colleges"
import { blogs as staticBlogs } from "@/data/blogs"
import { exams } from "@/data/exams"
import { courses } from "@/data/courses"
import { getAllCutoffParams } from "@/data/cutoffs"
import { createClient } from "@supabase/supabase-js"

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

  // (stream filter query-string URLs removed — Google ignores ?param URLs in sitemaps;
  //  each stream has its own canonical landing page already listed in seoPages)

  // All college detail pages (auto-generated from static data)
  const collegePages: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${BASE_URL}/colleges/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Blog pages — Supabase first, fall back to static
  let blogSlugs: string[] = []
  try {
    const adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
    const { data, error } = await adminClient
      .from("blogs")
      .select("slug")
      .eq("status", "published")
      .order("updated_at", { ascending: false })
      .limit(500)
    if (error || !data?.length) throw new Error("empty")
    blogSlugs = data.map((b: { slug: string }) => b.slug)
  } catch {
    blogSlugs = staticBlogs.map((b) => b.slug)
  }
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // SEO landing pages — guides, rankings, tools
  const seoPages: MetadataRoute.Sitemap = [
    // Canonical stream guides
    { url: `${BASE_URL}/engineering-colleges-pune`,                 lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-pune`,                         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/medical-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/design-colleges-pune`,                      lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/law-colleges-pune`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/arts-colleges-pune`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/pharmacy-colleges-pune`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bca-colleges-pune`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/government-colleges-pune`,                  lastModified: new Date(), changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE_URL}/architecture-colleges-pune`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bba-colleges-pune`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bsc-it-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/colleges-in-pune-with-hostel`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Ranking pages
    { url: `${BASE_URL}/top-10-engineering-colleges-in-pune`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-10-mba-colleges-in-pune`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-10-medical-colleges-in-pune`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
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
    // New content pages
    { url: `${BASE_URL}/scholarships`,                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/news`,                                      lastModified: new Date(), changeFrequency: "daily",   priority: 0.85 },
    { url: `${BASE_URL}/qa`,                                        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/ask`,                                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // ScholarPath AI features
    { url: `${BASE_URL}/ai-counselor`,                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/career-paths`,                              lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Engineering deep-dives
    { url: `${BASE_URL}/top-engineering-colleges-pune`,             lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/btech-colleges-pune`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/computer-engineering-colleges-pune`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mechanical-engineering-colleges-pune`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // MBA deep-dives
    { url: `${BASE_URL}/best-mba-colleges-pune`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pgdm-colleges-pune`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Medical
    { url: `${BASE_URL}/mbbs-colleges-pune`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/neet-colleges-pune`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // NAAC & rankings
    { url: `${BASE_URL}/naac-a-plus-colleges-pune`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-placement-colleges-pune`,               lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Fees
    { url: `${BASE_URL}/low-fee-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/colleges-pune-fees`,                        lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Entrance exam clusters
    { url: `${BASE_URL}/mht-cet-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/jee-colleges-pune`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/cat-colleges-pune`,                         lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Streams
    { url: `${BASE_URL}/science-colleges-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/commerce-colleges-pune`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    // Area-specific
    { url: `${BASE_URL}/colleges-kothrud-pune`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-hadapsar-pune`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-wakad-pune`,                       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]

  // Cutoff pages — one per [exam, college] pair
  const cutoffIndexPage: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/cutoffs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ]
  const cutoffPages: MetadataRoute.Sitemap = getAllCutoffParams().map(({ exam, college }) => ({
    url: `${BASE_URL}/cutoffs/${exam}/${college}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  // Exam detail pages
  const examPages: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${BASE_URL}/exams/${e.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Course detail pages
  const courseDetailPages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // Career path detail pages
  const { careerPaths } = await import("@/data/careerPaths")
  const careerPathPages: MetadataRoute.Sitemap = careerPaths.map(p => ({
    url: `${BASE_URL}/career-paths/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const alumniPages: MetadataRoute.Sitemap = [
    "alumni", "alumni/rahul-sharma-coep-2023", "alumni/priya-desai-sibm-2022",
    "alumni/aditya-kulkarni-pict-2023", "alumni/sneha-patil-afmc-2021",
    "alumni/karan-mehta-vit-2023", "alumni/ananya-joshi-mit-wpu-2022",
  ].map((path) => ({
    url: `${BASE_URL}/${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...seoPages,
    ...collegePages,
    ...blogPages,
    ...cutoffIndexPage,
    ...cutoffPages,
    ...examPages,
    ...courseDetailPages,
    ...careerPathPages,
    ...alumniPages,
  ]
}
