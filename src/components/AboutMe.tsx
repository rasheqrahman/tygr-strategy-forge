
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { navigateToBookingSection } from "@/utils/navigationUtils";

const AboutMe = () => {
  return <section className="py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left side - Image and Contact */}
          <div className="space-y-8">
            <div className="relative">
              <div className="aspect-square w-full max-w-md mx-auto lg:mx-0 rounded-3xl overflow-hidden bg-gradient-to-br from-orange-500/20 to-slate-800 p-1">
                <img src="/lovable-uploads/d49241f2-efe7-4a24-a8da-0074a161ba76.png" alt="Rasheq Rahman, Founder of TYGR Ventures" className="w-full h-full object-cover object-top rounded-3xl" />
              </div>
            </div>
            
            {/* Contact Information */}
            <Card className="bg-slate-800/50 border-slate-900 rounded-3xl w-full max-w-md mx-auto lg:mx-0">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-medium text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 text-slate-300">
                    <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <span className="font-light">McLean, VA</span>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <Mail className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <a href="mailto:rasheq@tygrventures.com" className="font-light hover:text-orange-500 transition-colors">
                      rasheq@tygrventures.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <Phone className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <a href="tel:+12029329662" className="font-light hover:text-orange-500 transition-colors">
                      +1-202-932-9662
                    </a>
                  </div>
                  <div className="flex items-center space-x-4 text-slate-300">
                    <Linkedin className="h-5 w-5 text-orange-500 flex-shrink-0" />
                    <a href="http://linkedin.com/in/rasheqrahman" target="_blank" rel="noopener noreferrer" className="font-light hover:text-orange-500 transition-colors">
                      linkedin.com/in/rasheqrahman
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Content */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="text-orange-500 text-sm font-light tracking-widest uppercase">
                Meet the Founder
              </div>
              <h2 className="text-5xl lg:text-6xl font-light leading-tight text-white">
                Rasheq Rahman
                <span className="block text-2xl font-light text-slate-300 mt-4">Managing Consultant</span>
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">Strategic innovator with 20+ years experience in market strategy, program management, and product development across large and emerging organizations. Expertise in deploying technology solutions, identifying go-to-market opportunities, and commercializing emerging technologies.</p>
            </div>

            {/* Key Achievements */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="text-3xl font-light text-orange-500">$30M+</div>
                <p className="text-slate-300 font-light">Revenue impact from delivered initiatives</p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-light text-orange-500">15+</div>
                <p className="text-slate-300 font-light">Years of strategic leadership experience</p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-light text-orange-500">$100M+</div>
                <p className="text-slate-300 font-light">Contract ceiling managed at Leidos</p>
              </div>
              <div className="space-y-3">
                <div className="text-3xl font-light text-orange-500">Yale MBA</div>
                <p className="text-slate-300 font-light">Strategy & Management focus</p>
              </div>
            </div>

            {/* Expertise Areas */}
            <div className="space-y-6">
              <h3 className="text-white text-4xl font-semibold">Core Expertise</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {["Program Management", "Market Intelligence", "Technology Commercialization", "Business Analysis", "Risk Management", "Process Innovation"].map((skill, index) => <div key={index} className="flex items-center text-slate-300 font-light">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                    {skill}
                  </div>)}
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-base font-light"
              onClick={navigateToBookingSection}
            >
              Schedule a Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutMe;
