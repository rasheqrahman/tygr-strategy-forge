
import type { BookingRequest, SlotsResponse, BookingResponse } from './types.ts';

// Helper function to return mock slots
export function getMockSlots(): Response {
  const mockSlots = [
    { id: 'slot-1', time: '9:00 AM', available: true },
    { id: 'slot-2', time: '10:00 AM', available: true },
    { id: 'slot-3', time: '11:00 AM', available: false },
    { id: 'slot-4', time: '2:00 PM', available: true },
    { id: 'slot-5', time: '3:00 PM', available: true },
    { id: 'slot-6', time: '4:00 PM', available: true },
  ];

  console.log('Returning mock slots:', mockSlots);

  const response: SlotsResponse = { 
    slots: mockSlots,
    source: 'mock_data',
    message: 'Using mock data - TidyCal API not configured or failed'
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Helper function to return mock booking
export function getMockBooking(data: BookingRequest): Response {
  let mockBookingTitle = data.customerName || 'Unknown Customer';
  let mockNotes = '';
  
  if (data.meetingType === 'phone') {
    // Format the booking time for display if we have a slot ID
    let bookingTime = 'scheduled time';
    if (data.slotId) {
      const slotDateTime = new Date(data.slotId);
      if (!isNaN(slotDateTime.getTime())) {
        bookingTime = slotDateTime.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true,
          timeZone: 'America/New_York'
        });
      }
    }
    
    mockBookingTitle = `Call: ${data.customerName} (${data.customerPhone})`;
    mockNotes = `Rasheq to call ${data.customerName} at ${data.customerPhone} at ${bookingTime}`;
  }

  const bookingResult = {
    id: `booking-${Date.now()}`,
    date: data.date,
    slot_id: data.slotId,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    meeting_type: data.meetingType,
    booking_title: mockBookingTitle,
    notes: mockNotes,
    status: 'confirmed',
    requested_time: data.slotId,
    mock_warning: 'This is a mock booking - TidyCal API not available'
  };

  console.log('Mock booking created:', bookingResult);

  const response: BookingResponse = { 
    success: true, 
    booking: bookingResult,
    source: 'mock_data',
    meetingType: data.meetingType,
    bookingTitle: mockBookingTitle
  };

  return new Response(JSON.stringify(response), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
