import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Posts',
  type: 'document',
  groups: [
    {
      name: 'content',
      title: 'Content',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // CONTENT FIELDS
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      group: 'content',
    }),
    defineField({
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
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          validation: Rule => Rule.required(),
        }
      ],
      group: 'content',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'string'}],
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      description: 'Short summary (150-160 characters recommended)',
      validation: Rule => Rule.max(200),
      group: 'content',
    }),
    
    // ENHANCED BODY FIELD WITH RICH FORMATTING
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          // Styles - Headings & Paragraphs
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          // Lists
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
          // Marks - inline styles
          marks: {
            // Text decorations
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            // Links
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: Rule => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel']
                    })
                  },
                  {
                    title: 'Open in new tab',
                    name: 'blank',
                    type: 'boolean',
                    initialValue: true
                  }
                ]
              },
              // Highlight text color
              {
                title: 'Highlight',
                name: 'highlight',
                type: 'object',
                fields: [
                  {
                    title: 'Highlight Color',
                    name: 'color',
                    type: 'string',
                    options: {
                      list: [
                        {title: 'Yellow', value: 'yellow'},
                        {title: 'Green', value: 'green'},
                        {title: 'Blue', value: 'blue'},
                        {title: 'Pink', value: 'pink'},
                      ]
                    }
                  }
                ]
              }
            ]
          }
        },
        // Images in content
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              type: 'text',
              name: 'alt',
              title: 'Alternative Text',
              description: 'Required for SEO and accessibility',
              validation: Rule => Rule.required(),
            },
            {
              type: 'string',
              name: 'caption',
              title: 'Caption',
              description: 'Optional caption below image',
            }
          ]
        },
        // Custom callout/info boxes
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            {
              title: 'Type',
              name: 'type',
              type: 'string',
              options: {
                list: [
                  {title: 'Info', value: 'info'},
                  {title: 'Warning', value: 'warning'},
                  {title: 'Tip', value: 'tip'},
                  {title: 'Note', value: 'note'},
                ]
              }
            },
            {
              title: 'Content',
              name: 'content',
              type: 'text',
              rows: 3
            }
          ],
          preview: {
            select: {
              type: 'type',
              content: 'content'
            },
            prepare({type, content}) {
              return {
                title: type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Callout',
                subtitle: content
              }
            }
          }
        }
      ],
      group: 'content',
    }),

    // SEO FIELDS
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Title for search engines (50-60 characters). If empty, uses main title.',
      validation: Rule => Rule.max(60),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines (150-160 characters). If empty, uses excerpt.',
      validation: Rule => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Focus Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Main keywords for this article (e.g., "Santorini travel", "Greece beaches")',
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (1200x630px recommended). If empty, uses main image.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      group: 'seo',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Enable to prevent search engines from indexing this post',
      initialValue: false,
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'mainImage',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {author, publishedAt} = selection
      return {
        ...selection,
        subtitle: author && publishedAt 
          ? `${author} - ${new Date(publishedAt).toLocaleDateString()}`
          : author || publishedAt
      }
    }
  }
})
