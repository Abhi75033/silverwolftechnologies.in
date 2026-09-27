import { generateServiceMetadata } from "@/lib/serviceMetadata";
import ServiceDetailClient from "./ServiceDetailClient";
import SchemaMarkup from "@/components/SchemaMarkup";
import { SERVICES } from "@/data/site";
import { notFound } from "next/navigation";
import { serviceParams } from "@/lib/staticParams";

/** Pre-render all 14 service pages at build time. */
export function generateStaticParams() {
  return serviceParams();
}

// 7 days. Must be a literal — Next.js statically analyses this export
// at build time and rejects imported constants.
export const revalidate = 604800;
export const dynamicParams = true;

function getServiceJsonLd(service: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.longDescription,
    "url": "https://www.silverwolftechnologies.in/services/" + service.slug,
    "provider": {
      "@type": "Organization",
      "@id": "https://www.silverwolftechnologies.in/#organization",
      "name": "Silver Wolf Technologies",
      "url": "https://www.silverwolftechnologies.in"
    },
    // One Country object per market — `name` must be a single string.
    "areaServed": ["India", "United Kingdom", "United Arab Emirates",
      "United States", "Canada", "Australia", "Singapore"].map((name) => ({
      "@type": "Country",
      name,
    })),
    "serviceType": service.category,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "https://www.silverwolftechnologies.in/contact"
    }
    // aggregateRating removed: a fixed 4.9★ / 50-review rating with no
    // matching reviews on the page is treated by Google as misleading
    // structured data (manual-action risk). Re-add only when it is generated
    // from real, visible reviews.
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  // Must 404 here, not only in the page component — see lib/serviceMetadata.ts.
  if (!service) notFound();

  // Kept under ~155 characters so Google shows it without truncation.
  let description = "Expert " + service.title + " in India from Silver Wolf " +
    "Technologies — 10+ years, transparent pricing, reply within 24 hours. " +
    "Get a free quote.";
  if (description.length > 155) {
    description = "Expert " + service.title + " in India — 10+ years, " +
      "transparent pricing, reply within 24 hours. Get a free quote.";
  }

  return {
    title: service.title + " in India",
    description,
    alternates: {
      canonical: "https://www.silverwolftechnologies.in/services/" + params.slug
    },
    openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Silver Wolf Technologies" }],
      title: service.title + " Company in India | Silver Wolf Technologies",
      description: "Senior team. Clean code. Measurable results. " +
        "10+ years delivering " + service.title + " for global clients.",
      url: "https://www.silverwolftechnologies.in/services/" + params.slug
    }
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);
  if (!service) return notFound();

  const serviceSchema = getServiceJsonLd(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <ServiceDetailClient slug={params.slug} />
      {/*
        Previously `sr-only` (visually hidden). Text shown only to crawlers
        risks Google's hidden-text policy, so it is now a normal visible
        section — same words, now also useful to visitors.
      */}
      <section className="py-16 md:py-20">
        <div className="container">
          <article className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-10 space-y-4 text-muted-foreground leading-relaxed" aria-label={`About ${service.title} at Silver Wolf Technologies`}>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">What is {service.title} by Silver Wolf Technologies?</h2>
        <p>
          Silver Wolf Technologies is a senior digital agency in India
          offering {service.title} services with 10+ years of experience.
          The team builds production-grade solutions for startups, SMBs,
          and global enterprises across India, UK, UAE, USA, Canada,
          Australia, and Singapore.
        </p>
        <p>
          Silver Wolf Technologies {service.title} clients report an average
          3.4x ROI within 90 days. The agency operates with a founder-led
          model where senior strategists are present in every meeting —
          never juniors or call centers. Most projects ship within 2–4 weeks
          with weekly demos and full code/asset ownership transferred to
          the client on completion.
        </p>
        <p>
          To get a free consultation for {service.title} in India, contact
          Silver Wolf Technologies at info@silverwolftechnologies.in or
          call +91-9845953801. Response guaranteed within 24 hours.
        </p>
          </article>
        </div>
      </section>
    </>
  );
}
