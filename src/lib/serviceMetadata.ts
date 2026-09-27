import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { SERVICES, cityFromSlug, subCityFromSlug, SITE, citySlug } from "@/data/site";
import { getAreaData } from "@/lib/locationData";
import { isLocalityIndexable } from "@/lib/curatedCities";

// ─── City-level title pool (8 rotating patterns) ─────────────────────────────
const CITY_TITLE_POOL = [
  (svc: string, city: string) => `Best ${svc} Agency in ${city}`,
  (svc: string, city: string) => `Top ${svc} Company in ${city}`,
  (svc: string, city: string) => `Expert ${svc} Services in ${city}`,
  (svc: string, city: string) => `${svc} Specialists Serving ${city}`,
  (svc: string, city: string) => `Professional ${svc} in ${city}`,
  (svc: string, city: string) => `${city}'s Trusted ${svc} Team`,
  (svc: string, city: string) => `Custom ${svc} for ${city} Businesses`,
  (svc: string, city: string) => `${svc} Solutions in ${city}`,
];

function simpleHash(a: string, b: string): number {
  const str = `${a}|${b}`;
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0;
  }
  return h;
}

export function generateServiceMetadata(slug: string, citySlugParam?: string, subCitySlugParam?: string): Metadata {
  const service = SERVICES.find((s) => s.slug === slug);

  /**
   * Validate the URL here, in generateMetadata, rather than only in the page.
   * The root app/loading.tsx makes every route stream: by the time the page
   * component runs, a 200 status has already been sent, so a notFound() or
   * permanentRedirect() there produced a "soft 404" (HTTP 200 + noindex) or a
   * meta-refresh instead of a real 404 / 308. Metadata is resolved before the
   * response starts, so throwing here returns the correct status code.
   */
  if (!service) notFound();

  const city = citySlugParam ? cityFromSlug(citySlugParam) : undefined;
  if (citySlugParam && !city) notFound();

  const subCity = city && subCitySlugParam ? subCityFromSlug(city, subCitySlugParam) : undefined;
  if (subCitySlugParam && !subCity) notFound();

  // Canonical-form guard: /…/Pune → /…/pune with a real 308.
  if (
    (city && citySlugParam !== citySlug(city)) ||
    (subCity && subCitySlugParam !== citySlug(subCity))
  ) {
    permanentRedirect(
      `/services/${service.slug}${city ? `/${citySlug(city)}` : ""}${subCity ? `/${citySlug(subCity)}` : ""}`
    );
  }

  const areaData = citySlugParam && subCitySlugParam ? getAreaData(citySlugParam, subCitySlugParam, service.title) : undefined;

  let titleBase = "";
  if (subCity) {
    // Use the hash-varied title from contentGenerator when available
    titleBase = areaData?.metaTitle
      ? areaData.metaTitle
      : `Best ${service.title} in ${subCity}, ${city}`;
  } else if (city) {
    const h = simpleHash(city, service.title);
    titleBase = CITY_TITLE_POOL[h % CITY_TITLE_POOL.length](service.title, city);
  } else {
    titleBase = `${service.title} Services`;
  }
  /**
   * Adaptive brand suffix. Google renders roughly 60 characters of a title and
   * truncates the rest, so a fixed " | Silver Wolf Technologies" (27 chars) on
   * top of a long service + locality combination pushed some titles to 107
   * characters. Use the longest brand form that still fits inside TITLE_LIMIT;
   * if even the short form does not fit, drop the brand and keep the keywords,
   * which are what actually earn the click.
   */
  const TITLE_LIMIT = 60;
  const BRAND_FULL = " | Silver Wolf Technologies";
  const BRAND_SHORT = " | Silver Wolf Tech";
  const brand =
    titleBase.length + BRAND_FULL.length <= TITLE_LIMIT
      ? BRAND_FULL
      : titleBase.length + BRAND_SHORT.length <= TITLE_LIMIT
        ? BRAND_SHORT
        : "";
  const title = titleBase;
  const fullTitle = `${titleBase}${brand}`;

  let description = "";
  if (areaData && areaData.metaDescription) {
    description = areaData.metaDescription;
  } else if (subCity) {
    description = `Expert ${service.title.toLowerCase()} in ${subCity}. Fast, SEO-ready builds for local businesses. Get a free quote in 24 hours.`;
  } else if (city) {
    description = `A leading ${service.title.toLowerCase()} agency serving ${city}. We build high-performance, conversion-optimised digital products. Talk to our senior team.`;
  } else {
    description = `Expert ${service.title.toLowerCase()} from ${SITE.name}. We engineer fast, secure and scalable digital solutions. Get a free quote today.`;
  }

  // Safety net only — the copy above is written to fit inside Google's ~155
  // character display limit. If a long service or city name ever pushes one
  // over, cut on a word boundary so the snippet never ends mid-word.
  if (description.length > 155) {
    const cut = description.slice(0, 155);
    const lastSpace = cut.lastIndexOf(" ");
    description = (lastSpace > 120 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:—-]+$/, "");
  }

  const locationKeywords = subCity
    ? [
        `${service.title.toLowerCase()} in ${subCity}`,
        `${service.title.toLowerCase()} ${subCity} ${city}`,
        `best ${service.title.toLowerCase()} agency ${subCity}`,
      ]
    : city
      ? [
          `${service.title.toLowerCase()} in ${city}`,
          `${service.title.toLowerCase()} ${city}`,
        ]
      : [];

  const canonicalPath = `/services/${service.slug}${city ? `/${citySlug(city)}` : ""}${subCity ? `/${citySlug(subCity)}` : ""}`;

  const canonicalUrl = `${SITE.domain}${canonicalPath}`;

  /**
   * All service, city and locality pages are indexable. isLocalityIndexable()
   * returns true for every city while INDEX_ALL_LOCALITIES is on
   * (lib/curatedCities.ts).
   */
  const indexable =
    !subCity || (citySlugParam ? isLocalityIndexable(citySlugParam) : false);

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    keywords: [...service.keywords, ...locationKeywords],
    robots: {
      index: indexable,
      follow: true,
      nocache: !indexable,
      googleBot: {
        index: indexable,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: SITE.name,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  };
}
