import { defineType, defineField, defineArrayMember } from 'sanity'

const accessoriesSchema = defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: (Rule) => Rule.required()
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
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'Brief description for card display (max 100 characters)',
      validation: (Rule) => Rule.max(100)
    }),
    defineField({
      name: 'images',
      title: 'Product Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true
          },
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
      validation: (Rule) => Rule.min(1).error('At least one image is required.')
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'featureItem',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'compatibility',
      title: 'Compatibility',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'compatibilityItem',
          fields: [
            defineField({
              name: 'model',
              title: 'Compatible Model',
              type: 'string',
              validation: (Rule) => Rule.required()
            })
          ]
        })
      ]
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

export default accessoriesSchema
