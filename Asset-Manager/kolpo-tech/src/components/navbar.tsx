import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollProgress from "@/components/scroll-progress";
import { KolpoLogo } from "@/components/kolpo-logo";

const CALENDLY = "https://calendly.com/alaminshikderbappy/30min";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div>
      <ScrollProgress />
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#060912]/88 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_0_rgba(255,255,255,0.05)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="transition-all duration-300 group-hover:drop-shadow-[0_0_16px_rgba(99,102,241,0.8)] group-hover:scale-105">
              <KolpoLogo size={36} />
            </div>
            <span className="font-black text-lg tracking-tight text-white leading-none">
              Kolpo<span className="text-primary">Tech</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase()}`}
                  className={`text-sm font-medium transition-all duration-200 hover:text-white ${
                    location === link.path ? "text-white" : "text-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer">
              <Button
                data-testid="nav-book-demo"
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 border-0 shadow-[0_0_20px_rgba(99,102,241,0.4)] px-5"
              >
                Book a Call
              </Button>
            </a>
          </div>

          <button
            data-testid="nav-mobile-toggle"
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#060912]/95 backdrop-blur-xl border-b border-white/10 absolute top-16 left-0 right-0 p-4 flex flex-col gap-3 shadow-2xl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium p-2.5 rounded-xl ${
                  location === link.path
                    ? "bg-primary/15 text-primary"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button className="w-full mt-1 bg-primary text-white">Book a Call</Button>
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}
