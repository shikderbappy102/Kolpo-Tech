import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Activity,
  GraduationCap,
  ShieldCheck,
  Code2,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

const SERVICES = [
  {
    id: "appdev",
    icon: Code2,
    label: "App Development",
    title: "Custom Web & Mobile Apps",
    subtitle: "Built to ship fast. Designed to scale.",
    description:
      "We build full-stack web applications and mobile apps from the ground up: MVPs, enterprise platforms, AI-powered tools. Using modern stacks and AI-accelerated workflows, we go from idea to production faster than any traditional agency.",
    features: [
      { title: "Web Applications", desc: "React, Next.js, Node.js. Production-ready from day one." },
      { title: "Mobile Apps", desc: "Cross-platform iOS and Android with Expo and React Native." },
      { title: "AI Integration", desc: "LLMs, automation pipelines, and intelligent features baked in." },
      { title: "UI/UX Design", desc: "Clean, modern interfaces that convert and retain users." },
    ],
    useCases: ["Startups building MVPs", "Enterprises modernizing legacy systems", "Teams adding AI features"],
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.25)",
    ctaLabel: "Start a Project",
    href: CALENDLY,
    flip: false,
    demos: [
      {
        label: "E-commerce",
        icon: "🛒",
        metrics: [
          { label: "Products Live", value: "1,240", change: "catalog active" },
          { label: "Orders Today", value: "84", change: "+34%" },
          { label: "Revenue (month)", value: "$12.4K", change: "+28%" },
          { label: "Cart Conversion", value: "4.8%", change: "+1.2%" },
        ],
        live: [
          "Order #1084 auto-confirmed & invoice sent",
          "Low-stock alert: Leather Wallet (3 left)",
          "Abandoned cart recovery email sent to 12 users",
        ],
      },
      {
        label: "Food Delivery",
        icon: "🍕",
        metrics: [
          { label: "Orders Today", value: "1.2K", change: "peak: 94/hr" },
          { label: "On-time Rate", value: "94%", change: "+3%" },
          { label: "Active Drivers", value: "38", change: "live tracking" },
          { label: "Avg Delivery", value: "22 min", change: "↓8 min" },
        ],
        live: [
          "Order #4821 — driver assigned in 18 seconds",
          "Peak surge: 8 extra drivers auto-dispatched",
          "Restaurant Zara: 5-star streak — 12 days",
        ],
      },
      {
        label: "Business SaaS",
        icon: "📊",
        metrics: [
          { label: "Active Users", value: "4.2K", change: "+15%" },
          { label: "API Uptime", value: "99.9%", change: "30 days" },
          { label: "Data Processed", value: "2.4 TB", change: "this month" },
          { label: "MRR", value: "$34.6K", change: "+12%" },
        ],
        live: [
          "Auto-scaling triggered: 2× capacity for 14 min",
          "User onboarding avg 3.2 min — new record",
          "Custom report generated for Enterprise client",
        ],
      },
    ],
    market: [
      { name: "Webflow", url: "https://webflow.com", tag: "No-code builder", note: "Great for landing pages, not complex logic or AI features." },
      { name: "Bubble", url: "https://bubble.io", tag: "No-code app", note: "Rapid prototyping but hits hard limits at scale." },
      { name: "Upwork agencies", url: "https://upwork.com", tag: "Freelance platform", note: "Inconsistent quality, no long-term ownership." },
      { name: "Kolpo Tech", url: "#", tag: "Our approach", note: "Full custom code, AI-integrated from day one, end-to-end ownership.", isUs: true },
    ],
  },
  {
    id: "clinicflow",
    icon: Activity,
    label: "ClinicFlow",
    title: "Healthcare Operations, Automated",
    subtitle: "A unified AI engine for your clinic's entire workflow.",
    description:
      "ClinicFlow manages scheduling, patient flow, and billing automatically. Clinics running ClinicFlow eliminate 3+ hours of daily admin work and see measurable improvements in patient satisfaction within the first month.",
    features: [
      { title: "Smart Scheduling", desc: "AI predicts no-shows and optimizes calendar density." },
      { title: "Patient Flow", desc: "Real-time queue management reduces wait times by 40%." },
      { title: "Automated Billing", desc: "Insurance claims generated and reconciled instantly." },
      { title: "Analytics Dashboard", desc: "Live performance metrics across all departments." },
    ],
    useCases: ["Private clinics", "Multi-branch healthcare providers", "Specialist centers"],
    color: "#6366f1",
    glow: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
    ctaLabel: "Try ClinicFlow Demo",
    href: "/demo/clinicflow",
    flip: true,
    demos: [
      {
        label: "Private Clinic",
        icon: "🏥",
        metrics: [
          { label: "Appointments Today", value: "24", change: "+12%" },
          { label: "Active Patients", value: "847", change: "+5%" },
          { label: "Revenue This Month", value: "$48.2K", change: "+18%" },
          { label: "Avg Wait Time", value: "12 min", change: "↓4 min" },
        ],
        live: [
          "Dr. Khatun's 9:30 AM slot auto-confirmed",
          "3 insurance claims submitted without staff action",
          "2 at-risk appointments flagged for follow-up",
        ],
      },
      {
        label: "Hospital",
        icon: "🏨",
        metrics: [
          { label: "Daily Appointments", value: "340", change: "+8%" },
          { label: "Total Patients", value: "12.4K", change: "+3%" },
          { label: "Active Branches", value: "5", change: "all live" },
          { label: "Avg Wait Time", value: "8 min", change: "↓12 min" },
        ],
        live: [
          "Emergency overflow rerouted across branches",
          "Staff scheduling auto-adjusted for peak hours",
          "Daily billing consolidated from 5 locations",
        ],
      },
      {
        label: "Specialist Center",
        icon: "🔬",
        metrics: [
          { label: "Slot Fill Rate", value: "98%", change: "+14%" },
          { label: "Specialist Rating", value: "4.9 ★", change: "+0.3" },
          { label: "Patients Served", value: "312", change: "this month" },
          { label: "No-show Rate", value: "1.2%", change: "↓8.4%" },
        ],
        live: [
          "Cardiology: 3 urgent slots reserved for referrals",
          "Auto-reminder sent to 18 upcoming patients",
          "2 post-op check-ins scheduled automatically",
        ],
      },
    ],
    market: [
      { name: "Practo", url: "https://practo.com", tag: "Patient booking", note: "Strong in patient discovery but no ops automation behind the desk." },
      { name: "DrChrono", url: "https://drchrono.com", tag: "EHR platform", note: "US-centric EHR; heavy setup with limited AI-native features." },
      { name: "Kareo", url: "https://kareo.com", tag: "Billing-focused", note: "Billing only. No scheduling intelligence or flow management." },
      { name: "ClinicFlow", url: "/demo/clinicflow", tag: "Our approach", note: "AI scheduling + patient flow + billing in one unified system.", isUs: true },
    ],
  },
  {
    id: "skilltrack",
    icon: GraduationCap,
    label: "SkillTrack",
    title: "Training Intelligence at Scale",
    subtitle: "Every student accounted for. Every risk flagged early.",
    description:
      "SkillTrack gives training institutes full visibility into student progress in real time. AI alerts flag at-risk learners before they drop off. Certificates are issued automatically the moment a student qualifies.",
    features: [
      { title: "Progress Heatmaps", desc: "Visual overview of every student's learning velocity." },
      { title: "Early Risk Alerts", desc: "Flags at-risk students days before they disengage." },
      { title: "Auto Certification", desc: "Instant certificate issuance with no manual review needed." },
      { title: "Cohort Analytics", desc: "Compare performance across batches and instructors." },
    ],
    useCases: ["Training institutes", "Corporate L&D teams", "Online education platforms"],
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.25)",
    ctaLabel: "Try SkillTrack Demo",
    href: "/demo/skilltrack",
    flip: false,
    demos: [
      {
        label: "Training Institute",
        icon: "🎓",
        metrics: [
          { label: "Active Students", value: "450", change: "+32 new" },
          { label: "At-Risk Flagged", value: "23", change: "early alerts" },
          { label: "Certs Issued Today", value: "12", change: "automated" },
          { label: "Completion Rate", value: "87%", change: "+11%" },
        ],
        live: [
          "Batch 14: 3 students flagged for engagement drop",
          "Certificate auto-issued — Ahmed · Python Fundamentals",
          "Instructor Razia's cohort: 96% on track",
        ],
      },
      {
        label: "Corporate L&D",
        icon: "🏢",
        metrics: [
          { label: "Employees Enrolled", value: "2,800", change: "all teams" },
          { label: "Compliance Rate", value: "84%", change: "+9%" },
          { label: "Active Courses", value: "156", change: "+12 new" },
          { label: "Avg Score", value: "78 / 100", change: "+6 pts" },
        ],
        live: [
          "GDPR module: 340 completions in last 24h",
          "Cybersecurity track reminder sent to 89 employees",
          "Sales team certification pathway — 68% complete",
        ],
      },
      {
        label: "Online Platform",
        icon: "🌐",
        metrics: [
          { label: "Learners Enrolled", value: "15.2K", change: "+820 this week" },
          { label: "Completion Rate", value: "92%", change: "+5%" },
          { label: "Certs Issued", value: "3,420", change: "total" },
          { label: "Revenue (month)", value: "$124K", change: "+22%" },
        ],
        live: [
          "Top course 'AI for Business' — 98% completion",
          "42 learners hit final quiz — certs auto-sent",
          "New cohort of 200 learners auto-onboarded",
        ],
      },
    ],
    market: [
      { name: "Moodle", url: "https://moodle.org", tag: "Open-source LMS", note: "Powerful but complex; no AI risk alerts or auto-certification." },
      { name: "Teachable", url: "https://teachable.com", tag: "Course platform", note: "Built for content creators, not institutional management." },
      { name: "Kajabi", url: "https://kajabi.com", tag: "All-in-one creator", note: "Marketing-first, not analytics or compliance for institutes." },
      { name: "SkillTrack", url: "/demo/skilltrack", tag: "Our approach", note: "AI risk detection + auto-certification built for institutes, not creators.", isUs: true },
    ],
  },
  {
    id: "compliai",
    icon: ShieldCheck,
    label: "CompliAI",
    title: "Compliance That Never Sleeps",
    subtitle: "Continuous monitoring. Regulator-ready, always.",
    description:
      "CompliAI runs audits continuously so when regulators arrive, your report is already written. Automated risk matrices, policy tracking, and evidence collection run 24/7 so your compliance team focuses on decisions, not paperwork.",
    features: [
      { title: "Continuous Audits", desc: "Real-time monitoring across all compliance frameworks." },
      { title: "Auto Risk Matrix", desc: "Risk levels auto-calculated and updated daily." },
      { title: "Policy Reports", desc: "Regulator-ready documents generated on demand." },
      { title: "Evidence Collection", desc: "Audit trails compiled and organized automatically." },
    ],
    useCases: ["Fintech & banking", "Healthcare compliance", "Legal & regulated industries"],
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.12)",
    border: "rgba(167,139,250,0.25)",
    ctaLabel: "Try CompliAI Demo",
    href: "/demo/compliai",
    flip: true,
    demos: [
      {
        label: "Fintech",
        icon: "💳",
        metrics: [
          { label: "Policies Monitored", value: "47", change: "all active" },
          { label: "Violations Found", value: "0", change: "this month" },
          { label: "GDPR Score", value: "100%", change: "✓ passed" },
          { label: "Last Audit", value: "2 min ago", change: "automated" },
        ],
        live: [
          "AML transaction pattern flagged & reviewed",
          "PCI-DSS quarterly report auto-generated",
          "RBI policy update applied to 3 procedures",
        ],
      },
      {
        label: "Healthcare",
        icon: "🏥",
        metrics: [
          { label: "HIPAA Score", value: "98%", change: "+2%" },
          { label: "Evidence Items", value: "234", change: "auto-collected" },
          { label: "Next Audit", value: "12 days", change: "prepared" },
          { label: "Frameworks", value: "4", change: "monitored" },
        ],
        live: [
          "PHI access log reviewed — 0 unauthorized access",
          "Staff HIPAA training compliance: 97%",
          "ISO 27001 evidence package ready for review",
        ],
      },
      {
        label: "Legal Firm",
        icon: "⚖️",
        metrics: [
          { label: "Frameworks", value: "12", change: "all green" },
          { label: "Risk Level", value: "Low", change: "stable 30d" },
          { label: "Active Policies", value: "89", change: "+3 updated" },
          { label: "Audit Readiness", value: "99%", change: "always ready" },
        ],
        live: [
          "Client confidentiality audit trail compiled",
          "GDPR data retention policy auto-enforced",
          "Regulator report submitted without staff input",
        ],
      },
    ],
    market: [
      { name: "VComply", url: "https://www.v-comply.com", tag: "Compliance mgmt", note: "Good dashboard but manual data entry; no continuous monitoring." },
      { name: "LogicGate", url: "https://www.logicgate.com", tag: "Risk platform", note: "Enterprise-only pricing; complex setup for smaller teams." },
      { name: "OneTrust", url: "https://www.onetrust.com", tag: "Privacy compliance", note: "Privacy-focused. Weak on operational compliance automation." },
      { name: "CompliAI", url: "/demo/compliai", tag: "Our approach", note: "24/7 automated audits, real-time risk matrix, and instant reports.", isUs: true },
    ],
  },
];

// ─── Demo panel with tabbed company scenarios ─────────────────────────────────

function DemoPanel({ service }: { service: (typeof SERVICES)[0] }) {
  const [activeTab, setActiveTab] = useState(0);
  const demo = service.demos[activeTab];

  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {service.demos.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className="text-xs px-3 py-1.5 rounded-full font-bold border transition-all duration-200"
            style={
              i === activeTab
                ? { background: service.color, color: "#060912", borderColor: service.color }
                : { color: "rgba(255,255,255,0.45)", borderColor: "rgba(255,255,255,0.1)", background: "transparent" }
            }
          >
            {d.icon} {d.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${service.glow} 0%, rgba(9,11,22,0.95) 60%)`,
            border: `1px solid ${service.border}`,
            boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${service.glow}`,
            padding: "20px",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 mx-2 h-4 rounded bg-white/5 flex items-center px-2">
              <span className="text-[9px] text-white/25">{service.label} · {demo.label}</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: service.color }} />
              <span className="text-[9px] font-bold" style={{ color: service.color }}>LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {demo.metrics.map((m, mi) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: mi * 0.06 }}
                className="p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-[9px] text-white/35 mb-0.5 uppercase tracking-wide">{m.label}</p>
                <p className="text-sm font-black text-white">{m.value}</p>
                <p className="text-[10px] font-semibold" style={{ color: service.color }}>{m.change}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-1.5">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/20 mb-2">Live Activity</p>
            {demo.live.map((item, li) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 + li * 0.09 }}
                className="flex items-start gap-2 p-2.5 rounded-lg"
                style={{ background: "rgba(255,255,255,0.02)" }}
              >
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: service.color }} />
                <span className="text-[11px] text-white/55 leading-snug">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Market comparison card ───────────────────────────────────────────────────

function MarketComparison({ service }: { service: (typeof SERVICES)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mt-8 rounded-2xl p-5"
      style={{
        background: `linear-gradient(135deg, ${service.glow} 0%, rgba(9,11,22,0.6) 100%)`,
        border: `1px solid ${service.border}`,
      }}
    >
      <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: service.color }}>
        Market Landscape
      </p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {service.market.map((m, i) => (
          <motion.div
            key={m.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`rounded-xl p-3.5 relative ${m.isUs ? "ring-1" : ""}`}
            style={{
              background: m.isUs ? `${service.glow}` : "rgba(255,255,255,0.03)",
              border: m.isUs ? `1px solid ${service.color}` : "1px solid rgba(255,255,255,0.06)",
              ...(m.isUs ? { boxShadow: `0 0 20px ${service.glow}` } : {}),
            }}
          >
            {m.isUs && (
              <span
                className="absolute -top-2 left-3 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full"
                style={{ background: service.color, color: "#060912" }}
              >
                Us
              </span>
            )}
            <div className="flex items-start justify-between mb-2">
              <span className="font-bold text-sm text-white">{m.name}</span>
              {!m.isUs && (
                <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white/60 transition-colors ml-1">
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2"
              style={{ background: `${service.color}20`, color: service.color }}
            >
              {m.tag}
            </span>
            <p className="text-[11px] text-white/45 leading-snug">{m.note}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Thinking / Eureka character with "Just book it!" balloon ─────────────────

function ThinkingCTA() {
  const [eureka, setEureka] = useState(false);
  const [sparks, setSparks] = useState<number[]>([]);
  const [showBalloon, setShowBalloon] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (eureka) return;
    setEureka(true);
    setSparks(Array.from({ length: 14 }, (_, i) => i));
    setTimeout(() => setSparks([]), 1600);
    setTimeout(() => setShowBalloon(true), 700);
    setTimeout(() => setShowBalloon(false), 2500);
    setTimeout(() => {
      ctaRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 2900);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.7 }}
      className="text-center mt-40 py-24 rounded-3xl relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(34,211,238,0.05) 50%, rgba(245,158,11,0.05) 100%)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "inset 0 0 80px rgba(99,102,241,0.06)" }}
      />

      <div className="relative inline-block mb-4 cursor-pointer select-none" onClick={handleClick}>
        <AnimatePresence>
          {sparks.map((i) => {
            const angle = (i / 14) * Math.PI * 2;
            const dist = 55 + Math.random() * 45;
            const tx = Math.cos(angle) * dist;
            const ty = Math.sin(angle) * dist;
            const colors = ["#f59e0b", "#6366f1", "#22d3ee", "#a78bfa", "#fbbf24"];
            return (
              <motion.div
                key={`spark-${i}`}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{ left: "50%", top: "50%", marginLeft: -4, marginTop: -4, background: colors[i % colors.length] }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: tx, y: ty, opacity: 0, scale: 0 }}
                exit={{}}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
            );
          })}
        </AnimatePresence>

        {/* "Just book it!" balloon — drops from above */}
        <AnimatePresence>
          {showBalloon && (
            <motion.div
              className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
              initial={{ y: -60, opacity: 0, scale: 0.5 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              <div
                className="whitespace-nowrap rounded-2xl rounded-b-sm px-5 py-2.5 text-sm font-black shadow-xl"
                style={{ background: "linear-gradient(135deg, #f59e0b, #6366f1)", color: "#060912" }}
              >
                🚀 Just book it!
              </div>
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0"
                style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "8px solid #6366f1" }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <svg width="120" height="150" viewBox="0 0 120 150">
          <ellipse cx="60" cy="118" rx="22" ry="18" fill="rgba(99,102,241,0.15)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" />
          <rect x="48" y="94" width="24" height="30" rx="4" fill="rgba(99,102,241,0.1)" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5" />
          <line x1="60" y1="76" x2="60" y2="94" stroke="rgba(99,102,241,0.3)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="60" cy="56" r="22" fill="rgba(99,102,241,0.12)" stroke={eureka ? "rgba(245,158,11,0.6)" : "rgba(99,102,241,0.4)"} strokeWidth="1.5" />
          {!eureka && (
            <>
              <circle cx="52" cy="54" r="3.5" fill="rgba(99,102,241,0.8)" />
              <circle cx="68" cy="54" r="3.5" fill="rgba(99,102,241,0.8)" />
              <circle cx="53.5" cy="52.5" r="1.8" fill="rgba(255,255,255,0.9)" />
              <circle cx="69.5" cy="52.5" r="1.8" fill="rgba(255,255,255,0.9)" />
            </>
          )}
          {eureka && (
            <>
              <motion.path d="M47,54 Q51,49 55,54" stroke="rgba(245,158,11,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
              <motion.path d="M64,54 Q68,49 72,54" stroke="rgba(245,158,11,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 0.08 }} />
            </>
          )}
          {!eureka && (
            <path d="M53,66 Q60,62 67,66" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          )}
          {eureka && (
            <motion.path d="M49,66 Q60,76 71,66" stroke="rgba(245,158,11,0.9)" strokeWidth="2.5" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4 }} />
          )}
          {!eureka && (
            <>
              <line x1="48" y1="100" x2="30" y2="112" stroke="rgba(99,102,241,0.4)" strokeWidth="3" strokeLinecap="round" />
              <line x1="72" y1="100" x2="72" y2="80" stroke="rgba(99,102,241,0.4)" strokeWidth="3" strokeLinecap="round" />
              <line x1="72" y1="80" x2="63" y2="74" stroke="rgba(99,102,241,0.4)" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
          {eureka && (
            <>
              <motion.path d="M48,100 L24,78" stroke="rgba(245,158,11,0.6)" strokeWidth="3" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
              <motion.path d="M72,100 L96,78" stroke="rgba(245,158,11,0.6)" strokeWidth="3" strokeLinecap="round" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} />
            </>
          )}
        </svg>

        <AnimatePresence>
          {!eureka && (
            <motion.div
              className="absolute -top-2 -right-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-16 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center gap-1">
                  {["?", "?", "?"].map((c, i) => (
                    <motion.span
                      key={i}
                      className="text-white/60 text-xs font-black"
                      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
                    >
                      {c}
                    </motion.span>
                  ))}
                </div>
                <div className="absolute -bottom-1 left-4 w-3 h-3 bg-white/8 border-b border-r border-white/15 rotate-45" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {eureka && (
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2"
              initial={{ scale: 0, rotate: -20, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.div animate={{ filter: ["brightness(1)", "brightness(1.7)", "brightness(1)"] }} transition={{ duration: 0.8, repeat: Infinity }}>
                <Lightbulb className="w-8 h-8 text-amber-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {!eureka ? (
          <motion.p key="hint" className="text-sm text-white/35 mb-6 font-medium" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            ✨ Got a project idea? Give me a spark!
          </motion.p>
        ) : (
          <motion.p key="eureka-label" className="text-sm text-amber-400/80 mb-6 font-black uppercase tracking-widest"
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
            Eureka! Let's make it happen ↓
          </motion.p>
        )}
      </AnimatePresence>

      <motion.h2
        className="text-3xl md:text-4xl font-black text-white mb-4"
        animate={eureka ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 0.4 }}
      >
        Not sure which service fits?
      </motion.h2>
      <p className="text-white/50 mb-10 max-w-md mx-auto">
        Book a free 30-minute call. We'll listen, ask the right questions, and tell you exactly what you need — honestly.
      </p>

      <div ref={ctaRef}>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
          <motion.div
            animate={eureka ? { scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(99,102,241,0.3)", "0 0 60px rgba(99,102,241,0.6)", "0 0 20px rgba(99,102,241,0.3)"] } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <Button
              data-testid="services-bottom-cta"
              size="lg"
              className="h-14 px-10 bg-white text-black hover:bg-white/90 font-bold text-base shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Book a Free Consultation <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Animated feature bar ─────────────────────────────────────────────────────

function FeatureBar({ fi, color }: { fi: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false });
  return (
    <motion.div
      ref={ref}
      className="ml-auto h-1.5 rounded-full flex-1 max-w-20"
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.6, delay: fi * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: `linear-gradient(to right, ${color}cc, ${color}22)`,
        transformOrigin: "left",
        width: `${55 + fi * 12}%`,
      }}
    />
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Main Services page ───────────────────────────────────────────────────────

export default function Services() {
  return (
    <div className="min-h-screen bg-background pt-28 pb-24">
      <div className="container mx-auto px-4">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          className="text-center max-w-3xl mx-auto mb-32"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4">
            What We Build
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Services &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-amber-400">
              Solutions
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From custom-built applications to proprietary AI products, we engineer software that automates, scales, and delivers measurable results.
          </p>
        </motion.div>

        <div className="space-y-40">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.section
                key={svc.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
                custom={0}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-start`}
              >
                <div className={svc.flip ? "lg:order-2" : "lg:order-1"}>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold mb-6 px-4 py-2 rounded-full border"
                    style={{ color: svc.color, background: svc.glow, borderColor: svc.border }}
                  >
                    <Icon className="w-4 h-4" />
                    {svc.label}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">{svc.title}</h2>
                  <p className="text-lg font-medium mb-4" style={{ color: svc.color }}>{svc.subtitle}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{svc.description}</p>

                  <div className="space-y-3 mb-8">
                    {svc.features.map((feat, fi) => (
                      <motion.div
                        key={feat.title}
                        initial={{ opacity: 0, x: svc.flip ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.4, delay: fi * 0.08 }}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: `${svc.glow}`, border: `1px solid ${svc.border}` }}
                      >
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: svc.color }} />
                        <p className="text-sm font-medium text-white/80">{feat.title}</p>
                        <FeatureBar fi={fi} color={svc.color} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {svc.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="text-xs px-3 py-1.5 rounded-full font-medium border"
                        style={{ background: `${svc.glow}`, borderColor: svc.border, color: svc.color }}
                      >
                        {uc}
                      </span>
                    ))}
                  </div>

                  <a
                    href={svc.href.startsWith("/") ? svc.href : svc.href}
                    target={svc.href.startsWith("http") ? "_blank" : undefined}
                    rel={svc.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <Button
                      size="lg"
                      className="font-bold border-0 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${svc.color} 0%, ${svc.color}cc 100%)`,
                        color: "#060912",
                        boxShadow: `0 0 30px ${svc.glow}`,
                      }}
                    >
                      {svc.ctaLabel} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>

                <div className={svc.flip ? "lg:order-1" : "lg:order-2"}>
                  <motion.div
                    initial={{ opacity: 0, y: 20, rotateX: 8 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ perspective: "1200px" }}
                  >
                    <DemoPanel service={svc} />
                    <MarketComparison service={svc} />
                  </motion.div>
                </div>
              </motion.section>
            );
          })}
        </div>

        <ThinkingCTA />
      </div>
    </div>
  );
}
