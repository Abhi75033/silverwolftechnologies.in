import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "../ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES, SITE, cityFromSlug, citySlug } from "@/data/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string; city: string } }) {
  return generateServiceMetadata(params.slug, params.city);
}

export default function ServiceCityPage({ params }: { params: { slug: string; city: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const city = cityFromSlug(params.city);
  if (!city) return notFound();

  return (
    <>
      <SchemaMarkup
        type="service"
        data={{
          serviceType: service.title,
          description: service.longDescription,
          name: `${service.title} in ${city}`,
        }}
      />
      <SchemaMarkup
        type="breadcrumb"
        data={{
          items: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}` },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE.domain}/services` },
            { "@type": "ListItem", position: 3, name: service.title, item: `${SITE.domain}/services/${service.slug}` },
            { "@type": "ListItem", position: 4, name: city },
          ]
        }}
      />
      <ServiceDetailClient slug={params.slug} citySlugParam={params.city} />
    </>
  );
}

