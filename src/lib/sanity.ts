import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'wtyitmmo',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Types for our content
export interface Hero {
  _id: string
  title: string
  subtitle: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  backgroundImage?: any
}

export interface ProductFeature {
  _id: string
  title: string
  description: string
  icon: string
  order: number
}

export interface Benefit {
  _id: string
  title: string
  description: string
  order: number
}

export interface Testimonial {
  _id: string
  quote: string
  authorName: string
  authorTitle: string
  authorLocation?: string
  authorAvatar?: any
  order: number
}

export interface ContactInfo {
  _id: string
  address: string
  phone: string
  email: string
  workingHours: string
}

export interface Retailer {
  _id: string
  name: string
  address: string
  phone: string
  email?: string
  city: string
  order: number
}

export interface Cycle {
  _id: string
  name: string
  slug: { current: string }
  price: string
  discountPrice?: string
  description: string
  shortDescription?: string
  image?: any
  images?: any[]
  colors?: string[]
  specifications?: string
  inStock: boolean
  featured: boolean
}

export interface Accessory {
  _id: string
  name: string
  slug: { current: string }
  price: string
  discountPrice?: string
  description: string
  shortDescription?: string
  images?: any[]
  features: { feature: string }[]
  compatibility: { model: string }[]
  inStock: boolean
  featured: boolean
}

export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: string
  publishedAt: string
  author: string
  image?: any
  featured: boolean
}

export interface NewsPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  content: string
  publishedAt: string
  image?: any
  featured: boolean
}

export interface EBike {
  _id: string
  name: string
  slug: { current: string }
  price: string
  discountPrice?: string
  description: string
  shortDescription?: string
  image?: any
  images?: any[]
  colors?: string[]
  electricalSpecification: string
  mechanicalSpecification: string
  inStock: boolean
  featured: boolean
}
