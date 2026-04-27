import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Building2, MapPin, Calendar, User, CheckCircle2,
  Clock, Circle, ChevronDown, ImageIcon, Play,
  ExternalLink, Phone, AlertTriangle,
} from "lucide-react";
import logo from "@/assets/logo-rm.png";

// ── Types ─────────────────────────────────────────────────────────────────────
type StageStatus = "not_started" | "in_progress" | "completed";

interface MediaItem {
  id: string;
  type: "image" | "video_file" | "video_link";
  url: string;
  caption: string;
  uploadedAt: string;
}

interface Stage {
  id: string;
  order: number;
  name: string;
  status: StageStatus;
  media: MediaItem[];
}

// ── Mock data (replace with Firestore fetch via token) ────────────────────────
const MOCK_DATA: Record<string, {
  valid: boolean;
  project?: {
    name: string; clientName: string; address: string;
    type: string; startDate: string; status: string;
    stages: Stage[];
  };
}> = {
  "dmg-plaza-b-2026": {
    valid: true,
    project: {
      name: "Darmangi Plaza Block-B",
      clientName: "Mr. Ahmad Khalil",
      address: "Street 4, Warsak Road, Peshawar",
      type: "Commercial",
      status: "active",
      startDate: "2026-01-15",
      stages: [
        {
          id: "s1", order: 1, name: "Site Preparation", status: "completed",
          media: [
            { id: "m1", type: "image", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", caption: "Site cleared and levelled", uploadedAt: "2026-01-20" },
            { id: "m2", type: "image", url: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=600&q=80", caption: "Boundary walls marked", uploadedAt: "2026-01-22" },
          ],
        },
        {
          id: "s2", order: 2, name: "Foundation", status: "completed",
          media: [
            { id: "m3", type: "image", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80", caption: "Foundation excavation complete", uploadedAt: "2026-02-05" },
            { id: "m4", type: "image", url: "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=600&q=80", caption: "Concrete poured — east wing", uploadedAt: "2026-02-10" },
            { id: "m5", type: "video_link", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Foundation inspection walkthrough", uploadedAt: "2026-02-12" },
          ],
        },
        {
          id: "s3", order: 3, name: "Brickwork / Structure", status: "completed",
          media: [
            { id: "m6", type: "image", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", caption: "Ground floor structure complete", uploadedAt: "2026-02-28" },
          ],
        },
        {
          id: "s4", order: 4, name: "Roof Work", status: "completed",
          media: [
            { id: "m7", type: "image", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", caption: "Roof slab poured", uploadedAt: "2026-03-08" },
          ],
        },
        {
          id: "s5", order: 5, name: "Plaster", status: "in_progress",
          media: [
            { id: "m8", type: "image", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80", caption: "East wall plastering in progress", uploadedAt: "2026-03-10" },
            { id: "m9", type: "video_link", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Plaster quality check", uploadedAt: "2026-03-13" },
          ],
        },
        { id: "s6",  order: 6,  name: "Electrical & Plumbing", status: "not_started", media: [] },
        { id: "s7",  order: 7,  name: "Carpenter Work",        status: "not_started", media: [] },
        { id: "s8",  order: 8,  name: "Tiling & Flooring",     status: "not_started", media: [] },
        { id: "s9",  order: 9,  name: "Painting",              status: "not_started", media: [] },
        { id: "s10", order: 10, name: "Final Finishing",        status: "not_started", media: [] },
        { id: "s11", order: 11, name: "Key Handover",           status: "not_started", media: [] },
      ],
    },
  },
  "revoked-token": { valid: false },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const statusConfig: Record<StageStatus, {
  label: string; icon: React.ElementType; dot: string; badge: string;
}> = {
  completed:   { label: "Completed",   icon: CheckCircle2, dot: "bg-emerald-500", badge: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  in_progress: { label: "In Progress", icon: Clock,        dot: "bg-primary animate-pulse", badge: "text-primary bg-primary/10 border-primary/30" },
  not_started: { label: "Not Started", icon: Circle,       dot: "bg-gray-300",   badge: "text-gray-400 bg-gray-50 border-gray-200" },
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function ProjectTracker() {
  const { token } = useParams<{ token: string }>();
  const data = MOCK_DATA[token ?? ""] ?? { valid: false };

  const [openStages, setOpenStages] = useState<Set<string>>(
    new Set(data.valid ? data.project!.stages.filter((s) => s.status !== "not_started").map((s) => s.id) : [])
  );
  const [lightbox, setLightbox] = useState<string | null>(null);

  const toggleStage = (id: string) => {
    setOpenStages((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Revoked / invalid ──────────────────────────────────────────────────────
  if (!data.valid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 mb-2">Link Not Available</h1>
          <p className="text-gray-500 text-sm mb-6">
            This project link is no longer active. Please contact Al-Madina Constructions for an updated link.
          </p>
          <a
            href="tel:+923339221258"
            className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" /> Contact Us
          </a>
        </div>
      </div>
    );
  }

  const project = data.project!;
  const completed = project.stages.filter((s) => s.status === "completed").length;
  const total = project.stages.length;
  const progressPct = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header className="bg-secondary text-white">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <img src={logo} alt="Al-Madina" className="h-9 object-contain" />
            <span className="text-xs text-white/50 hidden sm:block">Project Progress Tracker</span>
          </div>
        </div>
      </header>

      {/* ── Project hero ── */}
      <div className="bg-secondary text-white pb-10 pt-4">
        <div className="container mx-auto px-4">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
              project.status === "completed"
                ? "bg-primary/20 text-primary border-primary/40"
                : "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
            }`}>
              {project.status === "completed" ? "Completed" : "In Progress"}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full border font-medium bg-blue-500/20 text-blue-300 border-blue-500/40">
              {project.type}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold mb-3">{project.name}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-white/50 mb-8">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{project.clientName}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{project.address}</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Started {new Date(project.startDate).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          {/* Progress bar */}
          <div className="max-w-lg">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">Overall Progress</span>
              <span className="font-bold text-primary">{progressPct}%</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-2">{completed} of {total} stages completed</p>
          </div>
        </div>
      </div>

      {/* ── Stage timeline ── */}
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Construction Stages</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gray-200 z-0" />

          <div className="space-y-3">
            {project.stages.map((stage) => {
              const cfg = statusConfig[stage.status];
              const Icon = cfg.icon;
              const isOpen = openStages.has(stage.id);
              const hasMedia = stage.media.length > 0;
              const images = stage.media.filter((m) => m.type === "image");
              const videos = stage.media.filter((m) => m.type !== "image");

              return (
                <div key={stage.id} className="relative pl-10">
                  {/* Dot */}
                  <div className={`absolute left-[8px] top-4 w-4 h-4 rounded-full border-2 border-white z-10 shadow-sm ${cfg.dot}`} />

                  <div className={`rounded-xl border overflow-hidden transition-all ${
                    stage.status === "in_progress" ? "border-primary/30 shadow-sm shadow-primary/10" :
                    stage.status === "completed"   ? "border-emerald-200" : "border-gray-200"
                  } bg-white`}>
                    {/* Stage header row */}
                    <button
                      onClick={() => hasMedia && toggleStage(stage.id)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${hasMedia ? "cursor-pointer hover:bg-gray-50" : "cursor-default"} transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 flex-shrink-0 ${
                          stage.status === "completed" ? "text-emerald-500" :
                          stage.status === "in_progress" ? "text-primary" : "text-gray-300"
                        }`} />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`font-semibold text-sm ${stage.status === "not_started" ? "text-gray-400" : "text-gray-800"}`}>
                              {stage.name}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                          </div>
                          {hasMedia && (
                            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                              <ImageIcon className="w-3 h-3" />
                              {stage.media.length} update{stage.media.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>

                      {hasMedia && (
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                      )}
                    </button>

                    {/* Media panel */}
                    {isOpen && hasMedia && (
                      <div className="border-t border-gray-100 px-4 pb-4 pt-3 space-y-4">
                        {/* Photos */}
                        {images.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Photos</p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {images.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => setLightbox(item.url)}
                                  className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer"
                                >
                                  <img src={item.url} alt={item.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                  {item.caption && (
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <p className="text-xs text-white leading-snug">{item.caption}</p>
                                    </div>
                                  )}
                                  <p className="text-xs text-gray-400 mt-1 text-center">{item.uploadedAt}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Videos */}
                        {videos.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-2">Videos</p>
                            <div className="space-y-2">
                              {videos.map((item) => (
                                <a
                                  key={item.id}
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Play className="w-4 h-4 text-primary fill-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                      {item.caption || "Watch Video"}
                                    </p>
                                    <p className="text-xs text-gray-400">{item.uploadedAt}</p>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white mt-6 py-8">
        <div className="container mx-auto px-4 text-center">
          <img src={logo} alt="Al-Madina" className="h-8 object-contain mx-auto mb-3 opacity-60" />
          <p className="text-sm text-gray-500">Al-Madina Al-Munawwara Constructions & Builders</p>
          <a href="tel:+923339221258" className="text-sm text-primary hover:underline mt-1 inline-block">
            +92 333 9221258
          </a>
        </div>
      </footer>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt=""
            className="max-w-full max-h-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
