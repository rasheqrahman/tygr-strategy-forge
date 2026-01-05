
import { TidyCalAPI } from './tidycal-api.ts';
import { getMockSlots, getMockBooking } from './mock-data.ts';
import type { BookingRequest, SlotsResponse, BookingResponse } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export async function handleGetSlots(data: BookingRequest): Promise<Response> {
  console.log('Fetching slots for date:', data.date);
  
  const TIDYCAL_API_KEY = Deno.env.get('TIDYCAL_API_KEY');
  if (!TIDYCAL_API_KEY) {
    console.log('TidyCal API key not configured, using mock data');
    return getMockSlots();
  }

  try {
    const tidyCalAPI = new TidyCalAPI(TIDYCAL_API_KEY);
    const result = await tidyCalAPI.getSlotsForDate(data.date);
    
    const response: SlotsResponse = { 
      slots: result.slots,
      source: 'tidycal_api',
      bookingTypeId: result.bookingTypeId,
      message: `Data from TidyCal API for booking type: ${result.bookingType.title}`
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Error fetching from TidyCal API:', error);
    console.log('Falling back to mock data');
    return getMockSlots();
  }
}

export async function handleCreateBooking(data: BookingRequest): Promise<Response> {
  console.log('Creating booking with raw data:', JSON.stringify(data, null, 2));
  console.log('Meeting type received:', data.meetingType);
  console.log('Customer phone:', data.customerPhone);
  console.log('Received slot ID for booking:', data.slotId);
  
  const TIDYCAL_API_KEY = Deno.env.get('TIDYCAL_API_KEY');
  if (!TIDYCAL_API_KEY) {
    console.log('TidyCal API key not configured, using mock booking');
    return getMockBooking(data);
  }

  try {
    const tidyCalAPI = new TidyCalAPI(TIDYCAL_API_KEY);
    
    // Get the TYGR Ventures Consultation booking type for booking creation
    const bookingTypesData = await tidyCalAPI.getBookingTypes();
    const targetBookingType = bookingTypesData.data.find(
      (type: any) => type.url_slug === 'tygr-ventures-consultation'
    );

    if (!targetBookingType) {
      throw new Error('TYGR Ventures Consultation booking type not found');
    }

    // Validate and parse the selected slot time
    if (!data.slotId) {
      throw new Error('No slot ID provided');
    }

    console.log('Processing slot ID for booking:', data.slotId);
    
    // The slot ID should be in ISO format like "2025-06-12T20:00:00.000000Z"
    // Let's validate it's a proper datetime and use it exactly as TidyCal provided it
    const slotDateTime = new Date(data.slotId);
    if (isNaN(slotDateTime.getTime())) {
      throw new Error(`Invalid slot datetime: ${data.slotId}`);
    }

    console.log('Using exact slot time from TidyCal:', data.slotId);
    console.log('Slot datetime parsed as:', slotDateTime.toISOString());
    console.log('This represents:', slotDateTime.toString());

    // Create different booking payloads based on meeting type
    let bookingPayload: any = {
      starts_at: data.slotId, // Use the exact slot ID which is the ISO datetime from TidyCal
      email: data.customerEmail || 'unknown@example.com',
      phone: data.customerPhone || '',
      timezone: 'UTC' // Since our slot IDs are already in UTC from TidyCal
    };

    // Customize based on meeting type
    if (data.meetingType === 'phone') {
      // Format the booking time for display in EST timezone
      const bookingTime = slotDateTime.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true,
        timeZone: 'America/New_York'
      });
      
      // For phone calls, customize the booking title and name with phone number in subject
      bookingPayload.name = `Call: ${data.customerName} (${data.customerPhone})`;
      bookingPayload.notes = `Rasheq to call ${data.customerName} at ${data.customerPhone} at ${bookingTime}`;
      console.log('Creating phone call booking - custom title with phone number and notes with time added');
    } else {
      // For video calls, use standard format (TidyCal will create video link automatically)
      bookingPayload.name = data.customerName || 'Unknown Customer';
      console.log('Creating video call booking - standard format, TidyCal will generate video link');
    }

    const bookingData = await tidyCalAPI.createBooking(targetBookingType.id, bookingPayload);
    
    const response: BookingResponse = { 
      success: true, 
      booking: bookingData.data,
      source: 'tidycal_api',
      requestedTime: data.slotId,
      confirmedTime: bookingData.data?.starts_at,
      meetingType: data.meetingType,
      bookingTitle: bookingPayload.name
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Error creating booking:', error);
    console.log('Falling back to mock booking');
    return getMockBooking(data);
  }
}
