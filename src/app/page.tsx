import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { About } from "@/components/site/About";
import { FAQ } from "@/components/site/FAQ";
import { Contact } from "@/components/site/Contact";
import SchemaMarkup from "@/components/SchemaMarkup";
import type { Metadata } from "next";

// Declared in full and applied with `title.absolute` below, so what ships is
// deterministic rather than depending on the parent layout's title template.
// 65 characters including the brand — inside Google's display limit.
const HOME_TITLE = 'Web Development & SEO Company in India | Silver Wolf Technologies';
// 149 characters. The previous version was 165 and was being truncated.
const HOME_DESCRIPTION = 'Silver Wolf Technologies builds websites, mobile apps, CRMs and runs SEO campaigns for businesses across India and worldwide. Free quote in 24h.';

export const metadata: Metadata = {
  title: { absolute: HOME_TITLE },
  description: HOME_DESCRIPTION,
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
    canonical: 'https://www.silverwolftechnologies.in/',
  },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: 'https://www.silverwolftechnologies.in/',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

/** Homepage FAQ data — mirrored from the FAQ component for JSON-LD schema */
const homepageFaqs = [
  { question: "How much does a website cost in India?", answer: "Business websites range from ₹15,000 to ₹2,00,000+ depending on features, integrations and design complexity. We provide transparent custom quotes after a free consultation." },
  { question: "Do you work with international clients?", answer: "Yes — we actively serve clients across the USA, UK, Canada, UAE and Australia, with timezone-flexible communication and weekly sprint demos." },
  { question: "How long does a project take?", answer: "Most marketing websites launch in 2–4 weeks. Mobile apps and CRMs typically take 6–12 weeks depending on scope. We share a fixed timeline before kickoff." },
  { question: "Do you offer SEO and marketing as a retainer?", answer: "Yes — our SEO and digital marketing services run as monthly retainers starting from ₹25,000/month, with full reporting dashboards and dedicated account managers." },
  { question: "Will I own the code and assets?", answer: "100%. All source code, design files and marketing assets transfer to you on project completion. No vendor lock-in." },
  { question: "Which cities in India do you serve?", answer: "We work with clients across Mumbai, Delhi NCR, Bangalore, Pune, Hyderabad, Ahmedabad, Chennai, Kolkata and every other state — fully remote-first." },
];

const schema1 = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://www.silverwolftechnologies.in/#organization",
  "name": "Silver Wolf Technologies",
  "url": "https://www.silverwolftechnologies.in",
  // Stable public URLs — hashed /_next/static paths change on every image edit.
  "logo": "https://www.silverwolftechnologies.in/favicon.png",
  "image": "https://www.silverwolftechnologies.in/og-image.jpg",
  "description": "Silver Wolf Technologies is a senior digital agency with 10+ years building high-performance websites, mobile apps, CRMs, SaaS platforms, and executing SEO and digital marketing campaigns for startups, SMBs and global enterprises across India and worldwide.",
  "foundingDate": "2015", // matches SITE.founded and the site-wide Organization schema
  "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 10, "maxValue": 50 },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Murbad",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN", 
    "postalCode": "421401"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.2333,
    "longitude": 73.3833
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-9845953801",
      "contactType": "customer service",
      "availableLanguage": ["English", "Hindi"],
      "areaServed": ["IN", "GB", "AE", "US", "CA", "AU", "SG"]
    }
  ],
  "email": "info@silverwolftechnologies.in",
  "sameAs": [
    "https://www.linkedin.com/company/silver-wolf-technologies",
    "https://www.instagram.com/silverwolftechnologies"
  ],
  "areaServed": ["India", "United Kingdom", "United Arab Emirates",
    "United States", "Canada", "Australia", "Singapore"],
  "priceRange": "₹₹",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Agency Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "E-commerce Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CRM Development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS & Web Apps" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Social Media Marketing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Graphic Design" } }
    ]
  }
  // aggregateRating removed — a fixed rating with no real reviews behind it
  // is misleading structured data. Add it back only from genuine reviews.
};

const schema2 = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.silverwolftechnologies.in/#website",
  "name": "Silver Wolf Technologies",
  "url": "https://www.silverwolftechnologies.in"
  // SearchAction removed: the site has no search results page for it to
  // point at, and Google retired the sitelinks search box in 2024.
};

// Built from homepageFaqs, which mirrors the visible FAQ section. FAQ schema
// must match what visitors can read on the page — the previous hand-written
// answers had different numbers (e.g. app timelines) and claims not shown on
// the page, which Google treats as a structured-data mismatch.
const schema3 = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": homepageFaqs.map((f) => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer },
  })),
};


export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema1) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema2) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema3) }}
      />
      <Hero />
      <Services />
      <WhyUs />
      <Portfolio />
      <Testimonials />
      {/* <About /> — commented out: will re-enable once all team member profiles are ready */}
      <FAQ />
      <Contact />
    </>
  );
}

