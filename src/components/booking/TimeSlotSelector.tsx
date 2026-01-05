
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, ArrowRight, AlertTriangle } from 'lucide-react';
import { TimeSlot } from '@/types/booking';

interface TimeSlotSelectorProps {
  selectedDate: Date | undefined;
  availableSlots: TimeSlot[];
  selectedSlot: string | null;
  loading: boolean;
  isMockData: boolean;
  onSlotSelect: (slotId: string) => void;
  onConfirmBooking: () => void;
}

const TimeSlotSelector = ({
  selectedDate,
  availableSlots,
  selectedSlot,
  loading,
  isMockData,
  onSlotSelect,
  onConfirmBooking
}: TimeSlotSelectorProps) => {
  return (
    <Card className="border-0 shadow-xl bg-white rounded-3xl">
      <CardHeader className="pb-8 p-10">
        <CardTitle className={`text-3xl font-light text-slate-900 flex items-center gap-3 ${isMockData ? 'line-through opacity-50' : ''}`}>
          <Clock className="h-8 w-8 text-orange-600" />
          Available Times
          {isMockData && (
            <span className="text-lg text-red-600 font-normal no-underline opacity-100 ml-2">
              Mock Data Only
            </span>
          )}
        </CardTitle>
        <CardDescription className="text-slate-600 text-lg font-light">
          {selectedDate ? `Available slots for ${selectedDate.toLocaleDateString()}` : 'Select a date to see available times'}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-10 pb-10">
        {isMockData && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Warning:</strong> These are sample time slots only. TidyCal integration is not properly configured. Real availability may differ.
            </AlertDescription>
          </Alert>
        )}
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-14 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {availableSlots.map(slot => (
              <Button
                key={slot.id}
                variant={selectedSlot === slot.id ? "default" : "outline"}
                className={`w-full h-14 rounded-2xl font-light text-lg justify-between ${
                  selectedSlot === slot.id 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'border-slate-200 hover:border-orange-300 hover:bg-orange-50'
                } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => slot.available && onSlotSelect(slot.id)}
                disabled={!slot.available}
              >
                <span>{slot.time}</span>
                {slot.available ? (
                  <ArrowRight className="h-5 w-5" />
                ) : (
                  <span className="text-sm">Unavailable</span>
                )}
              </Button>
            ))}
            
            {selectedSlot && (
              <div className="mt-8 p-6 bg-orange-50 rounded-2xl">
                <p className="text-slate-900 font-medium mb-4">
                  Ready to book your consultation?
                </p>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-light"
                  onClick={onConfirmBooking}
                >
                  Enter Booking Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        )}
        
        {!loading && availableSlots.length === 0 && selectedDate && (
          <div className="text-center py-8">
            <p className="text-slate-600 font-light">
              No available slots for this date. Please select another date.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSlotSelector;
