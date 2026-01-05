
import React from 'react';
import SquareLogoBox from '@/components/SquareLogoBox';
import Footer from '@/components/Footer';

const SquareLogoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="p-4 md:p-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-slate-900 mb-4">Square Logo Boxes</h1>
            <p className="text-sm md:text-base text-slate-600 mb-2">Perfect for social media profiles on LinkedIn, Instagram, and X (Twitter)</p>
            <p className="text-xs md:text-sm text-slate-500">
              Right-click on any logo and "Save Image As" or take a screenshot
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12">
            {/* White Background */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-sm md:text-base lg:text-lg font-medium text-slate-900 mb-4 text-center">White Background</h3>
              <div className="flex justify-center mb-4">
                <SquareLogoBox 
                  size={250} 
                  backgroundColor="white"
                  className="border border-gray-200 rounded-lg"
                />
              </div>
              <p className="text-xs md:text-sm text-slate-600 text-center">
                Recommended for light themes and professional profiles
              </p>
            </div>

            {/* Dark Background */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-sm md:text-base lg:text-lg font-medium text-slate-900 mb-4 text-center">Dark Background</h3>
              <div className="flex justify-center mb-4">
                <SquareLogoBox 
                  size={250} 
                  backgroundColor="dark"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs md:text-sm text-slate-600 text-center">
                Perfect for dark mode and modern social media profiles
              </p>
            </div>

            {/* Black Background */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-sm md:text-base lg:text-lg font-medium text-slate-900 mb-4 text-center">Black Background</h3>
              <div className="flex justify-center mb-4">
                <SquareLogoBox 
                  size={250} 
                  backgroundColor="black"
                  className="rounded-lg"
                />
              </div>
              <p className="text-xs md:text-sm text-slate-600 text-center">
                Clean monochrome design for bold brand presence
              </p>
            </div>
          </div>

          {/* Size Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-light text-slate-900 mb-6">Social Media Size Recommendations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-sm md:text-base font-medium text-slate-900 mb-2">LinkedIn</h3>
                <p className="text-xs md:text-sm text-slate-600">400x400 pixels minimum</p>
                <p className="text-xs text-slate-500">Square format required</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base font-medium text-slate-900 mb-2">Instagram</h3>
                <p className="text-xs md:text-sm text-slate-600">320x320 pixels minimum</p>
                <p className="text-xs text-slate-500">1:1 aspect ratio</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm md:text-base font-medium text-slate-900 mb-2">X (Twitter)</h3>
                <p className="text-xs md:text-sm text-slate-600">400x400 pixels recommended</p>
                <p className="text-xs text-slate-500">Square format preferred</p>
              </div>
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

export default SquareLogoPage;
