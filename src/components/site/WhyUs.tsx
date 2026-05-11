import { Shield, Zap, Globe, HeartHandshake } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Lightning Delivery", desc: "Most websites ship in 2–4 weeks. Sprint-based execution with weekly demos." },
  { icon: Shield, title: "Production-Grade Code", desc: "Clean, scalable, well-documented codebases you can hand to any team." },
  { icon: Globe, title: "India + Global Reach", desc: "Seamless collaboration across IST, EST, GMT and AEST timezones." },
  { icon: HeartHandshake, title: "Founder-Led Service", desc: "Senior strategists in every meeting — never juniors, never call-centers." },
];

export const WhyUs = () => (
  <section id="why" className="py-24 md:py-32 relative">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Silver Wolf</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            We move <span className="text-gradient">like a pack.</span> You scale like a leader.
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            We're not a freelancer marketplace. We're a tight, senior team obsessed with shipping
            measurable outcomes — traffic, leads, revenue.
          </p>
          <div className="glass rounded-2xl p-6">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-bold text-gradient-primary">3.4×</span>
              <span className="text-sm text-muted-foreground">average ROI within 90 days</span>
            </div>
            <p className="text-sm text-muted-foreground">Across 50+ active retainers in SaaS, e-commerce, D2C and services.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {reasons.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className={`glass rounded-2xl p-6 ${i % 2 === 1 ? "sm:translate-y-8" : ""}`}>
              <Icon className="h-6 w-6 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
