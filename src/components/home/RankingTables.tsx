"use client"
import { useState } from "react"
import Link from "next/link"
import { Trophy, TrendingUp, ExternalLink } from "lucide-react"
import { getTopEngineeringColleges, getTopMBAColleges, getTopMedicalColleges } from "@/data/colleges"
import { formatCurrency, formatFeesRange, getNaacColor, cn } from "@/lib/utils"
import * as Tabs from "@radix-ui/react-tabs"

const tabs = [
  { id: "engineering", label: "🏗️ Top BTech Colleges", title: "Top 10 BTech Colleges in Pune 2025" },
  { id: "mba", label: "💼 Top MBA Colleges", title: "Top 10 MBA Colleges in Pune 2025" },
  { id: "medical", label: "🏥 Top Medical Colleges", title: "Top Medical Colleges in Pune 2025" },
]

function RankTable({ colleges, title }: { colleges: ReturnType<typeof getTopEngineeringColleges>; title: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-5">{title}</h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full">
          <thead className="bg-[#0A1628] text-white text-sm">
            <tr>
              <th className="px-2 sm:px-4 py-3 text-left w-10 sm:w-12">Rank</th>
              <th className="px-2 sm:px-4 py-3 text-left">College</th>
              <th className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">NAAC</th>
              <th className="px-2 sm:px-4 py-3 text-right hidden md:table-cell">Annual Fees</th>
              <th className="px-2 sm:px-4 py-3 text-right hidden lg:table-cell">Avg Package</th>
              <th className="px-2 sm:px-4 py-3 text-center w-20 sm:w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {colleges.slice(0, 10).map((college, i) => (
              <tr key={college.id} className="bg-white hover:bg-orange-50/30 transition-colors group">
                <td className="px-2 sm:px-4 py-3">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold",
                    i === 0 ? "bg-yellow-100 text-yellow-700" :
                    i === 1 ? "bg-gray-100 text-gray-600" :
                    i === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-gray-50 text-gray-500"
                  )}>
                    {i + 1}
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-3">
                  <Link href={`/colleges/${college.slug}`} className="group-hover:text-orange-600 transition-colors">
                    <p className="font-semibold text-gray-900 text-sm">{college.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{college.location}</p>
                  </Link>
                </td>
                <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                  <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", getNaacColor(college.naac))}>
                    {college.naac}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right hidden md:table-cell">
                  <span className="text-sm text-gray-700">
                    {formatFeesRange(college.feesRange.min, college.feesRange.max)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right hidden lg:table-cell">
                  <span className="text-sm font-semibold text-green-700">
                    {formatCurrency(college.avgPlacement)}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="inline-flex items-center gap-1 text-xs bg-orange-500 hover:bg-orange-600 text-white px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[36px]"
                  >
                    View <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function RankingTables() {
  const engineering = getTopEngineeringColleges()
  const mba = getTopMBAColleges()
  const medical = getTopMedicalColleges()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Pune College Rankings 2025</h2>
            <p className="text-gray-500 text-sm mt-0.5">Based on NAAC grade, NIRF rank, placements & student reviews</p>
          </div>
        </div>

        <Tabs.Root defaultValue="engineering">
          <Tabs.List className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8 w-full sm:w-fit overflow-x-auto">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 transition-all data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="engineering">
            <RankTable colleges={engineering} title="Top 10 B.Tech Engineering Colleges in Pune 2025" />
          </Tabs.Content>
          <Tabs.Content value="mba">
            <RankTable colleges={mba} title="Top 10 MBA Colleges in Pune 2025" />
          </Tabs.Content>
          <Tabs.Content value="medical">
            <RankTable colleges={medical} title="Top Medical Colleges in Pune 2025 (NEET)" />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </section>
  )
}
