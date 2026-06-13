import { Metadata } from "next";

export const defaultSEO: Metadata = {
  metadataBase: new URL("https://www.silverwolftechnologies.in"),
  title: {
    default: "Web Development & SEO Company in India | Silver Wolf Technologies",
    template: "%s | Silver Wolf Technologies"
  },
  description: "Silver Wolf Technologies — Senior digital agency with 10+ years building websites, mobile apps, CRMs, SaaS platforms and executing SEO & digital marketing for startups, SMBs and global enterprises across India, UK, UAE, USA and more.",
  keywords: [
    "web development company India",
    "SEO services India",
    "digital marketing agency Maharashtra",
    "mobile app development India",
    "CRM development company",
    "SaaS development India",
    "UI UX design agency India",
    "e-commerce development India",
    "website development Mumbai",
    "Silver Wolf Technologies"
  ],
  alternates: {canonical: "https://www.silverwolftechnologies.in"},
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Silver Wolf Technologies",
    title: "Web Development & SEO Company in India | Silver Wolf Technologies",
    description: "Senior digital agency — websites, apps, CRMs, SEO & marketing for ambitious brands worldwide.",
    url: "https://www.silverwolftechnologies.in",
    images: [{
      url: "https://www.silverwolftechnologies.in/_next/static/media/hero-bg.3c461c14.jpg",
      width: 1200,
      height: 630,
      alt: "Silver Wolf Technologies — Digital Agency India"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development & SEO Company in India | Silver Wolf Technologies",
    description: "Senior digital agency with 10+ years — websites, apps, CRMs, SEO & marketing for global brands.",
    images: ["https://www.silverwolftechnologies.in/_next/static/media/hero-bg.3c461c14.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};
