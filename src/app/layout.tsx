import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { defaultSEO } from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { PageLoader } from "@/components/site/PageLoader";
import { RouteProgress } from "@/components/site/RouteProgress";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = defaultSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Murbad, Maharashtra, India" />
        <meta name="geo.position" content="19.2333;73.3833" />
        <meta name="ICBM" content="19.2333, 73.3833" />
        <link rel="alternate" hrefLang="en-in" href="https://www.silverwolftechnologies.in/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.silverwolftechnologies.in/" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <SchemaMarkup type="organization" />
        <SchemaMarkup type="localBusiness" />
        <SchemaMarkup type="website" />

        {/* Full-screen loading screen on initial visit */}
        <PageLoader />
        
        <TooltipProvider>
          {/* Slim top progress bar on route changes */}
          <RouteProgress />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 page-transition-enter">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
