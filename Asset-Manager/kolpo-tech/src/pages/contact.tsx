import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) translateZ(12px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.4s cubic-bezier(0.22,1,0.36,1)";
    ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-150 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

function FloatingOrb({ x, y, size, color, delay }: { x: string; y: string; size: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: x, top: y, width: size, height: size, background: color, filter: "blur(60px)" }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function CalendlyWidget() {
  useEffect(() => {
    const existing = document.getElementById("calendly-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "calendly-script";
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden"
      data-url={`${CALENDLY}?background_color=060912&text_color=ffffff&primary_color=6366f1`}
      style={{ minWidth: "320px", height: "700px" }}
    />
  );
}

const contactCards = [
  {
    icon: Mail,
    label: "Email",
    value: "alaminshikderbappy@gmail.com",
    href: "mailto:alaminshikderbappy@gmail.com",
    color: "#6366f1",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: MapPin,
    label: "Global HQ",
    value: "Khulna, Bangladesh",
    href: null,
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.15)",
  },
  {
    icon: Phone,
    label: "Quick Call",
    value: "Book 30 min — free",
    href: CALENDLY,
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
  },
];

export default function Contact() {
  const [typed, setTyped] = useState("");
  const full = "Let's build something great.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16 relative overflow-hidden">
      <FloatingOrb x="0%" y="10%" size={500} color="rgba(99,102,241,0.08)" delay={0} />
      <FloatingOrb x="60%" y="30%" size={400} color="rgba(34,211,238,0.06)" delay={1.2} />
      <FloatingOrb x="20%" y="60%" size={350} color="rgba(245,158,11,0.05)" delay={2} />

      {/* Circuit-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ─── Left: Info ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-primary mb-6 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Connect With Us
              </span>

              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight min-h-[3.5em]">
                {typed}
                <motion.span
                  className="inline-block w-0.5 h-10 bg-primary ml-1 align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </h1>

              <p className="text-lg text-white/45 mb-12 max-w-sm leading-relaxed">
                Reach out and we will tell you exactly what you need — honestly, in 30 minutes.
              </p>

              <div className="space-y-4">
                {contactCards.map((card, i) => {
                  const Icon = card.icon;
                  const inner = (
                    <TiltCard>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.12 }}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-white/8 cursor-pointer group"
                        style={{
                          background: `linear-gradient(135deg, ${card.glow} 0%, rgba(6,9,18,0.6) 100%)`,
                        }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: card.glow, border: `1px solid ${card.color}30` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: card.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider text-white/35 mb-0.5">{card.label}</p>
                          <p className="text-sm font-semibold text-white/80 truncate">{card.value}</p>
                        </div>
                        {card.href && (
                          <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0" />
                        )}
                      </motion.div>
                    </TiltCard>
                  );

                  return card.href ? (
                    <a
                      key={i}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={i}>{inner}</div>
                  );
                })}
              </div>

              {/* Floating orbit ring decoration */}
              <div className="mt-16 relative h-40 hidden lg:block">
                <motion.div
                  className="absolute left-8 w-32 h-32 rounded-full border border-primary/15"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </motion.div>
                <motion.div
                  className="absolute left-16 top-4 w-24 h-24 rounded-full border border-cyan-400/10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </motion.div>
                <div className="absolute left-16 top-8 w-16 h-16 rounded-full border border-white/5" />
                <div className="absolute left-22 top-12 text-xs text-white/20 font-mono">
                  Khulna, BD<br />
                  <span className="text-primary/60">24.8649° N</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ─── Right: Calendly widget ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div
              className="rounded-3xl overflow-hidden border border-white/8 shadow-2xl"
              style={{ boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.08)" }}
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/8"
                style={{ background: "rgba(9,11,22,0.8)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 mx-3 h-5 rounded-md bg-white/5 flex items-center px-3">
                  <span className="text-[10px] text-white/25 font-mono">calendly.com/alaminshikderbappy</span>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  LIVE
                </span>
              </div>
              <CalendlyWidget />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
