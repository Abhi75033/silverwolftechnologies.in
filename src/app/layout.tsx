import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { defaultSEO } from "@/lib/seo";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { AdSenseFooterBanner } from "@/components/AdSenseFooterBanner";
import { AdSenseScript } from "@/components/AdSenseScript";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { RouteProgress } from "@/components/site/RouteProgress";
import { Analytics } from "@vercel/analytics/react";
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
        {/*
          hreflang tags were previously hardcoded to the homepage here in the
          root layout, so all ~6,400 pages declared the homepage as their
          language alternate — a conflicting signal alongside their own
          canonical. Removed: this is a single-language (en-IN) site and the
          `lang` attribute plus per-page canonicals already cover it.
        */}
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM-readable site summary" />
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <SchemaMarkup type="organization" />
        <SchemaMarkup type="localBusiness" />
        <SchemaMarkup type="website" />


        
        <TooltipProvider>
          {/* Slim top progress bar on route changes */}
          <RouteProgress />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 page-transition-enter">{children}</main>
            <AdSenseFooterBanner />
            <Footer />
            <WhatsAppButton />
          </div>
          <Toaster />
          <Sonner />
          <Analytics />
        </TooltipProvider>
        {/* Google AdSense — loads only on ad-eligible pages (see lib/adsense.ts) */}
        <AdSenseScript />
        {/* Google Analytics (GA4) */}
        <Script
          id="google-analytics-loader"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FP5DCG2C90"
        />
        <Script
          id="google-analytics-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FP5DCG2C90');
            `,
          }}
        />
        {/* Microsoft Clarity - User behavior analytics */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x68rj8i1yf");
            `,
          }}
        />
      </body>
    </html>
  );
}
