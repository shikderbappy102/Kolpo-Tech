import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; opacity: number;
  pulse: number; pulseSpeed: number;
}

// Formation cluster: 5 particles that drift together as one group
interface FormationLeader { x: number; y: number; vx: number; vy: number; }

const FORMATION_OFFSETS = [
  { dx: 0, dy: 0 },
  { dx: 32, dy: -18 },
  { dx: -28, dy: 22 },
  { dx: 44, dy: 28 },
  { dx: -12, dy: -36 },
];

export default function CanvasNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollYRef = useRef(0);
  const targetScrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const COUNT = 72;
    const MAX_DIST = 155;
    let leader: FormationLeader = { x: 0, y: 0, vx: 0.22, vy: 0.14 };

    const onScroll = () => { targetScrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      leader.x = canvas.width * 0.3;
      leader.y = canvas.height * 0.4;
    };

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.4 + 0.5,
          opacity: Math.random() * 0.4 + 0.2,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
        });
      }
    };

    const draw = () => {
      // Smooth scroll parallax
      scrollYRef.current += (targetScrollRef.current - scrollYRef.current) * 0.04;
      const parallax = scrollYRef.current * 0.18;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Advance formation leader
      leader.x += leader.vx;
      leader.y += leader.vy;
      if (leader.x < -60) leader.x = canvas.width + 60;
      if (leader.x > canvas.width + 60) leader.x = -60;
      if (leader.y < -60) leader.y = canvas.height + 60;
      if (leader.y > canvas.height + 60) leader.y = -60;

      // Build formation positions
      const formation = FORMATION_OFFSETS.map((off) => ({
        x: leader.x + off.dx,
        y: leader.y + off.dy - parallax,
      }));

      // Combine regular particles (with parallax) + formation
      const allParticles = [
        ...particles.map((p) => ({ x: p.x, y: p.y - parallax, r: p.radius, op: p.opacity, pulse: p.pulse, pulseSpeed: p.pulseSpeed, isFormation: false })),
        ...formation.map((f) => ({ x: f.x, y: f.y, r: 1.8, op: 0.55, pulse: 0, pulseSpeed: 0, isFormation: true })),
      ];

      // Draw connections between ALL nearby points (regular + formation)
      for (let i = 0; i < allParticles.length; i++) {
        const a = allParticles[i];
        for (let j = i + 1; j < allParticles.length; j++) {
          const b = allParticles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * (a.isFormation || b.isFormation ? 0.55 : 0.28);
            const t = dist / MAX_DIST;
            const r = Math.round(99 + (34 - 99) * t);
            const g = Math.round(102 + (211 - 102) * t);
            const b2 = Math.round(241 + (238 - 241) * t);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${r},${g},${b2},${alpha})`;
            ctx.lineWidth = a.isFormation || b.isFormation ? 0.9 : 0.55;
            ctx.stroke();
          }
        }
      }

      // Draw regular particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.pulse += p.pulseSpeed;

        const drawY = p.y - parallax;
        const op = p.opacity + Math.sin(p.pulse) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,180,252,${op})`;
        ctx.fill();
      }

      // Draw formation dots with glow
      for (const fp of formation) {
        const grad = ctx.createRadialGradient(fp.x, fp.y, 0, fp.x, fp.y, 8);
        grad.addColorStop(0, "rgba(200,220,255,0.7)");
        grad.addColorStop(1, "rgba(140,160,255,0)");
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(fp.x, fp.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,230,255,0.9)";
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(99,102,241,0.22) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 90%, rgba(34,211,238,0.12) 0%, transparent 60%), linear-gradient(to bottom, rgba(9,11,18,0.3) 0%, rgba(9,11,18,0.75) 60%, rgba(9,11,18,1) 100%)",
        }}
      />
    </div>
  );
}
