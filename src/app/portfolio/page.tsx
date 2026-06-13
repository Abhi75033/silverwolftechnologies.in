import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Portfolio & Case Studies`,
  description: "Selected work from Silver Wolf Technologies — websites, mobile apps, CRM platforms and digital marketing campaigns delivered across India and globally.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${SITE.domain}/portfolio`,
  },
  openGraph: {
    title: `Portfolio & Case Studies`,
    url: `${SITE.domain}/portfolio`,
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" }
];

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Silver Wolf Technologies — Recent Projects",
  "description": "Selected work by Silver Wolf Technologies including LMS, CRM, attendance systems and enterprise HR platforms.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "CreativeWork",
        "name": "Smart LMS — Learning Management System",
        "description": "21-table architecture, offline-to-online enrollment, auto-certificates. Built by Silver Wolf Technologies.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-lms.8180f0db.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "CreativeWork",
        "name": "Attendance Management System",
        "description": "Geo-fencing, biometric integration, managing 5000+ employees.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-attendance.5bea53d8.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "CreativeWork",
        "name": "SalesForge CRM",
        "description": "Kanban pipelines, lead scoring, 40% faster sales cycle.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-crm.168b67dc.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "CreativeWork",
        "name": "HR Portal & Employee Management",
        "description": "Leave workflows, payroll integration, birthday notifications for enterprise HR.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-hr.512b3421.png"
      }
    }
  ]
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <section className="pt-36 pb-8">
        <div className="container max-w-3xl text-center animate-fade-up">
          <Breadcrumb items={breadcrumbs} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Selected Work</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Real launches. <span className="text-gradient">Real results.</span>
          </h1>
          <p className="text-muted-foreground text-lg">A snapshot of recent websites, apps and growth campaigns shipped by our team.</p>
        </div>
      </section>
      <Portfolio />
      <Testimonials />
      <Contact compact />
    </>
  );
}
