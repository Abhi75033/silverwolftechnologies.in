import { Services } from "@/components/site/Services";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Services | Web, App, SEO & Marketing`,
  description: "Explore all services from Silver Wolf Technologies — website development, mobile apps, CRM, SEO, digital marketing, branding, video & graphic design.",
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
    canonical: `${SITE.domain}/services`,
  },
};

export default function ServicesIndex() {
  return (
    <>
      <section className="pt-36 pb-10">
        <div className="container max-w-3xl text-center animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Services</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            15+ services. <span className="text-gradient">One senior team.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A full-stack execution partner across development, marketing and creative — built for ambitious brands.
          </p>
        </div>
      </section>
      <Services />
    </>
  );
}
