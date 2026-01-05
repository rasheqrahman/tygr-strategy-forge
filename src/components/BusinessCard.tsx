
import React from 'react';
import LogoWhite from './LogoWhite';

const BusinessCard = () => {
  return (
    <div className="w-[1050px] h-[600px] bg-slate-900 relative overflow-hidden">
      {/* Content */}
      <div className="relative z-10 h-full flex">
        {/* Left side - Large Logo and Tagline */}
        <div className="flex-1 flex flex-col items-center justify-start pt-[160px] pl-[75px]">
          <LogoWhite size="xl" />
          <p className="text-xl text-slate-300 leading-relaxed font-light italic mt-6 text-center">
            Improvement, simply delivered
          </p>
        </div>
        
        {/* Right side - Content */}
        <div className="flex-1 flex items-start justify-start pl-[205px] pt-[160px]">
          <div className="max-w-md space-y-8">
            {/* Name and Title */}
            <div className="space-y-4 text-left">
              <h1 className="text-4xl font-light leading-tight text-white tracking-tight">
                Rasheq Rahman
              </h1>
              <div className="text-orange-500 text-lg font-light tracking-wide uppercase">
                Founder
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 text-slate-300 font-light text-left">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                <span>McLean, VA</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                <span>+1-646-275-7645</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                <span>rasheq@tygrventures.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
