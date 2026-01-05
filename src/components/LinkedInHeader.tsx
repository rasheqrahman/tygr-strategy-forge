
import React from 'react';
import LogoWhite from './LogoWhite';

const LinkedInHeader = () => {
  return (
    <div className="w-[1188px] h-[297px] bg-slate-900 relative overflow-hidden">
      {/* Spiral Tunnel Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 w-full h-full">
          <svg className="w-full h-full opacity-40" viewBox="0 0 1188 297" fill="none">
            <defs>
              <radialGradient id="linkedinSpiralGradient" cx="75%" cy="50%" r="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="20%" stopColor="#fbbf24" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#f97316" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#ea580c" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.2" />
              </radialGradient>
            </defs>
            
            {/* Central bright core - positioned for LinkedIn header */}
            <circle cx="900" cy="148" r="18" fill="#ffffff" opacity="0.6" />
            <circle cx="900" cy="148" r="14" fill="#fef3c7" opacity="0.4" />
            
            {/* Spiral rings - adjusted for LinkedIn dimensions */}
            {Array.from({ length: 25 }, (_, i) => {
              const radius = 24 + i * 10;
              const strokeWidth = Math.max(1, 3 - i * 0.08);
              const opacity = Math.max(0.15, 0.9 - i * 0.03);
              
              return (
                <g key={i}>
                  <circle 
                    cx="900" 
                    cy="148" 
                    r={radius}
                    fill="none"
                    stroke="url(#linkedinSpiralGradient)"
                    strokeWidth={strokeWidth}
                    opacity={opacity}
                  />
                  {/* Add texture dots */}
                  {Array.from({ length: Math.floor(radius / 6) }, (_, j) => {
                    const angle = (j / Math.floor(radius / 6)) * 2 * Math.PI + i * 0.3;
                    const x = 900 + radius * Math.cos(angle);
                    const y = 148 + radius * Math.sin(angle);
                    return (
                      <circle 
                        key={j}
                        cx={x}
                        cy={y}
                        r="1"
                        fill="#ffffff"
                        opacity={opacity * 0.8}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-slate-900/10 to-slate-900/80"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-start justify-between pl-12 pr-2 pt-8">
        <div className="max-w-lg space-y-4 text-left">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-white tracking-tight">
            Improvement,
            <br />
            <span>delivered simply. </span>
          </h1>
        </div>
        
        <div className="flex flex-col items-end space-y-4 mr-8 mt-[80px]">
          <LogoWhite size="lg" className="scale-[1.3]" />
        </div>
      </div>
    </div>
  );
};

export default LinkedInHeader;
