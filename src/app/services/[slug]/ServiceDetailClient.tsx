'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/site/Contact";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, MapPin, ChevronDown, Linkedin, ExternalLink, X, Phone, Send, User, Briefcase } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import {
  SERVICES, CITIES, SUB_CITIES, citySlug, cityFromSlug,
  subCityFromSlug, getSubCities, SITE,
} from "@/data/site";
import { getAreaData, getCityData } from "@/lib/locationData";

/** Map of team portfolio links keyed by member name */
const PORTFOLIO_LINKS: Record<string, { type: "linkedin" | "portfolio" | "behance"; url: string; label: string }[]> = {
  "Divakar Prajapati": [
    { type: "linkedin", url: "https://www.linkedin.com/in/divakar-prajapati-193782407/", label: "LinkedIn" },
    { type: "portfolio", url: "https://editordivakar30.framer.website", label: "🎨 Portfolio" },
    { type: "behance", url: "https://www.behance.net/divakardesigner01", label: "🎯 Behance" },
  ],
  "Abhishek Yadav": [
    { type: "linkedin", url: "https://www.linkedin.com/in/abhishekkumar-webdev/", label: "LinkedIn" },
  ],
};

/** WhatsApp number for Divakar (without +) */
const DIVAKAR_WHATSAPP = "919373922206";

/** Popup form types */
type FormMode = "profile" | "call";

interface PopupFormData {
  isOpen: boolean;
  mode: FormMode;
  linkUrl: string;
  linkLabel: string;
  memberName: string;
}

/** WhatsApp Redirect Popup Component */
const WhatsAppRedirectPopup = ({
  data,
  onClose,
}: {
  data: PopupFormData;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data.isOpen && nameInputRef.current) {
      setTimeout(() => nameInputRef.current?.focus(), 150);
    }
  }, [data.isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (data.isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [data.isOpen, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    let message = "";

    if (data.mode === "call") {
      message = `Hi, I'm *${name.trim()}*.\n\n📞 My number: ${phone.trim()}\n💼 Service I'm interested in: ${service.trim()}\n\n🔗 I found your profile here:\n${data.linkUrl}\n\nPlease get back to me. Thanks!`;
    } else {
      message = `Hi, I'm *${name.trim()}*.\n\n🔗 I'd like to check out ${data.memberName}'s ${data.linkLabel}:\n${data.linkUrl}\n\nPlease share more details. Thanks!`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${DIVAKAR_WHATSAPP}?text=${encodedMessage}`;

    // Small delay for visual feedback
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      setIsSubmitting(false);
      setName("");
      setPhone("");
      setService("");
      onClose();
    }, 400);
  };

  if (!data.isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-fade-up"
        style={{
          background: "linear-gradient(145deg, #0f0f14 0%, #1a1a24 50%, #12121a 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Top gradient accent */}
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all z-10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-7 pt-6">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/10 flex items-center justify-center border border-emerald-500/20">
                {data.mode === "call" ? (
                  <Phone className="h-5 w-5 text-emerald-400" />
                ) : (
                  <Send className="h-5 w-5 text-emerald-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {data.mode === "call" ? "Get in Touch" : `View ${data.linkLabel}`}
                </h3>
                <p className="text-xs text-zinc-500">via WhatsApp • instant redirect</p>
              </div>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {data.mode === "call"
                ? "Fill in your details and we'll redirect you to WhatsApp to connect instantly."
                : `Enter your name and we'll send you to WhatsApp with ${data.memberName}'s ${data.linkLabel} link.`
              }
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                <User className="h-3 w-3" />
                Your Name <span className="text-emerald-400">*</span>
              </label>
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/40"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            {/* Phone field — only for "call" mode */}
            {data.mode === "call" && (
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  <Phone className="h-3 w-3" />
                  Phone Number <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/40"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            )}

            {/* Service field — only for "call" mode */}
            {data.mode === "call" && (
              <div>
                <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  <Briefcase className="h-3 w-3" />
                  Service Needed <span className="text-emerald-400">*</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none transition-all duration-200 focus:ring-2 focus:ring-emerald-500/40 appearance-none cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <option value="" disabled className="bg-zinc-900 text-zinc-400">Select a service</option>
                  <option value="Video Editing" className="bg-zinc-900">Video Editing</option>
                  <option value="Photo Editing" className="bg-zinc-900">Photo Editing</option>
                  <option value="Graphic Design" className="bg-zinc-900">Graphic Design</option>
                  <option value="UI/UX Design" className="bg-zinc-900">UI/UX Design</option>
                  <option value="Branding & Strategy" className="bg-zinc-900">Branding & Strategy</option>
                  <option value="Website Development" className="bg-zinc-900">Website Development</option>
                  <option value="Other" className="bg-zinc-900">Other</option>
                </select>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !name.trim() || (data.mode === "call" && (!phone.trim() || !service))}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isSubmitting
                  ? "linear-gradient(135deg, #6b7280, #4b5563)"
                  : "linear-gradient(135deg, #10b981, #059669)",
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Redirecting...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Continue on WhatsApp
                </>
              )}
            </button>

            <p className="text-[10px] text-zinc-600 text-center mt-2">
              You'll be redirected to WhatsApp with the {data.mode === "call" ? "portfolio" : data.linkLabel} link in the message
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};


export default function ServiceDetailClient({
  slug, citySlugParam, subCitySlugParam
}: {
  slug: string; citySlugParam?: string; subCitySlugParam?: string;
}) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return notFound();

  // Resolve city
  const city = citySlugParam ? cityFromSlug(citySlugParam) : undefined;
  if (citySlugParam && !city) return notFound();

  // Resolve sub-city
  const subCity = city && subCitySlugParam ? subCityFromSlug(city, subCitySlugParam) : undefined;
  if (subCitySlugParam && !subCity) return notFound();

  // Location label for display
  const locationLabel = subCity ? `${subCity}, ${city}` : city || "";
  const titleBase = subCity
    ? `${service.title} in ${subCity}, ${city}`
    : city
      ? `${service.title} in ${city}`
      : service.title;

  const related = SERVICES.filter((s) => s.category === service.category && s.slug !== service.slug).slice(0, 3);
  const otherCities = CITIES.filter((c) => c !== city).slice(0, 12);
  const subCities = city ? getSubCities(city) : [];
  const otherSubCities = subCities.filter((sc) => sc !== subCity);

  const teamMembers = service.teamMembers ?? [];

  const areaData = citySlugParam && subCitySlugParam ? getAreaData(citySlugParam, subCitySlugParam, service.title) : undefined;
  const cityData = citySlugParam ? getCityData(citySlugParam) : undefined;

  /**
   * "Serving businesses across …" line. Generated localities carry an empty
   * nearbyAreas array, and `[]` is truthy, so 5,236 pages rendered
   * "(including )". Use the hand-written list when there is one; otherwise
   * name up to three neighbouring localities from the same city list.
   */
  const servingSuffix = (() => {
    if (areaData?.nearbyAreas?.length) {
      return `(including ${areaData.nearbyAreas.join(", ")})`;
    }
    if (subCity && city) {
      const i = subCities.indexOf(subCity);
      const picks = [subCities[i - 1], subCities[i + 1], subCities[i + 2], subCities[i - 2]]
        .filter((x): x is string => Boolean(x) && x !== subCity)
        .slice(0, 3);
      if (picks.length) {
        const list = picks.length > 1
          ? `${picks.slice(0, -1).join(", ")} and ${picks[picks.length - 1]}`
          : picks[0];
        return `& other parts of ${city} like ${list}`;
      }
    }
    return "& nearby regions";
  })();

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` }
  ];
  if (city) {
    if (subCity) {
      breadcrumbs.push({ name: city, href: `/services/${service.slug}/${citySlug(city)}` });
      breadcrumbs.push({ name: subCity, href: `/services/${service.slug}/${citySlug(city)}/${citySlug(subCity)}` });
    } else {
      breadcrumbs.push({ name: city, href: `/services/${service.slug}/${citySlug(city)}` });
    }
  }

  // WhatsApp popup state
  const [popupData, setPopupData] = useState<PopupFormData>({
    isOpen: false,
    mode: "profile",
    linkUrl: "",
    linkLabel: "",
    memberName: "",
  });

  /** Opens the popup for a profile link (LinkedIn, Portfolio, Behance) */
  const handleProfileLinkClick = (memberName: string, linkUrl: string, linkLabel: string) => {
    setPopupData({
      isOpen: true,
      mode: "profile",
      linkUrl,
      linkLabel,
      memberName,
    });
  };

  /** Opens the popup for a call / contact action */
  const handleCallClick = (memberName: string) => {
    const memberLinks = PORTFOLIO_LINKS[memberName];
    const portfolioLink = memberLinks?.find(l => l.type === "portfolio")?.url
      || memberLinks?.find(l => l.type === "linkedin")?.url
      || "";
    setPopupData({
      isOpen: true,
      mode: "call",
      linkUrl: portfolioLink,
      linkLabel: "Portfolio",
      memberName,
    });
  };

  /** Check if a member should use the WhatsApp redirect flow */
  const shouldIntercept = (memberName: string) => memberName === "Divakar Prajapati";

  return (
    <>
      {/* WhatsApp Redirect Popup */}
      <WhatsAppRedirectPopup
        data={popupData}
        onClose={() => setPopupData(prev => ({ ...prev, isOpen: false }))}
      />

      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg -z-10" />
        <div className="container animate-fade-up">
          <Breadcrumb items={breadcrumbs} />

          <div>
            {/* Main Hero Content */}
            <div className="max-w-4xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{service.category}</span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mt-4 mb-6 leading-tight">
                {areaData?.h1Variant ? (
                  <>{areaData.h1Variant}</>
                ) : subCity ? (
                  <>Custom <span className="text-gradient">{service.title}</span> in {subCity}, {city}</>
                ) : city ? (
                  <>Best <span className="text-gradient">{service.title}</span> Agency in {city}</>
                ) : (
                  <>{service.title} <span className="text-gradient">that drives growth</span></>
                )}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                {areaData ? areaData.intro : cityData ? cityData.description : service.longDescription}
              </p>
              {(city || subCity) && (
                <p className="text-sm text-muted-foreground mb-8 inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  Serving businesses across {locationLabel} {servingSuffix}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="xl"><Link href="/contact">Get Free Quote <ArrowRight /></Link></Button>
                <Button asChild variant="glass" size="xl"><a href={`tel:${SITE.phoneRaw}`}>Call {SITE.phone}</a></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">What you get</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-8">
                {areaData && areaData.h2Options && areaData.h2Options[0] ? areaData.h2Options[0] : `Why Choose Our ${service.title} Experts`}
              </h2>
              <ul className="space-y-3">
                {service.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass rounded-2xl p-8 animate-fade-up">
              <h3 className="text-xl font-semibold mb-5">Deliverables</h3>
              <ul className="space-y-3 mb-6">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-1" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Button asChild variant="hero" className="w-full"><Link href="/contact">Request a proposal</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container">
          <div className="max-w-2xl mb-12 animate-fade-up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Process</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">
               {areaData && areaData.h2Options && areaData.h2Options[1] ? areaData.h2Options[1] : `Our ${service.title} Process, refined over `}
               {!areaData && <span className="text-gradient">{SITE.yearsExperience} years.</span>}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {service.process.map((p, i) => (
              <div key={p.step} className="glass rounded-2xl p-6 relative">
                <div className="text-5xl font-bold text-gradient-primary opacity-30 mb-2">0{i + 1}</div>
                <h3 className="font-semibold mb-2">{p.step}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Your Specialist */}
      {teamMembers.length > 0 && teamMembers[0].name !== "Add Team Member" && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mb-12 animate-fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your Team</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4">
                Meet your <span className="text-gradient">specialist.</span>
              </h2>
              <p className="text-muted-foreground mt-3">
                Every project is led by a senior specialist — not a junior, not a freelancer.
              </p>
            </div>

            {teamMembers.map((member) => {
              const links = PORTFOLIO_LINKS[member.name] ?? [];
              const intercept = shouldIntercept(member.name);
              const MEMBER_SKILLS: Record<string, string[]> = {
                "Divakar Prajapati": ["Video Editing", "Motion Graphics", "Graphic Design", "Branding", "After Effects", "Premiere Pro", "Photoshop", "Figma"],
                "Abhishek Yadav": ["React", "Node.js", "Next.js", "MongoDB", "Express", "TypeScript", "REST APIs", "MySQL"],
              };
              const skills = MEMBER_SKILLS[member.name] ?? [];
              return (
                <div
                  key={member.name}
                  className="glass rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 animate-fade-up relative"
                >
                  {/* Decorative gradient accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-blue-500" />

                  <div className="flex flex-col md:flex-row">
                    {/* Left — Avatar & Name */}
                    <div className="md:w-72 shrink-0 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border/30 bg-gradient-to-b md:bg-gradient-to-br from-primary/5 to-transparent">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/5 flex items-center justify-center border border-primary/25 mb-4 shadow-lg shadow-primary/10">
                        <span className="text-3xl font-bold text-primary">{member.name.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                      <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                      {member.experience && (
                        <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {member.experience} Experience
                        </span>
                      )}

                      {/* Call / Contact button for Divakar */}
                      {intercept && (
                        <button
                          onClick={() => handleCallClick(member.name)}
                          className="mt-4 inline-flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 text-white"
                          style={{
                            background: "linear-gradient(135deg, #10b981, #059669)",
                            border: "1px solid rgba(16,185,129,0.3)",
                          }}
                        >
                          <Phone className="h-3.5 w-3.5" />
                          Contact via WhatsApp
                        </button>
                      )}
                    </div>

                    {/* Right — Description, Skills & Links */}
                    <div className="flex-1 p-8">
                      <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                        {member.description}
                      </p>

                      {/* Skills */}
                      <div className="mb-6">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Core Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-[11px] font-medium px-3 py-1 rounded-full bg-primary/8 text-primary/90 border border-primary/15"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Portfolio links */}
                      {links.length > 0 && (
                        <div className="pt-5 border-t border-border/30">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">View Work & Profile</p>
                          <div className="flex flex-wrap gap-3">
                            {links.map((link) => (
                              intercept ? (
                                <button
                                  key={link.url}
                                  onClick={() => handleProfileLinkClick(member.name, link.url, link.label)}
                                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 border hover:scale-105 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                                  style={{
                                    background: link.type === 'linkedin'
                                      ? 'linear-gradient(135deg, rgba(10,102,194,0.12), rgba(10,102,194,0.22))'
                                      : link.type === 'behance'
                                        ? 'linear-gradient(135deg, rgba(23,105,255,0.12), rgba(23,105,255,0.22))'
                                        : 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.22))',
                                    borderColor: link.type === 'linkedin'
                                      ? 'rgba(10,102,194,0.35)'
                                      : link.type === 'behance'
                                        ? 'rgba(23,105,255,0.35)'
                                        : 'rgba(139,92,246,0.35)',
                                    color: link.type === 'linkedin'
                                      ? '#0a66c2'
                                      : link.type === 'behance'
                                        ? '#1769ff'
                                        : '#8b5cf6',
                                  }}
                                >
                                  {link.type === 'linkedin' ? (
                                    <Linkedin className="h-4 w-4" />
                                  ) : (
                                    <ExternalLink className="h-4 w-4" />
                                  )}
                                  {link.label}
                                </button>
                              ) : (
                                <a
                                  key={link.url}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 border hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                                  style={{
                                    background: link.type === 'linkedin'
                                      ? 'linear-gradient(135deg, rgba(10,102,194,0.12), rgba(10,102,194,0.22))'
                                      : link.type === 'behance'
                                        ? 'linear-gradient(135deg, rgba(23,105,255,0.12), rgba(23,105,255,0.22))'
                                        : 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.22))',
                                    borderColor: link.type === 'linkedin'
                                      ? 'rgba(10,102,194,0.35)'
                                      : link.type === 'behance'
                                        ? 'rgba(23,105,255,0.35)'
                                        : 'rgba(139,92,246,0.35)',
                                    color: link.type === 'linkedin'
                                      ? '#0a66c2'
                                      : link.type === 'behance'
                                        ? '#1769ff'
                                        : '#8b5cf6',
                                  }}
                                >
                                  {link.type === 'linkedin' ? (
                                    <Linkedin className="h-4 w-4" />
                                  ) : (
                                    <ExternalLink className="h-4 w-4" />
                                  )}
                                  {link.label}
                                </a>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fallback: LinkedIn from teamMembers data */}
                      {links.length === 0 && member.linkedin && (
                        <div className="pt-5 border-t border-border/30">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Profile</p>
                          {intercept ? (
                            <button
                              onClick={() => handleProfileLinkClick(member.name, member.linkedin!, "LinkedIn")}
                              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 border hover:scale-105 hover:shadow-lg hover:shadow-primary/20 cursor-pointer"
                              style={{
                                background: 'linear-gradient(135deg, rgba(10,102,194,0.12), rgba(10,102,194,0.22))',
                                borderColor: 'rgba(10,102,194,0.35)',
                                color: '#0a66c2',
                              }}
                            >
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                            </button>
                          ) : (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 border hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                              style={{
                                background: 'linear-gradient(135deg, rgba(10,102,194,0.12), rgba(10,102,194,0.22))',
                                borderColor: 'rgba(10,102,194,0.35)',
                                color: '#0a66c2',
                              }}
                            >
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Hyper-Local Body Sections */}
      {areaData?.contentBlocks && areaData.contentBlocks.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-14">
              {areaData.contentBlocks.map((block, index) => (
                <div key={index} className="animate-fade-up">
                  <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">{block.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed text-[16px] md:text-[17px]">{block.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      {service.contentSections && service.contentSections.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto space-y-16">
              {service.contentSections.map((section, idx) => (
                <div key={section.heading} className="animate-fade-up">
                  <div className="flex items-start gap-5">
                    <div className="hidden md:flex shrink-0 w-12 h-12 rounded-xl glass items-center justify-center">
                      <span className="text-lg font-bold text-gradient-primary">0{idx + 1}</span>
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-4">{idx === 0 && areaData && areaData.h2Options && areaData.h2Options[2] ? areaData.h2Options[2] : section.heading}</h2>
                      <p className="text-muted-foreground leading-relaxed text-[15px]">{section.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hyper-Local FAQs */}
      {areaData && areaData.faqs && areaData.faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12 animate-fade-up">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Local FAQ</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4">Frequently Asked Questions in {subCity}</h2>
              </div>
              <div className="space-y-4">
                {areaData.faqs.map((faq, i) => (
                  <div key={i} className="glass rounded-xl p-6 animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                    <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sub Cities */}
      {city && !subCity && subCities.length > 0 && (
        <SubCitiesSection serviceSlug={service.slug} serviceTitle={service.title} city={city} subCities={subCities} />
      )}

      {/* Other Sub Cities */}
      {subCity && otherSubCities.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mb-10 animate-fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Also serving in {city}</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4">{service.title} in <span className="text-gradient">other areas of {city}</span></h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {otherSubCities.map((sc) => (
                <Link key={sc} href={`/services/${service.slug}/${citySlug(city)}/${citySlug(sc)}`} className="glass rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center justify-between group">
                  <span>{sc}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Major Cities */}
      {!city && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mb-10 animate-fade-up">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Locations</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-4">{service.title} <span className="text-gradient">across India & globally.</span></h2>
              <p className="text-muted-foreground mt-3">Dedicated landing pages for businesses in your city.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {CITIES.map((c) => (
                <Link key={c} href={`/services/${service.slug}/${citySlug(c)}`} className="glass rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center justify-between group">
                  <span>{service.title.split(" ")[0]} in {c}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="py-16 md:py-24 bg-secondary/20">
        <div className="container">
          <div className="max-w-2xl mb-10 animate-fade-up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Related Services</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4">More from our <span className="text-gradient">{service.category.toLowerCase()}</span> team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link key={r.slug} href={`/services/${r.slug}`} className="glass rounded-2xl p-6 hover:border-primary/40 hover:-translate-y-1 transition-all duration-500">
                <div className="text-xs text-muted-foreground mb-2">{r.category}</div>
                <h3 className="text-lg font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{r.short}</p>
                <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">Learn more <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Unique CTA Copy */}
      {areaData?.ctaCopy && (
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto glass rounded-2xl p-8 md:p-10 text-center animate-fade-up">
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-6">{areaData.ctaCopy}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="hero"><Link href="/contact">Get Free Proposal <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild variant="glass"><a href={`tel:${SITE.phoneRaw}`}>Call {SITE.phone}</a></Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Contact compact presetService={titleBase} />
    </>
  );
}

const SubCitiesSection = ({ serviceSlug, serviceTitle, city, subCities }: { serviceSlug: string; serviceTitle: string; city: string; subCities: string[]; }) => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? subCities : subCities.slice(0, 12);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl mb-10 animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Areas in {city}</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4">{serviceTitle} across <span className="text-gradient">{city}</span></h2>
          <p className="text-muted-foreground mt-3">Hyper-local pages for businesses in every neighbourhood of {city}.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {visible.map((sc) => (
            <Link key={sc} href={`/services/${serviceSlug}/${citySlug(city)}/${citySlug(sc)}`} className="glass rounded-xl px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all flex items-center justify-between group">
              <span>{serviceTitle.split(" ")[0]} in {sc}</span>
              <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
        {subCities.length > 12 && !showAll && (
          <div className="text-center mt-6">
            <button onClick={() => setShowAll(true)} className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              Show all {subCities.length} areas <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
