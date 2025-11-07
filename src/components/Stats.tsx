import { Award, Users, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ years: 0, team: 0, projects: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      icon: Award,
      value: 6,
      label: "Years of Experience",
      key: "years" as const,
    },
    {
      icon: Users,
      value: 6,
      label: "Skilled Team Members",
      key: "team" as const,
    },
    {
      icon: CheckCircle,
      value: 6,
      label: "Projects Completed",
      key: "projects" as const,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    // Smooth, single-loop animation using requestAnimationFrame.
    // Faster duration and ease-out curve produce a smooth, non-laggy animation.
    const duration = 900; // shorter duration (ms) for snappier feel
    let raf = 0 as number;
    const start = performance.now();
    const animatedOnce = { current: false } as { current: boolean };

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const loop = (now: number) => {
      const elapsed = now - start;
      const rawProgress = Math.min(elapsed / duration, 1);
      const progress = easeOutCubic(rawProgress);

      const nextCounts = {} as typeof counts;
      stats.forEach((stat) => {
        nextCounts[stat.key] = Math.floor(progress * stat.value);
      });

      setCounts((prev) => ({ ...prev, ...nextCounts }));

      if (rawProgress < 1) {
        raf = requestAnimationFrame(loop);
      } else {
        // ensure final values are exact
        const finalCounts = {} as typeof counts;
        stats.forEach((stat) => (finalCounts[stat.key] = stat.value));
        setCounts((prev) => ({ ...prev, ...finalCounts }));
        animatedOnce.current = true;
      }
    };

    // Start animation only once when visible
    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="py-20 bg-secondary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Our experience, dedication, and commitment to quality make us the ideal
            partner for your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-5xl font-bold text-primary mb-2">
                  {counts[stat.key]}+
                </div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
