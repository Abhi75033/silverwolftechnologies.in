import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SITE } from "@/data/site";
import Breadcrumb from "@/components/Breadcrumb";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Us — 10+ Years of Digital Excellence`,
  description: `Meet ${SITE.name} — senior engineers, marketers and designers with ${SITE.yearsExperience}+ years of combined experience serving brands worldwide.`,
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
    canonical: `${SITE.domain}/about`,
  },
  openGraph: {
    title: `About Us — 10+ Years of Digital Excellence`,
    description: `Meet ${SITE.name} — senior engineers, marketers and designers with ${SITE.yearsExperience}+ years of combined experience serving brands worldwide.`,
    url: `${SITE.domain}/about`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.domain}/` },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE.domain}/about` },
  ],
};

const breadcrumbs = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" }
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="pt-36 pb-8 text-center">
        <div className="container max-w-3xl animate-fade-up">
          <Breadcrumb items={breadcrumbs} />
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            About <span className="text-gradient">Silver Wolf Technologies</span>
          </h1>
        </div>
      </section>
      <About />
      <WhyUs />
      <Testimonials />
      <Contact compact />
    </>
  );
}
