"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Declare adsbygoogle property on the window object for TypeScript
declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * AdSenseFooterBanner component
 * Renders a responsive Google AdSense banner that is displayed above the footer.
 * Utilizes the pathname as a key to force component remounting on page changes,
 * preventing duplicate initialization issues and ensuring ads load on route transition.
 */
export function AdSenseFooterBanner() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure window is defined (client-side execution)
    if (typeof window === "undefined") return;

    try {
      // Initialize the ad slot by pushing an empty object to the adsbygoogle queue.
      // If the client has loaded adsbygoogle.js, this will trigger the ad to load.
      // If the script is blocked (e.g. by an ad blocker), adsbygoogle will either
      // be undefined or the push will fail, which is caught safely.
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
      } else {
        // Initialize it as an array if not present, so that if the script loads later it executes
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (err) {
      // Fail silently if an ad blocker prevents loading or initialization
      console.warn("Google AdSense banner initialization failed (likely blocked):", err);
    }
  }, [pathname]); // Re-run whenever the user navigates to a new page

  return (
    <div
      // Using pathname as the key forces React to unmount and remount this entire DOM tree
      // on route navigation. This ensures a brand new <ins> tag is created, resolving
      // the "Duplicate AdSense initialization on the same DOM element" issue.
      key={pathname}
      className="w-full flex justify-center py-8 px-4 bg-transparent border-t border-border/10 my-4"
      aria-hidden="true"
    >
      <div className="w-full max-w-7xl overflow-hidden flex justify-center items-center min-h-[90px] md:min-h-[100px] lg:min-h-[250px]">
        {/* 
          Google AdSense Responsive Unit
          To customize this unit for your specific banner:
          1. Replace the ca-pub-* client ID in layout.tsx if you use a different account.
          2. Replace the data-ad-slot value below with your actual Ad Slot ID.
        */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", textAlign: "center" }}
          data-ad-client="ca-pub-2747147036042508"
          // --- REPLACE THIS SLOT ID WITH YOUR ACTUAL AD SLOT ID ---
          data-ad-slot="YOUR_AD_SLOT_ID_HERE"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
