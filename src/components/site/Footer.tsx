'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { SERVICES, SITE, CITIES, SUB_CITIES, citySlug } from "@/data/site";
import { Mail, Phone, Globe, ChevronDown, ChevronUp, MapPin } from "lucide-react";

const dev = SERVICES.filter((s) => s.category === "Development").slice(0, 5);
const mkt = SERVICES.filter((s) => s.category === "Marketing").slice(0, 4);
const creative = SERVICES.filter((s) => s.category === "Creative").slice(0, 4);

/** Extract the active service slug from the current URL path.
 *  e.g. /services/seo-services/mumbai/thane → "seo-services"
 *  Falls back to "website-development" on non-service pages. */
function useActiveServiceSlug(): string {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  // URL pattern: /services/[slug]/...
  if (segments[0] === "services" && segments[1]) {
    const match = SERVICES.find((s) => s.slug === segments[1]);
    if (match) return match.slug;
  }
  return SERVICES[0].slug; // default fallback
}

/* ---------- Dropdown city item ---------- */
const CityDropdown = ({ city, serviceSlug }: { city: string; serviceSlug: string }) => {
  const [open, setOpen] = useState(false);
  const subs = SUB_CITIES[city] ?? [];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-1 text-xs text-muted-foreground hover:text-foreground glass rounded-full px-3 py-1.5 transition-colors group"
      >
        <span className="flex items-center gap-1.5">
          <MapPin className="h-2.5 w-2.5 text-primary/60" />
          {city}
        </span>
        {subs.length > 0 && (
          <ChevronDown className={`h-3 w-3 text-primary/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {/* Sub-cities dropdown panel */}
      {open && subs.length > 0 && (
        <div className="absolute bottom-full left-0 mb-2 w-64 max-h-60 overflow-y-auto glass rounded-xl p-3 z-50 animate-fade-up shadow-lg shadow-black/30">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{city} Areas</span>
            <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
              <ChevronUp className="h-3 w-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {subs.map((sc) => (
              <Link
                key={sc}
                href={`/services/${serviceSlug}/${citySlug(city)}/${citySlug(sc)}`}
                onClick={() => setOpen(false)}
                className="text-[11px] text-muted-foreground hover:text-foreground hover:bg-primary/5 bg-secondary/50 rounded-md px-2 py-1 truncate transition-colors"
              >
                {sc}
              </Link>
            ))}
          </div>
          {/* Link to full city page */}
          <Link
            href={`/services/${serviceSlug}/${citySlug(city)}`}
            onClick={() => setOpen(false)}
            className="block text-[10px] text-primary font-medium mt-2 pt-2 border-t border-border text-center hover:text-primary/80 transition-colors"
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

  return (
  <footer className="border-t border-border pt-16 pb-10 mt-10">
    <div className="container">
      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-10 mb-12">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-5">
            <img src={logo.src} alt="Silver Wolf Technologies" width={48} height={48} className="h-12 w-12" loading="lazy" />
            <span className="font-semibold text-lg leading-tight">
              Silver Wolf<br/>
              <span className="text-gradient text-xs tracking-[0.2em] uppercase">Technologies</span>
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-sm">
            A senior team with 10+ years of combined experience building websites, apps, CRMs and growth systems for ambitious brands worldwide.
          </p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2.5"><Mail className="h-4 w-4 text-primary" /> <a className="text-muted-foreground hover:text-foreground" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex items-center gap-2.5"><Phone className="h-4 w-4 text-primary" /> <a className="text-muted-foreground hover:text-foreground" href={`tel:${SITE.phoneRaw}`}>{SITE.phone}</a></li>
            <li className="flex items-center gap-2.5"><Globe className="h-4 w-4 text-primary" /> <span className="text-muted-foreground">{SITE.presence}</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Development</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {dev.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Marketing</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {mkt.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-foreground">{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Creative & Company</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            {creative.map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="hover:text-foreground">{s.title}</Link></li>
            ))}
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* ===== Locations with dropdown sub-cities ===== */}
      <div className="border-t border-border pt-8 mb-8">
        <div className="flex items-center justify-between mb-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Services Across {CITIES.length}+ Cities & {Object.values(SUB_CITIES).reduce((a, b) => a + b.length, 0)}+ Localities
          </h4>
          <Link href="/locations" className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">
            View all locations →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {CITIES.map((c) => (
            <CityDropdown key={c} city={c} serviceSlug={activeSlug} />
          ))}
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
        <p>India · USA · UK · Canada · UAE · Australia · Singapore</p>
      </div>
    </div>
  </footer>
  );
};
