import { defineType, defineField } from 'sanity'

const newsSchema = defineType({
  name: 'news',
  title: 'News Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Brief description that appears in news listings'
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Company News', value: 'company-news' },
          { title: 'Product Updates', value: 'product-updates' },
          { title: 'Community Events', value: 'community-events' },
          { title: 'Partnerships', value: 'partnerships' },
          { title: 'Industry News', value: 'industry-news' },
          { title: 'Promotions', value: 'promotions' }
        ]
      }
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessiblity.'
        }
      ]
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {
              title: 'Normal',
              value: 'normal'
            },
            {
              title: 'H1',
              value: 'h1'
            },
            {
              title: 'H2',
              value: 'h2'
            },
            {
              title: 'H3',
              value: 'h3'
            },
            {
              title: 'Quote',
              value: 'blockquote'
            },
            {
              title: 'Image',
              value: 'image'
            }
          ]
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured Article',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title that appears in search results'
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description that appears in search results'
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [
            {
              type: 'string'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage'
    }
  }
})

export default newsSchema
