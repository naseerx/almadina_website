import { Award, Users, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, team: 0, projects: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { icon: Award, value: 24, label: "Years of Experience", key: "years" as const },
    { icon: Users, value: 75, label: "Skilled Team Members", key: "team" as const },
    { icon: CheckCircle, value: 120, label: "Projects Completed", key: "projects" as const },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setIsVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 900;
    let raf = 0;
    const start = performance.now();
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const loop = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easeOutCubic(rawProgress);
      const nextCounts = {} as typeof counts;
      stats.forEach((s) => { nextCounts[s.key] = Math.floor(progress * s.value); });
      setCounts((prev) => ({ ...prev, ...nextCounts }));
      if (rawProgress < 1) {
        raf = requestAnimationFrame(loop);
      } else {
        const finalCounts = {} as typeof counts;
        stats.forEach((s) => (finalCounts[s.key] = s.value));
        setCounts((prev) => ({ ...prev, ...finalCounts }));
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our experience, dedication, and commitment to quality make us the ideal
            partner for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center py-8 px-6 group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-6xl font-black text-primary mb-2 tabular-nums">
                  {counts[stat.key]}+
                </div>
                <div className="text-base font-medium text-secondary">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
