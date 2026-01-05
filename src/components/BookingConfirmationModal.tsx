
import React from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PhoneCall, Video } from 'lucide-react';

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  meetingType: 'phone' | 'video';
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  isLoading: boolean;
  selectedDate: Date | undefined;
  selectedSlot: string | null;
  availableSlots: TimeSlot[];
}

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading,
  selectedDate,
  selectedSlot,
  availableSlots
}: BookingConfirmationModalProps) => {
  const form = useForm<BookingFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      meetingType: 'video'
    }
  });

  const handleSubmit = (data: BookingFormData) => {
    onSubmit(data);
  };

  const selectedSlotDetails = availableSlots.find(slot => slot.id === selectedSlot);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-slate-900">
            Confirm Your Booking
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-slate-700 font-medium">
            {selectedDate?.toLocaleDateString()} at {selectedSlotDetails?.time}
          </p>
          <p className="text-slate-600 text-sm">
            TYGR Ventures Consultation (30 minutes)
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meetingType"
              rules={{ required: "Meeting type is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                        <RadioGroupItem value="video" id="video" />
                        <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Video className="h-4 w-4 text-orange-600" />
                          Video Call
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-slate-50">
                        <RadioGroupItem value="phone" id="phone" />
                        <Label htmlFor="phone" className="flex items-center gap-2 cursor-pointer flex-1">
                          <PhoneCall className="h-4 w-4 text-orange-600" />
                          Phone Call
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Booking'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmationModal;
