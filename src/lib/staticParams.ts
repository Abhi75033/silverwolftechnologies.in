/**
 * ─── Static Params Helpers ───────────────────────────────────────────────────
 *
 * Centralised `generateStaticParams` sources for the programmatic location
 * routes. Pre-rendering these at build time is the single biggest indexing
 * fix on this site: without it every one of the ~6,400 location URLs is
 * server-rendered on demand, Googlebot times out, and pages land in
 * "Crawled – currently not indexed".
 *
 * Build-time throttle:
 *   Set SSG_SUBCITY_LIMIT to cap how many sub-city pages are pre-rendered
 *   (e.g. SSG_SUBCITY_LIMIT=2000). Anything beyond the cap still works —
 *   it is generated on first request and then cached via ISR, because
 *   `dynamicParams` stays true on the route.
 *   Leave unset to pre-render all of them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SERVICES, CITIES, SUB_CITIES, citySlug } from "@/data/site";
import { isCuratedCity } from "@/lib/curatedCities";

/** Revalidate window for location pages — 7 days. */
export const LOCATION_REVALIDATE = 60 * 60 * 24 * 7;

/** /services/[slug] — 14 pages */
export function serviceParams(): { slug: string }[] {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/** /services/[slug]/[city] — 14 × 22 = 308 pages */
export function serviceCityParams(): { slug: string; city: string }[] {
  const params: { slug: string; city: string }[] = [];
  for (const service of SERVICES) {
    for (const city of CITIES) {
      params.push({ slug: service.slug, city: citySlug(city) });
    }
  }
  return params;
}

/**
 * /services/[slug]/[city]/[subcity]
 *
 * Pre-renders localities for curated cities only — those are the pages we are
 * asking Google to index, so those are the ones that must be fast on first
 * crawl. Other localities are indexable and in the sitemap too; they are
 * generated on first request and cached by ISR (dynamicParams stays true).
 *
 * This also keeps build times sane: pre-rendering all 6,076 was the risk,
 * pre-rendering the curated subset is not.
 */
export function serviceSubCityParams(): {
  slug: string;
  city: string;
  subcity: string;
}[] {
  const params: { slug: string; city: string; subcity: string }[] = [];

  for (const service of SERVICES) {
    for (const city of CITIES) {
      if (!isCuratedCity(city)) continue;
      for (const sub of SUB_CITIES[city] || []) {
        params.push({
          slug: service.slug,
          city: citySlug(city),
          subcity: citySlug(sub),
        });
      }
    }
  }

  const rawLimit = process.env.SSG_SUBCITY_LIMIT;
  const limit = rawLimit ? parseInt(rawLimit, 10) : NaN;

  return Number.isFinite(limit) && limit > 0 ? params.slice(0, limit) : params;
}
