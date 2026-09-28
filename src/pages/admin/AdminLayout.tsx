import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAuth from "@/components/RequireAuth";

// Layout routes for /admin/*. Lazy-loaded from App.tsx so Supabase auth only
// ships to people who open the admin area, not to public visitors.

/** Auth context for every admin route (login included). */
export default function AdminLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

/** Login gate for the protected admin routes. */
export function AdminGate() {
  return (
    <RequireAuth>
      <Outlet />
    </RequireAuth>
  );
}
