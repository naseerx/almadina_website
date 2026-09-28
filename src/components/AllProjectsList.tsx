import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";

import { projects, type ProjectCategory as Category } from "@/data/projects";

type ProjectCategory = "all" | Category;

interface ProjectsProps {
  limitProjects?: boolean;
}

const AllProjectsList = ({ limitProjects = true }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<{ projectIndex: number; imageIndex: number } | null>(null);


  const filters: { label: string; value: ProjectCategory }[] = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Mosques", value: "mosques" },
    { label: "Street", value: "street" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Limit projects to 6 on home page and only show featured ones
  const displayedProjects = limitProjects
    ? filteredProjects.filter((project) => project.isFeatured)
    : filteredProjects;



  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="w-full text-center  mb-4 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
                Our Projects
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A showcase of our commitment to excellence and quality
                craftsmanship across various sectors.
              </p>
            </div>
            {limitProjects && (
              <Link to="/projects">
                <Button
                  variant="outline"
                  className="group gap-2 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  View All
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
            )}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.value)}
                className={
                  activeFilter === filter.value
                    ? "bg-primary hover:bg-primary/90"
                    : ""
                }
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              onClick={() => setSelectedProject({ projectIndex: index, imageIndex: 0 })}
            >
              {/* Image */}
              <img
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Category badge */}
              <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full capitalize">
                {project.category}
              </span>

              {/* Multi-image indicator */}
              {project.images.length > 1 && (
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {project.images.length} photos
                </span>
              )}

              {/* Gradient overlay with info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
                    <p className="text-white/80 text-sm mt-0.5">{project.location}</p>
                  </div>
                  {!project.hideYear && (
                    <span className="text-white/70 text-sm font-medium flex-shrink-0 ml-2">{project.year}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Image Dialog with Navigation */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
            <DialogHeader className="absolute right-4 top-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            {selectedProject && (
              <div className="relative w-full">
                <img
                  src={displayedProjects[selectedProject.projectIndex]?.images[selectedProject.imageIndex]}
                  alt={`${displayedProjects[selectedProject.projectIndex]?.title} — photo ${selectedProject.imageIndex + 1}`}
                  className="w-full h-auto object-contain max-h-[80vh]"
                />

                {/* Navigation Controls */}
                {displayedProjects[selectedProject.projectIndex]?.images.length > 1 && (
                  <>
                    {/* Previous Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={() => {
                        setSelectedProject({
                          projectIndex: selectedProject.projectIndex,
                          imageIndex:
                            selectedProject.imageIndex === 0
                              ? displayedProjects[selectedProject.projectIndex].images.length - 1
                              : selectedProject.imageIndex - 1,
                        });
                      }}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>

                    {/* Next Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={() => {
                        setSelectedProject({
                          projectIndex: selectedProject.projectIndex,
                          imageIndex:
                            selectedProject.imageIndex === displayedProjects[selectedProject.projectIndex].images.length - 1
                              ? 0
                              : selectedProject.imageIndex + 1,
                        });
                      }}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {selectedProject.imageIndex + 1} / {displayedProjects[selectedProject.projectIndex].images.length}
                    </div>
                  </>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {displayedProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found in this category yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllProjectsList;
