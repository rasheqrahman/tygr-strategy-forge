
import React from 'react';
import { Button } from '@/components/ui/button';

const BlogPostCallToAction = () => {
  const handleGetStartedClick = () => {
    // Check if we're already on the homepage
    if (window.location.pathname === '/') {
      // We're on the homepage, just scroll to the booking section
      const bookingSection = document.getElementById('booking') || 
        Array.from(document.querySelectorAll('section')).find(section => 
          section.textContent?.includes('Schedule a Meeting') || 
          section.textContent?.includes('Ready to explore further')
        );
      
      if (bookingSection) {
        bookingSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        // Fallback: scroll to bottom of page if booking section not found
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }
    } else {
      // We're on another page, navigate to homepage with hash
      window.location.href = '/#booking';
    }
  };

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="text-orange-500 text-sm font-light tracking-widest uppercase mb-4">
          Ready to Transform?
        </div>
        <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
          Let's discuss your next project
        </h2>
        <p className="text-xl text-slate-300 mb-8 font-light max-w-2xl mx-auto">
          Connect with our team to explore how we can help transform your organization through practical innovation.
        </p>
        <div className="flex items-center justify-center gap-6">
          <Button size="lg" onClick={handleGetStartedClick} className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-base font-light">
            Schedule a Consultation
          </Button>
          <Button variant="ghost" className="text-slate-300 hover:text-orange-500 p-0 text-base font-light">
            View More Insights
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPostCallToAction;
