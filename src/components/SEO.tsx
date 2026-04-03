import React, { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  canonical?: string
  ogImage?: string
  ogType?: string
  author?: string
  structuredData?: object
  noindex?: boolean
  alternateLanguages?: Array<{
    hrefLang: string
    href: string
  }>
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  author = 'eSthira',
  structuredData,
  noindex = false,
  alternateLanguages = []
}) => {
  const siteTitle = title ? `${title} | eSthira` : 'eSthira - Premium Electric Bicycles & Cycles in Bangalore'
  const siteDescription = description || 'Experience the magic of electric bicycles (eBikes) and see the difference it creates in your lifestyle. Visit our Bangalore store today!'
  const siteKeywords = keywords || 'electric bicycle, e-bike, electric cycle, Bangalore, premium e-bike, electric bike, eco-friendly transport, sustainable mobility, electric bicycle Bangalore, e-bike store, electric cycle price, best e-bike, electric bike India'

  useEffect(() => {
    const siteUrl = canonical || 'https://esthira.com'
    const siteImage = ogImage || '/images/og-image.jpg'

    // Update document head
    document.title = siteTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', siteDescription)
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', siteKeywords)
    document.querySelector('meta[name="author"]')?.setAttribute('content', author)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow')
    
    // Canonical URL
    if (canonical) {
      const link = document.createElement('link')
      link.rel = 'canonical'
      link.href = siteUrl
      document.head.appendChild(link)
    }
    
    // Open Graph / Facebook
    const ogTitleMeta = document.createElement('meta')
    ogTitleMeta.setAttribute('property', 'og:title')
    ogTitleMeta.content = siteTitle
    document.head.appendChild(ogTitleMeta)
    
    const ogDescMeta = document.createElement('meta')
    ogDescMeta.setAttribute('property', 'og:description')
    ogDescMeta.content = siteDescription
    document.head.appendChild(ogDescMeta)
    
    const ogImageMeta = document.createElement('meta')
    ogImageMeta.setAttribute('property', 'og:image')
    ogImageMeta.content = siteImage
    document.head.appendChild(ogImageMeta)
    
    const ogUrlMeta = document.createElement('meta')
    ogUrlMeta.setAttribute('property', 'og:url')
    ogUrlMeta.content = siteUrl
    document.head.appendChild(ogUrlMeta)
    
    const ogTypeMeta = document.createElement('meta')
    ogTypeMeta.setAttribute('property', 'og:type')
    ogTypeMeta.content = ogType
    document.head.appendChild(ogTypeMeta)
    
    const ogSiteNameMeta = document.createElement('meta')
    ogSiteNameMeta.setAttribute('property', 'og:site_name')
    ogSiteNameMeta.content = 'eSthira'
    document.head.appendChild(ogSiteNameMeta)
    
    const ogLocaleMeta = document.createElement('meta')
    ogLocaleMeta.setAttribute('property', 'og:locale')
    ogLocaleMeta.content = 'en_US'
    document.head.appendChild(ogLocaleMeta)
    
    // Twitter Card
    const twitterCardMeta = document.createElement('meta')
    twitterCardMeta.setAttribute('name', 'twitter:card')
    twitterCardMeta.content = 'summary_large_image'
    document.head.appendChild(twitterCardMeta)
    
    const twitterTitleMeta = document.createElement('meta')
    twitterTitleMeta.setAttribute('name', 'twitter:title')
    twitterTitleMeta.content = siteTitle
    document.head.appendChild(twitterTitleMeta)
    
    const twitterDescMeta = document.createElement('meta')
    twitterDescMeta.setAttribute('name', 'twitter:description')
    twitterDescMeta.content = siteDescription
    document.head.appendChild(twitterDescMeta)
    
    const twitterImageMeta = document.createElement('meta')
    twitterImageMeta.setAttribute('name', 'twitter:image')
    twitterImageMeta.content = siteImage
    document.head.appendChild(twitterImageMeta)
    
    const twitterSiteMeta = document.createElement('meta')
    twitterSiteMeta.setAttribute('name', 'twitter:site')
    twitterSiteMeta.content = '@esthira'
    document.head.appendChild(twitterSiteMeta)
    
    // Additional SEO Meta
    const themeColorMeta = document.createElement('meta')
    themeColorMeta.setAttribute('name', 'theme-color')
    themeColorMeta.content = '#00a652'
    document.head.appendChild(themeColorMeta)
    
    const msTileColorMeta = document.createElement('meta')
    msTileColorMeta.setAttribute('name', 'msapplication-TileColor')
    msTileColorMeta.content = '#00a652'
    document.head.appendChild(msTileColorMeta)
    
    const applicationNameMeta = document.createElement('meta')
    applicationNameMeta.setAttribute('name', 'application-name')
    applicationNameMeta.content = 'eSthira'
    document.head.appendChild(applicationNameMeta)
    
    // Favicon and App Icons
    const favicon = document.createElement('link')
    favicon.rel = 'icon'
    favicon.href = '/favicon.ico'
    favicon.sizes = 'any'
    document.head.appendChild(favicon)
    
    const appleTouchIcon = document.createElement('link')
    appleTouchIcon.rel = 'apple-touch-icon'
    appleTouchIcon.href = '/apple-touch-icon.png'
    document.head.appendChild(appleTouchIcon)
    
    const manifest = document.createElement('link')
    manifest.rel = 'manifest'
    manifest.href = '/manifest.json'
    document.head.appendChild(manifest)
    
    // Structured Data
    if (structuredData) {
      const structuredDataScript = document.createElement('script')
      structuredDataScript.type = 'application/ld+json'
      structuredDataScript.textContent = JSON.stringify(structuredData)
      document.head.appendChild(structuredDataScript)
    }
    
    // Alternate Language Links
    alternateLanguages.forEach((lang, index) => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.setAttribute('hrefLang', lang.hrefLang)
      link.href = lang.href
      document.head.appendChild(link)
    })
  }, [title, description, keywords, canonical, ogImage, ogType, author, structuredData, noindex, alternateLanguages])

  return null
}

export default SEO
