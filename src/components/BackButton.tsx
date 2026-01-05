
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, children }) => {
  return (
    <button 
      onClick={onClick}
      className="text-white border border-transparent hover:border-white bg-transparent hover:bg-white/10 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      {children}
    </button>
  );
};

export default BackButton;
