import { chennaiData } from "@/data/locations/chennai";
import { AreaData, CityData } from "@/data/locations/types";
import { generateFallbackAreaData } from "@/lib/contentGenerator";
import { cityFromSlug, subCityFromSlug } from "@/data/site";

const ALL_CITIES: Record<string, CityData> = {
  chennai: chennaiData,
  // Other cities will be added here
};

export function getCityData(citySlug: string): CityData | undefined {
  return ALL_CITIES[citySlug];
}

/** Capitalize a slug: "thane" → "Thane", "hsr-layout" → "Hsr Layout" */
function titleCase(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAreaData(citySlugParam: string, areaSlug: string, serviceTitle: string): AreaData {
  const city = ALL_CITIES[citySlugParam];
  
  if (city) {
    const area = city.areas.find(a => a.slug === areaSlug);
    if (area) return area;
  }

  // Resolve proper display names from the central data
  const cityName = cityFromSlug(citySlugParam) || city?.name || titleCase(citySlugParam);
  const subCityName = cityName ? (subCityFromSlug(cityName, areaSlug) || titleCase(areaSlug)) : titleCase(areaSlug);

  // Fallback to programmatic generation with proper display names
  return generateFallbackAreaData(cityName, subCityName, serviceTitle);
}
