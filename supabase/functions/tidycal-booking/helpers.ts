
// Helper function to format dates for TidyCal API (Y-m-d\TH:i:s\Z format)
export function formatDateForTidyCal(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

// Helper function to transform TidyCal timeslots to our format
export function transformTidyCalTimeslots(timeslots: any[], bookingTypeId: number) {
  console.log('Transforming TidyCal timeslots:', timeslots);
  
  if (!Array.isArray(timeslots) || timeslots.length === 0) {
    console.log('No timeslots to transform');
    return [];
  }
  
  return timeslots.map((slot, index) => {
    const startTime = new Date(slot.starts_at);
    
    // Display the time in EST timezone since that's your business hours
    const timeString = startTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/New_York' // Force EST/EDT timezone
    });
    
    // Log both UTC and EST times for debugging
    const utcTime = startTime.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC'
    });
    
    console.log(`Slot ${index}: UTC time ${utcTime} displays as ${timeString} EST`);
    
    return {
      id: slot.starts_at, // Keep the original TidyCal UTC timestamp as the ID
      time: timeString, // Display in EST timezone
      available: slot.available_bookings > 0,
      bookingTypeId: bookingTypeId,
      startsAt: slot.starts_at,
      endsAt: slot.ends_at
    };
  });
}
