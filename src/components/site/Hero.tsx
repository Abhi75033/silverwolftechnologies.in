'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowRight, Sparkles, Send, ShieldCheck, Zap, Code2, Smartphone,
  Cpu, Cloud, TrendingUp, Palette, CheckCircle2, Terminal, Activity,
  Globe, ChevronRight, Layers, ArrowUpRight
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { use3DTilt } from "@/hooks/use3DTilt";
import heroBg from "@/assets/hero-bg.jpg";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

const BentoShowcaseCard = ({
  icon: Icon,
  title,
  short,
  slug,
  span,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  short: string;
  slug: string;
  span: string;
  gradient: string;
}) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLAnchorElement>({
    maxTilt: 8,
    scale: 1.02,
    perspective: 1000,
  });

  return (
    <Link
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={`/services/${slug}`}
      className={`card-3d group relative rounded-3xl p-7 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 block overflow-hidden preserve-3d ${span}`}
    >
      <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${gradient} opacity-80 group-hover:opacity-100 transition-opacity`} />
      <div className="card-3d-glare" />

      <div className="relative z-10 preserve-3d">
        <div className="flex items-center justify-between mb-6 preserve-3d">
          <div className="h-14 w-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs translate-z-20 text-primary">
            <Icon className="h-6 w-6 group-hover:rotate-6 transition-transform duration-300" />
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full translate-z-10">
            Bento Feature
          </span>
        </div>

        <h3 className="text-xl md:text-2xl font-bold mb-2.5 text-slate-900 group-hover:text-primary transition-colors tracking-tight translate-z-20">
          {title}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal translate-z-10">
          {short}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between translate-z-20">
          <span className="text-xs font-bold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Explore Capability <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <span className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export const Hero = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = enquirySchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Proposal submitted! Our senior team will connect within 24 hours.");
      (e.target as HTMLFormElement).reset();
      setLoading(false);
    }, 700);
  };

  const { cardRef: heroRightRef, handleMouseMove: handleRightMove, handleMouseLeave: handleRightLeave } = use3DTilt<HTMLDivElement>({
    maxTilt: 8,
    scale: 1.015,
    perspective: 1200,
  });

  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 -z-10">
        <img src={heroBg.src} alt="" width={1920} height={1080} className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/85 to-white" />
      </div>
      <div className="absolute top-16 left-8 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40 right-8 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-bg -z-10" />

      <div className="container relative z-10 space-y-16">
        
        {/* ===== HERO MAIN BENTO GRID ===== */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT BENTO CARD (Span 7) */}
          <div className="lg:col-span-7 rounded-3xl p-8 md:p-12 bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 shadow-2xs">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-950">
                  Senior Digital Agency · Apple + Linear Inspired
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
                Everything <br />
                Your Business Needs — <br />
                <span className="text-gradient-primary">In One Place.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
                We craft enterprise web platforms, mobile apps, AI solutions, and performance growth campaigns for ambitious startups and businesses worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button asChild variant="hero" size="xl" className="shadow-lg shadow-indigo-500/25 rounded-full px-8">
                  <Link href="/contact" className="flex items-center justify-center gap-2">
                    <span>Start Your Project</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="rounded-full border-slate-300 hover:border-primary/40">
                  <Link href="/portfolio">Explore Case Studies</Link>
                </Button>
              </div>
            </div>

            {/* Stats row inside Bento Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 relative z-10">
              {[
                ["3.4×", "Average ROI"],
                ["200+", "Shipped Builds"],
                ["10+", "Years Exp"],
                ["24h", "Fast Response"],
              ].map(([n, l]) => (
                <div key={l} className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-sora text-gradient-primary">{n}</div>
                  <div className="text-xs font-semibold text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT BENTO CARD (Span 5) — Live Architecture Showcase & Fast Form */}
          <div
            ref={heroRightRef}
            onMouseMove={handleRightMove}
            onMouseLeave={handleRightLeave}
            className="lg:col-span-5 card-3d rounded-3xl p-7 md:p-8 bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-xl flex flex-col justify-between relative overflow-hidden preserve-3d"
          >
            <div className="card-3d-glare" />

            <div className="relative z-10 space-y-5 preserve-3d">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 translate-z-10">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Live Engineering Portal</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  Status: 200 OK
                </span>
              </div>

              {/* Form inside right bento */}
              <form onSubmit={onSubmit} className="space-y-3.5 translate-z-20">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="hero-name" className="text-xs font-semibold text-slate-700">Full Name</Label>
                    <Input id="hero-name" name="name" placeholder="Alex Rivers" className="mt-1 bg-slate-50 border-slate-200 h-9 text-xs" required />
                  </div>
                  <div>
                    <Label htmlFor="hero-email" className="text-xs font-semibold text-slate-700">Email</Label>
                    <Input id="hero-email" name="email" type="email" placeholder="alex@brand.com" className="mt-1 bg-slate-50 border-slate-200 h-9 text-xs" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="hero-service" className="text-xs font-semibold text-slate-700">Service Goal</Label>
                  <select
                    id="hero-service"
                    name="service"
                    className="mt-1 w-full h-9 rounded-md border border-slate-200 bg-slate-50 px-3 text-xs text-slate-900 focus:bg-white"
                  >
                    <option value="Website Development">Website Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="AI Solutions & Automation">AI Solutions & Automation</option>
                    <option value="Cloud & DevOps">Cloud & DevOps</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="hero-message" className="text-xs font-semibold text-slate-700">Project Brief</Label>
                  <Textarea id="hero-message" name="message" placeholder="Brief outline of your vision..." rows={2} className="mt-1 bg-slate-50 border-slate-200 resize-none text-xs" required />
                </div>

                <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full py-2.5 text-xs shadow-md shadow-indigo-500/20">
                  {loading ? "Transmitting..." : <>Request Free Audit Proposal <Send className="h-3.5 w-3.5 ml-1" /></>}
                </Button>
              </form>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 translate-z-10">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Non-Disclosure Agreement</span>
                <span>Response &lt; 24h</span>
              </div>
            </div>
          </div>

        </div>

        {/* ===== BELOW HERO 6 BENTO CARDS SHOWCASE ===== */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Core Service Verticals</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                Handcrafted <span className="text-gradient-primary">Bento Services</span>
              </h2>
            </div>
            <p className="text-slate-600 text-sm max-w-md">
              Each vertical is spearheaded by senior tech leads, product architects, and growth strategists.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6 card-3d-wrapper">
            <BentoShowcaseCard
              icon={Code2}
              title="Web Development"
              short="High-performance web apps built with Next.js, React, and serverless edge computing."
              slug="website-development"
              span="lg:col-span-4"
              gradient="from-indigo-500 via-primary to-purple-500"
            />
            <BentoShowcaseCard
              icon={Smartphone}
              title="Mobile Apps"
              short="Native iOS & Android mobile applications engineered for 60 FPS fluidity and offline resiliency."
              slug="mobile-app-development"
              span="lg:col-span-4"
              gradient="from-purple-500 via-pink-500 to-indigo-500"
            />
            <BentoShowcaseCard
              icon={Cpu}
              title="AI Solutions & Automation"
              short="Custom LLM integrations, automated agentic pipelines, and predictive machine learning models."
              slug="saas-web-apps"
              span="lg:col-span-4"
              gradient="from-emerald-500 via-teal-500 to-indigo-500"
            />
            <BentoShowcaseCard
              icon={Cloud}
              title="Cloud & Infrastructure"
              short="Scalable AWS/GCP cloud architectures, Kubernetes orchestration, and 99.99% uptime guarantees."
              slug="crm-development"
              span="lg:col-span-4"
              gradient="from-blue-500 via-cyan-500 to-indigo-500"
            />
            <BentoShowcaseCard
              icon={TrendingUp}
              title="Digital Marketing & SEO"
              short="Data-driven search dominance, multi-channel performance ads, and organic funnel acceleration."
              slug="seo-services"
              span="lg:col-span-4"
              gradient="from-indigo-500 via-purple-500 to-emerald-500"
            />
            <BentoShowcaseCard
              icon={Palette}
              title="UI/UX & Product Design"
              short="Apple-level design systems, user journeys, micro-interactions, and high-converting visual UI."
              slug="graphic-design"
              span="lg:col-span-4"
              gradient="from-purple-500 via-indigo-500 to-blue-500"
            />
          </div>
        </div>

      </div>
    </section>
  );
};


