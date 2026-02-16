'use client'

import { PortableText } from '@portabletext/react'
import { portableTextComponents } from './portableTextComponents'

export function InsightBody({ body }: { body: any }) {
  if (!body) return null
  return <PortableText value={body} components={portableTextComponents} />
}
