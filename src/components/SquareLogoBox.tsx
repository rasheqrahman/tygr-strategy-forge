
import React from 'react';
import Logo from './Logo';
import LogoWhite from './LogoWhite';

interface SquareLogoBoxProps {
  size?: number;
  className?: string;
  backgroundColor?: 'white' | 'dark' | 'black';
}

const SquareLogoBox: React.FC<SquareLogoBoxProps> = ({ 
  size = 400, 
  className = "",
  backgroundColor = 'white'
}) => {
  const backgroundClasses = {
    white: 'bg-white',
    dark: 'bg-slate-900',
    black: 'bg-black'
  };

  const logoClasses = {
    // White background: dark stripes, orange TYGR, grey VENTURES
    white: '[&_svg_path:nth-child(1)]:fill-slate-700 [&_svg_path:nth-child(2)]:fill-orange-600 [&_svg_path:nth-child(3)]:fill-slate-700 [&_svg_path:nth-child(4)]:fill-orange-600 [&_svg_path:nth-child(5)]:fill-slate-700 [&_svg_path:nth-child(6)]:fill-orange-600 [&_svg_path:nth-child(7)]:fill-orange-600 [&_svg_path:nth-child(8)]:fill-slate-600',
    // Dark background: light stripes, orange TYGR, light grey VENTURES
    dark: '[&_svg_path:nth-child(1)]:fill-slate-400 [&_svg_path:nth-child(2)]:fill-orange-500 [&_svg_path:nth-child(3)]:fill-slate-400 [&_svg_path:nth-child(4)]:fill-orange-500 [&_svg_path:nth-child(5)]:fill-slate-400 [&_svg_path:nth-child(6)]:fill-orange-500 [&_svg_path:nth-child(7)]:fill-orange-500 [&_svg_path:nth-child(8)]:fill-slate-300',
    // Black background: all white stripes and text
    black: '[&_svg_path:nth-child(1)]:fill-white [&_svg_path:nth-child(2)]:fill-white [&_svg_path:nth-child(3)]:fill-white [&_svg_path:nth-child(4)]:fill-white [&_svg_path:nth-child(5)]:fill-white [&_svg_path:nth-child(6)]:fill-white [&_svg_path:nth-child(7)]:fill-white [&_svg_path:nth-child(8)]:fill-white'
  };

  return (
    <div 
      className={`${backgroundClasses[backgroundColor]} flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        aspectRatio: '1/1'
      }}
    >
      <div className="w-2/3 h-2/3 flex items-center justify-center p-4">
        {backgroundColor === 'white' ? (
          <Logo size="lg" />
        ) : (
          <LogoWhite size="lg" />
        )}
      </div>
    </div>
  );
};

export default SquareLogoBox;
