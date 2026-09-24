/**
 * ─── AdSense Configuration & Eligibility ─────────────────────────────────────
 *
 * Two problems this module solves:
 *
 * 1. The ad slot was hardcoded to the literal string "YOUR_AD_SLOT_ID_HERE",
 *    so every ad unit on the site was invalid and nothing ever rendered.
 *    The slot now comes from env, and the banner renders nothing at all when
 *    it is unset — shipping a broken <ins> tag is worse than shipping none.
 *
 * 2. AdSense policy prohibits ads on auto-generated or thin pages, and the
 *    site's review came back "Low value content". Ads are therefore gated to
 *    pages with substantial hand-written content: core pages, service detail
 *    pages, and service × city pages. The ~6,076 service × city × locality
 *    pages are template-generated and must never carry ads.
 *
 * Setup:
 *   Add to .env.local / Vercel env vars:
 *     NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-2747147036042508
 *     NEXT_PUBLIC_ADSENSE_SLOT=<the numeric slot ID from your AdSense dashboard>
 *
 *   The slot ID is found under AdSense → Ads → By ad unit → your unit → the
 *   `data-ad-slot` value in the snippet Google shows you.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-2747147036042508";

/** Numeric ad slot ID. Empty until configured — the banner no-ops when empty. */
export const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT || "";

/** True once a real slot ID is configured. */
export const ADSENSE_CONFIGURED =
  ADSENSE_SLOT.length > 0 && /^\d+$/.test(ADSENSE_SLOT);

/** Pages that always carry ads — substantial, hand-written content. */
const AD_ELIGIBLE_EXACT = new Set([
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/locations",
  "/contact",
  "/careers",
]);

/** Never show ads here, regardless of anything else. */
const AD_BLOCKED_PREFIXES = ["/careers/responses", "/admin", "/private"];

/**
 * Decide whether a given path may display ads.
 *
 * Allowed:
 *   /                                   core page
 *   /about, /services, /contact, …      core pages
 *   /services/{slug}                    service detail   (2 segments)
 *   /services/{slug}/{city}             service × city   (3 segments)
 *
 * Blocked:
 *   /services/{slug}/{city}/{locality}  template-generated (4 segments)
 *   /careers/responses, /admin, /private
 *   404 and any unrecognised route
 */
export function isAdEligiblePath(pathname: string | null | undefined): boolean {
  if (!ADSENSE_CONFIGURED) return false;
  if (!pathname) return false;

  // Normalise: strip query/hash and any trailing slash (but keep root "/").
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, "") || "/";

  if (AD_BLOCKED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) {
    return false;
  }

  if (AD_ELIGIBLE_EXACT.has(path)) return true;

  // Service routes: allow /services/{slug} and /services/{slug}/{city} only.
  if (path.startsWith("/services/")) {
    const depth = path.split("/").filter(Boolean).length; // "services" + rest
    return depth <= 3;
  }

  return false;
}
