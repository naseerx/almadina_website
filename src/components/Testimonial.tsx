import React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User as UserIcon } from "lucide-react";

const testimonials = [
    {
    id: 1,
    name: "Masjid Quba Committee",
    role: "Committee",
    quote:
      "On behalf of the committee, we appreciate Al-Madina's dedication and respectful handling of our mosque renovation.",
  },
  {
    id: 2,
    name: "Madni Masjid Committee",
    role: "Committee",
    quote:
      "The project was completed with care and to our required standards; the community is grateful for their work.",
  },
    {
    id: 3,
    name: "Shehriyar Khalil",
    role: "Commercial Plaza Owner",
    quote:
      "The project was delivered with exceptional attention to detail and met all our requirements. Their professionalism and commitment to quality made the entire process smooth and reliable",
  },
  {
    id: 4,
    name: "Haji Abid Khan",
    role: "Client",
    quote:
      "Al-Madina delivered high-quality work on time — professional team and excellent communication.",
  },
  {
    id: 5,
    name: "Mumraiz Khan & Brothers",
    role: "Clients",
    quote:
      "We are very satisfied with the experties and the attention to detail throughout our project.",
  },
  {
    id: 6,
    name: "Meewa Jan Khan",
    role: "Clients",
    quote:
      "The team was respectful, efficient, and the final result exceeded our expectations.",
  },
  {
    id: 7,
    name: "Rahat Khan",
    role: "Client",
    quote:
      "Transparent pricing and reliable delivery — highly recommended for any residential project.",
  },
  {
    id: 8,
    name: "Shahad Ali Khan",
    role: "Client",
    quote:
      "Professional supervision and timely updates made the process smooth and stress-free.",
  },
   {
    id: 9,
    name: "Farman Khan",
    role: "Client",
    quote:
      "A well-managed project delivered with quality, precision, and professionalism. We are very pleased with the results",
  },
  
  {
    id: 10,
    name: "Meer Alam Khan",
    role: "Client",
    quote:
      "Top-notch workmanship and strong project management from start to finish.",
  },

];

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What clients say about our work — honest feedback from people we've worked with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <Card key={t.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border">
              <CardContent className="pt-6 pb-2">
                <p className="text-sm text-muted-foreground mb-6">{t.quote}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-sm font-semibold">
                      <UserIcon className="w-5 h-5 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
