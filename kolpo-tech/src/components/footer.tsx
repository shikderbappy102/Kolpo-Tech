import { Link } from "wouter";
import { KolpoLogo } from "@/components/kolpo-logo";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-14 px-4 relative z-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div
        className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 100%)",
        }}
      />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-5 group">
            <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(99,102,241,0.7)]">
              <KolpoLogo size={36} />
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              Kolpo<span className="text-primary">Tech</span>
            </span>
          </Link>
          <p className="text-white/40 text-sm max-w-xs mb-5 leading-relaxed">
            We build intelligent software that automates real industries. Custom apps, AI products, and automation systems built to last.
          </p>
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} Kolpo Tech. All rights reserved.
          </p>
          <p className="text-xs text-white/30 mt-1 font-medium">📍 Khulna, Bangladesh</p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Products</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/demo/clinicflow" className="text-white/50 hover:text-primary transition-colors">ClinicFlow</Link></li>
            <li><Link href="/demo/skilltrack" className="text-white/50 hover:text-cyan-400 transition-colors">SkillTrack</Link></li>
            <li><Link href="/demo/compliai" className="text-white/50 hover:text-violet-400 transition-colors">CompliAI</Link></li>
            <li><Link href="/contact" className="text-white/50 hover:text-amber-400 transition-colors">App Development</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="text-white/50 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/services" className="text-white/50 hover:text-white transition-colors">Services</Link></li>
            <li>
              <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-primary transition-colors">
                Book a Call
              </a>
            </li>
            <li><Link href="/contact" className="text-white/50 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
