import { Button } from "./ui/button";
import heroImage from "@/assets/111b.jpg";
import { Award, Users, CheckCircle } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const badges = [
    { icon: Award, value: "24+", label: "Years Experience" },
    { icon: Users, value: "75+", label: "Team Members" },
    { icon: CheckCircle, value: "120+", label: "Projects Done" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-secondary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Building the Future of{" "}
          <span className="text-primary">Peshawar</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
          Quality, Trust & Innovation in Every Project.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          <Button
            onClick={() => scrollToSection("#contact")}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-lg px-8 py-6"
          >
            Get In Touch
          </Button>
          <Button
            onClick={() => scrollToSection("#projects")}
            size="lg"
            variant="outline"
            className="border-white text-white bg-transparent font-semibold text-lg px-8 py-6 hover:bg-white hover:text-secondary"
          >
            View Our Projects
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-500">
          {badges.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-primary leading-none">{value}</div>
                <div className="text-sm text-white/70">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
