import { useEffect, useRef, useState } from "react";
import { Search, MapPin, Home, Play, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonial from "@/components/Testimonial";
import HomeProjects from "@/components/HomeProjects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-house.jpg";
import propertyImage from "@/assets/111b.jpg";

/**
 * EXPERIMENTAL home screen — served at /new.
 *
 * Standalone copy so the live home page (src/pages/Index.tsx at "/") stays
 * untouched. Modeled on the "EstateNest"-style reference: full-bleed hero
 * photo + search bar + floating property card, then a "Reliable Specialists"
 * band with a stats row, followed by the existing page sections.
 *
 * Rollback = delete this file and its <Route path="/new"> in App.tsx.
 */

const HeroExperimental = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Darken left + bottom so text stays legible over any photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-secondary/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pb-16 pt-32 w-full">
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-end">
          {/* Left: headline + search */}
          <div className="text-white animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-sm font-medium mb-6">
              <Home className="w-4 h-4 text-primary" />
              Trusted builders in Peshawar since 2000
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Build Your
              <br />
              Perfect Home with{" "}
              <span className="text-primary">Almadina</span>
            </h1>
            <p className="text-lg md:text-xl text-white/85 max-w-xl mb-8">
              Smart, simple and honest real estate services that help you discover
              the homes that truly fit your needs.
            </p>

            {/* Search / filter bar */}
            <div className="bg-white rounded-2xl shadow-large p-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-1 px-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search by location, project or area…"
                  className="w-full bg-transparent py-3 text-secondary placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <Button
                onClick={() => scrollTo("#projects")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Right: floating property card */}
          <div className="hidden lg:block justify-self-end animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            <div className="bg-white rounded-2xl shadow-large p-3 w-72">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={propertyImage}
                  alt="45 Marla 4 Homes — Executive Lodges, Peshawar"
                  className="w-full h-40 object-cover"
                />
                <button
                  aria-label="Play project tour"
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Play className="w-5 h-5 text-primary fill-primary ml-0.5" />
                </button>
              </div>
              <div className="pt-3 px-1">
                <p className="text-xs text-muted-foreground">Featured Project</p>
                <p className="font-semibold text-secondary">45 Marla 4 Homes</p>
                <p className="text-sm text-primary font-medium">Executive Lodges, Peshawar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecialistsExperimental = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const stats = [
    { value: 24, suffix: "+", label: "Years of Experience" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
    { value: 120, suffix: "+", label: "Projects Successfully Built" },
    { value: 75, suffix: "+", label: "Skilled Team Members" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setIsVisible(true),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 900;
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCounts(stats.map((s) => Math.floor(ease(p) * s.value)));
      if (p < 1) raf = requestAnimationFrame(loop);
      else setCounts(stats.map((s) => s.value));
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  return (
    <section ref={ref} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Heading row */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-tight">
            Your Reliable Real Estate{" "}
            <span className="text-primary">Specialists</span>
          </h2>
          <div>
            <p className="text-lg text-muted-foreground mb-6">
              We provide transparent guidance, verified projects and expert support
              to help you find and build a home you can trust for generations.
            </p>
            <Button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold gap-2"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border pt-12">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="text-5xl md:text-6xl font-black text-secondary mb-2 tabular-nums">
                {counts[i]}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-base text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const IndexExperimental = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroExperimental />
      <SpecialistsExperimental />
      <About />
      <Services />
      <Team />
      <Testimonial />
      <HomeProjects />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default IndexExperimental;
