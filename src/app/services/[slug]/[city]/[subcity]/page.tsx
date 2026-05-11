import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../../ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES, SITE, cityFromSlug, subCityFromSlug, citySlug } from "@/data/site";
import { getAreaData } from "@/lib/locationData";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string; city: string; subcity: string } }) {
  return generateServiceMetadata(params.slug, params.city, params.subcity);
}

export default function ServiceSubCityPage({ params }: { params: { slug: string; city: string; subcity: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  const subCity = city ? subCityFromSlug(city, params.subcity) : undefined;
  if (!city || !subCity) return notFound();

  const areaData = getAreaData(params.city, params.subcity, service.title);

  return (
    <>
      <SchemaMarkup
        type="service"
        data={{
          name: `${service.title} in ${subCity}`,
          description: areaData ? areaData.metaDescription : service.longDescription,
          areaServed: { name: subCity }
        }}
      />
      <SchemaMarkup
        type="localBusiness"
        data={{
          name: `${SITE.name} — ${service.title} in ${subCity}`,
          areaServed: areaData ? { name: `${subCity}, ${city}`, postalCode: areaData.pinCode } : undefined,
          geo: areaData?.coordinates ? { latitude: areaData.coordinates.lat, longitude: areaData.coordinates.lng } : undefined,
          addressLocality: city,
          postalCode: areaData?.pinCode,
        }}
      />
      <SchemaMarkup
        type="breadcrumb"
        data={{
          items: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}` },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.domain}/services` },
            { "@type": "ListItem", position: 3, name: service.title, item: `${SITE.domain}/services/${service.slug}` },
            { "@type": "ListItem", position: 4, name: city, item: `${SITE.domain}/services/${service.slug}/${citySlug(city)}` },
            { "@type": "ListItem", position: 5, name: subCity }
          ]
        }}
      />
      {areaData && areaData.faqs && areaData.faqs.length > 0 && (
        <SchemaMarkup
          type="faq"
          data={{
            faqs: areaData.faqs.map(faq => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer
              }
            }))
          }}
        />
      )}
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} subCitySlugParam={params.subcity} />
    </>
  );
}
