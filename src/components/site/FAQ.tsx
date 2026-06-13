import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How much does a website cost in India?", a: "Business websites range from ₹15,000 to ₹2,00,000+ depending on features, integrations and design complexity. We provide transparent custom quotes after a free consultation." },
  { q: "Do you work with international clients?", a: "Yes — we actively serve clients across the USA, UK, Canada, UAE and Australia, with timezone-flexible communication and weekly sprint demos." },
  { q: "How long does a project take?", a: "Most marketing websites launch in 2–4 weeks. Mobile apps and CRMs typically take 6–12 weeks depending on scope. We share a fixed timeline before kickoff." },
  { q: "Do you offer SEO and marketing as a retainer?", a: "Yes — our SEO and digital marketing services run as monthly retainers starting from ₹25,000/month, with full reporting dashboards and dedicated account managers." },
  { q: "Will I own the code and assets?", a: "100%. All source code, design files and marketing assets transfer to you on project completion. No vendor lock-in." },
  { q: "Which cities in India do you serve?", a: "We work with clients across Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Ahmedabad, Chennai, Kolkata and every other state — fully remote-first." },
];

export const FAQ = () => (
  <section className="py-24 md:py-32">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">FAQs</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          Questions, <span className="text-gradient">answered.</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="glass rounded-xl px-6 border-0"
            itemScope
            itemType="https://schema.org/Question"
          >
            <AccordionTrigger className="text-left font-semibold hover:no-underline">
              <h3 itemProp="name" className="inline text-left font-semibold">{f.q}</h3>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p itemProp="text">{f.a}</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
