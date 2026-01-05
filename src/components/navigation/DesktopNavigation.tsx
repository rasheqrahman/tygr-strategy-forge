
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NavigationItems from './NavigationItems';

interface DesktopNavigationProps {
  onLogout: () => void;
}

const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ onLogout }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Check if we're already on the homepage
    if (window.location.pathname === '/') {
      // We're on the homepage, just scroll to the booking section
      const bookingSection = document.getElementById('booking') || 
        Array.from(document.querySelectorAll('section')).find(section => 
          section.textContent?.includes('Schedule a Meeting') || 
          section.textContent?.includes('Ready to explore further')
        );
      
      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback: scroll to bottom of page if booking section not found
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    } else {
      // We're on another page, navigate to homepage and then scroll
      navigate('/', { replace: true });
      // Small delay to ensure page is rendered before scrolling
      setTimeout(() => {
        const bookingSection = document.getElementById('booking') || 
          Array.from(document.querySelectorAll('section')).find(section => 
            section.textContent?.includes('Schedule a Meeting') || 
            section.textContent?.includes('Ready to explore further')
          );
        
        if (bookingSection) {
          bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        } else {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  return (
    <div className="hidden md:flex items-center space-x-10">
      <NavigationItems />
      <Button
        onClick={handleGetStartedClick}
        className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 font-light"
      >
        Get Started
      </Button>
    </div>
  );
};

export default DesktopNavigation;
