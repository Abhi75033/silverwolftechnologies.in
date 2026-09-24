/**
 * ─── Curated City Registry ───────────────────────────────────────────────────
 *
 * The single source of truth for which locality pages are good enough to index.
 *
 * Background: the site generates 14 services × 22 cities × 434 localities =
 * 6,076 locality pages, but only Chennai ever had hand-written data. Every
 * other locality fell back to `generateFallbackAreaData()`, producing pages
 * that differ only by place name. Google responded on two fronts — 777 pages
 * stuck in "Crawled – currently not indexed", and an AdSense review returning
 * "Low value content".
 *
 * The fix is not to hide the pages but to be honest about which ones are
 * finished. A city listed in CURATED_CITIES has a real data file in
 * src/data/locations/ and its locality pages are fully indexable. Everything
 * else is served normally to users but marked `noindex, follow` and kept out
 * of the sitemap — so link equity still flows through to the city pages while
 * Google is not asked to index content that is not ready.
 *
 * ── To promote a city ──────────────────────────────────────────────────────
 *   1. Write src/data/locations/<city>.ts to the standard set by chennai.ts.
 *   2. Register it in ALL_CITIES in src/lib/locationData.ts.
 *   3. Add its slug to CURATED_CITIES below.
 *   4. Redeploy, then resubmit the sitemap in Search Console.
 *
 * Promote in waves and watch the indexing rate for each wave before starting
 * the next. Adding all 22 at once removes the signal you need to tell whether
 * the content work is actually landing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { CITIES, citySlug } from "@/data/site";

/**
 * City slugs whose locality pages carry real, hand-written content and are
 * therefore safe to index. Keep this list honest — it is the whole point.
 */
export const CURATED_CITIES: ReadonlySet<string> = new Set([
  "chennai", // src/data/locations/chennai.ts — 24 areas
  "mumbai",  // src/data/locations/mumbai.ts  — 36 areas
]);

/** Does this city's locality pages have real content behind them? */
export function isCuratedCity(cityOrSlug: string): boolean {
  const slug = cityOrSlug.includes(" ")
    ? citySlug(cityOrSlug)
    : cityOrSlug.toLowerCase();
  return CURATED_CITIES.has(slug);
}

/**
 * Should this locality page be indexed?
 *
 * City-level pages (/services/{slug}/{city}) are always indexable — there are
 * only 308 of them and they carry the service copy plus a real FAQ set.
 * Locality pages are indexable only where the city is curated.
 */
export function isLocalityIndexable(citySlugParam: string): boolean {
  return CURATED_CITIES.has(citySlugParam.toLowerCase());
}

/** Cities still awaiting hand-written locality content. */
export function uncuratedCities(): string[] {
  return CITIES.filter((c) => !CURATED_CITIES.has(citySlug(c)));
}

/** Progress summary — handy in build logs and for tracking the rollout. */
export function curationStats() {
  const curated = CITIES.filter((c) => CURATED_CITIES.has(citySlug(c)));
  return {
    curated: curated.length,
    total: CITIES.length,
    pending: CITIES.length - curated.length,
    curatedNames: curated,
  };
}
