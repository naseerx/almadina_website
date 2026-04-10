import { useNavigate } from "react-router-dom";
import { ongoingProjectsData } from "@/data/ongoingProjects";
import { ArrowRight } from "lucide-react";

const OngoingProjects = () => {
  const navigate = useNavigate();

  return (
    <section id="ongoing-projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
            Ongoing Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the exciting projects currently under development, showcasing our commitment to innovation and excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {ongoingProjectsData.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              style={{ aspectRatio: "3/4" }}
              onClick={() => navigate(`/ongoing-project/${project.id}`)}
            >
              {/* Image */}
              <img
                src={project.thumbnail}
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* In Progress badge */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                In Progress
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Info — always visible at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{project.name}</h3>
                <p className="text-white/70 text-sm mb-3">{project.location}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  View Details <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
