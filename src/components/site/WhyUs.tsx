'use client';

import { Shield, Zap, Globe, HeartHandshake, LucideIcon } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

const reasons = [
  { icon: Zap, title: "Lightning Delivery", desc: "Most websites ship in 2–4 weeks. Sprint-based execution with weekly demos." },
  { icon: Shield, title: "Production-Grade Code", desc: "Clean, scalable, well-documented codebases you can hand to any team." },
  { icon: Globe, title: "India + Global Reach", desc: "Seamless collaboration across IST, EST, GMT and AEST timezones." },
  { icon: HeartHandshake, title: "Founder-Led Service", desc: "Senior strategists in every meeting — never juniors, never call-centers." },
];

const Feature3DCard = ({ icon: Icon, title, desc, className = "" }: { icon: LucideIcon; title: string; desc: string; className?: string }) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLDivElement>({
    maxTilt: 10,
    scale: 1.025,
    perspective: 1000,
  });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-3d group relative glass rounded-3xl p-6 border border-slate-200/80 bg-white/90 hover:border-primary/50 transition-all duration-300 overflow-hidden preserve-3d ${className}`}
    >
      <div className="card-3d-glare" />
      <div className="relative z-10 preserve-3d">
        <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-300 translate-z-20">
          <Icon className="h-5 w-5 text-primary group-hover:rotate-6 transition-transform" />
        </div>
        <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors tracking-tight translate-z-20">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-normal translate-z-10">
          {desc}
        </p>
      </div>
    </div>
  );
};

export const WhyUs = () => (
  <section id="why" className="py-24 md:py-32 relative overflow-hidden">
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why Silver Wolf</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            We move <span className="text-gradient">like a pack.</span> You scale like a leader.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            We're not a freelancer marketplace. We're a tight, senior team obsessed with shipping
            measurable outcomes — traffic, leads, revenue.
          </p>
          <div className="glass rounded-3xl p-7 border border-slate-200/80 shadow-sm">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl md:text-5xl font-bold text-gradient-primary">3.4×</span>
              <span className="text-sm font-semibold text-slate-700">average ROI within 90 days</span>
            </div>
            <p className="text-sm text-muted-foreground">Across 50+ active retainers in SaaS, e-commerce, D2C and services.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 card-3d-wrapper">
          {reasons.map(({ icon, title, desc }, i) => (
            <Feature3DCard
              key={title}
              icon={icon}
              title={title}
              desc={desc}
              className={i % 2 === 1 ? "sm:translate-y-8" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);

