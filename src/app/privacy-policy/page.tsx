import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/legal/LegalPage";
import { SITE } from "@/data/site";

/**
 * Privacy Policy — required before applying to Google AdSense, and expected by
 * visitors and Google's quality reviewers. Reflects what the site actually runs
 * today (GA4, Microsoft Clarity, Vercel Analytics, WhatsApp, Supabase for career
 * applications) plus the AdSense disclosures Google requires.
 *
 * Review this with your own advisor before relying on it — update it whenever
 * you add a new tool that collects data.
 */

const PATH = "/privacy-policy";
const TITLE = "Privacy Policy";
const DESCRIPTION =
  "How Silver Wolf Technologies collects, uses and protects information from website visitors, clients and job applicants, including cookies and analytics.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.domain}${PATH}` },
  openGraph: {
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Silver Wolf Technologies" }], title: `${TITLE} | ${SITE.name}`, description: DESCRIPTION, url: `${SITE.domain}${PATH}` },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title={TITLE} path={PATH} updated="27 September 2026">
      <p>
        This Privacy Policy explains how {SITE.name} (&quot;we&quot;, &quot;us&quot;) collects, uses and
        protects personal information when you visit{" "}
        <Link href="/">{SITE.domain.replace("https://", "")}</Link>, contact us, or apply for a role with us.
      </p>

      <h2>Who we are</h2>
      <p>
        {SITE.name} is a digital agency based in Murbad, Maharashtra 421401, India. You can reach us at{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or {SITE.phone}.
      </p>

      <h2>Information you give us</h2>
      <ul>
        <li>
          <strong>Enquiries:</strong> your name, email address, phone number and message when you use our contact
          form, email us, call us or message us on WhatsApp.
        </li>
        <li>
          <strong>Job and internship applications:</strong> your name, email, phone number, college, semester or year,
          portfolio or LinkedIn link, the role you are applying for and how you heard about us. Applications are sent to
          our hiring team (including via WhatsApp) and may be stored in our secure database.
        </li>
        <li>
          <strong>Client projects:</strong> business and contact details you share while we quote for or deliver a
          project.
        </li>
      </ul>

      <h2>Information collected automatically</h2>
      <ul>
        <li>
          <strong>Google Analytics 4</strong> measures how visitors use the site — pages viewed, approximate location,
          device and browser — using cookies such as <code>_ga</code>.
        </li>
        <li>
          <strong>Microsoft Clarity</strong> records clicks, scrolling and page interactions (including session
          replays and heatmaps) so we can improve the site. Clarity masks sensitive text by default and uses cookies such
          as <code>_clck</code> and <code>_clsk</code>.
        </li>
        <li>
          <strong>Vercel Web Analytics</strong> provides aggregated, anonymous visit counts.
        </li>
        <li>Standard server logs (IP address, browser type, pages requested) kept by our hosting provider for security.</li>
      </ul>

      <h2>Advertising (Google AdSense)</h2>
      <p>We may show advertisements served by Google AdSense on some pages of this website.</p>
      <ul>
        <li>
          Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this website or
          other websites.
        </li>
        <li>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to
          this site and/or other sites on the Internet.
        </li>
        <li>
          You can opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>,
          or opt out of some third-party vendors&apos; use of cookies at{" "}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">aboutads.info</a>.
        </li>
        <li>
          Learn more about{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
            how Google uses information from sites that use its services
          </a>
          .
        </li>
      </ul>
      <p>
        Visitors from the European Economic Area, the UK and Switzerland will be asked for consent before personalised
        ads or non-essential cookies are used.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To reply to enquiries, prepare quotes and deliver projects.</li>
        <li>To review job and internship applications and contact applicants.</li>
        <li>To understand how the website is used and improve it.</li>
        <li>To keep the website secure and prevent misuse.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Who we share it with</h2>
      <p>
        Only with service providers that help us run the website and our business — for example our hosting provider
        (Vercel), database provider (Supabase), analytics providers (Google, Microsoft), advertising partners (Google)
        and messaging (WhatsApp/Meta) — and where required by law. These providers may process data outside India under
        their own privacy and security commitments.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry and project information for as long as needed to serve you and meet legal requirements, and job
        applications for up to 12 months unless you ask us to delete them sooner. Analytics data is kept according to
        each provider&apos;s retention settings.
      </p>

      <h2>Your rights and choices</h2>
      <p>
        Under India&apos;s Digital Personal Data Protection Act, 2023 — and, where they apply to you, laws such as the
        GDPR — you can ask to access, correct or delete your personal information, or withdraw consent you have given.
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond within a reasonable time. You can
        also block or delete cookies in your browser settings.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect your information, including encrypted (HTTPS)
        connections. No method of transmission or storage is completely secure.
      </p>

      <h2>Children</h2>
      <p>
        This website is not directed at children under 18, and we do not knowingly collect their personal information.
      </p>

      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The &quot;Last updated&quot; date above shows the latest version.</p>

      <h2>Contact and grievances</h2>
      <p>
        For any privacy question or complaint, contact {SITE.name}, Murbad, Maharashtra 421401, India —{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, {SITE.phone}. See also our <Link href="/terms">Terms of Use</Link>.
      </p>
    </LegalPage>
  );
}
