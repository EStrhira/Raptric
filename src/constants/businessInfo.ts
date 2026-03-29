export const BUSINESS_INFO = {
  name: 'eSthira',
  address: {
    line1: '367, 10T Main, Vidyapeeta Main Road',
    line2: 'Banashankari 3rd Stage',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560085',
    country: 'India',
    full: '367, 10T Main, Vidyapeeta Main Road, Banashankari 3rd Stage, Bengaluru, Karnataka 560085, India'
  },
  contact: {
    phone: '+91 93802 76355',
    phoneFormatted: '+919380276355',
    email: 'info.esthira@gmail.com',
    website: 'https://esthira.com'
  },
  hours: {
    weekdays: 'Monday - Sunday: 10:30am to 8:30pm',
    weekdays2: 'Monday - Saturday, 10:30am to 8:30pm',
    display: '10:30am - 8:30pm',
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
      apiKey: process.env.REACT_APP_RAZORPAY_API_KEY || 'rzp_live_SWADqU4LI1kctL', // Use live API key for both dev and prod
      secret: process.env.REACT_APP_RAZORPAY_SECRET || 'u32aiccuZrWg1g5bALWxoL6I' // Use live API secret
    }
  }
}

export default BUSINESS_INFO
