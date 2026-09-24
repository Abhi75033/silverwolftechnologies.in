'use client';

import Link from "next/link";
import {
  Code2, Smartphone, Database, Bug, Search, Megaphone, Video,
  Image as ImageIcon, Palette, Rocket, ShoppingCart, LineChart,
  Share2, Layout as LayoutIcon, ArrowRight, Sparkles, CheckCircle2
} from "lucide-react";
import { SERVICES, Service } from "@/data/site";
import { use3DTilt } from "@/hooks/use3DTilt";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Smartphone, Database, Bug, Search, Megaphone, Video,
  Image: ImageIcon, Palette, Rocket, ShoppingCart, LineChart,
  Share2, Layout: LayoutIcon,
};

const CATEGORY_STYLES: Record<string, { badge: string; iconBg: string; border: string; glow: string }> = {
  Development: {
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
    iconBg: "bg-indigo-50 border-indigo-100 text-indigo-600",
    border: "group-hover:border-indigo-400",
    glow: "bg-indigo-500/10",
  },
  Marketing: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    iconBg: "bg-emerald-50 border-emerald-100 text-emerald-600",
    border: "group-hover:border-emerald-400",
    glow: "bg-emerald-500/10",
  },
  Creative: {
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    iconBg: "bg-purple-50 border-purple-100 text-purple-600",
    border: "group-hover:border-purple-400",
    glow: "bg-purple-500/10",
  },
};

const ServiceBentoCard = ({ service, index }: { service: Service; index: number }) => {
  const { cardRef, handleMouseMove, handleMouseLeave } = use3DTilt<HTMLAnchorElement>({
    maxTilt: 8,
    scale: 1.02,
    perspective: 1000,
  });

  const Icon = ICONS[service.icon] ?? Code2;
  const style = CATEGORY_STYLES[service.category] || CATEGORY_STYLES.Development;

  // Asymmetric Bento Grid span rules
  const isWide = index === 0 || index === 3 || index === 7;
  const colSpanClass = isWide ? "lg:col-span-8" : "lg:col-span-4";

  return (
    <Link
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      href={`/services/${service.slug}`}
      className={`card-3d group relative rounded-3xl p-7 border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 block overflow-hidden preserve-3d ${colSpanClass} ${style.border}`}
    >
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-primary via-indigo-500 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="card-3d-glare" />
      <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${style.glow}`} />

      <div className="relative z-10 preserve-3d pt-1 flex flex-col justify-between h-full space-y-6">
        <div>
          <div className="flex items-center justify-between mb-6 preserve-3d">
            <div className={`h-14 w-14 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-xs translate-z-20 ${style.iconBg}`}>
              <Icon className="h-6 w-6 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className={`text-[10.5px] font-extrabold tracking-[0.16em] uppercase border px-3 py-1 rounded-full translate-z-10 shadow-2xs ${style.badge}`}>
              {service.category}
            </span>
          </div>

          <h3 className={`font-extrabold text-slate-900 group-hover:text-primary transition-colors tracking-tight translate-z-20 ${isWide ? "text-2xl md:text-3xl mb-3" : "text-xl mb-2.5"}`}>
            {service.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed font-normal translate-z-10">
            {service.short}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between translate-z-20">
          <span className="text-xs font-bold text-primary inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
            Explore Service Scope <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="h-2 w-2 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-125 transition-all" />
        </div>
      </div>
    </Link>
  );
};

export const Services = () => (
  <section id="services" className="py-24 md:py-32 relative overflow-hidden">
    <div className="container relative z-10 space-y-12">
      <div className="max-w-3xl animate-fade-up space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Asymmetric Bento Architecture</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
          Tailored Capability <span className="text-gradient-primary">Bento Grid.</span>
        </h2>
        <p className="text-slate-600 text-base md:text-lg leading-relaxed font-normal">
          No generic card grids. Each capability is composed inside a handcrafted bento module with customized size, interactive hover depth, and dedicated category color logic.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-6 card-3d-wrapper">
        {SERVICES.map((s, idx) => (
          <ServiceBentoCard key={s.slug} service={s} index={idx} />
        ))}
      </div>
    </div>
  </section>
);



