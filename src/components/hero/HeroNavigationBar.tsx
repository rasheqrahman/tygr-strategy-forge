
import { useState, useEffect } from "react";
import LogoWhite from "../LogoWhite";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { navigateToBookingSection } from "@/utils/navigationUtils";

const NAV_LINKS = [
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Industries", id: "industries" },
  { label: "Blog", route: "/blog" },
  { label: "Contact", id: "booking" }  // Changed from "contact" to "booking"
];

const HeroNavigationBar = () => {
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
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "bg-slate-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}
      `}
      style={{
        transition: "background-color 0.3s, box-shadow 0.3s"
      }}
    >
      <div className="flex justify-between items-center py-[16px] px-6 lg:px-20 max-w-7xl mx-auto">
        {/* LOGO column */}
        <div className="flex items-center min-w-[220px] lg:min-w-[320px]">
          <LogoWhite size="md" />
        </div>
        {/* Desktop navigation */}
        <div className="hidden lg:flex space-x-10">
          <button onClick={() => handleNav("services")} className="text-slate-300 hover:text-orange-500 transition-colors font-light">
            Services
          </button>
          <button onClick={() => handleNav("about")} className="text-slate-300 hover:text-orange-500 transition-colors font-light">
            About
          </button>
          <button onClick={() => handleNav("industries")} className="text-slate-300 hover:text-orange-500 transition-colors font-light">
            Industries
          </button>
          <button onClick={() => handleNav("", "/blog")} className="text-slate-300 hover:text-orange-500 transition-colors font-light">
            Blog
          </button>
          <button onClick={() => handleNav("booking")} className="text-slate-300 hover:text-orange-500 transition-colors font-light">
            Contact
          </button>
        </div>
        {/* Desktop "Get Started" */}
        <div className="hidden lg:block">
          <Button onClick={navigateToBookingSection} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 font-light">
            Get Started
          </Button>
        </div>
        {/* Hamburger menu for <lg screens */}
        <div className="flex lg:hidden">
          <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? "Close menu" : "Open menu"} className="text-slate-300 hover:text-orange-500 focus:outline-none">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      {/* Hamburger drawer for mobile/tablet */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-700 shadow-xl px-6 py-4 animate-slide-in-right z-50">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map(lnk =>
              lnk.route ? (
                <button key={lnk.label} onClick={() => handleNav("", lnk.route)} className="text-slate-300 hover:text-orange-500 text-left font-light py-2 px-2">
                  {lnk.label}
                </button>
              ) : (
                <button key={lnk.label} onClick={() => handleNav(lnk.id)} className="text-slate-300 hover:text-orange-500 text-left font-light py-2 px-2">
                  {lnk.label}
                </button>
              )
            )}
            <Button
              onClick={() => {
                setMenuOpen(false);
                navigateToBookingSection();
              }}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 font-light mt-3"
            >
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </nav>
  );
};

export default HeroNavigationBar;
