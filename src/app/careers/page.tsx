import { CareersPage } from "@/components/site/CareersPage";
import { SITE } from "@/data/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — Join Silver Wolf Technologies",
  description: "Explore open roles at Silver Wolf Technologies. We're hiring full-stack developers, SEO specialists, designers and marketers. Remote-first team.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: `${SITE.domain}/careers`,
  },
  openGraph: {
    title: "Careers — Join Silver Wolf Technologies",
    description: "Explore open roles at Silver Wolf Technologies. We're hiring full-stack developers, SEO specialists, designers and marketers. Remote-first team.",
    url: `${SITE.domain}/careers`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — Join Silver Wolf Technologies",
    description: "Explore open roles at Silver Wolf Technologies. We're hiring full-stack developers, SEO specialists, designers and marketers. Remote-first team.",
  },
};

export default function CareersPageRoute() {
  return <CareersPage />;
}
