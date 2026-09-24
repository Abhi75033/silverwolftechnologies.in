import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../../ServiceDetailClient";
import { SERVICES, cityFromSlug, subCityFromSlug, citySlug } from "@/data/site";
import { getAreaData } from "@/lib/locationData";
import { notFound, permanentRedirect } from "next/navigation";
import { serviceSubCityParams } from "@/lib/staticParams";
import LocationSeoBlock from "@/components/LocationSeoBlock";
import { generateLocationFaqs } from "@/lib/locationFaqs";

/**
 * Pre-render service × city × locality pages at build time.
 * Capped by SSG_SUBCITY_LIMIT; anything over the cap is generated on first
 * request and cached by ISR (dynamicParams stays true).
 */
export function generateStaticParams() {
  return serviceSubCityParams();
}

// 7 days. Must be a literal — Next.js statically analyses this export
// at build time and rejects imported constants.
export const revalidate = 604800;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string; city: string; subcity: string } }) {
  return generateServiceMetadata(params.slug, params.city, params.subcity);
}

export default function ServiceSubCityPage({ params }: { params: { slug: string; city: string; subcity: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  const subCity = city ? subCityFromSlug(city, params.subcity) : undefined;
  if (!city || !subCity) return notFound();

  // Canonical-form guard — collapse casing variants onto one indexable URL.
  if (params.city !== citySlug(city) || params.subcity !== citySlug(subCity)) {
    permanentRedirect(
      `/services/${service.slug}/${citySlug(city)}/${citySlug(subCity)}`
    );
  }

  const areaData = getAreaData(params.city, params.subcity, service.title);

  const pageUrl = `https://www.silverwolftechnologies.in/services/${service.slug}/${citySlug(city)}/${citySlug(subCity)}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Silver Wolf Technologies — " + service.title + " in " + subCity,
    "url": pageUrl,
    "description": "Silver Wolf Technologies provides " + service.title +
      " in " + subCity + ". Senior team with 10+ years experience, " +
      "transparent pricing, and 24-hour response guarantee.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": subCity,
      "addressCountry": "IN"
    },
    "telephone": "+91-9845953801",
    "email": "info@silverwolftechnologies.in",
    "areaServed": subCity,
    "parentOrganization": {
      "@type": "Organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in"
    },
    "priceRange": "₹₹",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "09:00",
      "closes": "19:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} subCitySlugParam={params.subcity} />
      {/*
        Locality FAQs: prefer hand-written data (src/data/locations/*) when it
        exists, otherwise fall back to the generated set. Either way the page
        always ships FAQPage + BreadcrumbList + Speakable schema and matching
        crawlable text — previously the FAQ schema was emitted with no
        corresponding on-page copy, which answer engines discount.
      */}
      <LocationSeoBlock
        serviceTitle={service.title}
        serviceSlug={service.slug}
        city={city}
        citySlugValue={citySlug(city)}
        subCity={subCity}
        subCitySlugValue={citySlug(subCity)}
        faqs={
          areaData?.faqs?.length
            ? areaData.faqs
            : generateLocationFaqs(service.title, city, subCity)
        }
      />
    </>
  );
}
