"use client";

import Link from "next/link";
import { SITE } from "@/data/site";

interface BreadcrumbProps {
  items: { name: string; href: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.href ? (item.href.startsWith("http") ? item.href : `${SITE.domain}${item.href}`) : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground mb-6 flex-wrap justify-center sm:justify-start relative z-10">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-muted-foreground/40">/</span>}
              {isLast ? (
                <span className="text-foreground font-medium">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-foreground transition-colors">
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
