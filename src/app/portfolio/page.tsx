import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import { PortfolioHero } from "@/components/site/PortfolioHero";

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
  "description": "Selected work by Silver Wolf Technologies including plagiarism checkers, travel portals, e-commerce boutiques, CRM platforms, HR systems, mobile apps, bug fixing audits, and digital marketing campaigns.",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "CreativeWork",
        "name": "Plagzap",
        "description": "Real-time plagiarism scans, AI detection, side-by-side comparison, API key manager.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/Plagzap/Screenshot%202026-06-14%20at%204.09.42%20PM.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "CreativeWork",
        "name": "Dream Destination",
        "description": "Responsive holiday planning portal, destination galleries, custom booking engine.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/Dreamdestination/Screenshot%202026-06-14%20at%2010.12.06%20PM.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "CreativeWork",
        "name": "Sakhi Fragrance House",
        "description": "Shopify D2C store, 4.2% conversion rate, integrated custom theme.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/Dreamdestination/Screenshot%202026-06-14%20at%2010.12.06%20PM.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
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
      "position": 5,
      "item": {
        "@type": "CreativeWork",
        "name": "HR Portal & Employee Management",
        "description": "Leave workflows, payroll integration, birthday notifications.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-hr.512b3421.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "CreativeWork",
        "name": "FitFlow Mobile App",
        "description": "React Native application, iOS/Android launch, push notifications.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-lms.8180f0db.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "CreativeWork",
        "name": "CodeRescue System Audit",
        "description": "Stabilized legacy server, resolved 50+ memory leaks, boosted loading speed by 250%.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-crm.168b67dc.png"
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "CreativeWork",
        "name": "RankBoost SEO Campaign",
        "description": "Organic traffic growth from 5k to 50k monthly sessions.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-1.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 9,
      "item": {
        "@type": "CreativeWork",
        "name": "LeadVelocity PPC Campaign",
        "description": "Meta/Google Ads campaign, 25k leads, 3.4x ROAS.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-2.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 10,
      "item": {
        "@type": "CreativeWork",
        "name": "SocialWave Campaign",
        "description": "1.2M impressions, 25k leads generated, 3.4x ROI.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-2.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 11,
      "item": {
        "@type": "CreativeWork",
        "name": "Apex Visuals Branding",
        "description": "Full identity system, corporate logo, marketing collateral.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-3.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 12,
      "item": {
        "@type": "CreativeWork",
        "name": "Cinematic Cut Edits",
        "description": "YouTube channel scaling to 500k subscribers, 15M+ views.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-1.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 13,
      "item": {
        "@type": "CreativeWork",
        "name": "PixelPerfect Product Retouching",
        "description": "Batch-processed 5,000+ catalog images, white-background extraction, color matching.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-3.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 14,
      "item": {
        "@type": "CreativeWork",
        "name": "Vanguard Marketing Kit",
        "description": "Social packs, corporate brochures, event rollups, visual templates.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-1.jpg"
      }
    },
    {
      "@type": "ListItem",
      "position": 15,
      "item": {
        "@type": "CreativeWork",
        "name": "MedConnect Telehealth Portal",
        "description": "Patient app wireframes, doctor dashboard UI, interactive Figma prototype.",
        "creator": {"@type": "Organization", "name": "Silver Wolf Technologies"},
        "image": "https://www.silverwolftechnologies.in/_next/static/media/portfolio-lms.8180f0db.png"
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
      
      <PortfolioHero />

      <Portfolio layout="grid" />
      <Testimonials />
      <Contact compact />
    </>
  );
}
