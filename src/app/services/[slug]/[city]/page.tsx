import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../ServiceDetailClient";
import { SERVICES, cityFromSlug, citySlug } from "@/data/site";
import { notFound, permanentRedirect } from "next/navigation";
import { serviceCityParams } from "@/lib/staticParams";
import LocationSeoBlock from "@/components/LocationSeoBlock";
import { generateLocationFaqs } from "@/lib/locationFaqs";

/** Pre-render all 308 service × city pages at build time. */
export function generateStaticParams() {
  return serviceCityParams();
}

// 7 days. Must be a literal — Next.js statically analyses this export
// at build time and rejects imported constants.
export const revalidate = 604800;
export const dynamicParams = true;

export async function generateMetadata({ params }: { params: { slug: string; city: string } }) {
  return generateServiceMetadata(params.slug, params.city);
}

export default function ServiceCityPage({ params }: { params: { slug: string; city: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  if (!city) return notFound();

  // Canonical-form guard: /…/Mumbai and /…/mumbai both resolve, which creates
  // duplicate URLs Google reports as "Alternative page with proper canonical".
  // Send every non-canonical casing to the one true URL with a 308.
  if (params.city !== citySlug(city)) {
    permanentRedirect(`/services/${service.slug}/${citySlug(city)}`);
  }

  const pageUrl = `https://www.silverwolftechnologies.in/services/${service.slug}/${citySlug(city)}`;
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    "name": "Silver Wolf Technologies — " + service.title + " in " + city,
    "url": pageUrl,
    "description": "Silver Wolf Technologies provides " + service.title +
      " in " + city + ". Senior team with 10+ years experience, " +
      "transparent pricing, and 24-hour response guarantee.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressCountry": "IN"
    },
    "telephone": "+91-9845953801",
    "email": "info@silverwolftechnologies.in",
    "areaServed": city,
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
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} />
      <LocationSeoBlock
        serviceTitle={service.title}
        serviceSlug={service.slug}
        city={city}
        citySlugValue={citySlug(city)}
        faqs={generateLocationFaqs(service.title, city)}
      />
    </>
  );
}

