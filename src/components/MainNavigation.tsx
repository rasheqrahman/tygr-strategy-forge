
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LogoWhite from './LogoWhite';
import MobileMenuButton from './navigation/MobileMenuButton';
import DesktopNavigation from './navigation/DesktopNavigation';
import MobileNavigation from './navigation/MobileNavigation';
import { Collapsible } from './ui/collapsible';

const MainNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen((v) => !v);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // When route changes, close the menu (for UX)
  React.useEffect(() => {
    const closeOnChange = () => setIsMenuOpen(false);
    window.addEventListener('popstate', closeOnChange);
    return () => window.removeEventListener('popstate', closeOnChange);
  }, []);

  return (
    <nav className="bg-slate-900 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center py-8">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <LogoWhite size="md" />
          </Link>

          {/* Desktop Navigation - show only on large screens (lg and up) */}
          <div className="hidden lg:flex items-center space-x-10">
            <DesktopNavigation onLogout={handleLogout} />
          </div>

          {/* Hamburger menu button - show below lg (i.e., <1024px, including smallest mobile) */}
          <div className="flex lg:hidden">
            <MobileMenuButton isMenuOpen={isMenuOpen} onToggle={toggleMenu} />
          </div>
        </div>
        {/* Collapsible Mobile Navigation */}
        <MobileNavigation 
          isMenuOpen={isMenuOpen} 
          onMenuClose={closeMenu} 
          onLogout={handleLogout} 
        />
      </div>
    </nav>
  );
};

export default MainNavigation;
