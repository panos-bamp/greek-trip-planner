import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from '@sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: string
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Bad request', { status: 400 })
    }

    // Always refresh the list pages
    revalidatePath('/blog')
    revalidatePath('/insights')

    // Refresh the specific post that changed
    if (body.slug) {
      revalidatePath(`/blog/${body.slug}`)
      revalidatePath(`/insights/${body.slug}`)
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug,
      now: Date.now(),
    })
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
