import { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All crawlers — full access except admin/api
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Google — explicit full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Video",
        allow: "/",
      },
      {
        userAgent: "AdsBot-Google",
        allow: "/",
        disallow: ["/admin"],
      },
      // Bing / Microsoft
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "msnbot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // OpenAI GPTBot
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // OpenAI ChatGPT-User (browsing)
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Anthropic Claude
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Google Gemini / Bard
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Common Crawl (used to train LLMs)
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Apple Applebot (Siri AI)
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      // Cohere AI
      {
        userAgent: "cohere-ai",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
