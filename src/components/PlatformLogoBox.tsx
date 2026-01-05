
import React from 'react';
import Logo from './Logo';
import LogoWhite from './LogoWhite';

interface PlatformLogoBoxProps {
  platform: 'linkedin' | 'facebook' | 'instagram' | 'x';
  backgroundColor?: 'white' | 'dark' | 'black';
  className?: string;
}

const PlatformLogoBox: React.FC<PlatformLogoBoxProps> = ({ 
  platform, 
  backgroundColor = 'white',
  className = ""
}) => {
  const platformDimensions = {
    linkedin: { width: 400, height: 400 },
    facebook: { width: 400, height: 400 },
    instagram: { width: 320, height: 320 },
    x: { width: 400, height: 400 }
  };

  const backgroundClasses = {
    white: 'bg-white',
    dark: 'bg-slate-900',
    black: 'bg-black'
  };

  const logoClasses = {
    white: '[&_path]:fill-slate-900 [&_path:nth-child(2)]:fill-orange-600',
    dark: '[&_path]:fill-white [&_path:nth-child(2)]:fill-orange-500',
    black: '[&_path]:fill-white [&_path:nth-child(2)]:fill-white'
  };

  const { width, height } = platformDimensions[platform];

  return (
    <div 
      className={`${backgroundClasses[backgroundColor]} flex items-center justify-center overflow-hidden ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        aspectRatio: '1/1'
      }}
    >
      <div className="w-3/4 h-3/4 flex items-center justify-center p-4">
        {backgroundColor === 'white' ? (
          <Logo size="lg" />
        ) : (
          <LogoWhite size="lg" />
        )}
      </div>
    </div>
  );
};

export default PlatformLogoBox;
