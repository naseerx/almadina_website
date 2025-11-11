import { Building2 } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About Al-Madina Constructions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Your trusted partner in construction and real estate, committed to
              shaping Peshawar's landscape with excellence.
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 md:p-12 shadow-lg border border-border">
            <h3 className="text-2xl font-bold mb-4 text-primary">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              The story of Al-Madina Al-Munawwara Constructions & Builders began far from Pakistan — in the Kingdom of Saudi Arabia. Our founder started his career there as a Site Manager, taking on the challenge of overseeing major projects and gaining first-hand experience in every stage of construction. It was during one of these early projects, completed successfully in the sacred city of Madina Munawwara, that the dream of building something lasting and meaningful truly began.
              That experience not only shaped a career but inspired a lifelong vision — to bring the same level of discipline, excellence, and integrity back home. Upon returning to Pakistan, this vision took form as Al-Madina Al-Munawwara Constructions & Builders, a company founded on faith, hard work, and a deep respect for the craft of construction.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
Starting operations in Peshawar, what began as a modest effort has steadily grown into one of the city’s well-recognized names in the construction industry. From residential homes to commercial complexes and renovation works, our team has built a reputation for delivering quality workmanship, on-time completion, and honest service.
Today, with over 18 years of experience, Al-Madina Al-Munawwara continues to serve clients across Khyber Pakhtunkhwa and beyond, combining traditional values with modern construction practices. Every project we take on reflects our core belief — that building is not just about concrete and steel, but about creating spaces that inspire trust, comfort, and pride.

As we look ahead, we remain committed to the same principles that started our journey: faith, dedication, and excellence — building the future, one project at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
