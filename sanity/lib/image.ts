import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

// Initialize the image URL builder
const builder = imageUrlBuilder(client)

// Helper function to generate image URLs (like the working example)
export function urlFor(source: any) {
  return builder.image(source)
}
