"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Globe,
  Rocket,
  TrendingUp,
  Mail,
  MessageCircle,
  Sparkles,
  Layers,
  Search
} from "lucide-react";
import { SITE } from "@/data/site";
import Breadcrumb from "@/components/Breadcrumb";

export type HiringType = "Internship" | "Full-Time" | "Part-Time" | "Trainer";

export type Job = {
  id: number;
  category: "Development" | "AI, Data & Cloud" | "Design & Creative" | "Business & Skills";
  title: string;
  location: string;
  hiringTypes: HiringType[];
  duration: string;
  stack: string[];
  description: string;
};

const jobs: Job[] = [
  // ─── DEVELOPMENT (8) ────────────────────────────────
  {
    id: 1,
    category: "Development",
    title: "Full Stack Web Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "16 weeks",
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "TypeScript", "Tailwind CSS", "Git"],
    description: "Build production-grade web applications end-to-end — from responsive React frontends to Node.js APIs with PostgreSQL databases, deployed on AWS. Ideal for engineers who want to own the full delivery pipeline."
  },
  {
    id: 2,
    category: "Development",
    title: "Full Stack Python Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "16 weeks",
    stack: ["Python", "Django", "Django REST Framework", "React", "PostgreSQL"],
    description: "Engineer scalable backends with Django and Django REST Framework, paired with React frontends and PostgreSQL databases. Perfect for Pythonistas ready to build enterprise-grade applications."
  },
  {
    id: 3,
    category: "Development",
    title: "Full Stack Java Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "16 weeks",
    stack: ["Java", "Spring Boot", "Hibernate", "Angular", "MySQL"],
    description: "Architect enterprise Java applications using Spring Boot and Hibernate with Angular frontends. Build robust, scalable systems with industry-standard patterns and MySQL databases."
  },
  {
    id: 4,
    category: "Development",
    title: "MERN Stack Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Redux"],
    description: "Master the MERN stack — build dynamic, real-time web applications with MongoDB, Express, React, and Node.js. Manage complex state with Redux and ship production-ready SPAs."
  },
  {
    id: 5,
    category: "Development",
    title: "MEAN Stack Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["MongoDB", "Express.js", "Angular", "Node.js", "TypeScript"],
    description: "Develop full-stack TypeScript applications using the MEAN stack. Build enterprise-grade Angular SPAs backed by Express APIs and MongoDB, all in strongly-typed TypeScript."
  },
  {
    id: 6,
    category: "Development",
    title: "Java Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["Core Java", "Spring Framework", "Spring Boot", "JDBC", "Maven"],
    description: "Deep-dive into Core Java, Spring Framework, and Spring Boot to build backend services, REST APIs, and microservices. Handle database access with JDBC and manage builds with Maven."
  },
  {
    id: 7,
    category: "Development",
    title: "Python Development",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Python", "Flask", "FastAPI", "SQLAlchemy", "Pandas"],
    description: "Build lightweight, high-performance APIs with Flask and FastAPI. Work with SQLAlchemy ORM for database operations and Pandas for data processing in Python-first workflows."
  },
  {
    id: 8,
    category: "Development",
    title: "Backend Engineering",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["Node.js", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    description: "Design and build scalable backend systems with Node.js and FastAPI. Implement caching with Redis, containerize services with Docker, and manage PostgreSQL databases at scale."
  },

  // ─── AI, DATA & CLOUD (7) ──────────────────────────
  {
    id: 9,
    category: "AI, Data & Cloud",
    title: "Generative AI & AI Engineering",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["Python", "LangChain", "OpenAI", "RAG", "Vector Databases"],
    description: "Build production AI applications with LangChain, OpenAI APIs, and Retrieval-Augmented Generation. Work with vector databases to create intelligent, context-aware AI systems."
  },
  {
    id: 10,
    category: "AI, Data & Cloud",
    title: "AI Automation",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "10 weeks",
    stack: ["n8n", "Zapier", "Python", "Make.com", "AI APIs"],
    description: "Automate business workflows using n8n, Zapier, Make.com, and Python scripts integrated with AI APIs. Build intelligent automation pipelines that save hundreds of hours."
  },
  {
    id: 11,
    category: "AI, Data & Cloud",
    title: "Data Science & Machine Learning",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "16 weeks",
    stack: ["Python", "scikit-learn", "TensorFlow", "Pandas", "NumPy"],
    description: "Explore the full data science pipeline — from data wrangling with Pandas and NumPy to building ML models with scikit-learn and deep learning with TensorFlow."
  },
  {
    id: 12,
    category: "AI, Data & Cloud",
    title: "Data Analytics",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Advanced Excel", "SQL", "Python (Pandas)", "Tableau", "Power BI"],
    description: "Transform raw data into actionable business insights. Master Advanced Excel, SQL querying, Python data analysis, and build stunning dashboards with Tableau and Power BI."
  },
  {
    id: 13,
    category: "AI, Data & Cloud",
    title: "Cloud Computing & AWS",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["AWS EC2", "S3", "Lambda", "RDS", "VPC"],
    description: "Design, deploy, and manage cloud infrastructure on AWS. Work with EC2, S3, Lambda serverless functions, RDS databases, and VPC networking for production-grade cloud architectures."
  },
  {
    id: 14,
    category: "AI, Data & Cloud",
    title: "DevOps & Deployment",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Linux", "AWS", "Docker", "Kubernetes", "Jenkins"],
    description: "Build CI/CD pipelines, containerize applications with Docker, orchestrate with Kubernetes, and automate deployments with Jenkins on AWS and Linux infrastructure."
  },
  {
    id: 15,
    category: "AI, Data & Cloud",
    title: "Software Testing (Manual & Automation)",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "14 weeks",
    stack: ["Selenium", "Cypress", "Playwright", "Postman", "JMeter"],
    description: "Master both manual and automated testing. Write test suites with Selenium, Cypress, and Playwright, perform API testing with Postman, and load testing with JMeter."
  },

  // ─── DESIGN & CREATIVE (5) ─────────────────────────
  {
    id: 16,
    category: "Design & Creative",
    title: "UI/UX Design",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Figma", "Framer", "Prototyping", "Design Systems", "Maze"],
    description: "Design research-driven user interfaces and experiences. Build prototypes in Figma and Framer, create scalable design systems, and validate designs with usability testing using Maze."
  },
  {
    id: 17,
    category: "Design & Creative",
    title: "Graphic Designing",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "10 weeks",
    stack: ["Adobe Photoshop", "Adobe Illustrator", "Adobe XD", "Canva", "Figma"],
    description: "Create stunning visual assets — logos, social media creatives, branding collateral, and marketing materials using industry-standard tools like Photoshop, Illustrator, and Figma."
  },
  {
    id: 18,
    category: "Design & Creative",
    title: "Video Editing & Production",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "10 weeks",
    stack: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "CapCut", "Audacity"],
    description: "Edit cinematic YouTube videos, scroll-stopping reels, and professional ad films. Master color grading, motion graphics, sound design, and platform-native content production."
  },
  {
    id: 19,
    category: "Design & Creative",
    title: "Photo Editing & Photography",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "8 weeks",
    stack: ["Adobe Photoshop", "Lightroom", "Camera RAW", "Compositing", "Retouching"],
    description: "Master professional photo editing, retouching, and compositing techniques. Work with Photoshop and Lightroom for e-commerce, portrait, and brand photography workflows."
  },
  {
    id: 20,
    category: "Design & Creative",
    title: "Digital Marketing",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Google Ads", "Meta Ads", "SEO Tools", "Google Analytics", "Mailchimp"],
    description: "Run full-funnel digital marketing campaigns. Master Google Ads, Meta advertising, SEO optimization, analytics tracking, and email marketing with Mailchimp."
  },

  // ─── BUSINESS & SKILLS (5) ─────────────────────────
  {
    id: 21,
    category: "Business & Skills",
    title: "Freelancing Accelerator",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Part-Time", "Trainer"],
    duration: "8 weeks",
    stack: ["Portfolio Building", "Client Pitching", "Upwork", "Fiverr", "LinkedIn"],
    description: "Learn to build a profitable freelancing career. Master portfolio creation, client acquisition on Upwork and Fiverr, proposal writing, and personal branding on LinkedIn."
  },
  {
    id: 22,
    category: "Business & Skills",
    title: "Sales & Marketing Management",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "10 weeks",
    stack: ["CRM (Salesforce/HubSpot)", "Lead Generation", "Sales Funnels", "Negotiation", "Market Research"],
    description: "Master modern sales operations — from CRM management with Salesforce/HubSpot to lead generation, building sales funnels, negotiation techniques, and market research."
  },
  {
    id: 23,
    category: "Business & Skills",
    title: "Human Resource Management",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "10 weeks",
    stack: ["HRMS Tools", "Excel for HR", "LinkedIn Recruiter", "ATS Systems", "Payroll Software"],
    description: "Learn end-to-end HR operations — from recruitment with LinkedIn Recruiter and ATS systems to payroll management, HRMS tools, and employee lifecycle management."
  },
  {
    id: 24,
    category: "Business & Skills",
    title: "Finance & Accounting",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Full-Time", "Part-Time", "Trainer"],
    duration: "12 weeks",
    stack: ["Tally Prime", "Advanced Excel", "GST & Taxation", "Financial Modeling", "SAP FICO Basics"],
    description: "Build expertise in accounting and finance — from Tally Prime and GST taxation to financial modeling in Excel and foundational SAP FICO for enterprise resource planning."
  },
  {
    id: 25,
    category: "Business & Skills",
    title: "English Communication & Soft Skills",
    location: "Remote · Work from Home",
    hiringTypes: ["Internship", "Part-Time", "Trainer"],
    duration: "8 weeks",
    stack: ["Spoken English", "Business Writing", "Email Etiquette", "Presentation Skills", "Group Discussion"],
    description: "Develop professional communication skills — spoken English fluency, business writing, email etiquette, presentation delivery, and group discussion techniques for career growth."
  },
];

const categories = ["All Openings", "Development", "AI, Data & Cloud", "Design & Creative", "Business & Skills"] as const;

export const CareersPage = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All Openings");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [college, setCollege] = useState("");
  const [semesterYear, setSemesterYear] = useState("");
  const [source, setSource] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = activeCategory === "All Openings" || job.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = job.title.toLowerCase().includes(q) ||
      job.description.toLowerCase().includes(q) ||
      job.stack.some(s => s.toLowerCase().includes(q)) ||
      job.hiringTypes.some(ht => ht.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
    setFormError("");
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setName("");
    setEmail("");
    setPhone("");
    setPortfolio("");
    setCollege("");
    setSemesterYear("");
    setSource("");
    setFormError("");
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !college || !semesterYear || !source) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!selectedJob) return;

    setIsSubmitting(true);
    setFormError("");

    const hiringTypesText = selectedJob.hiringTypes.join(", ");
    const stackText = selectedJob.stack.join(", ");

    const message = `🐺 *New Career Application — Silver Wolf Technologies*\n\n` +
      `📋 *Position:* ${selectedJob.title}\n` +
      `📂 *Category:* ${selectedJob.category}\n` +
      `⏱ *Duration:* ${selectedJob.duration}\n` +
      `💼 *Hiring Types:* ${hiringTypesText}\n` +
      `🛠 *Tech Stack:* ${stackText}\n\n` +
      `──────────────────\n` +
      `👤 *Applicant Details*\n\n` +
      `*Name:* ${name.trim()}\n` +
      `*Email:* ${email.trim()}\n` +
      `*Phone:* ${phone.trim()}\n` +
      `*College:* ${college.trim()}\n` +
      `*Semester / Year:* ${semesterYear}\n` +
      (portfolio ? `*Portfolio / LinkedIn:* ${portfolio.trim()}\n` : "") +
      `*Source:* ${source}\n\n` +
      `──────────────────\n` +
      `Sent from silverwolftechnologies.in/careers`;

    const whatsappUrl = `https://wa.me/919373922206?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 400);
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" }
  ];

  // ── JobPosting JSON-LD Schema for Google Jobs & AI Engines ──
  const hiringTypeToEmploymentType: Record<HiringType, string> = {
    "Internship": "INTERN",
    "Full-Time": "FULL_TIME",
    "Part-Time": "PART_TIME",
    "Trainer": "CONTRACTOR",
  };

  const jobPostingSchemas = jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.description}</p><p><strong>Duration:</strong> ${job.duration}</p><p><strong>Tech Stack:</strong> ${job.stack.join(", ")}</p>`,
    datePosted: new Date().toISOString().split("T")[0],
    validThrough: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    employmentType: job.hiringTypes.map((ht) => hiringTypeToEmploymentType[ht]),
    hiringOrganization: {
      "@type": "Organization",
      name: SITE.name,
      sameAs: SITE.domain,
      logo: `${SITE.domain}/favicon.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Murbad",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "India",
    },
    industry: job.category,
    skills: job.stack.join(", "),
  }));

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* JobPosting Schema for Google Jobs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchemas) }}
      />

      {/* Decorative Grid Overlay & Ambient Blobs */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-36 pb-16 text-center overflow-hidden">
        <div className="container max-w-4xl px-4 mx-auto animate-fade-up">
          <Breadcrumb items={breadcrumbs} />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5 mb-6 hover:scale-105 transition-all duration-300">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Join Our Pack</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Build Something <br className="hidden sm:inline" />
            <span className="text-gradient">Extraordinary With Us</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            We're hiring across Development, AI & Cloud, Design, and Business verticals.
            Internships, Full-Time, Part-Time, and Trainer positions available — remote-first, outcome-obsessed.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="glass px-5 py-2.5 rounded-full border border-slate-200/80 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-slate-800">Remote · Worldwide</span>
            </div>
            <div className="glass px-5 py-2.5 rounded-full border border-slate-200/80 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-slate-800">25 Active Roles · Hiring Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TABS */}
      <section className="relative z-10 py-12 border-t border-b border-border glass">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            {/* Horizontal Tabs */}
            <div className="flex flex-wrap gap-2.5 order-2 md:order-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <Button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    variant={isActive ? "hero" : "glass"}
                    className={`rounded-full px-5 py-2 text-xs md:text-sm transition-all duration-300 ${isActive ? "scale-105 glow-ring" : "hover:border-primary/30"
                      }`}
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>

            {/* Simple Search bar */}
            <div className="relative w-full md:w-72 order-1 md:order-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search roles, skills, or hiring type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full glass border border-slate-200 rounded-full text-sm placeholder:text-muted-foreground/60 text-foreground focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOB OPENINGS GRID */}
      <section className="relative z-10 py-20">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Active Opportunities</span>
              <h2 className="text-3xl font-bold mt-2">Open Positions</h2>
            </div>
            <Badge variant="secondary" className="glass px-3 py-1 rounded-full text-xs text-muted-foreground border border-border">
              Showing {filteredJobs.length} role{filteredJobs.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative glass rounded-2xl border border-slate-200/80 p-6 flex flex-col justify-between hover:border-primary/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-md"
                >
                  <div>
                    {/* Category & Duration */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 glass px-2.5 py-1 rounded-full border border-primary/20">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" />
                        {job.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {job.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
                      {job.location}
                    </div>

                    {/* Hiring Type Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {job.hiringTypes.map((ht) => {
                        const htStyles: Record<HiringType, string> = {
                          "Internship": "bg-emerald-50 text-emerald-700 border-emerald-200",
                          "Full-Time": "bg-blue-50 text-blue-700 border-blue-200",
                          "Part-Time": "bg-amber-50 text-amber-700 border-amber-200",
                          "Trainer": "bg-purple-50 text-purple-700 border-purple-200",
                        };
                        return (
                          <span
                            key={ht}
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${htStyles[ht]}`}
                          >
                            {ht}
                          </span>
                        );
                      })}
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {job.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {job.stack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {job.stack.length > 5 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-50 text-slate-400 border border-slate-200">
                          +{job.stack.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <Button
                    onClick={() => handleOpenModal(job)}
                    variant="glass"
                    className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300"
                  >
                    View & Apply
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            /* 5. NO OPENINGS FALLBACK STATE */
            <div className="glass rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-xl animate-fade-up">
              <div className="h-16 w-16 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-6 border border-slate-200">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No openings in this category right now
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We're always looking for exceptional minds. Send us a message on WhatsApp and we will be in touch!
              </p>
              <Button asChild variant="hero">
                <a
                  href="https://wa.me/919845953801?text=Hi%2C%20I%27m%20interested%20in%20career%20opportunities%20at%20Silver%20Wolf%20Technologies.%20Please%20share%20available%20openings."
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-primary-foreground hover:text-primary-foreground/90 w-full"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. CULTURE / WHY JOIN US SECTION */}
      <section className="relative z-10 py-24 border-t border-border bg-slate-50/60">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Run</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">Pack Culture & Values</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We focus on outcomes rather than desk hours. We collaborate globally, trust deeply, and operate transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">🌍 Remote First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work from anywhere in India or globally. Async-friendly culture built on clear, proactive documentation and absolute trust.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Rocket className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">🚀 Real Ownership</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work directly with founders and take immediate charge of features. Ship products utilized by real businesses worldwide.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">📈 Growth Focused</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn across development, marketing and product design within an experienced, senior team. We scale your skill limits daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="relative z-10 py-20">
        <div className="container max-w-5xl px-4 mx-auto">
          <div className="glass rounded-3xl border border-white/10 p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            {/* Background blur inside the CTA banner */}
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-foreground">
              Don't see a role that fits?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
              We're always open to exceptional talent. Send us your CV and portfolio, and let's explore how we can collaborate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                <a
                  href={`mailto:hello@theplacemate.in?subject=Speculative%20Application%20-%20Silver%20Wolf%20Technologies`}
                  className="flex items-center justify-center gap-2 text-primary-foreground hover:text-primary-foreground/90 w-full"
                >
                  <Mail className="h-4.5 w-4.5" />
                  <span>Email Your CV</span>
                </a>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a
                  href="https://wa.me/919845953801"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-foreground hover:text-white/90 w-full"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground/50 mt-6">
              Or apply directly at:{" "}
              <a href="mailto:hello@theplacemate.in" className="text-primary hover:underline font-medium">
                hello@theplacemate.in
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 4. APPLY MODAL (DIALOG) */}
      <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="glass border border-slate-200 bg-white p-6 md:p-8 max-w-lg rounded-3xl text-foreground text-left shadow-2xl shadow-indigo-500/15 fixed overflow-hidden">
          {/* Luminous accent lights to dynamically lift modal container */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-6 space-y-5 animate-fade-up">
              <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Sparkles className="h-8 w-8 animate-pulse text-emerald-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Application Submitted!</h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for applying, <span className="text-foreground font-medium">{name}</span>. Your application for <span className="text-primary font-medium">{selectedJob?.title}</span> has been received successfully.
                </p>
              </div>
              
              <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                  <span className="text-muted-foreground">College:</span>
                  <span className="text-foreground font-medium">{college}</span>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200">
                  <span className="text-muted-foreground">Semester / Year:</span>
                  <span className="text-foreground font-medium">{semesterYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contact Email:</span>
                  <span className="text-foreground font-medium">{email}</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground">
                Our operations team will review your application on WhatsApp and contact you directly.
              </p>

              <Button onClick={handleCloseModal} variant="hero" className="w-full py-2.5 rounded-xl text-sm">
                Close Window
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="space-y-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 glass px-2 rounded-full border border-primary/20">
                    {selectedJob?.category}
                  </span>
                  <Badge variant="secondary" className="glass text-[10px] text-muted-foreground border border-slate-200 py-0.5 px-2">
                    {selectedJob?.duration}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground tracking-tight mt-1.5">
                  Apply for {selectedJob?.title}
                </DialogTitle>
                {/* Hiring Types */}
                {selectedJob?.hiringTypes && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.hiringTypes.map((ht) => {
                      const htStyles: Record<string, string> = {
                        "Internship": "bg-emerald-50 text-emerald-700 border-emerald-200",
                        "Full-Time": "bg-blue-50 text-blue-700 border-blue-200",
                        "Part-Time": "bg-amber-50 text-amber-700 border-amber-200",
                        "Trainer": "bg-purple-50 text-purple-700 border-purple-200",
                      };
                      return (
                        <span key={ht} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${htStyles[ht] || ""}`}>
                          {ht}
                        </span>
                      );
                    })}
                  </div>
                )}
                {/* Tech Stack */}
                {selectedJob?.stack && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedJob.stack.map((tech) => (
                      <span key={tech} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                  Complete the short form below to submit your details directly to our careers desk.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4.5 mt-6">
                {formError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive font-medium">
                    {formError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-slate-800">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Abhishek Yadav"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-slate-800">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abhishek@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-slate-800">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 93160 28350"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="college" className="text-xs font-semibold text-slate-800">
                      College Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="college"
                      type="text"
                      placeholder="e.g. IIT Bombay, Mumbai University"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="semesterYear" className="text-xs font-semibold text-slate-800">
                      Semester / Year <span className="text-primary">*</span>
                    </label>
                    <select
                      id="semesterYear"
                      value={semesterYear}
                      onChange={(e) => setSemesterYear(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-white border border-slate-200 rounded-xl text-sm text-foreground px-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="text-muted-foreground bg-white text-slate-900">Select semester / year</option>
                      <option value="1st Semester / 1st Year" className="bg-white text-slate-900">1st Semester / 1st Year</option>
                      <option value="2nd Semester / 1st Year" className="bg-white text-slate-900">2nd Semester / 1st Year</option>
                      <option value="3rd Semester / 2nd Year" className="bg-white text-slate-900">3rd Semester / 2nd Year</option>
                      <option value="4th Semester / 2nd Year" className="bg-white text-slate-900">4th Semester / 2nd Year</option>
                      <option value="5th Semester / 3rd Year" className="bg-white text-slate-900">5th Semester / 3rd Year</option>
                      <option value="6th Semester / 3rd Year" className="bg-white text-slate-900">6th Semester / 3rd Year</option>
                      <option value="7th Semester / 4th Year" className="bg-white text-slate-900">7th Semester / 4th Year</option>
                      <option value="8th Semester / 4th Year" className="bg-white text-slate-900">8th Semester / 4th Year</option>
                      <option value="Postgraduate / Masters" className="bg-white text-slate-900">Postgraduate / Masters</option>
                      <option value="Graduated" className="bg-white text-slate-900">Graduated</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="portfolio" className="text-xs font-semibold text-slate-800">
                    Portfolio or LinkedIn Link
                  </label>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://github.com/abhishek or linkedin.com/in/..."
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="source" className="text-xs font-semibold text-slate-800">
                    How did you hear about this opportunity? <span className="text-primary">*</span>
                  </label>
                  <select
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-white border border-slate-200 rounded-xl text-sm text-foreground px-3 py-2.5 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-muted-foreground bg-white text-slate-900">Select an option</option>
                    <option value="LinkedIn" className="bg-white text-slate-900">LinkedIn</option>
                    <option value="Instagram" className="bg-white text-slate-900">Instagram</option>
                    <option value="WhatsApp" className="bg-white text-slate-900">WhatsApp</option>
                    <option value="Friend / Referral" className="bg-white text-slate-900">Friend / Referral</option>
                    <option value="College / University" className="bg-white text-slate-900">College / University</option>
                    <option value="Google Search" className="bg-white text-slate-900">Google Search</option>
                    <option value="Twitter / X" className="bg-white text-slate-900">Twitter / X</option>
                    <option value="YouTube" className="bg-white text-slate-900">YouTube</option>
                    <option value="Company Website" className="bg-white text-slate-900">Company Website</option>
                    <option value="Other" className="bg-white text-slate-900">Other</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end items-center pt-4 border-t border-white/5">
                  <Button
                    type="button"
                    variant="glass"
                    onClick={handleCloseModal}
                    className="px-5 rounded-lg text-sm border-white/10 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" className="px-5 rounded-lg text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Redirecting..." : "✉️ Apply via WhatsApp"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
