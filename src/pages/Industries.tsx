import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, DollarSign, Zap, Building2, Plus, GripVertical, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadAllContentFilesFromSupabaseOnly } from "@/utils/fileContentUtils";
import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import MainNavigation from "@/components/MainNavigation";
import Footer from "@/components/Footer";
import BlogCallToAction from "@/components/blog/BlogCallToAction";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useIndustriesDragDrop } from "@/hooks/useIndustriesDragDrop";

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
  published: boolean;
  order?: number;
}

const Industries = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const { hasUnsavedChanges, handleDragEnd, handleSaveOrder } = useIndustriesDragDrop(industries, setIndustries);
  
  useEffect(() => {
    const loadIndustries = async () => {
      try {
        console.log('Loading industries from Supabase only...');
        // Load only from Supabase database to maintain consistency with admin settings
        const dynamicIndustries = await loadAllContentFilesFromSupabaseOnly('industry');
        console.log('Raw industry data from Supabase:', dynamicIndustries);
        console.log('Number of industries loaded:', dynamicIndustries.length);
        
        // Filter industries based on admin status
        const visibleIndustries = isAdmin 
          ? dynamicIndustries // Admins see all industries
          : dynamicIndustries.filter(page => page.published); // Non-admins only see published industries
        
        console.log('Visible industries after filtering:', visibleIndustries);
        console.log('Is admin:', isAdmin);
        
        // Load custom order from database
        let customOrder: Record<string, number> = {};
        try {
          const { data: orderData } = await supabase
            .from('content_order')
            .select('slug, order_position')
            .eq('type', 'industry');
          
          if (orderData) {
            customOrder = orderData.reduce((acc, item) => {
              acc[item.slug] = item.order_position;
              return acc;
            }, {} as Record<string, number>);
          }
        } catch (error) {
          console.error('Error loading industry order:', error);
        }
        
        // Map industries with custom order
        const mappedIndustries: Industry[] = visibleIndustries.map((page) => {
          console.log('Mapping industry:', page.slug, 'Published:', page.published);
          const IconComponent = iconMap[page.icon || ''] || Building2;
          return {
            icon: IconComponent,
            title: page.title,
            slug: page.slug,
            description: page.excerpt || '',
            published: page.published,
            order: customOrder[page.slug] ?? 999 // Default high order for items without custom order
          };
        });

        console.log('Final mapped industries:', mappedIndustries);

        // Sort industries: published first, then by custom order, then drafts at the end
        const sortedIndustries = mappedIndustries.sort((a, b) => {
          // First, sort by published status
          if (a.published === false && b.published !== false) return 1;
          if (a.published !== false && b.published === false) return -1;
          
          // Then sort by order
          return (a.order || 999) - (b.order || 999);
        });
        
        console.log('Final sorted industries:', sortedIndustries);
        setIndustries(sortedIndustries);
      } catch (error) {
        console.error('Error loading industries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadIndustries();
  }, [isAdmin]);

  const handleIndustryClick = (slug: string, published: boolean) => {
    // Only allow navigation if published or user is admin
    if (published || isAdmin) {
      navigate(`/industries/${slug}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <MainNavigation />
        <div className="max-w-4xl mx-auto py-12 px-6 flex-1">
          <div className="text-center">
            <p className="text-slate-600">Loading industries...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <MainNavigation />

      <div className="max-w-4xl mx-auto py-12 px-6 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-semibold text-slate-900 mb-4">Industries</h1>
            <p className="text-slate-600">
              Deep sector knowledge across various industries.
              {isAdmin && " Drag and drop to reorder."}
            </p>
          </div>
          {isAdmin && (
            <div className="flex gap-3">
              {hasUnsavedChanges && (
                <Button 
                  onClick={handleSaveOrder}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Order
                </Button>
              )}
              <Button 
                onClick={() => navigate('/industries/new')}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Industry
              </Button>
            </div>
          )}
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="industries">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid gap-6"
              >
                {industries.map((industry, index) => (
                  <Draggable 
                    key={industry.slug} 
                    draggableId={industry.slug} 
                    index={index}
                    isDragDisabled={!isAdmin}
                  >
                    {(provided, snapshot) => (
                      <Card 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`hover:shadow-lg transition-shadow ${(industry.published || isAdmin) ? 'cursor-pointer' : 'cursor-default'} ${!industry.published ? 'opacity-60 border-2 border-dashed border-orange-200 bg-orange-50/30' : ''} ${snapshot.isDragging ? 'shadow-2xl' : ''}`}
                        onClick={() => !snapshot.isDragging && handleIndustryClick(industry.slug, industry.published)}
                      >
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-6">
                            {isAdmin && (
                              <div 
                                {...provided.dragHandleProps}
                                className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 cursor-grab active:cursor-grabbing"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <GripVertical className="h-5 w-5" />
                              </div>
                            )}
                            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                              <industry.icon className={`h-8 w-8 text-orange-600 ${!industry.published ? 'opacity-60' : ''}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <CardTitle className={`text-2xl font-medium mb-3 ${!industry.published ? 'text-slate-500' : 'text-slate-900'}`}>
                                  {industry.title}
                                </CardTitle>
                                {!industry.published && isAdmin && (
                                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full font-medium ml-2">
                                    Draft
                                  </span>
                                )}
                              </div>
                              <CardDescription className={`font-light text-base leading-relaxed ${!industry.published ? 'text-slate-400' : 'text-slate-600'}`}>
                                {industry.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {industries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No industries yet.</p>
            {isAdmin && (
              <Button 
                onClick={() => navigate('/industries/new')}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Create Your First Industry
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-900 mt-auto">
        <BlogCallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Industries;
