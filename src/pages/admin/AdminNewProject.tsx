import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight, Building2, User, MapPin, Calendar,
  ChevronDown, Check, Plus, Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const DEFAULT_STAGES = [
  "جائے وقوع کی تیاری",
  "بنیاد",
  "چنائی / ڈھانچہ",
  "چھت کا کام",
  "پلستر",
  "بجلی و پلمبنگ",
  "بڑھئی کا کام",
  "ٹائلنگ و فرش",
  "رنگ کاری",
  "آخری تکمیل",
  "چابی کی حوالگی",
];

const PROJECT_TYPES = ["تجارتی", "رہائشی", "مسجد", "پلازہ", "ولا"];

export default function AdminNewProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    clientName: "",
    address: "",
    type: "تجارتی",
    startDate: new Date().toISOString().split("T")[0],
  });

  const [stages, setStages] = useState<string[]>(DEFAULT_STAGES);
  const [newStage, setNewStage] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())       e.name       = "پروجیکٹ کا نام ضروری ہے۔";
    if (!form.clientName.trim()) e.clientName = "کلائنٹ کا نام ضروری ہے۔";
    if (!form.address.trim())    e.address    = "پتہ ضروری ہے۔";
    if (!form.startDate)         e.startDate  = "شروع کی تاریخ ضروری ہے۔";
    if (stages.length === 0)     e.stages     = "کم از کم ایک مرحلہ ضروری ہے۔";
    return e;
  };

  const addStage = () => {
    const trimmed = newStage.trim();
    if (!trimmed) return;
    setStages((s) => [...s, trimmed]);
    setNewStage("");
    setErrors((e) => ({ ...e, stages: "" }));
  };

  const removeStage = (index: number) => setStages((s) => s.filter((_, i) => i !== index));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/admin/dashboard"); }, 800);
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
        <div className="flex-1" />
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <ArrowRight className="w-4 h-4" />
            ڈیش بورڈ پر واپس
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="mr-60 p-8 max-w-3xl mr-auto" style={{ marginRight: "15rem" }}>
        {/* Back */}
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 text-white/40 hover:text-white text-sm mb-4 transition-colors"
        >
          ڈیش بورڈ <ArrowRight className="w-4 h-4" />
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">نیا پروجیکٹ</h1>
          <p className="text-white/40 text-sm mt-0.5">
            تفصیلات بھریں — مراحل پہلے سے طے شدہ ہیں۔
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ── Project Details ── */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 space-y-5">
              <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
                پروجیکٹ کی تفصیلات
              </h2>

              {/* Name */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm">پروجیکٹ کا نام</Label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    placeholder="مثلاً: درمنگی پلازہ بلاک-بی"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary"
                  />
                </div>
                {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
              </div>

              {/* Client Name */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm">کلائنٹ کا نام</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    placeholder="مثلاً: جناب احمد خلیل"
                    value={form.clientName}
                    onChange={(e) => set("clientName", e.target.value)}
                    className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary"
                  />
                </div>
                {errors.clientName && <p className="text-xs text-red-400">{errors.clientName}</p>}
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <Label className="text-white/70 text-sm">پتہ</Label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    placeholder="مثلاً: گلی نمبر ۴، وارسک روڈ، پشاور"
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                    className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary"
                  />
                </div>
                {errors.address && <p className="text-xs text-red-400">{errors.address}</p>}
              </div>

              {/* Type + Date */}
              <div className="grid grid-cols-2 gap-4">
                {/* Type */}
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">پروجیکٹ کی قسم</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setTypeOpen(!typeOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm hover:border-white/40 transition-colors"
                    >
                      {form.type}
                      <ChevronDown className={`w-4 h-4 text-white/40 transition-transform ${typeOpen ? "rotate-180" : ""}`} />
                    </button>
                    {typeOpen && (
                      <div className="absolute top-full right-0 mt-1 w-full bg-secondary border border-white/20 rounded-md overflow-hidden z-10 shadow-xl">
                        {PROJECT_TYPES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => { set("type", t); setTypeOpen(false); }}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            {form.type === t && <Check className="w-3.5 h-3.5 text-primary" />}
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Start date */}
                <div className="space-y-1.5">
                  <Label className="text-white/70 text-sm">شروع کی تاریخ</Label>
                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <Input
                      type="date"
                      value={form.startDate}
                      onChange={(e) => set("startDate", e.target.value)}
                      className="pr-10 bg-white/10 border-white/20 text-white focus:border-primary [color-scheme:dark]"
                      dir="ltr"
                    />
                  </div>
                  {errors.startDate && <p className="text-xs text-red-400">{errors.startDate}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Stages ── */}
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30">{stages.length} مراحل</span>
                <h2 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
                  تعمیراتی مراحل
                </h2>
              </div>

              <p className="text-xs text-white/40 text-right">
                طے شدہ مراحل پہلے سے موجود ہیں۔ ضرورت کے مطابق شامل یا حذف کریں۔
              </p>

              <div className="space-y-2">
                {stages.map((stage, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 group"
                  >
                    <button
                      type="button"
                      onClick={() => removeStage(i)}
                      className="text-white/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="flex-1 text-sm text-white text-right">{stage}</span>
                    <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>

              {errors.stages && <p className="text-xs text-red-400 text-right">{errors.stages}</p>}

              {/* Add custom stage */}
              <div className="flex gap-2 pt-1">
                <Button
                  type="button"
                  onClick={addStage}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 gap-1.5 flex-shrink-0"
                >
                  <Plus className="w-4 h-4" /> شامل کریں
                </Button>
                <Input
                  placeholder="نیا مرحلہ شامل کریں..."
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addStage())}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/25 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Actions ── */}
          <div className="flex gap-3 justify-end pb-8">
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
            >
              {loading ? "بنایا جا رہا ہے..." : "پروجیکٹ بنائیں"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/dashboard")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              منسوخ
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
