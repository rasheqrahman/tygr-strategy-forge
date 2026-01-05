
import { useState, useEffect } from "react";
import { loadAllContentFilesFromSupabaseOnly } from "@/utils/fileContentUtils";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Lightbulb, Wrench, Users, TrendingUp } from "lucide-react";

// Map of icon names to icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  lightbulb: Lightbulb,
  wrench: Wrench,
  users: Users,
  'trending-up': TrendingUp
};

// Type definition for service items
export interface Service {
  icon: React.ComponentType<any>;
  title: string;
  slug: string;
  description: string;
  published: boolean;
  order?: number;
}

export const useServicesData = () => {
  const { isAdmin } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadServices = async () => {
      try {
        console.log('Loading services from Supabase only...');
        // Load only from Supabase database to maintain consistency with admin settings
        const dynamicServices = await loadAllContentFilesFromSupabaseOnly('service');
        console.log('Raw service data from Supabase:', dynamicServices);
        console.log('Number of services loaded:', dynamicServices.length);
        
        // Filter services based on admin status
        const visibleServices = isAdmin 
          ? dynamicServices // Admins see all services
          : dynamicServices.filter(page => page.published); // Non-admins only see published services
        
        console.log('Visible services after filtering:', visibleServices);
        console.log('Is admin:', isAdmin);
        
        // Load custom order from database
        let customOrder: Record<string, number> = {};
        try {
          const { data: orderData } = await supabase
            .from('content_order')
            .select('slug, order_position')
            .eq('type', 'service');
          
          if (orderData) {
            customOrder = orderData.reduce((acc, item) => {
              acc[item.slug] = item.order_position;
              return acc;
            }, {} as Record<string, number>);
          }
        } catch (error) {
          console.error('Error loading service order:', error);
        }
        
        // Map services with custom order
        const mappedServices: Service[] = visibleServices.map((page) => {
          console.log('Mapping service:', page.slug, 'Published:', page.published);
          const IconComponent = iconMap[page.icon || ''] || Lightbulb;
          return {
            icon: IconComponent,
            title: page.title,
            slug: page.slug,
            description: page.excerpt || '',
            published: page.published,
            order: customOrder[page.slug] ?? 999 // Default high order for items without custom order
          };
        });

        console.log('Final mapped services:', mappedServices);

        // Sort services: published first, then by custom order, then drafts at the end
        const sortedServices = mappedServices.sort((a, b) => {
          // First, sort by published status
          if (a.published === false && b.published !== false) return 1;
          if (a.published !== false && b.published === false) return -1;
          
          // Then sort by order
          return (a.order || 999) - (b.order || 999);
        });
        
        console.log('Final sorted services:', sortedServices);
        setServices(sortedServices);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [isAdmin]);

  return { services, setServices, loading };
};
