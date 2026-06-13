import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

type WebhookPayload = {
  _type: string
  slug?: string
}

export async function POST(req: NextRequest) {
  try {
    // Read the raw body as text — the signature is computed over this exact string,
    // so we must NOT parse it before verifying.
    const signature = req.headers.get(SIGNATURE_HEADER_NAME) || ''
    const bodyText = await req.text()

    const valid = await isValidSignature(
      bodyText,
      signature,
      process.env.SANITY_REVALIDATE_SECRET as string
    )

    if (!valid) {
      return new Response('Invalid signature', { status: 401 })
    }

    const body = JSON.parse(bodyText) as WebhookPayload

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
