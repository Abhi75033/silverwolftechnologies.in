import { Metadata } from "next";
import { SERVICES, cityFromSlug, subCityFromSlug, SITE, citySlug } from "@/data/site";
import { getAreaData } from "@/lib/locationData";

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
  if (!service) return {};

  const city = citySlugParam ? cityFromSlug(citySlugParam) : undefined;
  const subCity = city && subCitySlugParam ? subCityFromSlug(city, subCitySlugParam) : undefined;

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
  const title = titleBase;

  let description = "";
  if (areaData && areaData.metaDescription) {
    description = areaData.metaDescription;
  } else if (subCity) {
    description = `Looking for expert ${service.title.toLowerCase()} in ${subCity}? ${SITE.name} delivers fast, SEO-ready web apps for local businesses. Get a free quote today.`;
  } else if (city) {
    description = `Hire the leading ${service.title.toLowerCase()} agency in ${city}. We build high-performance, conversion-optimized digital products. Talk to our senior team today.`;
  } else {
    description = `Expert ${service.title.toLowerCase()} services from ${SITE.name}. We engineer fast, secure, and highly scalable digital solutions. Get a free quote today.`;
  }

  // Ensure description is under 160 chars
  description = description.length > 160 ? description.substring(0, 157) + "..." : description;

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

  return {
    title: {
      absolute: `${title} | Silver Wolf Technologies`,
    },
    description,
    keywords: [...service.keywords, ...locationKeywords],
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
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
      title: `${title} | Silver Wolf Technologies`,
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
      title: `${title} | Silver Wolf Technologies`,
      description,
    },
  };
}
