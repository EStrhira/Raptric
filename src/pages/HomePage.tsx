import React from 'react'
import { useScrollToTop } from '../hooks/useScrollToTop'
import Hero from '../components/Hero'
import RunningCounter from '../components/RunningCounter'
import ShowcaseSection from '../components/ShowcaseSection'
import ProductFeatures from '../components/ProductFeatures'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import Support from '../components/Support'
import Contact from '../components/Contact'
import MechanicalShowcaseSection from '../components/MechanicalShowcaseSection'
import BUSINESS_INFO from '../constants/businessInfo'

// Fallback data to ensure the app works even without Sanity
const fallbackHero = {
  _id: 'fallback',
  title: 'eSthira RAPTRIC: The Future of Commuting',
  subtitle: 'Packed with Cutting-Edge Features for an Unmatched Riding Experience',
  primaryButtonText: 'Buy Now',
  primaryButtonLink: '/ebikes',
  secondaryButtonText: 'Test Drive Now',
  secondaryButtonLink: '/contact'
}

const fallbackFeatures = [
  { _id: '1', title: 'Aesthetic Design', description: 'Sleek and modern design that turns heads wherever you go', icon: 'fas fa-palette', order: 1 },
  { _id: '2', title: '250W BLDC Hub Motor', description: 'Powerful and efficient motor for smooth acceleration', icon: 'fas fa-bolt', order: 2 },
  { _id: '3', title: 'Lithium-Ion Battery', description: 'Long-lasting battery for extended rides', icon: 'fas fa-battery-full', order: 3 },
  { _id: '4', title: 'Safety & Comfort Functions', description: 'Multiple safety features for secure riding', icon: 'fas fa-shield-alt', order: 4 },
  { _id: '5', title: 'High Tensile Steel Frame', description: 'Durable frame built for all terrains', icon: 'fas fa-tools', order: 5 },
  { _id: '6', title: 'Easy Test Drives', description: 'Experience the Power - Ride before you Decide', icon: 'fas fa-route', order: 6 },
  { _id: '7', title: 'Dedicated Service Center', description: 'Expert service and maintenance support', icon: 'fas fa-wrench', order: 6 },
  { _id: '8', title: 'Covered with Warranty', description: 'Comprehensive warranty for peace of mind', icon: 'fas fa-shield-alt', order: 7 },
  { _id: '9', title: 'EMI Options Available', description: 'Flexible payment options to suit your budget', icon: 'fas fa-calendar-alt', order: 8 }
]

const fallbackBenefits = [
  { _id: '1', title: 'Eco-Friendly Mobility', description: 'E-bikes emit zero emissions, unlike gasoline-powered vehicles, reducing reliance on fossil fuels and combating air pollution and climate change.', order: 1 },
  { _id: '2', title: 'Enhanced Safety', description: 'eBikes promote road safety by boosting cycling, raising cyclist visibility, and fostering road-sharing. Plus, their lower speeds help keep roads safer.', order: 2 },
  { _id: '3', title: 'Cost Savings', description: 'Compared to cars, eBikes save on fuel, maintenance, insurance, and parking fees. They\'re also affordable to buy than electric cars or motorcycles.', order: 3 },
  { _id: '4', title: 'Promotion of Sustainable Tourism', description: 'eBikes are popular for eco-friendly tourism, enabling longer-distance travel and easy tackling of challenging terrain, thus promoting sustainable tourism.', order: 4 },
  { _id: '5', title: 'Corporate Social Responsibility', description: 'Companies that promote eBike commuting for employees demonstrate a commitment to sustainability, health, and employee well-being.', order: 5 },
  { _id: '6', title: 'Reduction in Parking Demand', description: 'eBikes need less parking than cars, motorcycles, or scooters. Promoting eBike use for short trips and commuting can reduce parking demand in cities.', order: 6 },
  { _id: '7', title: 'Reduced Noise Pollution', description: 'eBikes operate quietly, reducing urban and residential noise pollution, creating a more serene environment, thereby reducing noise pollution.', order: 7 },
  { _id: '8', title: 'Flexibility in Commuting Options', description: 'eBikes offer commuters flexible options: riders can switch between pedal-assist and full electric modes based on distance, terrain, weather, and preference.', order: 8 },
  { _id: '9', title: 'Accessibility & Inclusivity', description: 'eBikes make cycling accessible to those with physical limitations, in hilly areas, or facing long commutes, reducing barriers and allowing more to enjoy cycling benefits.', order: 9 }
]

const fallbackTestimonials = [
  { _id: '1', quote: 'Har ride ko bana do premium… RAPTRIC ke sath.', authorName: 'Happy Customer', authorTitle: 'Verified Buyer', order: 1 },
  { _id: '2', quote: 'Another customer, another electric smile ⚡ Welcome to the eSthira family!', authorName: 'New Rider', authorTitle: 'Bangalore', order: 2 },
  { _id: '3', quote: 'Not just riding… FLYING on wheels 🚴‍♂️💥', authorName: 'Enthusiast', authorTitle: 'Regular Commuter', order: 3 }
]

const fallbackContactInfo = {
  _id: 'fallback',
  address: BUSINESS_INFO.address.full,
  phone: BUSINESS_INFO.contact.phoneFormatted,
  email: BUSINESS_INFO.contact.email,
  workingHours: BUSINESS_INFO.hours.weekdays
}

const fallbackRetailers = [
  { _id: '1', name: 'eSthira Bengaluru Headquarters', address: BUSINESS_INFO.address.full, phone: BUSINESS_INFO.contact.phoneFormatted, email: BUSINESS_INFO.contact.email, city: 'Bengaluru', order: 1 },
  { _id: '2', name: 'eSthira Service Center', address: BUSINESS_INFO.address.full, phone: BUSINESS_INFO.contact.phoneFormatted, email: BUSINESS_INFO.contact.email, city: 'Bengaluru', order: 2 },
  { _id: '3', name: 'eSthira Sales Office', address: BUSINESS_INFO.address.full, phone: BUSINESS_INFO.contact.phoneFormatted, email: BUSINESS_INFO.contact.email, city: 'Bengaluru', order: 3 }
]

const HomePage: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()

  return (
    <>
      <Hero hero={fallbackHero} />
      <ShowcaseSection />
      <RunningCounter title="E-BIKE SPECIFICATIONS" />
      <MechanicalShowcaseSection />
      <ProductFeatures features={fallbackFeatures} />
      <Benefits benefits={fallbackBenefits} />
      <Testimonials />
      <Support />
      
      <Contact contactInfo={fallbackContactInfo} />
    </>
  )
}

export default HomePage
