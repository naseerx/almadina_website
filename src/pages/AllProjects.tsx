import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Projects from "@/components/Projects";

const AllProjects = () => {
  // Ensure the page starts at the very top when this route mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-8 hover:text-primary"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
        <Projects limitProjects={false} />
      </div>
    </div>
  );
};

export default AllProjects;