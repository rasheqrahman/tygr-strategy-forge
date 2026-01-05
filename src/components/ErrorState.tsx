
import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <MainNavigation />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-light text-slate-900 mb-6">Error</h1>
          <p className="text-xl text-slate-600 mb-8 font-light">{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorState;
