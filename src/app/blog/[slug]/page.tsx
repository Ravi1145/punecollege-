import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { blogs, getBlogBySlug } from "@/data/blogs"
import { generateMetadata as genMeta } from "@/lib/seo"
import { Clock, Calendar, ChevronRight, Tag } from "lucide-react"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.in"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) return {}
  return genMeta({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    keywords: post.tags,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogBySlug(slug)
  if (!post) notFound()

  const related = blogs.filter((b) => b.id !== post.id && b.category === post.category).slice(0, 3)

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    dateModified: post.date,
    publisher: {
      "@type": "Organization",
      name: "CollegePune",
      url: BASE_URL,
    },
    url: `${BASE_URL}/blog/${slug}`,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-IN",
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <Script id="blog-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-orange-600">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blog" className="hover:text-orange-600">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 truncate max-w-xs">{post.title.slice(0, 40)}...</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <article className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{post.author}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-6 font-medium">{post.excerpt}</p>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{post.body}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/colleges?search=${encodeURIComponent(tag)}`}
                  className="flex items-center gap-1 text-xs bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-600 px-3 py-1.5 rounded-full transition-colors"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-900 mb-5">More Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group">
                  <div className="bg-white rounded-xl border border-gray-100 hover:border-orange-200 p-4 h-full transition-all">
                    <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{r.category}</span>
                    <h3 className="text-sm font-semibold text-gray-900 mt-2 group-hover:text-orange-600 transition-colors line-clamp-2">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
