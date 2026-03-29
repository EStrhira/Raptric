import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

/**
 * Sanity client configuration
 * Uses CDN for production builds for better performance
 */
export const client = createClient({
  projectId: 'wtyitmmo',
  dataset: 'production',
  useCdn: process.env.NODE_ENV === 'production', // Enable CDN in production
  apiVersion: '2024-01-01',
  perspective: 'published', // Only show published content
})

/**
 * Image URL builder using the new Sanity Image URL API
 * Replaces the deprecated imageUrlBuilder
 */
const imageBuilder = createImageUrlBuilder(client)

/**
 * Generates optimized image URLs for Sanity assets
 * @param source - Sanity image asset reference
 * @returns Image URL builder instance
 */
export function urlFor(source: any) {
  return imageBuilder.image(source)
}

/**
 * Generates image URLs with common options
 * @param source - Sanity image asset reference
 * @param options - Image options (width, height, format, quality)
 * @returns Complete image URL string
 */
export function buildImageUrl(
  source: any, 
  options: {
    width?: number;
    height?: number;
    format?: 'webp' | 'jpg' | 'png';
    quality?: number;
    fit?: 'clip' | 'crop' | 'fill' | 'max' | 'scale';
  } = {}
): string {
  let builder = imageBuilder.image(source)
  
  // Apply dimensions
  if (options.width) builder = builder.width(options.width)
  if (options.height) builder = builder.height(options.height)
  
  // Apply format and quality
  if (options.format) builder = builder.format(options.format)
  if (options.quality) builder = builder.quality(options.quality)
  
  // Apply fit mode (using correct Sanity FitMode values)
  if (options.fit) builder = builder.fit(options.fit)
  
  // Auto-format for WebP support
  if (!options.format && options.width) {
    builder = builder.auto('format')
  }
  
  return builder.url()
}

/**
 * Responsive image URL generator
 * @param source - Sanity image asset reference
 * @returns Responsive image builder
 */
export function urlForResponsive(source: any) {
  return imageBuilder
    .image(source)
    .auto('format')
    .fit('max')
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
