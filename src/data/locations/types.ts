export interface FAQ {
  question: string;
  answer: string;
}

export interface AreaData {
  slug: string; // e.g., 'anna-nagar'
  name: string; // e.g., 'Anna Nagar'
  pinCode: string;
  intro: string;
  metaDescription: string;
  h2Options: string[];
  clientTypes: string; // e.g., "retail boutiques on 2nd Avenue, medical clinics near Shanti Colony"
  nearbyAreas: string[]; // e.g., ["Arumbakkam", "Villivakkam", "Aminjikarai"]
  landmarks: string[]; // e.g., ["2nd Avenue", "Shanti Colony"]
  faqs: FAQ[];
  coordinates: {
    lat: string;
    lng: string;
  };
  /**
   * Which service this area's hand-written copy was written for.
   *
   * The copy in chennai.ts and mumbai.ts talks specifically about website
   * development — landmarks, client types and FAQs are all framed around it.
   * Reusing it for the other 13 services produced pages titled "Video Editing
   * in Andheri" carrying a description about website development, and made
   * 780 descriptions duplicates of each other.
   *
   * getAreaData now returns this copy only for the matching service, and for
   * every other service generates service-correct copy while keeping the real
   * local facts (pin code, landmarks, nearby areas, coordinates).
   *
   * Defaults to "Website Development" when omitted.
   */
  writtenFor?: string;
  // ── Extended content fields (populated by contentGenerator) ──────────────────
  h1Variant?: string;       // Unique H1 text for this page
  metaTitle?: string;       // Unique meta title (without brand suffix)
  contentBlocks?: {
    heading: string;
    content: string;
  }[];                      // Dynamic array of structural body sections
  ctaCopy?: string;         // Unique CTA paragraph
  internalLinkingSuggestions?: string[]; // Internal linking paths
}

export interface CityData {
  slug: string;
  name: string;
  description: string; // 80-100 word ecosystem description
  topIndustries: string[];
  areas: AreaData[];
}
