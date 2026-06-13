import { AreaData } from "@/data/locations/types";
import { SITE } from "@/data/site";

// ─── City Context Database ────────────────────────────────────────────────────
// Provides area-type hints so intros feel locally researched.
const CITY_CONTEXT: Record<string, { industries: string[]; character: string; landmark: string }> = {
  Mumbai:    { industries: ["finance", "media", "startups", "retail", "logistics"], character: "commercial", landmark: "BKC & Lower Parel" },
  Delhi:     { industries: ["government", "retail", "IT services", "healthcare", "education"], character: "commercial", landmark: "Connaught Place & Aerocity" },
  Bangalore: { industries: ["SaaS", "IT", "startups", "e-commerce", "biotech"], character: "tech", landmark: "MG Road & Electronic City" },
  Hyderabad: { industries: ["pharma", "IT", "real estate", "manufacturing", "fintech"], character: "tech", landmark: "HITEC City & Banjara Hills" },
  Pune:      { industries: ["IT", "automotive", "education", "manufacturing", "SaaS"], character: "tech", landmark: "Hinjewadi IT Park & Koregaon Park" },
  Chennai:   { industries: ["IT", "manufacturing", "healthcare", "retail", "logistics"], character: "mixed", landmark: "OMR & T Nagar" },
  Kolkata:   { industries: ["trade", "manufacturing", "education", "retail", "logistics"], character: "commercial", landmark: "Salt Lake & Park Street" },
  Ahmedabad: { industries: ["textiles", "chemicals", "retail", "pharma", "manufacturing"], character: "industrial", landmark: "SG Highway & CG Road" },
  Jaipur:    { industries: ["tourism", "handicrafts", "retail", "gems", "real estate"], character: "commercial", landmark: "MI Road & Malviya Nagar" },
  Lucknow:   { industries: ["government", "retail", "education", "healthcare", "real estate"], character: "commercial", landmark: "Hazratganj & Gomti Nagar" },
  Chandigarh:{ industries: ["government", "IT", "education", "retail", "healthcare"], character: "mixed", landmark: "IT Park & Sector 17" },
  Noida:     { industries: ["IT", "media", "manufacturing", "real estate", "startups"], character: "tech", landmark: "Sector 62 & Film City" },
  Gurgaon:   { industries: ["fintech", "SaaS", "consulting", "real estate", "retail"], character: "tech", landmark: "Cyber City & Golf Course Road" },
  Indore:    { industries: ["retail", "manufacturing", "pharma", "IT", "textiles"], character: "commercial", landmark: "Vijay Nagar & AB Road" },
  Surat:     { industries: ["diamonds", "textiles", "chemicals", "retail", "real estate"], character: "industrial", landmark: "Ring Road & Adajan" },
  Kochi:     { industries: ["tourism", "IT", "trade", "healthcare", "shipping"], character: "mixed", landmark: "Infopark & Marine Drive" },
  Dubai:     { industries: ["real estate", "retail", "hospitality", "fintech", "logistics"], character: "commercial", landmark: "DIFC & Dubai Marina" },
  London:    { industries: ["finance", "tech", "media", "retail", "consulting"], character: "tech", landmark: "Shoreditch & Canary Wharf" },
  "New York":{ industries: ["finance", "media", "tech", "retail", "real estate"], character: "commercial", landmark: "Manhattan & Brooklyn" },
  Toronto:   { industries: ["finance", "tech", "real estate", "healthcare", "retail"], character: "tech", landmark: "Downtown & Markham" },
  Sydney:    { industries: ["finance", "tech", "tourism", "retail", "real estate"], character: "commercial", landmark: "CBD & Parramatta" },
  Singapore: { industries: ["fintech", "logistics", "SaaS", "trade", "biotech"], character: "tech", landmark: "Raffles Place & One-North" },
};

// ─── Sub-city area-type detection ────────────────────────────────────────────
// Detects the local character of a sub-city from its name for smarter intros.
function detectAreaType(subCity: string): "tech" | "industrial" | "commercial" | "residential" | "luxury" {
  const s = subCity.toLowerCase();
  if (/whitefield|hitec|cyber|perungudi|sholinganallur|omr|hinjewadi|sector 6|infopark|one.north|electronic|it park|phase [123]/.test(s)) return "tech";
  if (/industrial|ambattur|guindy|peenya|avadi|katargam|udhna|manesar|naroda|okhla|surat/.test(s)) return "industrial";
  if (/nagar|park|colony|layout|vihar|kunj|hills|enclave|banjara|koregaon|juhu|bandra|adyar|besant|nungambakkam/.test(s)) return "residential";
  if (/mall|bazaar|market|road|chowk|mahal|connaught|t nagar|lajpat|mg road|usman/.test(s)) return "commercial";
  return "commercial";
}

// ─── Strong hash function ─────────────────────────────────────────────────────
function hashCode(city: string, subCity: string, service: string): number {
  const str = `${city}|${subCity}|${service}`;
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) ^ str.charCodeAt(i);
    h = h >>> 0;
  }
  return h;
}

// ─── Intro Templates (12 variants) ───────────────────────────────────────────
// Placeholders: {city}, {subCity}, {service}, {agencyName}, {industry1}, {industry2}, {landmark}, {character}
const INTROS = [
  // 0 — direct, value-led
  `If you run a business in {subCity}, you already know the stakes. The {city} market — especially around {landmark} — rewards brands that project authority online and punishes those that don't. At {agencyName}, our {service} team works exclusively with growth-focused businesses to build digital platforms that load instantly, rank prominently, and convert visitors into paying customers. We don't touch generic templates; every project starts from a blank Figma canvas and ends with clean, production-grade code. Businesses operating in {subCity}'s busy {character} corridors — whether you serve {industry1} clients or cater to the thriving {industry2} sector — deserve a website that matches the ambition behind your brand.`,

  // 1 — narrative, problem-first
  `A slow, outdated website in {subCity} isn't just an aesthetic problem — it's a revenue problem. When potential customers search for {service} providers in {city}, Google surfaces the fastest, most authoritative result first. If that's not you, it's your competitor. {agencyName} was built to fix exactly this. We engineer modern, {service} solutions for businesses embedded in {subCity}'s competitive {character} landscape — from {industry1} firms near {landmark} to fast-scaling {industry2} companies looking to capture high-intent local traffic. Our process is hands-on, our timelines are tight, and our results are measurable.`,

  // 2 — confident, challenger tone
  `Most digital agencies in {city} will sell you a WordPress template and call it a custom website. We won't. At {agencyName}, our senior {service} team hand-engineers every platform we deploy — React components built from scratch, performance budgets enforced from day one, and local SEO structured specifically for the {subCity} market. Whether you are in the {industry1} space near {landmark} or building the next major {industry2} brand in {city}, we have the technical depth to make your digital presence genuinely stand out. {subCity} is competitive. Your website should be too.`,

  // 3 — collaborative, discovery-first
  `Great {service} starts with understanding your customers — not your color preferences. When we onboard {subCity} businesses, we begin by mapping the specific search behaviors of your local audience in {city}. We look at what {industry1} buyers and {industry2} clients are actually typing into Google near {landmark}, and we engineer your digital presence to intercept that intent at every stage. The result is a platform built around real demand — not assumptions. {agencyName} has spent years refining this approach for businesses operating in {city}'s most dynamic {character} zones, and {subCity} is no exception.`,

  // 4 — stat-driven, credibility-first
  `Over 70% of consumers research a service online before making contact. In a dense market like {subCity}, that means your website is often the first — and sometimes only — impression you make. At {agencyName}, we engineer {service} solutions built to make that impression count. We serve businesses in {city}'s {character} corridors, from established {industry1} companies near {landmark} to ambitious {industry2} startups scaling their customer base. Every site we build scores 90+ on Google Lighthouse, loads in under two seconds, and is architecturally optimized to rank for your most valuable local search terms.`,

  // 5 — local-authority, geographic depth
  `{subCity} sits at the heart of one of {city}'s most active {character} zones. Businesses here — spanning {industry1}, {industry2}, and everything between — compete not just locally but regionally. Winning that competition online requires more than a decent-looking website; it requires technical precision, fast load times, structured data, and content that Google recognizes as genuinely relevant to the {subCity} audience. That's exactly what {agencyName} delivers. Our {service} team has deep experience serving the {city} market and understands the local demand patterns, the nearby landmarks like {landmark}, and the competitive landscape that shapes what it takes to rank here.`,

  // 6 — conversational, founder-to-founder
  `Running a business in {subCity} is not easy. Between managing the day-to-day and growing your customer base, your digital presence often ends up as an afterthought — until a competitor who invested in it starts taking your leads. That's where {agencyName} steps in. We are a specialist {service} team that works with {city} businesses — from {industry1} operators near {landmark} to growing {industry2} brands — to build the kind of online presence that generates real enquiries. No fluff, no recycled designs. Just clean, fast, locally-optimized web platforms built to last.`,

  // 7 — aspirational, growth-framing
  `{subCity} has the business density, the consumer demand, and the infrastructure to support ambitious growth. What many local businesses are missing is a digital presence that keeps pace. {agencyName}'s {service} team helps {city}-based brands — across {industry1}, {industry2}, and adjacent sectors — transform their online channels from a passive brochure into an active lead-generation engine. With strategic SEO baked into the architecture, a mobile-first build process, and deep familiarity with the {landmark} commercial corridor, we give {subCity} businesses the digital infrastructure to compete at the next level.`,

  // 8 — data-meets-craft
  `In {subCity}, as across {city}'s broader {character} market, the gap between a high-performing website and an average one is measurable in thousands of rupees of monthly revenue. {agencyName} closes that gap. We engineer {service} solutions using modern stacks — primarily Next.js and React — that produce 90+ Lighthouse scores and sub-two-second load times across all devices. But speed is just the foundation. We layer on hyper-local SEO structured specifically for {subCity}, leveraging {city}'s search demand patterns near {landmark} and the commercial activity of {industry1} and {industry2} sectors to ensure your platform ranks where it matters most.`,

  // 9 — differentiated, process-led
  `Our {service} process for {subCity} businesses begins with a question most agencies skip: who is already winning? We conduct a detailed competitor audit, analyze what is ranking in {city} for your target keywords, and reverse-engineer the technical and content gaps. Then we build — from a custom Figma design to a production Next.js codebase, optimized specifically for the search demand near {landmark} and the buying behaviors of {industry1} and {industry2} customers in your area. The result is not just a website; it is a strategic digital asset built to compound its value over time.`,

  // 10 — warm, community-aware
  `There is something distinctive about doing business in {subCity}. The local customer base — shaped by proximity to {landmark} and the activity of sectors like {industry1} and {industry2} — has specific expectations. They search differently, compare differently, and decide differently. {agencyName} builds {service} solutions that account for this. We do not apply a generic formula; we study the local market, design for local intent, and engineer for the technical standards that Google now enforces. If you want a digital presence that feels native to {subCity} and performs at {city}-wide scale, let's talk.`,

  // 11 — premium, authority-signal
  `Premium brands in {subCity} do not compromise on their physical spaces — and they should not compromise on their digital ones either. {agencyName} is the {service} partner of choice for businesses in {city}'s most demanding {character} environments, including {industry1} and {industry2} sectors near {landmark}. We build with enterprise-grade rigor: clean TypeScript codebases, automated performance monitoring, structured JSON-LD schema, and mobile-first layouts that maintain pixel-perfect fidelity across every screen size. If your business in {subCity} is serious about growth, your website needs to reflect that seriousness from the very first load.`,
];

// ─── H2 Option Sets (8 sets × 3 options) ─────────────────────────────────────
const H2_SETS = [
  [
    `Why {subCity} Businesses Choose Our {service} Team`,
    `Our {service} Process, Built Around Your Local Market`,
    `Serving {city}'s {character} Economy Since Day One`,
  ],
  [
    `{service} Solutions Designed for the {subCity} Market`,
    `How We Help {city} Businesses Outrank the Competition`,
    `What You Get: Fast, Optimized, and Locally Relevant`,
  ],
  [
    `Premium {service} Near {landmark}`,
    `From Discovery to Launch: Our Proven Approach`,
    `Built for {subCity}, Optimized for {city}`,
  ],
  [
    `The {agencyName} Difference for {subCity} Businesses`,
    `Technical Excellence Meets Local Market Knowledge`,
    `Results Our {city} Clients See in 90 Days`,
  ],
  [
    `How We Engineer {service} That Ranks in {city}`,
    `Local Expertise, Global-Grade Technical Standards`,
    `Why Generic Templates Fail {subCity} Businesses`,
  ],
  [
    `{service} Built Around Your {subCity} Audience`,
    `Speed, SEO, and Conversions — Delivered Together`,
    `A Digital Presence Worthy of Your {city} Brand`,
  ],
  [
    `Winning Local Search in {subCity} and Beyond`,
    `Our {service} Blueprint for {city} Businesses`,
    `From {subCity} to the Wider {city} Market`,
  ],
  [
    `Trusted {service} Partner for {subCity} Brands`,
    `Data-Driven Design for the {city} Digital Market`,
    `Grow in {subCity}, Scale Across {city}`,
  ],
];

// ─── FAQ Sets (6 sets × 4 questions) ─────────────────────────────────────────
const FAQ_SETS = [
  // Set 0 — timeline + local SEO + CMS + pricing
  [
    {
      question: "How long does the {service} project take for a {subCity} business?",
      answer: "Most {subCity} clients are live in 3–4 weeks. For more complex builds — say a multi-service platform or an e-commerce store — we typically scope 6–8 weeks with weekly sprint reviews so you always know where things stand.",
    },
    {
      question: "Will the website actually rank on Google in {city}?",
      answer: "Technical SEO is built into every line of code we write — proper semantic HTML, structured data markup, Core Web Vitals optimization, and localized content structured for {subCity} search intent. It is not an afterthought; it is the foundation.",
    },
    {
      question: "Can my team update the content after launch?",
      answer: "Yes. We integrate headless CMS solutions — Sanity, Contentful, or a lightweight custom admin — so your team can update services, blog posts, pricing, and images without touching the code.",
    },
    {
      question: "How is pricing structured?",
      answer: "Every project is scoped individually because every business is different. We provide a detailed, itemized proposal after our discovery call so you know exactly what you're paying for — no vague retainers, no surprise invoices.",
    },
  ],
  // Set 1 — tech stack + mobile + ownership + support
  [
    {
      question: "What technology stack do you use for {service}?",
      answer: "Our default stack is Next.js (React) for the frontend and Tailwind CSS for styling — giving you server-side rendering, automatic image optimization, and a 90+ Lighthouse score out of the box. For backends, we use Supabase, Node.js, or serverless functions depending on your data requirements.",
    },
    {
      question: "Will my website perform well on mobile in {city}?",
      answer: "Mobile-first is not a checkbox for us — it is where every design starts. Given that over 60% of local searches in {city} happen on smartphones, we make sure your {subCity} site is flawless on every screen size before we even look at desktop.",
    },
    {
      question: "Do I own the codebase and design files?",
      answer: "Completely. Once the project is delivered and payment is complete, you own 100% of the source code, Figma files, and all content. We have no vendor lock-in and will happily hand everything over to your internal team if needed.",
    },
    {
      question: "What happens after the website launches?",
      answer: "We provide 30 days of post-launch support at no extra cost. After that, we offer flexible maintenance retainers or ad-hoc support — whichever suits your team. Many of our {subCity} clients stay on a monthly retainer for ongoing SEO and feature development.",
    },
  ],
  // Set 2 — B2B / lead-gen focus
  [
    {
      question: "Can you build a website that actively generates B2B leads in {subCity}?",
      answer: "That is precisely what we specialize in for {city}'s commercial market. We design every page with conversion intent — strategic CTAs, trust signals, case study sections, and integrated lead forms that feed directly into your CRM or WhatsApp pipeline.",
    },
    {
      question: "How do you handle SEO for competitive keywords in {city}?",
      answer: "We start with a full competitor and keyword audit, identify the gaps in what is ranking near {subCity}, and build a content and technical strategy around those gaps. It is methodical, not guesswork — and we show you the ranking progress monthly.",
    },
    {
      question: "Can you migrate our existing website without losing traffic?",
      answer: "Yes. We run full URL mapping before any migration, implement 301 redirects for every changed URL, and submit updated sitemaps immediately post-launch. Our {city} clients have never lost significant organic traffic during a migration we managed.",
    },
    {
      question: "Do you offer ongoing content or SEO services after launch?",
      answer: "Absolutely. We have dedicated SEO specialists who can build a long-term content strategy for your {subCity} business — targeting high-intent local queries, producing structured blog content, and building authority over time.",
    },
  ],
  // Set 3 — e-commerce / retail focus
  [
    {
      question: "Can you build an e-commerce store for my {subCity} retail business?",
      answer: "Yes — and we will build it to convert, not just to look good. We specialize in headless Shopify, WooCommerce, and custom Next.js storefronts with Razorpay/Stripe integrations, inventory management, and abandoned-cart recovery flows.",
    },
    {
      question: "How do you help local retailers in {city} compete with large e-commerce platforms?",
      answer: "By doubling down on what large platforms cannot offer: local trust, speed, and hyper-specific product presentation. We build {subCity}-specific landing pages, optimize for 'near me' searches, and design checkout flows optimized for Indian consumer behavior.",
    },
    {
      question: "Will the website handle high traffic during sale seasons?",
      answer: "Yes. We deploy on globally distributed edge networks — Vercel or Cloudflare — that scale automatically. Your site will not buckle during Diwali sales or product launches, regardless of traffic spikes.",
    },
    {
      question: "Do you handle the design of product pages too?",
      answer: "Yes, product detail pages are often where conversions are won or lost. We design and build PDPs with optimized image loading, rich structured data for Google Shopping, and mobile-first layouts that minimize friction to purchase.",
    },
  ],
  // Set 4 — healthcare / professional services focus
  [
    {
      question: "Do you build websites for clinics and healthcare providers in {subCity}?",
      answer: "Yes, and healthcare is one of our strongest verticals. We build HIPAA-conscious platforms with online appointment booking, doctor profile pages, service landing pages optimized for local {city} healthcare searches, and patient-friendly navigation.",
    },
    {
      question: "How do you ensure the website builds trust for a professional services firm?",
      answer: "Trust is designed in. We use testimonial sections, case study pages, team bios, accreditation badges, and schema markup that signals authority to Google. Everything is structured to reduce visitor hesitation and accelerate the decision to contact you.",
    },
    {
      question: "Can you integrate an online booking system?",
      answer: "Yes. We integrate Calendly, custom booking engines, or clinic-specific scheduling tools directly into your site — fully synced with your calendar and sending automated confirmations to patients or clients in {subCity}.",
    },
    {
      question: "Is the website content written for us?",
      answer: "We offer optional SEO copywriting as part of the project. Our writers produce service-page content structured for local {city} search intent — not generic filler text — which makes a measurable difference to how Google evaluates and ranks the pages.",
    },
  ],
  // Set 5 — startup / SaaS focus
  [
    {
      question: "Do you have experience building websites for SaaS startups in {city}?",
      answer: "Yes — SaaS is one of our core specializations. We have built everything from early-stage product landing pages to full marketing sites for funded companies in {city}'s tech corridors. We understand how to present a software product to both technical and non-technical buyers.",
    },
    {
      question: "How quickly can you ship an MVP marketing site for our {subCity} startup?",
      answer: "For a lean product landing page with a waitlist capture, contact form, and core feature sections, we can typically ship in 10–14 days. A full marketing site with multiple use-case pages and blog infrastructure takes 3–4 weeks.",
    },
    {
      question: "Can the website integrate with our product analytics and tracking?",
      answer: "Yes. We routinely set up Google Tag Manager, Segment, Mixpanel, and custom event tracking so you know exactly which pages, CTAs, and referral sources drive sign-ups. This is standard on all our {city} startup projects.",
    },
    {
      question: "Will the design system scale as our product grows?",
      answer: "It is built to. We deliver a full Figma design system alongside the codebase — reusable components, a documented token system, and clear spacing and typography rules — so your team can extend the site independently as the product evolves.",
    },
    {
      question: "Do you offer equity or deferred payment models for early-stage startups in {subCity}?",
      answer: "We evaluate equity arrangements on a case-by-case basis for pre-seed and seed-stage startups in {city}'s tech ecosystem. Reach out with your funding stage and runway, and we'll have an honest conversation about what makes sense for both sides.",
    },
  ],
  // Set 6 — local performance + speed focus
  [
    {
      question: "How do you ensure our {subCity} site loads fast for local users?",
      answer: "We run performance budgets from day one — enforcing image optimization, lazy loading, deferred scripts, and edge-cached delivery via Vercel or Cloudflare. Every {subCity} project is tested on real 4G devices, not just lab emulators, before launch.",
    },
    {
      question: "What is a Core Web Vitals score and why does it matter for {city} SEO?",
      answer: "Core Web Vitals are Google's real-world speed and stability metrics — LCP, INP, and CLS. They're a confirmed ranking factor. A site that fails these thresholds will be systematically outranked by technically superior competitors in {city}'s local search results.",
    },
    {
      question: "Can you audit and fix our existing slow website in {subCity}?",
      answer: "Yes — performance auditing and remediation is one of our most requested services. We produce a detailed PageSpeed and Core Web Vitals report, prioritise the highest-impact fixes, and implement them in a structured sprint so you see measurable score improvements within weeks.",
    },
    {
      question: "Will the site stay fast as we add more content over time?",
      answer: "Yes, if it's built correctly. We implement incremental static regeneration, image CDN pipelines, and database query optimisation from the start — so adding 500 blog posts or 200 product pages doesn't degrade the performance your {subCity} visitors experience.",
    },
    {
      question: "How does site speed affect conversions for {subCity} businesses specifically?",
      answer: "Studies consistently show that each additional second of load time reduces conversions by 4–8%. In a dense local market like {subCity}, where users have multiple alternatives a search away, a two-second faster load time can meaningfully shift lead volume in your favour.",
    },
  ],
  // Set 7 — digital marketing + paid ads focus
  [
    {
      question: "Can you run Google Ads alongside building our {subCity} website?",
      answer: "Yes — we offer integrated digital marketing alongside {service}, which is often more cost-effective than managing them separately. Our {city} clients benefit from a single team that ensures ad landing pages are perfectly aligned with campaign messaging and conversion tracking.",
    },
    {
      question: "How do you structure landing pages for paid campaigns in {city}?",
      answer: "Every paid landing page we build has a single focused conversion objective, fast load time, trust signals above the fold, and clean UTM parameter tracking. We A/B test headline and CTA variants and report conversion rates monthly so your ad spend improves continuously.",
    },
    {
      question: "What's the difference between SEO and paid ads for {subCity} businesses?",
      answer: "Paid ads deliver immediate visibility but stop the moment you stop spending. SEO builds compounding organic authority that keeps generating leads at zero incremental cost per click. Our recommendation for most {subCity} clients is a phased approach: paid to prove demand, SEO to own the position long-term.",
    },
    {
      question: "Can you help us retarget visitors who didn't convert on our {subCity} site?",
      answer: "Yes. We implement Meta Pixel, Google Ads remarketing tags, and custom audience segments during the initial build — so you can serve retargeting ads to high-intent {city} visitors who browsed your services but didn't make contact, often at significantly lower cost-per-lead.",
    },
    {
      question: "Do you offer WhatsApp lead integration for {subCity} businesses?",
      answer: "Absolutely. WhatsApp is the dominant B2C contact channel in India. We integrate click-to-WhatsApp buttons, pre-filled message templates, and lead routing logic so enquiries from your {subCity} site flow directly into your team's WhatsApp pipeline with full attribution tracking.",
    },
  ],
  // Set 8 — branding + social media focus
  [
    {
      question: "Can you help us define our brand identity alongside the {subCity} website build?",
      answer: "Yes — we offer integrated branding and {service} packages specifically for {city} businesses that want both done cohesively. Our brand strategy process covers positioning, messaging hierarchy, visual identity, and a brand guidelines document your team can apply consistently across all touchpoints.",
    },
    {
      question: "How do you make our {subCity} website stand out from competitors visually?",
      answer: "We start from a blank Figma canvas for every project — no recycled themes or component libraries. Every visual decision is informed by your brand positioning, your target audience in {city}, and a competitive audit of what's already in the market so we design something genuinely differentiated.",
    },
    {
      question: "Can you create social media assets that match the new {subCity} website?",
      answer: "Yes. We produce matched social media templates — Instagram, LinkedIn, Twitter/X — in Figma as part of our brand delivery package. These are fully editable by your team and designed to maintain visual consistency between your {city} website and social presence.",
    },
    {
      question: "Should we redesign or just refresh our existing {subCity} website?",
      answer: "It depends on the underlying code. If the codebase is outdated and causing Core Web Vitals failures, a rebuild on a modern stack delivers better long-term ROI than a visual refresh on a broken foundation. We'll give you an honest technical assessment during our free discovery call.",
    },
    {
      question: "How do you handle photography and image sourcing for {city} project pages?",
      answer: "We source from premium licensed libraries like Unsplash Pro and Shutterstock as a baseline. For {subCity} clients who want genuinely local photography, we can recommend vetted commercial photographers in {city} or art-direct a shoot brief that integrates with your new platform's visual system.",
    },
  ],
  // Set 9 — maintenance + long-term partnership focus
  [
    {
      question: "What does a monthly maintenance retainer include for {subCity} businesses?",
      answer: "Our maintenance retainers cover Core Web Vitals monitoring, dependency and security updates, CMS content changes, minor design tweaks, and monthly Search Console review. Most {city} clients on retainer see consistent ranking improvements simply from keeping their technical baseline clean.",
    },
    {
      question: "How quickly do you respond to urgent issues with our {subCity} site?",
      answer: "For retainer clients in {city}, our SLA is 4 hours for critical issues (site down, payment failures) and 24 hours for high-priority bugs. Emergency triage is available outside business hours for clients on our priority support tier — we'll never leave your {subCity} site broken over a weekend.",
    },
    {
      question: "Can you take over maintenance of a site built by another agency in {city}?",
      answer: "Yes — we do this regularly. We begin with a technical audit of the existing codebase, document what we find, and provide an honest handover assessment. If the architecture is sound, we maintain it as-is. If it has fundamental issues, we'll present a clear case for a rebuild.",
    },
    {
      question: "Will you help us add new service pages as our {subCity} business grows?",
      answer: "Absolutely. This is one of the most valuable things we do for long-term {city} clients. We plan the IA and URL structure for future pages from day one so your site architecture scales cleanly — and each new page we add is SEO-structured and performance-tested before it goes live.",
    },
    {
      question: "How do you handle hosting and domain management for {subCity} clients?",
      answer: "We deploy on enterprise-grade infrastructure — Vercel, AWS, or Cloudflare Pages depending on your requirements. We handle DNS configuration, SSL certificates, and CDN setup as part of every launch. Domain management can be included in a maintenance retainer or kept fully under your control.",
    },
  ],
  // Set 10 — technical architecture + developer focus
  [
    {
      question: "What tech stack do you recommend for a high-traffic {subCity} business?",
      answer: "For most {city} business sites, Next.js on Vercel's edge network is our default recommendation — it gives you server-side rendering, automatic image optimization, built-in analytics, and global CDN delivery. For high-transaction e-commerce, we layer in Supabase or PlanetScale depending on data complexity.",
    },
    {
      question: "Can you build a custom API or backend for our {subCity} platform?",
      answer: "Yes. We build REST and GraphQL APIs using Node.js, NestJS, or Go depending on performance requirements. For {city} clients with existing data systems, we handle third-party API integrations — CRMs, ERPs, inventory systems, payment gateways — cleanly documented and test-covered.",
    },
    {
      question: "Will the codebase be structured so our in-house developers in {city} can extend it?",
      answer: "This is a priority for us. We follow strict component architecture, write comprehensive README documentation, and deliver an onboarding guide for every project. Your {subCity} dev team should be able to pick up the codebase and add features within their first sprint — not six months later.",
    },
    {
      question: "How do you handle security for websites handling customer data in {subCity}?",
      answer: "We implement HTTPS enforcement, Content Security Policy headers, input sanitisation, rate limiting on all forms and APIs, and dependency vulnerability scanning via automated CI/CD pipelines. For {city} clients handling payment data, we build to PCI DSS guidelines from the architecture stage.",
    },
    {
      question: "Can you integrate our {subCity} website with our existing CRM or ERP system?",
      answer: "Yes — third-party integrations are a core part of most of our {city} projects. We've integrated with Salesforce, HubSpot, Zoho, SAP, and custom internal systems. Every integration is built with error handling, logging, and webhook retry logic so your data pipeline stays reliable.",
    },
  ],
  // Set 11 — ROI + reporting focus
  [
    {
      question: "How do you measure the ROI of {service} for {subCity} businesses?",
      answer: "We track organic traffic growth, keyword ranking movement, lead form conversions, Core Web Vitals scores, and bounce rate — all tied to the specific {subCity} pages we built. Monthly Looker Studio dashboards make it easy to present these metrics to stakeholders without needing to interpret raw data.",
    },
    {
      question: "How long before we see results from {service} investment in {city}?",
      answer: "Technical improvements — Core Web Vitals, indexing, schema — show results within 4–8 weeks. Organic ranking gains for competitive {subCity} keywords typically build meaningfully over 3–6 months. We set clear, honest expectations at the start and track progress against them monthly.",
    },
    {
      question: "Can you show us examples of ranking improvements you've achieved for {city} clients?",
      answer: "Yes — we share anonymised before/after Search Console data, ranking movement reports, and traffic growth curves for comparable projects. If you want to speak directly with a {city} client who has seen measurable SEO results, we'll arrange that introduction as part of our discovery process.",
    },
    {
      question: "What reporting do {subCity} clients receive after their site launches?",
      answer: "Every {city} client receives a monthly performance report covering organic sessions, top landing pages, lead form conversion rates, Core Web Vitals scores, and ranking movement for target keywords. Reports are delivered in plain English — not raw data dumps — with a commentary on what we're optimising next.",
    },
    {
      question: "How do you attribute leads that come through the {subCity} website?",
      answer: "We set up UTM tracking, Google Analytics 4 event tracking, and form submission attribution from day one so every lead that comes through your {city} platform has a clear source. WhatsApp and phone leads are tracked via click events so you know exactly which pages and campaigns are driving enquiries.",
    },
  ],
  // Set 12 — enterprise apps / LMS / HR / attendance focus
  [
    {
      question: "Can you build a learning management system (LMS) for our {subCity} institute?",
      answer: "Yes — LMS development is one of our core enterprise specialisations. We build platforms with offline-to-online enrollment, video-based course delivery, progress tracking, quiz modules, certificate generation, and comprehensive admin dashboards. Our {city} clients manage thousands of students on platforms we've engineered.",
    },
    {
      question: "Do you build attendance management systems for businesses in {city}?",
      answer: "Absolutely. We've built attendance tracking platforms with biometric integration, geo-fencing, shift management, leave approval workflows, and real-time reporting dashboards. These systems support organisations managing 50 to 5,000+ employees across {subCity} and wider {city} operations.",
    },
    {
      question: "Can you develop an HR portal with employee self-service for our {subCity} team?",
      answer: "Yes — our HR portals include employee self-service modules, leave management with approval chains, document management, payroll integration hooks, birthday and anniversary notifications, and comprehensive admin dashboards. Every module is built with role-based access control so administrators, managers, and employees see exactly what they need.",
    },
    {
      question: "What enterprise applications have you built for {city} businesses?",
      answer: "We've delivered CRM platforms, employee management systems, student information portals, attendance tracking applications, invoice generators, inventory management tools, and custom reporting dashboards. Every application is built with real-time data synchronisation, role-based access, and clean admin interfaces that non-technical team members can operate independently.",
    },
    {
      question: "Can you integrate our {subCity} enterprise platform with existing systems?",
      answer: "Yes — third-party integrations are core to most enterprise projects. We've integrated with WhatsApp Business API, payment gateways (Razorpay, Stripe), HRMS systems, accounting software, biometric devices, and custom internal APIs. Every integration includes error handling, logging, and retry logic for reliable data flow.",
    },
  ],
];

// ─── Meta Description Templates (12 variants) ────────────────────────────────
const META_TEMPLATES = [
  `Expert {service} in {subCity}, {city}. We build fast, SEO-optimized, mobile-first websites for local businesses. Get a free quote from {agencyName} today.`,
  `Looking for {service} in {subCity}? {agencyName} engineers high-performance, conversion-focused digital platforms for {city} businesses. Talk to our senior team.`,
  `Premium {service} agency serving {subCity} and the wider {city} market. Custom-coded, 90+ Lighthouse, locally optimized. Request a free proposal today.`,
  `{subCity} businesses trust {agencyName} for expert {service} that ranks on Google and drives real leads. Fast builds, transparent pricing, zero outsourcing.`,
  `Scale your {subCity} business with custom {service} from {agencyName}. We serve {city}'s most competitive markets with measurable digital results.`,
  `Need {service} in {subCity}, {city}? {agencyName} builds lightning-fast, SEO-driven web platforms. Mobile-first, locally optimized, results-focused.`,
  `{agencyName} delivers enterprise-grade {service} for {subCity} and {city} businesses. No templates. Custom code. 90+ performance scores. Free quote available.`,
  `Your {subCity} brand deserves a world-class digital presence. {agencyName} provides bespoke {service} built for the {city} market. Get started today.`,
  `Struggling to rank in {subCity}? {agencyName} combines technical SEO, conversion design and local market expertise to deliver {service} that wins in {city}.`,
  `{agencyName} is {subCity}'s trusted {service} partner — clean custom code, mobile-first builds, and local SEO baked in from day one. Get your free quote.`,
  `Grow your {subCity} business with {service} from {agencyName}. We specialize in fast, lead-generating platforms for {city}'s most competitive sectors.`,
  `The right {service} partner makes all the difference in {subCity}. {agencyName} brings senior talent, transparent pricing, and proven {city} market results.`,
];

// ─── H1 Variant Pool (10 patterns) ───────────────────────────────────────────
const H1_POOL = [
  `{service} That Puts {subCity} Businesses on the Map`,
  `Why {subCity}'s Fastest-Growing Brands Trust {agencyName} for {service}`,
  `Building {subCity}'s Digital Future — {service} That Performs`,
  `{subCity} Deserves Better {service}. We Deliver It.`,
  `High-Performance {service} for {subCity}'s Most Competitive Markets`,
  `From {subCity} to the Top of Google — Expert {service} That Works`,
  `Serious About Growth? Start With Expert {service} in {subCity}`,
  `{subCity}'s Go-To Agency for Custom {service}`,
  `{agencyName}: Premium {service} Serving {subCity}`,
  `Stop Losing Leads — Expert {service} for {subCity} Brands`,
];

// ─── Meta Title Pool (10 patterns, no brand suffix — added in serviceMetadata) ─
const TITLE_POOL = [
  `Best {service} in {subCity}, {city}`,
  `Expert {service} Agency in {subCity}`,
  `Custom {service} for {subCity} Businesses`,
  `{service} in {subCity} — Ranked, Optimised, Delivered`,
  `Professional {service} in {subCity}, {city}`,
  `{service} Company Serving {subCity}`,
  `Hire {service} Experts in {subCity}`,
  `{subCity} {service} — Built to Convert`,
  `Top-Rated {service} in {subCity}`,
  `{service} Solutions for {subCity} Businesses`,
];

// ─── Massive Combinatorial Theme Pools (15 Themes) ───────────────────────────
// Each theme provides a distinct structural angle. We will select 6-8 of these
// randomly per page, picking a random heading and random paragraph, then shuffle the order.
const THEMES = [
  {
    id: "market_context",
    headings: [
      `The Competitive Reality of the {subCity} Market`,
      `Why {subCity} Demands a Strong Digital Presence`,
      `Navigating the {character} Landscape in {city}`,
    ],
    paragraphs: [
      `{subCity} sits at the centre of one of {city}'s most active {character} corridors. With {localContext} clustered near {landmark}, local search visibility is no longer a luxury — it's a commercial necessity. Businesses here compete not just locally but regionally, and the digital platforms that win are engineered with purpose: fast, authoritative, and structured to intercept high-intent search traffic. {agencyName} brings deep market knowledge of {subCity}'s competitive dynamics and translates that knowledge into {service} solutions that rank, convert, and grow.`,
      `Search for any major service in {subCity} right now and the same businesses appear at the top — consistently. They haven't reached that position by luck. They've invested in digital infrastructure built around their local audience near {landmark}: fast-loading pages, clean structured data, and content aligned with exactly what {city} customers search for. Most {localContext} in {subCity} haven't made those investments yet. That's the gap {agencyName} fills. We understand {subCity}'s commercial rhythm and build {service} platforms calibrated to compete in it.`,
      `The commercial activity along {subCity}'s key corridors near {landmark} generates substantial online search volume — volume that your platform either captures or cedes to a competitor. {agencyName}'s {service} team has spent years mapping the search behaviour patterns of {city} audiences and {subCity} in particular. We know which keywords drive the highest-intent traffic in your area, which competitors are capturing it today, and how to build a platform architecture designed to redirect that traffic toward your business permanently.`,
    ],
  },
  {
    id: "industry_specific",
    headings: [
      `Built for {subCity}'s Fast-Moving {character} Sector`,
      `How We Serve {industry1} and {industry2} Brands`,
      `Tailored {service} for {city}'s Growth Markets`,
    ],
    paragraphs: [
      `{subCity} operates as one of {city}'s key {character} nodes. In an environment dominated by {localContext}, your digital presence needs to signal authority the moment a decision-maker lands on your page. A slow, generic platform tells that visitor everything they need to know — and usually sends them elsewhere. {agencyName} engineers {service} solutions designed for this high-stakes context: structured, credible, fast-loading, and optimised for the longer sales cycles typical of the {subCity} market.`,
      `{subCity} has seen a significant influx of commercial activity, transforming it into one of {city}'s most dynamic {character} zones. The density of {localContext} near {landmark} means competition for digital visibility is intense and growing. In this ecosystem, your website is often the first credibility signal a prospective client evaluates. {agencyName} builds {service} platforms engineered to pass that credibility test on the first load — hand-coded by experienced engineers and optimised for the way your target audience searches in {city}.`,
      `The {industry1} and {industry2} companies that lead their sectors in {city} treat their digital presence as a competitive moat, not a cost centre. A slow, template-built platform doesn't just underperform in search — it undermines the premium positioning they've built in person. {agencyName} is the {service} partner of choice for exactly these clients: businesses near {landmark} that compete at the top of their market and expect their digital presence to reflect that ambition from the very first load.`,
    ],
  },
  {
    id: "technical_foundation",
    headings: [
      `The Technical Foundation Behind Our {service}`,
      `Why Speed and Architecture Matter in {city}`,
      `Engineering Digital Dominance for {subCity} Brands`,
    ],
    paragraphs: [
      `Everything {agencyName} builds is engineered around three non-negotiables: speed, search visibility, and conversion efficiency. Speed means 90+ Lighthouse scores and sub-two-second load times on real devices. Search visibility means semantic HTML, structured JSON-LD schema, Core Web Vitals within Google's thresholds, and localised content strategy built for {subCity}. Conversion efficiency means every CTA and user journey is designed with a specific outcome in mind. When these pillars work together, the result is a {service} platform that consistently outperforms competitors.`,
      `What separates our {service} approach is a commitment to craft that starts at the architecture level. We don't use page builders or recycled component libraries. Every interface we ship is hand-engineered in React or Next.js — lean, maintainable, and genuinely fast on every device your {subCity} customers use. On-page SEO, structured data, and performance optimisation are core deliverables — not optional add-ons. We back everything with weekly sprint reviews so your {city} business always knows exactly where the project stands.`,
      `The technical bar for {service} has risen considerably, and most {subCity} businesses work with platforms built when that bar was much lower. Google now measures Core Web Vitals as a direct ranking signal. Structured data — machine-readable signals telling search engines what your business does and where it operates — is now table stakes. {agencyName} builds to these modern standards as a baseline. Our clients don't need to request performance optimisation or schema markup — they're included by default on every {city} project.`,
    ],
  },
  {
    id: "roi_conversion",
    headings: [
      `Turning {subCity} Traffic Into Measurable Leads`,
      `Our Focus on Conversion and Business ROI`,
      `Measuring What Matters in {city}`,
    ],
    paragraphs: [
      `Every {service} engagement in {city} begins with a clear definition of success. What does the platform need to achieve in 90 days? In 12 months? The answers shape the architecture, content strategy, and SEO foundation. We stay accountable to those outcomes and provide monthly data to prove it: organic traffic trends, Core Web Vitals scores, lead conversion rates, and ranking movement for your target {subCity} keywords. This is a measurable, documented investment in your business growth.`,
      `For {subCity} businesses serious about organic growth, choosing the right {service} partner matters more than budget alone. A well-engineered platform consistently outperforms an over-budgeted one built on the wrong foundation — because the details that drive organic performance live in the codebase: clean semantic HTML, lazy-loaded assets, and properly implemented canonical tags. These are the details {agencyName} builds in by default, and they're why our clients see consistent ranking improvement in the months after launch.`,
      `Your website needs to earn trust within eight seconds of a visitor landing on it. In {subCity}'s discerning market, that trust is built through visual credibility, content authority, and technical performance — all of which {agencyName} engineers into every {service} project. Visually, we work from custom designs that reflect your brand positioning. Content-wise, we structure your service pages around the questions your {subCity} audience is actually asking Google, turning intent into action.`,
    ],
  },
  {
    id: "local_trust",
    headings: [
      `Building Genuine Trust in the {subCity} Community`,
      `Why Local {city} Audiences Choose Our Clients`,
      `Establishing Authority Near {landmark}`,
    ],
    paragraphs: [
      `{subCity} is primarily a community-first area — which means the businesses that thrive here have earned genuine local trust. From {localContext}, businesses benefit enormously when their online presence reflects the same reliability they deliver in person. Near {landmark}, digital expectations are high. {agencyName} builds {service} platforms that meet those expectations: fast on mobile, clear on value, and structured to convert local {city} search traffic into real enquiries.`,
      `The businesses growing fastest in {subCity} right now share a common pattern: they invested in a proper digital foundation before the competition caught up. {city}'s search landscape has reached a maturity where organic positions are hard-won and difficult to displace. If your platform is slow or missing the local signals Google demands, you're actively transferring leads to whoever invested more carefully. {agencyName} helps operators near {landmark} build the kind of infrastructure that commands local respect.`,
      `{agencyName}'s {service} methodology has been refined through hundreds of client engagements across {city} and beyond. The process we apply is consistent: deep discovery, custom strategy, meticulous execution, and rigorous post-launch performance tracking. The {subCity} businesses that get the best results treat the engagement as a genuine partnership — and we reciprocate with full transparency, consistent communication, and results that establish unshakeable local authority.`,
    ],
  },
  {
    id: "why_choose_us",
    headings: [
      `The {agencyName} Difference in {city}`,
      `Why {subCity} Leaders Partner With Us`,
      `Specialist Execution, Not Generalist Promises`,
    ],
    paragraphs: [
      `{agencyName} is not a generalist agency that does a bit of everything. We are a specialist team with deep expertise in {service} and a track record across {city}'s most competitive business sectors. Our senior engineers bring {yearsExperience}+ combined years of experience. We have no offshore teams and no junior developers handling your project unsupervised. Every engagement is led by the same senior people who designed the strategy — from discovery call to post-launch review in {subCity}.`,
      `{subCity} businesses consistently tell us what they didn't get from their previous agency: honesty about timelines, access to senior talent, and post-launch accountability. We've built our entire operation around fixing those three gaps. At {agencyName}, you'll speak to the same senior team member from the first call to the final handover. We give realistic timelines and hit them. And we follow up 30, 60, and 90 days after launch to review performance data together.`,
      `Choosing a {service} partner in {city} is genuinely difficult. There are hundreds of agencies and very few will show you the codebase, the Lighthouse scores, or post-launch organic performance data from comparable projects. We will. When you talk to {agencyName}, we invite you to review actual work — not just a polished portfolio. We walk you through the technical architecture and introduce you to {subCity} clients who can speak to the experience of working with us.`,
    ],
  },
  {
    id: "mobile_first",
    headings: [
      `The Mobile-First Mandate for {subCity}`,
      `Capturing On-the-Go Traffic in {city}`,
      `Why Desktop-Only Thinking Fails`,
    ],
    paragraphs: [
      `Mobile performance is not optional for {subCity} businesses. With over 65% of local searches in {city} originating from smartphones — many near {landmark} — a platform that doesn't load cleanly on a 4G connection loses real revenue every day it stays live. {agencyName}'s {service} process is mobile-first from the start. We test on real devices and enforce performance budgets that ensure your site loads rapidly on the connections your {subCity} customers actually use.`,
      `The way customers in {subCity} make purchasing decisions has changed dramatically. They search, compare, and form opinions about your business within the first ten seconds of visiting your site, often while standing in line or commuting. For {city}'s businesses, a weak digital mobile presence directly translates into lost revenue. {agencyName} engineers {service} solutions that account for these modern, mobile-heavy search behaviours, converting fleeting intent into firm leads.`,
      `We build with enterprise-grade rigor: clean TypeScript codebases, automated performance monitoring, and mobile layouts that maintain pixel-perfect fidelity across every screen size. If your business in {subCity} is serious about growth, your website needs to reflect that seriousness from the very first tap on a smartphone. We ensure that whether a client finds you from {landmark} or across {city}, their mobile experience is flawless.`,
    ],
  },
  {
    id: "long_term_growth",
    headings: [
      `A Foundation Built for Long-Term Growth`,
      `Scaling Your Digital Presence in {city}`,
      `Beyond the Launch: Ongoing Authority`,
    ],
    paragraphs: [
      `The agencies that dominate local search in {city} didn't get there by accident — they invested in {service} infrastructure that compounds over time. Clean code means fewer crawl errors. Fast load times mean lower bounce rates. {agencyName} builds for the long term. Our platforms are designed to earn organic authority over months and years, becoming more valuable as they accumulate content, backlinks, and search signals. Every month a {subCity} client's site stays live, it gets harder for competitors to displace them.`,
      `Every platform we ship is built to be handed over cleanly. You receive full source code ownership, Figma design files, documented component libraries, and CMS training so your team can manage content independently. We don't believe in vendor lock-in. We build for your long-term independence — which is why {subCity} businesses come back to us for their next project rather than being tethered to a platform they don't fully control.`,
      `The {agencyName} difference is most visible after launch — when most agencies have already moved on. We monitor your {subCity} platform's Core Web Vitals weekly for the first 90 days, review Search Console data monthly, and flag indexing issues before they become ranking problems. For clients on a maintenance retainer, we manage all dependency updates and CMS changes proactively. Your platform stays fast, secure, and optimised long after the initial project closes.`,
    ],
  },
  {
    id: "strategy_first",
    headings: [
      `Strategy Before Execution: Our {subCity} Blueprint`,
      `Data-Driven Decisions for {city} Dominance`,
      `Mapping the Competitive Landscape`,
    ],
    paragraphs: [
      `{service} at the quality level {subCity} businesses deserve requires strategy before code. Before we write a single line, we map your target keywords, analyse the competitive landscape in {city}, and identify the content gaps that represent your fastest path to ranking gains. We then build a platform architecture specifically designed to serve those opportunities — service pages and local content structured around real search demand. The result is a search-optimised digital asset that works for your business around the clock.`,
      `Competing for search visibility in {subCity} is about being technically better than whoever is currently ranking above you. {agencyName}'s process starts with a structured competitor audit: we identify what's ranking in {city} for your target keywords, analyse the technical gaps in their platforms, and build a strategy to surpass those gaps. Whether your audience is concentrated near {landmark} or distributed across {city}, every decision we make is grounded in data.`,
      `We are selective about the projects we take on because we've learned that the best outcomes happen when there's genuine alignment between what a client needs and what we do best. Before any {subCity} engagement starts, we have an honest conversation about your goals, timeline, budget, and competitive landscape. If we're the right fit, we'll tell you exactly why, creating a comprehensive roadmap tailored entirely for your specific niche within {city}.`,
    ],
  },
  {
    id: "user_experience",
    headings: [
      `User Experience Designed for {subCity} Buyers`,
      `Reducing Friction in the {city} Customer Journey`,
      `Design That Converts Near {landmark}`,
    ],
    paragraphs: [
      `A website that looks good but frustrates users is a liability. In {subCity}, where {localContext} form the backbone of the economy, your customers expect seamless digital experiences. Whether they are browsing on a train or from an office near {landmark}, every click needs to feel instantaneous. We engineer UX with zero layout shifts, intuitive navigation, and clear conversion pathways that guide users naturally toward making contact.`,
      `Design is more than aesthetics; it's about solving business problems. When we build for {subCity} clients, we map the specific friction points their {city} customers face. Do they need fast access to pricing? Are they looking for trust signals like case studies? We structure the UX to answer these questions immediately, reducing bounce rates and keeping high-intent traffic engaged with your brand rather than returning to Google.`,
      `Accessibility and inclusive design are often overlooked, but they directly impact your bottom line and your SEO in {city}. {agencyName} builds platforms that are fully accessible, ensuring that all {subCity} users can interact with your business regardless of their device or abilities. This commitment to quality code not only improves the user experience but sends strong positive signals to search engines about the structural integrity of your site.`,
    ],
  },
  {
    id: "content_authority",
    headings: [
      `Speaking Directly to the {subCity} Market`,
      `Content That Signals Authority in {city}`,
      `Why Generic Copy Fails Near {landmark}`,
    ],
    paragraphs: [
      `We don't rely on generic filler text. The content on your {service} platform is structured to answer the exact questions {subCity} customers are asking. For {localContext}, this means using the right terminology, addressing specific local pain points, and proving your expertise before the client ever picks up the phone. Search engines reward this level of specificity because it genuinely helps users.`,
      `Your brand voice needs to resonate with the {city} market. A corporate, stiff tone might work for a global enterprise, but a business near {landmark} often benefits from a more direct, relatable approach. We help you calibrate that messaging. By combining high-quality copywriting with strategic keyword placement, we ensure your site reads naturally to humans while satisfying the semantic requirements of modern SEO algorithms.`,
      `Authority is demonstrated, not just claimed. We integrate detailed service descriptions, hyper-local case studies from {subCity}, and structured FAQ schemas that give Google context about your expertise. When a potential client from the {city} area searches for complex {service} queries, your platform won't just appear — it will provide the definitive answer, establishing your business as the undisputed local leader.`,
    ],
  },
  {
    id: "data_security",
    headings: [
      `Enterprise-Grade Security for {subCity} Brands`,
      `Protecting Your {city} Business Data`,
      `Robust Architecture Near {landmark}`,
    ],
    paragraphs: [
      `Security is not an afterthought; it's a foundational requirement. For {localContext} operating in {subCity}, a compromised website can destroy years of hard-earned reputation overnight. We implement strict security protocols from day one: HTTPS enforcement, Content Security Policies, robust input sanitization, and automated vulnerability scanning. You get enterprise-grade protection scaled for the {city} market.`,
      `As data privacy regulations tighten globally and locally, your {city} business cannot afford to run on outdated infrastructure. We build data-compliant {service} platforms that respect user privacy while maintaining powerful analytics capabilities. Whether you're handling sensitive client information near {landmark} or processing local transactions, our codebases are designed to be impenetrable and fully compliant.`,
      `We avoid the vulnerabilities inherent in popular legacy CMS platforms by utilizing modern framework architectures like Next.js. By decoupling the frontend from the backend, we drastically reduce the attack surface of your {subCity} website. This headless approach not only makes your site incredibly fast but makes it fundamentally more secure against the automated attacks that plague traditional {city} business sites.`,
    ],
  },
  {
    id: "scalability",
    headings: [
      `Platforms That Scale With Your {subCity} Business`,
      `Future-Proofing Your {city} Digital Presence`,
      `Built to Grow Near {landmark}`,
    ],
    paragraphs: [
      `Your {subCity} business isn't static, and your digital platform shouldn't be either. We build scalable {service} architectures that can grow from a 10-page local site to a 1,000-page regional powerhouse without requiring a rebuild. Using modular React components and scalable database solutions, we ensure that as your {localContext} expand across {city}, your website effortlessly handles the increased traffic and complexity.`,
      `Adding new features or entering new markets shouldn't break your site. We deliver a comprehensive design system and a meticulously documented codebase. If your {subCity} operations expand to offer new services near {landmark}, your team can quickly roll out new, brand-consistent pages. We eliminate the technical debt that typically slows down {city} businesses when they try to scale their digital operations.`,
      `We deploy on globally distributed edge networks like Vercel, meaning your {subCity} site benefits from infinite, automatic scalability. Whether you have 100 visitors a day from {city} or experience a massive traffic spike from a successful marketing campaign, your site's performance remains perfectly stable. You never have to worry about server upgrades or bandwidth limits throttling your growth.`,
    ],
  },
  {
    id: "local_partnerships",
    headings: [
      `Deeply Embedded in the {city} Ecosystem`,
      `Your Strategic Partner in {subCity}`,
      `Connecting {localContext} Near {landmark}`,
    ],
    paragraphs: [
      `We aren't just a vendor; we consider ourselves active participants in the {subCity} business community. By understanding the intricate relationships between {localContext} and the broader {city} economy, we craft digital strategies that leverage local networks. We know the local events, the key business hubs near {landmark}, and how to position your brand to attract the right local partnerships and high-value clients.`,
      `Success in {subCity} often comes down to who you know and how you're perceived. Our {service} platforms are designed to enhance your professional network within {city}. By integrating seamlessly with local directories, optimizing your Google Business Profile, and creating content that highlights your involvement in the {landmark} area, we turn your website into a powerful networking tool that operates 24/7.`,
      `We bring a global standard of technical excellence and apply it directly to the local nuances of {subCity}. This dual perspective allows us to offer {city} businesses strategies that are both highly advanced and perfectly tailored to their immediate environment. We act as your strategic digital advisors, helping {localContext} navigate the complexities of modern SEO and web technology to dominate their local sector.`,
    ],
  },
  {
    id: "transparent_pricing",
    headings: [
      `Transparent Investment for {subCity} Businesses`,
      `No Hidden Costs, Just Measurable {city} Results`,
      `Clear Scopes for Projects Near {landmark}`,
    ],
    paragraphs: [
      `We believe {subCity} businesses deserve absolute clarity when investing in their digital infrastructure. Our pricing models are completely transparent. Following our initial discovery phase, we provide a detailed, itemized proposal outlining exactly what is included in your {service} project. There are no vague retainers or surprise invoices—just a clear correlation between your investment and the deliverables for your {city} brand.`,
      `A cheap website is often the most expensive mistake a {subCity} business can make. It costs you in lost leads, poor performance, and eventual rebuilds. We offer premium, custom-engineered {service} solutions that deliver a massive return on investment. For {localContext} near {landmark}, our focus is on building an asset that actively generates revenue, making the initial investment highly cost-effective over the long term.`,
      `We structure our engagements to minimize risk for our {city} clients. With clear milestones, regular progress updates, and a defined scope of work, you always know what you are paying for and when it will be delivered. Whether you need a comprehensive platform overhaul or targeted {service} improvements in {subCity}, our transparent approach ensures you maintain full financial predictability throughout the project lifecycle.`,
    ],
  },
  {
    id: "enterprise_solutions",
    headings: [
      `Enterprise Application Development for {subCity} Businesses`,
      `Custom Business Platforms Built in {city}`,
      `Operational Intelligence Systems Near {landmark}`,
    ],
    paragraphs: [
      `{agencyName} specialises in building the enterprise-grade platforms that power modern business operations in {subCity}. We've delivered custom CRM systems, employee management portals, attendance tracking platforms, and HR dashboards for organisations managing hundreds of team members across {city}. Every system is built with role-based access control, real-time reporting, and the integrations your workflows depend on — from WhatsApp alerts to payroll synchronisation.`,
      `The gap between off-the-shelf software and what {subCity} businesses actually need is where {agencyName} operates. We've built attendance management systems with geo-fencing and biometric support, HR portals with leave approval workflows and document management, and sales CRMs with custom pipeline stages and automated lead routing — all for businesses operating in {city}'s most competitive {character} sectors near {landmark}.`,
      `For {localContext} in {subCity}, operational efficiency is directly tied to digital infrastructure. Whether you need an employee self-service portal, a shift management system, or a comprehensive business dashboard that aggregates data from across your {city} operations, {agencyName} engineers platforms that reduce manual work, improve accountability, and scale cleanly as your team grows. We've deployed these systems for organisations managing 50 to 5,000+ employees.`,
    ],
  },
  {
    id: "lms_education",
    headings: [
      `Learning Management Systems for {subCity} Institutions`,
      `Ed-Tech Platforms Engineered in {city}`,
      `Student & Course Management Near {landmark}`,
    ],
    paragraphs: [
      `{agencyName} builds production-grade learning management systems (LMS) designed for institutes, coaching centres, and ed-tech companies in {subCity}. Our platforms support offline-to-online enrollment workflows — where students access course content only after admin-verified fee payment and course assignment. Features include video-based course delivery, progress tracking, certificate generation, quiz modules, batch management, and comprehensive admin dashboards for managing thousands of enrolled students across {city}.`,
      `Student management is more than a database — it's the operational backbone of educational institutions in {subCity}. {agencyName} builds student information portals with attendance tracking, grade management, fee payment workflows, parent communication modules, and performance analytics. For institutes near {landmark} managing multiple batches and courses simultaneously, our platforms eliminate spreadsheet chaos and give administrators real-time visibility into every aspect of their operations.`,
      `The ed-tech sector near {landmark} and across {city} demands platforms that are robust, intuitive, and scalable. {agencyName} has delivered LMS solutions with features including instructor dashboards, student progress analytics, automated assignment submissions, video streaming with progress markers, and certificate auto-generation upon course completion. Every platform we build for {subCity} institutions is mobile-responsive and optimised for students accessing content on smartphones and tablets.`,
    ],
  },
];

// ─── CTA Copy Pool (6 variants) ──────────────────────────────────────────────
const CTA_POOL = [
  `Ready to stop settling for a digital presence that underperforms your business? Book a free 30-minute strategy call with the {agencyName} team. We'll audit your current platform, review your top competitors in {subCity}, and outline a clear roadmap — no pressure, no commitment, just an honest conversation about what it takes to compete in {city}.`,
  `Your {subCity} competitors aren't waiting. Every month with a slow, poorly-optimised platform means leads you won't recover. The gap between where you are and where you need to be is almost always smaller than it looks. Reach out to {agencyName} for a free proposal and see what properly engineered {service} can do for your {city} business.`,
  `The {subCity} businesses dominating local search today made the decision to invest in a proper digital foundation. If you're ready to make that same decision, we're ready to help. Call us, message us on WhatsApp, or fill out the brief below — a senior {agencyName} team member will respond within four business hours with a detailed, itemised proposal.`,
  `A free proposal from {agencyName} costs you nothing and tells you exactly what it would take to build a {service} platform that competes at the top of the {subCity} market. We'll scope the project, benchmark it against what's currently ranking in {city}, and give you a realistic timeline and investment figure — all before you commit to anything.`,
  `Share a brief about your business and your goals for {subCity}, and our senior {service} team will come back with a detailed proposal, technical recommendations, and examples of comparable work we've delivered for {city} businesses in your sector. No generic quotes — every proposal we send is specific to your exact situation and competitive landscape.`,
  `If your current {service} platform isn't generating the leads your {subCity} business deserves, let's change that. {agencyName} will give you an honest, no-obligation audit of your existing digital presence, a breakdown of what's holding it back in {city}'s search results, and a concrete action plan to fix it. Take the first step today.`,
];

// ─── Client Types by area ─────────────────────────────────────────────────────
function getClientTypes(subCity: string, city: string, ctx: typeof CITY_CONTEXT[string] | undefined): string {
  const type = detectAreaType(subCity);
  const ind = ctx?.industries ?? ["local businesses", "service providers"];
  if (type === "tech")        return `SaaS startups, IT service firms, and B2B tech companies in ${subCity}`;
  if (type === "industrial")  return `manufacturing firms, logistics providers, and B2B suppliers in ${subCity}`;
  if (type === "residential") return `clinics, schools, restaurants, and local service providers in ${subCity}`;
  if (type === "luxury")      return `premium retail boutiques, luxury hospitality brands, and high-end professional services in ${subCity}`;
  return `${ind[0]} companies, ${ind[1]} businesses, and professional services in ${subCity}`;
}

// ─── Local Context by area (For detailed paragraph injection) ───────────────
function getLocalContext(subCity: string, city: string, ctx: typeof CITY_CONTEXT[string] | undefined): string {
  const type = detectAreaType(subCity);
  if (type === "tech")        return `startups, IT companies, and SaaS businesses`;
  if (type === "industrial")  return `factories, warehouses, and B2B industrial services`;
  if (type === "residential") return `local clinics, schools, and neighbourhood retail shops`;
  if (type === "luxury")      return `premium showrooms, high-end retail, and luxury services`;
  if (type === "commercial")  return `retail showrooms, corporate offices, and B2B service providers`;
  return `established local businesses and growing service providers`;
}

// ─── Shuffle Array (Deterministic based on hash) ──────────────────────────────
function shuffleArray<T>(array: T[], hash: number): T[] {
  const result = [...array];
  let currentHash = hash;
  for (let i = result.length - 1; i > 0; i--) {
    currentHash = (currentHash * 9301 + 49297) % 233280;
    const j = currentHash % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// ─── Replace placeholders ─────────────────────────────────────────────────────
function fill(template: string, vars: Record<string, string>): string {
  if (!template) return "";
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "");
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function generateFallbackAreaData(city: string, subCity: string, serviceTitle: string) {
  const hash = hashCode(city, subCity, serviceTitle);
  const ctx = CITY_CONTEXT[city];

  const serviceLabel = serviceTitle === "SEO Services"
    ? "SEO services"
    : `${serviceTitle.toLowerCase()} services`;

  const vars: Record<string, string> = {
    city,
    subCity,
    service: serviceTitle.toLowerCase(),
    agencyName: SITE.name,
    industry1: ctx?.industries[hash % ctx.industries.length] ?? "local businesses",
    industry2: ctx?.industries[(hash + 2) % ctx.industries.length] ?? "service providers",
    landmark: ctx?.landmark ?? `${city}'s business district`,
    character: ctx?.character ?? "commercial",
    localContext: getLocalContext(subCity, city, ctx),
    yearsExperience: String(SITE.yearsExperience),
  };

  // ── Intro ─────────────────────────────────────────────────────────────────
  const intro = fill(INTROS[(hash >>> 0) % INTROS.length], vars);

  // ── H2 headings ──────────────────────────────────────────────────────────
  const h2Set = H2_SETS[(hash >>> 0) % H2_SETS.length];
  const h2Options = h2Set.map(t => fill(t, vars));

  // ── H1 variant (independent offset) ──────────────────────────────────────
  const h1Variant = fill(H1_POOL[(hash >>> 3) % H1_POOL.length], vars);

  // ── Meta title (independent offset) ──────────────────────────────────────
  const metaTitle = fill(TITLE_POOL[(hash >>> 6) % TITLE_POOL.length], vars);

  // ── Dynamic Content Blocks (Generating 7 Massive Sections) ────────────────
  // We have 15 themes. We select 7 themes to hit the 1500+ word goal without fluff.
  // 15 choose 7 is 6435 combinations. Factorial(7) ordering is 5040.
  // We pick a random heading (3 options) and paragraph (3 options) for each theme.
  // Total structural variations per page: 6435 * 5040 * (9^7) = Astronomical.
  
  // 1. Select exactly 7 themes deterministically based on hash
  const shuffledThemes = shuffleArray(THEMES, hash);
  const selectedThemes = shuffledThemes.slice(0, 7);
  
  // 2. Map them into content blocks
  const contentBlocks = selectedThemes.map((theme, index) => {
    // Different offset for each block to ensure true randomization of inner content
    const blockHash = ((hash + (index * 997)) >>> 0); 
    const headingTemplate = theme.headings[blockHash % theme.headings.length];
    const paragraphTemplate = theme.paragraphs[(blockHash >>> 2) % theme.paragraphs.length];
    
    return {
      heading: fill(headingTemplate, vars),
      content: fill(paragraphTemplate, vars),
    };
  });

  // ── CTA copy (independent offset) ────────────────────────────────────────
  const ctaCopy = fill(CTA_POOL[(hash >>> 24) % CTA_POOL.length], vars);

  // ── FAQs — service-category-aware routing ────────────────────────────────
  // Determine which FAQ bands are appropriate for this service type
  const svcLower = serviceTitle.toLowerCase();
  let faqCandidateIndices: number[];
  if (/seo|search|rank/.test(svcLower)) {
    faqCandidateIndices = [0, 2, 6, 11]; // timeline/SEO, B2B/lead-gen, performance, ROI
  } else if (/ecommerce|e-commerce|shop/.test(svcLower)) {
    faqCandidateIndices = [3, 7, 6, 9];  // e-commerce, paid ads, performance, maintenance
  } else if (/mobile|app/.test(svcLower)) {
    faqCandidateIndices = [1, 5, 10, 11]; // tech stack, SaaS, technical, ROI
  } else if (/crm|saas|web app|lms|learning|attendance|employee|student|hr portal|enterprise/.test(svcLower)) {
    faqCandidateIndices = [5, 10, 11, 12, 9]; // SaaS, technical, ROI, enterprise, maintenance
  } else if (/social|brand|video|photo|graphic|design|ui|ux/.test(svcLower)) {
    faqCandidateIndices = [8, 4, 7, 0];  // branding, healthcare/trust, marketing, timeline
  } else if (/digital marketing|marketing/.test(svcLower)) {
    faqCandidateIndices = [7, 11, 2, 6]; // marketing, ROI, B2B, performance
  } else {
    faqCandidateIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // website dev — all sets
  }
  const faqSetIndex = faqCandidateIndices[(hash >>> 2) % faqCandidateIndices.length];
  const faqSet = FAQ_SETS[faqSetIndex] ?? FAQ_SETS[0];
  const faqs = faqSet.map(f => ({
    question: fill(f.question, vars),
    answer:   fill(f.answer, vars),
  }));

  // ── Meta description ──────────────────────────────────────────────────────
  const metaTemplate = META_TEMPLATES[(hash >>> 4) % META_TEMPLATES.length];
  let metaDescription = fill(metaTemplate, { ...vars, service: serviceLabel });
  if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + "...";

  return {
    slug:          subCity.toLowerCase().replace(/\s+/g, "-"),
    name:          subCity,
    pinCode:       "",
    intro,
    metaDescription,
    h2Options,
    clientTypes:   getClientTypes(subCity, city, ctx),
    nearbyAreas:   [],
    landmarks:     ctx ? [ctx.landmark] : [],
    coordinates:   { lat: "", lng: "" },
    faqs,
    // Extended fields
    h1Variant,
    metaTitle,
    contentBlocks,
    ctaCopy,
  };
}
