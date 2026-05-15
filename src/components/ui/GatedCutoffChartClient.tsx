"use client"

import dynamic from "next/dynamic"
import type { CollegeCutoff } from "@/data/cutoffs"

const GatedCutoffChart = dynamic(() => import("./GatedCutoffChart"), { ssr: false })

interface Props {
  data: CollegeCutoff
  slug: string
  height?: number
}

export default function GatedCutoffChartClient(props: Props) {
  return <GatedCutoffChart {...props} />
}
