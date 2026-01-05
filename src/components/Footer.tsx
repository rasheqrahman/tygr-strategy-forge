
import LogoWhite from "./LogoWhite";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { Linkedin, Facebook, Twitter, Instagram, Shield, User, LogOut } from "lucide-react";
import { loadAllPages } from "@/utils/pageUtils";
import { useState, useEffect } from "react";

const Footer = () => {
  const {
    isAuthenticated,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [industries, setIndustries] = useState<any[]>([]);
  
  useEffect(() => {
    const loadContent = async () => {
      try {
        const [servicesData, industriesData] = await Promise.all([loadAllPages('service'), loadAllPages('industry')]);
        setServices(servicesData.filter(page => page.published));
        setIndustries(industriesData.filter(page => page.published));
      } catch (error) {
        console.error('Error loading content for footer:', error);
        setServices([]);
        setIndustries([]);
      }
    };
    loadContent();
  }, []);
  
  const handleAdminClick = async () => {
    if (isAuthenticated) {
      await signOut();
      navigate('/');
    } else {
      navigate('/admin/login');
    }
  };
  
  return <footer className="bg-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid md:grid-cols-5 gap-16 mb-16">
          <div className="md:col-span-2 space-y-6 flex flex-col items-center">
            <a href="/" className="block">
              <LogoWhite size="lg" />
            </a>
            <p className="text-slate-400 leading-relaxed font-light max-w-md text-center">
              Strategy to implementation, delivered simply.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-medium text-lg">Services</h4>
            <ul className="space-y-4 text-slate-400 font-light">
              {services.map(service => <li key={service.slug}>
                  <button onClick={() => navigate(`/services/${service.slug}`)} className="hover:text-white transition-colors cursor-pointer text-left">
                    {service.title}
                  </button>
                </li>)}
              {services.length === 0 && <>
                  <li className="hover:text-white transition-colors cursor-pointer">Design Thinking</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Digital Transformation</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Product Prototyping</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Operational Efficiency</li>
                </>}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-medium text-lg">Industries</h4>
            <ul className="space-y-4 text-slate-400 font-light">
              {industries.map(industry => <li key={industry.slug}>
                  <button onClick={() => navigate(`/industries/${industry.slug}`)} className="hover:text-white transition-colors cursor-pointer text-left">
                    {industry.title}
                  </button>
                </li>)}
              {industries.length === 0 && <>
                  <li className="hover:text-white transition-colors cursor-pointer">Healthcare</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Financial Services</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Technology</li>
                  <li className="hover:text-white transition-colors cursor-pointer">Manufacturing</li>
                </>}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-medium text-lg">Contact</h4>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <button onClick={handleAdminClick} className="text-slate-400 hover:text-orange-500 transition-colors" title={isAuthenticated ? "Logout" : "Admin Login"}>
                  {isAuthenticated ? <LogOut className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </button>
              </div>
              <div className="space-y-4 text-slate-400 font-light">
                <div className="hover:text-white transition-colors cursor-pointer">rasheq@tygrventures.com</div>
                <div className="hover:text-white transition-colors cursor-pointer">+1 (202) 932-9662</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-10 text-center text-slate-400 font-light">
          <p className="my-0">© 2025 TYGR Ventures LLC. All rights reserved. </p>
        </div>
      </div>
    </footer>;
};

export default Footer;
