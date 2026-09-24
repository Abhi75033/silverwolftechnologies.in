import { chennaiData } from "@/data/locations/chennai";
import { mumbaiData } from "@/data/locations/mumbai";
import { AreaData, CityData } from "@/data/locations/types";
import { generateFallbackAreaData } from "@/lib/contentGenerator";
import { cityFromSlug, subCityFromSlug } from "@/data/site";

/**
 * Cities with real hand-written locality content.
 *
 * Adding a city here is step 2 of promoting it — step 3 is adding its slug to
 * CURATED_CITIES in lib/curatedCities.ts, which is what actually makes its
 * locality pages indexable and puts them in the sitemap. Keep the two in sync.
 */
const ALL_CITIES: Record<string, CityData> = {
  chennai: chennaiData,
  mumbai: mumbaiData,
};

export function getCityData(citySlug: string): CityData | undefined {
  return ALL_CITIES[citySlug];
}

/** Capitalize a slug: "thane" → "Thane", "hsr-layout" → "Hsr Layout" */
function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Service the hand-written locality files were authored for. */
const DEFAULT_WRITTEN_FOR = "Website Development";

export function getAreaData(citySlugParam: string, areaSlug: string, serviceTitle: string): AreaData {
  const city = ALL_CITIES[citySlugParam];

  // Resolve proper display names from the central data
  const cityName = cityFromSlug(citySlugParam) || city?.name || titleCase(citySlugParam);
  const subCityName = cityName ? (subCityFromSlug(cityName, areaSlug) || titleCase(areaSlug)) : titleCase(areaSlug);

  if (city) {
    const area = city.areas.find(a => a.slug === areaSlug);
    if (area) {
      // Hand-written copy is service-specific. Return it verbatim only for the
      // service it was actually written for.
      if ((area.writtenFor ?? DEFAULT_WRITTEN_FOR) === serviceTitle) return area;

      /**
       * Different service → generate copy that genuinely describes THIS
       * service, but keep the real local facts from the curated file. Without
       * this, "Video Editing in Andheri" shipped a description about website
       * development, and all 14 services in a locality shared one description.
       */
      const generated = generateFallbackAreaData(cityName, subCityName, serviceTitle);
      return {
        ...generated,
        slug: area.slug,
        name: area.name,
        pinCode: area.pinCode,
        nearbyAreas: area.nearbyAreas,
        landmarks: area.landmarks,
        coordinates: area.coordinates,
      };
    }
  }

  // No curated data for this city — fully generated.
  return generateFallbackAreaData(cityName, subCityName, serviceTitle);
}
