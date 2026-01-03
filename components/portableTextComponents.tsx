import { PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';

/**
 * GetYourGuide-inspired Typography Components for Sanity Portable Text
 * 
 * Based on exact specs from GetYourGuide blog CSS:
 * - Font: Space Grotesk (fallback from GT Eesti Pro Display)
 * - H2: 38px (2.375rem), line-height 1.1
 * - H3: 28px (1.75rem), line-height 1.2
 * - H4: 20px (1.25rem), line-height 1.2
 * - Body: 18px (1.125rem), line-height 1.5 (increased from 1.2 for readability)
 * - Container: max-width 70rem (1120px)
 * - Spacing: H2/H3 margin-top 3rem, margin-bottom 1rem
 */

export const portableTextComponents: PortableTextComponents = {
  block: {
    // H1 - Main title (rarely used in blog body)
    h1: ({ children }) => (
      <h1 className="text-[3.125rem] font-bold text-primary mt-0 mb-6 leading-[1]">
        {children}
      </h1>
    ),

    // H2 - Section headings (GetYourGuide: 38px, line-height 1.1)
    h2: ({ children }) => (
      <h2 className="text-[2.375rem] font-bold text-primary mt-12 mb-4 leading-[1.1]">
        {children}
      </h2>
    ),

    // H3 - Subsection headings (GetYourGuide: 28px, line-height 1.2)
    h3: ({ children }) => (
      <h3 className="text-[1.75rem] font-bold text-primary mt-12 mb-4 leading-[1.2]">
        {children}
      </h3>
    ),

    // H4 - Subheadings (GetYourGuide: 20px, line-height 1.2)
    h4: ({ children }) => (
      <h4 className="text-[1.25rem] font-bold text-primary mt-6 mb-4 leading-[1.2]">
        {children}
      </h4>
    ),

    // H5 (GetYourGuide: 18px)
    h5: ({ children }) => (
      <h5 className="text-[1.125rem] font-semibold text-primary mt-6 mb-3 leading-[1.2]">
        {children}
      </h5>
    ),

    // H6 (GetYourGuide: 16px)
    h6: ({ children }) => (
      <h6 className="text-base font-semibold text-primary mt-6 mb-3 leading-[1.5]">
        {children}
      </h6>
    ),

    // Normal paragraph (GetYourGuide: 18px, line-height 1.2, but we use 1.5 for readability)
    normal: ({ children }) => (
      <p className="text-lg text-gray-700 mb-4 leading-[1.5]">
        {children}
      </p>
    ),

    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent-pink bg-gray-50 pl-6 pr-4 py-4 my-6 italic text-lg text-gray-700">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Bullet list (GetYourGuide: margin-bottom 1.5rem)
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-6 space-y-3 text-lg text-gray-700">
        {children}
      </ul>
    ),

    // Numbered list
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-6 space-y-3 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },

  listItem: {
    // List items (GetYourGuide: 18px)
    bullet: ({ children }) => (
      <li className="pl-2 text-lg leading-[1.5]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2 text-lg leading-[1.5]">{children}</li>
    ),
  },

  marks: {
    // Strong/Bold
    strong: ({ children }) => (
      <strong className="font-bold text-primary">{children}</strong>
    ),

    // Emphasis/Italic
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),

    // Underline
    underline: ({ children }) => (
      <span className="underline">{children}</span>
    ),

    // Strike-through
    'strike-through': ({ children }) => (
      <span className="line-through">{children}</span>
    ),

    // Code
    code: ({ children }) => (
      <code className="bg-gray-100 text-accent-pink px-2 py-1 rounded text-base font-mono">
        {children}
      </code>
    ),

    // Link
    link: ({ children, value }) => {
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      const target = value?.blank ? '_blank' : undefined;
      
      return (
        <a 
          href={value?.href} 
          rel={rel}
          target={target}
          className="text-accent-blue underline hover:text-primary transition-colors"
        >
          {children}
        </a>
      );
    },

    // Highlight colors
    highlight: ({ children, value }) => {
      const colors: { [key: string]: string } = {
        yellow: 'bg-yellow-200',
        green: 'bg-green-200',
        blue: 'bg-blue-200',
        pink: 'bg-pink-200',
      };
      
      const colorClass = colors[value?.color] || 'bg-yellow-200';
      
      return (
        <span className={`${colorClass} px-1`}>
          {children}
        </span>
      );
    },
  },

  types: {
    // Image handling
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-8">
          <div className="relative w-full h-auto">
            <Image
              src={value.url || ''}
              alt={value.alt || 'Blog image'}
              width={1120} // GetYourGuide container width
              height={630}
              className="rounded-lg w-full h-auto"
              priority={false}
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    // Callout boxes
    callout: ({ value }) => {
      const types: { [key: string]: { bg: string; border: string; icon: string } } = {
        info: {
          bg: 'bg-blue-50',
          border: 'border-blue-400',
          icon: 'ℹ️',
        },
        warning: {
          bg: 'bg-yellow-50',
          border: 'border-yellow-400',
          icon: '⚠️',
        },
        tip: {
          bg: 'bg-green-50',
          border: 'border-green-400',
          icon: '💡',
        },
        note: {
          bg: 'bg-purple-50',
          border: 'border-purple-400',
          icon: '📝',
        },
      };

      const type = types[value?.type] || types.info;

      return (
        <div className={`${type.bg} border-l-4 ${type.border} p-6 my-6 rounded-r-lg`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl">{type.icon}</span>
            <div className="flex-1 text-lg text-gray-700">
              {value?.text}
            </div>
          </div>
        </div>
      );
    },
  },
};
