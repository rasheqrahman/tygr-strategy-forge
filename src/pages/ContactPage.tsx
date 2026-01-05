import React from 'react';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const ContactPage = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-slate-50 flex flex-col">
      <MainNavigation />

      <section className="py-20 bg-white flex-1">
        <div className="max-w-4xl mx-auto px-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-8 p-0 font-light text-slate-600 hover:text-orange-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-6 mb-16">
            <div className="text-orange-500 text-sm font-light tracking-widest uppercase">
              Contact
            </div>
            <h1 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900">
              Get in touch
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl">
              Ready to transform your business? Let's discuss how we can help you achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Email</h3>
                  <p className="text-slate-600 font-light"><a href="mailto:hello@tygrventures.com">hello@tygrventures.com</a></p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Phone</h3>
                  <p className="text-slate-600 font-light">+1 (202) 932-9662</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Office</h3>
                  <p className="text-slate-600 font-light">Mclean, VA</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-light text-slate-900 mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <input type="text" id="name" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Your name" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <input type="email" id="email" className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="your@email.com" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea id="message" rows={4} className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Tell us about your project..." />
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-light">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-slate-900 mt-auto">
        <Footer />
      </div>
    </div>;
};
export default ContactPage;