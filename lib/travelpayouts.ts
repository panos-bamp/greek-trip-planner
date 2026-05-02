/**
 * TravelPayouts Partner Links API wrapper.
 *
 * Converts raw brand URLs (Booking.com, GetYourGuide, etc.) into tracked
 * affiliate short links via the TravelPayouts API.
 *
 * Docs: https://support.travelpayouts.com/hc/en-us/articles/25289759198226
 *
 * Limits:
 *   - 100 requests/minute per marker
 *   - Max 10 links per request
 *   - Brand must be connected in your TravelPayouts account
 *   - Use full-length URLs (not short brand links)
 *
 * Required env vars:
 *   TP_API_TOKEN  — Profile → API token
 *   TP_MARKER     — Your marker ID (numeric)
 *   TP_TRS        — Your TRS ID (numeric)
 */

const TP_ENDPOINT = 'https://api.travelpayouts.com/links/v1/create'
const REQUEST_TIMEOUT_MS = 5000
const MAX_LINKS_PER_REQUEST = 10

interface TPLinkRequest {
  url: string
  sub_id?: string
}

interface TPApiResponse {
  result?: {
    trs?: number
    marker?: number
    shorten?: boolean
    links?: Array<{
      url?: string         // original URL submitted
      code?: string        // "success" | "failed"
      message?: string     // present on failure (e.g. "trs is not subscribed for brand")
      partner_url?: string // the tracked affiliate URL we want
    }>
  }
  code?: string            // "success" at top level
  status?: number          // 200 on success
  error?: string
}

/**
 * Convert raw brand URLs to TravelPayouts-tracked affiliate URLs.
 *
 * Returns a Map keyed by the ORIGINAL URL → TRACKED URL. Falls back to
 * the original URL on any failure (network, timeout, missing env, etc.)
 * so the caller never breaks — affiliate revenue gracefully degrades.
 *
 * @param rawUrls   Array of full-length brand URLs to wrap
 * @param subId     Optional sub_id for tracking sub-campaigns
 * @returns Map<rawUrl, trackedUrl>
 *
 * @example
 *   const map = await getAffiliateLinks([
 *     'https://www.booking.com/hotel/gr/niche-hotel-athens.html',
 *     'https://www.getyourguide.com/loucha-l180291/...'
 *   ], 'itinerary-abc123')
 *
 *   const tracked = map.get(rawUrl) ?? rawUrl  // safe fallback
 */
export async function getAffiliateLinks(
  rawUrls: string[],
  subId?: string
): Promise<Map<string, string>> {
  const result = new Map<string, string>()

  // Initialize result with identity mapping (raw → raw) as the safe fallback
  rawUrls.forEach((url) => result.set(url, url))

  // Validate env vars
  const token = process.env.TP_API_TOKEN
  const marker = process.env.TP_MARKER
  const trs = process.env.TP_TRS

  if (!token || !marker || !trs) {
    console.warn('[travelpayouts] Missing TP_API_TOKEN/TP_MARKER/TP_TRS env vars — using raw URLs')
    return result
  }

  if (rawUrls.length === 0) return result

  // Deduplicate URLs (no point asking for the same URL twice)
  const uniqueUrls = Array.from(new Set(rawUrls.filter((u) => typeof u === 'string' && u.startsWith('http'))))

  // Batch into chunks of 10 (API limit)
  const batches: string[][] = []
  for (let i = 0; i < uniqueUrls.length; i += MAX_LINKS_PER_REQUEST) {
    batches.push(uniqueUrls.slice(i, i + MAX_LINKS_PER_REQUEST))
  }

  // Process all batches in parallel
  await Promise.all(
    batches.map(async (batch) => {
      try {
        const tracked = await callTpApi(batch, token, Number(marker), Number(trs), subId)
        // Merge results into the master map
        tracked.forEach((trackedUrl, rawUrl) => {
          if (trackedUrl) result.set(rawUrl, trackedUrl)
        })
      } catch (err) {
        // On batch failure, keep the raw URL fallback that was set above
        console.error('[travelpayouts] Batch failed, using raw URLs:', err instanceof Error ? err.message : err)
      }
    })
  )

  return result
}

/**
 * Single batch call to the TravelPayouts API. Internal use only.
 */
async function callTpApi(
  urls: string[],
  token: string,
  marker: number,
  trs: number,
  subId?: string
): Promise<Map<string, string>> {
  const result = new Map<string, string>()

  const body = {
    trs,
    marker,
    shorten: true,
    links: urls.map<TPLinkRequest>((url) => ({
      url,
      ...(subId ? { sub_id: subId } : {}),
    })),
  }

  // AbortController for timeout
  const ctrl = new AbortController()
  const timeoutId = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS)

  let response: Response
  try {
    response = await fetch(TP_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token,
      },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
  } finally {
    clearTimeout(timeoutId)
  }

  if (!response.ok) {
    throw new Error(`TP API HTTP ${response.status}: ${await response.text().catch(() => 'unknown')}`)
  }

  const data = (await response.json()) as TPApiResponse

  if (data.error) {
    throw new Error(`TP API error: ${data.error}`)
  }

  // Map response back to original URLs.
  // TP returns per-link results — each link can independently succeed or fail.
  // On failure, code: "failed" with a message field; we keep the raw URL fallback
  // (already set by the caller) and log the reason.
  const linkResults = data.result?.links
  if (Array.isArray(linkResults)) {
    linkResults.forEach((linkResult, i) => {
      const originalUrl = urls[i]
      if (linkResult?.code === 'success' && linkResult.partner_url) {
        result.set(originalUrl, linkResult.partner_url)
      } else if (linkResult?.code === 'failed') {
        // Common causes: brand not connected to your TP account, invalid URL,
        // or brand not in TP's link-creation allowlist (Kiwi.com, Expedia UK, etc.)
        console.warn(
          `[travelpayouts] Link conversion failed for ${originalUrl}: ${linkResult.message || 'unknown reason'}`
        )
      }
    })
  }

  return result
}

/**
 * Convenience wrapper for a single URL. Returns the tracked URL or the original
 * URL if anything fails. Useful for one-off conversions.
 */
export async function getAffiliateLink(rawUrl: string, subId?: string): Promise<string> {
  if (!rawUrl) return rawUrl
  const map = await getAffiliateLinks([rawUrl], subId)
  return map.get(rawUrl) ?? rawUrl
}
