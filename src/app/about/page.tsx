import { About } from "@/components/site/About";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { Contact } from "@/components/site/Contact";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `About Us — 10+ Years of Digital Excellence`,
  description: `Meet ${SITE.name}, a senior team of engineers, marketers and designers with ${SITE.yearsExperience}+ years of combined experience serving brands in India and globally.`,
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
    url: `${SITE.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-36 pb-8 text-center">
        <div className="container max-w-3xl animate-fade-up">
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
