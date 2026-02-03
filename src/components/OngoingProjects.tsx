import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { ongoingProjectsData } from "@/data/ongoingProjects";

const OngoingProjects = () => {
  const navigate = useNavigate();

  return (
    <section id="ongoing-projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Ongoing Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the exciting projects currently under development, showcasing our commitment to innovation and excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ongoingProjectsData.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border cursor-pointer"
              onClick={() => navigate(`/ongoing-project/${project.id}`)}
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {project.location}
                </p>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
