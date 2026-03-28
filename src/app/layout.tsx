import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AIChatWidget from "@/components/ai/AIChatWidget"
import { CompareFloatingBar } from "@/components/ui/CompareButton"
import LeadWidgets from "@/components/leads/LeadWidgets"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.in"),
  title: {
    default: "Best Colleges in Pune 2025 | CollegePune — AI-Powered Discovery",
    template: "%s | CollegePune",
  },
  description: "India's AI-powered college discovery portal for Pune. Find and compare engineering, MBA, medical, and arts colleges in Pune with real fees, placements, NAAC grades, and student reviews.",
  keywords: ["colleges in pune", "best college in pune", "engineering colleges pune", "mba colleges pune", "pune university colleges"],
  authors: [{ name: "CollegePune Editorial Team" }],
  creator: "CollegePune",
  publisher: "CollegePune",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "CollegePune",
  },
  twitter: {
    card: "summary_large_image",
    site: "@collegepune",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-dm-sans bg-white">
        <Header />
        <div className="flex-1 pt-16">
          {children}
        </div>
        <Footer />
        <AIChatWidget />
        <CompareFloatingBar />
        <LeadWidgets />
      </body>
    </html>
  )
}
