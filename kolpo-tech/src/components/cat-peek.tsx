import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

const QUOTES = [
  "Still deciding? Just book the call! 😺",
  "My human built this for you. Don't waste it! 🐾",
  "Meow! 30 mins can change your business 📞",
  "You scrolled a LOT. Time to book that call ✨",
  "Psst... free consultation. No catch! 🐱",
  "I peeked because you seem interested 👀",
];

export default function CatPeek() {
  const [visible, setVisible] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const clickCountRef = useRef(0);
  const lastClickRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((nextQuote = false) => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (nextQuote) setQuoteIndex((q) => (q + 1) % QUOTES.length);
    setVisible(true);
    hideTimerRef.current = setTimeout(() => setVisible(false), 5500);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => show(), 60000);
    return () => clearTimeout(timer);
  }, [show]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cat-ignore]")) return;
      const now = Date.now();
      if (now - lastClickRef.current < 600) {
        clickCountRef.current += 1;
        if (clickCountRef.current >= 7) {
          show(true);
          clickCountRef.current = 0;
        }
      } else {
        clickCountRef.current = 1;
      }
      lastClickRef.current = now;
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-cat-ignore
          className="fixed bottom-0 right-6 z-[9999] cursor-pointer select-none"
          initial={{ y: 220 }}
          animate={{ y: 0 }}
          exit={{ y: 220 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          onClick={() => window.open(CALENDLY, "_blank")}
          title="Book a free call"
        >
          <motion.div
            className="absolute -top-16 right-2 whitespace-nowrap rounded-2xl rounded-br-sm px-4 py-2.5 text-xs font-black text-[#060912] shadow-xl"
            style={{ background: "linear-gradient(135deg, #f59e0b, #6366f1)" }}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring", stiffness: 300 }}
          >
            {QUOTES[quoteIndex]}
            <div
              className="absolute -bottom-2 right-4 w-3 h-3 rotate-45"
              style={{ background: "#6366f1" }}
            />
          </motion.div>

          <svg width="88" height="84" viewBox="0 0 88 84" fill="none">
            <ellipse cx="44" cy="62" rx="22" ry="16" fill="#1e1b4b" />
            <circle cx="44" cy="42" r="20" fill="#1e1b4b" />
            <polygon points="24,26 14,8 33,21" fill="#1e1b4b" />
            <polygon points="64,26 74,8 55,21" fill="#1e1b4b" />
            <polygon points="25,24 17,11 32,20" fill="#6366f1" />
            <polygon points="63,24 71,11 56,20" fill="#6366f1" />
            <ellipse cx="36" cy="40" rx="4.5" ry="5" fill="#22d3ee" />
            <ellipse cx="52" cy="40" rx="4.5" ry="5" fill="#22d3ee" />
            <circle cx="36" cy="40" r="3" fill="#060912" />
            <circle cx="52" cy="40" r="3" fill="#060912" />
            <circle cx="37" cy="38.5" r="1.2" fill="white" />
            <circle cx="53" cy="38.5" r="1.2" fill="white" />
            <polygon points="44,47 41,51 47,51" fill="#f59e0b" />
            <path d="M40,52 Q44,56 48,52" stroke="#f59e0b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <line x1="47" y1="48" x2="66" y2="45" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            <line x1="47" y1="50" x2="66" y2="53" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            <line x1="41" y1="48" x2="22" y2="45" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            <line x1="41" y1="50" x2="22" y2="53" stroke="rgba(255,255,255,0.35)" strokeWidth="1" strokeLinecap="round" />
            <ellipse cx="28" cy="78" rx="9" ry="5.5" fill="#1e1b4b" />
            <ellipse cx="60" cy="78" rx="9" ry="5.5" fill="#1e1b4b" />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
