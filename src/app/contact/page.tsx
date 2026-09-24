import { Contact } from "@/components/site/Contact";
import { FAQ } from "@/components/site/FAQ";
import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: `Contact Us | Free Consultation`,
  description: `Get in touch with Silver Wolf Technologies. Email ${SITE.email} or call ${SITE.phone}. We respond within 24 hours.`,
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
    canonical: `${SITE.domain}/contact`,
  },
  openGraph: {
    title: `Contact Us | Free Consultation`,
    url: `${SITE.domain}/contact`,
  },
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" }
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Silver Wolf Technologies",
  url: `${SITE.domain}/contact`,
  description: `Get in touch with Silver Wolf Technologies. Email ${SITE.email} or call ${SITE.phone}. We respond within 24 hours.`,
  mainEntity: {
    "@type": "Organization",
    name: SITE.name,
    url: SITE.domain,
    email: SITE.email,
    telephone: SITE.phoneRaw,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phoneRaw,
        contactType: "customer service",
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "GB", "AE", "US", "CA", "AU", "SG"],
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE.domain}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-36 pb-4 text-center">
        <div className="container max-w-3xl animate-fade-up">
          <Breadcrumb items={breadcrumbs} />
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contact</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Talk to a <span className="text-gradient">senior strategist.</span>
          </h1>
          <p className="text-muted-foreground text-lg">Tell us about your project. We respond within 24 hours.</p>
        </div>
      </section>
      <Contact />
      <FAQ />
    </>
  );
}
