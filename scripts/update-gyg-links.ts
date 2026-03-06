import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: 'puhk8qa7',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const PARTNER_ID = 'YBDA3YO'
const UTM_MEDIUM = 'online_publisher'

const DRY_RUN = false // 👈 Set to false when ready to actually save

function addAffiliateParams(url: string): string {
  if (!url.includes('getyourguide.com')) return url

  // Strip any existing partner_id or utm_medium to avoid duplicates
  const baseUrl = url
    .replace(/[?&]partner_id=[^&]*/g, '')
    .replace(/[?&]utm_medium=[^&]*/g, '')
    .replace(/\?&/, '?')
    .replace(/[?&]$/, '')

  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}partner_id=${PARTNER_ID}&utm_medium=${UTM_MEDIUM}`
}

function patchBlocks(blocks: any[]): { changed: boolean; blocks: any[] } {
  let changed = false

  const patched = blocks.map((block) => {
    if (block._type !== 'block') return block

    const newMarkDefs = (block.markDefs || []).map((mark: any) => {
      if (mark._type === 'link' && mark.href?.includes('getyourguide.com')) {
        const newHref = addAffiliateParams(mark.href)
        if (newHref !== mark.href) {
          changed = true
          console.log(`    OLD: ${mark.href}`)
          console.log(`    NEW: ${newHref}`)
          return { ...mark, href: newHref }
        } else {
          console.log(`    ✅ Already has affiliate params: ${mark.href}`)
        }
      }
      return mark
    })

    return { ...block, markDefs: newMarkDefs }
  })

  return { changed, blocks: patched }
}

async function run() {
  console.log(`\n🚀 Starting GYG affiliate link updater...`)
  console.log(`   Mode: ${DRY_RUN ? '🔍 DRY RUN (no changes saved)' : '✍️  LIVE (changes will be saved)'}`)
  console.log(`   Partner ID: ${PARTNER_ID}`)
  console.log(`   UTM Medium: ${UTM_MEDIUM}\n`)

  // Fetch ALL posts with a body - filter in JS (more reliable than GROQ text search)
  const posts = await client.fetch(`
    *[_type == "post" && defined(body)] {
      _id,
      title,
      body
    }
  `)

  console.log(`📦 Total posts fetched: ${posts.length}`)

  // Filter to only posts that contain getyourguide links
  const postsWithGYG = posts.filter((post: any) =>
    JSON.stringify(post.body || []).includes('getyourguide.com')
  )

  console.log(`🔗 Posts containing GetYourGuide links: ${postsWithGYG.length}\n`)

  let updatedCount = 0
  let skippedCount = 0

  for (const post of postsWithGYG) {
    if (!post.body) continue

    console.log(`📝 Processing: "${post.title}"`)
    const { changed, blocks } = patchBlocks(post.body)

    if (changed) {
      if (!DRY_RUN) {
        await client.patch(post._id).set({ body: blocks }).commit()
        console.log(`   ✅ Saved!\n`)
      } else {
        console.log(`   ⚠️  DRY RUN — not saved\n`)
      }
      updatedCount++
    } else {
      console.log(`   ⏭️  No changes needed (already up to date)\n`)
      skippedCount++
    }
  }

  console.log(`\n${'─'.repeat(50)}`)
  console.log(`🎉 ${DRY_RUN ? '[DRY RUN] ' : ''}Complete!`)
  console.log(`   Posts updated: ${updatedCount}`)
  console.log(`   Posts skipped (already correct): ${skippedCount}`)
  if (DRY_RUN) {
    console.log(`\n👉 To commit changes, set DRY_RUN = false and run again.`)
  }
}

run().catch(console.error)
