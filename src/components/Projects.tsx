import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import projectVilla from "@/assets/project-villa.jpg";
import projectPlaza from "@/assets/project-plaza.jpg";
import projectHome from "@/assets/project-home.jpg";
import projectMall from "@/assets/project-mall.jpg";
import projectApartments from "@/assets/project-apartments.jpg";
import projectOffice from "@/assets/project-office.jpg";

type ProjectCategory = "all" | "residential" | "commercial" | "mosques";

interface ProjectsProps {
  limitProjects?: boolean;
}

const Projects = ({ limitProjects = true }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");

  const projects = [
    {
      image: "1",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
    },
    {
      image: "2",
      title: "4 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
    },
    {
      image: "3",
      title: "4 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosques" as const,
      year: 2008,
    },
    {
      image: "4",
      title: "8 Marla",
      location: "Khwaja Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
    },
    {
      image: "5",
      title: "6 Marla",
      location: "Wazir Colony, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
    },
    {
      image: "6",
      title: "4 Marla",
      location: "Khusal Bagh, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
    },
    {
      image: "7",
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
    },
    {
      image: "8",
      title: "5 Kanal",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2009,
    },
    {
      image: "10",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2009,
    },
    {
      image: "13",
      title: "4 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
    },
    {
      image: "15",
      title: "3 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
    },
    {
      image: "17",
      title: "8 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
    },
    {
      image: "18",
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2011,
    },
    {
      image: "19",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
    },
    {
      image: "23",
      title: "3 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2011,
    },
    {
      image: "25",
      title: "4 Kanal",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2011,
    },
    {
      image: "26",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
    },
    {
      image: "28",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
    },
    {
      image: "32",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2012,
    },
    {
      image: "35",
      title: "5 Kanal",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
    },
    {
      image: "36",
      title: "3 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2013,
    },
    {
      image: "40",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2013,
    },
    {
      image: "46",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2013,
    },
    {
      image: "51",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2013,
    },
    {
      image: "52",
      title: "20 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2014,
    },
    {
      image: "53",
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2014,
    },
    {
      image: "55",
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2014,
    },
    {
      image: "56",
      title: "7 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosque" as const,
      year: 2015,
    },
  ];

  const filters: { label: string; value: ProjectCategory }[] = [
    { label: "All", value: "all" },
    { label: "Residential", value: "residential" },
    { label: "Commercial", value: "commercial" },
    { label: "Mosques", value: "mosques" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  // Limit projects to 6 on home page
  const displayedProjects = limitProjects ? filteredProjects.slice(0, 6) : filteredProjects;

  // Format the date to look nicer
  const formatDate = (year: number) => {
    return new Date(year, 0).toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="w-full text-center  mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 ">
                Our Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                A showcase of our commitment to excellence and quality
                craftsmanship across various sectors.
              </p>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {displayedProjects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
            >
              <div className="h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <div className="w-full flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <span className="text-lg text-muted-foreground">{formatDate(project.year)}</span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">
                  {project.location}
                </p>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

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

export default Projects;
