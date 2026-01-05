
export interface TidyCalTimeslot {
  starts_at: string;
  ends_at: string;
  available_bookings: number;
}

export interface BookingRequest {
  date: string;
  slotId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  meetingType?: string;
}

export interface TransformedSlot {
  id: string;
  time: string;
  available: boolean;
  bookingTypeId: number;
  startsAt: string;
  endsAt: string;
}

export interface BookingResponse {
  success: boolean;
  booking?: any;
  source: string;
  requestedTime?: string;
  confirmedTime?: string;
  meetingType?: string;
  bookingTitle?: string;
}

export interface SlotsResponse {
  slots: TransformedSlot[];
  source: string;
  bookingTypeId?: number;
  message: string;
}
