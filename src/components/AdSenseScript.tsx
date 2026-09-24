"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { ADSENSE_CLIENT, ADSENSE_CONFIGURED, isAdEligiblePath } from "@/lib/adsense";

/**
 * Loads the AdSense library only on ad-eligible pages.
 *
 * Gating the <ins> unit alone is not enough: if Auto Ads is switched on in the
 * AdSense dashboard, the loader script injects ads into *any* page it runs on.
 * That would put ads back onto the ~6,076 template-generated locality pages
 * and re-trigger the "Low value content" policy problem. Keeping the script
 * off those pages entirely is the only reliable guard.
 */
export function AdSenseScript() {
  const pathname = usePathname();

  if (!ADSENSE_CONFIGURED || !isAdEligiblePath(pathname)) return null;

  return (
    <Script
      id="google-adsense"
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
