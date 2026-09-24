'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, SearchX } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12">
      <div className="container max-w-2xl text-center animate-fade-up">
        <div className="mx-auto w-20 h-20 bg-secondary/80 rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-lg shadow-black/20">
          <SearchX className="h-10 w-10 text-primary" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Error 404</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">Page not found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We couldn't find the page at <code className="bg-secondary/50 px-2 py-1 rounded text-primary">{pathname}</code>. 
          It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="hero" size="lg">
            <Link href="/">Return to Home <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="glass" size="lg">
            <Link href="/services">Browse Services</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
