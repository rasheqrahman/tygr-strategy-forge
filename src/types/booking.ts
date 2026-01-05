
export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  meetingType: 'phone' | 'video';
}
