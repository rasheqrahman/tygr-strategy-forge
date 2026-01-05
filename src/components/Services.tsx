
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Lightbulb, Target, Settings, ArrowRight, Plus, Edit2, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadAllContentFilesFromSupabaseOnly } from "@/utils/fileContentUtils";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '@/contexts/AuthContext';
import EditButton from '@/components/EditButton';

// Map of icon names to icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  users: Users,
  lightbulb: Lightbulb,
  target: Target,
  settings: Settings
};

// Type definition for service items
interface Service {
  icon: React.ComponentType<any>;
  title: string;
  slug: string;
  description: string;
  frontPageContent: string;
  published: boolean;
}

const Services = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingHeading, setIsEditingHeading] = useState(false);
  const [headingLine1, setHeadingLine1] = useState("Full spectrum offerings for the");
  const [headingLine2, setHeadingLine2] = useState("Era of Accelerating Change");
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        console.log('Services component - Loading services from Supabase only...');
        // Load only from Supabase database to maintain consistency with admin settings
        const allServices = await loadAllContentFilesFromSupabaseOnly('service');
        console.log('Services component - Raw services loaded:', allServices);
        console.log('Services component - Number of services:', allServices.length);
        
        // For the front page, only show published services to non-admins
        const visibleServices = isAdmin 
          ? allServices // Admins see all services on front page
          : allServices.filter(page => page.published); // Non-admins only see published services
        
        console.log('Services component - Visible services after filtering:', visibleServices);
        console.log('Services component - Is admin:', isAdmin);
        
        const mappedServices: Service[] = visibleServices.map(page => {
          console.log('Services component - Mapping service:', page.slug, 'Published:', page.published);
          const IconComponent = iconMap[page.icon || ''] || Settings;
          return {
            icon: IconComponent,
            title: page.title,
            slug: page.slug,
            description: page.excerpt || '',
            frontPageContent: page.frontPageContent || '',
            published: page.published
          };
        });
        
        console.log('Services component - Final mapped services:', mappedServices);
        setServices(mappedServices);
      } catch (error) {
        console.error('Services component - Error loading services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [isAdmin]);

  const handleServiceClick = () => {
    navigate('/services');
  };
  
  const handleIconClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/services/${slug}`);
    }
  };
  
  const handleLearnMoreClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/services/${slug}`);
    }
  };
  
  const handleTitleClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/services/${slug}`);
    }
  };

  const handleSaveHeading = () => {
    // Here you could save to localStorage or a database if needed
    setIsEditingHeading(false);
  };

  const handleCancelEdit = () => {
    // Reset to original values or last saved values
    setHeadingLine1("Full spectrum offerings for the");
    setHeadingLine2("Era of Accelerating Change");
    setIsEditingHeading(false);
  };

  if (loading) {
    return <section id="services" className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center">
            <p className="text-slate-600">Loading services...</p>
          </div>
        </div>
      </section>;
  }

  return <section id="services" className="py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="mb-24">
          <button onClick={handleServiceClick} className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8 hover:text-orange-700 transition-colors cursor-pointer">
            Our Services
          </button>
          <div className="flex items-end justify-between">
            <div className="relative max-w-4xl">
              {isEditingHeading ? (
                <div className="space-y-4">
                  <Input
                    value={headingLine1}
                    onChange={(e) => setHeadingLine1(e.target.value)}
                    className="text-4xl lg:text-5xl font-light h-auto py-3 border-2 border-orange-200"
                    placeholder="First line of heading"
                  />
                  <Input
                    value={headingLine2}
                    onChange={(e) => setHeadingLine2(e.target.value)}
                    className="text-4xl lg:text-5xl font-semibold text-orange-500 h-auto py-3 border-2 border-orange-200"
                    placeholder="Second line of heading"
                  />
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleSaveHeading} size="sm" className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button onClick={handleCancelEdit} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative group">
                  <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900">
                    {headingLine1}
                    <span className="block font-semibold text-orange-500">{headingLine2}</span>
                  </h2>
                  <EditButton
                    onClick={() => setIsEditingHeading(true)}
                    className="absolute -top-2 -right-12 opacity-0 group-hover:opacity-100 transition-opacity"
                    size="sm"
                  >
                    <Edit2 className="h-4 w-4" />
                  </EditButton>
                </div>
              )}
            </div>
            {isAdmin && <Button onClick={() => navigate('/services/new')} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-light">
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {services.map((service, index) => <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-3xl p-8">
              <CardHeader className="space-y-6 p-0 mb-6">
                <div className="flex items-start justify-between">
                  <div 
                    className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300 cursor-pointer" 
                    onClick={() => handleIconClick(service.slug, service.published)}
                  >
                    <service.icon className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <CardTitle 
                  className="text-2xl font-light transition-colors cursor-pointer hover:text-slate-700 text-slate-900"
                  onClick={() => handleTitleClick(service.slug, service.published)}
                >
                  {service.title}
                </CardTitle>
                <CardDescription className="leading-relaxed text-base font-light text-slate-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div className="font-light whitespace-pre-line text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                ul: ({
                  children
                }) => <ul>{children}</ul>,
                li: ({
                  children
                }) => <li className="flex items-center font-light text-slate-700">
                          <div className="w-2 h-2 rounded-full mr-4 flex-shrink-0 bg-orange-500"></div>
                          {children}
                        </li>,
                p: ({
                  children
                }) => <p className="mb-3 leading-relaxed">{children}</p>
              }}>
                    {service.frontPageContent}
                  </ReactMarkdown>
                </div>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto font-light group text-orange-600 hover:text-orange-700"
                  onClick={() => handleLearnMoreClick(service.slug, service.published)}
                >
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};

export default Services;
