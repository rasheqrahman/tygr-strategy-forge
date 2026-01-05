
export const navigateToBookingSection = () => {
  // Check if we're already on the homepage
  if (window.location.pathname === '/') {
    // We're on the homepage, just scroll to the booking section
    scrollToBookingSection();
  } else {
    // We're on another page, navigate to homepage first
    window.location.href = '/#booking';
  }
};

const scrollToBookingSection = () => {
  // Try multiple methods to find the booking section
  
  // Method 1: Look for element with id="booking" (we should add this)
  let bookingSection = document.getElementById('booking');
  
  // Method 2: Look for the BookingSlots component by finding specific text
  if (!bookingSection) {
    const sections = document.querySelectorAll('section');
    for (const section of sections) {
      if (section.textContent?.includes('Schedule a Meeting') || 
          section.textContent?.includes('Ready to explore further')) {
        bookingSection = section;
        break;
      }
    }
  }
  
  if (bookingSection) {
    bookingSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  } else {
    // Fallback: scroll to bottom of page if booking section not found
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
};

// Handle navigation from hash on page load
export const handleBookingHash = () => {
  if (window.location.hash === '#booking') {
    // Small delay to ensure page is fully rendered
    setTimeout(() => {
      scrollToBookingSection();
    }, 100);
  }
};
