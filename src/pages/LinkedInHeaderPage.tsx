
import React from 'react';
import LinkedInHeader from '@/components/LinkedInHeader';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';

const LinkedInHeaderPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MainNavigation />
      <div className="flex items-center justify-center p-8 flex-1">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-light text-slate-900 mb-2">LinkedIn Header Image</h1>
            <p className="text-slate-600">Dimensions: 1584x396 pixels</p>
            <p className="text-sm text-slate-500 mt-2">
              Right-click on the image below and "Save Image As" or take a screenshot
            </p>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <LinkedInHeader />
          </div>
        </div>
      </div>
      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default LinkedInHeaderPage;
