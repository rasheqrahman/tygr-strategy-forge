
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isMenuOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isMenuOpen, onToggle }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="text-slate-300 hover:text-orange-500 focus:outline-none"
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default MobileMenuButton;
