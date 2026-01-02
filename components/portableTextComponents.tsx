import { PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity'

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings
    h1: ({children}) => (
      <h1 className="text-5xl font-black text-primary mt-16 mb-6 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="text-4xl font-black text-primary mt-12 mb-6 leading-tight" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-3xl font-bold text-primary mt-10 mb-4" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
        {children}
      </h3>
    ),
    h4: ({children}) => (
      <h4 className="text-2xl font-bold text-primary mt-8 mb-3">
        {children}
      </h4>
    ),
    
    // Paragraph
    normal: ({children}) => (
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
    
    // Blockquote
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-accent-pink pl-6 py-2 my-8 italic text-xl text-gray-600 bg-gray-50 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Bullet list
    bullet: ({children}) => (
      <ul className="list-disc list-outside ml-6 my-6 space-y-3">
        {children}
      </ul>
    ),
    // Numbered list
    number: ({children}) => (
      <ol className="list-decimal list-outside ml-6 my-6 space-y-3">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({children}) => (
      <li className="text-lg text-gray-700 leading-relaxed pl-2">
        {children}
      </li>
    ),
    number: ({children}) => (
      <li className="text-lg text-gray-700 leading-relaxed pl-2">
        {children}
      </li>
    ),
  },

  marks: {
    // Strong (bold)
    strong: ({children}) => (
      <strong className="font-bold text-primary">
        {children}
      </strong>
    ),
    
    // Emphasis (italic)
    em: ({children}) => (
      <em className="italic text-gray-800">
        {children}
      </em>
    ),
    
    // Code
    code: ({children}) => (
      <code className="bg-gray-100 text-accent-blue px-2 py-1 rounded font-mono text-sm">
        {children}
      </code>
    ),
    
    // Underline
    underline: ({children}) => (
      <span className="underline decoration-primary decoration-2">
        {children}
      </span>
    ),
    
    // Strike-through
    'strike-through': ({children}) => (
      <span className="line-through text-gray-500">
        {children}
      </span>
    ),
    
    // Links
    link: ({value, children}) => {
      const target = value?.blank ? '_blank' : undefined
      const rel = value?.blank ? 'noopener noreferrer' : undefined
      
      return (
        <a 
          href={value?.href} 
          target={target}
          rel={rel}
          className="text-accent-blue underline font-semibold hover:text-primary transition-colors"
        >
          {children}
        </a>
      )
    },
    
    // Highlight
    highlight: ({value, children}) => {
      const colors = {
        yellow: 'bg-yellow-200',
        green: 'bg-green-200',
        blue: 'bg-blue-200',
        pink: 'bg-pink-200',
      }
      
      const colorClass = colors[value?.color as keyof typeof colors] || 'bg-yellow-200'
      
      return (
        <span className={`${colorClass} px-1 py-0.5 rounded`}>
          {children}
        </span>
      )
    },
  },

  types: {
    // Images
    image: ({value}) => {
      if (!value?.asset) return null
      
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).url()}
            alt={value.alt || 'Blog post image'}
            className="w-full rounded-2xl shadow-lg"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    
    // Callout boxes
    callout: ({value}) => {
      const types = {
        info: {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          text: 'text-blue-900',
          icon: 'ℹ️'
        },
        warning: {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          text: 'text-yellow-900',
          icon: '⚠️'
        },
        tip: {
          bg: 'bg-green-50',
          border: 'border-green-300',
          text: 'text-green-900',
          icon: '💡'
        },
        note: {
          bg: 'bg-purple-50',
          border: 'border-purple-300',
          text: 'text-purple-900',
          icon: '📝'
        },
      }
      
      const style = types[value?.type as keyof typeof types] || types.info
      
      return (
        <div className={`${style.bg} ${style.border} border-l-4 p-6 my-8 rounded-r-lg`}>
          <div className="flex items-start space-x-3">
            <span className="text-2xl flex-shrink-0">{style.icon}</span>
            <p className={`${style.text} text-base leading-relaxed`}>
              {value?.content}
            </p>
          </div>
        </div>
      )
    },
  },
}
