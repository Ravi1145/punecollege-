import Link from "next/link"
import { ArrowRight, Clock, Tag } from "lucide-react"
import { getFeaturedBlogs } from "@/data/blogs"

export default function BlogPreview() {
  const posts = getFeaturedBlogs()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              College Guides & Insights
            </h2>
            <p className="text-gray-500 mt-1">Expert advice on admissions, fees, and career planning</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                {/* Colored header */}
                <div className={`h-3 ${
                  i === 0 ? "bg-gradient-to-r from-orange-400 to-orange-600" :
                  i === 1 ? "bg-gradient-to-r from-blue-400 to-blue-600" :
                  "bg-gradient-to-r from-green-400 to-green-600"
                }`} />
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-orange-50 text-orange-700 px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-orange-700 font-bold">{post.author[0]}</span>
                      </div>
                      <span className="text-xs text-gray-500">{post.author}</span>
                    </div>
                    <span className="text-xs text-orange-600 font-semibold group-hover:text-orange-700">
                      Read more →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
