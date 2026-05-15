import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "NIRF Rankings 2026 — Pune Colleges | Rank, Score & Insights | CollegePune",
  description: "Explore NIRF 2026 rankings for Pune colleges. Compare COEP (Rank 49), SIBM (Rank 13), AFMC (Rank 4), VIT Pune (Rank 101) and 25+ colleges by NIRF scores across Teaching, Research, Placements and Perception.",
  path: "/nirf-insights",
  keywords: [
    "nirf rankings pune 2026",
    "nirf pune colleges",
    "nirf rank pune engineering colleges",
    "coep nirf rank 2026",
    "sibm nirf rank 2026",
    "afmc nirf rank 2026",
    "vit pune nirf rank",
    "nirf ranking engineering colleges pune",
  ],
})

export default function NirfInsightsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
