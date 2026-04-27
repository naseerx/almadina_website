import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2, MapPin, Calendar, User,
  CheckCircle2, Clock, Circle, ChevronLeft,
  Link2, Copy, RotateCcw, LogOut, LayoutDashboard,
  ImageIcon, Share2, CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const MOCK_PROJECT = {
  id: "1",
  name: "درمنگی پلازہ بلاک-بی",
  clientName: "جناب احمد خلیل",
  address: "گلی نمبر ۴، وارسک روڈ، پشاور",
  type: "تجارتی",
  status: "active",
  isPublic: true,
  publicToken: "dmg-plaza-b-2026",
  startDate: "2026-01-15",
  stages: [
    { id: "s1",  order: 1,  name: "جائے وقوع کی تیاری", status: "completed",   mediaCount: 6  },
    { id: "s2",  order: 2,  name: "بنیاد",               status: "completed",   mediaCount: 12 },
    { id: "s3",  order: 3,  name: "چنائی / ڈھانچہ",      status: "completed",   mediaCount: 8  },
    { id: "s4",  order: 4,  name: "چھت کا کام",           status: "completed",   mediaCount: 5  },
    { id: "s5",  order: 5,  name: "پلستر",               status: "in_progress", mediaCount: 3  },
    { id: "s6",  order: 6,  name: "بجلی و پلمبنگ",       status: "not_started", mediaCount: 0  },
    { id: "s7",  order: 7,  name: "بڑھئی کا کام",        status: "not_started", mediaCount: 0  },
    { id: "s8",  order: 8,  name: "ٹائلنگ و فرش",        status: "not_started", mediaCount: 0  },
    { id: "s9",  order: 9,  name: "رنگ کاری",            status: "not_started", mediaCount: 0  },
    { id: "s10", order: 10, name: "آخری تکمیل",          status: "not_started", mediaCount: 0  },
    { id: "s11", order: 11, name: "چابی کی حوالگی",      status: "not_started", mediaCount: 0  },
  ],
};

type StageStatus = "not_started" | "in_progress" | "completed";

const stageStatusConfig: Record<StageStatus, {
  label: string; icon: React.ElementType;
  iconColor: string; badgeClass: string;
}> = {
  completed:   { label: "مکمل",      icon: CheckCircle2, iconColor: "text-emerald-400", badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  in_progress: { label: "جاری ہے",   icon: Clock,        iconColor: "text-primary",     badgeClass: "bg-primary/15 text-primary border-primary/30" },
  not_started: { label: "شروع نہیں", icon: Circle,       iconColor: "text-white/25",    badgeClass: "bg-white/5 text-white/40 border-white/10" },
};

export default function AdminProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(MOCK_PROJECT);
  const [copied, setCopied] = useState(false);

  const completed  = project.stages.filter((s) => s.status === "completed").length;
  const total      = project.stages.length;
  const progressPct = Math.round((completed / total) * 100);
  const publicUrl  = `${window.location.origin}/track/${project.publicToken}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success("لنک کاپی ہو گیا");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublic = () => {
    setProject((p) => ({ ...p, isPublic: !p.isPublic }));
    toast.success(project.isPublic ? "عوامی لنک منسوخ ہو گیا" : "عوامی لنک بن گیا");
  };

  const handleMarkComplete = () => {
    setProject((p) => ({ ...p, status: p.status === "completed" ? "active" : "completed" }));
    toast.success(project.status === "completed" ? "پروجیکٹ فعال کر دیا گیا" : "پروجیکٹ مکمل کر دیا گیا");
  };

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
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            ڈیش بورڈ
          </button>
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

      {/* ── Main ── */}
      <main className="p-8" style={{ marginRight: "15rem" }}>
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors"
        >
          ڈیش بورڈ <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-3 gap-6">
          {/* ── Left: controls ── */}
          <div className="space-y-4 order-last">
            {/* Share */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-2 justify-end">
                  <h3 className="text-sm font-semibold text-white">کلائنٹ شیئرنگ</h3>
                  <Share2 className="w-4 h-4 text-white/50" />
                </div>

                {project.isPublic ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 justify-end">
                      عوامی لنک فعال ہے
                      <Link2 className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleCopyLink}
                        className="px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors flex-shrink-0"
                      >
                        {copied ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <div className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-white/40 truncate font-mono" dir="ltr">
                        /track/{project.publicToken}
                      </div>
                    </div>
                    <Button
                      variant="outline" size="sm"
                      onClick={handleTogglePublic}
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2"
                    >
                      لنک منسوخ کریں <RotateCcw className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 text-right">
                      اپنے کلائنٹ کے ساتھ پروجیکٹ کی پیشرفت شیئر کریں۔ کسی بھی وقت منسوخ کر سکتے ہیں۔
                    </p>
                    <Button size="sm" onClick={handleTogglePublic}
                      className="w-full bg-primary hover:bg-primary/90 text-white gap-2">
                      عوامی لنک بنائیں <Link2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white text-right">پروجیکٹ اقدامات</h3>
                <Button
                  variant="outline" size="sm"
                  onClick={handleMarkComplete}
                  className={`w-full gap-2 ${
                    project.status === "completed"
                      ? "border-white/20 text-white/60 hover:bg-white/10"
                      : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                  }`}
                >
                  {project.status === "completed"
                    ? <>فعال کریں <RotateCcw className="w-3.5 h-3.5" /></>
                    : <>مکمل کریں <CheckCircle2 className="w-3.5 h-3.5" /></>
                  }
                </Button>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white text-right">فوری اعداد و شمار</h3>
                <div className="space-y-2">
                  {[
                    { label: "کل میڈیا",    value: project.stages.reduce((a, s) => a + s.mediaCount, 0), icon: ImageIcon },
                    { label: "مکمل مراحل", value: completed,       icon: CheckCircle2 },
                    { label: "باقی مراحل", value: total - completed, icon: Clock },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-white">{value}</span>
                      <span className="flex items-center gap-2 text-white/40">
                        {label}
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right: stage timeline ── */}
          <div className="col-span-2 space-y-4">
            {/* Project title */}
            <div className="mb-6 text-right">
              <div className="flex items-center gap-3 flex-wrap justify-end mb-1">
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
                  project.status === "completed"
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                }`}>
                  {project.status === "completed" ? "مکمل" : "فعال"}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full border font-medium bg-blue-500/15 text-blue-400 border-blue-500/30">
                  {project.type}
                </span>
                <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              </div>

              <div className="flex items-center gap-4 text-sm text-white/40 flex-wrap justify-end">
                <span className="flex items-center gap-1.5">
                  {new Date(project.startDate).toLocaleDateString("ur-PK", { day: "numeric", month: "short", year: "numeric" })}
                  <Calendar className="w-3.5 h-3.5" />
                </span>
                <span className="flex items-center gap-1.5">{project.address}<MapPin className="w-3.5 h-3.5" /></span>
                <span className="flex items-center gap-1.5">{project.clientName}<User className="w-3.5 h-3.5" /></span>
              </div>
            </div>

            {/* Progress bar */}
            <Card className="bg-white/5 border-white/10 mb-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-primary">{progressPct}%</span>
                  <span className="text-sm text-white/60">مجموعی پیشرفت</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="text-xs text-white/30 mt-2 text-right">{total} میں سے {completed} مراحل مکمل</p>
              </CardContent>
            </Card>

            <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider text-right">تعمیراتی مراحل</h2>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute right-[19px] top-6 bottom-6 w-0.5 bg-white/10 z-0" />
              <div className="space-y-3">
                {project.stages.map((stage) => {
                  const cfg = stageStatusConfig[stage.status as StageStatus];
                  const Icon = cfg.icon;
                  return (
                    <div
                      key={stage.id}
                      onClick={() => navigate(`/admin/projects/${id}/stage/${stage.id}`)}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group
                        ${stage.status === "in_progress" ? "bg-primary/10 border-primary/30 hover:bg-primary/15"
                        : stage.status === "completed"   ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10"
                        : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"}`}
                    >
                      {/* Arrow */}
                      <ChevronLeft className={`w-4 h-4 flex-shrink-0 transition-all ${
                        stage.status === "not_started" ? "text-white/15" : "text-white/40 group-hover:text-white group-hover:-translate-x-0.5"
                      }`} />

                      {/* Stage info */}
                      <div className="flex-1 min-w-0 text-right">
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badgeClass}`}>
                            {cfg.label}
                          </span>
                          <h3 className={`font-semibold text-sm ${stage.status === "not_started" ? "text-white/50" : "text-white"} group-hover:text-white transition-colors`}>
                            {stage.name}
                          </h3>
                          <span className="text-xs text-white/30 font-mono">
                            {String(stage.order).padStart(2, "0")}
                          </span>
                        </div>
                        {stage.mediaCount > 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-white/30 justify-end">
                            {stage.mediaCount} میڈیا آئٹمز
                            <ImageIcon className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                      {/* Status icon */}
                      <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                        stage.status === "completed"   ? "bg-emerald-500/20 border-emerald-500/50"
                        : stage.status === "in_progress" ? "bg-primary/20 border-primary/50"
                        : "bg-white/5 border-white/15"
                      }`}>
                        <Icon className={`w-5 h-5 ${cfg.iconColor}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
