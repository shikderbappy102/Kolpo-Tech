import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Activity, GraduationCap, ShieldCheck, Code2, ArrowRight, CheckCircle2,
  Heart, Calendar, Clock, BookOpen, Users, Star, Shield, Lock, FileCheck,
  Zap, Globe, Cpu, Layers,
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  {
    id: "clinicflow",
    name: "ClinicFlow",
    category: "Healthcare AI",
    tagline: "AI scheduling and patient automation for modern clinics",
    description: "Clinics using ClinicFlow eliminate 3 or more hours of daily admin work. Smart scheduling, no-show prediction, and automated billing, all in one engine.",
    features: ["Smart Scheduling", "No-show Prediction", "Auto Billing", "Real-time Analytics"],
    icon: Activity,
    href: "/demo/clinicflow",
    primary: "#6366f1",
    secondary: "#818cf8",
    glow: "rgba(99,102,241,0.18)",
    border: "rgba(99,102,241,0.3)",
    entryX: -120,
    entryRotateY: 22,
    floatIcons: [
      { Icon: Heart, pos: { left: "-7%", top: "8%", size: 72 }, delay: 0 },
      { Icon: Calendar, pos: { right: "-8%", top: "25%", size: 56 }, delay: 0.8 },
      { Icon: Clock, pos: { left: "-5%", top: "62%", size: 64 }, delay: 0.4 },
      { Icon: Activity, pos: { right: "-6%", top: "68%", size: 48 }, delay: 1.2 },
    ],
  },
  {
    id: "skilltrack",
    name: "SkillTrack",
    category: "EdTech AI",
    tagline: "Training intelligence for institutes that cannot afford drop-offs",
    description: "Every student tracked in real-time. Risk alerts sent before they disappear. Certifications issued automatically when they succeed.",
    features: ["Progress Heatmaps", "Early Risk Alerts", "Auto Certification", "Cohort Analytics"],
    icon: GraduationCap,
    href: "/demo/skilltrack",
    primary: "#22d3ee",
    secondary: "#67e8f9",
    glow: "rgba(34,211,238,0.15)",
    border: "rgba(34,211,238,0.3)",
    entryX: 120,
    entryRotateY: -22,
    floatIcons: [
      { Icon: BookOpen, pos: { left: "-7%", top: "12%", size: 68 }, delay: 0.2 },
      { Icon: Star, pos: { right: "-7%", top: "20%", size: 52 }, delay: 0.9 },
      { Icon: Users, pos: { left: "-5%", top: "58%", size: 60 }, delay: 0.5 },
      { Icon: GraduationCap, pos: { right: "-6%", top: "65%", size: 50 }, delay: 1.3 },
    ],
  },
  {
    id: "compliai",
    name: "CompliAI",
    category: "RegTech AI",
    tagline: "Compliance monitoring that never sleeps, never misses",
    description: "Continuous audit monitoring, automated risk matrices, and regulator-ready reports generated before you're even asked.",
    features: ["Continuous Audits", "Auto Risk Matrix", "Policy Reports", "Regulator-Ready Export"],
    icon: ShieldCheck,
    href: "/demo/compliai",
    primary: "#a78bfa",
    secondary: "#c4b5fd",
    glow: "rgba(167,139,250,0.15)",
    border: "rgba(167,139,250,0.3)",
    entryX: -120,
    entryRotateY: 22,
    floatIcons: [
      { Icon: Shield, pos: { left: "-7%", top: "10%", size: 70 }, delay: 0 },
      { Icon: Lock, pos: { right: "-7%", top: "22%", size: 54 }, delay: 0.7 },
      { Icon: FileCheck, pos: { left: "-5%", top: "60%", size: 62 }, delay: 0.4 },
      { Icon: ShieldCheck, pos: { right: "-5%", top: "68%", size: 48 }, delay: 1.1 },
    ],
  },
  {
    id: "appdev",
    name: "App Development",
    category: "Custom Software",
    tagline: "Full-stack web and mobile apps built to ship fast and scale further",
    description: "We design and build production-ready web and mobile applications, from MVPs to enterprise platforms, using modern stacks and AI-accelerated workflows.",
    features: ["Web & Mobile Apps", "AI Integration", "API Development", "UI/UX Design"],
    icon: Code2,
    href: "/contact",
    primary: "#f59e0b",
    secondary: "#fcd34d",
    glow: "rgba(245,158,11,0.15)",
    border: "rgba(245,158,11,0.3)",
    entryX: 120,
    entryRotateY: -22,
    floatIcons: [
      { Icon: Code2, pos: { left: "-7%", top: "10%", size: 68 }, delay: 0.1 },
      { Icon: Zap, pos: { right: "-7%", top: "24%", size: 52 }, delay: 0.8 },
      { Icon: Globe, pos: { left: "-5%", top: "60%", size: 58 }, delay: 0.5 },
      { Icon: Cpu, pos: { right: "-5%", top: "65%", size: 50 }, delay: 1.2 },
      { Icon: Layers, pos: { left: "50%", top: "-8%", size: 44 }, delay: 1.5 },
    ],
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Scroll3DProducts() {
  return (
    <section className="py-24 relative bg-[#060912]">
      <div className="text-center mb-20 px-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white/30 mb-4"
        >
          Products and Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black text-white"
        >
          What We{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-amber-400">
            Build
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/45 mt-4 max-w-lg mx-auto text-base"
        >
          Three proprietary AI products and one full-service app development practice, all under one roof.
        </motion.p>
      </div>

      <div className="flex flex-col gap-8 md:gap-10 max-w-3xl mx-auto px-4">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = product.icon;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 95%", "start 32%"],
  });

  const x       = useTransform(scrollYProgress, [0, 1], [product.entryX, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [product.entryRotateY, 0]);
  const scale   = useTransform(scrollYProgress, [0, 1], [0.87, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.6, 1]);

  return (
    <div ref={ref} className="relative" style={{ perspective: "1200px" }}>
      {/* Floating ambient icons — behind card, fade in with card */}
      {product.floatIcons.map(({ Icon: FIcon, pos, delay }, fi) => (
        <FloatingIcon
          key={fi}
          Icon={FIcon}
          pos={pos}
          delay={delay}
          color={product.primary}
          scrollYProgress={scrollYProgress}
        />
      ))}

      {/* 3D card */}
      <motion.div
        style={{ x, rotateY, scale, opacity, transformStyle: "preserve-3d" }}
        className="relative rounded-3xl overflow-visible"
      >
        {/* Glow blob */}
        <div
          className="absolute -inset-px rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 70% 60% at ${index % 2 === 0 ? "20%" : "80%"} 50%, ${product.glow} 0%, transparent 70%)`,
          }}
        />

        {/* Surface */}
        <div
          className="relative rounded-3xl p-7 md:p-9"
          style={{
            background: "linear-gradient(145deg, rgba(14,16,32,0.97) 0%, rgba(9,11,22,0.92) 100%)",
            border: `1px solid ${product.border}`,
            boxShadow: `0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)`,
          }}
        >
          <div className="flex flex-col md:flex-row gap-7 items-start">
            {/* Animated text content */}
            <motion.div
              className="flex-1 min-w-0"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Header row */}
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: product.glow, border: `1px solid ${product.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: product.primary }} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: product.primary }}>
                    {product.category}
                  </p>
                  <h3 className="text-xl font-black text-white leading-tight">{product.name}</h3>
                </div>
                <span className="ml-auto text-5xl font-black opacity-[0.05] tabular-nums" style={{ color: product.primary }}>
                  0{index + 1}
                </span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-base font-semibold mb-3 leading-snug" style={{ color: product.secondary }}>
                {product.tagline}
              </motion.p>

              <motion.p variants={fadeUp} className="text-white/55 text-sm mb-6 leading-relaxed">
                {product.description}
              </motion.p>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-y-2 gap-x-4 mb-7">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-white/55">
                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: product.primary }} />
                    {f}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <Link href={product.href}>
                  <Button
                    data-testid={`3d-card-cta-${product.id}`}
                    style={{
                      background: `linear-gradient(135deg, ${product.primary}e0, ${product.secondary}99)`,
                      border: "none",
                      color: "#fff",
                      boxShadow: `0 4px 20px ${product.glow}`,
                    }}
                    className="hover:opacity-90 font-semibold"
                  >
                    {product.id === "appdev" ? "Start a Project" : `Try ${product.name}`}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <MiniVisual product={product} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Floating ambient icon (each is its own component to keep hooks legal) ────

function FloatingIcon({
  Icon,
  pos,
  delay,
  color,
  scrollYProgress,
}: {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  pos: { size: number; [key: string]: string | number };
  delay: number;
  color: string;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [0, 0.06, 0.06, 0]);

  const style: React.CSSProperties = {
    position: "absolute",
    width: pos.size,
    height: pos.size,
    pointerEvents: "none",
    zIndex: 0,
    filter: "blur(0.5px)",
  };

  if ("left" in pos) style.left = pos.left as string;
  if ("right" in pos) style.right = pos.right as string;
  if ("top" in pos) style.top = pos.top as string;
  if ("bottom" in pos) style.bottom = pos.bottom as string;

  return (
    <motion.div
      style={{ ...style, opacity }}
      animate={{ y: [0, -14, 0] }}
      transition={{
        duration: 5 + delay * 0.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <Icon
        className="w-full h-full"
        style={{ color, strokeWidth: 1 }}
      />
    </motion.div>
  );
}

// ─── Mini visual panel ────────────────────────────────────────────────────────

function MiniVisual({ product }: { product: typeof PRODUCTS[0] }) {
  const bars = [55, 78, 42, 93, 67, 51, 84];
  const isAppDev = product.id === "appdev";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="hidden md:flex w-40 flex-shrink-0 flex-col gap-2.5 p-4 rounded-2xl"
      style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${product.border}` }}
    >
      <div className="flex gap-1.5 mb-1">
        <div className="w-2 h-2 rounded-full bg-red-400/40" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/40" />
        <div className="w-2 h-2 rounded-full bg-green-400/40" />
      </div>
      {isAppDev ? (
        <>
          {["component.tsx", "api.ts", "schema.sql", "deploy.yml"].map((line, i) => (
            <div key={line} className="flex items-center gap-1.5">
              <div className="w-1 h-3 rounded-sm" style={{ background: product.primary, opacity: 0.65 - i * 0.1 }} />
              <div className="h-1.5 rounded" style={{ width: `${62 + i * 7}%`, background: `${product.primary}44` }} />
            </div>
          ))}
          <div
            className="mt-2 rounded-lg h-9 flex items-center justify-center text-[9px] font-bold"
            style={{ background: `${product.primary}1a`, color: product.primary }}
          >
            DEPLOYED
          </div>
        </>
      ) : (
        <>
          <div className="flex items-end gap-1 h-16 mb-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{ height: `${h}%`, background: `linear-gradient(to top, ${product.primary}cc, ${product.secondary}44)` }}
              />
            ))}
          </div>
          <div className="h-1.5 rounded-full" style={{ background: `${product.primary}28` }}>
            <div className="h-full rounded-full" style={{ width: "72%", background: product.primary }} />
          </div>
          <div className="h-1.5 rounded bg-white/5 w-3/4" />
          <div className="h-1.5 rounded bg-white/5 w-5/6" />
        </>
      )}
    </motion.div>
  );
}
