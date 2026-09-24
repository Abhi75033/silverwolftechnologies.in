import type { Metadata } from "next";

/**
 * Private, passkey-gated admin view. It must never enter the index —
 * previously it inherited the site-wide canonical and was reported by
 * Search Console as an alternate of the homepage.
 */
export const metadata: Metadata = {
  title: "Career Responses",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function CareerResponsesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
