'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sparkles, ArrowRight, Code2, Megaphone, Palette } from "lucide-react";
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
  Development: { items: SERVICES.filter((s) => s.category === "Development"), icon: Code2 },
  Marketing: { items: SERVICES.filter((s) => s.category === "Marketing"), icon: Megaphone },
  Creative: { items: SERVICES.filter((s) => s.category === "Creative"), icon: Palette },
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

  const isServicesActive = pathname && pathname.startsWith("/services");

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "py-2.5 bg-white/90 backdrop-blur-2xl border-b border-slate-200/80 shadow-md" : "py-4"}`}>
      <div className={`container transition-all duration-300 ${!scrolled ? "max-w-7xl" : ""}`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${!scrolled ? "bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-sm rounded-full px-6 py-2.5" : ""}`}>
          
          {/* Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src={logo.src}
              alt="Silver Wolf Technologies logo"
              width={44}
              height={44}
              className="h-10 w-10 md:h-11 md:w-11 drop-shadow-[0_4px_12px_rgba(79,70,229,0.3)] group-hover:scale-105 transition-transform"
            />
            <span className="font-extrabold tracking-tight text-sm md:text-base leading-tight text-slate-900">
              Silver Wolf<br />
              <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.18em] uppercase">Technologies</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                pathname === "/"
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                  : "text-slate-600 hover:text-primary hover:bg-slate-100/60"
              }`}
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                  isServicesActive || servicesOpen
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                    : "text-slate-600 hover:text-primary hover:bg-slate-100/60"
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${servicesOpen ? "rotate-180 text-primary" : ""}`} />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[680px]">
                  <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 grid grid-cols-3 gap-6 border border-slate-200 shadow-2xl shadow-slate-900/10 animate-fade-up">
                    {(Object.keys(grouped) as Array<keyof typeof grouped>).map((catKey) => {
                      const category = grouped[catKey];
                      const Icon = category.icon;
                      return (
                        <div key={catKey} className="space-y-3">
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-full w-fit">
                            <Icon className="h-3 w-3 text-primary" />
                            <span>{catKey}</span>
                          </div>
                          <ul className="space-y-1.5">
                            {category.items.map((s) => {
                              const isActive = pathname === `/services/${s.slug}`;
                              return (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className={`text-xs font-medium px-2.5 py-1.5 rounded-lg block transition-all ${
                                      isActive
                                        ? "text-primary font-bold bg-primary/10"
                                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                                    }`}
                                  >
                                    {s.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {links.slice(1).map((l) => {
              const isActive = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  className={`text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20 shadow-xs"
                      : "text-slate-600 hover:text-primary hover:bg-slate-100/60"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden lg:block">
            <Button asChild variant="hero" size="sm" className="shadow-md shadow-indigo-500/20 rounded-full px-5 py-2">
              <Link href="/contact" className="flex items-center gap-1.5">
                <span>Get Free Quote</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 rounded-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-200 mt-2 max-h-[85vh] overflow-y-auto shadow-xl animate-fade-up">
          <div className="container py-6 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                href={l.to}
                onClick={() => setOpen(false)}
                className={`text-sm font-bold px-4 py-2.5 rounded-xl transition-colors ${
                  pathname === l.to ? "bg-primary/10 text-primary" : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="border-t border-slate-200 pt-4">
              <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3 px-4">Services</div>
              <div className="grid grid-cols-1 gap-1">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="text-xs font-medium text-slate-600 hover:text-primary hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            <Button asChild variant="hero" onClick={() => setOpen(false)} className="w-full py-3 rounded-full mt-2">
              <Link href="/contact" className="flex items-center justify-center gap-2">
                <span>Get Free Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

