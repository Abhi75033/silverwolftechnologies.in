import Link from "next/link";
import {
  Code2, Smartphone, Database, Bug, Search, Megaphone, Video,
  Image as ImageIcon, Palette, Rocket, ShoppingCart, LineChart,
  Share2, Layout as LayoutIcon, ArrowRight,
} from "lucide-react";
import { SERVICES } from "@/data/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Smartphone, Database, Bug, Search, Megaphone, Video,
  Image: ImageIcon, Palette, Rocket, ShoppingCart, LineChart,
  Share2, Layout: LayoutIcon,
};

export const Services = () => (
  <section id="services" className="py-24 md:py-32">
    <div className="container">
      <div className="max-w-2xl mb-16 animate-fade-up">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Our Services</span>
        <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-4">
          Everything your brand needs, <span className="text-gradient">under one roof.</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          From code to creative to clicks — a senior team executing across development, marketing and design with 10+ years of experience.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => {
          const Icon = ICONS[s.icon] ?? Code2;
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative glass rounded-2xl p-7 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 block"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground">{s.category}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.short}</p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore service <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);
