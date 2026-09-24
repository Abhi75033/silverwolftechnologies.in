import { Award, Users, Target, Sparkles, Linkedin, ExternalLink } from "lucide-react";
import { SITE } from "@/data/site";
import teamAbhishek from "@/assets/team-abhishek.png";
import teamSharad from "@/assets/team-sharad.png";
import teamSwapnali from "@/assets/team-swapnali.png";
import teamMansha from "@/assets/team-mansha.png";
import teamDivakar from "@/assets/team-divakar.png";

const pillars = [
  { icon: Target, title: "Mission", text: "To make world-class digital execution accessible to every ambitious brand — from local startups to global enterprises." },
  { icon: Sparkles, title: "Vision", text: "Become the most trusted growth partner for the next generation of digital-first companies worldwide." },
  { icon: Award, title: "Expertise", text: `${SITE.yearsExperience}+ years of combined experience across development, marketing and creative — senior specialists on every engagement.` },
  { icon: Users, title: "Trust", text: "Long-term partnerships built on transparent communication, weekly demos and predictable delivery." },
];

type TeamMember = {
  name: string;
  role: string;
  description: string;
  skills: string[];
  image: string;
  links?: { type: "linkedin" | "portfolio" | "behance"; url: string }[];
};

const team: TeamMember[] = [
  
];

export const About = () => (
  <section id="about" className="py-24 md:py-32 relative">
    <div className="container">
      {/* Intro */}
      <div className="max-w-3xl mb-16 animate-fade-up">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">About Us</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          A <span className="text-gradient">pack of specialists</span> obsessed with your growth.
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {SITE.name} was founded by senior engineers, marketers and designers who believe ambitious founders deserve a partner that ships like a startup and thinks like a strategist.
          With {SITE.yearsExperience}+ years of combined experience across SaaS, e-commerce, fintech and D2C, we operate as a remote-first team serving clients across India and globally.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-24">
        {pillars.map(({ icon: Icon, title, text }) => (
          <div key={title} className="glass rounded-2xl p-7">
            <Icon className="h-6 w-6 text-primary mb-5" />
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="animate-fade-up">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Team</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-4">
            Meet the <span className="text-gradient">wolves.</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A lean, senior team — every member is a specialist, not a generalist. No juniors, no outsourcing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/40 transition-all duration-500"
            >
              {/* Avatar */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={member.image}
                  alt={`${member.name} — ${member.role}`}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />


              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.description}
                </p>

                {/* Portfolio links - prominently displayed */}
                {member.links && member.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-300 border hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
                        style={{
                          background: link.type === 'linkedin'
                            ? 'linear-gradient(135deg, rgba(10,102,194,0.15), rgba(10,102,194,0.25))'
                            : link.type === 'behance'
                              ? 'linear-gradient(135deg, rgba(23,105,255,0.15), rgba(23,105,255,0.25))'
                              : 'linear-gradient(135deg, rgba(var(--primary-rgb, 139,92,246),0.15), rgba(var(--primary-rgb, 139,92,246),0.25))',
                          borderColor: link.type === 'linkedin'
                            ? 'rgba(10,102,194,0.4)'
                            : link.type === 'behance'
                              ? 'rgba(23,105,255,0.4)'
                              : 'rgba(139,92,246,0.4)',
                          color: link.type === 'linkedin'
                            ? '#0a66c2'
                            : link.type === 'behance'
                              ? '#1769ff'
                              : 'hsl(var(--primary))',
                        }}
                      >
                        {link.type === 'linkedin' ? (
                          <Linkedin className="h-3 w-3" />
                        ) : (
                          <ExternalLink className="h-3 w-3" />
                        )}
                        {link.type === 'linkedin' ? 'LinkedIn' : link.type === 'portfolio' ? '🎨 Portfolio' : '🎯 Behance'}
                      </a>
                    ))}
                  </div>
                )}

                {/* Skill tags */}
                <div className="flex flex-wrap gap-1.5">
                  {member.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 6 && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      +{member.skills.length - 6} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
