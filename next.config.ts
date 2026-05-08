import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
        hostname: "lnmttqtpxqmlynhddenc.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
  async redirects() {
    return [
      // SEO keyword slug aliases → canonical pages
      {
        source: "/engineering-colleges-in-pune",
        destination: "/engineering-colleges-pune",
        permanent: true,
      },
      {
        source: "/mba-colleges-in-pune",
        destination: "/mba-colleges-pune",
        permanent: true,
      },
      {
        source: "/best-engineering-colleges-pune",
        destination: "/engineering-colleges-pune",
        permanent: true,
      },
      {
        source: "/best-mba-colleges-pune",
        destination: "/mba-colleges-pune",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      // Tell Google to index all public pages
      {
        source: "/((?!admin|api).*)",
        headers: [
          { key: "X-Robots-Tag", value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
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

export default nextConfig;
