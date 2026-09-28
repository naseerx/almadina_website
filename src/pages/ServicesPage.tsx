import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PROCESS, SERVICES } from "@/data/services";
import { ClosingCta, ContactButtons, SERVICE_ICONS, ServiceShell } from "@/components/services/serviceUi";

/** /services — overview of all services, linking to each service page. */
const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <ServiceShell
      hero={
        <>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-white/60 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">Services</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold mb-5">Construction Services in Peshawar</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8">
            Since 2001 we have built homes, commercial plazas and mosque and community projects in Peshawar. Choose a
            full construction contract, design only, renovation, or supervision of your own project.
          </p>
          <ContactButtons topic="your construction services" light />
        </>
      }
    >
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s) => {
            const Icon = SERVICE_ICONS[s.slug];
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="group rounded-2xl border p-6 hover:border-primary hover:shadow-md transition-all flex flex-col"
              >
                {Icon && (
                  <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </span>
                )}
                <h2 className="text-lg font-semibold text-secondary group-hover:text-primary mb-2">{s.name}</h2>
                <p className="text-muted-foreground text-sm flex-1">{s.summary}</p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="pb-14 md:pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-8">How we work</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {PROCESS.map((step) => (
              <li key={step.step} className="rounded-2xl border p-6">
                <span className="text-primary font-bold text-sm">{step.step}</span>
                <h3 className="text-lg font-semibold text-secondary mt-1 mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ClosingCta topic="your construction services" />
    </ServiceShell>
  );
};

export default ServicesPage;
