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

const HOME_TITLE = 'Web Development & SEO Company in India';
const HOME_DESCRIPTION = 'Silver Wolf Technologies — 10+ years building websites, mobile apps, CRMs and SEO/digital marketing for businesses across India and globally. Get a free quote today.';

export const metadata: Metadata = {
  title: HOME_TITLE,
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

export default function Home() {
  return (
    <>
      <SchemaMarkup
        type="faq"
        data={{
          faqs: homepageFaqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }}
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

