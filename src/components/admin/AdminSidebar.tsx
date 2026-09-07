import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminSidebarProps {
  /** Nav links/items specific to the current page. */
  nav: ReactNode;
}

/**
 * Fixed right sidebar on desktop (md+); collapses into a hamburger-triggered
 * slide-in drawer on mobile, since there's no room for a 240px fixed rail
 * below the md breakpoint.
 */
export default function AdminSidebar({ nav }: AdminSidebarProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/admin", { replace: true });
  };

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 bg-secondary border-b border-white/10 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm font-bold text-white">المدینہ</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-white/70 hover:text-white transition-colors"
          aria-label="مینو کھولیں"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar / drawer ── */}
      <aside
        className={`fixed top-0 right-0 h-full w-60 bg-secondary border-l border-white/10 flex flex-col z-50 transition-transform duration-200 md:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 py-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">المدینہ</p>
              <p className="text-xs text-white/40">پروجیکٹ ٹریکر</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-1 text-white/50 hover:text-white transition-colors"
            aria-label="مینو بند کریں"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1" onClick={() => setOpen(false)}>
          {nav}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            لاگ آؤٹ
          </button>
        </div>
      </aside>
    </>
  );
}
