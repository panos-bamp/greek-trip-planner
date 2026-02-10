import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
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
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    // ✅ HTML EMBED - Paste raw HTML (tables, embeds, custom widgets)
    defineArrayMember({
      name: 'htmlEmbed',
      type: 'object',
      title: '🧩 HTML Embed',
      description: 'Paste raw HTML here — perfect for tables, embeds, or custom widgets',
      fields: [
        {
          name: 'html',
          title: 'HTML Code',
          type: 'text',
          rows: 15,
          description: 'Paste your HTML table or embed code here. It will render exactly as written on the blog.',
        },
      ],
      preview: {
        select: {
          html: 'html',
        },
        prepare({ html }: { html?: string }) {
          const snippet = html
            ? html.replace(/<[^>]*>/g, '').substring(0, 80) + '...'
            : 'Empty HTML embed'
          const isTable = html?.includes('<table')
          return {
            title: isTable ? '📊 HTML Table' : '🧩 HTML Embed',
            subtitle: snippet,
          }
        },
      },
    }),
  ],
})
