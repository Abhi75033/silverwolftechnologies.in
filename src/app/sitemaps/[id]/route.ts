/**
 * ─── /sitemaps/[id] — Individual Sitemap Files ───────────────────────────────
 *
 * Dynamic route that serves each child sitemap file referenced in the index.
 *
 * Supported IDs:
 *   • core-pages.xml         → Static pages (home, about, services, portfolio, locations, contact)
 *   • service-pages.xml      → Individual service detail pages (14 URLs)
 *   • city-pages.xml         → Service × City combinations (~308 URLs)
 *   • subcity-pages-{N}.xml  → Chunked Service × City × SubCity pages (~1,500 per file)
 *
 * All other IDs return 404. Each sitemap follows Google's standard <urlset>
 * schema with <loc>, <lastmod>, <changefreq>, and <priority> for every URL.
 *
 * Response is cached for 24 hours with stale-while-revalidate.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';
import {
  getCorePageUrls,
  getServicePageUrls,
  getCityPageUrls,
  getSubCityChunk,
  generateUrlsetXml,
} from '@/lib/sitemapUtils';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  // ─── 1. Core Static Pages ────────────────────────────────────────────────
  if (id === 'core-pages.xml') {
    const urls = getCorePageUrls();
    return xmlResponse(generateUrlsetXml(urls));
  }

  // ─── 2. Individual Service Pages ─────────────────────────────────────────
  if (id === 'service-pages.xml') {
    const urls = getServicePageUrls();
    return xmlResponse(generateUrlsetXml(urls));
  }

  // ─── 3. Service × City Pages ─────────────────────────────────────────────
  if (id === 'city-pages.xml') {
    const urls = getCityPageUrls();
    return xmlResponse(generateUrlsetXml(urls));
  }

  // ─── 4. Service × City × SubCity Pages (Chunked) ────────────────────────
  const subcityMatch = id.match(/^subcity-pages-(\d+)\.xml$/);
  if (subcityMatch) {
    const chunkNumber = parseInt(subcityMatch[1], 10);
    const urls = getSubCityChunk(chunkNumber);

    if (!urls) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return xmlResponse(generateUrlsetXml(urls));
  }

  // ─── 404 — Unknown sitemap ID ────────────────────────────────────────────
  return new NextResponse('Not Found', { status: 404 });
}

/** Standard XML response with proper headers and caching */
function xmlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
