import { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://collegepune.com"

// AI crawlers that should have full access for GEO / AI Overview visibility
const AI_CRAWLERS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "ClaudeBot",
  // Google AI
  "Google-Extended",
  "Googlebot-Image",
  // Perplexity
  "PerplexityBot",
  // Meta AI
  "meta-externalagent",
  "FacebookBot",
  // Apple
  "Applebot",
  "Applebot-Extended",
  // Amazon
  "Amazonbot",
  // Microsoft / Bing AI
  "Bingbot",
  "BingPreview",
  // Common Crawl (feeds LLM training)
  "CCBot",
  // Cohere AI
  "cohere-ai",
  // You.com
  "YouBot",
  // DuckDuckGo AI
  "DuckAssistBot",
  // ByteDance / TikTok AI
  "Bytespider",
  // Diffbot (structured data extraction for AI)
  "Diffbot",
  // Timpibot / news AI
  "Timpibot",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: all bots get full access except admin + internals
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/_next/"],
      },
      // AI crawlers: explicitly allow everything including /api/ai-context
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/admin/"],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
