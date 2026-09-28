import { useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAuth from "@/components/RequireAuth";
import { SITE, findPage } from "@/seo";
import Index from "./pages/Index";
import IndexExperimental from "./pages/IndexExperimental";
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

type ChildrenProps = { children: ReactNode };

// Providers shared by the browser entry (main.tsx) and the build-time
// pre-renderer (entry-server.tsx); each supplies its own router.
export const AppProviders = ({ children }: ChildrenProps) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

// Keeps the tab title in sync on client-side navigation; the pre-rendered
// HTML already has the right <title> for the first load.
const RouteTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = findPage(pathname)?.title ?? SITE.name;
  }, [pathname]);
  return null;
};

export const AppRoutes = () => (
  <AuthProvider>
    <RouteTitle />
    <Routes>
      <Route path="/" element={<Index />} />
      {/* EXPERIMENTAL home screen preview — delete this line to roll back */}
      <Route path="/new" element={<IndexExperimental />} />
      <Route path="/projects" element={<AllProjects />} />
      <Route path="/ongoing-project/:id" element={<OngoingProjectDetail />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
      <Route path="/admin/projects/new" element={<RequireAuth><AdminNewProject /></RequireAuth>} />
      <Route path="/admin/projects/:id" element={<RequireAuth><AdminProject /></RequireAuth>} />
      <Route path="/admin/projects/:id/stage/:stageId" element={<RequireAuth><AdminStage /></RequireAuth>} />
      <Route path="/track/:token" element={<ProjectTracker />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
