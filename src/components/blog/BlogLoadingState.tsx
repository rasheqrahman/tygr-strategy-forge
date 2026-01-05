
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';

const BlogLoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavigation />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center">
          <p className="text-slate-600">Loading blog posts...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogLoadingState;
