import type { Metadata } from "next"
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import AIChatWidget from "@/components/ai/AIChatWidget"
import { CompareFloatingBar } from "@/components/ui/CompareButton"
import LeadWidgets from "@/components/leads/LeadWidgets"
import LeadBar from "@/components/leads/LeadBar"

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",        // avoids render-blocking — text shows in fallback font while custom loads
  preload: true,
})

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,         // secondary font — no need to block on it
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"),
  title: {
    default: "Best Colleges in Pune 2026 | CollegePune — AI-Powered Discovery",
    template: "%s | CollegePune",
  },
  description: "India's AI-powered college discovery portal for Pune. Find and compare engineering, MBA, medical, and arts colleges in Pune with real fees, placements, NAAC grades, and student reviews.",
  keywords: [
    "colleges in pune",
    "colleges in pune 2026",
    "best college in pune",
    "best college in pune 2026",
    "best colleges in pune 2026",
    "top colleges in pune 2026",
    "college in pune",
    "pune college list 2026",
    "engineering colleges pune",
    "engineering colleges in pune 2026",
    "best engineering college in pune 2026",
    "mba colleges pune",
    "best mba colleges in pune 2026",
    "medical colleges pune 2026",
    "arts colleges in pune 2026",
    "bca colleges in pune 2026",
    "bba colleges in pune 2026",
    "naac a+ colleges in pune 2026",
    "nirf ranked colleges pune 2026",
    "college admission pune 2026",
    "mht-cet colleges pune 2026",
    "pune university colleges",
    "sppu affiliated colleges 2026",
    "government colleges in pune 2026",
    "private colleges in pune 2026",
    "top 10 colleges in pune 2026",
    "colleges in pune with fees 2026",
    "low fee colleges pune 2026",
  ],
  authors: [{ name: "CollegePune Editorial Team" }],
  creator: "CollegePune",
  publisher: "CollegePune",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  // NOTE: canonical is NOT set at root layout level — every page sets its own
  // via generateMetadata({ path }) in lib/seo.ts to prevent canonical bleeding.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "CollegePune",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 682,
        alt: "CollegePune — Best Colleges in Pune 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@collegepune",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-IN" className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Pune" />
        <meta name="geo.position" content="18.5204;73.8567" />
        <meta name="ICBM" content="18.5204, 73.8567" />
      </head>
      <body className="min-h-full flex flex-col font-dm-sans bg-white">
        <LeadBar />
        <Header />
        <div className="flex-1 pt-14 lg:pt-24">
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
