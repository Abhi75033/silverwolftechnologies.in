"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import pAttendance from "@/assets/portfolio-attendance.png";
import pCrm from "@/assets/portfolio-crm.png";
import pHr from "@/assets/portfolio-hr.png";
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
  ExternalLink
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
    category: "AI-Powered Plagiarism Checker",
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
      { type: "image", src: pAttendance.src }
    ],
    title: "Attendance Management System",
    category: "Enterprise HR Solution",
    result: "Geo-fencing, biometric integration, 5,000+ employees managed",
    challenge: "Checking and verifying attendance for 5,000+ employees working across multiple physical sites caused massive manual payroll calculations, errors, and timesheet disputes.",
    solution: "We built a geofenced app that registers employees. It checks their location through GPS and verifies their identity using their phone's face lock or fingerprint. Verified hours are sent instantly to payroll for automatic calculation.",
    whyItMatters: "Eliminates attendance cheating, cuts payroll processing time by 80%, and eliminates manual calculation errors entirely.",
    stats: [
      { label: "Built For", value: "Apex Industries" },
      { label: "Timeline", value: "12 Weeks" },
      { label: "Key Benefit", value: "Fraud Prevention" }
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Biometrics API"],
    liveUrl: "https://attendance-demo.silverwolftechnologies.in"
  },
  {
    media: [
      { type: "image", src: pCrm.src }
    ],
    title: "SalesForge CRM",
    category: "Custom CRM Platform",
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
    category: "Enterprise HR Platform",
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
    case "Attendance Management System":
      return {
        nodes: [
          { label: "Scanner Device", desc: "Biometric Capture", x: 300, y: 40, info: "ZK-Teco terminal | Linux-firmware | Local buffer storage" },
          { label: "Gateway API", desc: "Biometric Receiver", x: 160, y: 130, info: "WebSocket Server | SSL secured | High-throughput ingress" },
          { label: "Geo-Validator", desc: "GPS Checker", x: 440, y: 130, info: "IP Geolocation | Haversine coordinates check | <50ms lookup" },
          { label: "Express Server", desc: "Timesheet Calculator", x: 300, y: 220, info: "Node.js clustered | Overtime engine | Shift-rules matching" },
          { label: "MongoDB", desc: "Log Store", x: 160, y: 310, info: "Replica Set | Index-optimized | 50M+ logs store" },
          { label: "Payroll Engine", desc: "Automatic Sync", x: 440, y: 310, info: "SAP/ERP integration | Biweekly run queue | Email dispatcher" }
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
    case "Attendance Management System":
      return [
        `[${now()}] WEB_SOCKET: Ingress receiver listening on port 8080`,
        `[${now()}] DEVICE: Biometric scanner handshakes successful`,
        `[${now()}] GPS: Haversine distance geofence service loaded`,
        `[${now()}] DB: MongoDB index build finished for timesheets`
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
    "Attendance Management System": [
      `[${now()}] DEVICE: Punch registered for device_id_102 (Employee #472)`,
      `[${now()}] WEB_SOCKET: Ingress payload verified & decrypted`,
      `[${now()}] GPS: Validator returned inside geofence (+12.4m)`,
      `[${now()}] ENGINE: Timesheet attendance record created successfully`,
      `[${now()}] SYNC: Pushing employee #472 punch to ERP scheduler`
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
    case "Attendance Management System":
      return {
        scores: [
          { name: "Performance", score: 95 },
          { name: "Accessibility", score: 96 },
          { name: "Best Practices", score: 95 },
          { name: "SEO Indexing", score: 90 }
        ],
        kpis: [
          "Processes over 5,000 active biometric check-ins daily.",
          "Validated GPS coordinates check-ins in under 120ms.",
          "Reduces manual audit overhead by 80% with automated payroll feeds.",
          "Device webhook reliability exceeding 99.9% uptime."
        ],
        overviewText: "Biometric webhooks are rate-limited and queued via Redis to prevent database locks during peak clock-in times. Coordinates are validated within geofenced coordinates before records are saved."
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

  return (
    <article
      onClick={onClick}
      className="group rounded-2xl overflow-hidden glass hover:border-primary/40 transition-all duration-500 h-full flex flex-col cursor-pointer"
    >
      {/* Media area */}
      <div className="aspect-[16/10] overflow-hidden relative bg-secondary/30">
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
            <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 glass rounded-full px-2 py-0.5">
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
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wider">{item.category}</p>
            <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-gradient-primary font-medium mt-2">{item.result}</p>
      </div>
    </article>
  );
};

/* ---------- Sliding Carousel showing 3 cards at a time ---------- */
export const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProject, setSelectedProject] = useState<WorkItem | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    <section id="portfolio" className="py-24 md:py-32">
      <div className="container">
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
      </div>

      {/* Details Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};
