import { Metadata } from "next"
import { notFound } from "next/navigation"
import Script from "next/script"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import {
  cutoffsData, getCutoff, getCutoffsByCollege,
  getAllCutoffParams, examLabels, streamLabels,
  type CollegeCutoff,
} from "@/data/cutoffs"
import { colleges } from "@/data/colleges"
import InlineLeadForm from "@/components/leads/InlineLeadForm"
import NewsAlert from "@/components/leads/NewsAlert"

export const revalidate = 86400 // 24h ISR

interface Props {
  params: Promise<{ exam: string; college: string }>
}

export function generateStaticParams() {
  return getAllCutoffParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, college: slug } = await params
  const data = getCutoff(slug, exam)
  if (!data) return {}
  const examLabel = examLabels[exam] ?? exam.toUpperCase()
  const latest = data.cutoffs[data.cutoffs.length - 1]
  return genMeta({
    title: `${data.college_short} ${examLabel} Cutoff 2026 | ${data.college_name}`,
    description: `${data.college_name} ${examLabel} cutoff 2020–2026. Open category: ${latest.open} ${data.unit ?? ""}. OBC: ${latest.obc}. SC: ${latest.sc}. Check your chances of admission at ${data.college_short} Pune.`,
    path: `/cutoffs/${exam}/${slug}`,
    keywords: [
      `${data.college_short.toLowerCase()} ${examLabel.toLowerCase()} cutoff`,
      `${data.college_short.toLowerCase()} cutoff 2026`,
      `${data.college_name.toLowerCase()} cutoff`,
      `${examLabel.toLowerCase()} cutoff ${data.college_short.toLowerCase()} pune`,
      `${data.college_short.toLowerCase()} admission cutoff 2026`,
    ],
  })
}

function CutoffTable({ data }: { data: CollegeCutoff }) {
  const unit = data.unit === "rank" ? "Rank" : data.unit === "score" ? "Score" : "Percentile"
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[#0A1628] text-white">
            <th className="text-left px-4 py-3 font-semibold w-16">Year</th>
            <th className="text-right px-4 py-3 font-semibold">Open<br/><span className="text-xs font-normal text-gray-300">{unit}</span></th>
            <th className="text-right px-4 py-3 font-semibold">OBC<br/><span className="text-xs font-normal text-gray-300">{unit}</span></th>
            <th className="text-right px-4 py-3 font-semibold">SC<br/><span className="text-xs font-normal text-gray-300">{unit}</span></th>
            {data.cutoffs.some((c) => c.st !== undefined) && (
              <th className="text-right px-4 py-3 font-semibold">ST<br/><span className="text-xs font-normal text-gray-300">{unit}</span></th>
            )}
          </tr>
        </thead>
        <tbody>
          {[...data.cutoffs].reverse().map((row, i) => (
            <tr key={row.year} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-3 font-bold text-gray-900">
                {row.year}
                {row.year === new Date().getFullYear() && (
                  <span className="ml-1 text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-semibold">Est.</span>
                )}
              </td>
              <td className="px-4 py-3 text-right font-mono font-semibold text-blue-700">{row.open}</td>
              <td className="px-4 py-3 text-right font-mono text-orange-700">{row.obc}</td>
              <td className="px-4 py-3 text-right font-mono text-green-700">{row.sc}</td>
              {data.cutoffs.some((c) => c.st !== undefined) && (
                <td className="px-4 py-3 text-right font-mono text-purple-700">{row.st ?? "—"}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TrendIndicator({ data }: { data: CollegeCutoff }) {
  const sorted = [...data.cutoffs].sort((a, b) => a.year - b.year)
  const first = sorted[0], last = sorted[sorted.length - 1]
  const unit = data.unit === "rank" ? "" : data.unit === "score" ? " marks" : " %ile"
  const isRank = data.unit === "rank"
  const trend = isRank
    ? first.open > last.open ? "📈 Getting more competitive" : "📉 Slightly easier than 2020"
    : last.open > first.open ? "📈 Getting more competitive" : "📉 Slightly easier than 2020"

  return (
    <div className="bg-blue-50 rounded-2xl p-4 text-sm">
      <p className="font-bold text-gray-900 mb-2">6-Year Trend (2020 → 2026)</p>
      <p className="text-blue-700 font-semibold">{trend}</p>
      <p className="text-gray-600 mt-1">
        Open cutoff moved from <strong>{first.open}{unit}</strong> in 2020 to <strong>{last.open}{unit}</strong> in 2026
        {isRank ? " (lower rank = harder)" : " (higher percentile = harder)"}.
      </p>
    </div>
  )
}

export default async function CutoffPage({ params }: Props) {
  const { exam, college: slug } = await params
  const data = getCutoff(slug, exam)
  if (!data) notFound()

  const examLabel = examLabels[exam] ?? exam.toUpperCase()
  const streamLabel = streamLabels[data.stream] ?? data.stream
  const latest = data.cutoffs[data.cutoffs.length - 1]

  // Other exams for the same college
  const otherExams = getCutoffsByCollege(slug).filter((c) => c.exam !== exam)

  // Related colleges (same exam, same stream, different college)
  const relatedCutoffs = cutoffsData
    .filter((c) => c.exam === exam && c.stream === data.stream && c.college_slug !== slug)
    .slice(0, 4)

  // College info for links
  const collegeInfo = colleges.find((c) => c.slug === slug)

  const faqs = [
    {
      question: `What is the ${examLabel} cutoff for ${data.college_short} Pune in 2026?`,
      answer: `${data.college_short} ${examLabel} cutoff 2026 (estimated): Open category — ${latest.open} ${data.unit === "rank" ? "(rank)" : data.unit === "score" ? "marks" : "percentile"}; OBC — ${latest.obc}; SC — ${latest.sc}${latest.st !== undefined ? `; ST — ${latest.st}` : ""}. These are based on 2020–2025 trends from CET Cell Maharashtra / official admission data.`,
    },
    {
      question: `Is ${examLabel} score enough for ${data.college_short} or do I need other documents?`,
      answer: `${examLabel} score is the primary eligibility criterion for ${data.college_short}. You also need: 10+2 passing certificate (50% for general, 45% for SC/ST), Domicile certificate (Maharashtra state quota), Caste certificate (if applicable), and valid photo ID. ${data.stream === "engineering" ? "CAP (Centralized Admission Process) registration is mandatory for SPPU-affiliated colleges." : ""}`,
    },
    {
      question: `What branch can I get in ${data.college_short} with ${latest.open - 1} ${data.unit === "rank" ? "rank" : data.unit === "score" ? "marks" : "percentile"}?`,
      answer: `With ${latest.open - 1} ${data.unit === "rank" ? "rank" : data.unit === "score" ? "marks" : "percentile"} you are borderline for ${data.college_short}. ${data.stream === "engineering" ? "CSE/IT typically has the highest cutoff. Mechanical and Civil are usually 1–3 percentile points lower. Check branch-wise cutoffs on the CET Cell official website for exact data." : "Admission is based on merit list. Contact the college admission office for seat availability."}`,
    },
    {
      question: `How are ${examLabel} cutoffs calculated for Pune colleges?`,
      answer: `${examLabel} cutoffs for Pune colleges are determined by the MHT-CET Cell (for engineering) or respective authorities based on: total seats in each category, number of applicants in that category, and merit rank of the last admitted student. Cutoffs can vary by branch. The data shown here covers Open (General), OBC, SC, and ST categories from official admission lists.`,
    },
    {
      question: `Can I get ${data.college_short} with ${Math.round(latest.open * 0.97)} ${data.unit === "rank" ? "rank" : data.unit === "score" ? "marks" : "percentile"}?`,
      answer: `${Math.round(latest.open * 0.97)} ${data.unit === "rank" ? "rank" : data.unit === "score" ? "marks" : "percentile"} may be insufficient for ${data.college_short}'s Open category based on 2026 trends (cutoff ~${latest.open}). However, you may qualify under reservation categories. Try our College Predictor for a personalized list of colleges matching your score across all categories.`,
    },
  ]

  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Cutoffs", url: "/cutoffs" },
    { name: examLabel, url: `/cutoffs/${exam}` },
    { name: data.college_short, url: `/cutoffs/${exam}/${slug}` },
  ])
  const faqSchema = generateFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))

  const tableSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${data.college_short} ${examLabel} Cutoff 2020–2026`,
    description: `Year-wise ${examLabel} cutoff data for ${data.college_name} (${data.college_short}) in Pune from 2020 to 2026. Data includes Open, OBC, SC, and ST category cutoffs.`,
    publisher: { "@type": "Organization", name: "CollegePune", url: "https://collegepune.com" },
    temporalCoverage: "2020/2026",
    keywords: [`${examLabel} cutoff`, data.college_short, "Pune", "admissions 2026"],
  }

  return (
    <>
      <Script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="table-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tableSchema) }} />

      <div className="bg-surface min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-xs text-blue-300 mb-4 flex gap-1 items-center flex-wrap">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>›</span>
              <Link href="/cutoffs" className="hover:text-white">Cutoffs</Link>
              <span>›</span>
              <Link href={`/cutoffs/${exam}`} className="hover:text-white">{examLabel}</Link>
              <span>›</span>
              <span className="text-white">{data.college_short}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {data.college_short} {examLabel} Cutoff 2026
            </h1>
            <p className="text-gray-300 text-base max-w-2xl mb-4">
              {data.college_name} — Year-wise {examLabel} cutoff data (2020–2026) for Open, OBC, SC & ST categories.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: `${examLabel} Data`, bg: "bg-blue-600/30" },
                { label: `2020–2026`, bg: "bg-white/10" },
                { label: streamLabel, bg: "bg-orange-500/30" },
                { label: `Open: ${latest.open} ${data.unit === "rank" ? "rank" : data.unit === "score" ? "marks" : "%ile"}`, bg: "bg-green-600/30" },
              ].map(({ label, bg }) => (
                <span key={label} className={`${bg} text-white text-xs px-3 py-1 rounded-full font-medium`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

          {/* Other exam tabs */}
          {otherExams.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs text-gray-500 font-semibold self-center">Also available:</span>
              {otherExams.map((e) => (
                <Link
                  key={e.exam}
                  href={`/cutoffs/${e.exam}/${slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-orange-400 hover:text-orange-600 transition-colors font-medium"
                >
                  {examLabels[e.exam] ?? e.exam.toUpperCase()} Cutoff
                </Link>
              ))}
            </div>
          )}

          {/* Main cutoff table */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-4">
              {data.college_short} {examLabel} Cutoff 2020–2026
            </h2>
            <CutoffTable data={data} />
            <p className="text-xs text-gray-400 mt-2">
              * 2026 figures are estimated based on 2020–2025 trend. Official cutoffs will be published after CET/NEET results. Source: CET Cell Maharashtra / official admission data.
            </p>
          </div>

          {/* Trend analysis */}
          <TrendIndicator data={data} />

          {/* Score predictor CTA */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 rounded-2xl p-5">
            <h3 className="font-extrabold text-gray-900 mb-1">Check Your Admission Chances</h3>
            <p className="text-sm text-gray-600 mb-4">
              Enter your {examLabel} score to see all Pune colleges you can get admission in — across all categories.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/predictor"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                🎯 Use College Predictor →
              </Link>
              {collegeInfo && (
                <Link
                  href={`/colleges/${slug}`}
                  className="bg-white border border-gray-200 hover:border-gray-400 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
                >
                  View {data.college_short} Profile →
                </Link>
              )}
            </div>
          </div>

          {/* Lead form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-extrabold text-gray-900 mb-1">
              Get {examLabel} Cutoff PDF on WhatsApp — Free
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              All 2020–2026 cutoffs for 25+ Pune colleges in a single PDF. Enter your number below.
            </p>
            <InlineLeadForm context={`cutoff_gate_${slug}_${exam}`} />
          </div>

          {/* Related colleges cutoffs */}
          {relatedCutoffs.length > 0 && (
            <div>
              <h2 className="text-lg font-extrabold text-gray-900 mb-4">
                {examLabel} Cutoffs at Other Pune {streamLabel} Colleges
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedCutoffs.map((rc) => {
                  const rcLatest = rc.cutoffs[rc.cutoffs.length - 1]
                  return (
                    <Link
                      key={`${rc.exam}-${rc.college_slug}`}
                      href={`/cutoffs/${rc.exam}/${rc.college_slug}`}
                      className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
                    >
                      <p className="font-bold text-gray-900 text-sm">{rc.college_short}</p>
                      <p className="text-xs text-gray-500 mb-2 truncate">{rc.college_name}</p>
                      <div className="flex gap-3 text-xs">
                        <span className="text-blue-700 font-semibold">Open: {rcLatest.open}</span>
                        <span className="text-orange-700">OBC: {rcLatest.obc}</span>
                        <span className="text-green-700">SC: {rcLatest.sc}</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-5">
              Frequently Asked Questions — {data.college_short} {examLabel} Cutoff
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <details key={faq.question} className="bg-white rounded-2xl border border-gray-100 px-5 py-4 group">
                  <summary className="font-semibold text-gray-900 text-sm cursor-pointer list-none flex items-center justify-between gap-2">
                    {faq.question}
                    <span className="text-orange-500 text-lg group-open:rotate-45 transition-transform shrink-0">+</span>
                  </summary>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-[#0A1628] to-[#1E3A5F] rounded-2xl p-6 text-center">
            <h2 className="text-xl font-extrabold text-white mb-2">Not Sure Which College to Apply?</h2>
            <p className="text-gray-300 text-sm mb-4">Our AI counsellor matches you to the right college based on your {examLabel} score, category, and budget.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/counselling" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Book Free Counselling
              </Link>
              <Link href="/predictor" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors border border-white/20">
                Try College Predictor
              </Link>
            </div>
          </div>

        {/* Merit list alert subscribe */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <NewsAlert
            examName={examLabel}
            source="cutoff_news_alert"
          />
        </div>

        </div>
      </div>
    </>
  )
}
