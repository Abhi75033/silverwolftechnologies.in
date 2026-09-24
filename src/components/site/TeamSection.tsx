import { Linkedin, Mail, Phone, ExternalLink } from "lucide-react";

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  experience: string;
  photo?: string;       // URL or imported image path
  linkedin?: string;
  email?: string;
  phone?: string;
};

type Props = {
  members: TeamMember[];
  serviceTitle: string;
};

export const TeamSection = ({ members, serviceTitle }: Props) => {
  if (!members || members.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="max-w-2xl mb-12 animate-fade-up">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Experts</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            Meet the <span className="text-gradient">{serviceTitle}</span> team
          </h2>
          <p className="text-muted-foreground mt-3">
            The specialists behind our {serviceTitle.toLowerCase()} projects — bringing years of expertise and dedication.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.name}
              className="glass rounded-2xl overflow-hidden group hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Photo */}
              <div className="aspect-[4/5] overflow-hidden relative bg-secondary/50">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-gradient-primary">
                        {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  </div>
                )}
                {/* Experience badge */}
                <div className="absolute top-3 right-3 glass rounded-full px-3 py-1">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{member.experience}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-xs text-primary font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">{member.description}</p>

                {/* Social/Contact links */}
                <div className="flex items-center gap-2 flex-wrap">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all"
                      aria-label={`Call ${member.name}`}
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
