
import { useState } from "react";
import { DropResult } from 'react-beautiful-dnd';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Service } from './useServicesData';

export const useServicesDragDrop = (services: Service[], setServices: (services: Service[]) => void) => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !isAdmin) return;

    const items = Array.from(services);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setServices(updatedItems);
    setHasUnsavedChanges(true);
    
    console.log('New order:', updatedItems.map(item => ({ slug: item.slug, order: item.order })));
  };

  const handleSaveOrder = async () => {
    if (!isAdmin) return;

    try {
      // Get the current user ID first
      const { data: { user } } = await supabase.auth.getUser();
      
      // Save the order to Supabase
      const orderData = services.map(item => ({
        slug: item.slug,
        type: 'service',
        order_position: item.order || 0,
        updated_by: user?.id
      }));

      // Use upsert to insert or update the order
      const { error } = await supabase
        .from('content_order')
        .upsert(orderData, { 
          onConflict: 'slug,type',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Error saving order:', error);
        toast({
          title: "Error saving order",
          description: "Failed to save the service order. Please try again.",
          variant: "destructive",
        });
        return;
      }

      console.log('Successfully saved order to database');
      
      toast({
        title: "Order saved",
        description: "The service order has been saved successfully.",
      });
      
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving order:', error);
      toast({
        title: "Error saving order",
        description: "Failed to save the service order. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    hasUnsavedChanges,
    handleDragEnd,
    handleSaveOrder
  };
};
