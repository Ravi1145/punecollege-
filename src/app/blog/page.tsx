import { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta } from "@/lib/seo"
import { blogs as staticBlogs } from "@/data/blogs"
import { Clock, ArrowRight, Rss } from "lucide-react"

export const revalidate = 300 // ISR — refresh every 5 min

export const metadata: Metadata = genMeta({
  title: "Pune College Blog — Guides, Tips & Admission Advice 2026",
  description: "Expert guides on Pune college admissions, MHT-CET preparation, MBA fees, NEET cutoffs, and career planning. Read the latest articles from CollegePune.",
  path: "/blog",
  keywords: ["pune college guides", "mht-cet preparation", "mba admission pune", "best colleges pune blog"],
})

interface Post {
  id: number | string
  slug: string
  title: string
  excerpt: string
  author: string
  date?: string
  published_at?: string
  readTime?: string
  read_time?: string
  category: string
  tags: string[]
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const res = await fetch(`${base}/api/blogs?limit=50`, { next: { revalidate: 300 } })
    if (!res.ok) throw new Error('api fail')
    const { blogs } = await res.json()
    if (Array.isArray(blogs) && blogs.length > 0) return blogs as Post[]
  } catch {
    // fall through to static
  }
  return staticBlogs as Post[]
}

export default async function BlogPage() {
  const posts = await fetchPosts()

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Rss className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wide">Latest Articles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            College Guides & Insights
          </h1>
          <p className="text-gray-300 max-w-2xl">
            Expert advice on Pune college admissions, entrance exam preparation, fees, placements, and career planning.
          </p>
          <p className="text-gray-400 text-sm mt-2">{posts.length} articles published</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => {
            const dateStr = post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
              : (post.date ?? '')
            const readTime = post.read_time ?? post.readTime ?? '5 min read'
            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all overflow-hidden h-full flex flex-col">
                  <div className={`h-2 ${
                    i % 3 === 0 ? "bg-gradient-to-r from-orange-400 to-orange-600" :
                    i % 3 === 1 ? "bg-gradient-to-r from-blue-400 to-blue-600" :
                    "bg-gradient-to-r from-green-400 to-green-600"
                  }`} />
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs bg-orange-50 text-orange-700 font-medium px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {readTime}
                      </div>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-600 flex-1 line-clamp-3 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-700">{(post.author ?? 'C')[0]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">{post.author ?? 'CollegePune'}</p>
                          <p className="text-xs text-gray-400">{dateStr}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-orange-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Rss className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p>No articles published yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
