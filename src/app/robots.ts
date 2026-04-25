import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/admin/", "/api/ai/"],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"}/sitemap.xml`,
  }
}
