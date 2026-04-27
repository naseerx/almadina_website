import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import OngoingProjectDetail from "./pages/OngoingProjectDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNewProject from "./pages/admin/AdminNewProject";
import AdminProject from "./pages/admin/AdminProject";
import AdminStage from "./pages/admin/AdminStage";
import ProjectTracker from "./pages/ProjectTracker";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/ongoing-project/:id" element={<OngoingProjectDetail />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/projects/new" element={<AdminNewProject />} />
          <Route path="/admin/projects/:id" element={<AdminProject />} />
          <Route path="/admin/projects/:id/stage/:stageId" element={<AdminStage />} />
          <Route path="/track/:token" element={<ProjectTracker />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;