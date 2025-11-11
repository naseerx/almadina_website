import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import house1 from "@/assets/1.jpg";
import house2 from "@/assets/2.jpg";
import house3 from "@/assets/3.jpg";
import house6 from "@/assets/6.jpg";
import house7 from "@/assets/7.jpg";
import house8 from "@/assets/8.jpg";
import house10 from "@/assets/10.jpg";
import house11 from "@/assets/11.jpg";
import house15 from "@/assets/15.jpg";
import house16 from "@/assets/16.jpg";
import house17 from "@/assets/17.jpg";
import house18 from "@/assets/18.jpg";
import house19 from "@/assets/19.jpg";
import house22 from "@/assets/22.jpg";
import house26 from "@/assets/26.jpg";
import house27 from "@/assets/27.jpg";
import house28 from "@/assets/28.jpg";
import house29 from "@/assets/29.jpg";
import house30 from "@/assets/30.jpg";
import house32 from "@/assets/32.jpg";
import house33 from "@/assets/33.jpg";
import house34 from "@/assets/34.jpg";
import house35 from "@/assets/35.jpg";
import house36 from "@/assets/36.jpg";
import house37 from "@/assets/37.jpg";
import house38 from "@/assets/38.jpg";
import house40 from "@/assets/40.jpg";
import house46 from "@/assets/46.jpg";
import house50 from "@/assets/50.jpg";
import house52 from "@/assets/52.jpg";
import house53 from "@/assets/53.jpg";
import house54 from "@/assets/54.jpg";
import house55 from "@/assets/55.jpg";
import house56 from "@/assets/56.jpg";
import house57 from "@/assets/57.jpg";
import house58 from "@/assets/58.jpg";
import house59 from "@/assets/59.jpg";
import house60 from "@/assets/60.jpg";
import house63 from "@/assets/63.jpg";
import house64 from "@/assets/64.jpg";
import house65 from "@/assets/65.jpg";
import house66 from "@/assets/66.jpg";
import house67 from "@/assets/67.jpg";
import house69 from "@/assets/69.jpg";
import house70 from "@/assets/70.jpg";
import house71 from "@/assets/71.jpg";
import house73 from "@/assets/73.jpg";
import house77 from "@/assets/77.jpg";
import house78 from "@/assets/78.jpg";
import house79 from "@/assets/79.jpg";
import house80 from "@/assets/80.jpg";
import house81 from "@/assets/81.jpg";
import house82 from "@/assets/82.jpg";
import house83 from "@/assets/83.jpg";
import house84 from "@/assets/84.jpg";
import house85 from "@/assets/85.jpg";
import house86 from "@/assets/86.jpg";
import house87 from "@/assets/87.jpg";
import house88 from "@/assets/88.jpg";
import house89 from "@/assets/89.jpg";
import house90 from "@/assets/90.jpg";
import house91 from "@/assets/91.jpg";
import abid from "@/assets/abid.jpg";
import house92 from "@/assets/92.jpg";
import house111 from "@/assets/111a.jpg";
import house112 from "@/assets/112.jpg";
import commercial5 from "@/assets/C5.jpg";
import commercial6 from "@/assets/C6.jpg";
import commercialBilal from "@/assets/Cbilal.jpg";
import commercial3 from "@/assets/C3.png";
import commercial2 from "@/assets/C2.jpg";
import commercial1 from "@/assets/C1.jpg";
import mosque1 from "@/assets/M1.jpg";
import mosque2 from "@/assets/M2.jpg";



type ProjectCategory = "all" | "residential" | "commercial" | "mosques";

interface ProjectsProps {
  limitProjects?: boolean;
}

const Projects = ({ limitProjects = true }: ProjectsProps) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const projects = [
    {
      image: abid,
      title: "20 Marla",
      location: "Sufaid Sang Road Mulazai, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },
    {
      image: house111,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },

    {
      image: house112,
      title: "7 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2025,
      isFeatured: true,
    },

    {
      image: commercial5,
      title: "10 Marla Plaza",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2024,
      isFeatured: true,
    },
    {
      image: commercial6,
      title: "7 Marla",
      location: "Green Cottage, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2023,
      isFeatured: true,
    },
    {
      image: commercialBilal,
      title: "10 Marla Plaza",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      image: commercial3,
      title: "8 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      image: commercial2,
      title: "7 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2021,
      isFeatured: true,
    },

    {
      image: commercial1,
      title: "7 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "commercial" as const,
      year: 2016,
      isFeatured: true,
    },
    {
      image: mosque1,
      title: "Madani Masjid",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "mosques" as const,
      year: 2016,
      isFeatured: true,
    },
    {
      image: mosque2,
      title: "Msjid Quba",
      location: "Executive Lodgesn, Peshawar",
      description: "A luxury residential project",
      category: "mosques" as const,
      year: 2015,
      isFeatured: true,
    },
    {
      image: house1,
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
      isFeatured: false,
    },
    {
      image: house2,
      title: "4 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
      isFeatured: false,
    },
    {
      image: house3,
      title: "4 Marla",
      location: "Khwaja Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
      isFeatured: false,
    },
    {
      image: house6,
      title: "4 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
      isFeatured: false,
    },
    {
      image: house7,
      title: "8 Marla",
      location: "Khwaja Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2008,
      isFeatured: false,
    },
    {
      image: house8,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
      isFeatured: false,
    },
    {
      image: house10,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
      isFeatured: false,
    },
    {
      image: house11,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
      isFeatured: false,
    },
    {
      image: house15,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2009,
      isFeatured: false,
    },
    {
      image: house16,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
      isFeatured: false,
    },
    {
      image: house17,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
      isFeatured: false,
    },
    {
      image: house18,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
      isFeatured: false,
    },
    {
      image: house19,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
      isFeatured: false,
    },
    {
      image: house22,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2010,
      isFeatured: false,
    },
    {
      image: house26,
      title: "5 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
      isFeatured: false,
    },

    {
      image: house27,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
      isFeatured: false,
    },
    {
      image: house28,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
      isFeatured: false,
    },
    {
      image: house29,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2011,
      isFeatured: false,
    },
    {
      image: house30,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
      isFeatured: false,
    },
    {
      image: house32,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
      isFeatured: false,
    },
    {
      image: house33,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
      isFeatured: false,
    },
    {
      image: house34,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2012,
      isFeatured: false,
    },
    {
      image: house35,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2013,
      isFeatured: false,
    },
    {
      image: house36,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2013,
      isFeatured: false,
    },
    {
      image: house37,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2013,
      isFeatured: false,
    },
    {
      image: house38,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2014,
      isFeatured: false,
    },
    {
      image: house40,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2014,
      isFeatured: false,
    },
    {
      image: house46,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2014,
      isFeatured: false,
    },
    {
      image: house50,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2015,
      isFeatured: false,
    },
    {
      image: house52,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2015,
      isFeatured: false,
    },
    {
      image: house53,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2015,
      isFeatured: false,
    },
    {
      image: house54,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2015,
      isFeatured: false,
    },
    {
      image: house55,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2016,
      isFeatured: false,
    },
    {
      image: house56,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2016,
      isFeatured: false,
    },
    {
      image: house57,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2016,
      isFeatured: false,
    },
    {
      image: house58,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2016,
      isFeatured: false,
    },
    {
      image: house59,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2017,
      isFeatured: false,
    },
    {
      image: house60,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2017,
      isFeatured: false,
    },
    {
      image: house63,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2017,
      isFeatured: true,
    },
    {
      image: house64,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2017,
      isFeatured: false,
    },
    {
      image: house65,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
    {
      image: house66,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
    {
      image: house67,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
    {
      image: house69,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
    {
      image: house70,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    }, {
      image: house71,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
      {
      image: house92,
      title: "6 Marla",
      location: "Sabz Ali town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2021,
      isFeatured: false,
    },
     {
      image: house73,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2018,
      isFeatured: false,
    },
    {
      image: house77,
      title: "6 Marla",
      location: "Sabz Ali Town, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2019,
      isFeatured: false,
    },
    {
      image: house78,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2019,
      isFeatured: false,
    },
    {
      image: house79,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2019,
      isFeatured: false,
    },
    {
      image: house80,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2020,
      isFeatured: false,
    },
    {
      image: house81,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2020,
      isFeatured: false,
    },
    {
      image: house82,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2020,
      isFeatured: false,
    },
    {
      image: house83,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2020,
      isFeatured: false,
    },
    {
      image: house84,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2021,
      isFeatured: false,
    },
    {
      image: house85,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2021,
      isFeatured: false,
    },
    {
      image: house86,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2021,
      isFeatured: false,
    },
    {
      image: house87,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      image: house88,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2022,
      isFeatured: false,
    },
    {
      image: house89,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2022,
      isFeatured: false,
    },
    {
      image: house90,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2022,
      isFeatured: true,
    },
    {
      image: house91,
      title: "6 Marla",
      location: "Executive Lodges, Peshawar",
      description: "A luxury residential project",
      category: "residential" as const,
      year: 2021,
      isFeatured: false,
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
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border cursor-pointer"
              onClick={() => setSelectedImage(project.image)}
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
                  <span className="text-lg text-muted-foreground">{project.year}</span>
                </div>
                <p className="text-sm text-primary font-medium mb-2">
                  {project.location}
                </p>
                {/* <p className="text-muted-foreground">{project.description}</p> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
            <DialogHeader className="absolute right-4 top-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-background/80 backdrop-blur-sm"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Project full view"
                className="w-full h-auto object-contain"
              />
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

export default Projects;
