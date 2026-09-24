/**
 * ─── Location FAQ Generator ──────────────────────────────────────────────────
 *
 * City-level pages previously carried no FAQPage schema — only locality pages
 * did. FAQ markup is the single highest-leverage structured data for AEO:
 * it is what feeds Google AI Overviews, ChatGPT Search and Perplexity the
 * question/answer pairs they quote directly.
 *
 * Questions are deterministically varied per (service × city) so the 308 city
 * pages are not 308 copies of the same block.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SITE } from "@/data/site";
import type { FAQ } from "@/data/locations/types";

function hash(...parts: string[]): number {
  const str = parts.join("|");
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0;
  }
  return h >>> 0;
}

const COST_FRAMINGS = [
  (svc: string, city: string) =>
    `How much does ${svc.toLowerCase()} cost in ${city}?`,
  (svc: string, city: string) =>
    `What is the price of ${svc.toLowerCase()} in ${city}?`,
  (svc: string, city: string) =>
    `What budget should a ${city} business plan for ${svc.toLowerCase()}?`,
];

const TIMELINE_FRAMINGS = [
  (svc: string, city: string) =>
    `How long does ${svc.toLowerCase()} take in ${city}?`,
  (svc: string, city: string) =>
    `What is the turnaround time for ${svc.toLowerCase()} in ${city}?`,
  (svc: string, city: string) =>
    `How quickly can a ${city} project go live?`,
];

const CHOICE_FRAMINGS = [
  (svc: string, city: string) =>
    `Who is the best ${svc.toLowerCase()} company in ${city}?`,
  (svc: string, city: string) =>
    `Which ${svc.toLowerCase()} agency should ${city} businesses choose?`,
  (svc: string, city: string) =>
    `What makes a good ${svc.toLowerCase()} partner in ${city}?`,
];

/**
 * Build a FAQ set for a service in a city (or a locality within a city).
 * Answers are written to be directly quotable: the first sentence answers
 * the question outright, which is what answer engines extract.
 */
export function generateLocationFaqs(
  serviceTitle: string,
  city: string,
  subCity?: string
): FAQ[] {
  const place = subCity ? `${subCity}, ${city}` : city;
  const shortPlace = subCity || city;
  const svc = serviceTitle;
  const h = hash(serviceTitle, city, subCity || "");

  const costQ = COST_FRAMINGS[h % COST_FRAMINGS.length](svc, shortPlace);
  const timeQ = TIMELINE_FRAMINGS[(h >>> 3) % TIMELINE_FRAMINGS.length](svc, shortPlace);
  const choiceQ = CHOICE_FRAMINGS[(h >>> 6) % CHOICE_FRAMINGS.length](svc, shortPlace);

  return [
    {
      question: `Does ${SITE.name} provide ${svc.toLowerCase()} in ${place}?`,
      answer: `Yes. ${SITE.name} provides ${svc.toLowerCase()} to businesses in ${place}. The team has ${SITE.yearsExperience}+ years of experience and works remotely with clients across ${shortPlace}, handling discovery, delivery and post-launch support end to end.`,
    },
    {
      question: costQ,
      answer: `${svc} pricing in ${shortPlace} depends on scope — the number of pages or screens, integrations required, and whether ongoing support is included. ${SITE.name} quotes each project individually and transparently after a free consultation, with no retainer lock-in. Email ${SITE.email} or call ${SITE.phoneRaw} for a fixed quote within 24 hours.`,
    },
    {
      question: timeQ,
      answer: `Most ${svc.toLowerCase()} projects for ${shortPlace} clients ship in 2 to 4 weeks. ${SITE.name} runs weekly demos throughout so you see working output rather than status reports, and complex platforms are staged into phased releases so something useful goes live early.`,
    },
    {
      question: choiceQ,
      answer: `Look for three things: senior people actually on your project rather than juniors behind a sales team, hand-written code instead of recycled templates, and full ownership of the code and assets handed to you at the end. ${SITE.name} operates founder-led on all three counts and has served ${shortPlace} businesses for ${SITE.yearsExperience}+ years.`,
    },
    {
      question: `How do I contact ${SITE.name} for ${svc.toLowerCase()} in ${shortPlace}?`,
      answer: `Email ${SITE.email}, call ${SITE.phoneRaw}, message +${SITE.whatsapp} on WhatsApp, or use the form at ${SITE.domain}/contact. Every enquiry from ${shortPlace} receives a response within 24 hours.`,
    },
  ];
}
