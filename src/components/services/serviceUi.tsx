import type { ReactNode } from "react";
import { Building, Eye, Home, Paintbrush, Phone, Ruler, Store, type LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/seo";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "house-construction": Home,
  "commercial-construction": Store,
  "real-estate-development": Building,
  "renovation-interior-design": Paintbrush,
  "architecture-3d-design": Ruler,
  "supervision-joint-projects": Eye,
};

const WHATSAPP_NUMBER = BUSINESS.telephone.replace("+", "");
const PHONE_DISPLAY = "+92 333 9221258";

export const whatsappLink = (topic: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello! I'm interested in ${topic}. Could you please provide more information?`,
  )}`;

/** WhatsApp + call buttons used in the hero and closing sections. */
export const ContactButtons = ({ topic, light = false }: { topic: string; light?: boolean }) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold">
      <a href={whatsappLink(topic)} target="_blank" rel="noopener noreferrer">
        WhatsApp us
      </a>
    </Button>
    <Button
      asChild
      size="lg"
      variant="outline"
      className={
        light
          ? "border-white text-white bg-transparent hover:bg-white hover:text-secondary font-semibold"
          : "font-semibold"
      }
    >
      <a href={`tel:${BUSINESS.telephone}`}>
        <Phone className="w-4 h-4 mr-2" />
        {PHONE_DISPLAY}
      </a>
    </Button>
  </div>
);

/** Header + dark hero band (the header is transparent/white until scrolled) + footer. */
export const ServiceShell = ({ hero, children }: { hero: ReactNode; children: ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <section className="bg-secondary text-white pt-28 pb-14 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 max-w-5xl">{hero}</div>
    </section>
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export const ClosingCta = ({ topic }: { topic: string }) => (
  <section className="py-16 bg-secondary text-white">
    <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Talk to us about your project</h2>
        <p className="text-white/70">
          {BUSINESS.streetAddress}, {BUSINESS.addressLocality} · Sat–Thu, 9:00 AM – 6:00 PM
        </p>
      </div>
      <ContactButtons topic={topic} light />
    </div>
  </section>
);
