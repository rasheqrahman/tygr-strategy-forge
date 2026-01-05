
import { formatDateForTidyCal, transformTidyCalTimeslots } from './helpers.ts';
import type { BookingRequest } from './types.ts';

export class TidyCalAPI {
  private apiKey: string;
  private baseUrl = 'https://tidycal.com/api';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  async getBookingTypes() {
    console.log('Fetching booking types...');
    const response = await fetch(`${this.baseUrl}/booking-types`, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    console.log('Booking types response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch booking types:', response.status, errorText);
      throw new Error(`Failed to fetch booking types: ${response.status}`);
    }

    const data = await response.json();
    console.log('Booking types data:', JSON.stringify(data, null, 2));
    return data;
  }

  async getTimeslots(bookingTypeId: number, startDate: Date, endDate: Date) {
    const formattedStartDate = formatDateForTidyCal(startDate);
    const formattedEndDate = formatDateForTidyCal(endDate);

    const timeslotsUrl = `${this.baseUrl}/booking-types/${bookingTypeId}/timeslots?starts_at=${encodeURIComponent(formattedStartDate)}&ends_at=${encodeURIComponent(formattedEndDate)}`;
    console.log('Fetching timeslots from:', timeslotsUrl);

    const response = await fetch(timeslotsUrl, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    console.log('Timeslots response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch timeslots:', response.status, errorText);
      
      // If we get a 422, it might be a date format issue, let's try a simpler format
      if (response.status === 422) {
        console.log('Trying alternative date format...');
        const altStartDate = startDate.toISOString().split('.')[0] + 'Z';
        const altEndDate = endDate.toISOString().split('.')[0] + 'Z';
        const altUrl = `${this.baseUrl}/booking-types/${bookingTypeId}/timeslots?starts_at=${encodeURIComponent(altStartDate)}&ends_at=${encodeURIComponent(altEndDate)}`;
        
        console.log('Trying alternative URL:', altUrl);
        const altResponse = await fetch(altUrl, {
          method: 'GET',
          headers: this.getHeaders(),
        });
        
        console.log('Alternative response status:', altResponse.status);
        if (altResponse.ok) {
          const altData = await altResponse.json();
          console.log('Alternative timeslots data:', JSON.stringify(altData, null, 2));
          return altData;
        } else {
          const altErrorText = await altResponse.text();
          console.error('Alternative format also failed:', altResponse.status, altErrorText);
        }
      }
      
      throw new Error(`Failed to fetch timeslots: ${response.status}`);
    }

    const data = await response.json();
    console.log('Timeslots data:', JSON.stringify(data, null, 2));
    return data;
  }

  async createBooking(bookingTypeId: number, bookingData: any) {
    console.log('Final TidyCal booking payload:', JSON.stringify(bookingData, null, 2));

    const bookingUrl = `${this.baseUrl}/booking-types/${bookingTypeId}/bookings`;
    console.log('Booking URL:', bookingUrl);
    
    const response = await fetch(bookingUrl, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(bookingData),
    });

    console.log('TidyCal booking response status:', response.status);

    if (response.ok) {
      const data = await response.json();
      console.log('TidyCal booking response:', JSON.stringify(data, null, 2));
      return data;
    } else {
      const errorText = await response.text();
      console.error(`TidyCal booking failed:`, response.status, errorText);
      console.error('Request payload was:', JSON.stringify(bookingData, null, 2));
      throw new Error(`Booking failed: ${response.status} - ${errorText}`);
    }
  }

  async getSlotsForDate(date: string) {
    const bookingTypesData = await this.getBookingTypes();
    
    if (!bookingTypesData.data || !Array.isArray(bookingTypesData.data) || bookingTypesData.data.length === 0) {
      console.log('No booking types found');
      throw new Error('No booking types found');
    }

    // Find the "tygr-ventures-consultation" booking type
    const targetBookingType = bookingTypesData.data.find(
      (type: any) => type.url_slug === 'tygr-ventures-consultation'
    );

    if (!targetBookingType) {
      console.log('TYGR Ventures Consultation booking type not found, available types:', 
        bookingTypesData.data.map((type: any) => type.url_slug));
      throw new Error('TYGR Ventures Consultation booking type not found');
    }

    console.log('Using TYGR Ventures Consultation booking type:', targetBookingType.id, targetBookingType.title);

    // Get timeslots for this specific booking type
    const selectedDate = new Date(date);
    const startDate = new Date(selectedDate);
    startDate.setUTCHours(0, 0, 0, 0);
    
    const endDate = new Date(selectedDate);
    endDate.setUTCHours(23, 59, 59, 0);

    const timeslotsData = await this.getTimeslots(targetBookingType.id, startDate, endDate);
    const transformedSlots = transformTidyCalTimeslots(timeslotsData.data || [], targetBookingType.id);
    
    return {
      slots: transformedSlots,
      bookingTypeId: targetBookingType.id,
      bookingType: targetBookingType
    };
  }
}
