'use client';

import { useState } from "react";
import Link from "next/link";
import { CITIES, SUB_CITIES, SERVICES, citySlug } from "@/data/site";
import { ArrowRight, ChevronDown, ChevronUp, MapPin } from "lucide-react";

export default function LocationsClient() {
  const [expandedCities, setExpandedCities] = useState<Set<string>>(new Set());

  const toggleCity = (city: string) => {
    setExpandedCities((prev) => {
      const next = new Set(prev);
      if (next.has(city)) next.delete(city);
      else next.add(city);
      return next;
    });
  };

  return (
    <section className="pb-24">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CITIES.map((c) => {
            const subs = SUB_CITIES[c] ?? [];
            const isExpanded = expandedCities.has(c);

            return (
              <div key={c} className="glass rounded-2xl p-6">
                {/* City header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h2 className="text-xl font-semibold">{c}</h2>
                  </div>
                  {subs.length > 0 && (
                    <span className="text-[10px] font-medium text-muted-foreground glass rounded-full px-2 py-0.5">
                      {subs.length} areas
                    </span>
                  )}
                </div>

                {/* Top services for this city */}
                <ul className="space-y-2 mb-4">
                  {SERVICES.slice(0, 5).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}/${citySlug(c)}`}
                        className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 group"
                      >
                        {s.title} in {c}
                        <ArrowRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Sub-cities / localities — shown as area tags */}
                {subs.length > 0 && (
                  <>
                    <button
                      onClick={() => toggleCity(c)}
                      className="text-xs font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1 mb-3 transition-colors"
                    >
                      {isExpanded ? "Hide" : "Show"} {subs.length} localities
                      {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    {isExpanded && (
                      <div className="flex flex-wrap gap-1.5 animate-fade-up">
                        {subs.map((sc) => (
                          <Link
                            key={sc}
                            href={`/services/${SERVICES[0].slug}/${citySlug(c)}/${citySlug(sc)}`}
                            className="text-xs text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-primary/10 rounded-full px-2.5 py-1 transition-colors"
                          >
                            {sc}
                          </Link>
                        ))}
                        <Link
                          href={`/services/${SERVICES[0].slug}/${citySlug(c)}`}
                          className="text-xs text-primary font-medium inline-flex items-center gap-1 px-2.5 py-1 hover:text-primary/80 transition-colors"
                        >
                          View all services → <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

