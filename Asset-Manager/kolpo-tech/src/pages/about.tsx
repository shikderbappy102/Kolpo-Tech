import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Brain, Code2, Shield, Heart, Zap, Globe, ArrowRight,
  Star, Award, Target, Lightbulb, Cpu, Network,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// ─── Text scramble hook ────────────────────────────────────────────────────────
function useTextScramble(text: string, triggered: boolean) {
  const [display, setDisplay] = useState(text);
  const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@$%&";

  useEffect(() => {
    if (!triggered) return;
    let iteration = 0;
    const total = text.length * 4;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, idx) => {
          if (char === " ") return " ";
          if (idx < iteration / 4) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= total) clearInterval(interval);
      iteration++;
    }, 28);
    return () => clearInterval(interval);
  }, [triggered]);

  return display;
}

// ─── 3D Magnetic card ─────────────────────────────────────────────────────────
function MagneticCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-60, 60], [10, -10]);
  const rotY = useTransform(mx, [-60, 60], [-10, 10]);
  const sRotX = useSpring(rotX, { stiffness: 200, damping: 30 });
  const sRotY = useSpring(rotY, { stiffness: 200, damping: 30 });

  const onMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set(e.clientX - (rect.left + rect.width / 2));
    my.set(e.clientY - (rect.top + rect.height / 2));
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Orbit ring ───────────────────────────────────────────────────────────────
function OrbitRing({
  r, speed, dotCount = 3, color, reverse = false, dotSize = 3
}: {
  r: number; speed: number; dotCount?: number; color: string; reverse?: boolean; dotSize?: number;
}) {
  const size = r * 2 + dotSize * 2;
  return (
    <motion.div
      className="absolute flex items-center justify-center"
      style={{ width: size, height: size, top: "50%", left: "50%", marginLeft: -size / 2, marginTop: -size / 2 }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
    >
      {Array.from({ length: dotCount }).map((_, i) => {
        const angle = (i / dotCount) * Math.PI * 2;
        const x = Math.cos(angle) * r + size / 2 - dotSize / 2;
        const y = Math.sin(angle) * r + size / 2 - dotSize / 2;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{ width: dotSize, height: dotSize, left: x, top: y, background: color, boxShadow: `0 0 ${dotSize * 3}px ${color}` }}
          />
        );
      })}
    </motion.div>
  );
}

// ─── Circuit SVG that draws in ────────────────────────────────────────────────
function CircuitLines({ revealed }: { revealed: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
      {[
        "M150,150 L220,80 L260,80",
        "M150,150 L80,220 L40,220",
        "M150,150 L240,170 L260,150",
        "M150,150 L60,130 L40,150",
        "M150,150 L180,240 L160,260",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="rgba(99,102,241,0.35)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={revealed ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
        />
      ))}
      {[[260, 80], [40, 220], [260, 150], [40, 150], [160, 260]].map(([cx, cy], i) => (
        <motion.circle
          key={`node-${i}`}
          cx={cx} cy={cy} r={4}
          fill="rgba(34,211,238,0.7)"
          initial={{ scale: 0, opacity: 0 }}
          animate={revealed ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: i * 0.15 + 0.6 }}
        />
      ))}
    </svg>
  );
}

// ─── Founder photo reveal ─────────────────────────────────────────────────────
function FounderReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (inView && phase === 0) setPhase(1);
    if (!inView) setPhase(0);
  }, [inView]);

  useEffect(() => {
    if (phase === 1) {
      const t = setTimeout(() => setPhase(2), 900);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const scrambled = useTextScramble("Al Amin Shikder Bappy", phase >= 1);

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Photo side */}
          <div ref={ref} className="relative flex-shrink-0" style={{ width: 300, height: 300 }}>
            {/* Circuit lines behind photo */}
            <CircuitLines revealed={phase >= 1} />

            {/* Orbit rings */}
            <AnimatePresence>
              {phase >= 1 && (
                <>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <OrbitRing r={155} speed={18} dotCount={2} color="rgba(99,102,241,0.7)" dotSize={4} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <OrbitRing r={132} speed={12} dotCount={3} color="rgba(34,211,238,0.5)" reverse dotSize={3} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <OrbitRing r={112} speed={8} dotCount={1} color="rgba(245,158,11,0.8)" dotSize={5} />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Photo container */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative" style={{ width: 200, height: 200 }}>
                {/* Glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={phase >= 2 ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.2 }}
                  style={{ boxShadow: "0 0 50px rgba(99,102,241,0.45), 0 0 100px rgba(34,211,238,0.2)", borderRadius: "50%" }}
                />

                {/* The photo */}
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden border-2"
                  style={{ borderColor: "rgba(99,102,241,0.4)" }}
                  initial={{ filter: "blur(24px)", scale: 0.8, opacity: 0 }}
                  animate={phase >= 2 ? { filter: "blur(0px)", scale: 1, opacity: 1 } : phase >= 1 ? { opacity: 0.2, scale: 0.85 } : {}}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img src="/founder.jpg" alt="Al Amin Shikder Bappy" className="w-full h-full object-cover" />
                </motion.div>

                {/* Scanning line effect */}
                <AnimatePresence>
                  {phase === 1 && (
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.8), transparent)" }}
                      initial={{ top: "0%", opacity: 0 }}
                      animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                      transition={{ duration: 0.9, ease: "linear" }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating tech badges */}
            {[
              { label: "AI", icon: Brain, x: -40, y: -30, delay: 1.2, color: "#6366f1" },
              { label: "Code", icon: Code2, x: 180, y: 20, delay: 1.5, color: "#22d3ee" },
              { label: "Scale", icon: Zap, x: -35, y: 200, delay: 1.8, color: "#f59e0b" },
            ].map(({ label, icon: Icon, x, y, delay, color }, i) => (
              <motion.div
                key={label}
                className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold backdrop-blur-sm"
                style={{
                  left: x + 100,
                  top: y,
                  background: `${color}1a`,
                  border: `1px solid ${color}55`,
                  color,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={phase >= 2 ? { opacity: 1, scale: 1, y: [0, -6, 0] } : { opacity: 0, scale: 0 }}
                transition={{
                  opacity: { duration: 0.4, delay },
                  scale: { type: "spring", stiffness: 260, damping: 20, delay },
                  y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: delay + 0.5 }
                }}
              >
                <Icon className="w-3 h-3" />
                {label}
              </motion.div>
            ))}
          </div>

          {/* Bio text side */}
          <div className="flex-1 max-w-lg">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-5 px-4 py-2 rounded-full border border-primary/30 bg-primary/10"
            >
              <Star className="w-3 h-3" /> Founder & CEO
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight font-mono"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {scrambled}
            </motion.h2>

            <motion.div
              className="w-16 h-0.5 mb-6 rounded-full"
              style={{ background: "linear-gradient(to right, #6366f1, #22d3ee)" }}
              initial={{ scaleX: 0 }}
              animate={phase >= 2 ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            {[
              "Builder of systems. Not just software.",
              "\"The future belongs to those who engineer it — not those who wait for it.\"",
              "Al Amin founded Kolpo Tech with a single belief: automation should be accessible to every industry, not just the Fortune 500. From clinics to compliance, his mission is to give smaller businesses the operating power of enterprises.",
            ].map((text, i) => (
              <motion.p
                key={i}
                className={i === 0 ? "text-lg font-semibold text-cyan-400 mb-3" : i === 1 ? "text-white/80 italic text-base mb-5 leading-relaxed" : "text-white/50 text-sm leading-relaxed"}
                initial={{ opacity: 0, y: 16 }}
                animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              >
                {text}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <a href="https://calendly.com/kolpotech/30min" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary/30 font-semibold">
                  Schedule a Chat <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Values with 3D magnetic tilt ────────────────────────────────────────────

const VALUES = [
  {
    number: "01",
    title: "Radical Efficiency",
    desc: "We measure success in hours reclaimed. If a process requires human intervention, it is a bug to be fixed.",
    icon: Zap,
    primary: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
  },
  {
    number: "02",
    title: "Architectural Elegance",
    desc: "The most powerful systems feel effortless. Complexity should live in the code, never in the UI.",
    icon: Network,
    primary: "#6366f1",
    glow: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
  },
  {
    number: "03",
    title: "Absolute Precision",
    desc: "In healthcare and compliance, 99% is not enough. We engineer for zero defects, every time.",
    icon: Target,
    primary: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.25)",
  },
];

function ValuesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-3">What drives us</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Core{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
              Principles
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {VALUES.map((v, i) => {
            const Icon = v.icon;
            return (
              <MagneticCard key={v.number} className="h-full">
                <div
                  className="h-full p-8 rounded-3xl"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 30% 30%, ${v.glow} 0%, rgba(9,11,22,0.9) 70%)`,
                    border: `1px solid ${v.border}`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: v.glow, border: `1px solid ${v.border}` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: v.primary }} />
                  </div>
                  <div className="text-5xl font-black mb-4 opacity-[0.07]" style={{ color: v.primary }}>
                    {v.number}
                  </div>
                  <h4 className="text-xl font-black text-white mb-3">{v.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </MagneticCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Animated stat bar ────────────────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: "50+", label: "Clients Served", color: "#6366f1" },
    { value: "10k+", label: "Hours Automated", color: "#22d3ee" },
    { value: "3", label: "AI Products", color: "#a78bfa" },
    { value: "99.9%", label: "System Uptime", color: "#f59e0b" },
  ];

  return (
    <section className="py-20 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Floating background icons ────────────────────────────────────────────────

function FloatingBgIcons() {
  const icons = [
    { Icon: Brain, x: "8%", y: "12%", size: 80, color: "#6366f1", delay: 0 },
    { Icon: Code2, x: "85%", y: "18%", size: 60, color: "#22d3ee", delay: 1 },
    { Icon: Shield, x: "5%", y: "70%", size: 55, color: "#a78bfa", delay: 0.5 },
    { Icon: Cpu, x: "88%", y: "72%", size: 65, color: "#f59e0b", delay: 1.5 },
    { Icon: Globe, x: "50%", y: "5%", size: 45, color: "#6366f1", delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, x, y, size, color, delay }, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.03]"
          style={{ left: x, top: y, width: size, height: size }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon className="w-full h-full" style={{ color, strokeWidth: 0.8 }} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: false, amount: 0.5 });
  const title1 = useTextScramble("The Agency", inView);
  const title2 = useTextScramble("Behind The", inView);
  const title3 = useTextScramble("Automation", inView);

  return (
    <section className="pt-36 pb-20 relative text-center">
      <div ref={titleRef}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold uppercase tracking-[0.35em] text-white/30 mb-6"
        >
          Kolpo Tech · Khulna, Bangladesh
        </motion.p>

        <div className="text-5xl md:text-7xl font-black leading-tight mb-8 font-mono">
          {[title1, title2].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-white"
            >
              {t}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-amber-400"
          >
            {title3}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Kolpo Tech is a software agency that builds AI-powered products and custom applications for clinics, training institutes, and compliance-driven businesses.
        </motion.p>
      </div>
    </section>
  );
}

// ─── Journey / Timeline ───────────────────────────────────────────────────────

function JourneySection() {
  const milestones = [
    { year: "2023", title: "Founded", desc: "Kolpo Tech started with one idea: automate the parts of business that drain people most.", color: "#6366f1" },
    { year: "2024", title: "First Products", desc: "ClinicFlow and SkillTrack launched, automating hundreds of hours of admin work monthly.", color: "#22d3ee" },
    { year: "2024", title: "CompliAI", desc: "Entered the RegTech space with continuous compliance monitoring for regulated industries.", color: "#a78bfa" },
    { year: "2025", title: "Scaling", desc: "50+ clients across healthcare, EdTech, and fintech. Growing team, bigger vision.", color: "#f59e0b" },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)" }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Our story</p>
          <h2 className="text-4xl font-black text-white">
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-primary">
              Got Here
            </span>
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[30px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/30 via-cyan-400/20 to-transparent" />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div
                    className="inline-block text-xs font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3"
                    style={{ background: `${m.color}15`, color: m.color, border: `1px solid ${m.color}30` }}
                  >
                    {m.year}
                  </div>
                  <h4 className="text-xl font-black text-white mb-2">{m.title}</h4>
                  <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 w-[30px] md:w-0 flex justify-center">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 absolute top-1"
                    style={{ borderColor: m.color, background: "#060912", boxShadow: `0 0 16px ${m.color}` }}
                    whileInView={{ scale: [0, 1.4, 1] }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                  />
                </div>

                {/* Empty opposite side on mobile */}
                <div className="hidden md:flex flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-24 relative text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        className="container mx-auto px-4 max-w-2xl"
      >
        <div
          className="rounded-3xl p-12 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(34,211,238,0.05) 100%)",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ boxShadow: "inset 0 0 60px rgba(99,102,241,0.08)" }}
          />
          <Lightbulb className="w-10 h-10 text-amber-400 mx-auto mb-5" />
          <h2 className="text-3xl font-black text-white mb-4">Have a project in mind?</h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Book a free 30-minute call. We will listen, understand, and tell you exactly how we can help.
          </p>
          <a href="https://calendly.com/kolpotech/30min" target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="h-13 px-8 bg-white text-black hover:bg-white/90 font-bold text-base"
            >
              Book a Free Call <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─── Main About page ──────────────────────────────────────────────────────────
export default function About() {
  return (
    <div className="min-h-screen bg-[#060912] relative">
      <FloatingBgIcons />
      <HeroSection />
      <StatsSection />
      <FounderReveal />
      <ValuesSection />
      <JourneySection />
      <CTASection />
    </div>
  );
}
