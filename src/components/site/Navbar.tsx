'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { SERVICES } from "@/data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Work" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const grouped = {
  Development: SERVICES.filter((s) => s.category === "Development"),
  Marketing: SERVICES.filter((s) => s.category === "Marketing"),
  Creative: SERVICES.filter((s) => s.category === "Creative"),
};

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname && pathname.startsWith("/careers/responses")) {
    return null;
  }

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass py-2.5" : "py-4"}`}>
      <nav className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src={logo.src} alt="Silver Wolf Technologies logo" width={44} height={44} className="h-11 w-11 drop-shadow-[0_0_15px_hsl(var(--primary)/0.35)]" />
          <span className="font-semibold tracking-tight text-sm md:text-base leading-tight">
            Silver Wolf<br />
            <span className="text-gradient text-[10px] md:text-sm font-medium tracking-[0.15em] md:tracking-[0.18em] uppercase">Technologies</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-7">
          <Link href="/" className={`text-sm transition-colors ${pathname === "/" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>Home</Link>

          <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[640px]">
                <div className="glass rounded-2xl p-6 grid grid-cols-3 gap-5 shadow-2xl animate-fade-up">
                  {(Object.keys(grouped) as Array<keyof typeof grouped>).map((cat) => (
                    <div key={cat}>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary mb-3">{cat}</div>
                      <ul className="space-y-2">
                        {grouped[cat].map((s) => (
                          <li key={s.slug}>
                            <Link href={`/services/${s.slug}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors block">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.slice(1).map((l) => (
            <Link key={l.to} href={l.to} className={`text-sm transition-colors ${pathname === l.to ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button asChild variant="hero" size="sm"><Link href="/contact">Get Free Quote</Link></Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-border mt-3 max-h-[80vh] overflow-y-auto">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} href={l.to} onClick={() => setOpen(false)} className="text-foreground/90">
                {l.label}
              </Link>
            ))}
            <div className="border-t border-border pt-4">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Services</div>
              <div className="grid grid-cols-1 gap-2">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="text-sm text-muted-foreground hover:text-foreground">
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>
            <Button asChild variant="hero" onClick={() => setOpen(false)}><Link href="/contact">Get Free Quote</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};
