import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus, MapPin, Calendar,
  CheckCircle2, Clock, FolderOpen, Link2, MoreVertical,
  LayoutDashboard, Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { listProjects, setProjectPublic, deleteProject } from "@/api/projects";

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
  const queryClient = useQueryClient();
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: listProjects,
  });

  const togglePublic = useMutation({
    mutationFn: ({ id, isPublic }: { id: string; isPublic: boolean }) =>
      setProjectPublic(id, isPublic),
    onSuccess: (_data, { isPublic }) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(isPublic ? "عوامی لنک بن گیا" : "عوامی لنک منسوخ ہو گیا");
    },
    onError: () => toast.error("تبدیلی محفوظ نہیں ہو سکی"),
  });

  const deleteProjectMut = useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setProjectToDelete(null);
      toast.success("پروجیکٹ حذف کر دیا گیا");
    },
    onError: () => toast.error("پروجیکٹ حذف نہیں ہو سکا"),
  });

  const active    = projects.filter((p) => p.status === "active").length;
  const completed = projects.filter((p) => p.status === "completed").length;

  return (
    <div className="urdu min-h-screen bg-gray-950 text-white">
      <AdminSidebar
        nav={
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/20 text-primary text-sm font-medium">
            <LayoutDashboard className="w-4 h-4" />
            ڈیش بورڈ
          </div>
        }
      />

      {/* ── Main content ── */}
      <main className="md:mr-60 p-8 pt-20 md:pt-8">
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

          {isLoading ? (
            <div className="text-center py-20 text-white/30">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
            </div>
          ) : isError ? (
            <div className="text-center py-20 text-red-400">
              <p>پروجیکٹس لوڈ نہیں ہو سکے۔</p>
              <p className="text-xs text-red-400/60 mt-1" dir="ltr">{(error as Error)?.message}</p>
            </div>
          ) : projects.length === 0 ? (
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
                              onClick={(e) => {
                                e.stopPropagation();
                                togglePublic.mutate({ id: project.id, isPublic: !project.isPublic });
                              }}
                            >
                              {project.isPublic ? "عوامی لنک منسوخ کریں" : "عوامی لنک بنائیں"}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-red-500/10 text-red-400 cursor-pointer"
                              onClick={(e) => { e.stopPropagation(); setProjectToDelete(project.id); }}
                            >
                              پروجیکٹ حذف کریں
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

      {/* ── Delete project confirm ── */}
      <AlertDialog open={!!projectToDelete} onOpenChange={(open) => !open && setProjectToDelete(null)}>
        <AlertDialogContent className="urdu bg-gray-950 border-white/10 text-white" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-right">پروجیکٹ حذف کریں؟</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-right">
              یہ عمل واپس نہیں ہو سکتا۔ اس پروجیکٹ کے تمام مراحل اور میڈیا بھی مستقل طور پر حذف ہو جائیں گے۔
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => projectToDelete && deleteProjectMut.mutate(projectToDelete)}
              disabled={deleteProjectMut.isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              ہاں، حذف کریں
            </AlertDialogAction>
            <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10 bg-transparent">
              منسوخ
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
