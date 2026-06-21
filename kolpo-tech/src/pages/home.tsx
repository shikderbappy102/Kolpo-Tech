import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Activity,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Code2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CanvasNetwork from "@/components/canvas-network";
import Scroll3DProducts from "@/components/scroll-3d-products";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

function useCountUp(target: number, duration = 1.5) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatCounter({ value, suffix, label, color }: { value: number; suffix: string; label: string; color: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div className="text-center">
      <div className={`text-4xl font-black mb-1 ${color}`}>
        <span ref={ref}>{count}</span>
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const APP_TYPES = [
  { icon: "🛒", name: "E-commerce", desc: "Product catalog, cart, payments, inventory" },
  { icon: "🍕", name: "Food Delivery", desc: "Orders, driver tracking, real-time ETA" },
  { icon: "🏥", name: "Healthcare", desc: "Appointments, records, telemedicine" },
  { icon: "📚", name: "E-learning", desc: "Courses, quizzes, certificates, analytics" },
  { icon: "🏋️", name: "Fitness & Wellness", desc: "Workouts, tracking, coach booking" },
  { icon: "🏠", name: "Real Estate", desc: "Listings, tours, mortgage calculators" },
  { icon: "💼", name: "HR & Payroll", desc: "Employee management, attendance, payroll" },
  { icon: "📊", name: "Analytics SaaS", desc: "Dashboards, reports, data pipelines" },
];

const products = [
  {
    icon: Activity,
    name: "ClinicFlow",
    tagline: "The AI brain for modern clinics",
    description: "Automates scheduling, patient flow prediction, and billing so your staff focuses on care, not calendars.",
    features: ["Smart Scheduling", "No-show Prediction", "Auto Billing", "Real-time Analytics"],
    href: "/demo/clinicflow",
    borderColor: "border-primary/25",
    iconColor: "text-primary",
    glowClass: "bg-primary/10",
    btnClass: "bg-primary/20 text-primary hover:bg-primary/35 border border-primary/30",
    accentGlow: "rgba(99,102,241,0.12)",
  },
  {
    icon: GraduationCap,
    name: "SkillTrack",
    tagline: "Every student accounted for",
    description: "Tracks student progress in real-time, flags at-risk learners early, and automates certification issuance.",
    features: ["Progress Heatmaps", "Early Risk Alerts", "Auto Certification", "Cohort Analytics"],
    href: "/demo/skilltrack",
    borderColor: "border-cyan-500/25",
    iconColor: "text-cyan-400",
    glowClass: "bg-cyan-500/10",
    btnClass: "bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/35 border border-cyan-500/30",
    accentGlow: "rgba(34,211,238,0.12)",
  },
  {
    icon: ShieldCheck,
    name: "CompliAI",
    tagline: "Compliance that never sleeps",
    description: "Continuous audit monitoring, automated policy reports, and a live risk matrix. Audit season is just another Tuesday.",
    features: ["Continuous Audits", "Auto Risk Matrix", "Policy Reports", "Regulator-Ready Export"],
    href: "/demo/compliai",
    borderColor: "border-indigo-500/25",
    iconColor: "text-indigo-400",
    glowClass: "bg-indigo-500/10",
    btnClass: "bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/35 border border-indigo-500/30",
    accentGlow: "rgba(129,140,248,0.12)",
  },
  {
    icon: Code2,
    name: "App Development",
    tagline: "From idea to production, fast",
    description: "Full-stack web & mobile apps built with AI-accelerated workflows. MVPs to enterprise platforms, production-ready from day one.",
    features: ["Web & Mobile Apps", "AI-Powered Stack", "End-to-end Ownership", "Launch in Weeks"],
    href: "/services",
    borderColor: "border-amber-500/25",
    iconColor: "text-amber-400",
    glowClass: "bg-amber-500/10",
    btnClass: "bg-amber-500/20 text-amber-400 hover:bg-amber-500/35 border border-amber-500/30",
    accentGlow: "rgba(245,158,11,0.12)",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const heroTextY = useTransform(scrollY, [0, 600], [0, -120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const canvasY = useTransform(scrollY, [0, 600], [0, 60]);
  const canvasScale = useTransform(scrollY, [0, 600], [1, 1.05]);
  const scrollHintOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: canvasY, scale: canvasScale }} className="absolute inset-0 z-0">
          <CanvasNetwork />
        </motion.div>

        <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            AI Software Agency
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight"
          >
            We Build Software That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-amber-400">
              Thinks For Itself
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Custom apps, AI products, and automation systems built by Kolpo Tech for clinics, training institutes, and compliance-heavy businesses.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="hero-book-demo"
                size="lg"
                className="h-14 px-8 text-lg bg-gradient-to-r from-primary to-indigo-600 hover:opacity-90 shadow-[0_0_40px_rgba(99,102,241,0.35)] border-0 font-bold"
              >
                Book a Free Call <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Link href="/services">
              <Button
                data-testid="hero-view-solutions"
                size="lg" variant="outline"
                className="h-14 px-8 text-lg border-white/20 text-white hover:bg-white/5"
              >
                Our Work
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS BAR ────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="py-14 border-y border-white/8 bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <StatCounter value={50} suffix="+" label="Clinics Automated" color="text-primary" />
            <StatCounter value={10000} suffix="+" label="Hours Saved" color="text-cyan-400" />
            <StatCounter value={99} suffix=".9%" label="Uptime" color="text-white" />
            <StatCounter value={4} suffix="" label="Industry Solutions" color="text-indigo-400" />
          </div>
        </div>
      </motion.section>

      {/* ─── 3D SCROLL PRODUCT JOURNEY ───────────────────── */}
      <Scroll3DProducts />

      {/* ─── PRODUCTS ─────────────────────────────────────── */}
      <section className="py-32 relative bg-background">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%)" }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-80px" }}
            className="text-center mb-20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-primary mb-3">The Platform</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Three products. One AI core.</h2>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto">
              Each built for a specific industry. All sharing the same intelligent automation engine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {products.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.name}
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-60px" }}
                  custom={i}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl border ${p.borderColor} p-8 overflow-hidden cursor-default`}
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${p.accentGlow} 0%, rgba(9,11,24,0.55) 70%)`,
                    backdropFilter: "blur(12px)",
                  }}
                  data-testid={`product-card-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className={`absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${p.glowClass}`} />
                  <Icon className={`w-10 h-10 mb-5 ${p.iconColor}`} />
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-4">{p.tagline}</p>
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{p.description}</p>
                  <ul className="space-y-2 mb-8">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${p.iconColor}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={p.href}>
                    <Button data-testid={`product-demo-${p.name.toLowerCase().replace(/\s/g, "-")}`} className={`w-full ${p.btnClass}`}>
                      {p.name === "App Development" ? "See Services" : `Try ${p.name} Demo`}
                    </Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── APP TYPE SHOWCASE ─────────────────────────────── */}
      <section className="py-20 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 70%)" }} />
        <div className="container mx-auto px-4 relative">
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
            className="text-center mb-12"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-amber-400/70 mb-3">App Development</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What can we build for you?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From e-commerce to healthcare to SaaS — if your business needs a custom app, we build it end-to-end.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {APP_TYPES.map((app, i) => (
              <motion.div
                key={app.name}
                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }}
                custom={i * 0.5}
                whileHover={{ y: -4, scale: 1.03 }}
                className="rounded-2xl p-5 border border-white/6 cursor-default group"
                style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)" }}
              >
                <div className="text-3xl mb-3">{app.icon}</div>
                <p className="font-bold text-white text-sm mb-1 group-hover:text-amber-400 transition-colors">{app.name}</p>
                <p className="text-[11px] text-white/35 leading-snug">{app.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="font-bold border-amber-500/30 text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border">
                Tell us what you want to build <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-24 border-t border-white/8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.04) 50%, transparent 100%)" }} />
        <div className="container mx-auto px-4 relative">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">Under the Hood</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">The Automation Pipeline</h2>
          </motion.div>

          <div className="relative flex flex-col md:flex-row items-center justify-center gap-0 max-w-4xl mx-auto">
            {[
              { n: "01", title: "AI Analysis", body: "The system ingests your real-world data: appointments, student records, compliance documents.", color: "text-primary", border: "border-primary/40", bg: "bg-primary/10" },
              { n: "02", title: "Automation", body: "Neural engines run continuously, making decisions, flagging issues, and executing tasks.", color: "text-cyan-400", border: "border-cyan-400/40", bg: "bg-cyan-400/10" },
              { n: "03", title: "Results", body: "Outcomes delivered with zero manual intervention. Reports ready. Slots filled. Students tracked.", color: "text-indigo-400", border: "border-indigo-400/40", bg: "bg-indigo-400/10" },
            ].map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-center flex-1 w-full">
                <motion.div
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-60px" }}
                  custom={i}
                  className={`flex-1 text-center p-6 rounded-2xl border ${step.border} ${step.bg} backdrop-blur-sm w-full`}
                >
                  <div className={`text-3xl font-black mb-3 ${step.color}`}>{step.n}</div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
                </motion.div>
                {i < 2 && (
                  <motion.div
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: false }}
                    transition={{ delay: i * 0.2 + 0.3, duration: 0.5 }}
                    className="hidden md:block w-12 h-[1px] bg-gradient-to-r from-primary/40 to-cyan-400/40 flex-shrink-0 origin-left"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: false, margin: "-80px" }}
          className="container mx-auto px-4 text-center relative"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-primary mb-4">Ready when you are</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Stop managing work.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-cyan-400">
              Start automating it.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto">
            Book a free 30-minute demo and see exactly how Kolpo Tech would work for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="cta-book-demo"
                size="lg"
                className="h-14 px-10 text-lg bg-white text-black hover:bg-gray-100 font-semibold shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                Book Free Demo
              </Button>
            </a>
            <Link href="/contact">
              <Button
                data-testid="cta-contact"
                size="lg" variant="outline"
                className="h-14 px-10 text-lg border-white/20 text-white hover:bg-white/5"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
