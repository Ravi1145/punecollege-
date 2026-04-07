"use client"
import { useState, useMemo } from "react"
import { Calculator, TrendingUp, IndianRupee, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const COURSE_DATA: Record<string, { avgSalary: number; growth: number; duration: number; label: string }> = {
  "btech-cs":     { label: "B.Tech Computer Engineering", avgSalary: 850000,  growth: 0.12, duration: 4 },
  "btech-mech":   { label: "B.Tech Mechanical",           avgSalary: 620000,  growth: 0.08, duration: 4 },
  "btech-civil":  { label: "B.Tech Civil",                avgSalary: 520000,  growth: 0.07, duration: 4 },
  "btech-elect":  { label: "B.Tech Electronics",          avgSalary: 680000,  growth: 0.10, duration: 4 },
  "mba":          { label: "MBA",                         avgSalary: 1200000, growth: 0.15, duration: 2 },
  "mbbs":         { label: "MBBS",                        avgSalary: 900000,  growth: 0.10, duration: 5 },
  "bca":          { label: "BCA",                         avgSalary: 450000,  growth: 0.10, duration: 3 },
  "bba":          { label: "BBA",                         avgSalary: 380000,  growth: 0.09, duration: 3 },
  "bsc-it":       { label: "B.Sc. IT",                   avgSalary: 420000,  growth: 0.10, duration: 3 },
  "llb":          { label: "LLB (3-year)",               avgSalary: 500000,  growth: 0.08, duration: 3 },
  "barch":        { label: "B.Arch",                     avgSalary: 480000,  growth: 0.07, duration: 5 },
}

function formatINR(n: number) {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹${(n / 100000).toFixed(2)} L`
  return `₹${n.toLocaleString("en-IN")}`
}

export default function ROICalculatorPage() {
  const [course, setCourse] = useState("btech-cs")
  const [totalFees, setTotalFees] = useState("400000")
  const [livingCost, setLivingCost] = useState("60000")
  const [currentSalary, setCurrentSalary] = useState("")
  const [calculated, setCalculated] = useState(false)

  const data = COURSE_DATA[course]

  const result = useMemo(() => {
    const fees = parseFloat(totalFees) || 0
    const living = parseFloat(livingCost) * data.duration || 0
    const totalInvestment = fees + living
    const opportunity = parseFloat(currentSalary) * data.duration || 0
    const totalCost = totalInvestment + opportunity

    const startSalary = data.avgSalary
    const years = 10
    let cumEarnings = 0
    let breakEvenYear = -1
    const yearData: { year: number; salary: number; cumulative: number; net: number }[] = []

    for (let y = 1; y <= years; y++) {
      const salary = startSalary * Math.pow(1 + data.growth, y - 1)
      cumEarnings += salary
      const net = cumEarnings - totalCost
      yearData.push({ year: y, salary: Math.round(salary), cumulative: Math.round(cumEarnings), net: Math.round(net) })
      if (net > 0 && breakEvenYear === -1) breakEvenYear = y
    }

    const totalReturn = cumEarnings
    const roi = totalCost > 0 ? ((totalReturn - totalCost) / totalCost) * 100 : 0

    return { totalInvestment, opportunity, totalCost, startSalary, yearData, breakEvenYear, totalReturn, roi }
  }, [course, totalFees, livingCost, currentSalary, data])

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0A1628] to-[#1E3A5F] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" /> EDUCATION ROI CALCULATOR
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Is Your Degree Worth It?
          </h1>
          <p className="text-blue-200 max-w-xl mx-auto">
            Calculate the real return on investment for any Pune college course — break-even point, 10-year earnings, and net ROI.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-orange-500" /> Your Inputs
            </h2>

            <div className="space-y-4">
              {/* Course */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Course / Program</label>
                <select
                  value={course}
                  onChange={(e) => { setCourse(e.target.value); setCalculated(false) }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400 bg-white"
                >
                  {Object.entries(COURSE_DATA).map(([k, v]) => (
                    <option key={k} value={k}>{v.label} ({v.duration} yr)</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">Avg starting salary: {formatINR(data.avgSalary)} | Annual salary growth: {(data.growth * 100).toFixed(0)}%</p>
              </div>

              {/* Total Fees */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5" /> Total Course Fees (₹)
                </label>
                <input
                  type="number"
                  value={totalFees}
                  onChange={(e) => setTotalFees(e.target.value)}
                  placeholder="e.g. 400000"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                />
                <p className="text-xs text-gray-400 mt-1">{formatINR(parseFloat(totalFees) || 0)} total fees</p>
              </div>

              {/* Annual Living */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Annual Living Cost (₹)</label>
                <input
                  type="number"
                  value={livingCost}
                  onChange={(e) => setLivingCost(e.target.value)}
                  placeholder="e.g. 60000"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                />
                <p className="text-xs text-gray-400 mt-1">Hostel + food + misc. Total: {formatINR((parseFloat(livingCost) || 0) * data.duration)}</p>
              </div>

              {/* Opportunity cost */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Annual Salary (if working) <span className="text-gray-400 font-normal">optional</span></label>
                <input
                  type="number"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                  placeholder="Opportunity cost (e.g. 200000)"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-orange-400"
                />
                <p className="text-xs text-gray-400 mt-1">What you forgo by studying instead of working</p>
              </div>

              <button
                onClick={() => setCalculated(true)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Calculator className="w-4 h-4" /> Calculate ROI
              </button>
            </div>
          </div>

          {/* Results Panel */}
          {calculated ? (
            <div className="space-y-4">
              {/* Summary cards */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: "Total Investment", value: formatINR(result.totalCost), icon: IndianRupee, color: "border-red-200 bg-red-50", text: "text-red-700" },
                  { label: "10-yr Gross Earnings", value: formatINR(result.totalReturn), icon: TrendingUp, color: "border-green-200 bg-green-50", text: "text-green-700" },
                  { label: "Break-even Year", value: result.breakEvenYear > 0 ? `Year ${result.breakEvenYear}` : "10+ yrs", icon: Clock, color: "border-blue-200 bg-blue-50", text: "text-blue-700" },
                  { label: "10-yr ROI", value: `${Math.round(result.roi)}%`, icon: CheckCircle, color: "border-purple-200 bg-purple-50", text: "text-purple-700" },
                ].map(({ label, value, icon: Icon, color, text }) => (
                  <div key={label} className={cn("rounded-xl border p-4", color)}>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={cn("w-4 h-4", text)} />
                      <p className="text-xs text-gray-500">{label}</p>
                    </div>
                    <p className={cn("text-xl font-extrabold", text)}>{value}</p>
                  </div>
                ))}
              </div>

              {/* Year-by-year table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-gray-900">Year-by-Year Earnings Projection</h3>
                  <span className="text-xs text-gray-400">Starting at {formatINR(result.startSalary)}/yr</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-2 sm:px-4 py-2 text-xs font-semibold text-gray-500">Year</th>
                        <th className="text-right px-2 sm:px-4 py-2 text-xs font-semibold text-gray-500">Salary</th>
                        <th className="text-right px-2 sm:px-4 py-2 text-xs font-semibold text-gray-500 hidden sm:table-cell">Cumulative</th>
                        <th className="text-right px-2 sm:px-4 py-2 text-xs font-semibold text-gray-500">Net Gain/Loss</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {result.yearData.map((row) => (
                        <tr key={row.year} className={cn("hover:bg-gray-50", row.net > 0 && row.year === result.breakEvenYear && "bg-green-50")}>
                          <td className="px-2 sm:px-4 py-2 font-medium text-sm">
                            <span className="hidden sm:inline">Year </span>{row.year}
                            {row.year === result.breakEvenYear && <span className="ml-1 text-[10px] bg-green-500 text-white px-1.5 rounded-full hidden sm:inline">Break-even ✓</span>}
                          </td>
                          <td className="px-2 sm:px-4 py-2 text-right text-sm">{formatINR(row.salary)}</td>
                          <td className="px-2 sm:px-4 py-2 text-right text-sm hidden sm:table-cell">{formatINR(row.cumulative)}</td>
                          <td className={cn("px-2 sm:px-4 py-2 text-right font-semibold text-sm", row.net >= 0 ? "text-green-600" : "text-red-500")}>
                            {row.net >= 0 ? "+" : ""}{formatINR(row.net)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ROI verdict */}
              <div className={cn(
                "rounded-xl p-4 border",
                result.roi > 200 ? "bg-green-50 border-green-200" : result.roi > 100 ? "bg-blue-50 border-blue-200" : "bg-yellow-50 border-yellow-200"
              )}>
                <div className="flex items-start gap-3">
                  {result.roi > 100
                    ? <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    : <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  }
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {result.roi > 300 ? "Excellent ROI — Highly recommended" :
                       result.roi > 200 ? "Very good ROI — Worth the investment" :
                       result.roi > 100 ? "Good ROI — Solid investment" :
                       "Moderate ROI — Consider scholarship options"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      For every ₹1 invested, you earn back ₹{(result.roi / 100 + 1).toFixed(1)} over 10 years.
                      {result.breakEvenYear > 0 && ` Break-even happens in Year ${result.breakEvenYear} after graduation.`}
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/counselling" className="block text-center bg-[#0A1628] hover:bg-[#162040] text-white font-bold py-3 rounded-xl text-sm transition-colors">
                Talk to a Counsellor About Scholarships →
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                <Calculator className="w-8 h-8 text-orange-400" />
              </div>
              <p className="text-gray-500 text-sm">Fill in your details and click <strong>Calculate ROI</strong> to see your 10-year earnings projection and break-even analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
