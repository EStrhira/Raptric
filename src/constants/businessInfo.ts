export const BUSINESS_INFO = {
  name: 'eSthira',
  address: {
    line1: '367, 10T Main',
    line2: 'Vidyapeeta Main Rd, Banashankari 3rd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560085',
    country: 'India',
    full: '367, 10T Main, Vidyapeeta Main Rd, Banashankari 3rd Stage, Bengaluru, Karnataka 560085, India'
  },
  contact: {
    phone: '+91 93802 76355',
    phoneFormatted: '+919380276355',
    email: 'info@esthira.com',
    website: 'https://esthira.com'
  },
  hours: {
    weekdays: 'Monday - Sunday: 10:30am to 8:30pm',
    display: '10:30am - 8:30pm (Daily)',
    detailed: {
      monday: { open: '10:30am', close: '8:30pm' },
      tuesday: { open: '10:30am', close: '8:30pm' },
      wednesday: { open: '10:30am', close: '8:30pm' },
      thursday: { open: '10:30am', close: '8:30pm' },
      friday: { open: '10:30am', close: '8:30pm' },
      saturday: { open: '10:30am', close: '8:30pm' },
      sunday: { open: '10:30am', close: '8:30pm' }
    }
  },
  social: {
    google: {
      placeId: 'YOUR_GOOGLE_PLACE_ID', // Replace with actual Place ID
      apiKey: 'YOUR_GOOGLE_API_KEY' // Replace with actual API key
    },
    razorpay: {
      apiKey: 'rzp_live_xw842G5NMLMYGb' // Live Razorpay API key
    }
  }
}

export default BUSINESS_INFO
