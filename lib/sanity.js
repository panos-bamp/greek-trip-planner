import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: 'puhk8qa7', // Replace with your actual project ID
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Helper for image URLs
const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}