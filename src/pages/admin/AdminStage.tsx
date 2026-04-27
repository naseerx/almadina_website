import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Building2, LayoutDashboard, LogOut,
  CheckCircle2, Clock, Circle, ChevronLeft, ChevronRight,
  Upload, Link2, ImageIcon, Video, Trash2, Pencil,
  Check, X, Play, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type StageStatus = "not_started" | "in_progress" | "completed";

interface MediaItem {
  id: string;
  type: "image" | "video_file" | "video_link";
  url: string;
  caption: string;
  uploadedAt: string;
}

const MOCK_STAGE = {
  id: "s5",
  order: 5,
  name: "پلستر",
  status: "in_progress" as StageStatus,
  projectId: "1",
  projectName: "درمنگی پلازہ بلاک-بی",
  media: [
    { id: "m1", type: "image" as const, url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80", caption: "مشرقی دیوار کا پلستر شروع", uploadedAt: "2026-03-10" },
    { id: "m2", type: "image" as const, url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80", caption: "نچلی منزل مکمل", uploadedAt: "2026-03-12" },
    { id: "m3", type: "video_link" as const, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "دیوار معائنہ ویڈیو", uploadedAt: "2026-03-13" },
  ] as MediaItem[],
};

const STAGE_STATUSES: { value: StageStatus; label: string; icon: React.ElementType; cls: string }[] = [
  { value: "not_started", label: "شروع نہیں ہوا", icon: Circle,       cls: "border-white/20 text-white/50 hover:bg-white/10" },
  { value: "in_progress", label: "جاری ہے",       icon: Clock,        cls: "border-primary/50 text-primary hover:bg-primary/10" },
  { value: "completed",   label: "مکمل",          icon: CheckCircle2, cls: "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10" },
];

const statusActiveCls: Record<StageStatus, string> = {
  not_started: "bg-white/10 border-white/30 text-white",
  in_progress: "bg-primary/20 border-primary text-primary",
  completed:   "bg-emerald-500/20 border-emerald-500 text-emerald-400",
};

export default function AdminStage() {
  const { id, stageId } = useParams();
  const navigate = useNavigate();

  const [stage, setStage] = useState(MOCK_STAGE);
  const [media, setMedia] = useState<MediaItem[]>(MOCK_STAGE.media);

  const [addMode, setAddMode] = useState<null | "photo" | "video">(null);
  const [videoTab, setVideoTab] = useState<"upload" | "link">("upload");
  const [videoLink, setVideoLink] = useState("");
  const [videoLinkCaption, setVideoLinkCaption] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCaption, setEditCaption] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleStatusChange = (s: StageStatus) => {
    setStage((prev) => ({ ...prev, status: s }));
    toast.success(`مرحلہ "${STAGE_STATUSES.find((x) => x.value === s)?.label}" کر دیا گیا`);
  };

  const handlePhotoFiles = (files: FileList | null) => {
    if (!files) return;
    const newItems: MediaItem[] = Array.from(files).map((file) => ({
      id: `m${Date.now()}-${Math.random()}`,
      type: "image",
      url: URL.createObjectURL(file),
      caption: "",
      uploadedAt: new Date().toISOString().split("T")[0],
    }));
    setMedia((prev) => [...prev, ...newItems]);
    setAddMode(null);
    toast.success(`${newItems.length} تصویر${newItems.length > 1 ? "یں" : ""} شامل ہو گئی`);
  };

  const handleVideoFile = (files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    const newItem: MediaItem = {
      id: `m${Date.now()}`,
      type: "video_file",
      url: URL.createObjectURL(file),
      caption: "",
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setMedia((prev) => [...prev, newItem]);
    setAddMode(null);
    toast.success("ویڈیو شامل ہو گئی");
  };

  const handleAddVideoLink = () => {
    if (!videoLink.trim()) { toast.error("براہ کرم ویڈیو لنک درج کریں"); return; }
    const newItem: MediaItem = {
      id: `m${Date.now()}`,
      type: "video_link",
      url: videoLink.trim(),
      caption: videoLinkCaption.trim(),
      uploadedAt: new Date().toISOString().split("T")[0],
    };
    setMedia((prev) => [...prev, newItem]);
    setVideoLink("");
    setVideoLinkCaption("");
    setAddMode(null);
    toast.success("ویڈیو لنک شامل ہو گیا");
  };

  const startEdit   = (item: MediaItem) => { setEditingId(item.id); setEditCaption(item.caption); };
  const saveCaption = (id: string) => {
    setMedia((prev) => prev.map((m) => m.id === id ? { ...m, caption: editCaption } : m));
    setEditingId(null);
  };

  const deleteItem = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
    setConfirmDelete(null);
    toast.success("میڈیا ہٹا دیا گیا");
  };

  const images = media.filter((m) => m.type === "image");
  const videos = media.filter((m) => m.type !== "image");

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
          <button onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <LayoutDashboard className="w-4 h-4" /> ڈیش بورڈ
          </button>
        </nav>
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={() => navigate("/admin")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm">
            <LogOut className="w-4 h-4" /> لاگ آؤٹ
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="p-8 max-w-5xl" style={{ marginRight: "15rem" }}>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-6 justify-end">
          <span className="text-white">{stage.name}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate(`/admin/projects/${id}`)} className="hover:text-white transition-colors">
            {stage.projectName}
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => navigate("/admin/dashboard")} className="hover:text-white transition-colors">
            ڈیش بورڈ
          </button>
        </div>

        {/* Stage header */}
        <div className="mb-8 text-right">
          <div className="flex items-center gap-3 mb-1 justify-end">
            <h1 className="text-2xl font-bold text-white">{stage.name}</h1>
            <span className="text-white/30 font-mono text-sm">{String(stage.order).padStart(2, "0")}</span>
          </div>
          <p className="text-white/40 text-sm">{stage.projectName}</p>
        </div>

        {/* ── Status selector ── */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <CardContent className="p-5">
            <p className="text-sm text-white/50 mb-3 text-right">مرحلے کی حیثیت</p>
            <div className="flex gap-3 flex-wrap justify-end">
              {STAGE_STATUSES.map(({ value, label, icon: Icon, cls }) => (
                <button
                  key={value}
                  onClick={() => handleStatusChange(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    stage.status === value ? statusActiveCls[value] : `${cls} bg-transparent`
                  }`}
                >
                  {stage.status === value && <Check className="w-3.5 h-3.5" />}
                  {label}
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ── Add media buttons ── */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <Button size="sm" onClick={() => setAddMode(addMode === "video" ? null : "video")}
              className="bg-primary hover:bg-primary/90 text-white gap-2">
              <Video className="w-4 h-4" /> ویڈیو شامل کریں
            </Button>
            <Button size="sm" variant="outline"
              onClick={() => { setAddMode("photo"); setTimeout(() => photoInputRef.current?.click(), 50); }}
              className="border-white/20 text-white hover:bg-white/10 gap-2">
              <ImageIcon className="w-4 h-4" /> تصاویر شامل کریں
            </Button>
          </div>
          <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
            میڈیا ({media.length})
          </h2>
        </div>

        {/* Hidden inputs */}
        <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => handlePhotoFiles(e.target.files)} />
        <input ref={videoInputRef} type="file" accept="video/*" className="hidden"
          onChange={(e) => handleVideoFile(e.target.files)} />

        {/* ── Video panel ── */}
        {addMode === "video" && (
          <Card className="bg-white/5 border-primary/30 mb-6">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <button onClick={() => setAddMode(null)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <h3 className="text-sm font-semibold text-white">ویڈیو شامل کریں</h3>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit mr-auto">
                {(["link", "upload"] as const).map((tab) => (
                  <button key={tab} onClick={() => setVideoTab(tab)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                      videoTab === tab ? "bg-white/15 text-white" : "text-white/40 hover:text-white"
                    }`}>
                    {tab === "upload"
                      ? <><Upload className="w-3.5 h-3.5" /> فائل اپلوڈ</>
                      : <><Link2 className="w-3.5 h-3.5" /> لنک چسپاں کریں</>}
                  </button>
                ))}
              </div>

              {videoTab === "upload" ? (
                <button onClick={() => videoInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl p-8 text-center transition-colors group">
                  <Upload className="w-8 h-8 text-white/30 group-hover:text-primary mx-auto mb-2 transition-colors" />
                  <p className="text-sm text-white/50 group-hover:text-white/70">ویڈیو فائل منتخب کرنے کے لیے کلک کریں</p>
                  <p className="text-xs text-white/25 mt-1">MP4، MOV، AVI قابل قبول ہیں</p>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/50 block text-right">یوٹیوب / گوگل ڈرائیو / کوئی بھی ویڈیو لنک</label>
                    <Input placeholder="https://youtube.com/watch?v=..." value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary text-left" dir="ltr" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/50 block text-right">عنوان (اختیاری)</label>
                    <Input placeholder="مثلاً: دیوار معائنہ ویڈیو" value={videoLinkCaption}
                      onChange={(e) => setVideoLinkCaption(e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary" />
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={handleAddVideoLink} className="bg-primary hover:bg-primary/90 text-white gap-2">
                      لنک شامل کریں <Link2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Empty state ── */}
        {media.length === 0 && (
          <Card className="bg-white/3 border-white/8 border-dashed">
            <CardContent className="py-16 text-center">
              <ImageIcon className="w-10 h-10 text-white/15 mx-auto mb-3" />
              <p className="text-white/30 text-sm">ابھی کوئی میڈیا نہیں ہے۔</p>
              <p className="text-white/20 text-xs mt-1">اس مرحلے کی دستاویز کے لیے تصاویر یا ویڈیوز شامل کریں۔</p>
            </CardContent>
          </Card>
        )}

        {/* ── Photo grid ── */}
        {images.length > 0 && (
          <div className="mb-8">
            <p className="text-xs text-white/30 uppercase tracking-wider font-medium mb-3 text-right">
              تصاویر ({images.length})
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {images.map((item) => (
                <div key={item.id} className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/10 aspect-square">
                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2.5">
                    <div className="flex justify-start gap-1.5">
                      <button onClick={() => setConfirmDelete(item.id)}
                        className="p-1.5 bg-red-500/30 hover:bg-red-500/50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5 text-red-300" />
                      </button>
                      <button onClick={() => startEdit(item)}
                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                        <Pencil className="w-3.5 h-3.5 text-white" />
                      </button>
                    </div>
                    {item.caption && <p className="text-xs text-white/80 leading-snug text-right">{item.caption}</p>}
                  </div>

                  {editingId === item.id && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col gap-2 p-3 justify-end">
                      <Input autoFocus value={editCaption} onChange={(e) => setEditCaption(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveCaption(item.id)}
                        placeholder="عنوان لکھیں..."
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/40 text-xs h-8" />
                      <div className="flex gap-1.5">
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 py-1 bg-white/10 rounded text-white/60 text-xs">منسوخ</button>
                        <button onClick={() => saveCaption(item.id)}
                          className="flex-1 py-1 bg-primary rounded text-white text-xs font-medium">محفوظ</button>
                      </div>
                    </div>
                  )}

                  {confirmDelete === item.id && (
                    <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center gap-3 p-3">
                      <p className="text-xs text-white text-center">یہ تصویر ہٹائیں؟</p>
                      <div className="flex gap-2">
                        <button onClick={() => setConfirmDelete(null)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded text-white/60 text-xs transition-colors">نہیں</button>
                        <button onClick={() => deleteItem(item.id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded text-white text-xs font-medium transition-colors">ہاں، ہٹائیں</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Video list ── */}
        {videos.length > 0 && (
          <div className="mb-8">
            <p className="text-xs text-white/30 uppercase tracking-wider font-medium mb-3 text-right">
              ویڈیوز ({videos.length})
            </p>
            <div className="space-y-3">
              {videos.map((item) => (
                <Card key={item.id} className="bg-white/5 border-white/10 group">
                  <CardContent className="p-4 flex items-center gap-4">
                    {/* Actions */}
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      {confirmDelete === item.id ? (
                        <>
                          <button onClick={() => setConfirmDelete(null)}
                            className="px-2.5 py-1.5 bg-white/10 rounded-lg text-white/50 text-xs transition-colors">نہیں</button>
                          <button onClick={() => deleteItem(item.id)}
                            className="px-2.5 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-white text-xs font-medium transition-colors">ہٹائیں</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setConfirmDelete(item.id)}
                            className="p-1.5 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-colors">
                            <Trash2 className="w-3.5 h-3.5 text-red-400" />
                          </button>
                          <button onClick={() => startEdit(item)}
                            className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                            <Pencil className="w-3.5 h-3.5 text-white/60" />
                          </button>
                          {item.type === "video_link" && (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                              <ExternalLink className="w-3.5 h-3.5 text-white/60" />
                            </a>
                          )}
                        </>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 text-right">
                      {editingId === item.id ? (
                        <div className="flex gap-2">
                          <button onClick={() => setEditingId(null)} className="p-1.5 bg-white/10 rounded text-white/50"><X className="w-3.5 h-3.5" /></button>
                          <button onClick={() => saveCaption(item.id)} className="p-1.5 bg-primary rounded text-white"><Check className="w-3.5 h-3.5" /></button>
                          <Input autoFocus value={editCaption} onChange={(e) => setEditCaption(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveCaption(item.id)}
                            className="bg-white/10 border-white/20 text-white text-sm h-8" />
                        </div>
                      ) : (
                        <>
                          <p className="text-sm text-white truncate">{item.caption || <span className="text-white/30 italic">کوئی عنوان نہیں</span>}</p>
                          <p className="text-xs text-white/30 mt-0.5 truncate" dir="ltr">
                            {item.type === "video_link" ? item.url : "اپلوڈ کی گئی ویڈیو"} · {item.uploadedAt}
                          </p>
                        </>
                      )}
                    </div>

                    {/* Thumbnail */}
                    <div className="w-16 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                      {item.type === "video_file" ? (
                        <>
                          <video src={item.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <Play className="w-4 h-4 text-white fill-white" />
                          </div>
                        </>
                      ) : (
                        <Play className="w-5 h-5 text-primary fill-primary" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="pb-8 pt-2 flex justify-end">
          <Button variant="outline" onClick={() => navigate(`/admin/projects/${id}`)}
            className="border-white/20 text-white hover:bg-white/10 gap-2">
            پروجیکٹ پر واپس <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
