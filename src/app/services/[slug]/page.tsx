import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "./ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES } from "@/data/site";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return generateServiceMetadata(params.slug);
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  return (
    <>
      <SchemaMarkup
        type="service"
        data={{
          serviceType: service.title,
          description: service.longDescription,
          name: service.title,
        }}
      />
      <ServiceDetailClient slug={params.slug} />
    </>
  );
}
