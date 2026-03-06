import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Greek Trip Planner',
  description: 'Get in touch with Panos and the Greek Trip Planner team. Questions about your itinerary, partnership enquiries, or just want to say hello.',
  openGraph: {
    title: 'Contact | Greek Trip Planner',
    description: 'Get in touch with the Greek Trip Planner team.',
    url: 'https://greektriplanner.me/contact',
    siteName: 'Greek Trip Planner',
    type: 'website',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
