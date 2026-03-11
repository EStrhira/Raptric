import { defineType, defineField, defineArrayMember } from 'sanity'
import type { StringRule, SlugRule, TextRule } from 'sanity'

const cycleSchema = defineType({
  name: 'cycle',
  title: 'Cycle',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule: SlugRule) => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule: StringRule) => Rule.required()
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price',
      type: 'string',
      description: 'Special discounted price (optional)'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: TextRule) => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'Brief description for card display (max 100 characters)',
      validation: (Rule: StringRule) => Rule.max(100)
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.'
            })
          ]
        })
      ],
      validation: (Rule: any) => Rule.min(1).error('At least one image is required.')
    }),
    defineField({
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          name: 'color',
          title: 'Color'
        })
      ]
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'text',
      description: 'Technical specifications and features'
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'images.0'
    }
  }
})

export default cycleSchema
