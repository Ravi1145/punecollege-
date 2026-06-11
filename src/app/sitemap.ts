import { MetadataRoute } from "next"
import { colleges } from "@/data/colleges"
import { blogs as staticBlogs } from "@/data/blogs"
import { exams } from "@/data/exams"
import { courses } from "@/data/courses"
import { getAllCutoffParams } from "@/data/cutoffs"
import { seoPages as seoPageData } from "@/data/seoPages"
import { createClient } from "@supabase/supabase-js"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages â€" lastModified reflects when content was meaningfully last changed
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL,                               lastModified: "2026-06-01", changeFrequency: "daily",   priority: 1.0 },
    { url: `${BASE_URL}/colleges`,                 lastModified: "2026-06-01", changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/colleges-in-pune`,         lastModified: "2026-06-01", changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE_URL}/blog`,                     lastModified: new Date(),   changeFrequency: "daily",   priority: 0.8 },
    { url: `${BASE_URL}/exams`,                    lastModified: "2026-04-01", changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/courses`,                  lastModified: "2026-04-01", changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/ai-finder`,                lastModified: "2026-03-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare`,                  lastModified: "2026-04-01", changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/counselling`,              lastModified: "2026-03-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/predictor`,                lastModified: "2026-04-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/roi-calculator`,           lastModified: "2026-03-01", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/nirf-insights`,            lastModified: "2026-04-01", changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy`,                  lastModified: "2025-01-01", changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms`,                    lastModified: "2025-01-01", changeFrequency: "yearly",  priority: 0.3 },
  ]

  // (stream filter query-string URLs removed â€" Google ignores ?param URLs in sitemaps;
  //  each stream has its own canonical landing page already listed in seoPages)

  // All college detail pages (auto-generated from static data)
  const collegePages: MetadataRoute.Sitemap = colleges.map((c) => ({
    url: `${BASE_URL}/colleges/${c.slug}`,
    lastModified: "2026-06-01", // static — prevents every ISR build from signalling "changed today"
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Blog pages â€" Supabase first, fall back to static
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

  // SEO landing pages â€" guides, rankings, tools
  const seoPages: MetadataRoute.Sitemap = [
    // Canonical stream guides
    { url: `${BASE_URL}/engineering-colleges-pune`,                 lastModified: "2026-06-01", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-pune`,                         lastModified: "2026-06-01", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/medical-colleges-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/design-colleges-pune`,                      lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/law-colleges-pune`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/arts-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/pharmacy-colleges-pune`,                    lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bca-colleges-pune`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/government-colleges-pune`,                  lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE_URL}/architecture-colleges-pune`,               lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bba-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/bsc-it-colleges-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/colleges-in-pune-with-hostel`,             lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Ranking pages
    { url: `${BASE_URL}/top-10-engineering-colleges-in-pune`,       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-10-mba-colleges-in-pune`,               lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-10-medical-colleges-in-pune`,           lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    // Placement guides
    { url: `${BASE_URL}/engineering-colleges-pune-placement`,       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-pune-placement`,               lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Private college comparisons
    { url: `${BASE_URL}/private-engineering-colleges-pune`,         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/private-mba-colleges-pune`,                 lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    // Fees & scholarship guides
    { url: `${BASE_URL}/low-fees-engineering-colleges-pune`,        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/low-fees-mba-colleges-pune`,                lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/engineering-colleges-pune-scholarship`,     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mba-colleges-pune-scholarship`,             lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    // Admission without entrance exam guides
    { url: `${BASE_URL}/engineering-admission-pune-without-jee`,   lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/mba-admission-pune-without-cat`,            lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    // Direct admission (commercial)
    { url: `${BASE_URL}/direct-admission-engineering-colleges-pune`, lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/direct-admission-mba-colleges-pune`,        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.75 },
    // Comparison page
    { url: `${BASE_URL}/pune-colleges-comparison-engineering-mba`,  lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    // Deadline tracker
    { url: `${BASE_URL}/pune-admission-deadline-tracker-2026`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    // Interactive tools
    { url: `${BASE_URL}/pune-college-fees-calculator`,              lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE_URL}/pune-college-placement-comparator`,         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.75 },
    // New content pages
    { url: `${BASE_URL}/scholarships`,                              lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/news`,                                      lastModified: new Date(), changeFrequency: "daily",   priority: 0.85 },
    { url: `${BASE_URL}/qa`,                                        lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE_URL}/ask`,                                       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.7 },
    // ScholarPath AI features
    { url: `${BASE_URL}/ai-counselor`,                              lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/career-paths`,                              lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Engineering deep-dives
    { url: `${BASE_URL}/top-engineering-colleges-pune`,             lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/btech-colleges-pune`,                       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/computer-engineering-colleges-pune`,        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mechanical-engineering-colleges-pune`,      lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // MBA deep-dives
    { url: `${BASE_URL}/best-mba-colleges-pune`,                    lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pgdm-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Medical
    { url: `${BASE_URL}/mbbs-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/neet-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // NAAC & rankings
    { url: `${BASE_URL}/naac-a-plus-colleges-pune`,                 lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/top-placement-colleges-pune`,               lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Fees
    { url: `${BASE_URL}/low-fee-colleges-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/colleges-pune-fees`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Entrance exam clusters
    { url: `${BASE_URL}/mht-cet-colleges-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/jee-colleges-pune`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/cat-colleges-pune`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Streams
    { url: `${BASE_URL}/science-colleges-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/commerce-colleges-pune`,                    lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.85 },
    // Area-specific
    { url: `${BASE_URL}/colleges-kothrud-pune`,                     lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-hadapsar-pune`,                    lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-wakad-pune`,                       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.8 },
    // College comparisons â€" high-traffic keyword pages
    { url: `${BASE_URL}/coep-vs-pict-pune`,                         lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sibm-vs-scmhrd-pune`,                       lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    // Exam-specific pages
    { url: `${BASE_URL}/neet-cutoff-pune-colleges`,                 lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/jee-main-colleges-pune`,                    lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    // New stream pages
    { url: `${BASE_URL}/bcom-colleges-pune`,                        lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/sppu-affiliated-colleges-pune`,             lastModified: "2026-05-01", changeFrequency: "monthly", priority: 0.9 },
    // New comparison pages
    { url: `${BASE_URL}/vit-pune-vs-mit-wpu`,                       lastModified: "2026-06-03", changeFrequency: "monthly", priority: 0.9 },
    // New category pages
    { url: `${BASE_URL}/data-science-colleges-pune`,                lastModified: "2026-06-03", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/pune-colleges-fees-under-1-lakh`,           lastModified: "2026-06-03", changeFrequency: "monthly", priority: 0.85 },
    // Counselling guide
    { url: `${BASE_URL}/mht-cet-counselling-pune-2026`,             lastModified: "2026-06-03", changeFrequency: "weekly",  priority: 0.95 },
    // MBA cluster pages — full keyword coverage
    { url: `${BASE_URL}/mba-colleges-in-pune`,                                lastModified: "2026-06-11", changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/mba-colleges-in-pune-under-5-lakh`,                   lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-under-10-lakh`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-under-15-lakh`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-under-20-lakh`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-low-fees`,                       lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-scholarship`,                    lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-cat`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-cmat`,                 lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-mh-cet`,               lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-mat`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-xat`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-accepting-gmat`,                 lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-without-entrance-exam`,          lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-direct-admission`,               lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-marketing`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-finance`,                    lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-hr`,                         lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-operations`,                 lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-business-analytics`,         lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-international-business`,     lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-supply-chain`,               lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-it`,                         lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-entrepreneurship`,           lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-data-science`,               lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-with-100-placement`,             lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-highest-package`,                lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-average-package`,                lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-placements-pune`,                                 lastModified: "2026-06-11", changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/mba-colleges-in-pune-with-hostel`,                    lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-for-girls`,                      lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-part-time`,                      lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-weekend`,                        lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-colleges-in-pune-executive`,                      lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-online`,                         lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/mba-cutoff-pune`,                                     lastModified: "2026-06-11", changeFrequency: "weekly",  priority: 0.95 },
    { url: `${BASE_URL}/mba-colleges-in-pune-cutoff-50-percentile`,           lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-cutoff-70-percentile`,           lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-colleges-in-pune-cutoff-90-percentile`,           lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.88 },
    { url: `${BASE_URL}/mba-admission-process-pune`,                          lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    // BTech keyword cluster — full coverage
    { url: `${BASE_URL}/btech-colleges-in-pune`,                               lastModified: "2026-06-11", changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/best-btech-colleges-in-pune`,                          lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/top-btech-colleges-in-pune`,                           lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.95 },
    { url: `${BASE_URL}/btech-admission-in-pune`,                              lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE_URL}/btech-colleges-in-pune-with-fees`,                     lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE_URL}/btech-colleges-in-pune-with-placement`,                lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE_URL}/btech-colleges-in-pune-direct-admission`,              lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE_URL}/btech-colleges-in-pune-without-jee`,                   lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE_URL}/btech-colleges-in-pune-through-mht-cet`,               lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.92 },
    { url: `${BASE_URL}/btech-colleges-in-pune-under-5-lakh`,                  lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.90 },
    { url: `${BASE_URL}/btech-colleges-in-pune-under-10-lakh`,                 lastModified: "2026-06-11", changeFrequency: "monthly", priority: 0.90 },
    // NEW: missing course pillar pages
    { url: `${BASE_URL}/mca-colleges-pune`,                         lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/mtech-colleges-pune`,                       lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/bsc-colleges-pune`,                         lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.9 },
    // NEW: location pages
    { url: `${BASE_URL}/colleges-hinjewadi-pune`,                   lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/colleges-viman-nagar-pune`,                 lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-aundh-pune`,                      lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-baner-pune`,                      lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-kharadi-pune`,                    lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/colleges-nigdi-pune`,                      lastModified: "2026-06-10", changeFrequency: "monthly", priority: 0.8 },
  ]

  // Cutoff pages â€" one per [exam, college] pair
  const cutoffIndexPage: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/cutoffs`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
  ]
  const cutoffPages: MetadataRoute.Sitemap = getAllCutoffParams().map(({ exam, college }) => ({
    url: `${BASE_URL}/cutoffs/${exam}/${college}`,
    lastModified: "2026-06-01", // static — cutoff data doesn't change daily
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  // Exam detail pages
  const examPages: MetadataRoute.Sitemap = exams.map((e) => ({
    url: `${BASE_URL}/exams/${e.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: "2026-05-01",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  // Course detail pages
  const courseDetailPages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${BASE_URL}/courses/${c.slug}`,
    lastModified: "2026-05-01",
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  // Career path detail pages
  const { careerPaths } = await import("@/data/careerPaths")
  const careerPathPages: MetadataRoute.Sitemap = careerPaths.map(p => ({
    url: `${BASE_URL}/career-paths/${p.slug}`,
    lastModified: "2026-05-01",
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const alumniPages: MetadataRoute.Sitemap = [
    "alumni", "alumni/rahul-sharma-coep-2023", "alumni/priya-desai-sibm-2022",
    "alumni/aditya-kulkarni-pict-2023", "alumni/sneha-patil-afmc-2021",
    "alumni/karan-mehta-vit-2023", "alumni/ananya-joshi-mit-wpu-2022",
  ].map((path) => ({
    url: `${BASE_URL}/${path}`,
    lastModified: "2026-05-01",
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  // Slugs that 301-redirect to a canonical standalone page - exclude from sitemap
  const REDIRECTED_SLUGS = new Set([
    "engineering-colleges-pune", "mba-colleges-pune", "medical-colleges-pune",
    "design-colleges-pune", "law-colleges-pune", "arts-colleges-pune",
    "science-colleges-pune", "commerce-colleges-pune", "government-colleges-pune",
    "naac-a-plus-colleges-pune", "top-placement-colleges-pune", "mht-cet-colleges-pune",
    "low-fee-colleges-pune", "neet-colleges-pune", "jee-main-colleges-pune",
    // Additional redirected slugs - keep in sync with next.config.ts redirects
    "top-engineering-colleges-pune", "btech-colleges-pune", "best-mba-colleges-pune",
    "pgdm-colleges-pune", "mbbs-colleges-pune", "jee-colleges-pune",
    "cat-colleges-pune", "bca-colleges-pune", "bba-colleges-pune",
    "bsc-it-colleges-pune", "pharmacy-colleges-pune", "architecture-colleges-pune",
    "bcom-colleges-pune", "sppu-affiliated-colleges-pune",
    "top-10-engineering-colleges-in-pune", "top-10-mba-colleges-in-pune", "top-10-medical-colleges-in-pune",
  ])

  // /colleges-in-pune/[slug] â€" only include pages that don't redirect
  const collegesInPunePages: MetadataRoute.Sitemap = seoPageData
    .filter((p) => !REDIRECTED_SLUGS.has(p.slug))
    .map((p) => ({
      url: `${BASE_URL}/colleges-in-pune/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }))

  // College sub-pages: fees, placements, cutoff, admission, scholarship
  const collegeSubPages: MetadataRoute.Sitemap = colleges.flatMap(c =>
    ["fees", "placements", "cutoff", "admission", "scholarship"].map(sub => ({
      url: `${BASE_URL}/colleges/${c.slug}/${sub}`,
      lastModified: "2026-06-10",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  )

  // Dynamic comparison pages
  const { COMPARISON_PAIRS } = await import("@/app/compare/[slug]/page")
  const comparisonPages: MetadataRoute.Sitemap = COMPARISON_PAIRS.map(([a, b]) => ({
    url: `${BASE_URL}/compare/${a}-vs-${b}`,
    lastModified: "2026-06-10",
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }))

  return [
    ...staticPages,
    ...seoPages,
    ...collegePages,
    ...collegeSubPages,
    ...comparisonPages,
    ...collegesInPunePages,
    ...blogPages,
    ...cutoffIndexPage,
    ...cutoffPages,
    ...examPages,
    ...courseDetailPages,
    ...careerPathPages,
    ...alumniPages,
  ]
}
