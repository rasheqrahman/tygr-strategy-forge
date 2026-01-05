import React, { useState, useEffect } from 'react';
import DateSelector from './booking/DateSelector';
import TimeSlotSelector from './booking/TimeSlotSelector';
import BookingConfirmationModal from './BookingConfirmationModal';
import { useBookingSlots } from '@/hooks/useBookingSlots';
import { BookingFormData } from '@/types/booking';
const BookingSlots = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const {
    availableSlots,
    loading,
    bookingLoading,
    isMockData,
    fetchAvailableSlots,
    submitBooking
  } = useBookingSlots();
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(selectedDate);
    }
  }, [selectedDate]);
  const handleSlotSelection = (slotId: string) => {
    setSelectedSlot(slotId);
    console.log('Selected slot:', slotId, 'for date:', selectedDate);
  };
  const handleBookingConfirmation = () => {
    setShowBookingModal(true);
  };
  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedSlot || !selectedDate) return;
    const success = await submitBooking(formData, selectedSlot, selectedDate);
    if (success) {
      setSelectedSlot(null);
      setShowBookingModal(false);
    }
  };
  return <>
      <section id="booking" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="mb-24">
            <div className="text-orange-600 text-sm font-light tracking-widest uppercase mb-8">
              Schedule a Meeting
            </div>
            <h2 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900 max-w-4xl">Let's discuss how we can help</h2>
            <p className="text-xl text-slate-600 leading-relaxed font-light max-w-3xl mt-8">Want do learn more about TYGR Ventures? Select a convenient time for a free consultation call.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <DateSelector selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            </div>

            <div className="lg:col-span-2 space-y-8">
              <TimeSlotSelector selectedDate={selectedDate} availableSlots={availableSlots} selectedSlot={selectedSlot} loading={loading} isMockData={isMockData} onSlotSelect={handleSlotSelection} onConfirmBooking={handleBookingConfirmation} />
            </div>
          </div>
        </div>
      </section>

      <BookingConfirmationModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} onSubmit={handleBookingSubmit} isLoading={bookingLoading} selectedDate={selectedDate} selectedSlot={selectedSlot} availableSlots={availableSlots} />
    </>;
};
export default BookingSlots;