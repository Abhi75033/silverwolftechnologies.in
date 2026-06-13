/**
 * ─── /api/sitemap-index — Sitemap Index Generator ────────────────────────────
 *
 * Returns a <sitemapindex> XML listing all child sitemap files.
 * Mapped to /sitemap.xml via next.config.js rewrite.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';
import { generateSitemapIndexXml } from '@/lib/sitemapUtils';

export async function GET() {
  const xml = generateSitemapIndexXml();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=1800',
    },
  });
}
