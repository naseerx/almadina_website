import { Building, Home, Paintbrush, Ruler, Users, Eye, MessageSquare, Hammer, KeyRound } from "lucide-react";
import { Button } from "./ui/button";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Construction Services",
      description: "Residential, Commercial, Grey Structure, and Finishing works with a focus on durability.",
    },
    {
      icon: Home,
      title: "Real Estate Development",
      description: "Creating modern housing projects and commercial plazas that redefine urban living.",
    },
    {
      icon: Paintbrush,
      title: "Renovation & Design",
      description: "Transforming spaces with expert remodeling, painting, flooring, and interior design.",
    },
    {
      icon: Ruler,
      title: "Architecture & Design",
      description: "Innovative floor plans, stunning 3D designs, and sustainable landscaping services.",
    },
    {
      icon: Users,
      title: "Joined Services",
      description: "Collaborative project delivery where we partner with clients and contractors for joint execution and shared responsibility.",
    },
    {
      icon: Eye,
      title: "Supervision Only",
      description: "Professional site supervision and quality assurance — we oversee execution while you manage procurement and contracting.",
    },
  ];

  const steps = [
    { icon: MessageSquare, step: "01", title: "Consultation", desc: "We discuss your vision, requirements, and budget." },
    { icon: Hammer, step: "02", title: "Planning & Execution", desc: "Our team designs, schedules, and builds with precision." },
    { icon: KeyRound, step: "03", title: "Handover", desc: "We deliver a finished project that exceeds expectations." },
  ];

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Services</h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            Comprehensive solutions for all your construction and design needs,
            delivered with precision and expertise.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const num = String(index + 1).padStart(2, "0");
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Faded number */}
                <span className="absolute top-4 right-5 text-6xl font-black text-white/5 group-hover:text-primary/10 transition-colors select-none leading-none">
                  {num}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{service.description}</p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-500" />
              </div>
            );
          })}
        </div>

        {/* How We Work */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-center text-white mb-8">How We Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {step}
                  </span>
                </div>
                <h4 className="font-bold text-white mb-1">{title}</h4>
                <p className="text-sm text-white/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-10"
          >
            Get a Free Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
