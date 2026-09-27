/**
 * ─── LocationSeoBlock ────────────────────────────────────────────────────────
 *
 * Server component that attaches the answer-engine layer to every location
 * page. It renders three things:
 *
 *   1. FAQPage JSON-LD      — the question/answer pairs Google AI Overviews,
 *                             ChatGPT Search and Perplexity quote verbatim.
 *   2. WebPage + Speakable JSON-LD — marks the short answers voice and AI
 *                             assistants may read aloud or quote.
 *   3. A visible "key facts" + Q&A section — the same answers as real,
 *                             readable text. It used to be `sr-only` (hidden
 *                             from sighted visitors); crawler-only text risks
 *                             Google's hidden-text policy and FAQ schema must
 *                             match content users can see.
 *
 * BreadcrumbList is NOT emitted here: the visible <Breadcrumb> component in
 * ServiceDetailClient already outputs it, and two copies per page were
 * reported as duplicate structured data.
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
  /**
   * True when the page already shows these FAQs visibly (locality pages render
   * them in ServiceDetailClient). Then only the schema is emitted here, so the
   * visitor does not see the same questions twice.
   */
  faqsShownElsewhere?: boolean;
}

export default function LocationSeoBlock({
  serviceTitle,
  serviceSlug,
  city,
  citySlugValue,
  subCity,
  subCitySlugValue,
  faqs,
  faqsShownElsewhere = false,
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
    isPartOf: { "@type": "WebSite", "@id": `${SITE.domain}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <section
        className="py-16 md:py-20"
        aria-label={`${serviceTitle} in ${place} — key facts`}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="glass rounded-2xl p-6 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Key facts
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
                {serviceTitle} in {place} — at a glance
              </h2>
              <p className="aeo-answer text-muted-foreground leading-relaxed">
                {SITE.name} provides {serviceTitle.toLowerCase()} in {place}. The
                agency was founded in {SITE.founded} and has {SITE.yearsExperience}+
                years of experience delivering websites, web and mobile applications,
                CRMs, SaaS platforms and SEO campaigns. Projects for {shortPlace}{" "}
                clients typically ship in 2 to 4 weeks, pricing is quoted
                transparently per project after a free consultation, and every
                enquiry receives a reply within 24 hours. Contact {SITE.email} or{" "}
                {SITE.phoneRaw}.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {SITE.name} serves {place} and the surrounding region, working
                remotely with a founder-led senior team. Clients retain full ownership
                of all code and assets on completion.
              </p>
            </div>

            {!faqsShownElsewhere && faqs.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Frequently asked questions about {serviceTitle.toLowerCase()} in {shortPlace}
                </h2>
                <dl className="space-y-4">
                  {faqs.map((f) => (
                    <div key={f.question} className="glass rounded-xl p-6">
                      <dt className="text-lg font-bold mb-2">{f.question}</dt>
                      <dd className="aeo-answer text-muted-foreground leading-relaxed text-sm">{f.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
