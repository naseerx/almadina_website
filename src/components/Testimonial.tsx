import { Star } from "lucide-react";

const testimonials = [
  { id: 1, name: "Masjid Quba Committee", role: "Committee", quote: "On behalf of the committee, we appreciate Al-Madina's dedication and respectful handling of our mosque renovation." },
  { id: 2, name: "Madni Masjid Committee", role: "Committee", quote: "The project was completed with care and to our required standards; the community is grateful for their work." },
  { id: 3, name: "Shehriyar Khalil", role: "Commercial Plaza Owner", quote: "The project was delivered with exceptional attention to detail. Their professionalism and commitment to quality made the entire process smooth and reliable." },
  { id: 4, name: "Haji Abid Khan", role: "Client", quote: "Al-Madina delivered high-quality work on time — professional team and excellent communication." },
  { id: 5, name: "Mumraiz Khan & Brothers", role: "Clients", quote: "We are very satisfied with the expertise and the attention to detail throughout our project." },
  { id: 6, name: "Meewa Jan Khan", role: "Clients", quote: "The team was respectful, efficient, and the final result exceeded our expectations." },
  { id: 7, name: "Rahat Khan", role: "Client", quote: "Transparent pricing and reliable delivery — highly recommended for any residential project." },
  { id: 8, name: "Shahad Ali Khan", role: "Client", quote: "Professional supervision and timely updates made the process smooth and stress-free." },
  { id: 9, name: "Farman Khan", role: "Client", quote: "A well-managed project delivered with quality, precision, and professionalism. We are very pleased with the results." },
  { id: 10, name: "Meer Alam Khan", role: "Client", quote: "Top-notch workmanship and strong project management from start to finish." },
];

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Honest feedback from people we've had the privilege of working with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t) => {
            const initials = t.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
            return (
              <div
                key={t.id}
                className="group relative bg-background rounded-xl border-t-4 border-primary shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 overflow-hidden"
              >
                {/* Decorative quote mark */}
                <span className="absolute top-3 right-5 text-8xl font-black text-primary/10 leading-none select-none pointer-events-none">"</span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative z-10">
                  "{t.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">{initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-secondary">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
