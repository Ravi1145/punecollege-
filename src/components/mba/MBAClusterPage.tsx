"use client"
import Link from "next/link"
import type { MBACollege } from "@/data/mbaColleges"

interface ClusterFAQ { question: string; answer: string }
interface InternalLink { label: string; href: string }

interface MBAClusterPageProps {
  h1: string
  subtitle: string
  quickAnswer: string
  stats: { value: string; label: string }[]
  colleges: MBACollege[]
  introHeading: string
  introParagraphs: string[]
  faqs: ClusterFAQ[]
  internalLinks: InternalLink[]
  ctaHeading: string
  ctaSubtext: string
}

export default function MBAClusterPage({
  h1, subtitle, quickAnswer, stats, colleges,
  introHeading, introParagraphs, faqs, internalLinks, ctaHeading, ctaSubtext,
}: MBAClusterPageProps) {
  const filtered = colleges

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="text-xs text-blue-300 mb-4 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link><span>›</span>
            <Link href="/mba-colleges-in-pune" className="hover:text-white">MBA Colleges in Pune</Link><span>›</span>
            <span className="text-white">{h1}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">{h1}</h1>
          <p className="text-blue-100 text-base max-w-3xl mb-5">{subtitle}</p>
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 max-w-3xl" data-speakable="true">
            <p className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">⚡ Quick Answer</p>
            <p className="text-white text-sm leading-relaxed">{quickAnswer}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {stats.map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 text-center">
                <p className="text-xl font-extrabold text-orange-400">{s.value}</p>
                <p className="text-xs text-white/70 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* College List */}
        <section aria-label="College list">
          <div className="space-y-4">
            {filtered.map((col, i) => (
              <article key={col.slug} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-900 text-base">
                      <Link href={`/colleges/${col.slug}`} className="hover:text-blue-700">{col.name}</Link>
                    </h2>
                    <p className="text-xs text-gray-500 mb-2">{col.location} · {col.type} · Est. {col.established}</p>
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">NAAC {col.naac}</span>
                      {col.nirfRank && <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">NIRF #{col.nirfRank}</span>}
                      {col.hostel && <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">🏠 Hostel</span>}
                      <span className="bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{col.entranceExams[0]}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="font-bold text-gray-900">₹{(col.feesPerYear / 100000).toFixed(1)}L/yr</p>
                        <p className="text-gray-500">Fees</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="font-bold text-green-700">₹{(col.avgPlacement / 100000).toFixed(1)} LPA</p>
                        <p className="text-gray-500">Avg Pkg</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2 text-center">
                        <p className="font-bold text-blue-700">₹{(col.highestPlacement / 100000).toFixed(1)} LPA</p>
                        <p className="text-gray-500">Highest</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    <Link href={`/colleges/${col.slug}`} className="hidden md:block px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 font-medium">View</Link>
                    <Link href={`/colleges/${col.slug}/fees`} className="hidden md:block px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">Fees</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Intro Content */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">{introHeading}</h2>
          {introParagraphs.map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed mb-3 text-sm">{p}</p>
          ))}
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(faq => (
              <details key={faq.question} className="border border-gray-100 rounded-xl p-4">
                <summary className="cursor-pointer font-semibold text-gray-800 text-sm flex justify-between items-center">
                  {faq.question}
                  <span className="text-gray-400 shrink-0 ml-2">▾</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h2 className="text-base font-bold text-gray-900 mb-3">Related MBA Pages</h2>
          <div className="flex flex-wrap gap-2">
            {internalLinks.map(l => (
              <Link key={l.href} href={l.href} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors">{l.label}</Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{ctaHeading}</h2>
          <p className="text-gray-300 mb-5 text-sm max-w-lg mx-auto">{ctaSubtext}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors">Free Counselling →</Link>
            <Link href="/predictor" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors">College Predictor</Link>
          </div>
        </section>

      </main>
    </div>
  )
}
