import { Building, Home, Paintbrush, Ruler } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const Services = () => {
  const services = [
    {
      icon: Building,
      title: "Construction Services",
      description:
        "Residential, Commercial, Grey Structure, and Finishing works with a focus on durability.",
    },
    {
      icon: Home,
      title: "Real Estate Development",
      description:
        "Creating modern housing projects and commercial plazas that redefine urban living.",
    },
    {
      icon: Paintbrush,
      title: "Renovation & Design",
      description:
        "Transforming spaces with expert remodeling, painting, flooring, and interior design.",
    },
    {
      icon: Ruler,
      title: "Architecture & Design",
      description:
        "Innovative floor plans, stunning 3D designs, and sustainable landscaping services.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive solutions for all your construction and design needs,
            delivered with precision and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardHeader className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-center">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
