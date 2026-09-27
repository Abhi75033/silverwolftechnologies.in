/**
 * ─── Middleware: real 404s and 308s for /services/* ──────────────────────────
 *
 * Why this exists
 *   The root app/loading.tsx wraps every route in a Suspense boundary, so
 *   Next.js starts streaming the response (with HTTP 200) before a page or
 *   generateMetadata gets to call notFound() or permanentRedirect(). The
 *   result was "soft 404s": /services/anything-made-up returned 200 with a
 *   noindex tag, and /services/x/Pune returned 200 with a meta refresh instead
 *   of a real redirect. Search Console reports those as Soft 404 / Page with
 *   redirect and Google wastes crawl budget on them.
 *
 *   Validating the URL here, before rendering starts, gives crawlers the
 *   correct status codes while keeping the loading skeleton for visitors.
 *
 * Rules (only /services/... is checked):
 *   /services/{service}                    service must exist
 *   /services/{service}/{city}             city must exist
 *   /services/{service}/{city}/{locality}  locality must exist in that city
 *   deeper paths                           404
 *   Wrong letter case                      308 to the lowercase canonical URL
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse, type NextRequest } from "next/server";
import { SERVICES, CITIES, SUB_CITIES, citySlug } from "@/data/site";

const SERVICE_SLUGS = new Set(SERVICES.map((s) => s.slug));

/** city slug → set of locality slugs */
const LOCALITIES = new Map<string, Set<string>>(
  CITIES.map((c) => [citySlug(c), new Set((SUB_CITIES[c] ?? []).map(citySlug))])
);

function notFound(req: NextRequest) {
  // Rewriting to a path with no route renders the site's normal not-found
  // page with a genuine 404 status.
  return NextResponse.rewrite(new URL("/__not-found", req.url));
}

export function middleware(req: NextRequest) {
  const raw = req.nextUrl.pathname.split("/").filter(Boolean);
  if (raw[0] !== "services" || raw.length < 2) return NextResponse.next();
  if (raw.length > 4) return notFound(req);

  let segments: string[];
  try {
    segments = raw.map((s) => decodeURIComponent(s));
  } catch {
    return notFound(req);
  }
  const lower = segments.map((s) => s.toLowerCase());
  const [, service, city, locality] = lower;

  if (!SERVICE_SLUGS.has(service)) return notFound(req);
  if (city !== undefined && !LOCALITIES.has(city)) return notFound(req);
  if (locality !== undefined && !LOCALITIES.get(city!)!.has(locality)) return notFound(req);

  // Valid page, but not in canonical lowercase form → permanent redirect.
  if (segments.some((s, i) => s !== lower[i])) {
    const url = req.nextUrl.clone();
    url.pathname = "/" + lower.map(encodeURIComponent).join("/");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/services/:path+"],
};
