"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import pDream1 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.12.06 PM.png";
import pDream2 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.12.16 PM.png";
import pDream3 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.12.33 PM.png";
import pDream4 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.12.46 PM.png";
import pDream5 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.13.03 PM.png";
import pDream6 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.13.30 PM.png";
import pDream7 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.13.41 PM.png";
import pDream8 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.13.48 PM.png";
import pDream9 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.14.07 PM.png";
import pDream10 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.14.12 PM.png";
import pDream11 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.14.24 PM.png";
import pDream12 from "@/assets/Dreamdestination/Screenshot 2026-06-14 at 10.14.31 PM.png";
import pCrm from "@/assets/portfolio-crm.png";
import pHr from "@/assets/portfolio-hr.png";
import pLms from "@/assets/portfolio-lms.png";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  X,
  Target,
  Lightbulb,
  Send,
  Maximize2,
  Minimize2,
  Activity,
  Cpu,
  Server,
  CheckCircle2,
  ZoomIn,
  ExternalLink,
  Code2,
  ShoppingBag,
  Smartphone,
  Database,
  Wrench,
  Search,
  TrendingUp,
  Share2,
  Compass,
  Film,
  Image as ImageIcon,
  Paintbrush,
  Palette,
  Grid
} from "lucide-react";
import pPlagzap1 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.09.42 PM.png";
import pPlagzap2 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.09.54 PM.png";
import pPlagzap3 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.10.02 PM.png";
import pPlagzap4 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.10.10 PM.png";
import pPlagzap5 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.10.17 PM.png";
import pPlagzap6 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.10.24 PM.png";
import pPlagzap7 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.11.26 PM.png";
import pPlagzap8 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.11.56 PM.png";
import pPlagzap9 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.12.05 PM.png";
import pPlagzap10 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.12.15 PM.png";
import pPlagzap11 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.12.26 PM.png";
import pPlagzap12 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.12.37 PM.png";
import pPlagzap13 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.12.57 PM.png";
import pPlagzap14 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.13.08 PM.png";
import pPlagzap15 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.13.23 PM.png";
import pPlagzap16 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.13.31 PM.png";
import pPlagzap17 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.13.42 PM.png";
import pPlagzap18 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.00 PM.png";
import pPlagzap19 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.08 PM.png";
import pPlagzap20 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.21 PM.png";
import pPlagzap21 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.32 PM.png";
import pPlagzap22 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.41 PM.png";
import pPlagzap23 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.14.57 PM.png";
import pPlagzap24 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.15.04 PM.png";
import pPlagzap25 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.15.26 PM.png";
import pPlagzap26 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.15.48 PM.png";
import pPlagzap27 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.15.55 PM.png";
import pPlagzap28 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.16.02 PM.png";
import pPlagzap29 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.16.09 PM.png";
import pPlagzap30 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.16.21 PM.png";
import pPlagzap31 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.18.55 PM.png";
import pPlagzap32 from "@/assets/Plagzap/Screenshot 2026-06-14 at 4.25.18 PM.png";

type MediaItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  role?: string;
};

type WorkItem = {
  media: MediaItem[];
  title: string;
  category: string;
  result: string;
  challenge: string;
  solution: string;
  whyItMatters: string;
  stats: { label: string; value: string }[];
  technologies: string[];
  liveUrl?: string;
};

const work: WorkItem[] = [
  {
    media: [
      { type: "image", src: pPlagzap1.src, role: "Dashboard & Document Overview" },
      { type: "image", src: pPlagzap2.src, role: "Interactive Plagiarism Scanner" },
      { type: "image", src: pPlagzap3.src, role: "Detailed Plagiarism Report" },
      { type: "image", src: pPlagzap4.src, role: "AI Content Detector" },
      { type: "image", src: pPlagzap5.src, role: "API Integration & API Keys" },
      { type: "image", src: pPlagzap6.src, role: "Credit History & Credits Manager" },
      { type: "image", src: pPlagzap7.src, role: "User Settings & Profile Editor" },
      { type: "image", src: pPlagzap8.src, role: "Bulk Upload Manager" },
      { type: "image", src: pPlagzap9.src, role: "Deep Scan History Logs" },
      { type: "image", src: pPlagzap10.src, role: "PDF Export Report Settings" },
      { type: "image", src: pPlagzap11.src, role: "Document Sharing Portal" },
      { type: "image", src: pPlagzap12.src, role: "Team Workspace Manager" },
      { type: "image", src: pPlagzap13.src, role: "Similarity Details Side-by-Side" },
      { type: "image", src: pPlagzap14.src, role: "AI Writing Assistant Suggestions" },
      { type: "image", src: pPlagzap15.src, role: "Excluded Reference Links" },
      { type: "image", src: pPlagzap16.src, role: "Dynamic Citation Generator" },
      { type: "image", src: pPlagzap17.src, role: "Multi-Language Scanning Config" },
      { type: "image", src: pPlagzap18.src, role: "Custom White-Label Branding" },
      { type: "image", src: pPlagzap19.src, role: "Organization Billing Logs" },
      { type: "image", src: pPlagzap20.src, role: "System Health & Uptime Dashboard" },
      { type: "image", src: pPlagzap21.src, role: "Developer Webhook Event Stream" },
      { type: "image", src: pPlagzap22.src, role: "API Endpoint Reference Logs" },
      { type: "image", src: pPlagzap23.src, role: "Help Desk & Client Support Tickets" },
      { type: "image", src: pPlagzap24.src, role: "Single Sign-On (SSO) Config" },
      { type: "image", src: pPlagzap25.src, role: "Document Archive Repository" },
      { type: "image", src: pPlagzap26.src, role: "Advanced Filter & Query logs" },
      { type: "image", src: pPlagzap27.src, role: "Sentence Paraphrase Highlight" },
      { type: "image", src: pPlagzap28.src, role: "Interactive Grammar Auditer" },
      { type: "image", src: pPlagzap29.src, role: "Readability Score Analysis" },
      { type: "image", src: pPlagzap30.src, role: "Shared Folders Tree View" },
      { type: "image", src: pPlagzap31.src, role: "Quick System Walk-through" },
      { type: "image", src: pPlagzap32.src, role: "Enterprise Custom Contract Info" }
    ],
    title: "Plagzap",
    category: "SaaS & Web Apps",
    result: "Real-time plagiarism scans, AI detection, side-by-side comparison, API key manager",
    challenge: "Content creators, students, and publishers struggled to verify if text was authentic, free of plagiarism, and not generated by AI models, against millions of online web pages.",
    solution: "We engineered Plagzap, a comprehensive scanning platform. It parses documents, compares sentences across web indexes in real-time, displays duplicate sources side-by-side, flags AI-generated segments, and exposes developer APIs.",
    whyItMatters: "Protects publishing integrity, helps websites avoid search engine ranking penalties, and allows universities to integrate scan workflows via API key modules.",
    stats: [
      { label: "Built For", value: "Plagzap.xyz" },
      { label: "Timeline", value: "6 Weeks" },
      { label: "Key Benefit", value: "99% Scan Accuracy" }
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "OpenAI API"],
    liveUrl: "https://plagzap.xyz"
  },
  {
    media: [
      { type: "image", src: pDream1.src, role: "Dream Destination Home Gallery" },
      { type: "image", src: pDream2.src, role: "Tour Package Explorer" },
      { type: "image", src: pDream3.src, role: "Custom Trip Customizer" },
      { type: "image", src: pDream4.src, role: "Interactive Destination Map" },
      { type: "image", src: pDream5.src, role: "Detailed Travel Itinerary View" },
      { type: "image", src: pDream6.src, role: "Responsive Booking Engine" },
      { type: "image", src: pDream7.src, role: "Premium Accommodations Detail" },
      { type: "image", src: pDream8.src, role: "Secure Checkout Form" },
      { type: "image", src: pDream9.src, role: "Client Dashboard & Bookings Tracker" },
      { type: "image", src: pDream10.src, role: "Travel Agent Partner portal" },
      { type: "image", src: pDream11.src, role: "Itinerary Sharing & Invites" },
      { type: "image", src: pDream12.src, role: "System Administration & Metrics Panel" }
    ],
    title: "Dream Destination",
    category: "Website Development",
    result: "Responsive holiday planning portal, destination galleries, custom booking engine",
    challenge: "Travelers struggled to find curated vacation packages, custom tour builders, and high-fidelity destination details, leading to booking drops and high inquiry friction.",
    solution: "We designed and built a premium travel platform featuring immersive visual guides, a search filter for custom budgets, interactive travel itineraries, and responsive booking checkout flows.",
    whyItMatters: "Improves user trust, increases checkout conversions by 35%, and streamlines travel package management for agency administrators.",
    stats: [
      { label: "Built For", value: "Dream Destination" },
      { label: "Timeline", value: "8 Weeks" },
      { label: "Key Benefit", value: "35% Booking Bump" }
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Stripe API"],
    liveUrl: "https://www.dreamsdestinations.in/"
  },
  {
    media: [
      { type: "image", src: pDream1.src, role: "Boutique Catalog Layout" }
    ],
    title: "Sakhi Fragrance House",
    category: "E-commerce Development",
    result: "Shopify D2C store, 4.2% conversion rate, integrated custom theme",
    challenge: "A luxury perfume brand needed a high-fidelity online boutique with immersive catalog browsing and seamless checkouts.",
    solution: "We developed a custom Shopify theme using Liquid and JavaScript, optimized product pages for fast loading, and integrated automated cart recovery.",
    whyItMatters: "Helped brand launch online and scale to 10k monthly orders within 2 months.",
    stats: [
      { label: "Built For", value: "Sakhi Fragrance" },
      { label: "Timeline", value: "4 Weeks" },
      { label: "Key Benefit", value: "4.2% Conversion" }
    ],
    technologies: ["Shopify", "Liquid", "Tailwind CSS", "JavaScript", "Klaviyo"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pCrm.src }
    ],
    title: "SalesForge CRM",
    category: "CRM Development",
    result: "Kanban pipelines, lead scoring, 40% faster sales cycle",
    challenge: "Sales agents were losing high-paying clients because client details, emails, and follow-ups were scattered across personal notes and inbox threads, making sales cycles slow.",
    solution: "We designed a visual card board (Kanban board) where sales deals are dragged across stages. The system calculates which leads are most likely to buy (lead scoring) and automates follow-up emails so no deal falls through.",
    whyItMatters: "Reduces sales cycles by 40%, keeps client histories in one secure shared hub, and increases closing rates.",
    stats: [
      { label: "Built For", value: "Forge Group" },
      { label: "Timeline", value: "10 Weeks" },
      { label: "Key Benefit", value: "40% Faster Cycle" }
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "PostgreSQL", "D3.js"],
    liveUrl: "https://crm-demo.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pHr.src }
    ],
    title: "HR Portal & Employee Management",
    category: "SaaS & Web Apps",
    result: "Leave workflows, payroll integration, birthday notifications",
    challenge: "Managing leave requests, monthly payroll calculations, employee announcements, and team feedback manually was chaotic and time-consuming for the HR team.",
    solution: "An all-in-one employee dashboard. Staff can request leave in one click, and managers get instant approval prompts. The system auto-calculates salary adjustments, triggers automatic birthday card mailers, and conducts periodic surveys.",
    whyItMatters: "Cuts employee request approvals down from days to hours, automates recurring emails, and boosts team morale.",
    stats: [
      { label: "Built For", value: "Veloce Global" },
      { label: "Timeline", value: "6 Weeks" },
      { label: "Key Benefit", value: "HR Automation" }
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Resend", "Trigger.dev"],
    liveUrl: "https://hr-demo.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pLms.src, role: "FitFlow Mobile App" }
    ],
    title: "FitFlow Mobile App",
    category: "Mobile App Development",
    result: "React Native application, iOS/Android launch, push notifications",
    challenge: "A fitness brand needed a mobile app that works offline, syncs user workouts, and runs push alerts to improve retention.",
    solution: "We built a cross-platform mobile app using React Native and Expo, with local storage sync, custom training routines, and push integrations.",
    whyItMatters: "Increased user retention by 45% and delivered 60fps responsive interfaces.",
    stats: [
      { label: "Built For", value: "FitFlow" },
      { label: "Timeline", value: "12 Weeks" },
      { label: "Key Benefit", value: "45% Retention Boost" }
    ],
    technologies: ["React Native", "Expo", "Node.js", "Firebase", "Redux Toolkit"],
    liveUrl: "https://fitflow-demo.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pCrm.src, role: "Performance Monitor & Telemetry" }
    ],
    title: "CodeRescue System Audit",
    category: "Bug Fixing & Maintenance",
    result: "Stabilized legacy server, resolved 50+ memory leaks, boosted loading speed by 250%",
    challenge: "A logistics platform faced frequent server crashes under high concurrent booking loads and slow database queries.",
    solution: "We conducted a thorough Node.js memory profile, refactored raw SQL queries, and implemented Redis query caching.",
    whyItMatters: "Eliminated server downtime during peak operational hours and reduced API latencies.",
    stats: [
      { label: "Built For", value: "Veloce Logistics" },
      { label: "Timeline", value: "2 Weeks" },
      { label: "Key Benefit", value: "99.99% Uptime" }
    ],
    technologies: ["Node.js", "Express", "Redis", "PostgreSQL", "New Relic"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p1.src, role: "Google Ranking Dashboard" }
    ],
    title: "RankBoost SEO Campaign",
    category: "SEO Services",
    result: "Organic traffic growth from 5k to 50k monthly sessions",
    challenge: "An e-commerce business was struggling with organic visibility and paying high customer acquisition costs.",
    solution: "We conducted a comprehensive technical audit, optimized metadata, resolved indexing errors, and ran targeted content outreach.",
    whyItMatters: "Drove 10x organic growth and reduced paid acquisition spend by 40%.",
    stats: [
      { label: "Built For", value: "Elite Shop" },
      { label: "Timeline", value: "6 Months" },
      { label: "Key Benefit", value: "10x Organic Growth" }
    ],
    technologies: ["Google Analytics", "Ahrefs", "Semrush", "Next.js", "SEO Auditing"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p2.src, role: "PPC Funnel Dashboard" }
    ],
    title: "LeadVelocity PPC Campaign",
    category: "Digital Marketing",
    result: "Meta/Google Ads campaign, 25k leads, 3.4x ROAS",
    challenge: "A B2B SaaS startup struggled to generate high-intent leads cost-effectively through organic channels.",
    solution: "We designed high-converting search ad campaigns on Google and targeted interest/lookalike audiences on Meta.",
    whyItMatters: "Generated over 25,000 marketing qualified leads and delivered a 3.4x return on ad spend.",
    stats: [
      { label: "Built For", value: "SaaSify Inc" },
      { label: "Timeline", value: "8 Weeks" },
      { label: "Key Benefit", value: "3.4x Ad ROI" }
    ],
    technologies: ["Google Ads", "Meta Ads Manager", "Google Tag Manager", "Figma"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p2.src, role: "Social Campaigns Overview" }
    ],
    title: "SocialWave Campaign",
    category: "Social Media Marketing",
    result: "1.2M impressions, 25k leads generated, 3.4x ROI",
    challenge: "A D2C brand wanted to launch a new product line but lacked social media presence and lead generation channels.",
    solution: "We designed an end-to-end campaign including organic video reels, community giveaways, and conversion-optimized Meta Ads.",
    whyItMatters: "Generated over 25,000 marketing qualified leads and delivered a 3.4x return on ad spend.",
    stats: [
      { label: "Built For", value: "Wave Lifestyle" },
      { label: "Timeline", value: "8 Weeks" },
      { label: "Key Benefit", value: "3.4x Ad ROI" }
    ],
    technologies: ["Meta Ads Manager", "Google Ads", "Instagram API", "Figma", "Looker Studio"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p3.src, role: "Brand Guidelines & Visual System" }
    ],
    title: "Apex Visuals Branding",
    category: "Branding & Strategy",
    result: "Full identity system, corporate logo, marketing collateral",
    challenge: "An enterprise consulting firm was rebranding to attract modern startups but had an outdated corporate identity.",
    solution: "We redesigned their complete visual system, created style guidelines, and designed presentation and print templates.",
    whyItMatters: "Positioned the firm as a modern industry leader, resulting in 5 new enterprise deals.",
    stats: [
      { label: "Built For", value: "Apex Consult" },
      { label: "Timeline", value: "4 Weeks" },
      { label: "Key Benefit", value: "Modern Brand Identity" }
    ],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Brand Strategy"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p1.src, role: "Cinematic Video Production Logs" }
    ],
    title: "Cinematic Cut Edits",
    category: "Video Editing",
    result: "YouTube channel scaling to 500k subscribers, 15M+ views",
    challenge: "A popular business creator needed high-retention video editing and motion graphics to boost watch time.",
    solution: "We structured narrative pacing, added premium motion graphics, designed custom subtitles, and enhanced sound designs.",
    whyItMatters: "Boosted average retention rate from 35% to 58%, helping scale the channel to 500k subscribers.",
    stats: [
      { label: "Built For", value: "Creator Hub" },
      { label: "Timeline", value: "Ongoing" },
      { label: "Key Benefit", value: "+23% Watch Time" }
    ],
    technologies: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Design"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p3.src, role: "Product Catalog Retouching" }
    ],
    title: "PixelPerfect Product Retouching",
    category: "Photo Editing",
    result: "Batch-processed 5,000+ catalog images, white-background extraction, color matching",
    challenge: "An online jewelry retailer needed high-volume, pixel-perfect editing for their catalog launch.",
    solution: "We automated background extraction workflows in Photoshop and performed detail retouching for gem reflections.",
    whyItMatters: "Delivered consistent, studio-quality product images, improving catalog aesthetics and buyer trust.",
    stats: [
      { label: "Built For", value: "Glitz & Co" },
      { label: "Timeline", value: "3 Weeks" },
      { label: "Key Benefit", value: "5,000+ Assets Edited" }
    ],
    technologies: ["Adobe Photoshop", "Lightroom", "Bridge", "Batch Scripting"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: p1.src, role: "Integrated Branding Collateral" }
    ],
    title: "Vanguard Marketing Kit",
    category: "Graphic Design",
    result: "Social packs, corporate brochures, event rollups, visual templates",
    challenge: "An education trust needed unified event branding collateral for their annual summit.",
    solution: "We designed custom visual layouts, vector brochures, banners, and editable Canva/Illustrator templates for their team.",
    whyItMatters: "Unified brand presentation across both digital advertisements and physical summit materials.",
    stats: [
      { label: "Built For", value: "Vanguard Trust" },
      { label: "Timeline", value: "10 Days" },
      { label: "Key Benefit", value: "Brand Kit Ready" }
    ],
    technologies: ["Adobe Illustrator", "InDesign", "Figma", "Canva Templates"],
    liveUrl: "https://www.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pLms.src, role: "Patient Portal Dashboard" }
    ],
    title: "MedConnect Telehealth Portal",
    category: "UI/UX Design",
    result: "Patient app wireframes, doctor dashboard UI, interactive Figma prototype",
    challenge: "A healthcare startup needed an intuitive interface for elderly patients to schedule consultations and access prescriptions.",
    solution: "We conducted user research, created large-target accessibility layouts, and designed a clear prescription timeline.",
    whyItMatters: "Improved patient scheduling completion rate by 55% during early beta testing.",
    stats: [
      { label: "Built For", value: "MedConnect" },
      { label: "Timeline", value: "4 Weeks" },
      { label: "Key Benefit", value: "+55% Scheduling" }
    ],
    technologies: ["Figma", "User Research", "Wireframing", "Interactive Prototyping"],
    liveUrl: "https://www.silverwolftechnologies.in"
  }
];

const getArchitectureData = (title: string) => {
  switch (title) {
    case "Plagzap":
      return {
        nodes: [
          { label: "Client Portal", desc: "Next.js Web Interface", x: 300, y: 40, info: "99.95% Availability | 120ms Latency | Edge Cached" },
          { label: "API Gateway", desc: "Scan Requests Dispatcher", x: 300, y: 130, info: "4,200 req/min | Redis Rate Limited | JWT Authenticated" },
          { label: "Text Extractor", desc: "PDF/Docx Parser Engine", x: 160, y: 220, info: "Node.js Serverless | Parsed: 1.2M files | AWS Lambda" },
          { label: "AI Comparator", desc: "Vector Database search", x: 440, y: 220, info: "Pinecone DB | 1536-dim embeddings | OpenAI embeddings" },
          { label: "PostgreSQL DB", desc: "User logs & credits", x: 160, y: 310, info: "Supabase DB | RLS protected | 99.99% durability" },
          { label: "Webhook Handler", desc: "Integrations & API keys", x: 440, y: 310, info: "Event-driven | Resilient queueing | Outgoing webhooks" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 L 300 102" },
          { from: 1, to: 2, path: "M 300 158 C 300 180, 160 180, 160 192" },
          { from: 1, to: 3, path: "M 300 158 C 300 180, 440 180, 440 192" },
          { from: 2, to: 4, path: "M 160 248 L 160 282" },
          { from: 3, to: 5, path: "M 440 248 L 440 282" }
        ]
      };
    case "Dream Destination":
      return {
        nodes: [
          { label: "Client Portal", desc: "Interactive UI & Maps", x: 300, y: 40, info: "Next.js Web Interface | Tailwind CSS styling | Fully responsive layout" },
          { label: "Booking Gateway", desc: "Reservation Handler", x: 160, y: 130, info: "Secure API endpoint | Booking validate | Ticket inventory lock" },
          { label: "Search & Filters", desc: "Destination Finder", x: 440, y: 130, info: "Elasticsearch queries | Budget filter logic | <40ms response" },
          { label: "Express Engine", desc: "Itinerary Constructor", x: 300, y: 220, info: "Custom route generation | Package builder | Stripe webhooks" },
          { label: "PostgreSQL", desc: "Database Storage", x: 160, y: 310, info: "Prisma ORM integration | Relational data | Secure transaction ledger" },
          { label: "Stripe API", desc: "Payment Gateway", x: 440, y: 310, info: "Credit card / UPI validation | Webhook confirmation | Email ticketing" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 102" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 102" },
          { from: 1, to: 3, path: "M 160 158 C 160 180, 300 180, 300 192" },
          { from: 2, to: 3, path: "M 440 158 C 440 180, 300 180, 300 192" },
          { from: 3, to: 4, path: "M 300 248 C 300 270, 160 270, 160 282" },
          { from: 3, to: 5, path: "M 300 248 C 300 270, 440 270, 440 282" }
        ]
      };
    case "Sakhi Fragrance House":
      return {
        nodes: [
          { label: "Shopify Core", desc: "Catalog & PDP", x: 300, y: 40, info: "Liquid templates | CDN cached images | 99.98% uptime" },
          { label: "Checkout Engine", desc: "Secure Payments", x: 160, y: 140, info: "Stripe & Razorpay integrated | 3D Secure v2 | PCI Compliant" },
          { label: "Klaviyo Sync", desc: "Abandoned Cart Flow", x: 440, y: 140, info: "Event-based email alerts | Flow trigger latency <1s" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "SalesForge CRM":
      return {
        nodes: [
          { label: "User Portal", desc: "Shadcn UI Kanban", x: 300, y: 40, info: "Next.js frontend | React Virtualized list | 60 FPS Kanban" },
          { label: "Lead Scorer", desc: "Intent Score Model", x: 160, y: 140, info: "Python Microservice | XGBoost classifier | Intent tracking" },
          { label: "Mail Service", desc: "SMTP Auto-gateway", x: 440, y: 140, info: "SMTP cluster | Open & Click tracking | Bounce handling" },
          { label: "Postgres DB", desc: "Lead & Task Registry", x: 160, y: 260, info: "ACID transactions | Lead history log | Multi-tenant RLS" },
          { label: "D3 Engine", desc: "Pipeline Reports", x: 440, y: 260, info: "Dynamic SVG charts | Velocity reports | Forecast models" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" },
          { from: 1, to: 3, path: "M 160 168 L 160 232" },
          { from: 2, to: 4, path: "M 440 168 L 440 232" }
        ]
      };
    case "HR Portal & Employee Management":
      return {
        nodes: [
          { label: "Admin Portal", desc: "HR Leave Board", x: 300, y: 40, info: "React web interface | SSR optimized | Role-based layout" },
          { label: "DB Worker", desc: "Leave Request Cron", x: 160, y: 140, info: "Trigger.dev jobs | Event queue scheduler | Autoscaling workers" },
          { label: "Mailer Worker", desc: "Celebration Check", x: 440, y: 140, info: "Background queue scheduler | Resend API client | Daily run" },
          { label: "Postgres DB", desc: "Employee Registry", x: 160, y: 260, info: "Supabase database | ACID transactions | 30 active RLS rules" },
          { label: "SMTP Gateway", desc: "Email Sender", x: 440, y: 260, info: "Resend transactional | Template caching | High inbox placement" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" },
          { from: 1, to: 3, path: "M 160 168 L 160 232" },
          { from: 2, to: 4, path: "M 440 168 L 440 232" }
        ]
      };
    case "FitFlow Mobile App":
      return {
        nodes: [
          { label: "Mobile App", desc: "React Native / Expo UI", x: 300, y: 40, info: "Offline Sync | Local Storage (MMKV) | Expo Push Notifications" },
          { label: "App Backend", desc: "Node.js REST API", x: 160, y: 140, info: "Express cluster | JWT Auth | AWS Elastic Beanstalk hosting" },
          { label: "Firebase DB", desc: "Real-time Workouts", x: 440, y: 140, info: "NoSQL DB | Client sync listener | Firestore caching" },
          { label: "Redux Store", desc: "Local Client State", x: 300, y: 260, info: "Slices for workouts & profile | Local persisting middleware" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" },
          { from: 1, to: 3, path: "M 160 168 C 160 190, 300 190, 300 232" },
          { from: 2, to: 3, path: "M 440 168 C 440 190, 300 190, 300 232" }
        ]
      };
    case "CodeRescue System Audit":
      return {
        nodes: [
          { label: "Profiler Agent", desc: "Node.js Memory Monitor", x: 300, y: 40, info: "Garbage collection hooks | Event loop lag tracker | New Relic" },
          { label: "Redis Cache", desc: "Query Optimizer", x: 160, y: 140, info: "Caching SQL results | TTL 3600s | Sub-millisecond reads" },
          { label: "Postgres Cluster", desc: "Refactored Storage", x: 440, y: 140, info: "Optimized indexes | Vacuum cron jobs | Read-replicas setup" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "RankBoost SEO Campaign":
      return {
        nodes: [
          { label: "Client Site", desc: "Optimized Frontend", x: 300, y: 40, info: "Next.js Static Generation | SSR cached | 98 Lighthouse Score" },
          { label: "SEO Audit Engine", desc: "Keyword Tracker & Maps", x: 160, y: 140, info: "Ahrefs API integration | Keyword rank tracking | Competitor gap checks" },
          { label: "Google Console", desc: "Index Status & Sitemaps", x: 440, y: 140, info: "Daily sitemap submissions | Mobile usability checks | Rich snippets" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "LeadVelocity PPC Campaign":
      return {
        nodes: [
          { label: "Ad Targeter", desc: "Meta/Google Ads Manager", x: 300, y: 40, info: "Audience lookalikes | Negative keyword lists | Retargeting pixels" },
          { label: "Tag Manager", desc: "Event Attribution API", x: 160, y: 140, info: "GTM container | Custom tracking triggers | Form fill listener" },
          { label: "Client CRM API", desc: "Lead Routing Worker", x: 440, y: 140, info: "Real-time dispatch | Webhook verification | Duplication filter" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "SocialWave Campaign":
      return {
        nodes: [
          { label: "Meta Ads Portal", desc: "Campaign Manager", x: 300, y: 40, info: "Targeting parameters | Bid cap optimizations | Custom audiences" },
          { label: "Lead Funnel UI", desc: "Conversion Landing Pages", x: 160, y: 140, info: "Figma designed | Next.js routes | Google Tag Manager pixels" },
          { label: "Looker Dashboard", desc: "Analytics Reporter", x: 440, y: 140, info: "Real-time charts | ROI calculator | CAC and LTV metrics logs" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "Apex Visuals Branding":
      return {
        nodes: [
          { label: "Identity Board", desc: "Figma Brand Library", x: 300, y: 40, info: "Dynamic color tokens | Responsive typography styles | Vector logo assets" },
          { label: "Collateral System", desc: "Illustrator Design Kit", x: 160, y: 140, info: "Business cards | Letterheads | Social media templates" },
          { label: "Brand Guidelines", desc: "Identity Playbook", x: 440, y: 140, info: "Usage instructions PDF | Spacing guides | Voice and tone specs" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "Cinematic Cut Edits":
      return {
        nodes: [
          { label: "Video Editor", desc: "Premiere / DaVinci Suite", x: 300, y: 40, info: "4K Timeline editing | Cinematic color grading | Audio sound designs" },
          { label: "Motion Graphics", desc: "After Effects Projects", x: 160, y: 140, info: "Text tracking | Animated titles | Lower thirds and callouts" },
          { label: "Asset Storage", desc: "Cloud Backup", x: 440, y: 140, info: "AWS S3 storage | High-speed cache CDN | raw footage logs" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "PixelPerfect Product Retouching":
      return {
        nodes: [
          { label: "Raw Upload", desc: "AWS S3 Ingestion Bucket", x: 300, y: 40, info: "Presigned upload URLs | Multi-part uploads | Event trigger" },
          { label: "Automation Script", desc: "Photoshop Automation Server", x: 160, y: 140, info: "Background extraction | Auto color matching | Metadata injection" },
          { label: "Delivery CDN", desc: "Web-Optimized Image CDN", x: 440, y: 140, info: "AVIF compression | Fastly edge delivery | Custom crop parameters" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "Vanguard Marketing Kit":
      return {
        nodes: [
          { label: "Figma Library", desc: "Unified Design System", x: 300, y: 40, info: "Vector branding symbols | Responsive layout grids | Typography matrix" },
          { label: "Template Compiler", desc: "Asset Batch Exporter", x: 160, y: 140, info: "Dynamic print and web formats | Custom export scale (2x, 4x)" },
          { label: "Collaboration Portal", desc: "Team Share Portal", x: 440, y: 140, info: "Secure asset links | Brand guideline lookup | Asset cataloging" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    case "MedConnect Telehealth Portal":
      return {
        nodes: [
          { label: "Patient Front", desc: "Accessibility Interface", x: 300, y: 40, info: "WCAG AA compliant | Large text support | Voice guide integration" },
          { label: "Scheduler API", desc: "Calendar Coordinator", x: 160, y: 140, info: "Doctor availability grids | Real-time locking | Socket updates" },
          { label: "Consult Room", desc: "WebRTC Video Cluster", x: 440, y: 140, info: "Encrypted stream channels | HIPAA compliant | Low latency node routing" }
        ],
        connections: [
          { from: 0, to: 1, path: "M 300 68 C 300 90, 160 90, 160 112" },
          { from: 0, to: 2, path: "M 300 68 C 300 90, 440 90, 440 112" }
        ]
      };
    default:
      return { nodes: [], connections: [] };
  }
};

const getInitialLogs = (title: string) => {
  const now = () => new Date().toLocaleTimeString();
  switch (title) {
    case "Plagzap":
      return [
        `[${now()}] SYS_INIT: Edge function boot successful`,
        `[${now()}] GATEWAY: JWT key validation complete`,
        `[${now()}] VECTOR_DB: Connection active - Pinecone client initialized`,
        `[${now()}] DB: Supabase RLS listener established`
      ];
    case "Dream Destination":
      return [
        `[${now()}] PORTAL: Client interface initialized`,
        `[${now()}] SEARCH: Elasticsearch indexes loaded - 150+ destinations`,
        `[${now()}] STRIPE: Webhook verification keys established`,
        `[${now()}] DB: PostgreSQL relational triggers verified`
      ];
    case "Sakhi Fragrance House":
      return [
        `[${now()}] SHOPIFY: Connected to store API endpoint`,
        `[${now()}] THEME: Custom Liquid engine initialized`,
        `[${now()}] ANALYTICS: Klaviyo event attribution tracking active`,
        `[${now()}] STRIPE: Merchant keys handshaked successfully`
      ];
    case "SalesForge CRM":
      return [
        `[${now()}] KANBAN: State board socket connections active`,
        `[${now()}] SCORER: XGBoost Python runner initialized`,
        `[${now()}] SMTP: Mail relay channel verified (Resend API)`,
        `[${now()}] DB: Lead activity trigger active in PostgreSQL`
      ];
    case "HR Portal & Employee Management":
      return [
        `[${now()}] RLS: Database policies parsed matching user sessions`,
        `[${now()}] TRG: Background cron check task loaded (Trigger.dev)`,
        `[${now()}] MAIL: Resend SMTP transactional pipeline connected`,
        `[${now()}] DB: PostgreSQL RLS sync established`
      ];
    case "FitFlow Mobile App":
      return [
        `[${now()}] APP_INIT: Expo container initialized`,
        `[${now()}] STORAGE: MMKV local caching active`,
        `[${now()}] FIREBASE: Secure credentials authenticated`,
        `[${now()}] PUSH: Expo push ticket handler loaded`
      ];
    case "CodeRescue System Audit":
      return [
        `[${now()}] HEAP: Initialized Node.js memory profiling hooks`,
        `[${now()}] REDIS: Cluster client handshake verified`,
        `[${now()}] METRICS: Agent logging event loop lag dynamically`,
        `[${now()}] QUERY: SQL query optimizer parsing execution plans`
      ];
    case "RankBoost SEO Campaign":
      return [
        `[${now()}] SEO_AUDIT: Scraping target keyword list`,
        `[${now()}] AHREFS: Link index sync active`,
        `[${now()}] GSC: Verified sitemap configuration files`,
        `[${now()}] SITE: Lighthouse core web vitals check initialized`
      ];
    case "LeadVelocity PPC Campaign":
      return [
        `[${now()}] PPC: Initialized Meta Pixel and Google conversion hooks`,
        `[${now()}] FUNNEL: Tracking form registration inputs`,
        `[${now()}] CAC: Dynamic acquisition cost metrics online`,
        `[${now()}] CRM: Dispatching validated leads to API gateway`
      ];
    case "SocialWave Campaign":
      return [
        `[${now()}] META: Campaign parameters verified`,
        `[${now()}] FUNNEL: Next.js landing pages routing active`,
        `[${now()}] ANALYTICS: Google Tag Manager pixel listener established`,
        `[${now()}] DB: Click attribution database running`
      ];
    case "Apex Visuals Branding":
      return [
        `[${now()}] BRAND: Figma visual tokens parsed`,
        `[${now()}] BRAND: Vector assets exported to CDN`,
        `[${now()}] GUIDELINES: Playbook metadata compiled`,
        `[${now()}] TEMPLATES: Corporate templates uploaded`
      ];
    case "Cinematic Cut Edits":
      return [
        `[${now()}] EDITOR: Premiere sequence template configured`,
        `[${now()}] MOTIONS: After Effects animated lower thirds compiled`,
        `[${now()}] S3: Raw footage ingestion bucket active`,
        `[${now()}] CDN: Video proxies distribution cached`
      ];
    case "PixelPerfect Product Retouching":
      return [
        `[${now()}] INGESTION: S3 event triggers operational`,
        `[${now()}] PHOTOSHOP: Automation script runtime initialized`,
        `[${now()}] CDN: Purged cache for new catalog releases`,
        `[${now()}] QC: Color profile matching verified (sRGB)`
      ];
    case "Vanguard Marketing Kit":
      return [
        `[${now()}] FIGMA: Design systems sync completed`,
        `[${now()}] TEMPLATES: Exporting asset variations`,
        `[${now()}] COLLAB: Share link permissions updated`,
        `[${now()}] BRAND: Guideline assets cached on edge CDN`
      ];
    case "MedConnect Telehealth Portal":
      return [
        `[${now()}] PATIENT: Accessibility theme compiler online`,
        `[${now()}] SCHEDULER: Calendar slot synchronizer initialized`,
        `[${now()}] WEBRTC: Signal gateway signaling healthy`,
        `[${now()}] HIPAA: Audit trail logger listening`
      ];
    default:
      return [
        `[${now()}] SYSTEM: Service listening...`
      ];
  }
};

const getRandomLog = (title: string) => {
  const now = () => new Date().toLocaleTimeString();
  const logsMap: Record<string, string[]> = {
    "Plagzap": [
      `[${now()}] GATEWAY: POST /api/scan/submit - 200 OK (52ms)`,
      `[${now()}] PARSER: Extracted 1,452 words from research_doc.pdf`,
      `[${now()}] COMP: Indexing sentence vector embeddings...`,
      `[${now()}] VECTOR: Similarity check found matches (88.4%)`,
      `[${now()}] LEDGER: User credits decremented: user_7392`,
      `[${now()}] WEBHOOK: Dispatching plagiarism report to client LMS`
    ],
    "Dream Destination": [
      `[${now()}] QUERY: Searching package 'Maldives Luxury Getaway'`,
      `[${now()}] BOOKING: Reserving ticket slots for transaction_tx_902`,
      `[${now()}] STRIPE: Payment intent created - 200 OK`,
      `[${now()}] ITINERARY: Successfully generated PDF travel planner`,
      `[${now()}] TICKETING: Booking confirmation email dispatched`
    ],
    "Sakhi Fragrance House": [
      `[${now()}] CART: Abandoned cart saved - User: guest_8492`,
      `[${now()}] CHECKOUT: Payment intent verified - 200 OK (₹4,250)`,
      `[${now()}] DISPATCH: Klaviyo automation mail sent successfully`,
      `[${now()}] CATALOG: Rendered PDP for 'Oud Royal' in 24ms`
    ],
    "SalesForge CRM": [
      `[${now()}] KANBAN: Lead 'Apex Tech' card dragged to 'WON' column`,
      `[${now()}] SCORER: Lead intent computed (Score: 94 - High Intent)`,
      `[${now()}] SMTP: Mail delivered to contact@apex.com`,
      `[${now()}] D3_REPORTS: Pipeline charts recalculated in 32ms`,
      `[${now()}] TASK: Auto-created task 'Prepare onboarding contract'`
    ],
    "HR Portal & Employee Management": [
      `[${now()}] PORTAL: Staff requested annual leave (6 days)`,
      `[${now()}] APPROVAL: Request routed to HR manager for approval`,
      `[${now()}] TRG: Triggered reminder worker for pending leave #81`,
      `[${now()}] MAIL: SMTP check-in transactional mail sent`,
      `[${now()}] DB: Updated leave audit ledger in postgres`
    ],
    "FitFlow Mobile App": [
      `[${now()}] STORAGE: MMKV cache hit for session_id`,
      `[${now()}] WORKOUT: Saved daily routine to local store`,
      `[${now()}] SYNC: Pushed 3 pending workouts to backend`,
      `[${now()}] PUSH: Dispatched workout reminder to user token`
    ],
    "CodeRescue System Audit": [
      `[${now()}] REDIS: Cache hit for query 'get_logistics_manifest'`,
      `[${now()}] NODE_SYS: GC successfully freed 412MB heap memory`,
      `[${now()}] PG_SQL: Refactored indexing query executed (4ms)`,
      `[${now()}] EVENT_LOOP: Delay stabilized at 1.2ms (healthy)`
    ],
    "RankBoost SEO Campaign": [
      `[${now()}] SCANNER: Auditing sitemap index nodes`,
      `[${now()}] GOOGLE: Crawled 42 pages without canonical blocks`,
      `[${now()}] SEO: Metadata audit verified for target categories`,
      `[${now()}] RANK: Keyword 'D2C brand store' up to position #3`
    ],
    "LeadVelocity PPC Campaign": [
      `[${now()}] GTM: Tracked conversion action 'form_submit_demo'`,
      `[${now()}] META: Optimized ad bid strategy for target audience`,
      `[${now()}] LEAD: Transmitted lead #4210 to client Salesforce CRM`,
      `[${now()}] ADS: Conversion rate tracking verified at 12.8%`
    ],
    "SocialWave Campaign": [
      `[${now()}] PIXEL: Triggered conversion event - Lead Signup`,
      `[${now()}] ADS: Meta ad set budget optimizer updated`,
      `[${now()}] CAC: Dynamic customer acquisition cost updated: $4.20`,
      `[${now()}] LEAD: Dispatched webhook verification to CRM`
    ],
    "Apex Visuals Branding": [
      `[${now()}] Figma: Syncing design tokens (primary_600)`,
      `[${now()}] SVG: Minifying brand symbol vectors`,
      `[${now()}] ASSETS: Pushing social guidelines to production CDN`,
      `[${now()}] PACK: Corporate presentation slides parsed`
    ],
    "Cinematic Cut Edits": [
      `[${now()}] RENDER: After Effects composition exported`,
      `[${now()}] PIPELINE: Raw proxy video cached successfully`,
      `[${now()}] AUDIO: Audio level auto-limiting at -14 LUFS`,
      `[${now()}] RETENTION: Frame-by-frame pacing logs compiled`
    ],
    "PixelPerfect Product Retouching": [
      `[${now()}] S3: Raw upload notification received for item_592`,
      `[${now()}] SCRIPT: Photoshop action 'Background_Remove' completed`,
      `[${now()}] OPTIMIZE: AVIF compression reduced file size by 78%`,
      `[${now()}] CDN: Refreshed asset images for shopify_catalog`
    ],
    "Vanguard Marketing Kit": [
      `[${now()}] TEMPLATE: Rendered summit banner asset in PDF format`,
      `[${now()}] EXPORT: Asset pack compiled: vanguard_branding.zip`,
      `[${now()}] SYNC: Updated vector layout coordinates in Figma`,
      `[${now()}] STORAGE: Uploaded corporate layout brochure (3.2MB)`
    ],
    "MedConnect Telehealth Portal": [
      `[${now()}] SCHEDULER: Locked doctor slot for consultation #2940`,
      `[${now()}] WEBRTC: Established peer connection for patient room`,
      `[${now()}] HIPAA: Logged transaction record for patient #892`,
      `[${now()}] ACCESSIBILITY: Screen reader aria-labels parsed (Pass)`
    ]
  };
  const list = logsMap[title] || [
    `[${now()}] GATEWAY: Heartbeat ping - 200 OK`
  ];
  return list[Math.floor(Math.random() * list.length)];
};

const getDiagnosticsData = (title: string, name: string) => {
  switch (name) {
    case "Performance":
      return [
        { label: "First Contentful Paint (FCP)", value: "0.3s", status: "pass" },
        { label: "Largest Contentful Paint (LCP)", value: "0.7s", status: "pass" },
        { label: "Total Blocking Time (TBT)", value: "20ms", status: "pass" },
        { label: "Speed Index (SI)", value: "0.6s", status: "pass" }
      ];
    case "Accessibility":
      return [
        { label: "Aria-label attributes completeness", value: "100%", status: "pass" },
        { label: "Background-to-foreground contrast", value: "21:1 (Pass)", status: "pass" },
        { label: "Keyboard interactive focus paths", value: "Verified", status: "pass" },
        { label: "HTML document semantic markup", value: "Valid", status: "pass" }
      ];
    case "Best Practices":
      return [
        { label: "HTTPS / TLS secure handshake", value: "Active", status: "pass" },
        { label: "AVIF/WebP next-gen image check", value: "Passed", status: "pass" },
        { label: "Third-party cross-origin sandbox", value: "Protected", status: "pass" },
        { label: "Javascript/CSS minification check", value: "100% minified", status: "pass" }
      ];
    case "SEO Indexing":
      return [
        { label: "Meta title & tags validation", value: "Optimized", status: "pass" },
        { label: "Responsive viewport configuration", value: "Mobile friendly", status: "pass" },
        { label: "Sitemap XML schema check", value: "Active & verified", status: "pass" },
        { label: "Robots.txt access rules", value: "Detected", status: "pass" }
      ];
    default:
      return [];
  }
};

const getMetricsData = (title: string) => {
  switch (title) {
    case "Plagzap":
      return {
        scores: [
          { name: "Performance", score: 99 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 98 },
          { name: "SEO Indexing", score: 100 }
        ],
        kpis: [
          "99.9% scanning accuracy on plagiarism detection.",
          "<1.2s average scan time for 1,000-word documents.",
          "Automatic file parser supporting PDF, DOCX, and TXT formats.",
          "Scalable API keys infrastructure with custom rate limits."
        ],
        overviewText: "Built with secure token-based authentication for external APIs. Document text parsing runs serverless on edge infrastructure, allowing thousands of documents to be processed in parallel."
      };
    case "Dream Destination":
      return {
        scores: [
          { name: "Performance", score: 98 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 97 },
          { name: "SEO Indexing", score: 99 }
        ],
        kpis: [
          "Optimized media queries result in 35% higher booking conversions.",
          "Elasticsearch results delivered in under 40ms average response.",
          "Seamless PDF itinerary generation directly inside browser viewport.",
          "Webhook event reliability exceeding 99.98% runtime."
        ],
        overviewText: "Built with next-gen image compression and dynamic media CDNs for faster load speeds. Custom booking webhooks route through Stripe confirmation before releasing itineraries to user portals."
      };
    case "Sakhi Fragrance House":
      return {
        scores: [
          { name: "Performance", score: 98 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 97 },
          { name: "SEO Indexing", score: 99 }
        ],
        kpis: [
          "Optimized theme load speeds improving conversions by 4.2%.",
          "Automated cart recovery workflows running under 1s dispatch.",
          "Smooth product page rendering under 30ms TTFB.",
          "Fully integrated domestic and international gateway handshakes."
        ],
        overviewText: "Engineered using Shopify Liquid code optimization and pre-fetching techniques. Built custom templates to match premium branding and maximize visitor checkouts."
      };
    case "SalesForge CRM":
      return {
        scores: [
          { name: "Performance", score: 97 },
          { name: "Accessibility", score: 98 },
          { name: "Best Practices", score: 96 },
          { name: "SEO Indexing", score: 92 }
        ],
        kpis: [
          "Delivered a 40% reduction in average sales cycle duration.",
          "Dynamic Kanban rendering processing thousands of cards at 60 FPS.",
          "Real-time scoring computations update in under 50ms.",
          "Highly optimized D3 SVG generation running with minimal redraws."
        ],
        overviewText: "The SalesForge frontend is heavily optimized using React virtualization for large lead lists. Metrics charts render dynamically based on historical pipeline velocities computed in PostgreSQL."
      };
    case "HR Portal & Employee Management":
      return {
        scores: [
          { name: "Performance", score: 99 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 98 },
          { name: "SEO Indexing", score: 100 }
        ],
        kpis: [
          "Delivers instant email notifications via transactional gateways.",
          "Reliable CRON triggers check employee celebrations daily.",
          "Secure role-based security protecting private payroll structures.",
          "Reduces average leave application approval cycle to 4 hours."
        ],
        overviewText: "Built with secure Postgres Row Level Security (RLS) rules matching user roles. Long-running cron tasks are offloaded to background workers, keeping API response latency under 30ms."
      };
    case "FitFlow Mobile App":
      return {
        scores: [
          { name: "Performance", score: 96 },
          { name: "Accessibility", score: 98 },
          { name: "Best Practices", score: 98 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "Native 60fps scrolling and UI interactions on iOS and Android.",
          "Offline-first capability with robust local caching via MMKV.",
          "Push notification delivery with <200ms latency.",
          "Over 45% increase in user retention rates within 3 months."
        ],
        overviewText: "Built using React Native and Expo. Native bridging and state management are optimized via Redux Toolkit and MMKV local storage to ensure fluid offline usability."
      };
    case "CodeRescue System Audit":
      return {
        scores: [
          { name: "Performance", score: 99 },
          { name: "Accessibility", score: 95 },
          { name: "Best Practices", score: 99 },
          { name: "SEO Indexing", score: 90 }
        ],
        kpis: [
          "Resolved memory leaks to guarantee 99.99% server uptime.",
          "Reduced heavy query latencies from 1200ms to 4ms.",
          "Configured Redis cache layers with automated TTL eviction.",
          "Implemented comprehensive server monitoring metrics."
        ],
        overviewText: "Refactored legacy Node.js route logic, optimized slow-running database indexes in PostgreSQL, and added Redis caching layers to ensure system resilience under spikes."
      };
    case "RankBoost SEO Campaign":
      return {
        scores: [
          { name: "Performance", score: 98 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 97 },
          { name: "SEO Indexing", score: 100 }
        ],
        kpis: [
          "10x organic search traffic growth within 6 months.",
          "98 Lighthouse score for mobile and desktop views.",
          "Resolved all technical crawl blocks and indexation errors.",
          "Reduced paid acquisition dependency by 40%."
        ],
        overviewText: "Focused on optimizing core web vitals, cleaning up header and metadata, establishing clean XML sitemap indexing patterns, and producing high-quality content alignment."
      };
    case "LeadVelocity PPC Campaign":
      return {
        scores: [
          { name: "Performance", score: 97 },
          { name: "Accessibility", score: 98 },
          { name: "Best Practices", score: 96 },
          { name: "SEO Indexing", score: 92 }
        ],
        kpis: [
          "Acquired 25,000 marketing qualified leads.",
          "Achieved a 3.4x return on ad spend (ROAS).",
          "Engineered high-converting landing pages with <0.4s load time.",
          "Robust conversion pixels tracking across Facebook & Google."
        ],
        overviewText: "Structured targeted PPC funnels, designed responsive conversion-optimized landing pages, and implemented accurate server-side pixel tracking to scale lead volume."
      };
    case "SocialWave Campaign":
      return {
        scores: [
          { name: "Performance", score: 97 },
          { name: "Accessibility", score: 99 },
          { name: "Best Practices", score: 96 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "Generated 1.2M impressions across digital platforms.",
          "Acquired 25k marketing qualified leads.",
          "Achieved a 3.4x return on ad spend (ROI).",
          "Built custom high-converting Next.js landing pages."
        ],
        overviewText: "Integrated Meta Pixel and conversion APIs for real-time attribution tracking. Designed custom, responsive landing pages to reduce bounce rates and maximize D2C signups."
      };
    case "Apex Visuals Branding":
      return {
        scores: [
          { name: "Performance", score: 99 },
          { name: "Accessibility", score: 98 },
          { name: "Best Practices", score: 99 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "Delivered a complete, cohesive visual identity system.",
          "Designed over 50 responsive asset components in Figma.",
          "Created standard, interactive brand guidelines.",
          "Helped secure 5 new enterprise consulting deals."
        ],
        overviewText: "Established modular color tokens, standard graphic components, and unified vector asset guidelines to facilitate smooth frontend development and marketing deployment."
      };
    case "Cinematic Cut Edits":
      return {
        scores: [
          { name: "Performance", score: 95 },
          { name: "Accessibility", score: 96 },
          { name: "Best Practices", score: 98 },
          { name: "SEO Indexing", score: 96 }
        ],
        kpis: [
          "Scaled YouTube subscriber base to 500k.",
          "Achieved 15M+ views with premium post-production.",
          "Boosted average retention rates from 35% to 58%.",
          "Delivered dynamic motion designs and high-fidelity audios."
        ],
        overviewText: "Structured raw footage pipelines, optimized media assets via cloud CDN delivery, and developed modular After Effects templates to scale weekly content production."
      };
    case "PixelPerfect Product Retouching":
      return {
        scores: [
          { name: "Performance", score: 99 },
          { name: "Accessibility", score: 98 },
          { name: "Best Practices", score: 99 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "Processed 5,000+ catalog product assets.",
          "High-fidelity image optimization reducing asset sizes by 78%.",
          "Automated script pipeline delivering 24h turnaround times.",
          "Cohesive color calibration matching physical specs."
        ],
        overviewText: "Created automated background extraction script workflows in Photoshop, integrated with cloud ingestion triggers to automate retouching pipelines for large retail catalogs."
      };
    case "Vanguard Marketing Kit":
      return {
        scores: [
          { name: "Performance", score: 98 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 99 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "Delivered print-ready and digital marketing templates.",
          "Unified design guidelines for all brand touchpoints.",
          "Consistent vector assets rendering across high-res displays.",
          "Editable layouts empowering client teams to scale assets."
        ],
        overviewText: "Designed layout files in Figma and Adobe Illustrator, exporting vector assets with correct color spaces (CMYK for print, sRGB for web) for consistent brand presentation."
      };
    case "MedConnect Telehealth Portal":
      return {
        scores: [
          { name: "Performance", score: 96 },
          { name: "Accessibility", score: 100 },
          { name: "Best Practices", score: 98 },
          { name: "SEO Indexing", score: 95 }
        ],
        kpis: [
          "WCAG AA accessible interface for patients of all ages.",
          "Improved scheduling task completion rate by 55%.",
          "WebRTC secure video streams with latency under 150ms.",
          "HIPAA compliant audit logging for all consult bookings."
        ],
        overviewText: "Designed intuitive user flows with high-contrast elements and keyboard navigations. Developed real-time scheduling rules to ensure booking conflict isolation."
      };
    default:
      return { scores: [], kpis: [], overviewText: "" };
  }
};

/* ---------- Image Lightbox Component ---------- */
const ImageLightbox = ({
  media,
  activeIdx,
  setActiveIdx,
  alt,
  onClose
}: {
  media: MediaItem[];
  activeIdx: number;
  setActiveIdx: React.Dispatch<React.SetStateAction<number>>;
  alt: string;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (media.length > 1) {
        if (e.key === "ArrowRight") {
          setActiveIdx((prev) => (prev === media.length - 1 ? 0 : prev + 1));
        }
        if (e.key === "ArrowLeft") {
          setActiveIdx((prev) => (prev === 0 ? media.length - 1 : prev - 1));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, media.length, setActiveIdx]);

  return createPortal(
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/95 cursor-zoom-out p-4 md:p-8"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white z-50 cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="h-5 w-5" />
      </button>

      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIdx((prev) => (prev === 0 ? media.length - 1 : prev - 1));
          }}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white z-50 cursor-pointer"
          aria-label="Previous Image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      <div
        className="relative max-w-full max-h-[85vh] rounded-xl overflow-hidden bg-black/40 border border-white/5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={media[activeIdx].src}
          alt={alt}
          className="max-w-full max-h-[75vh] object-contain"
        />
        {media[activeIdx].role && (
          <div className="px-6 py-4 bg-slate-950/80 border-t border-white/5 backdrop-blur-md text-center">
            <p className="text-xs font-bold text-white tracking-wide uppercase">{media[activeIdx].role}</p>
          </div>
        )}
      </div>

      {media.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveIdx((prev) => (prev === media.length - 1 ? 0 : prev + 1));
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white z-50 cursor-pointer"
          aria-label="Next Image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {media.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50 bg-slate-950/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
          {media.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${idx === activeIdx ? "bg-primary w-5" : "bg-white/30 w-2 hover:bg-white/50"
                }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
};

/* ---------- Details Modal Component ---------- */
const ProjectModal = ({
  project,
  onClose
}: {
  project: WorkItem;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Live Technical Setup States
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  // Live Performance Audit States
  const [auditState, setAuditState] = useState("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanMsg, setScanMsg] = useState("");
  const [animatedScores, setAnimatedScores] = useState<number[]>([0, 0, 0, 0]);
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // Disable body scroll when modal is open
    document.body.style.overflow = "hidden";
    // Close on Escape key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Dynamic server logs effect
  useEffect(() => {
    if (activeTab !== "architecture") return;
    const initialLogs = getInitialLogs(project.title);
    setLogs(initialLogs);
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLogs = [...prev];
        nextLogs.shift();
        const newLog = getRandomLog(project.title);
        nextLogs.push(newLog);
        return nextLogs;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [activeTab, project.title]);

  // PageSpeed Audit Scanner effect
  useEffect(() => {
    if (activeTab !== "metrics") {
      setAuditState("idle");
      setScanProgress(0);
      setScanMsg("");
      setAnimatedScores([0, 0, 0, 0]);
      setSelectedMetric(null);
      return;
    }
    setAuditState("scanning");
    setScanProgress(10);
    setScanMsg("Initializing Lighthouse audit engine...");
    const steps = [
      { delay: 250, progress: 35, msg: "Analyzing Document Object Model (DOM) depth..." },
      { delay: 550, progress: 65, msg: "Measuring Core Web Vitals (TTFB, LCP, CLS)..." },
      { delay: 850, progress: 85, msg: "Verifying keyboard accessibility features & contrast ratios..." },
      { delay: 1150, progress: 100, msg: "Compiling SEO indexing sitemaps & crawl metadata..." }
    ];
    const timers = steps.map((step) =>
      setTimeout(() => {
        setScanProgress(step.progress);
        setScanMsg(step.msg);
      }, step.delay)
    );
    const endTimer = setTimeout(() => {
      setAuditState("done");
      setTimeout(() => {
        const targetScores = getMetricsData(project.title).scores.map((s) => s.score);
        setAnimatedScores(targetScores);
      }, 100);
    }, 1400);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(endTimer);
    };
  }, [activeTab, project.title]);

  const handleInquire = () => {
    onClose();
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        const nameInput = document.querySelector("#contact input[name='name']") as HTMLInputElement;
        if (nameInput) nameInput.focus();
      }
    }, 450);
  };

  if (!mounted) return null;
  const metrics = getMetricsData(project.title);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 md:p-10"
      role="dialog"
      aria-modal="true"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseLine {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -20; }
        }
        .flow-line {
          stroke-dasharray: 6, 4;
          animation: pulseLine 1.2s linear infinite;
        }
        @keyframes scanLaser {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 0.8; }
          100% { top: 0%; opacity: 0.8; }
        }
        .laser-line {
          animation: scanLaser 2s linear infinite;
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .terminal-cursor {
          animation: cursorBlink 0.8s infinite;
        }
      `
        }}
      />
      <div
        className="absolute inset-0 bg-[#020205]/90 backdrop-blur-lg transition-opacity"
        onClick={onClose}
        style={{ animation: "modalFadeIn 0.3s ease-out forwards" }}
      />
      <div
        className={`glass relative overflow-hidden transition-all duration-500 flex flex-col z-10 ${isFullScreen
            ? "w-screen h-screen max-w-none max-h-none rounded-none border-0 m-0 p-0 bg-[#030308]"
            : "w-full h-full sm:h-auto sm:max-w-5xl rounded-none sm:rounded-2xl border-0 sm:border border-white/10 hover:border-primary/20 max-h-full sm:max-h-[92vh] md:max-h-[85vh] bg-[#070710]/95 shadow-elegant"
          }`}
        style={{ animation: "modalSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards" }}
      >
        {/* Glow blobs */}
        <div className="absolute top-[-15%] left-[-15%] w-[450px] h-[450px] bg-primary/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* ======================================================== */}
        {/* ==================== DESKTOP LAYOUT ==================== */}
        {/* ======================================================== */}
        <div className="hidden md:flex flex-col h-full overflow-hidden w-full">
          {/* --- Top Navbar Header --- */}
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 z-20 bg-slate-950/20 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{project.category}</span>
              </div>
              <span className="text-white/20">/</span>
              <span className="text-sm font-bold text-white tracking-tight">{project.title}</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Tabs for desktop */}
              <div className="flex bg-white/[0.02] border border-white/5 rounded-xl p-0.5">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${activeTab === "overview" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"}`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab("architecture")}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${activeTab === "architecture" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"}`}
                >
                  Technical Setup
                </button>
                <button
                  onClick={() => setActiveTab("metrics")}
                  className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg transition-all ${activeTab === "metrics" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-white"}`}
                >
                  Speed & Quality
                </button>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 border-l border-white/5 pl-4">
                <button
                  onClick={() => setIsFullScreen(!isFullScreen)}
                  className="p-2 rounded-lg glass hover:bg-white/5 border border-white/5 transition-all group"
                  aria-label="Toggle Fullscreen"
                  title={isFullScreen ? "Exit Fullscreen" : "View Fullscreen"}
                >
                  {isFullScreen ? (
                    <Minimize2 className="h-3.5 w-3.5 text-silver group-hover:scale-105" />
                  ) : (
                    <Maximize2 className="h-3.5 w-3.5 text-silver group-hover:scale-105" />
                  )}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg glass hover:bg-red-500/10 border border-white/5 hover:border-red-500/20 transition-all text-silver hover:text-red-400 group"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* --- Main Content Area --- */}
          <div className="flex-1 overflow-hidden flex flex-col z-10">
            <div className="flex-1 grid grid-cols-12 overflow-hidden h-full">

              {/* --- LEFT SIDE: Visual Theater (Dynamic based on selected tab) --- */}
              <div className="col-span-7 h-full flex flex-col justify-center border-r border-white/5 bg-[#010103] overflow-y-auto p-6 relative">

                {/* Tab: Overview View */}
                {activeTab === "overview" && (
                  <div className="flex flex-col gap-6 animate-fade-up max-w-2xl mx-auto w-full">

                    {/* Image container with expand toggle */}
                    <div
                      onClick={() => setIsLightboxOpen(true)}
                      className="aspect-[16/10] w-full rounded-xl overflow-hidden relative bg-[#0b0b14] border border-white/5 shadow-2xl group/media cursor-zoom-in"
                      title="Click to view image in full screen"
                    >
                      {/* Blurred background to fill the preview box beautifully without cropping the screen details */}
                      <img
                        src={project.media[activeMediaIndex].src}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110 pointer-events-none"
                      />
                      {/* Contained image */}
                      <img
                        src={project.media[activeMediaIndex].src}
                        alt={project.title}
                        className="w-full h-full object-contain relative z-10 transition-transform duration-700 group-hover/media:scale-102"
                      />

                      {/* Glass Magnifier overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                        <div className="px-4 py-2 rounded-full glass border border-white/10 text-xs text-white font-bold flex items-center gap-2 shadow-lg shadow-black/40 transform scale-95 group-hover/media:scale-100 transition-transform duration-300">
                          <ZoomIn className="h-4 w-4" /> Click to Expand Image
                        </div>
                      </div>

                      {/* Left Button inside Image Container */}
                      {project.media.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMediaIndex((prev) => (prev === 0 ? project.media.length - 1 : prev - 1));
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass hover:bg-primary/20 border border-white/10 hover:border-primary/40 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                      )}

                      {/* Right Button inside Image Container */}
                      {project.media.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveMediaIndex((prev) => (prev === project.media.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full glass hover:bg-primary/20 border border-white/10 hover:border-primary/40 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}

                      {/* Dots indicator inside Image Container */}
                      {project.media.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                          {project.media.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMediaIndex(idx);
                              }}
                              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeMediaIndex ? "bg-primary w-4" : "bg-white/50 w-1.5 hover:bg-white/80"
                                }`}
                              aria-label={`Go to slide ${idx + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {project.stats.map((stat, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex flex-col">
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground mb-1">{stat.label}</span>
                          <span className="text-xs font-semibold text-silver leading-snug">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "architecture" && (() => {
                  const archData = getArchitectureData(project.title);
                  return (
                    <div className="flex flex-col items-center justify-center animate-fade-up max-w-2xl mx-auto w-full gap-5 p-4">
                      <div className="text-center">
                        <h4 className="text-sm font-bold text-gradient-primary uppercase tracking-wider flex items-center justify-center gap-2 mb-1">
                          <Cpu className="h-4 w-4" /> System Data Flow
                        </h4>
                        <p className="text-[11px] text-muted-foreground">This interactive blueprint shows how user actions are processed by components in real-time.</p>
                      </div>

                      <div className="w-full flex flex-col gap-5 p-4 md:p-6 rounded-2xl bg-[#06060c] border border-white/5 shadow-inner select-none">

                        {/* Telemetry Status Banner */}
                        <div className="h-11 w-full flex items-center justify-center px-4 py-2.5 bg-[#020205]/40 border border-white/5 rounded-xl text-center">
                          {hoveredNode !== null ? (
                            <p className="text-[11.5px] font-bold text-primary animate-fade-in flex items-center gap-1.5 justify-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                              {archData.nodes[hoveredNode].label}: <span className="text-white font-medium">{archData.nodes[hoveredNode].info}</span>
                            </p>
                          ) : (
                            <p className="text-[11.5px] text-muted-foreground">Hover over any system component to inspect its real-time telemetry stats.</p>
                          )}
                        </div>

                        {/* Interactive SVG Flowchart Canvas */}
                        <div className="w-full relative aspect-[600/360] bg-[#020205]/60 border border-white/5 rounded-xl overflow-hidden p-2">
                          <svg className="w-full h-full" viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">

                            <defs>
                              <linearGradient id="gflow" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="hsl(var(--primary))" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </linearGradient>
                              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                  <feMergeNode in="blur" />
                                  <feMergeNode in="SourceGraphic" />
                                </feMerge>
                              </filter>
                            </defs>

                            {/* SVG connections flow */}
                            {archData.connections.map((conn, idx) => (
                              <g key={`conn-${idx}`}>
                                <path
                                  d={conn.path}
                                  stroke="rgba(255, 255, 255, 0.05)"
                                  strokeWidth="2"
                                  fill="none"
                                />
                                <path
                                  d={conn.path}
                                  stroke="url(#gflow)"
                                  strokeWidth="1.5"
                                  strokeDasharray="4, 6"
                                  className="flow-line"
                                  fill="none"
                                />
                                <circle r="3.5" fill="hsl(var(--primary))" filter="url(#glow)">
                                  <animateMotion
                                    path={conn.path}
                                    dur={`${2 + (idx % 3) * 0.5}s`}
                                    repeatCount="indefinite"
                                  />
                                </circle>
                              </g>
                            ))}

                            {/* SVG nodes */}
                            {archData.nodes.map((node, idx) => (
                              <foreignObject
                                key={`node-${idx}`}
                                x={node.x - 78}
                                y={node.y - 28}
                                width="156"
                                height="56"
                                className="overflow-visible"
                              >
                                <div
                                  onMouseEnter={() => setHoveredNode(idx)}
                                  onMouseLeave={() => setHoveredNode(null)}
                                  className={`w-full h-full rounded-xl border p-2 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-300 cursor-pointer select-none relative ${hoveredNode === idx
                                      ? "border-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.3)] scale-105"
                                      : "border-white/5 bg-[#070710]/90 hover:border-white/20 hover:bg-slate-900/60"
                                    }`}
                                >
                                  <span className="text-[11px] font-black text-white leading-tight">{node.label}</span>
                                  <span className="text-[9.5px] text-zinc-300 font-semibold mt-0.5 leading-tight">{node.desc}</span>

                                  <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                                  </span>
                                </div>
                              </foreignObject>
                            ))}
                          </svg>
                        </div>

                        {/* Log Console Window */}
                        <div className="flex flex-col gap-2 bg-[#020205] border border-white/5 p-3 rounded-xl font-mono text-[10.5px] text-emerald-300 select-none overflow-hidden h-[110px]">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-1 shrink-0">
                            <span className="text-[9.5px] font-bold text-muted-foreground tracking-wider uppercase flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              SYS_LOG_STREAM: active
                            </span>
                            <span className="text-[8.5px] text-muted-foreground tracking-widest uppercase">NODE_STATUS: HEALTHY</span>
                          </div>
                          <div className="flex-1 flex flex-col gap-1 overflow-hidden transition-all duration-300">
                            {logs.map((log, idx) => (
                              <div key={idx} className="animate-fade-up leading-relaxed text-[11px] truncate text-left">
                                <span className="text-emerald-500/60 mr-1.5">&gt;</span>
                                {log}
                              </div>
                            ))}
                            <div className="text-[11px] text-left">
                              <span className="text-emerald-500/60 mr-1.5">&gt;</span>
                              <span className="inline-block w-1.5 h-3.5 bg-emerald-400 terminal-cursor align-middle" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()}

                {/* Tab: Performance Metrics Score Dials */}
                {activeTab === "metrics" && (
                  <div className="flex flex-col gap-5 animate-fade-up max-w-2xl mx-auto w-full p-4">

                    {auditState === "scanning" ? (
                      /* Mock Lighthouse scan terminal */
                      <div className="w-full bg-[#030307] border border-white/5 p-6 rounded-2xl font-mono text-xs text-emerald-400 shadow-2xl relative min-h-[300px] flex flex-col justify-between overflow-hidden">
                        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80 pointer-events-none laser-line" />

                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                            <span>Google PageSpeed Lighthouse Engine</span>
                            <span className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                              Auditing...
                            </span>
                          </div>

                          <div className="flex flex-col gap-2 mt-4 text-[10.5px] text-left">
                            <div>$ lighthouse --url={project.title.toLowerCase().replace(/\s+/g, '-')}.local --chrome-flags="--headless"</div>
                            <div className="text-emerald-500/60 mt-1">&gt; Connecting to Chrome DevTools Protocol...</div>
                            <div className="text-emerald-500/60">&gt; Navigating to target site...</div>
                            <div className="text-emerald-500/60">&gt; First Contentful Paint: 0.3s</div>

                            {scanProgress >= 35 && (
                              <div className="text-emerald-500/60 animate-fade-in">&gt; Analyzing Document Object Model (DOM) depth...</div>
                            )}
                            {scanProgress >= 65 && (
                              <div className="text-emerald-500/60 animate-fade-in">&gt; Verifying keyboard accessibility features & contrast ratios...</div>
                            )}
                            {scanProgress >= 85 && (
                              <div className="text-emerald-500/60 animate-fade-in">&gt; Compiling SEO indexing sitemaps & crawl metadata...</div>
                            )}
                            {scanProgress === 100 && (
                              <div className="text-emerald-400 font-bold animate-fade-in mt-1">&gt; Status 200: Compilation reports ready.</div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-6">
                          <div className="flex justify-between text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                            <span>{scanMsg}</span>
                            <span>{scanProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                            <div
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Scorecard dials and dropdown diagnostics */
                      <div className="flex flex-col gap-5 animate-fade-in w-full">

                        <div className="text-center">
                          <h4 className="text-sm font-bold text-gradient-primary uppercase tracking-wider flex items-center justify-center gap-2 mb-1">
                            <Activity className="h-4 w-4" /> Speed, Design & Quality Check
                          </h4>
                          <p className="text-[11px] text-muted-foreground">Scores calculated using industry standards. Click on any dial to view diagnostic checks.</p>
                        </div>

                        {/* Audit Score Gauges */}
                        <div className="grid grid-cols-4 gap-4">
                          {metrics.scores.map((stat, idx) => (
                            <button
                              key={idx}
                              onClick={() => setSelectedMetric(selectedMetric === idx ? null : idx)}
                              className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${selectedMetric === idx
                                  ? "border-primary bg-primary/[0.03] shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                                  : "bg-white/[0.01] hover:bg-white/[0.03] border-white/5 hover:border-white/10"
                                }`}
                            >
                              <div className="relative w-16 h-16 mb-2.5 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path
                                    className="text-white/5"
                                    strokeWidth="3.5"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                  <path
                                    className="text-primary transition-all duration-[1200ms]"
                                    strokeWidth="3.5"
                                    strokeDasharray={`${animatedScores[idx]}, 100`}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="none"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                  />
                                </svg>
                                <span className="absolute text-xs font-black text-foreground">{animatedScores[idx]}</span>
                              </div>
                              <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold leading-tight flex items-center gap-1 group-hover:text-white transition-colors">
                                {stat.name}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Expandable Diagnostic Breakdown Card */}
                        {selectedMetric !== null && (
                          <div className="p-4 rounded-xl bg-[#030307]/80 border border-primary/20 backdrop-blur-md animate-fade-up shadow-[0_0_15px_rgba(139,92,246,0.05)] text-left">
                            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                              <h5 className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                Lighthouse Diagnostics: {metrics.scores[selectedMetric].name}
                              </h5>
                              <span className="text-[8px] text-muted-foreground uppercase font-semibold">Target Score: {metrics.scores[selectedMetric].score}/100</span>
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                              {getDiagnosticsData(project.title, metrics.scores[selectedMetric].name).map((diag, i) => (
                                <div key={i} className="flex justify-between items-center py-1 border-b border-white/[0.02] last:border-0 gap-4 text-left">
                                  <span className="text-[10px] text-silver-muted leading-snug">{diag.label}</span>
                                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap shrink-0">
                                    {diag.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Optimization Insights */}
                        <div className="p-4 rounded-xl bg-[#06060c] border border-white/5 flex flex-col gap-2.5 text-left">
                          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-bold flex items-center gap-1.5">
                            <Cpu className="h-3 w-3 text-primary" />
                            Optimization Insights
                          </span>
                          <p className="text-xs text-silver-muted leading-relaxed font-medium">
                            {metrics.overviewText}
                          </p>
                        </div>

                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* --- RIGHT SIDE: Project Text Info / Actions --- */}
              <div className="col-span-5 h-full overflow-y-auto p-6 md:p-8 flex flex-col justify-between bg-[#04040b] relative">

                <div className="flex flex-col gap-6">

                  {/* Title block */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-gradient leading-tight tracking-tight">{project.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Silver Wolf Technologies Case Study</p>
                  </div>

                  {/* Tab 1 Content: Overview Details (Simplified) */}
                  {activeTab === "overview" && (
                    <div className="flex flex-col gap-5 animate-fade-up">
                      <div className="flex gap-3 items-start text-left">
                        <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0 mt-0.5">
                          <Target className="h-4.5 w-4.5 text-red-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-silver mb-1">The Challenge</h4>
                          <p className="text-sm text-silver-muted leading-relaxed">
                            {project.challenge}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 items-start text-left">
                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0 mt-0.5">
                          <Lightbulb className="h-4.5 w-4.5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-silver mb-1">Our Solution</h4>
                          <p className="text-sm text-silver-muted leading-relaxed">
                            {project.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2 Content: Architecture Explainer */}
                  {activeTab === "architecture" && (
                    <div className="flex flex-col gap-4 animate-fade-up">
                      <div className="flex gap-3 items-start text-left">
                        <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0 mt-0.5">
                          <Server className="h-4.5 w-4.5 text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-silver mb-1.5">For IT Stakeholders</h4>
                          <p className="text-sm text-silver-muted leading-relaxed">
                            We designed this project using modular development libraries. Each component communicates securely over standardized pipelines, ensuring high responsiveness and future-proof code quality.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-silver hover:border-primary/30 hover:text-white transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 3 Content: Metrics KPI list */}
                  {activeTab === "metrics" && (
                    <div className="flex flex-col gap-4 animate-fade-up text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground font-semibold">Key Achievements</span>
                      <div className="flex flex-col gap-3">
                        {metrics.kpis.map((kpi, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <p className="text-xs text-silver-muted leading-relaxed">{kpi}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom Outcome & Actions */}
                <div className="flex flex-col gap-4 mt-8 text-left">

                  {/* Results Highlight Box (Now highlights "Why it Matters" in plain English) */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary backdrop-blur-sm">
                    <h4 className="text-[9px] font-bold uppercase tracking-wider text-primary mb-1">Why This Matters (Business Value)</h4>
                    <p className="text-xs font-semibold text-foreground leading-relaxed">
                      {project.whyItMatters}
                    </p>
                  </div>

                  {/* Action CTA Grid */}
                  <div className="flex flex-row gap-3 shrink-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-primary hover:glow-ring text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-indigo-500/20 text-center"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> Visit Live
                      </a>
                    )}
                    <button
                      onClick={handleInquire}
                      className="flex-1 flex items-center justify-center gap-2 text-xs font-bold px-4 py-3.5 rounded-xl bg-gradient-primary hover:glow-ring text-white transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-primary/20"
                    >
                      <Send className="h-3 w-3" /> Inquiry Build
                    </button>
                    <button
                      onClick={onClose}
                      className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all text-silver transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Go Back
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ===================== MOBILE LAYOUT ==================== */}
        {/* ======================================================== */}
        <div className="flex md:hidden flex-col h-full overflow-hidden bg-[#030307] w-full">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-3.5 bg-slate-950/40 backdrop-blur-md shrink-0">
            <div>
              <span className="text-[8px] font-black text-primary uppercase tracking-widest">{project.category}</span>
              <h3 className="text-sm font-extrabold text-white leading-tight mt-0.5">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-silver hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Tab Controller: Pill Switcher Dock */}
          <div className="px-4 py-2 bg-[#05050c]/80 border-b border-white/5 flex gap-1.5 justify-center shrink-0">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex-1 text-[10px] font-black uppercase py-2 text-center rounded-lg transition-all ${activeTab === "overview" ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-muted-foreground hover:text-white bg-white/[0.01]"}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex-1 text-[10px] font-black uppercase py-2 text-center rounded-lg transition-all ${activeTab === "architecture" ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-muted-foreground hover:text-white bg-white/[0.01]"}`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`flex-1 text-[10px] font-black uppercase py-2 text-center rounded-lg transition-all ${activeTab === "metrics" ? "bg-primary text-white shadow-lg shadow-primary/25" : "text-muted-foreground hover:text-white bg-white/[0.01]"}`}
            >
              Speed Check
            </button>
          </div>

          {/* Main Visualizer viewport (Top 45% of content space) */}
          <div className={`shrink-0 border-b border-white/5 bg-[#010102] relative flex items-center justify-center overflow-hidden p-3 transition-all duration-300 ${activeTab === "architecture" ? "h-[340px]" : "h-[210px]"}`}>
            {activeTab === "overview" && (
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="w-full h-full rounded-xl overflow-hidden relative border border-white/10 shadow-2xl cursor-zoom-in"
              >
                <img
                  src={project.media[activeMediaIndex].src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 scale-110 pointer-events-none"
                />
                <img
                  src={project.media[activeMediaIndex].src}
                  alt={project.title}
                  className="w-full h-full object-contain relative z-10"
                />

                {/* Media arrows */}
                {project.media.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaIndex((prev) => (prev === 0 ? project.media.length - 1 : prev - 1));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full glass border border-white/10 text-white"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                )}
                {project.media.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMediaIndex((prev) => (prev === project.media.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full glass border border-white/10 text-white"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}

            {activeTab === "architecture" && (() => {
              const archData = getArchitectureData(project.title);
              return (
                <div className="w-full h-full flex flex-col gap-1.5 overflow-hidden relative">
                  {/* Status banner */}
                  <div className="shrink-0 h-6 w-full flex items-center justify-between px-3 bg-[#020205]/60 border border-white/5 rounded-lg">
                    {hoveredNode !== null ? (
                      <p className="text-[9px] font-bold text-primary truncate">
                        {archData.nodes[hoveredNode].label}: <span className="text-white font-medium">{archData.nodes[hoveredNode].info}</span>
                      </p>
                    ) : (
                      <p className="text-[9px] text-zinc-500">Tap a node to inspect</p>
                    )}
                    <span className="text-[8px] text-primary/70 font-bold shrink-0 ml-2">Live Map</span>
                  </div>
                  {/* Interactive SVG blueprint — fills remaining height */}
                  <div className="flex-1 min-h-0 bg-[#020205]/40 border border-white/5 rounded-xl overflow-hidden flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="50 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="gflow-mob" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="hsl(var(--primary))" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>
                      {/* Connections */}
                      {archData.connections.map((conn, idx) => (
                        <g key={`conn-mob-${idx}`}>
                          <path d={conn.path} stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none" />
                          <path d={conn.path} stroke="url(#gflow-mob)" strokeWidth="2.5" strokeDasharray="8,6" className="flow-line" fill="none" />
                        </g>
                      ))}
                      {/* Nodes */}
                      {archData.nodes.map((node, idx) => (
                        <foreignObject key={`node-mob-${idx}`} x={node.x - 88} y={node.y - 30} width="176" height="60" className="overflow-visible">
                          <div
                            onClick={() => setHoveredNode(hoveredNode === idx ? null : idx)}
                            className={`w-full h-full rounded-xl border-2 flex flex-col items-center justify-center text-center backdrop-blur-md transition-all duration-200 ${
                              hoveredNode === idx
                                ? "border-primary bg-primary/25 shadow-[0_0_16px_rgba(139,92,246,0.5)]"
                                : "border-white/10 bg-[#070714]/95 hover:border-white/20"
                            }`}
                          >
                            <span className="text-[17px] font-black text-white leading-tight px-1">{node.label}</span>
                            <span className="text-[13px] text-zinc-300 font-semibold mt-0.5 leading-tight">{node.desc}</span>
                          </div>
                        </foreignObject>
                      ))}
                    </svg>
                  </div>
                  {/* Console logs */}
                  <div className="shrink-0 h-[36px] bg-[#020205] border border-white/5 px-2 py-1 rounded-lg font-mono text-[8px] text-emerald-300 overflow-hidden flex flex-col justify-end">
                    {logs.slice(-2).map((log, idx) => (
                      <div key={idx} className="truncate text-left leading-relaxed">
                        <span className="text-emerald-500/50 mr-1">&gt;</span>{log}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {activeTab === "metrics" && (
              <div className="w-full h-full flex flex-col gap-2 overflow-hidden">
                {auditState === "scanning" ? (
                  <div className="w-full h-full bg-[#030307] border border-white/5 p-3 rounded-xl font-mono text-[8px] text-emerald-400 flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute left-0 right-0 h-[1.5px] bg-emerald-400 opacity-60 laser-line" />
                    <div className="flex flex-col gap-0.5 text-left truncate">
                      <div>$ lighthouse --url={project.title.toLowerCase().replace(/\s+/g, '-')}.local</div>
                      <div className="text-emerald-500/60">&gt; Navigating to target...</div>
                      <div className="text-emerald-500/60">&gt; DOM checking: OK</div>
                      <div className="text-emerald-400 font-bold">&gt; Status 200: Report ready. ({scanProgress}%)</div>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/10 mt-1">
                      <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${scanProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col gap-2 justify-center">
                    {/* Dials Row */}
                    <div className="grid grid-cols-4 gap-1.5">
                      {metrics.scores.map((stat, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedMetric(selectedMetric === idx ? null : idx)}
                          className={`p-1.5 rounded-lg border transition-all flex flex-col items-center justify-center text-center relative overflow-hidden ${selectedMetric === idx ? "border-primary bg-primary/[0.05] shadow-[0_0_8px_rgba(139,92,246,0.2)]" : "bg-white/[0.02] border-white/5"}`}
                        >
                          <div className="relative w-8 h-8 mb-1 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <path className="text-white/5" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                              <path className="text-primary transition-all duration-[1200ms]" strokeWidth="3.5" strokeDasharray={`${animatedScores[idx]}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <span className="absolute text-[8px] font-black text-foreground">{animatedScores[idx]}</span>
                          </div>
                          <span className="text-[6.5px] font-black uppercase tracking-wider text-muted-foreground truncate w-full">{stat.name.split(" ")[0]}</span>
                        </button>
                      ))}
                    </div>
                    {/* Diagnostics Details block */}
                    <div className="h-[55px] overflow-y-auto bg-[#020205] border border-white/5 p-1.5 rounded-lg text-left text-[7.5px]">
                      {selectedMetric !== null ? (
                        <div className="flex flex-col gap-0.5">
                          <div className="font-black text-primary uppercase border-b border-white/5 pb-0.5 mb-1 flex justify-between">
                            <span>{metrics.scores[selectedMetric].name} Diagnostics</span>
                            <span>Score: {metrics.scores[selectedMetric].score}/100</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                            {getDiagnosticsData(project.title, metrics.scores[selectedMetric].name).slice(0, 2).map((diag, i) => (
                              <div key={i} className="flex justify-between truncate border-b border-white/5 pb-0.5">
                                <span className="text-silver-muted truncate">{diag.label}</span>
                                <span className="text-emerald-400 font-bold ml-1">{diag.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-muted-foreground text-center py-2">Tap any performance dial above to expand its detailed checklist metrics.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Details Scroll Area (Bottom 55%) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">

            {activeTab === "overview" && (
              <div className="space-y-3 animate-fade-up">
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {project.stats.map((stat, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-center text-center">
                      <span className="text-[7.5px] uppercase tracking-wider text-muted-foreground mb-0.5">{stat.label}</span>
                      <span className="text-[10px] font-extrabold text-silver truncate leading-none">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {/* Challenge card */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-red-500/5 to-transparent border border-red-500/10 flex flex-col gap-1 text-left">
                  <span className="text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1">
                    <Target className="h-3 w-3" /> The Challenge
                  </span>
                  <p className="text-[11px] text-silver-muted leading-relaxed font-medium">{project.challenge}</p>
                </div>

                {/* Solution card */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/10 flex flex-col gap-1 text-left">
                  <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" /> Our Solution
                  </span>
                  <p className="text-[11px] text-silver-muted leading-relaxed font-medium">{project.solution}</p>
                </div>
              </div>
            )}

            {activeTab === "architecture" && (
              <div className="space-y-4 animate-fade-up">
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-indigo-500/5 to-transparent border border-indigo-500/10 flex flex-col gap-1 text-left">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                    <Server className="h-3 w-3" /> IT Stakeholders
                  </span>
                  <p className="text-[11px] text-silver-muted leading-relaxed font-medium">
                    We designed this project using modular development libraries. Each component communicates securely over standardized pipelines, ensuring high responsiveness and future-proof code quality.
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="text-[9px] font-bold px-2 py-1 rounded-lg bg-white/[0.02] border border-white/5 text-silver">{tech}</span>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "metrics" && (
              <div className="space-y-3 animate-fade-up text-left">
                <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Key Achievements</span>
                <div className="flex flex-col gap-2.5">
                  {metrics.kpis.map((kpi, idx) => (
                    <div key={idx} className="flex gap-2 items-start p-2.5 rounded-lg bg-white/[0.01] border border-white/5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] text-silver-muted leading-relaxed font-medium">{kpi}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Why This Matters Box */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-2 border-primary text-left">
              <span className="text-[8px] font-black uppercase tracking-widest text-primary">Business Value</span>
              <p className="text-[11px] font-extrabold text-foreground leading-relaxed mt-1">{project.whyItMatters}</p>
            </div>

          </div>

          {/* Sticky Bottom Actions Tray */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5 bg-[#05050b]/90 backdrop-blur-md flex flex-col gap-2 z-20 shrink-0">
            <div className="flex gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 text-[11px] font-black uppercase py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-primary text-white text-center shadow-lg shadow-indigo-500/25"
                >
                  <ExternalLink className="h-3 w-3" /> Visit Live
                </a>
              )}
              <button
                onClick={handleInquire}
                className="flex-1 flex items-center justify-center gap-1 text-[11px] font-black uppercase py-3 rounded-xl bg-gradient-primary text-white shadow-lg shadow-primary/25"
              >
                <Send className="h-3 w-3" /> Inquiry Build
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-[10px] font-bold text-silver"
            >
              Go Back
            </button>
          </div>

        </div>

      </div>

      {/* --- Image Fullscreen Lightbox Overlay --- */}
      {isLightboxOpen && (
        <ImageLightbox
          media={project.media}
          activeIdx={activeMediaIndex}
          setActiveIdx={setActiveMediaIndex}
          alt={project.title}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </div>,
    document.body
  );
};

/* ---------- Category Icon Helper ---------- */
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "All": return Grid;
    case "Website Development": return Code2;
    case "E-commerce Development": return ShoppingBag;
    case "Mobile App Development": return Smartphone;
    case "CRM Development": return Database;
    case "SaaS & Web Apps": return Cpu;
    case "Bug Fixing & Maintenance": return Wrench;
    case "SEO Services": return Search;
    case "Digital Marketing": return TrendingUp;
    case "Social Media Marketing": return Share2;
    case "Branding & Strategy": return Compass;
    case "Video Editing": return Film;
    case "Photo Editing": return ImageIcon;
    case "Graphic Design": return Paintbrush;
    case "UI/UX Design": return Palette;
    default: return Code2;
  }
};

/* ---------- Single Card with multi-media support ---------- */
const PortfolioCard = ({
  item,
  onClick
}: {
  item: WorkItem;
  onClick: () => void;
}) => {
  const [activeMedia, setActiveMedia] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = item.media[activeMedia];

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Extract key benefit KPI for floating badge
  const mainMetric = item.stats && item.stats.length > 0 
    ? (item.stats.find(s => s.label === "Key Benefit")?.value || item.stats[item.stats.length - 1].value) 
    : null;

  return (
    <article
      onClick={onClick}
      className="group rounded-2xl overflow-hidden glass border border-white/5 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(139,92,246,0.15)] transition-all duration-500 h-full flex flex-col cursor-pointer relative"
    >
      {/* Media area */}
      <div className="aspect-[16/10] overflow-hidden relative bg-secondary/30">
        
        {/* Floating KPI Metric Badge */}
        {mainMetric && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 border border-primary/30 backdrop-blur-md shadow-lg shadow-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[9px] font-black text-white tracking-widest uppercase">{mainMetric}</span>
          </div>
        )}

        {/* Hover Laser Scan & Overlay button */}
        <div className="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
          <div className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center gap-1.5">
            <span>Analyze Build</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        {current.type === "image" ? (
          <img
            src={current.src}
            alt={`${item.title} — ${item.category}`}
            width={800}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <>
            <video
              ref={videoRef}
              src={current.src}
              poster={current.poster}
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-10"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <div className="w-11 h-11 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm hover:scale-110 transition-transform">
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-primary-foreground" />
                ) : (
                  <Play className="h-4 w-4 text-primary-foreground ml-0.5" />
                )}
              </div>
            </button>
            {/* Live Demo badge */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 glass rounded-full px-2.5 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[9px] font-medium uppercase tracking-wider">Live Demo</span>
            </div>
          </>
        )}

        {/* Media dots — only when card has multiple images/videos */}
        {item.media.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {item.media.map((m, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActiveMedia(idx); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeMedia
                    ? "bg-primary w-4"
                    : "bg-white/50 hover:bg-white/80 w-1.5"
                  }`}
                aria-label={`Show ${m.type} ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-zinc-950/20">
        <div className="space-y-1">
          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{item.category}</p>
          <h3 className="text-base font-extrabold tracking-tight text-white leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed pt-1.5 line-clamp-2">{item.result}</p>
        </div>
        
        {/* Integrated Tech Badges directly on card footer */}
        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-white/5">
          {item.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-[9px] font-bold px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-zinc-400">
              {tech}
            </span>
          ))}
          {item.technologies.length > 3 && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">
              +{item.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

/* ---------- Sliding Carousel showing 3 cards at a time ---------- */
export const Portfolio = ({ layout = "carousel" }: { layout?: "carousel" | "grid" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Website Development",
    "E-commerce Development",
    "Mobile App Development",
    "CRM Development",
    "SaaS & Web Apps",
    "Bug Fixing & Maintenance",
    "SEO Services",
    "Digital Marketing",
    "Social Media Marketing",
    "Branding & Strategy",
    "Video Editing",
    "Photo Editing",
    "Graphic Design",
    "UI/UX Design"
  ];

  const filteredWork = work.filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  // How many cards visible at once per breakpoint
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCount, setVisibleCount] = useState(3);
  const maxIndex = Math.max(0, work.length - visibleCount);

  useEffect(() => {
    setVisibleCount(getVisibleCount());
    const onResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Clamp activeIndex to maxIndex when visibleCount/maxIndex changes (e.g. on window resize)
  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
    }
  }, [maxIndex, activeIndex]);

  const goNext = useCallback(() => {
    setActiveIndex((p) => (p >= maxIndex ? 0 : p + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setActiveIndex((p) => (p <= 0 ? maxIndex : p - 1));
  }, [maxIndex]);

  const pauseTemporarily = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 6000);
  };

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(goNext, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, goNext]);

  const slidePercent = (activeIndex / work.length) * 100;

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="container">
        {layout === "grid" ? (
          <>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-14 max-w-6xl mx-auto">
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat);
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex items-center gap-2 px-4.5 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 border ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_20px_rgba(139,92,246,0.3)] scale-[1.03]"
                        : "bg-white/[0.03] text-muted-foreground border-white/5 hover:border-white/20 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {isActive && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                      </span>
                    )}
                    <Icon className={`h-3.5 w-3.5 ${isActive ? "text-primary-foreground" : "text-zinc-500"}`} />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* Filtered Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWork.map((w) => (
                <div key={w.title} className="group relative">
                  <PortfolioCard item={w} onClick={() => setSelectedProject(w)} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                  Recent <span className="text-gradient">launches</span>
                </h2>
                <p className="text-muted-foreground max-w-md hidden md:block text-sm">
                  A small slice from 200+ projects shipped — websites, apps, CRMs and full digital ecosystems.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => { goPrev(); pauseTemporarily(); }}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => { goNext(); pauseTemporarily(); }}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Sliding track */}
            <div
              className="overflow-hidden rounded-2xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                className="flex transition-transform duration-700"
                style={{
                  transform: `translateX(-${slidePercent}%)`,
                  width: `${(work.length / visibleCount) * 100}%`,
                  transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                {work.map((w) => (
                  <div
                    key={w.title}
                    className="px-2 first:pl-0 last:pr-0"
                    style={{ width: `${100 / work.length}%` }}
                  >
                    <PortfolioCard item={w} onClick={() => setSelectedProject(w)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveIndex(idx); pauseTemporarily(); }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === activeIndex
                      ? "w-8 bg-primary"
                      : "w-3 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-12">
              <Link
                href="/portfolio"
                className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-300 text-white font-semibold text-sm shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(var(--primary),0.15)] backdrop-blur-md"
              >
                <span>View All Projects</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-white transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};
