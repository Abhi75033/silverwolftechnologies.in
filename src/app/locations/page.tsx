import { SITE, CITIES, SUB_CITIES } from "@/data/site";
import type { Metadata } from "next";
import LocationsClient from "./LocationsClient";

const totalSubCities = Object.values(SUB_CITIES).reduce((sum, arr) => sum + arr.length, 0);

export const metadata: Metadata = {
  title: `Service Locations — ${CITIES.length}+ Cities & ${totalSubCities}+ Localities`,
  description: `${SITE.name} serves clients across ${CITIES.length}+ major cities and ${totalSubCities}+ localities in India and globally.`,
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
    canonical: `${SITE.domain}/locations`,
  },
};

export default function LocationsPage() {
  return (
    <>
      <section className="pt-36 pb-12 text-center">
        <div className="container max-w-3xl animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Locations</span>
          <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
            Serving <span className="text-gradient">{CITIES.length}+ cities</span> &{" "}
            <span className="text-gradient-primary">{totalSubCities}+ localities</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick your city to explore our most-requested services in your region.
            Each locality has a dedicated page optimized for your area.
          </p>
        </div>
      </section>
      <LocationsClient />
    </>
  );
}
