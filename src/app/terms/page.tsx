import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/data/site";

/**
 * Terms of Use for the website. Project work itself is governed by each
 * client's proposal / agreement. Review with your own advisor before relying
 * on it.
 */

const PATH = "/terms";
const TITLE = "Terms of Use";
const DESCRIPTION =
  "The terms that apply to using the Silver Wolf Technologies website, its content, and information about our services and careers.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.domain}${PATH}` },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Silver Wolf Technologies" }], title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, url: `${SITE.domain}${PATH}` },
};

export default function TermsPage() {
  return (
    <LegalPage title={TITLE} path={PATH} updated="27 September 2026">
      <p>
        These Terms of Use apply to your use of the {SITE.name} website. By using the site you agree to them. If you do
        not agree, please do not use the site.
      </p>

      <h2>About our services</h2>
      <p>
        Information on this website about our services, timelines and pricing is general and may change. Any project we
        take on is governed by a written proposal or agreement with the client, which takes priority over anything on
        this website.
      </p>

      <h2>Using the website</h2>
      <ul>
        <li>Use the site only for lawful purposes.</li>
        <li>Do not try to break, overload, scrape at scale or gain unauthorised access to the site or its systems.</li>
        <li>Do not submit false information through our forms.</li>
      </ul>

      <h2>Content and intellectual property</h2>
      <p>
        The text, design, graphics and code of this website belong to {SITE.name} unless stated otherwise. You may share
        links to our pages, but you may not copy or republish substantial parts of the site without our written
        permission. Client names, logos and project screenshots shown in our portfolio belong to their respective owners.
      </p>

      <h2>Careers and internships</h2>
      <p>
        Submitting an application does not guarantee an interview, offer or placement. Role details may change or be
        withdrawn at any time.
      </p>

      <h2>Links to other websites</h2>
      <p>
        The site may link to third-party websites (for example WhatsApp, LinkedIn or client websites). We are not
        responsible for their content or privacy practices.
      </p>

      <h2>Advertising</h2>
      <p>
        Some pages may display advertisements from third parties such as Google AdSense. We do not endorse advertised
        products or services. See our <Link href="/privacy-policy">Privacy Policy</Link> for how advertising cookies work.
      </p>

      <h2>No warranty</h2>
      <p>
        We work to keep the website accurate and available, but it is provided &quot;as is&quot; without warranties of any
        kind.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {SITE.name} is not liable for any indirect or consequential loss arising from your
        use of this website.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts of Maharashtra, India have jurisdiction.</p>

      <h2>Changes</h2>
      <p>We may update these terms from time to time. The &quot;Last updated&quot; date above shows the latest version.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone}.
      </p>
    </LegalPage>
  );
}
