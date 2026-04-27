import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, LogOut, Building2, MapPin, Calendar,
  CheckCircle2, Clock, FolderOpen, Link2, MoreVertical,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_PROJECTS = [
  {
    id: "1",
    name: "درمنگی پلازہ بلاک-بی",
    clientName: "جناب احمد خلیل",
    address: "گلی نمبر ۴، وارسک روڈ، پشاور",
    type: "تجارتی",
    status: "active",
    isPublic: true,
    startDate: "2026-01-15",
    stagesTotal: 11,
    stagesCompleted: 4,
  },
  {
    id: "2",
    name: "حیات آباد رہائشی ولا",
    clientName: "جناب طارق حسین",
    address: "فیز ۶، حیات آباد، پشاور",
    type: "رہائشی",
    status: "active",
    isPublic: false,
    startDate: "2026-02-20",
    stagesTotal: 11,
    stagesCompleted: 2,
  },
  {
    id: "3",
    name: "یونیورسٹی روڈ کمرشل پلازہ",
    clientName: "جناب سلمان رحمٰن",
    address: "یونیورسٹی روڈ، پشاور",
    type: "تجارتی",
    status: "completed",
    isPublic: false,
    startDate: "2025-06-10",
    stagesTotal: 11,
    stagesCompleted: 11,
  },
];

const statusConfig = {
  active:    { label: "فعال",  color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  completed: { label: "مکمل", color: "bg-primary/15 text-primary border-primary/30" },
};

const typeColor: Record<string, string> = {
  "تجارتی":  "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "رہائشی": "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects] = useState(MOCK_PROJECTS);

  const active    = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="urdu min-h-screen bg-gray-950 text-white">
      {/* ── Sidebar (right) ── */}
      <aside className="fixed top-0 right-0 h-full w-60 bg-secondary border-l border-white/10 flex flex-col z-40">
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">المدینہ</p>
              <p className="text-xs text-white/40">پروجیکٹ ٹریکر</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-primary text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            ڈیش بورڈ
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate("/admin")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            لاگ آؤٹ
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="mr-60 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">ڈیش بورڈ</h1>
            <p className="text-white/40 text-sm mt-0.5">تمام تعمیراتی پروجیکٹس کا انتظام</p>
          </div>
          <Button
            onClick={() => navigate("/admin/projects/new")}
            className="bg-primary hover:bg-primary/90 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            نیا پروجیکٹ
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "کل پروجیکٹس", value: projects.length, icon: FolderOpen, color: "text-white" },
            { label: "فعال",         value: active,           icon: Clock,        color: "text-emerald-400" },
            { label: "مکمل",         value: completed,        icon: CheckCircle2, color: "text-primary" },
          ].map(({ label, value, icon: Icon, color }) => (
            <Card key={label} className="bg-white/5 border-white/10">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Projects list */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-4">
            تمام پروجیکٹس
          </h2>

          {projects.length === 0 ? (
            <div className="text-center py-20 text-white/30">
              <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>ابھی کوئی پروجیکٹ نہیں ہے۔ پہلا پروجیکٹ بنائیں۔</p>
            </div>
          ) : (
            projects.map((project) => {
              const progressPct = Math.round((project.stagesCompleted / project.stagesTotal) * 100);
              return (
                <Card
                  key={project.id}
                  className="bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => navigate(`/admin/projects/${project.id}`)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left — progress */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <div className="text-left hidden sm:block">
                          <p className="text-xs text-white/40 mb-1">
                            {project.stagesCompleted}/{project.stagesTotal} مراحل
                          </p>
                          <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${progressPct}%` }}
                            />
                          </div>
                          <p className="text-xs text-primary font-semibold mt-1">{progressPct}%</p>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <button className="p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/10 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-secondary border-white/10 text-white">
                            <DropdownMenuItem
                              className="hover:bg-white/10 cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${project.id}`); }}
                            >
                              پروجیکٹ کھولیں
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-white/10 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.isPublic ? "عوامی لنک منسوخ کریں" : "عوامی لنک بنائیں"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Right — info */}
                      <div className="flex-1 min-w-0 text-right">
                        <div className="flex items-center justify-end gap-2 flex-wrap mb-1">
                          {project.isPublic && (
                            <span className="text-xs px-2 py-0.5 rounded-full border font-medium bg-yellow-500/15 text-yellow-400 border-yellow-500/30 flex items-center gap-1">
                              <Link2 className="w-3 h-3" /> شیئر کیا گیا
                            </span>
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColor[project.type] ?? "bg-white/10 text-white/50 border-white/20"}`}>
                            {project.type}
                          </span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusConfig[project.status as keyof typeof statusConfig].color}`}>
                            {statusConfig[project.status as keyof typeof statusConfig].label}
                          </span>
                          <h3 className="font-semibold text-white text-base group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                        </div>

                        <p className="text-sm text-white/50 mb-1">{project.clientName}</p>

                        <div className="flex items-center justify-end gap-4 text-xs text-white/30 mt-2 flex-wrap">
                          <span className="flex items-center gap-1">
                            {new Date(project.startDate).toLocaleDateString("ur-PK", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                            <Calendar className="w-3 h-3" />
                          </span>
                          <span className="flex items-center gap-1">
                            {project.address}
                            <MapPin className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
