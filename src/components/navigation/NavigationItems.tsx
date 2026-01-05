
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface NavigationItemsProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavigationItems: React.FC<NavigationItemsProps> = ({ 
  isMobile = false, 
  onItemClick 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleAboutClick = () => {
    onItemClick?.();
    if (window.location.pathname === '/') {
      // We're on the homepage, just scroll to the about section
      document.getElementById('about')?.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      // We're on another page, navigate to homepage then scroll
      navigate('/');
      setTimeout(() => {
        document.getElementById('about')?.scrollIntoView({
          behavior: 'smooth'
        });
      }, 100);
    }
  };

  const handleServicesClick = () => {
    onItemClick?.();
    navigate('/services');
  };

  const handleIndustriesClick = () => {
    onItemClick?.();
    navigate('/industries');
  };

  const handleBlogClick = () => {
    onItemClick?.();
    navigate('/blog');
  };

  const handleContactClick = () => {
    onItemClick?.();
    navigate('/contact');
  };

  const baseClasses = isMobile
    ? "block px-3 py-2 text-base font-light transition-colors"
    : "font-light transition-colors";

  const linkClasses = (isActiveLink: boolean) => 
    `${baseClasses} ${
      isActiveLink
        ? 'text-orange-500'
        : 'text-slate-300 hover:text-orange-500'
    }`;

  const buttonClasses = `${baseClasses} text-slate-300 hover:text-orange-500 bg-transparent border-none cursor-pointer`;

  return (
    <>
      <button
        onClick={handleServicesClick}
        className={buttonClasses}
      >
        Services
      </button>
      <button
        onClick={handleIndustriesClick}
        className={buttonClasses}
      >
        Industries
      </button>
      <button
        onClick={handleBlogClick}
        className={buttonClasses}
      >
        Blog
      </button>
      <button
        onClick={handleAboutClick}
        className={buttonClasses}
      >
        About
      </button>
      <button
        onClick={handleContactClick}
        className={buttonClasses}
      >
        Contact
      </button>
    </>
  );
};

export default NavigationItems;
