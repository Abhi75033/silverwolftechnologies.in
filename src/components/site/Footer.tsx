'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { SERVICES, SITE, CITIES, SUB_CITIES, citySlug } from "@/data/site";
import { Mail, Phone, Globe, ChevronDown, ChevronUp, MapPin, ArrowRight, MessageCircle, Sparkles, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const dev = SERVICES.filter((s) => s.category === "Development").slice(0, 5);
const mkt = SERVICES.filter((s) => s.category === "Marketing").slice(0, 4);
const creative = SERVICES.filter((s) => s.category === "Creative").slice(0, 4);

/** Extract the active service slug from the current URL path.
 *  e.g. /services/seo-services/mumbai/thane → "seo-services"
 *  Falls back to "website-development" on non-service pages. */
function useActiveServiceSlug(): string {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "services" && segments[1]) {
    const match = SERVICES.find((s) => s.slug === segments[1]);
    if (match) return match.slug;
  }
  return SERVICES[0].slug;
}

/* ---------- Dropdown city item ---------- */
const CityDropdown = ({ city, serviceSlug }: { city: string; serviceSlug: string }) => {
  const [open, setOpen] = useState(false);
  const subs = SUB_CITIES[city] ?? [];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-primary glass rounded-full px-3.5 py-1.5 transition-all duration-300 border border-slate-200/80 hover:border-primary/40 hover:shadow-sm group"
      >
        <MapPin className="h-3 w-3 text-primary group-hover:scale-110 transition-transform" />
        <span className="font-medium">{city}</span>
        {subs.length > 0 && (
          <ChevronDown className={`h-3 w-3 text-slate-400 group-hover:text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {/* Sub-cities dropdown panel */}
      {open && subs.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-64 max-h-60 overflow-y-auto bg-white/95 backdrop-blur-xl rounded-2xl p-3 z-50 animate-fade-up border border-slate-200 shadow-xl shadow-slate-900/10">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{city} Areas</span>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700">
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {subs.map((sc) => (
              <Link
                key={sc}
                href={`/services/${serviceSlug}/${citySlug(city)}/${citySlug(sc)}`}
                onClick={() => setOpen(false)}
                className="text-[11px] font-medium text-slate-600 hover:text-primary hover:bg-primary/5 bg-slate-50 rounded-lg px-2.5 py-1 truncate transition-colors"
              >
                {sc}
              </Link>
            ))}
          </div>
          <Link
            href={`/services/${serviceSlug}/${citySlug(city)}`}
            onClick={() => setOpen(false)}
            className="block text-[11px] text-primary font-semibold mt-2.5 pt-2 border-t border-slate-100 text-center hover:underline transition-all"
          >
            View all services in {city} →
          </Link>
        </div>
      )}
    </div>
  );
};

export const Footer = () => {
  const activeSlug = useActiveServiceSlug();
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/careers/responses")) {
    return null;
  }

  return (
    <footer className="relative border-t border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 pt-16 pb-12 mt-16 overflow-hidden">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container relative z-10">

        {/* ===== PRE-FOOTER CTA CARD ===== */}
        <div className="relative glass rounded-3xl p-8 md:p-12 mb-16 border border-slate-200/80 bg-white/90 shadow-xl overflow-hidden group">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/15 transition-colors" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-3 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Start Your Growth Journey</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                Ready to build something <span className="text-gradient-primary">extraordinary?</span>
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-xl">
                Get in touch with our senior team today for a transparent quote, architecture audit, and project roadmap.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>24h Response Guaranteed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>No Lock-in Contracts</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button asChild variant="hero" size="xl" className="w-full shadow-lg shadow-indigo-500/20">
                <Link href="/contact" className="flex items-center justify-center gap-2">
                  <span>Get Free Consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="whatsapp" size="xl" className="w-full">
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Quick WhatsApp Chat</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* ===== MAIN FOOTER LINKS GRID ===== */}
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10 mb-14">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src={logo.src}
                alt="Silver Wolf Technologies logo"
                width={48}
                height={48}
                className="h-12 w-12 drop-shadow-[0_4px_15px_rgba(79,70,229,0.25)] group-hover:scale-105 transition-transform"
                loading="lazy"
              />
              <span className="font-bold text-xl leading-tight text-foreground tracking-tight">
                Silver Wolf<br />
                <span className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Technologies</span>
              </span>
            </Link>

            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm font-normal">
              A senior team with 10+ years of combined experience building websites, apps, CRMs and growth systems for ambitious brands worldwide.
            </p>

            <div className="space-y-2.5 pt-1">
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-sm text-slate-700 hover:text-primary transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium">{SITE.email}</span>
              </a>

              <a
                href={`tel:${SITE.phoneRaw}`}
                className="flex items-center gap-3 text-sm text-slate-700 hover:text-primary transition-colors group"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                  <Phone className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="font-medium">{SITE.phone}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-emerald-600" />
                </div>
                <span className="font-medium">{SITE.presence}</span>
              </div>
            </div>
          </div>

          {/* Development Services Column */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-slate-900 border-l-2 border-primary pl-3">
              Development
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {dev.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing Column */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-slate-900 border-l-2 border-primary pl-3">
              Marketing & Growth
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {mkt.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative & Company Column */}
          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-slate-900 border-l-2 border-primary pl-3">
              Creative & Company
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              {creative.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{s.title}</span>
                  </Link>
                </li>
              ))}
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Our Portfolio</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers & Openings</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* ===== LOCATIONS DROPDOWN STRIP ===== */}
        <div className="border-t border-slate-200/80 pt-8 mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Services Across {CITIES.length}+ Cities & {Object.values(SUB_CITIES).reduce((a, b) => a + b.length, 0)}+ Localities
            </h4>
            <Link href="/locations" className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1">
              View all location pages →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CITIES.map((c) => (
              <CityDropdown key={c} city={c} serviceSlug={activeSlug} />
            ))}
          </div>
        </div>

        {/* ===== BOTTOM COPYRIGHT STRIP ===== */}
        <div className="border-t border-slate-200/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-3 text-slate-600">
            <span>🇮🇳 India</span>
            <span>·</span>
            <span>🇺🇸 USA</span>
            <span>·</span>
            <span>🇬🇧 UK</span>
            <span>·</span>
            <span>🇨🇦 Canada</span>
            <span>·</span>
            <span>🇦🇪 UAE</span>
            <span>·</span>
            <span>🇦🇺 Australia</span>
            <span>·</span>
            <span>🇸🇬 Singapore</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

