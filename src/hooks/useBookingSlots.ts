
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { TimeSlot, BookingFormData } from '@/types/booking';

export const useBookingSlots = () => {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [isMockData, setIsMockData] = useState(false);
  const { toast } = useToast();

  const fetchAvailableSlots = async (date: Date) => {
    setLoading(true);
    try {
      console.log('Fetching slots for date:', date.toISOString().split('T')[0]);
      
      const { data, error } = await supabase.functions.invoke('tidycal-booking', {
        body: {
          action: 'getSlots',
          data: {
            date: date.toISOString().split('T')[0]
          }
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message);
      }

      if (data?.error) {
        console.error('TidyCal API error:', data.error);
        throw new Error(data.error);
      }

      console.log('Received slots:', data?.slots);
      setAvailableSlots(data?.slots || []);
      setIsMockData(data?.source === 'mock_data');
      
    } catch (error: any) {
      console.error('Error fetching slots:', error);
      toast({
        title: "Error",
        description: "Failed to load available time slots. Please try again.",
        variant: "destructive",
      });
      setAvailableSlots([]);
      setIsMockData(false);
    } finally {
      setLoading(false);
    }
  };

  const submitBooking = async (
    formData: BookingFormData,
    selectedSlot: string,
    selectedDate: Date
  ) => {
    setBookingLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('tidycal-booking', {
        body: {
          action: 'createBooking',
          data: {
            date: selectedDate.toISOString().split('T')[0],
            slotId: selectedSlot,
            customerName: `${formData.firstName} ${formData.lastName}`,
            customerEmail: formData.email,
            customerPhone: formData.phoneNumber,
            meetingType: formData.meetingType
          }
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Booking Confirmed!",
        description: "Your consultation has been successfully scheduled.",
      });

      await fetchAvailableSlots(selectedDate);
      return true;

    } catch (error: any) {
      console.error('Booking error:', error);
      toast({
        title: "Booking Failed",
        description: "There was an error creating your booking. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setBookingLoading(false);
    }
  };

  return {
    availableSlots,
    loading,
    bookingLoading,
    isMockData,
    fetchAvailableSlots,
    submitBooking
  };
};
