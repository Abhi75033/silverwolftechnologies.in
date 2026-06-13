import { Star } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Founder, BloomKart", text: "Silver Wolf rebuilt our store and our conversions doubled in 8 weeks. Genuinely the most reliable team we've hired.", rating: 5 },
  { name: "James Whitaker", role: "CTO, Northwind (UK)", text: "We hired them for a CRM rebuild. Senior team, clean code, on-time delivery. Now they handle our marketing too.", rating: 5 },
  { name: "Rahul Mehta", role: "CEO, FinPulse", text: "Our app went from idea to App Store in 11 weeks. 4.8 stars and growing. Worth every rupee.", rating: 5 },
  { name: "Aisha Khan", role: "Marketing Lead, Dubai", text: "Ranked us on page 1 for three target keywords in under 5 months. The SEO team knows their craft.", rating: 5 },
];

export const Testimonials = () => (
  <section className="py-24 md:py-32 relative">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Client Love</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">
          Real results, <span className="text-gradient">real founders.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {testimonials.map((t) => (
          <figure key={t.name} className="glass rounded-2xl p-7">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <blockquote className="text-foreground/90 leading-relaxed mb-5">"{t.text}"</blockquote>
            <figcaption>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
