import { Metadata } from "next";

export const defaultSEO: Metadata = {
  metadataBase: new URL("https://www.silverwolftechnologies.in"),
  title: {
    default: "Web Development & SEO Company in India | Silver Wolf Technologies",
    template: "%s | Silver Wolf Technologies"
  },
  // 152 chars — inside Google's ~155 character display limit so it is never
  // truncated in results. The previous fallback ran 232 characters.
  description: "Silver Wolf Technologies builds websites, mobile apps, CRMs and SaaS platforms, and runs SEO campaigns for businesses across India and worldwide.",
  /**
   * NOTE ON KEYWORDS: Google has ignored the meta keywords tag since 2009 and
   * Bing treats it as a spam signal when stuffed. These are kept because they
   * cost nothing and a few smaller engines still read them — but they do not
   * affect rankings, impressions or clicks on Google. What moves those numbers
   * is the title, the description, the on-page content and the schema.
   */
  keywords: [
    // Core services
    "web development company India",
    "website development company",
    "custom website design India",
    "mobile app development India",
    "android app development company",
    "ios app development India",
    "e-commerce development India",
    "CRM development company",
    "SaaS development India",
    "UI UX design agency India",
    // Marketing
    "SEO services India",
    "local SEO company India",
    "digital marketing agency India",
    "social media marketing agency",
    "google ads management India",
    "content marketing agency India",
    // Creative
    "branding agency India",
    "graphic design company India",
    "video editing services India",
    // Location and intent
    "website development Mumbai",
    "web development company Chennai",
    "digital agency Maharashtra",
    "hire web development agency India",
    "best digital agency for startups India",
    "Silver Wolf Technologies"
  ],
  // NOTE: deliberately NO site-wide `alternates.canonical` here.
  // In the App Router a canonical set on the root layout is inherited by every
  // child route that does not define its own — which pointed dozens of pages at
  // the homepage and produced "Alternative page with proper canonical" and
  // "Duplicate without user-selected canonical" in Search Console.
  // Each page/route must declare its own self-referencing canonical.
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
