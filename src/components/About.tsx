import { Building2, MapPin, Heart, Shield, Star } from "lucide-react";

const About = () => {
  const values = [
    { icon: Heart, title: "Faith", desc: "Every project is built on the same values that guided our founder in Madina Munawwara." },
    { icon: Shield, title: "Integrity", desc: "Honest pricing, transparent timelines, and no compromises on quality." },
    { icon: Star, title: "Excellence", desc: "We hold ourselves to the same standard as the international projects our founder managed in Saudi Arabia." },
  ];

  const milestones = [
    { year: "2001", label: "Founded in Peshawar" },
    { year: "2008", label: "First commercial plaza delivered" },
    { year: "2015", label: "Expanded to mosque & community projects" },
    { year: "2025", label: "120+ projects across KPK" },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            About Al-Madina Constructions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in construction and real estate, committed to
            shaping Peshawar's landscape with excellence.
          </p>
        </div>

        {/* Two-column: Story + Values */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-14 items-start">
          {/* Story */}
          <div>
            <h3 className="text-2xl font-bold mb-5 text-secondary">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The story of Al-Madina Al-Munawwara Constructions & Builders began far from Pakistan — in the Kingdom of Saudi Arabia. Our founder started his career there as a Site Manager, gaining first-hand experience in every stage of construction. It was during a project completed in the sacred city of Madina Munawwara that the dream of building something lasting and meaningful truly began.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Upon returning to Pakistan, that vision took form as Al-Madina Al-Munawwara Constructions & Builders — a company founded on faith, hard work, and a deep respect for the craft of construction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, with over 24 years of experience, Al-Madina continues to serve clients across Khyber Pakhtunkhwa, combining traditional values with modern construction practices. Every project reflects our core belief — that building is not just about concrete and steel, but about creating spaces that inspire trust, comfort, and pride.
            </p>

            {/* Origin badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Founded in Peshawar, inspired by Madina Munawwara
            </div>
          </div>

          {/* Values + Timeline */}
          <div className="space-y-8">
            {/* Core values */}
            <div>
              <h3 className="text-2xl font-bold mb-5 text-secondary">Our Values</h3>
              <div className="space-y-4">
                {values.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-1">{title}</h4>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Milestones */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-secondary">Key Milestones</h3>
              <div className="relative pl-4 border-l-2 border-primary/30 space-y-4">
                {milestones.map(({ year, label }) => (
                  <div key={year} className="flex items-start gap-3">
                    <div className="absolute -left-[9px] w-4 h-4 rounded-full bg-primary border-2 border-background mt-0.5" />
                    <div className="pl-4">
                      <span className="text-primary font-bold text-sm">{year}</span>
                      <p className="text-sm text-muted-foreground">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
