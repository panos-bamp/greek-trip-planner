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

async function diagnose() {

  // 1. What document types exist?
  console.log('\n📋 STEP 1: All document types in your dataset:')
  const types = await client.fetch(`array::unique(*[]._type)`)
  console.log(types)

  // 2. Fetch ALL documents and show sample
  console.log('\n📋 STEP 2: Searching ALL documents...')
  const allDocs = await client.fetch(`*[]{_id, _type, title, slug}`)
  console.log(`Total documents: ${allDocs.length}`)
  console.log('Sample of document types & titles:')
  allDocs.slice(0, 10).forEach((d: any) => {
    console.log(`  [${d._type}] ${d.title || d.slug?.current || d._id}`)
  })

  // 3. Check the first post's full structure
  console.log('\n📋 STEP 3: First post full structure (raw JSON):')
  const firstPost = await client.fetch(`*[_type == "post"][0]`)
  if (firstPost) {
    console.log(JSON.stringify(firstPost, null, 2).slice(0, 3000))
  } else {
    console.log('❌ No documents with _type == "post" found!')
    console.log('👉 Your document type might be named differently (e.g. "article", "blogPost", etc.)')
  }

  // 4. Try to find getyourguide in raw string representation
  console.log('\n📋 STEP 4: Checking raw content of first 5 posts for getyourguide...')
  const posts = await client.fetch(`*[_type == "post"][0...5]`)
  posts.forEach((post: any) => {
    const raw = JSON.stringify(post)
    if (raw.includes('getyourguide')) {
      console.log(`✅ FOUND getyourguide in: "${post.title || post._id}"`)
    } else {
      console.log(`❌ Not found in: "${post.title || post._id}"`)
    }
  })
}

diagnose().catch(console.error)
