import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  MapPin, Calendar, User,
  CheckCircle2, Clock, Circle, ChevronLeft,
  Link2, Copy, RotateCcw, LayoutDashboard,
  ImageIcon, Share2, CheckCheck, Pencil, Trash2,
  RefreshCw, Plus, ChevronUp, ChevronDown, X, Check,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import AdminSidebar from "@/components/admin/AdminSidebar";
import {
  getProjectWithStages, setProjectPublic, setProjectStatus,
  updateProject, deleteProject, regeneratePublicToken,
} from "@/api/projects";
import { createStage, renameStage, deleteStage, reorderStages } from "@/api/stages";

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", clientName: "", address: "", type: "", startDate: "" });
  const [deleteProjectOpen, setDeleteProjectOpen] = useState(false);

  const [newStageName, setNewStageName] = useState("");
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [editStageName, setEditStageName] = useState("");
  const [stageToDelete, setStageToDelete] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectWithStages(id!),
    enabled: !!id,
  });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["project", id] });
    queryClient.invalidateQueries({ queryKey: ["projects"] });
  };

  const togglePublic = useMutation({
    mutationFn: (next: boolean) => setProjectPublic(id!, next),
    onSuccess: (_d, next) => {
      invalidate();
      toast.success(next ? "عوامی لنک بن گیا" : "عوامی لنک منسوخ ہو گیا");
    },
    onError: () => toast.error("تبدیلی محفوظ نہیں ہو سکی"),
  });

  const changeStatus = useMutation({
    mutationFn: (next: "active" | "completed") => setProjectStatus(id!, next),
    onSuccess: (_d, next) => {
      invalidate();
      toast.success(next === "completed" ? "پروجیکٹ مکمل کر دیا گیا" : "پروجیکٹ فعال کر دیا گیا");
    },
    onError: () => toast.error("تبدیلی محفوظ نہیں ہو سکی"),
  });

  const updateProjectMut = useMutation({
    mutationFn: () => updateProject(id!, editForm),
    onSuccess: () => {
      invalidate();
      setEditOpen(false);
      toast.success("پروجیکٹ کی تفصیلات محفوظ ہو گئیں");
    },
    onError: () => toast.error("تفصیلات محفوظ نہیں ہو سکیں"),
  });

  const deleteProjectMut = useMutation({
    mutationFn: () => deleteProject(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("پروجیکٹ حذف کر دیا گیا");
      navigate("/admin/dashboard", { replace: true });
    },
    onError: () => toast.error("پروجیکٹ حذف نہیں ہو سکا"),
  });

  const regenTokenMut = useMutation({
    mutationFn: () => regeneratePublicToken(id!),
    onSuccess: () => {
      invalidate();
      toast.success("نیا عوامی لنک بن گیا — پرانا لنک منسوخ ہو گیا");
    },
    onError: () => toast.error("لنک تجدید نہیں ہو سکا"),
  });

  const addStageMut = useMutation({
    mutationFn: () => createStage(id!, newStageName.trim(), stages.length + 1),
    onSuccess: () => {
      invalidate();
      setNewStageName("");
      toast.success("مرحلہ شامل ہو گیا");
    },
    onError: () => toast.error("مرحلہ شامل نہیں ہو سکا"),
  });

  const renameStageMut = useMutation({
    mutationFn: (vars: { stageId: string; name: string }) => renameStage(vars.stageId, vars.name),
    onSuccess: () => { invalidate(); setEditingStageId(null); },
    onError: () => toast.error("مرحلے کا نام محفوظ نہیں ہو سکا"),
  });

  const deleteStageMut = useMutation({
    mutationFn: (stageId: string) => deleteStage(stageId),
    onSuccess: () => {
      invalidate();
      setStageToDelete(null);
      toast.success("مرحلہ حذف کر دیا گیا");
    },
    onError: () => toast.error("مرحلہ حذف نہیں ہو سکا"),
  });

  const reorderStagesMut = useMutation({
    mutationFn: (orderedIds: string[]) => reorderStages(orderedIds),
    onSuccess: () => invalidate(),
    onError: () => toast.error("ترتیب محفوظ نہیں ہو سکی"),
  });

  const openEdit = () => {
    setEditForm({
      name: project.name,
      clientName: project.clientName,
      address: project.address,
      type: project.type,
      startDate: project.startDate,
    });
    setEditOpen(true);
  };

  const moveStage = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= stages.length) return;
    const reordered = [...stages];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    reorderStagesMut.mutate(reordered.map((s) => s.id));
  };

  if (isLoading || !data) {
    return (
      <div className="urdu min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const { project, stages } = data;
  const completed  = stages.filter((s) => s.status === "completed").length;
  const total      = stages.length;
  const progressPct = total ? Math.round((completed / total) * 100) : 0;
  const publicUrl  = `${window.location.origin}/track/${project.publicToken}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success("لنک کاپی ہو گیا");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTogglePublic = () => togglePublic.mutate(!project.isPublic);
  const handleMarkComplete = () =>
    changeStatus.mutate(project.status === "completed" ? "active" : "completed");

  return (
    <div className="urdu min-h-screen bg-gray-950 text-white">
      <AdminSidebar
        nav={
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            ڈیش بورڈ
          </button>
        }
      />

      {/* ── Main ── */}
      <main className="p-8 pt-20 md:pt-8 md:mr-60">
        {/* Breadcrumb */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 transition-colors"
        >
          ڈیش بورڈ <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline" size="sm"
                        onClick={() => regenTokenMut.mutate()}
                        disabled={regenTokenMut.isPending}
                        className="border-white/20 text-white hover:bg-white/10 gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> لنک تجدید کریں
                      </Button>
                      <Button
                        variant="outline" size="sm"
                        onClick={handleTogglePublic}
                        className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> منسوخ کریں
                      </Button>
                    </div>
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
                  onClick={openEdit}
                  className="w-full border-white/20 text-white hover:bg-white/10 gap-2"
                >
                  تفصیلات میں ترمیم <Pencil className="w-3.5 h-3.5" />
                </Button>
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
                <Button
                  variant="outline" size="sm"
                  onClick={() => setDeleteProjectOpen(true)}
                  className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2"
                >
                  پروجیکٹ حذف کریں <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-white text-right">فوری اعداد و شمار</h3>
                <div className="space-y-2">
                  {[
                    { label: "کل میڈیا",    value: stages.reduce((a, s) => a + s.mediaCount, 0), icon: ImageIcon },
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
          <div className="md:col-span-2 space-y-4">
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
                {stages.map((stage, index) => {
                  const cfg = stageStatusConfig[stage.status as StageStatus];
                  const Icon = cfg.icon;
                  const isEditing = editingStageId === stage.id;
                  return (
                    <div
                      key={stage.id}
                      onClick={() => !isEditing && navigate(`/admin/projects/${id}/stage/${stage.id}`)}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group
                        ${stage.status === "in_progress" ? "bg-primary/10 border-primary/30 hover:bg-primary/15"
                        : stage.status === "completed"   ? "bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10"
                        : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"}`}
                    >
                      {/* Arrow */}
                      <ChevronLeft className={`w-4 h-4 flex-shrink-0 transition-all ${
                        stage.status === "not_started" ? "text-white/15" : "text-white/40 group-hover:text-white group-hover:-translate-x-0.5"
                      }`} />

                      {/* Row actions: reorder / rename / delete */}
                      <div
                        className="flex items-center gap-1 flex-shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          disabled={index === 0}
                          onClick={() => moveStage(index, -1)}
                          className="p-1 rounded text-white/30 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={index === stages.length - 1}
                          onClick={() => moveStage(index, 1)}
                          className="p-1 rounded text-white/30 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => { setEditingStageId(stage.id); setEditStageName(stage.name); }}
                          className="p-1 rounded text-white/30 hover:text-white hover:bg-white/10 transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStageToDelete(stage.id)}
                          className="p-1 rounded text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Stage info */}
                      <div className="flex-1 min-w-0 text-right">
                        {isEditing ? (
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => setEditingStageId(null)}
                              className="p-1.5 bg-white/10 rounded text-white/50 hover:text-white transition-colors flex-shrink-0"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => renameStageMut.mutate({ stageId: stage.id, name: editStageName.trim() })}
                              className="p-1.5 bg-primary rounded text-white flex-shrink-0"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <Input
                              autoFocus
                              value={editStageName}
                              onChange={(e) => setEditStageName(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && renameStageMut.mutate({ stageId: stage.id, name: editStageName.trim() })}
                              className="bg-white/10 border-white/20 text-white text-sm h-8 flex-1"
                            />
                          </div>
                        ) : (
                          <>
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
                          </>
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

            {/* Add stage */}
            <div className="flex gap-2 pt-1">
              <Button
                type="button"
                onClick={() => newStageName.trim() && addStageMut.mutate()}
                disabled={addStageMut.isPending}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 gap-1.5 flex-shrink-0"
              >
                <Plus className="w-4 h-4" /> مرحلہ شامل کریں
              </Button>
              <Input
                placeholder="نیا مرحلہ کا نام..."
                value={newStageName}
                onChange={(e) => setNewStageName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && newStageName.trim() && addStageMut.mutate()}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </main>

      {/* ── Edit project dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="urdu bg-gray-950 border-white/10 text-white" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-white text-right">پروجیکٹ کی تفصیلات میں ترمیم</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">پروجیکٹ کا نام</Label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                className="bg-white/10 border-white/20 text-white focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">کلائنٹ کا نام</Label>
              <Input
                value={editForm.clientName}
                onChange={(e) => setEditForm((f) => ({ ...f, clientName: e.target.value }))}
                className="bg-white/10 border-white/20 text-white focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-white/70 text-sm">پتہ</Label>
              <Input
                value={editForm.address}
                onChange={(e) => setEditForm((f) => ({ ...f, address: e.target.value }))}
                className="bg-white/10 border-white/20 text-white focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm">قسم</Label>
                <Input
                  value={editForm.type}
                  onChange={(e) => setEditForm((f) => ({ ...f, type: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm">شروع کی تاریخ</Label>
                <Input
                  type="date"
                  value={editForm.startDate}
                  onChange={(e) => setEditForm((f) => ({ ...f, startDate: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white focus:border-primary [color-scheme:dark]"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => updateProjectMut.mutate()}
              disabled={updateProjectMut.isPending}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              محفوظ کریں
            </Button>
            <Button variant="outline" onClick={() => setEditOpen(false)} className="border-white/20 text-white hover:bg-white/10">
              منسوخ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete project confirm ── */}
      <AlertDialog open={deleteProjectOpen} onOpenChange={setDeleteProjectOpen}>
        <AlertDialogContent className="urdu bg-gray-950 border-white/10 text-white" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-right">پروجیکٹ حذف کریں؟</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-right">
              یہ عمل واپس نہیں ہو سکتا۔ اس پروجیکٹ کے تمام مراحل اور میڈیا بھی مستقل طور پر حذف ہو جائیں گے۔
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => deleteProjectMut.mutate()}
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

      {/* ── Delete stage confirm ── */}
      <AlertDialog open={!!stageToDelete} onOpenChange={(open) => !open && setStageToDelete(null)}>
        <AlertDialogContent className="urdu bg-gray-950 border-white/10 text-white" dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-right">مرحلہ حذف کریں؟</AlertDialogTitle>
            <AlertDialogDescription className="text-white/50 text-right">
              اس مرحلے کا تمام میڈیا بھی مستقل طور پر حذف ہو جائے گا۔
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => stageToDelete && deleteStageMut.mutate(stageToDelete)}
              disabled={deleteStageMut.isPending}
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
