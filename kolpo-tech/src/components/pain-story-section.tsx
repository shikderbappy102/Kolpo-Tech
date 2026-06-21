import { useRef } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { Activity, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const stories = [
  {
    tag: "For Clinic Owners",
    tagColor: "text-primary border-primary/40 bg-primary/10",
    icon: Activity,
    iconColor: "text-primary",
    glowColor: "rgba(99,102,241,0.15)",
    pain: "Your staff spends 3 hours every morning manually\nassigning appointments.",
    painHighlight: "3 hours every morning",
    stat: "72%",
    statLabel: "of clinic admin time is wasted on scheduling tasks",
    fix: "ClinicFlow reads your patient load, predicts no-shows,\nand fills every slot automatically.",
    product: "ClinicFlow",
    href: "/demo/clinicflow",
    accentClass: "from-primary to-indigo-400",
  },
  {
    tag: "For Training Institutes",
    tagColor: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
    icon: GraduationCap,
    iconColor: "text-cyan-400",
    glowColor: "rgba(34,211,238,0.15)",
    pain: "Students drop off. You don't know who's\nfalling behind until it's too late.",
    painHighlight: "don't know",
    stat: "60%",
    statLabel: "of student drop-offs are preventable with early alerts",
    fix: "SkillTrack tracks every student's progress in real-time\nand flags risk before they disappear.",
    product: "SkillTrack",
    href: "/demo/skilltrack",
    accentClass: "from-cyan-400 to-teal-400",
  },
  {
    tag: "For Compliance Teams",
    tagColor: "text-indigo-400 border-indigo-400/40 bg-indigo-400/10",
    icon: ShieldCheck,
    iconColor: "text-indigo-400",
    glowColor: "rgba(129,140,248,0.15)",
    pain: "Audit season hits and your team scrambles\nfor three weeks to gather evidence.",
    painHighlight: "scrambles for three weeks",
    stat: "94%",
    statLabel: "reduction in audit prep time with continuous monitoring",
    fix: "CompliAI runs audits continuously so when regulators\narrive, your report is already written.",
    product: "CompliAI",
    href: "/demo/compliai",
    accentClass: "from-indigo-400 to-violet-400",
  },
];

export default function PainStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 1, 2, 2]);

  return (
    <div ref={containerRef} style={{ height: "350vh" }} className="relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 px-4"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-3">
            Scroll to find your fit
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Does this sound like you?
          </h2>
        </motion.div>

        <div className="relative w-full max-w-4xl px-4">
          {stories.map((story, i) => (
            <StoryCard
              key={i}
              story={story}
              index={i}
              activeIndex={activeIndex}
            />
          ))}
        </div>

        <ScrollDotsIndicator activeIndex={activeIndex} />
      </div>
    </div>
  );
}

function StoryCard({
  story,
  index,
  activeIndex,
}: {
  story: (typeof stories)[0];
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
}) {
  const Icon = story.icon;

  const opacity = useTransform(activeIndex, (v) => {
    const dist = Math.abs(v - index);
    return dist < 0.5 ? 1 : 0;
  });

  const y = useTransform(activeIndex, (v) => {
    const dist = v - index;
    return dist * -40;
  });

  const scale = useTransform(activeIndex, (v) => {
    const dist = Math.abs(v - index);
    return 1 - Math.min(dist, 1) * 0.04;
  });

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 w-full"
    >
      <div
        className="w-full rounded-2xl border border-white/10 p-8 md:p-10"
        style={{
          background: `radial-gradient(ellipse 80% 80% at 50% 0%, ${story.glowColor} 0%, rgba(9,11,24,0.7) 60%), rgba(9,11,24,0.6)`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-start gap-6 flex-col md:flex-row">
          <div className="flex-1">
            <span
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full border mb-6 ${story.tagColor}`}
            >
              <Icon className="w-3.5 h-3.5" />
              {story.tag}
            </span>

            <div className="mb-6">
              <p className="text-2xl md:text-3xl font-semibold text-white/80 leading-snug whitespace-pre-line">
                {story.pain.split(story.painHighlight).map((part, pi, arr) => (
                  <span key={pi}>
                    {part}
                    {pi < arr.length - 1 && (
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${story.accentClass} font-bold`}>
                        {story.painHighlight}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
              <span className={`text-3xl font-black bg-gradient-to-r ${story.accentClass} bg-clip-text text-transparent`}>
                {story.stat}
              </span>
              <span className="text-sm text-muted-foreground">{story.statLabel}</span>
            </div>

            <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
              {story.fix}
            </p>

            <Link href={story.href}>
              <Button
                data-testid={`pain-story-cta-${index}`}
                className={`bg-gradient-to-r ${story.accentClass} text-white border-0 shadow-lg hover:opacity-90`}
              >
                See {story.product} in action <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div
            className="hidden md:flex w-40 h-40 rounded-2xl flex-shrink-0 items-center justify-center"
            style={{ background: story.glowColor, border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Icon className={`w-16 h-16 ${story.iconColor} opacity-80`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ScrollDotsIndicator({
  activeIndex,
}: {
  activeIndex: ReturnType<typeof useTransform>;
}) {
  return (
    <div className="absolute bottom-10 flex gap-3">
      {stories.map((_, i) => (
        <DotIndicator key={i} index={i} activeIndex={activeIndex} />
      ))}
    </div>
  );
}

function DotIndicator({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: ReturnType<typeof useTransform>;
}) {
  const scale = useTransform(activeIndex, (v) => {
    return Math.abs(v - index) < 0.5 ? 1 : 0.6;
  });
  const opacity = useTransform(activeIndex, (v) => {
    return Math.abs(v - index) < 0.5 ? 1 : 0.35;
  });

  return (
    <motion.div
      style={{ scale, opacity }}
      className="w-2 h-2 rounded-full bg-primary"
    />
  );
}
