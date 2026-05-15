import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Ask a Question About Pune Colleges — Get Answers in 48 Hours | CollegePune",
  description: "Ask any question about Pune college admissions, fees, placements, hostels or campus life. Our verified alumni and counselors answer within 48 hours — completely free.",
  path: "/ask",
  keywords: [
    "ask about pune colleges",
    "pune college admission questions",
    "ask alumni pune college",
    "college counselling pune free",
    "pune college helpline 2026",
    "ask question about coep pict vit pune",
  ],
})

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
