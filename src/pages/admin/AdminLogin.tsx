import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("براہ کرم ای میل اور پاس ورڈ درج کریں۔");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="urdu min-h-screen bg-secondary flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
          backgroundSize: "20px 20px",
        }}
      />

      <div className="w-full max-w-md relative">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">المدینہ کنسٹرکشنز</h1>
          <p className="text-white/50 text-sm mt-1">پروجیکٹ ٹریکر — ایڈمن</p>
        </div>

        <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <h2 className="text-lg font-semibold text-white text-center">لاگ ان کریں</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <Label className="text-white/80 text-sm">ای میل</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    type="email"
                    placeholder="admin@almadina.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-primary text-left"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label className="text-white/80 text-sm">پاس ورڈ</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/30 focus:border-primary text-left"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-5"
              >
                {loading ? "لاگ ان ہو رہا ہے..." : "لاگ ان"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-white/30 text-xs mt-6">
          یہ پورٹل صرف مجاز اہلکاروں کے لیے ہے۔
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
