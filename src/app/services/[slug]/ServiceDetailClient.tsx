'use client';

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/site/Contact";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, MapPin, ChevronDown, Linkedin, ExternalLink } from "lucide-react";
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

  return (
    <>
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
                  Serving businesses across {locationLabel} {areaData && areaData.nearbyAreas ? `(including ${areaData.nearbyAreas.join(', ')})` : '& nearby regions'}
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
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Fallback: LinkedIn from teamMembers data */}
                      {links.length === 0 && member.linkedin && (
                        <div className="pt-5 border-t border-border/30">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-3">Profile</p>
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
