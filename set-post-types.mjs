/**
 * set-post-types.mjs
 *
 * Bulk-sets postType on every Sanity blog post based on slug.
 *
 * Usage (from inside sanity-studio/):
 *   node ../set-post-types.mjs             ← dry run (preview only, no writes)
 *   node ../set-post-types.mjs --apply     ← writes to Sanity
 *
 * Requirements:
 *   npm install @sanity/client dotenv      (if not already installed)
 *
 * The script reads SANITY_PROJECT_ID and SANITY_TOKEN from a .env file
 * in the same folder, OR you can hard-code them in the CONFIG block below.
 */

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// ─── CONFIG ────────────────────────────────────────────────────────────────────
// Fill these in if you don't have a .env file:
const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'YOUR_PROJECT_ID'
const DATASET    = process.env.SANITY_DATASET     || 'production'
const TOKEN      = process.env.SANITY_TOKEN       || 'YOUR_WRITE_TOKEN'
//
// Get your write token from:
// https://www.sanity.io/manage → your project → API → Tokens → Add API token (Editor)
// ───────────────────────────────────────────────────────────────────────────────

const DRY_RUN = !process.argv.includes('--apply')

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  token:     TOKEN,
  apiVersion: '2024-01-01',
  useCdn:    false,
})

// ─── POST TYPE VALUES ─────────────────────────────────────────────────────────
// Maps to the `value` strings in your post.ts postType field:
//   destination-guide | itinerary | best-of | things-to-do
//   planning-tips | travel-style | cruises | crete

function getPostType(slug) {
  const s = slug.toLowerCase().trim()

  // ── Insights (skip — not blog posts) ───────────────────────────────────────
  if (s.startsWith('greece-tourism-statistics') || s === 'santorini-cruise-caps') {
    return null // leave unset
  }

  // ── Best Of & Comparisons ──────────────────────────────────────────────────
  const bestOfSlugs = new Set([
    'best-greek-island-tours',
    'best-hotels-in-the-greek-islands',
    'best-greece-vacation-spots',
    'best-cities-to-visit-in-greece',
    'best-beaches-in-greece',
    'best-places-to-visit-in-greece',
    'best-unknown-and-small-greek-islands',
    'best-greek-islands-near-athens',
    'best-historical-places-to-visit-in-greece',
    'best-places-to-visit-in-greece-for-young-adults',
    'best-places-to-visit-in-greece-by-month',
    'best-places-to-visit-in-greece-with-family',
    'best-greek-islands-for-solo-travel',
    'best-places-to-visit-in-greece-for-first-timers',
    'best-greek-islands-to-visit-for-the-first-time',
    'best-greek-islands-to-visit',
    'which-greek-island-has-the-best-beaches',
    'best-greek-islands-for-beaches',
    'best-greek-islands-for-beaches-and-food',
    'best-greek-islands-for-beaches-and-nightlife',
    'best-greek-islands-for-history-and-beaches',
    'best-greek-islands-for-couples',
    'best-greek-islands-for-families',
    'santorini-vs-mykonos',
    'mykonos-vs-santorini-vs-crete',
    'paros-vs-mykonos',
    'crete-vs-mykonos',
    'corfu-vs-crete',
    'best-way-to-see-the-greek-islands',
  ])
  if (bestOfSlugs.has(s)) return 'best-of'
  if (s.includes('-vs-'))  return 'best-of'
  if (
    (s.startsWith('best-greek-islands') || s.startsWith('best-places-to-visit-in-greece')) &&
    !s.startsWith('best-hotels-in-') &&
    !s.startsWith('best-restaurants-in-')
  ) return 'best-of'

  // ── Cruises & Island Hopping ───────────────────────────────────────────────
  const cruiseSlugs = new Set([
    'greece-cruise-guide-2026',
    'italy-and-greece-cruise',
    'greece-and-croatia-cruise',
    'greece-and-turkey-cruise',
    'best-greek-islands-cruise-guide',
    'greece-sailing-vacation',
  ])
  if (cruiseSlugs.has(s))              return 'cruises'
  if (s.includes('cruise'))            return 'cruises'
  if (s.includes('island-hopping'))    return 'cruises'
  if (s === 'greece-sailing-vacation') return 'cruises'

  // ── Planning & Tips ────────────────────────────────────────────────────────
  const planningTipsSlugs = new Set([
    'flights-to-greece-from-usa',
    'how-to-travel-to-greece-from-the-usa',
    'greece-travel-requirements-for-us-citizens',
    'greece-travel-insurance',
    'is-greece-safe-to-travel-to',
    'is-greece-expensive',
    'greece-vacation-packages',
    'greece-vacation-outfits',
    'how-much-does-a-trip-to-greece-cost',
    'best-time-to-travel-to-greece',
    'greece-weather-by-month',
    'visiting-greece-in-winter',
  ])
  if (planningTipsSlugs.has(s)) return 'planning-tips'

  // ── Itineraries ────────────────────────────────────────────────────────────
  const itinerarySlugs = new Set([
    'how-to-plan-a-trip-to-greece',
    'greece-itinerary-7-days',
    'greece-itinerary-10-days',
    '3-days-in-athens',
    '3-days-in-santorini',
    'where-to-go-in-greece-for-first-time',
    'greece-trip-families-couples-groups',
    'italy-and-greece-trip',
    'trip-to-santorini-greece',
    'trip-to-athens-greece',
    'trip-to-crete-greece',
    'trip-to-mykonos-greece',
    'all-inclusive-trip-to-greece',
    'greece-road-trip',
    'best-places-to-visit-in-greece-by-month',
  ])
  if (itinerarySlugs.has(s))     return 'itinerary'
  if (s.match(/greece-itinerary/)) return 'itinerary'
  if (s.match(/^\d+-days-in-/))    return 'itinerary'
  if (s.match(/^trip-to-/))        return 'itinerary'

  // ── Travel by Style ────────────────────────────────────────────────────────
  const travelStyleSlugs = new Set([
    'luxury-trip-to-greece',
    'solo-trip-to-greece',
    'girls-trip-to-greece',
  ])
  if (travelStyleSlugs.has(s)) return 'travel-style'

  // ── Crete In Depth ─────────────────────────────────────────────────────────
  const creteKeywords = [
    'heraklion', 'chania', 'rethymno', 'agios-nikolaos', 'elounda',
    'sitia', 'ierapetra', 'paleochora', 'loutro', 'matala',
    'samaria-gorge', 'balos-beach', 'elafonissi-beach',
  ]
  if (creteKeywords.some(k => s.includes(k))) return 'crete'
  if (s.startsWith('crete-') || s.includes('-crete-') || s === 'crete-travel-guide') return 'crete'

  // ── Things To Do, Tours & Local ────────────────────────────────────────────
  if (s.startsWith('things-to-do-in-'))     return 'things-to-do'
  if (s.startsWith('best-hotels-in-') && !s.includes('greek-islands')) return 'things-to-do'
  if (s.startsWith('best-restaurants-in-')) return 'things-to-do'
  if (s.startsWith('where-to-stay-in-'))    return 'things-to-do'
  if (s.endsWith('-tours') && !s.startsWith('best-')) return 'things-to-do'

  // ── Destination Guide (Islands) ────────────────────────────────────────────
  const islandKeywords = [
    'santorini','mykonos','naxos','paros','milos','ios','rhodes','kos',
    'corfu','zakynthos','kefalonia','skopelos','skiathos','hydra','aegina',
    'folegandros','sifnos','tinos','serifos','andros','amorgos','antiparos',
    'syros','patmos','symi','karpathos','leros','kalymnos','astypalea',
    'lefkada','ithaca','paxos','lesbos','samos','chios','ikaria','thasos',
    'samothrace','lemnos','alonissos','skyros','koufonisia','iraklia',
    'schinoussa','donoussa','sikinos','anafi','kea','kythnos','kimolos',
    'kastellorizo','tilos','nisyros','lipsi','chalki','agathonisi','poros',
    'spetses','agistri','kythira','gavdos','elafonisos','thirassia',
  ]
  if (islandKeywords.some(k => s.includes(k))) return 'destination-guide'

  // ── Destination Guide (Mainland) ───────────────────────────────────────────
  const mainlandKeywords = [
    'athens','thessaloniki','meteora','delphi','nafplio','olympia','sparta',
    'mystras','monemvasia','epidaurus','mycenae','ancient-corinth','gytheio',
    'pylos','parga','halkidiki','pelion','kalamata','mani-peninsula',
    'kardamyli','cape-sounion','zagori','vikos-gorge','ioannina','metsovo',
    'mount-olympus','kastoria','vergina','pella','kavala','prespa',
    'lake-kerkini','edessa','naousa','arachova','hosios-loukas','thermopylae',
    'volos','lake-plastira','kalavryta','galaxidi','preveza','syvota',
    'dimitsana','stemnitsa','methoni','koroni','vathia','limeni','areopoli',
    'ancient-messene','nemea','litochoro','makrinitsa','portaria','tsagarada',
  ]
  if (mainlandKeywords.some(k => s.includes(k))) return 'destination-guide'

  return null // couldn't determine — leave unset
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n${'─'.repeat(60)}`)
  console.log(DRY_RUN
    ? '🔍  DRY RUN — no changes will be written to Sanity'
    : '✍️   APPLY MODE — patching posts in Sanity')
  console.log('─'.repeat(60))

  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current)]{ _id, title, slug, postType }`
  )

  console.log(`\nFetched ${posts.length} posts\n`)

  const results = { updated: 0, skipped: 0, unmatched: 0, errors: 0 }
  const unmatched = []

  for (const post of posts) {
    const slug     = post.slug?.current ?? ''
    const newType  = getPostType(slug)
    const oldType  = post.postType ?? '(none)'

    if (!newType) {
      console.log(`  ⚠️  UNMATCHED  ${slug}`)
      unmatched.push(slug)
      results.unmatched++
      continue
    }

    if (newType === post.postType) {
      console.log(`  ✅ SKIP       ${slug}  →  ${newType}`)
      results.skipped++
      continue
    }

    console.log(`  ${DRY_RUN ? '📝 WOULD SET' : '🔄 UPDATING'}  ${slug}`)
    console.log(`               ${oldType}  →  ${newType}`)

    if (!DRY_RUN) {
      try {
        await client.patch(post._id).set({ postType: newType }).commit()
        results.updated++
      } catch (err) {
        console.error(`  ❌ ERROR on ${slug}:`, err.message)
        results.errors++
      }
    } else {
      results.updated++
    }
  }

  // Summary
  console.log(`\n${'─'.repeat(60)}`)
  console.log('SUMMARY')
  console.log('─'.repeat(60))
  console.log(`  ${DRY_RUN ? 'Would update' : 'Updated'}  : ${results.updated}`)
  console.log(`  Already set  : ${results.skipped}`)
  console.log(`  Unmatched    : ${results.unmatched}`)
  if (results.errors) console.log(`  Errors       : ${results.errors}`)

  if (unmatched.length) {
    console.log(`\nUnmatched slugs (set manually in Studio):`)
    unmatched.forEach(s => console.log(`  - ${s}`))
  }

  if (DRY_RUN) {
    console.log(`\n👆 This was a dry run. Run with --apply to write changes:\n`)
    console.log(`   node set-post-types.mjs --apply\n`)
  } else {
    console.log(`\n✅ Done! Refresh your Sanity Studio to see the changes.\n`)
  }
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
