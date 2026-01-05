import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, DollarSign, Zap, Building2, ArrowRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadAllContentFilesFromSupabaseOnly } from "@/utils/fileContentUtils";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAuth } from '@/contexts/AuthContext';

// Map of icon names to icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  smartphone: Smartphone,
  'dollar-sign': DollarSign,
  zap: Zap,
  building2: Building2,
  'building-2': Building2
};

// Type definition for industry items
interface Industry {
  icon: React.ComponentType<any>;
  title: string;
  slug: string;
  description: string;
  frontPageContent: string;
  published: boolean;
}
const Industries = () => {
  const navigate = useNavigate();
  const {
    isAdmin
  } = useAuth();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        console.log('Industries component - Loading industries from Supabase only...');
        // Load only from Supabase database to maintain consistency with admin settings
        const allIndustries = await loadAllContentFilesFromSupabaseOnly('industry');
        console.log('Industries component - Raw industries loaded:', allIndustries);
        console.log('Industries component - Number of industries:', allIndustries.length);

        // For the front page, only show published industries to non-admins
        const visibleIndustries = isAdmin ? allIndustries // Admins see all industries on front page
        : allIndustries.filter(page => page.published); // Non-admins only see published industries

        console.log('Industries component - Visible industries after filtering:', visibleIndustries);
        console.log('Industries component - Is admin:', isAdmin);
        const mappedIndustries: Industry[] = visibleIndustries.map(page => {
          console.log('Industries component - Mapping industry:', page.slug, 'Published:', page.published);
          const IconComponent = iconMap[page.icon || ''] || Building2;
          return {
            icon: IconComponent,
            title: page.title,
            slug: page.slug,
            description: page.excerpt || '',
            frontPageContent: page.frontPageContent || '',
            published: page.published
          };
        });
        console.log('Industries component - Final mapped industries:', mappedIndustries);
        setIndustries(mappedIndustries);
      } catch (error) {
        console.error('Industries component - Error loading industries:', error);
        setIndustries([]);
      } finally {
        setLoading(false);
      }
    };
    loadIndustries();
  }, [isAdmin]);
  const handleIndustryExpertiseClick = () => {
    navigate('/industries');
  };
  const handleIconClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/industries/${slug}`);
    }
  };
  const handleTitleClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/industries/${slug}`);
    }
  };
  const handleLearnMoreClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/industries/${slug}`);
    }
  };
  if (loading) {
    return <section id="industries" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="text-center">
            <p className="text-slate-600">Loading industries...</p>
          </div>
        </div>
      </section>;
  }
  return <section id="industries" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 bg-gray-50">
        <div className="mb-24">
          <button onClick={handleIndustryExpertiseClick} className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8 hover:text-orange-700 transition-colors cursor-pointer">
            Industry Expertise
          </button>
          <div className="flex items-end justify-between">
            <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900 max-w-4xl">
              Deep sector knowledge
              <span className="block font-normal text-orange-500">across industries</span>
            </h2>
            {isAdmin && <Button onClick={() => navigate('/industries/new')} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 font-light">
                <Plus className="h-4 w-4 mr-2" />
                Add Industry
              </Button>}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {industries.map((industry, index) => <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 rounded-3xl p-10 bg-gray-50">
              <CardHeader className="space-y-6 p-0 mb-8">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors duration-300 cursor-pointer" onClick={() => handleIconClick(industry.slug, industry.published)}>
                    <industry.icon className="h-8 w-8 text-orange-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-light transition-colors cursor-pointer hover:text-slate-700 text-slate-900" onClick={() => handleTitleClick(industry.slug, industry.published)}>
                  {industry.title}
                </CardTitle>
                <CardDescription className="leading-relaxed text-lg font-light text-slate-600">
                  {industry.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div className="font-light text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                ul: ({
                  children
                }) => <ul className="space-y-4">{children}</ul>,
                li: ({
                  children
                }) => <li className="flex items-center font-light text-slate-700">
                          <div className="w-2 h-2 rounded-full mr-4 bg-orange-500"></div>
                          {children}
                        </li>,
                p: ({
                  children
                }) => <p className="mb-4 leading-relaxed">{children}</p>
              }}>
                    {industry.frontPageContent}
                  </ReactMarkdown>
                </div>
                <Button variant="ghost" className="p-0 h-auto font-light group text-orange-600 hover:text-orange-700" onClick={() => handleLearnMoreClick(industry.slug, industry.published)}>
                  Learn More 
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </section>;
};
export default Industries;