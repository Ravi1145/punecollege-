"use client"

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from "recharts"
import type { CollegeCutoff } from "@/data/cutoffs"

interface Props {
  data: CollegeCutoff
  height?: number
}

const COLORS = {
  open: "#1a56db",
  obc:  "#f97316",
  sc:   "#16a34a",
  st:   "#9333ea",
}

const unitLabel: Record<string, string> = {
  percentile: "Percentile",
  rank:       "Rank (lower = better)",
  score:      "Score (out of 720)",
}

export default function CutoffChart({ data, height = 260 }: Props) {
  const hasST = data.cutoffs.some((c) => c.st !== undefined)
  const unit = unitLabel[data.unit ?? "percentile"] ?? "Percentile"

  // For rank, invert Y-axis (lower rank = better)
  const isRank = data.unit === "rank"

  const chartData = data.cutoffs.map((c) => ({
    year: c.year.toString(),
    Open: c.open,
    OBC:  c.obc,
    SC:   c.sc,
    ...(hasST ? { ST: c.st } : {}),
  }))

  return (
    <div>
      <p className="text-xs text-gray-500 mb-3 font-medium">
        {data.college_short} — {data.exam.toUpperCase()} Cutoff Trend (2020–2026) · {unit}
        {isRank && " · ⬇ lower is better"}
      </p>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            reversed={isRank}
            domain={["auto", "auto"]}
            tickFormatter={(v: number) => isRank ? v.toLocaleString() : v.toString()}
          />
          <Tooltip
            formatter={(value, name) => [
              value != null ? (isRank ? Number(value).toLocaleString() : String(value)) : "—",
              String(name),
            ]}
            labelFormatter={(label) => `Year: ${label}`}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Line type="monotone" dataKey="Open" stroke={COLORS.open} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="OBC"  stroke={COLORS.obc}  strokeWidth={2}   dot={{ r: 3 }} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="SC"   stroke={COLORS.sc}   strokeWidth={2}   dot={{ r: 3 }} activeDot={{ r: 5 }} />
          {hasST && (
            <Line type="monotone" dataKey="ST" stroke={COLORS.st} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} strokeDasharray="4 2" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
