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
  /**
   * Service schema (was LocalBusiness). The old block claimed a business
   * address in every locality — e.g. "Mayfair, IN" — alongside the real
   * Murbad HQ in the site-wide schema, with conflicting opening hours.
   * Google treats invented locations as misleading structured data. A Service
   * with `areaServed` says what is actually true: this service is offered to
   * clients in this area by the one real organisation.
   */
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": pageUrl + "#service",
    "name": service.title + " in " + subCity + ", " + city,
    "serviceType": service.title,
    "url": pageUrl,
    "description": "Silver Wolf Technologies provides " + service.title +
      " for businesses in " + subCity + ", " + city + ". Senior team with 10+ years " +
      "experience, transparent pricing, and a reply within 24 hours.",
    "provider": {
      "@type": "Organization",
      "@id": "https://www.silverwolftechnologies.in/#organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in",
      "telephone": "+91-9845953801",
      "email": "info@silverwolftechnologies.in"
    },
    "areaServed": {
      "@type": "Place",
      "name": subCity + ", " + city,
      "containedInPlace": { "@type": "City", "name": city }
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "url": "https://www.silverwolftechnologies.in/contact"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
        faqsShownElsewhere={Boolean(areaData?.faqs?.length)}
      />
    </>
  );
}
