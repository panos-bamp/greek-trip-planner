// ────────────────────────────────────────────────────────────────────────────
// SANITY SCHEMA UPDATE — blockContent.ts
// Add caption, attribution, license, and wikiUrl fields to the image type.
// Required for Wikimedia CC license compliance and structured captions.
//
// Location: c:\ai-greek-trip-planner\sanity-studio\schemaTypes\blockContent.ts
// ────────────────────────────────────────────────────────────────────────────

import {defineType, defineArrayMember} from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal',     value: 'normal'},
        {title: 'H1',         value: 'h1'},
        {title: 'H2',         value: 'h2'},
        {title: 'H3',         value: 'h3'},
        {title: 'H4',         value: 'h4'},
        {title: 'Quote',      value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet',   value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code',   value: 'code'},
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
                  Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
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

    // ── Image type — UPDATED with attribution fields ──────────────────────
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Describe the image for screen readers and SEO',
          validation: (Rule) => Rule.required().warning('Alt text is required for accessibility'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Short engaging caption displayed below the image',
        },
        {
          // ── NEW ──────────────────────────────────────────────────────────
          name: 'attribution',
          type: 'string',
          title: 'Photo Attribution',
          description: 'Photographer or author name (required for CC-licensed images)',
        },
        {
          // ── NEW ──────────────────────────────────────────────────────────
          name: 'license',
          type: 'string',
          title: 'License',
          description: 'e.g. CC BY-SA 4.0, CC BY 2.0, Public Domain',
          options: {
            list: [
              {title: 'CC BY-SA 4.0', value: 'CC BY-SA 4.0'},
              {title: 'CC BY 4.0',    value: 'CC BY 4.0'},
              {title: 'CC BY-SA 3.0', value: 'CC BY-SA 3.0'},
              {title: 'CC BY 3.0',    value: 'CC BY 3.0'},
              {title: 'CC BY-SA 2.0', value: 'CC BY-SA 2.0'},
              {title: 'CC BY 2.0',    value: 'CC BY 2.0'},
              {title: 'Public Domain', value: 'Public Domain'},
            ],
          },
        },
        {
          // ── NEW ──────────────────────────────────────────────────────────
          name: 'wikiUrl',
          type: 'url',
          title: 'Wikimedia Source URL',
          description: 'Link to the original Wikimedia Commons file page',
          validation: (Rule) =>
            Rule.uri({ scheme: ['http', 'https'] }).warning(),
        },
      ],
    }),
  ],
})
