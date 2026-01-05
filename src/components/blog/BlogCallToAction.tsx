
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { navigateToBookingSection } from '@/utils/navigationUtils';

const BlogCallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-orange-400 text-xs font-normal tracking-wide uppercase mb-4 opacity-70">
          Ready to Get Started?
        </div>
        <h2 className="text-3xl lg:text-4xl font-light text-slate-300 mb-6 leading-relaxed">Let's talk about what we can do to help you succeed</h2>
        <p className="text-lg text-slate-400 mb-8 font-light max-w-2xl mx-auto leading-relaxed">Book a free consultation with our founder, Rasheq Rahman</p>
        <Button 
          size="lg" 
          onClick={navigateToBookingSection} 
          variant="outline" 
          className="border-orange-400 text-orange-400 bg-transparent hover:bg-transparent hover:text-orange-300 hover:border-orange-300 px-8 py-3 text-base font-light"
        >
          Schedule a Consultation
          <ArrowRight className="ml-2 h-4 w-4 opacity-60" />
        </Button>
      </div>
    </section>
  );
};

export default BlogCallToAction;
