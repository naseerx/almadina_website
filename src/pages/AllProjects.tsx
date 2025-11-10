import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Projects from "@/components/Projects";

const AllProjects = () => {
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