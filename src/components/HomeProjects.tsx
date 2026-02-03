import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "./ui/dialog";
import abid from "@/assets/abid.jpg";
import house19 from "@/assets/19.jpg";
import house46 from "@/assets/46.jpg";
import house57 from "@/assets/57.jpg";
import house30 from "@/assets/30.jpg";
import house111Main from "@/assets/111b.jpg";
import house111a from "@/assets/111.jpg";
import house111b from "@/assets/111c.jpg";
import house111c from "@/assets/111c.jpg";
import house111cd from "@/assets/111f.jpg";
import house112 from "@/assets/112.jpg";
import commercial5 from "@/assets/C5.jpg";
import commercial6 from "@/assets/C6.jpg";
import commercialBilal from "@/assets/Cbilal.jpg";
import commercial3 from "@/assets/C3.jpg";
import commercial2 from "@/assets/C2.jpg";
import commercial1 from "@/assets/C1.jpg";
import madaniMasjid from "@/assets/mosques/d1.jpg";
import madaniMasjid2 from "@/assets/mosques/d2.jpg";
import madaniMasjid3 from "@/assets/mosques/d3.jpg";
import madaniMasjid4 from "@/assets/mosques/d4.jpg";
import madaniMasjid5 from "@/assets/mosques/d5.jpg";
import masjidQuba from "@/assets/mosques/c1.jpg";
import masjidQuba2 from "@/assets/mosques/c2.jpg";
import masjidQuba3 from "@/assets/mosques/c3.jpg";
import masjidQuba4 from "@/assets/mosques/c4.jpg";
import masjidQuba5 from "@/assets/mosques/c5.jpg";
import masjidQuba6 from "@/assets/mosques/c6.jpg";
import masjidQuba7 from "@/assets/mosques/c7.jpg";
import masjidQuba8 from "@/assets/mosques/c8.jpg";
import darulEmanPeshawar1 from "@/assets/mosques/a1.jpeg";
import darulEmanPeshawar2 from "@/assets/mosques/a2.jpeg";
import darulEmanPeshawar3 from "@/assets/mosques/a3.jpeg";
import darulEmanPeshawar4 from "@/assets/mosques/a4.jpg";
import karbogha from "@/assets/mosques/b1.jpg";
import karbogha1 from "@/assets/mosques/b2.jpeg";
import house63 from "@/assets/63.jpg";

type ProjectCategory = "all" | "residential" | "commercial" | "mosques" | "street";

interface ProjectsProps {
  limitProjects?: boolean;
}

const HomeProjects = ({ limitProjects = true }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<{ projectIndex: number; imageIndex: number } | null>(null);

  const projects = [
    {
      images: [abid],
      title: "25 Marla",
      location: "Sufaid Sang Road Mulazai, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },
    {
      images: [house111Main, house111a, house111b, house111c, house111cd],
      title: "45 Marla 4 Homes",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },

    {
      images: [house112],
      title: "7 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },
    {
      images: [house30],
      title: "Almadina Street 4",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "street" as const,
      year: 2012,
      isFeatured: false,
    },

    {
      images: [commercial5, commercial6, commercial1],
      title: "13 Marla Plaza",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2024,
      isFeatured: true,
    },
    {
      images: [commercial6],
      title: "5.80 Marla",
      location: "Green Cottage, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2023,
      isFeatured: true,
    },
    {
      images: [house19],
      title: "Almadina Street 6",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "street" as const,
      year: 2011,
      isFeatured: false,
    },
    {
      images: [house46],
      title: "Al Madina street 1",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "street" as const,
      year: 2014,
      isFeatured: false,
    },
    {
      images: [commercialBilal, commercial2, commercial3],
      title: "11.40 Marla Plaza",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      images: [commercial3],
      title: "15 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      images: [house57, house46, house19],
      title: "Al Madina street 2",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "street" as const,
      year: 2016,
      isFeatured: false,
    },
    {
      images: [commercial2],
      title: "7 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2021,
      isFeatured: true,
    },

    {
      images: [commercial1],
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2016,
      isFeatured: true,
    },
        {
      images: [karbogha, karbogha1],
      title: "Darul-Eman Wal-Taqwa Karbogha Sharif (Caretaking)",
      location: "Karbogha Sharif, Peshawar",
      description: "Mosque and Islamic Center",
      category: "mosques" as const,
      year: 2018,
      hideYear: true,
      isFeatured: true,
    },
      {
      images: [darulEmanPeshawar1, darulEmanPeshawar2, darulEmanPeshawar3, darulEmanPeshawar4],
      title: "Darul-Eman Wal-Taqwa Peshawar (Caretaking)",
      location: "Chamkani, Peshawar",
      description: "Mosque and Islamic Center",
      category: "mosques" as const,
      year: 2017,
      hideYear: true,
      isFeatured: true,
    },
    {
      images: [madaniMasjid, madaniMasjid2, madaniMasjid3, madaniMasjid4, madaniMasjid5],
      title: "Madani Masjid (Caretaker)",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosques" as const,
      year: 2016,
      hideYear: true,
      isFeatured: true,
    },
    {
      images: [masjidQuba, masjidQuba2  , masjidQuba3, masjidQuba4, masjidQuba5, masjidQuba6, masjidQuba7, masjidQuba8],
      title: "Msjid Quba",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "mosques" as const,
      year: 2015,
      hideYear: true,
      isFeatured: true,
    },
  

    {
      images: [house63],
      title: "10 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2017,
      isFeatured: true,
    },
  ];

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

  // Since we only have featured projects now, we can just use filteredProjects directly
  // or keep the check if we want to be safe, but the array only contains featured ones.
  const displayedProjects = filteredProjects;

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="w-full text-center  mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">
                Our Projects
              </h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7x3 mx-auto">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border cursor-pointer"
              onClick={() => setSelectedProject({ projectIndex: index, imageIndex: 0 })}
            >
              <div className="h-[500px] w-[500px] overflow-hidden">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-full flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  {!project.hideYear && (
                    <span className="text-lg text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </div>
                <p className="text-sm text-primary font-medium mb-2">
                  {project.location}
                </p>
                {project.images.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    {project.images.length} images available
                  </p>
                )}
              </CardContent>
            </Card>
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
                  alt="Project full view"
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
                      <ChevronLeft className="h-8 w-8 text-black" />
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
                      <ChevronRight className="h-8 w-8 text-black" />
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

export default HomeProjects;
