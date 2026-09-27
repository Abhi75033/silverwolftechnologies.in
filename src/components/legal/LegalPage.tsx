import Breadcrumb from "@/components/Breadcrumb";

/**
 * Shared layout for the legal pages (Privacy Policy, Terms). Plain, readable
 * prose — these pages are required for AdSense and are read by reviewers.
 */
export default function LegalPage({
  title,
  path,
  updated,
  children,
}: {
  title: string;
  path: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-36 pb-20">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <Breadcrumb
            items={[
              { name: "Home", href: "/" },
              { name: title, href: path },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{title}</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: {updated}</p>
          <div className="space-y-6 text-muted-foreground leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
