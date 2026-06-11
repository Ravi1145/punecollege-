import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  turbopack: {},
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [75, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image-static.collegedunia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.collegedunia.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // Supabase Storage — college logos & cover images
        protocol: "https",
        hostname: "tfdcpljbozadshhmvhfk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      // ─── SEO keyword slug aliases → canonical pages ───────────────────────
      { source: "/engineering-colleges-in-pune", destination: "/engineering-colleges-pune", permanent: true },
      // NOTE: /mba-colleges-in-pune now has its own page — removed redirect
      // Old BTech slug → new canonical keyword slug
      { source: "/btech-colleges-pune", destination: "/btech-colleges-in-pune", permanent: true },
      { source: "/best-btech-colleges-pune", destination: "/best-btech-colleges-in-pune", permanent: true },
      { source: "/top-btech-colleges-pune", destination: "/top-btech-colleges-in-pune", permanent: true },
      { source: "/top-engineering-colleges-pune", destination: "/top-btech-colleges-in-pune", permanent: true },
      { source: "/btech-admission-pune", destination: "/btech-admission-in-pune", permanent: true },
      { source: "/engineering-admission-pune", destination: "/btech-admission-in-pune", permanent: true },
      { source: "/btech-fees-pune", destination: "/btech-colleges-in-pune-with-fees", permanent: true },
      { source: "/engineering-colleges-pune-fees", destination: "/btech-colleges-in-pune-with-fees", permanent: true },
      { source: "/best-engineering-colleges-pune", destination: "/engineering-colleges-pune", permanent: true },
      { source: "/best-mba-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/arts-and-science-colleges-pune", destination: "/arts-colleges-pune", permanent: true },
      // NOTE: /science-colleges-pune, /commerce-colleges-pune, /bcom-colleges-pune have standalone pages — do NOT redirect
      { source: "/bsc-colleges-pune", destination: "/arts-colleges-pune", permanent: true },
      { source: "/ba-colleges-pune", destination: "/arts-colleges-pune", permanent: true },
      { source: "/bsc-computer-science-colleges-pune", destination: "/bsc-it-colleges-pune", permanent: true },
      { source: "/computer-science-colleges-pune", destination: "/bsc-it-colleges-pune", permanent: true },
      // Architecture aliases
      { source: "/architecture-college-pune", destination: "/architecture-colleges-pune", permanent: true },
      { source: "/b-arch-colleges-pune", destination: "/architecture-colleges-pune", permanent: true },
      { source: "/arch-colleges-pune", destination: "/architecture-colleges-pune", permanent: true },
      // BBA aliases
      { source: "/bba-college-pune", destination: "/bba-colleges-pune", permanent: true },
      { source: "/bachelor-business-administration-pune", destination: "/bba-colleges-pune", permanent: true },
      // Hostel aliases
      { source: "/pune-colleges-with-hostel", destination: "/colleges-in-pune-with-hostel", permanent: true },
      { source: "/engineering-colleges-pune-hostel", destination: "/colleges-in-pune-with-hostel", permanent: true },
      { source: "/pharmacy-colleges-in-pune", destination: "/pharmacy-colleges-pune", permanent: true },
      { source: "/bpharm-colleges-pune", destination: "/pharmacy-colleges-pune", permanent: true },
      { source: "/government-college-pune", destination: "/government-colleges-pune", permanent: true },
      { source: "/govt-colleges-pune", destination: "/government-colleges-pune", permanent: true },
      { source: "/admissions", destination: "/counselling", permanent: true },
      { source: "/admission", destination: "/counselling", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/contact", destination: "/counselling", permanent: true },

      // ─── /colleges-in-pune/[slug] virtual pages → correct destinations ────
      { source: "/colleges-in-pune/deemed-colleges-pune", destination: "/colleges?type=Deemed", permanent: true },
      { source: "/colleges-in-pune/snap-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/cat-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/set-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/mat-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/cmat-colleges-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/neet-ug-colleges-pune", destination: "/medical-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/neet-pg-colleges-pune", destination: "/medical-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/jee-main-colleges-pune", destination: "/engineering-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/mht-cet-colleges-pune", destination: "/engineering-colleges-pune", permanent: true },
      { source: "/colleges-in-pune/arts---science-colleges-pune", destination: "/colleges?stream=Arts+%26+Science", permanent: true },
      { source: "/colleges-in-pune/arts-and-science-colleges-pune", destination: "/colleges?stream=Arts+%26+Science", permanent: true },
      { source: "/colleges-in-pune/class----merit-colleges-pune", destination: "/colleges", permanent: true },
      { source: "/colleges-in-pune/government-colleges-pune", destination: "/colleges?type=Government", permanent: true },
      { source: "/colleges-in-pune/private-colleges-pune", destination: "/colleges?type=Private", permanent: true },
      { source: "/colleges-in-pune/autonomous-colleges-pune", destination: "/colleges", permanent: true },
      { source: "/colleges-in-pune/naac-a-colleges-pune", destination: "/colleges-in-pune/naac-a-plus-colleges-pune", permanent: true },

      // ─── Wrong /colleges/[slug] → correct slug (all 404s from broken-link audit) ──
      // SIBM
      { source: "/colleges/sibm-pune-symbiosis-institute-of-business-management", destination: "/colleges/sibm-symbiosis-institute-business-management-pune", permanent: true },
      { source: "/colleges/sibm-pune-symbiosis-institute-business-management", destination: "/colleges/sibm-symbiosis-institute-business-management-pune", permanent: true },
      { source: "/colleges/sibm-pune", destination: "/colleges/sibm-symbiosis-institute-business-management-pune", permanent: true },
      // MIT World Peace University
      { source: "/colleges/mit-world-peace-university", destination: "/colleges/mit-wpu-mit-world-peace-university", permanent: true },
      { source: "/colleges/mit-wpu-pune", destination: "/colleges/mit-wpu-mit-world-peace-university", permanent: true },
      // MIT School of Management
      { source: "/colleges/mit-som-school-of-management-pune", destination: "/colleges/mit-school-of-management-pune", permanent: true },
      { source: "/colleges/mit-som-pune", destination: "/colleges/mit-school-of-management-pune", permanent: true },
      { source: "/colleges/mit-college-of-management-pune", destination: "/colleges/mit-school-of-management-pune", permanent: true },
      // BIMM
      { source: "/colleges/bimm-balaji-institute-pune", destination: "/colleges/balaji-institute-of-modern-management-pune", permanent: true },
      { source: "/colleges/bimm-balaji-institute-modern-management-pune", destination: "/colleges/balaji-institute-of-modern-management-pune", permanent: true },
      { source: "/colleges/bimm-pune", destination: "/colleges/balaji-institute-of-modern-management-pune", permanent: true },
      // SCMHRD
      { source: "/colleges/scmhrd-symbiosis-centre-management-hrd-pune", destination: "/colleges/scmhrd-symbiosis-centre-management-hrd", permanent: true },
      { source: "/colleges/scmhrd-pune", destination: "/colleges/scmhrd-symbiosis-centre-management-hrd", permanent: true },
      { source: "/colleges/symbiosis-centre-management-studies-pune", destination: "/colleges/scmhrd-symbiosis-centre-management-hrd", permanent: true },
      { source: "/colleges/symbiosis-centre-management-pune", destination: "/colleges/scmhrd-symbiosis-centre-management-hrd", permanent: true },
      // DY Patil
      { source: "/colleges/dpu-dr-dy-patil-vidyapeeth", destination: "/colleges/dr-dy-patil-vidyapeeth-pune", permanent: true },
      { source: "/colleges/dy-patil-engineering-college-pune", destination: "/colleges/dy-patil-college-engineering-akurdi-pune", permanent: true },
      { source: "/colleges/dy-patil-engineering-college-akurdi", destination: "/colleges/dy-patil-college-engineering-akurdi-pune", permanent: true },
      // PCCOE
      { source: "/colleges/pccoe-pimpri-chinchwad-college-pune", destination: "/colleges/pccoer-pimpri-chinchwad-college-of-engineering", permanent: true },
      { source: "/colleges/pccoe-pune", destination: "/colleges/pccoer-pimpri-chinchwad-college-of-engineering", permanent: true },
      // Suryadatta
      { source: "/colleges/suryadatta-institute-management-pune", destination: "/colleges/suryadatta-institute-of-management-pune", permanent: true },
      // IIMM (no page exists → fallback)
      { source: "/colleges/iimm-pune-indian-institute-materials-management", destination: "/colleges/pumba-pune-university-mba", permanent: true },
      { source: "/colleges/iimm-pune-indian-institute-management-commerce", destination: "/colleges/pumba-pune-university-mba", permanent: true },
      { source: "/colleges/iimm-pune", destination: "/mba-colleges-pune", permanent: true },
      { source: "/colleges/iimc-pune-indian-institute", destination: "/mba-colleges-pune", permanent: true },
      // SCIT
      { source: "/colleges/scit-symbiosis-centre-information-technology-pune", destination: "/colleges/siib-symbiosis-institute-of-international-business-pune", permanent: true },
      { source: "/colleges/scit-pune", destination: "/colleges/siib-symbiosis-institute-of-international-business-pune", permanent: true },
      // Bharati Vidyapeeth
      { source: "/colleges/bharati-vidyapeeth-institute-pune", destination: "/colleges/bharati-vidyapeeth-college-engineering-pune", permanent: true },
      // BATU School
      { source: "/colleges/batu-school-management-studies-pune", destination: "/mba-colleges-pune", permanent: true },
    ]
  },
  async headers() {
    return [
      // Security headers — applied site-wide
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // Content-Security-Policy — prevents XSS from user-submitted content
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vercel.live",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://*.supabase.co https://api.anthropic.com wss://*.supabase.co https://va.vercel-scripts.com",
              "frame-src 'self' https://vercel.live",
              "object-src 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
        ],
      },
      // Tell Google to index all public pages + add Last-Modified for crawl freshness
      {
        source: "/((?!admin|api).*)",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
          { key: "Last-Modified", value: new Date().toUTCString() },
        ],
      },
      // Block indexing of admin
      {
        source: "/admin/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      // NOTE: /_next/static cache headers intentionally omitted — Vercel sets
      // immutable cache-control on /_next/static automatically. Adding it here
      // triggers a Next.js warning and can break dev HMR.
      // Cache college & blog pages with ISR
      {
        source: "/colleges/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=600" },
        ],
      },
      {
        source: "/blog/:path*",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=300, stale-while-revalidate=600" },
        ],
      },
    ]
  },
};

export default withPWA(nextConfig);
