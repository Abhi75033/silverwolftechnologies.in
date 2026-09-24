import { MetadataRoute } from 'next'
import { SITE } from '@/data/site'

/**
 * ─── robots.txt ──────────────────────────────────────────────────────────────
 *
 * Two goals:
 *   1. SEO — let traditional crawlers reach every indexable page, and block
 *      only the private/admin surface. The previous version disallowed
 *      `/api/` while simultaneously allowing `/api/sitemap-index`, a
 *      contradiction crawlers resolve unpredictably.
 *   2. GEO/AEO — explicitly welcome AI answer engines. ChatGPT, Claude,
 *      Perplexity, Gemini and Copilot each use their own user-agent and only
 *      cite sources they are permitted to fetch. Silence is often treated as
 *      restriction by cautious crawlers; an explicit Allow removes the doubt.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Paths that must never be crawled or indexed. */
const PRIVATE_PATHS = [
  '/admin',
  '/private',
  '/careers/responses',
  '/api/careers/',
]

/** Traditional search crawlers — full access. */
const SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Applebot',
  'facebot',
  'ia_archiver',
]

/**
 * AI / answer-engine crawlers — full access.
 * Two kinds matter here:
 *   • training crawlers  — build the underlying model
 *   • retrieval crawlers — fetch live pages to answer a user's question, and
 *                          are the ones that generate citations back to you
 */
const AI_BOTS = [
  // OpenAI
  'GPTBot',            // training
  'OAI-SearchBot',     // ChatGPT search index
  'ChatGPT-User',      // live retrieval during a chat
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  // Google
  'Google-Extended',   // Gemini / AI Overviews grounding
  'GoogleOther',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Microsoft
  'msnbot',
  // Meta
  'meta-externalagent',
  'FacebookBot',
  // Apple
  'Applebot-Extended',
  // Others
  'Amazonbot',
  'YouBot',
  'Diffbot',
  'cohere-ai',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: ['/'],
    disallow: PRIVATE_PATHS,
  }

  return {
    rules: [
      // Baseline for anything not named below.
      { userAgent: '*', ...allowAll },

      // Named search crawlers.
      ...SEARCH_BOTS.map((userAgent) => ({ userAgent, ...allowAll })),

      // Named AI / answer-engine crawlers.
      ...AI_BOTS.map((userAgent) => ({ userAgent, ...allowAll })),
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
    host: SITE.domain,
  }
}
