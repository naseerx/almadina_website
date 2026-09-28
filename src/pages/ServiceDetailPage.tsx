import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";
import NotFound from "./NotFound";
import { PROCESS, SERVICES, findService } from "@/data/services";
import { projects } from "@/data/projects";
import { ClosingCta, ContactButtons, SERVICE_ICONS, ServiceShell } from "@/components/services/serviceUi";

const STATS = [
  { value: "24+", label: "Years of experience" },
  { value: "120+", label: "Projects across KPK" },
  { value: "75+", label: "Skilled team members" },
];

const ServiceDetailPage = () => {
  const { slug = "" } = useParams();
  const service = findService(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  if (!service) return <NotFound />;

  const work = projects
    .filter((p) => service.projectCategories.includes(p.category))
    .sort((a, b) => b.year - a.year);
  // Distinct neighbourhoods, case-insensitive, most recent first.
  const locations = [
    ...new Map(work.map((p) => p.location.replace(/, Peshawar$/i, "")).map((l) => [l.toLowerCase(), l])).values(),
  ];
  const related = service.related.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
  const Icon = SERVICE_ICONS[service.slug];

  return (
    <ServiceShell
      hero={
        <>
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-white/60 mb-6">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/services" className="hover:text-white">Services</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/90">{service.name}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            {Icon && (
              <span className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-5">{service.heading}</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mb-8">{service.intro[0]}</p>
          <ContactButtons topic={service.name.toLowerCase()} light />
        </>
      }
    >
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl grid md:grid-cols-5 gap-10">
          <div className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed text-lg">
            {service.intro.slice(1).map((p) => (
              <p key={p}>{p}</p>
            ))}
            {work.length > 0 && (
              <p>
                On this site you can see {work.length} of these projects
                {locations.length > 0 && <> — in {locations.slice(0, 4).join(", ")}{locations.length > 4 ? " and more" : ""}</>}.
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-bold text-secondary mb-4">What's included</h2>
              <ul className="space-y-3">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="py-14 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary">Our {service.name.toLowerCase()} work</h2>
              <Link to="/projects" className="inline-flex items-center gap-1 text-primary font-medium hover:underline">
                See all projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {work.slice(0, 6).map((p) => (
                <figure key={`${p.title}-${p.location}-${p.year}`} className="rounded-xl overflow-hidden bg-card shadow-sm">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={p.images[0]}
                      alt={`${p.title} — ${p.location}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="p-4">
                    <p className="font-semibold text-secondary">{p.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {p.location}
                      {!p.hideYear && ` · ${p.year}`}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-14 md:py-20">
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
          <dl className="grid grid-cols-3 gap-4 mt-10 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-3xl md:text-4xl font-bold text-primary">{s.value}</dd>
                <dd className="text-sm text-muted-foreground">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {related.length > 0 && (
        <section className="pb-14 md:pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-secondary mb-6">Related services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r!.slug}
                  to={`/services/${r!.slug}`}
                  className="group rounded-xl border p-5 hover:border-primary transition-colors"
                >
                  <p className="font-semibold text-secondary group-hover:text-primary">{r!.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{r!.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <ClosingCta topic={service.name.toLowerCase()} />
    </ServiceShell>
  );
};

export default ServiceDetailPage;
