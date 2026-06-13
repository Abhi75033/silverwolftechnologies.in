/**
 * ─── Sitemap Utility Module ──────────────────────────────────────────────────
 *
 * Centralized sitemap generation logic for a scalable XML sitemap system.
 * Supports 6,000+ URLs split across multiple sitemap files with automatic
 * chunking, Google-standard XML formatting, and deterministic URL ordering.
 *
 * Architecture:
 *   /sitemap.xml                    → Sitemap Index (points to child sitemaps)
 *   /sitemaps/core-pages.xml        → Homepage, about, contact, portfolio, locations, services index, careers
 *   /sitemaps/service-pages.xml     → All 14 individual service detail pages
 *   /sitemaps/city-pages.xml        → Service × City combinations (~308 URLs)
 *   /sitemaps/subcity-pages-1.xml   → First chunk of Service × City × Subcity
 *   /sitemaps/subcity-pages-2.xml   → Second chunk ...
 *   /sitemaps/subcity-pages-N.xml   → Nth chunk (auto-calculated)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SERVICES, CITIES, SUB_CITIES, SITE, citySlug } from '@/data/site';

// ─── Configuration ───────────────────────────────────────────────────────────
/** Max URLs per sitemap file. Google allows 50,000 but 1,500 is optimal for
 *  crawl efficiency, faster re-indexing, and isolating errors to smaller files. */
export const CHUNK_SIZE = 1500;

// ─── Types ───────────────────────────────────────────────────────────────────
export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const BASE_URL = SITE.domain;

/** Current ISO date string for lastmod tags */
export function currentDate(): string {
  return new Date().toISOString();
}

/** XML-escape special characters in URLs */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&apos;')
    .replace(/"/g, '&quot;');
}

// ─── URL Generators ──────────────────────────────────────────────────────────

/** Core static pages — homepage, about, services index, portfolio, locations, contact, careers */
export function getCorePageUrls(): SitemapUrl[] {
  const now = currentDate();
  return [
    { loc: `${BASE_URL}/`,          lastmod: now, changefreq: 'weekly',  priority: '1.0' },
    { loc: `${BASE_URL}/about`,     lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE_URL}/services`,  lastmod: now, changefreq: 'weekly',  priority: '0.9' },
    { loc: `${BASE_URL}/portfolio`, lastmod: now, changefreq: 'weekly',  priority: '0.7' },
    { loc: `${BASE_URL}/locations`, lastmod: now, changefreq: 'monthly', priority: '0.8' },
    { loc: `${BASE_URL}/contact`,   lastmod: now, changefreq: 'monthly', priority: '0.6' },
    { loc: `${BASE_URL}/careers`,   lastmod: now, changefreq: 'monthly', priority: '0.8' },
  ];
}

/** Individual service detail pages — /services/website-development, etc. */
export function getServicePageUrls(): SitemapUrl[] {
  const now = currentDate();
  return SERVICES.map(service => ({
    loc: `${BASE_URL}/services/${service.slug}`,
    lastmod: now,
    changefreq: 'weekly' as const,
    priority: '0.9',
  }));
}

/** Service × City pages — /services/website-development/mumbai, etc. */
export function getCityPageUrls(): SitemapUrl[] {
  const now = currentDate();
  const urls: SitemapUrl[] = [];

  for (const service of SERVICES) {
    for (const city of CITIES) {
      urls.push({
        loc: `${BASE_URL}/services/${service.slug}/${citySlug(city)}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: '0.8',
      });
    }
  }

  return urls;
}

/** ALL Service × City × SubCity URLs (unsliced — used for chunking) */
export function getAllSubCityUrls(): SitemapUrl[] {
  const now = currentDate();
  const urls: SitemapUrl[] = [];

  for (const service of SERVICES) {
    for (const city of CITIES) {
      const subs = SUB_CITIES[city] || [];
      for (const sub of subs) {
        urls.push({
          loc: `${BASE_URL}/services/${service.slug}/${citySlug(city)}/${citySlug(sub)}`,
          lastmod: now,
          changefreq: 'weekly',
          priority: '0.7',
        });
      }
    }
  }

  return urls;
}

/** Get a specific chunk of subcity URLs (1-indexed) */
export function getSubCityChunk(chunkNumber: number): SitemapUrl[] | null {
  const allUrls = getAllSubCityUrls();
  const totalChunks = getSubCityChunkCount();

  if (chunkNumber < 1 || chunkNumber > totalChunks) {
    return null; // Invalid chunk → 404
  }

  const start = (chunkNumber - 1) * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  return allUrls.slice(start, end);
}

/** Calculate how many subcity chunks are needed */
export function getSubCityChunkCount(): number {
  let totalSubCityUrls = 0;
  for (const city of CITIES) {
    totalSubCityUrls += (SUB_CITIES[city] || []).length;
  }
  totalSubCityUrls *= SERVICES.length;
  return Math.ceil(totalSubCityUrls / CHUNK_SIZE);
}

// ─── XML Generators ──────────────────────────────────────────────────────────

/** Generate a standard <urlset> XML document from an array of URLs */
export function generateUrlsetXml(urls: SitemapUrl[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(u => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

/** Generate the <sitemapindex> XML document listing all child sitemaps */
export function generateSitemapIndexXml(): string {
  const now = currentDate();
  const totalSubChunks = getSubCityChunkCount();

  // Build the list of all child sitemaps
  const sitemaps: string[] = [
    `${BASE_URL}/sitemaps/core-pages.xml`,
    `${BASE_URL}/sitemaps/service-pages.xml`,
    `${BASE_URL}/sitemaps/city-pages.xml`,
  ];

  for (let i = 1; i <= totalSubChunks; i++) {
    sitemaps.push(`${BASE_URL}/sitemaps/subcity-pages-${i}.xml`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(url => `  <sitemap>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
}

// ─── Stats (useful for debugging / verification) ─────────────────────────────
export function getSitemapStats() {
  const coreCount = getCorePageUrls().length;
  const serviceCount = getServicePageUrls().length;
  const cityCount = getCityPageUrls().length;
  const subCityTotal = getAllSubCityUrls().length;
  const subCityChunks = getSubCityChunkCount();

  return {
    corePages: coreCount,
    servicePages: serviceCount,
    cityPages: cityCount,
    subCityPages: subCityTotal,
    subCityChunks,
    totalUrls: coreCount + serviceCount + cityCount + subCityTotal,
    totalSitemapFiles: 3 + subCityChunks, // core + service + city + N subcity chunks
  };
}
