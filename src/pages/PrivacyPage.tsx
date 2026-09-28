import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { SITE, BUSINESS } from "@/seo";

// Lists only services the site really uses (see TODO_SEO.md, Phase 0 audit).
// Update this page whenever a new third-party service, form or analytics tool
// is added.
const LAST_UPDATED = "28 September 2026";

const phoneDisplay = "+92 333 9221258";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="mb-8">
    <h2 className="text-xl md:text-2xl font-bold text-secondary mb-3">{title}</h2>
    <div className="space-y-3 text-muted-foreground leading-relaxed">{children}</div>
  </section>
);

const PrivacyPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:text-primary">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: {LAST_UPDATED}</p>

        <Section title="Who we are">
          <p>
            This website ({SITE.url.replace("https://", "")}) is run by {SITE.name},{" "}
            {BUSINESS.streetAddress}, {BUSINESS.addressLocality} {BUSINESS.postalCode}, Pakistan.
          </p>
          <p>
            Phone / WhatsApp: <a href={`tel:${BUSINESS.telephone}`} className="text-primary hover:underline">{phoneDisplay}</a>
            <br />
            Email: <a href={`mailto:${BUSINESS.email}`} className="text-primary hover:underline break-all">{BUSINESS.email}</a>
          </p>
        </Section>

        <Section title="In short">
          <ul className="list-disc pl-5 space-y-1">
            <li>You don't need an account to use this website.</li>
            <li>We don't use analytics, advertising or tracking tools, and our website sets no cookies.</li>
            <li>The contact form does not store or send your details through this website — it opens WhatsApp.</li>
            <li>Some pages load content from other companies (such as a Google map), which is explained below.</li>
          </ul>
        </Section>

        <Section title="When you contact us">
          <p>
            When you fill in the contact form and press send, your browser opens WhatsApp with your name, phone
            number and message already typed in. Nothing is sent until you send it yourself in WhatsApp. The message
            is then delivered through WhatsApp (operated by Meta) under WhatsApp's own privacy policy. The WhatsApp
            button, phone number and email address on the site work the same way: they open your own app.
          </p>
          <p>
            We use the details you send us only to answer your enquiry and, if you become a client, to carry out your
            project. We don't sell or share them for marketing.
          </p>
        </Section>

        <Section title="Hosting">
          <p>
            The website is hosted by Vercel. Like any web server, it processes technical information such as your IP
            address, browser type and the pages you request, so that the site can be delivered and protected from
            abuse.
          </p>
        </Section>

        <Section title="Content from other services">
          <p>
            <strong className="text-foreground">Google Maps:</strong> the contact section shows our location with an
            embedded Google map. When that part of the page loads, your browser connects to Google, which receives your
            IP address and may set its own cookies under Google's privacy policy.
          </p>
          <p>
            <strong className="text-foreground">YouTube:</strong> some project pages include embedded YouTube videos.
            Loading them connects your browser to YouTube (Google) in the same way.
          </p>
          <p>
            <strong className="text-foreground">Fonts:</strong> the main website font is served from our own site. The
            Urdu font used on the client project tracker and staff screens is loaded from Google Fonts.
          </p>
        </Section>

        <Section title="Client project tracker">
          <p>
            Clients can receive a private link to follow the progress of their project. That page loads project details
            from Supabase (our database provider) and progress photos from Cloudinary (our image hosting provider); both
            receive your IP address when the page loads. These links are not listed in search engines.
          </p>
        </Section>

        <Section title="Staff login">
          <p>
            The staff area is used only by our team. Signing in is handled by Supabase, and the login session is stored
            in the browser's local storage on the staff member's device. Visitors to the public website are not affected.
          </p>
        </Section>

        <Section title="Your choices">
          <p>
            You can ask us what information we have from you (for example, messages you sent us) and ask us to correct
            or delete it. Contact us by phone, WhatsApp or email using the details above.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            If we change how the website handles information, we will update this page and the date at the top.
          </p>
        </Section>
      </div>
    </div>
  );
};

export default PrivacyPage;
