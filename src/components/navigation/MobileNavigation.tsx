
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import NavigationItems from './NavigationItems';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

// We don't need CollapsibleTrigger here, our "hamburger" is outside the collapsible, but leaving import for completeness.

interface MobileNavigationProps {
  isMenuOpen: boolean;
  onMenuClose: () => void;
  onLogout: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isMenuOpen,
  onMenuClose,
  onLogout
}) => {
  const { isAuthenticated } = useAuth();

  // Helper: determine if current route is home
  const isHome =
    typeof window !== 'undefined' &&
    (window.location.pathname === '/' || window.location.pathname === '/index.html');

  const handleGetStarted = () => {
    onMenuClose();
    if (isHome) {
      // Smooth scroll on homepage
      const bookingSection = document.getElementById('booking') || 
        Array.from(document.querySelectorAll('section')).find(section => 
          section.textContent?.includes('Schedule a Meeting') || 
          section.textContent?.includes('Ready to explore further')
        );
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } else {
      // Go to home, scroll after mount
      window.location.href = '/#booking';
    }
  };

  return (
    <Collapsible open={isMenuOpen} onOpenChange={open => !open && onMenuClose()}>
      <CollapsibleContent
        forceMount
        className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[600px] animate-slide-in-right' : 'max-h-0'}`}
        style={{ willChange: 'max-height' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-900 border-t border-slate-700 shadow-lg">
          <NavigationItems 
            isMobile={true} 
            onItemClick={onMenuClose} 
          />
          <button
            onClick={handleGetStarted}
            className="block w-full text-left px-3 py-2 text-base font-light text-slate-300 hover:text-orange-500"
          >
            Get Started
          </button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MobileNavigation;

