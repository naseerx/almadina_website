import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SITE, findPage } from "@/seo";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import PrivacyPage from "./pages/PrivacyPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import NotFound from "./pages/NotFound";

// Pre-rendered public pages (above) ship in the main bundle; everything else
// is loaded on demand so visitors to / and /projects don't download it.
const IndexExperimental = lazy(() => import("./pages/IndexExperimental"));
const OngoingProjectDetail = lazy(() => import("./pages/OngoingProjectDetail"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminGate = lazy(() => import("./pages/admin/AdminLayout").then((m) => ({ default: m.AdminGate })));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminNewProject = lazy(() => import("./pages/admin/AdminNewProject"));
const AdminProject = lazy(() => import("./pages/admin/AdminProject"));
const AdminStage = lazy(() => import("./pages/admin/AdminStage"));
const ProjectTracker = lazy(() => import("./pages/ProjectTracker"));

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
  <>
    <RouteTitle />
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* EXPERIMENTAL home screen preview — delete this line to roll back */}
        <Route path="/new" element={<IndexExperimental />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/ongoing-project/:id" element={<OngoingProjectDetail />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminLogin />} />
          <Route element={<AdminGate />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/projects/new" element={<AdminNewProject />} />
            <Route path="/admin/projects/:id" element={<AdminProject />} />
            <Route path="/admin/projects/:id/stage/:stageId" element={<AdminStage />} />
          </Route>
        </Route>
        <Route path="/track/:token" element={<ProjectTracker />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
