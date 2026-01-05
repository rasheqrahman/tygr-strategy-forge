
import React from 'react';
import PlatformLogoBox from '@/components/PlatformLogoBox';
import Footer from '@/components/Footer';

const PlatformLogosPage = () => {
  const platforms = [
    {
      name: 'LinkedIn',
      key: 'linkedin' as const,
      dimensions: '400x400',
      description: 'Professional networking profile picture'
    },
    {
      name: 'Facebook',
      key: 'facebook' as const,
      dimensions: '400x400',
      description: 'Personal and business page profile'
    },
    {
      name: 'Instagram',
      key: 'instagram' as const,
      dimensions: '320x320',
      description: 'Square format profile picture'
    },
    {
      name: 'X (Twitter)',
      key: 'x' as const,
      dimensions: '400x400',
      description: 'Professional social media presence'
    }
  ];

  const backgroundVariants = [
    { key: 'white' as const, name: 'White Background', description: 'Clean, professional look' },
    { key: 'dark' as const, name: 'Dark Background', description: 'Modern, sleek appearance' },
    { key: 'black' as const, name: 'Black Background', description: 'Bold monochrome statement' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4 md:p-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-900 mb-4">Platform-Specific Logo Versions</h1>
            <p className="text-sm md:text-base text-slate-600 mb-2">Optimized logo boxes for each social media platform</p>
            <p className="text-xs md:text-sm text-slate-500">
              Right-click on any logo and "Save Image As" or take a screenshot
            </p>
          </div>

          {platforms.map((platform) => (
            <div key={platform.key} className="mb-16">
              <div className="mb-8">
                <h2 className="text-lg md:text-xl lg:text-2xl font-light text-slate-900 mb-2">{platform.name}</h2>
                <p className="text-xs md:text-sm text-slate-600 mb-1">{platform.description}</p>
                <p className="text-xs text-slate-500">Recommended size: {platform.dimensions} pixels</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                {backgroundVariants.map((variant) => (
                  <div key={variant.key} className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
                    <h3 className="text-sm md:text-base lg:text-lg font-medium text-slate-900 mb-4 text-center">{variant.name}</h3>
                    <div className="flex justify-center mb-4">
                      <PlatformLogoBox 
                        platform={platform.key}
                        backgroundColor={variant.key}
                        className={variant.key === 'white' ? 'border border-gray-200 rounded-lg' : 'rounded-lg'}
                      />
                    </div>
                    <p className="text-xs md:text-sm text-slate-600 text-center">
                      {variant.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Usage Guidelines */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-light text-slate-900 mb-6">Platform Guidelines</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <div key={platform.key} className="text-center">
                  <h3 className="text-sm md:text-base font-medium text-slate-900 mb-2">{platform.name}</h3>
                  <p className="text-xs md:text-sm text-slate-600 mb-1">{platform.dimensions} pixels</p>
                  <p className="text-xs text-slate-500">{platform.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PlatformLogosPage;
