/**
 * ─── LocationSeoBlock ────────────────────────────────────────────────────────
 *
 * Server component that attaches the answer-engine layer to every location
 * page. It renders three things:
 *
 *   1. FAQPage JSON-LD      — the question/answer pairs Google AI Overviews,
 *                             ChatGPT Search and Perplexity quote verbatim.
 *   2. BreadcrumbList JSON-LD — tells crawlers where the page sits in the
 *                             hierarchy, which is what earns breadcrumb rich
 *                             results and helps Google see these as a
 *                             structured set rather than 6,000 loose pages.
 *   3. A visually-hidden Q&A block — the same answers as real crawlable text.
 *                             Schema alone is a hint; matching on-page text is
 *                             what makes an answer engine confident enough to
 *                             cite you.
 *
 * Rendered server-side so it is present in the initial HTML — crawlers that
 * do not execute JavaScript still see all of it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SITE } from "@/data/site";
import type { FAQ } from "@/data/locations/types";

interface Props {
  serviceTitle: string;
  serviceSlug: string;
  city: string;
  citySlugValue: string;
  subCity?: string;
  subCitySlugValue?: string;
  faqs: FAQ[];
}

export default function LocationSeoBlock({
  serviceTitle,
  serviceSlug,
  city,
  citySlugValue,
  subCity,
  subCitySlugValue,
  faqs,
}: Props) {
  const place = subCity ? `${subCity}, ${city}` : city;
  const shortPlace = subCity || city;

  const pageUrl = subCity
    ? `${SITE.domain}/services/${serviceSlug}/${citySlugValue}/${subCitySlugValue}`
    : `${SITE.domain}/services/${serviceSlug}/${citySlugValue}`;

  // ── 1. FAQPage ────────────────────────────────────────────────────────────
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // ── 2. BreadcrumbList ─────────────────────────────────────────────────────
  const crumbs = [
    { name: "Home", url: `${SITE.domain}/` },
    { name: "Services", url: `${SITE.domain}/services` },
    { name: serviceTitle, url: `${SITE.domain}/services/${serviceSlug}` },
    {
      name: city,
      url: `${SITE.domain}/services/${serviceSlug}/${citySlugValue}`,
    },
    ...(subCity
      ? [
          {
            name: subCity,
            url: `${SITE.domain}/services/${serviceSlug}/${citySlugValue}/${subCitySlugValue}`,
          },
        ]
      : []),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };

  // ── 3. Speakable — voice assistants and read-aloud surfaces ───────────────
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `${serviceTitle} in ${place} | ${SITE.name}`,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".aeo-answer"],
    },
    isPartOf: { "@type": "WebSite", "@id": `${SITE.domain}#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <section
        className="sr-only"
        aria-label={`${serviceTitle} in ${place} — summary for search and AI assistants`}
      >
        <h2>
          {serviceTitle} in {place} — key facts
        </h2>
        <p className="aeo-answer">
          {SITE.name} provides {serviceTitle.toLowerCase()} in {place}. The
          agency was founded in {SITE.founded} and has {SITE.yearsExperience}+
          years of experience delivering websites, web and mobile applications,
          CRMs, SaaS platforms and SEO campaigns. Projects for {shortPlace}{" "}
          clients typically ship in 2 to 4 weeks, pricing is quoted
          transparently per project after a free consultation, and every
          enquiry receives a reply within 24 hours. Contact {SITE.email} or{" "}
          {SITE.phoneRaw}.
        </p>

        <h3>Frequently asked questions about {serviceTitle.toLowerCase()} in {shortPlace}</h3>
        <dl>
          {faqs.map((f) => (
            <div key={f.question}>
              <dt>{f.question}</dt>
              <dd className="aeo-answer">{f.answer}</dd>
            </div>
          ))}
        </dl>

        <h3>Service area</h3>
        <p>
          {SITE.name} serves {place} and the surrounding region, working
          remotely with a founder-led senior team. Clients retain full ownership
          of all code and assets on completion.
        </p>
      </section>
    </>
  );
}
