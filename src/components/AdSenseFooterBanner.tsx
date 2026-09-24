"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ADSENSE_CLIENT,
  ADSENSE_SLOT,
  ADSENSE_CONFIGURED,
  isAdEligiblePath,
} from "@/lib/adsense";

// Declare adsbygoogle property on the window object for TypeScript
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * AdSenseFooterBanner
 *
 * Renders a responsive AdSense banner above the footer — but only on pages
 * that are eligible for ads (see src/lib/adsense.ts).
 *
 * Two deliberate behaviours:
 *   • Renders nothing when NEXT_PUBLIC_ADSENSE_SLOT is unset. Previously the
 *     slot was the placeholder string "YOUR_AD_SLOT_ID_HERE", so every unit
 *     was invalid. An absent ad unit is strictly better than a broken one.
 *   • Renders nothing on the template-generated locality pages. AdSense
 *     prohibits ads on auto-generated/thin content, which is what the
 *     "Low value content" review verdict was pointing at.
 */
export function AdSenseFooterBanner() {
  const pathname = usePathname();
  const eligible = isAdEligiblePath(pathname);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!eligible) return;

    try {
      // Initialize the ad slot by pushing to the adsbygoogle queue. If the
      // script is blocked (ad blocker) the push fails and is caught safely.
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (err) {
      console.warn(
        "Google AdSense banner initialization failed (likely blocked):",
        err
      );
    }
  }, [pathname, eligible]);

  // No slot configured, or this page is not ad-eligible → render nothing.
  if (!ADSENSE_CONFIGURED || !eligible) return null;

  return (
    <div
      // Keying on pathname forces a fresh <ins> element on navigation, which
      // avoids "Duplicate AdSense initialization on the same DOM element".
      key={pathname}
      className="w-full flex justify-center py-8 px-4 bg-transparent border-t border-border/10 my-4"
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl overflow-hidden flex justify-center items-center min-h-[90px] md:min-h-[100px] lg:min-h-[250px]">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ADSENSE_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
