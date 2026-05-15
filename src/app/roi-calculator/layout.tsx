import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Pune College ROI Calculator 2026 — Is Your College Worth the Fees? | CollegePune",
  description: "Calculate the return on investment for any Pune college. Enter fees, expected salary and loan details to see break-even time, net ROI and 10-year earning potential. Compare COEP, SIBM, VIT Pune and more.",
  path: "/roi-calculator",
  keywords: [
    "pune college roi calculator",
    "is engineering college worth it pune",
    "college fee vs salary pune",
    "mba roi calculator pune",
    "coep fees vs placement roi",
    "engineering college investment return pune 2026",
    "should i take education loan pune college",
  ],
})

export default function ROICalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
