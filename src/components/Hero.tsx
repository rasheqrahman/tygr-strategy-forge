import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigateToBookingSection } from "@/utils/navigationUtils";
import HeroLogoRow from "./hero/HeroLogoRow";
import HeroNavigationBar from "./hero/HeroNavigationBar";
import HeroBackground from "./hero/HeroBackground";
import HeroContent from "./hero/HeroContent";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Industries", id: "industries" },
  { label: "Blog", route: "/blog" },
  { label: "Contact", id: "contact" }
];

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (destination: string, route?: string) => {
    setMenuOpen(false);
    if (route) {
      navigate(route);
    } else {
      document.getElementById(destination)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  const [isDesktop, setIsDesktop] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[80vh] bg-slate-900 overflow-hidden">
      {/* Sticky/fixed top navigation bar */}
      <HeroNavigationBar />
      {/* Enhanced Spiral Tunnel Background */}
      <HeroBackground />
      {/* Navigation and Hero Content Container */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Shared left padding for both logo & content */}
          <div className="flex flex-col px-6 lg:px-20">
            {/* <HeroLogoRow />  <-- This component is now hidden/removed */}
            <HeroContent />
            {/* keeps the nav bar visually separated */}
            <div className="hidden lg:block" style={{ height: "124px" }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
