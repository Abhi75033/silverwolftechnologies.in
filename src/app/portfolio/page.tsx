import { Portfolio } from "@/components/site/Portfolio";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

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

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-36 pb-8">
        <div className="container max-w-3xl text-center animate-fade-up">
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
