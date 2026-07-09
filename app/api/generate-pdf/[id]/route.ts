import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

/**
 * /api/generate-pdf/[id] — Generate a PDF for an itinerary.
 *
 * Flow:
 *   1. Validate the itinerary exists in Supabase
 *   2. Launch headless Chromium (via @sparticuz/chromium on Vercel, or
 *      local Chrome in dev)
 *   3. Navigate to /results/[id]/pdf — the print-optimized page
 *   4. Wait for the ready signal ([data-pdf-ready="true"] appears)
 *   5. Emit A4 PDF, return as a downloadable file
 *
 * Vercel Pro tier gives us 60s function timeout — comfortable for
 * cold-start Chromium boots (~10s) + typical PDF render (~3-5s).
 *
 * NOTE: This route uses puppeteer-core (bring-your-own browser).
 * In production, @sparticuz/chromium provides the browser binary.
 * In local dev, we use the developer's local Chrome install.
 */

export const maxDuration = 60         // Vercel Pro allows up to 60s
export const dynamic = 'force-dynamic' // never cache PDF responses
export const runtime = 'nodejs'        // must run in Node runtime (not edge) — Puppeteer needs full Node APIs

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> | { id: string } }
) {
  // Next.js 15 makes params a Promise; Next.js 14 keeps it as an object.
  // This works transparently on both — `await` on a plain object just returns it.
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams

  if (!id || typeof id !== 'string' || id.length > 32) {
    return NextResponse.json({ error: 'Invalid itinerary ID' }, { status: 400 })
  }

  // Step 1: verify the itinerary exists (also fetches firstName for the filename)
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  let firstName: string | null = null
  let duration: string | null = null
  try {
    const { data, error } = await supabaseAdmin
      .from('itineraries')
      .select('first_name, answers_json')
      .eq('id', id)
      .maybeSingle()
    if (error) {
      console.error('[pdf] Supabase error:', error.message)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }
    if (!data) {
      return NextResponse.json({ error: 'Itinerary not found' }, { status: 404 })
    }
    firstName = data.first_name || null
    duration = (data.answers_json as any)?.duration || null
  } catch (err) {
    console.error('[pdf] Fetch exception:', err)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  // Step 2 — launch Chromium
  //
  // Dynamic imports so the puppeteer bundle doesn't ship to the client.
  // On Vercel (production), we use @sparticuz/chromium — a serverless-tuned
  // Chromium binary that fits in the function bundle.
  // In local dev, we fall back to whatever Chrome is installed on the
  // developer's machine (using puppeteer's local channel resolution).
  let browser: any = null
  try {
    const isProduction =
      process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const puppeteer = await import('puppeteer-core')

    if (isProduction) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const chromium = (await import('@sparticuz/chromium')).default
      // Recommended settings — see @sparticuz/chromium README
      chromium.setHeadlessMode = true
      chromium.setGraphicsMode = false

      // Get the executable path FIRST (this triggers extraction of the tar
      // to /tmp/chromium and unpacks all the shared libraries alongside it).
      const executablePath = await chromium.executablePath()

      // CRITICAL: Tell the Linux dynamic linker where to find libnss3.so
      // and other shared libraries. Without this env var, Chromium fails
      // to launch with "error while loading shared libraries: libnss3.so".
      // See: https://github.com/Sparticuz/chromium/issues/254
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const path = await import('path')
      const execDir = path.dirname(executablePath)
      process.env.LD_LIBRARY_PATH = execDir + (process.env.LD_LIBRARY_PATH
        ? ':' + process.env.LD_LIBRARY_PATH
        : '')

      browser = await puppeteer.launch({
        args: [
          ...chromium.args,
          '--no-sandbox',
          '--disable-setuid-sandbox',
        ],
        defaultViewport: chromium.defaultViewport,
        executablePath,
        headless: chromium.headless,
        // Ignore certificate errors on internal Vercel routing
        // Cast: puppeteer-core types don't always include this legacy option
        ignoreHTTPSErrors: true,
      } as any)
    } else {
      // Local dev: try common Chrome paths.
      // Adjust CHROME_EXECUTABLE_PATH env var if none match.
      const localPath =
        process.env.CHROME_EXECUTABLE_PATH ||
        (process.platform === 'darwin'
          ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
          : process.platform === 'win32'
            ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
            : '/usr/bin/google-chrome')
      browser = await puppeteer.launch({
        headless: true,
        executablePath: localPath,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    }

    const page = await browser.newPage()

    // Build the print-page URL — same origin as the request
    const origin = getOrigin(request)
    const printUrl = `${origin}/results/${encodeURIComponent(id)}/pdf`

    // Navigate & wait until the page signals it's rendered
    await page.goto(printUrl, {
      waitUntil: 'networkidle0',
      timeout: 30_000,
    })

    // Wait for the print page to hydrate & fetch data
    await page.waitForSelector('[data-pdf-ready="true"]', { timeout: 30_000 })

    // Small settle time for fonts + any last renders
    await new Promise((r) => setTimeout(r, 500))

    // Emit PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true, // respect @page rules from the print page
      margin: { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' },
    })

    await browser.close()
    browser = null

    // Build filename
    const namePart = firstName ? sanitizeForFilename(firstName) : 'traveler'
    const durationPart = duration ? String(duration).replace(/[^\d\-]/g, '') || '' : ''
    const filename = durationPart
      ? `Greek-Trip-${namePart}-${durationPart}day.pdf`
      : `Greek-Trip-${namePart}.pdf`

    return new NextResponse(pdfBuffer as any, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (err) {
    console.error('[pdf] Generation failed:', err)
    if (browser) {
      try { await browser.close() } catch { /* ignore */ }
    }
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json(
      { error: 'PDF generation failed', details: msg },
      { status: 500 }
    )
  }
}

/* ─────────────────────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────────────────────── */

function getOrigin(request: NextRequest): string {
  // Prefer configured public URL if available (guarantees the right host in
  // preview/production envs even if the incoming request came through a proxy)
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (publicUrl) return publicUrl.replace(/\/$/, '')

  // Fall back to the request's own origin
  const proto = request.headers.get('x-forwarded-proto') || 'https'
  const host = request.headers.get('host') || 'localhost:3000'
  return `${proto}://${host}`
}

function sanitizeForFilename(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^A-Za-z0-9\-]/g, '')  // strip everything non-URL-safe
    .slice(0, 40) || 'traveler'
}
