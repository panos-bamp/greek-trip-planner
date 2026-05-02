import { useState, useRef } from "react"

const PID = 'puhk8qa7'
const DS  = 'production'
const VER = 'v2021-06-07'
const BASE = `https://${PID}.api.sanity.io/${VER}/data`

// ── helpers ─────────────────────────────────────────────────────────────────

function wc(s){ return (s||'').trim().split(/\s+/).filter(Boolean).length }
function cc(s){ return (s||'').length }
function rk(){ return Math.random().toString(36).slice(2,9) }

function extractSections(body=[]){
  let intro=[], h2Title='', h2Paras=[], h2List=[], found=false
  for(const b of body){
    if(b._type!=='block') continue
    const text=(b.children||[]).map(c=>c.text||'').join('')
    if(!text.trim()) continue
    if(!found){
      if(b.style==='h2'){ found=true; h2Title=text }
      else if(b.style==='normal') intro.push({key:b._key, text})
    } else {
      if(b.style==='h2') break
      if(b.listItem) h2List.push(text)
      else if(b.style==='normal') h2Paras.push(text)
    }
  }
  return { intro, h2Title, h2Paras, h2List }
}

function slugify(text){
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'')
}

function extractHeadings(body=[]){
  return body
    .filter(b=>b._type==='block' && (b.style==='h2'||b.style==='h3'))
    .map(b=>({
      level: b.style,
      text: (b.children||[]).map(c=>c.text||'').join('').trim(),
      anchor: slugify((b.children||[]).map(c=>c.text||'').join('').trim())
    }))
    .filter(h=>h.text)
}

function makeBlock(text){
  return { _type:'block', _key:rk(), style:'normal', markDefs:[],
    children:[{ _type:'span', _key:rk(), text, marks:[] }] }
}

function generateTableHTML(slug, title, desc, headers, rows){
  const p = 'gtp-' + (slug||'t').replace(/[^a-z0-9]/g,'-').slice(0,12)
  return `<!-- greektriplanner.me — ${title} -->
<!-- Design: DM Serif Display + DM Sans, #2C73FF, #FF5635, #180204, #FAF6F3 -->
<style>
  .${p}-wrap *{box-sizing:border-box;margin:0;padding:0}
  .${p}-wrap{font-family:'DM Sans',-apple-system,sans-serif;color:#180204;max-width:100%;margin:2rem 0}
  .${p}-hdr{margin-bottom:20px}
  .${p}-hdr .bar{width:48px;height:3px;background:#FF5635;border-radius:2px;margin-bottom:12px}
  .${p}-hdr h3{font-family:'DM Serif Display',Georgia,serif;font-size:22px;color:#180204;margin-bottom:4px;font-weight:400}
  .${p}-hdr p{font-size:13px;color:rgba(24,2,4,0.5);line-height:1.5}
  .${p}-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;border:1px solid #E6DAD1;border-radius:12px;box-shadow:0 2px 8px rgba(24,2,4,0.06)}
  .${p}-table{width:100%;border-collapse:collapse;font-size:13px;min-width:520px}
  .${p}-table thead tr{background:#180204}
  .${p}-table thead th{padding:12px 16px;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:rgba(255,255,255,0.85);text-align:left;white-space:nowrap;border-bottom:2px solid #3a1012}
  .${p}-table thead th:first-child{border-radius:11px 0 0 0;padding-left:20px}
  .${p}-table thead th:last-child{border-radius:0 11px 0 0}
  .${p}-table tbody tr{border-bottom:1px solid #F0E8E2;transition:background .15s}
  .${p}-table tbody tr:last-child{border-bottom:none}
  .${p}-table tbody tr:nth-child(even){background:#FDFBF9}
  .${p}-table tbody tr:nth-child(odd){background:#fff}
  .${p}-table tbody tr:hover{background:#EBF1FF}
  .${p}-table tbody td{padding:11px 16px;vertical-align:middle;color:#374151;line-height:1.45}
  .${p}-table tbody td:first-child{padding-left:20px;font-weight:600;color:#180204}
  .${p}-hint{display:none;font-size:11px;color:rgba(24,2,4,0.4);margin-top:8px;text-align:right}
  @media(max-width:640px){.${p}-hint{display:block}}
</style>
<div class="${p}-wrap">
  <div class="${p}-hdr">
    <div class="bar"></div>
    <h3>${title}</h3>
    ${desc?`<p>${desc}</p>`:''}
  </div>
  <div class="${p}-scroll">
    <table class="${p}-table">
      <thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows.map(row=>`<tr>${row.map(cell=>`<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
    </table>
  </div>
  <p class="${p}-hint">← Scroll to see all columns</p>
</div>`
}

// ── component ────────────────────────────────────────────────────────────────

export default function SEOOptimizer(){
  const [token,  setToken]  = useState('')
  const [urlInput, setUrlInput] = useState('')
  const [articles,setArticles]=useState([])
  const [selId,  setSelId]  = useState(null)
  const [art,    setArt]    = useState(null)
  const [anal,   setAnal]   = useState(null)
  const [applied,setApplied]=useState({})
  const [status, setStatus] = useState('')
  const [msg,    setMsg]    = useState('')
  const [tab,    setTab]    = useState(0)
  const [copied, setCopied] = useState(false)
  const [queueResults, setQueueResults] = useState({}) // id → {status,changes,error}
  const [queueRunning, setQueueRunning] = useState(false)
  const stopQueue = useRef(false)

  const hdrs = { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' }
  const ok = (m='')=>{ setStatus(''); setMsg(m) }
  const err= (m)=>{ setStatus('error'); setMsg(m) }
  const loading=(m)=>{ setStatus('loading'); setMsg(m) }

  // ── fetch articles by URL(s) ──────────────────────────────────────────────
  async function fetchByUrl(){
    if(!token){ err('Enter your Sanity write token first'); return }
    if(!urlInput.trim()){ err('Enter at least one URL or slug'); return }

    // parse: split on newlines or commas, extract slug from each
    const slugs = urlInput
      .split(/[\n,]+/)
      .map(u => u.trim()
        .replace(/^https?:\/\/[^/]+/,'')
        .replace(/^\/blog\//,'')
        .replace(/\/$/,'')
        .split('/')[0]
      )
      .filter(Boolean)

    if(!slugs.length){ err('No valid slugs found'); return }

    loading(`Fetching ${slugs.length} article${slugs.length>1?'s':''}…`)
    try{
      const slugList = slugs.map(s=>`"${s}"`).join(',')
      const q=encodeURIComponent(`*[_type=="post" && slug.current in [${slugList}]]|order(publishedAt desc){_id,title,slug,metaTitle,postType}`)
      const r=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
      const d=await r.json()
      if(d.error) throw new Error(d.error.description)
      if(!d.result?.length) throw new Error('No articles found for the given URLs')
      // merge into sidebar — prepend fetched articles, dedup by _id
      setArticles(prev=>{
        const ids=new Set(d.result.map(a=>a._id))
        return [...d.result, ...prev.filter(a=>!ids.has(a._id))]
      })
      // auto-select first if only one URL was given
      if(slugs.length===1 && d.result[0]){
        selectArticle(d.result[0]._id)
      } else {
        ok(`${d.result.length} article${d.result.length>1?'s':''} loaded — select one from the list`)
      }
    }catch(e){ err(e.message) }
  }

  // ── fetch articles list ───────────────────────────────────────────────────
  async function loadArticles(){
    if(!token){ err('Enter your Sanity write token first'); return }
    loading('Loading articles…')
    try{
      const q=encodeURIComponent(`*[_type=="post"]|order(publishedAt desc){_id,title,slug,metaTitle,postType}`)
      const r=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
      const d=await r.json()
      if(d.error) throw new Error(d.error.description)
      setArticles(d.result||[])
      ok()
    }catch(e){ err(e.message) }
  }

  // ── fetch single article ──────────────────────────────────────────────────
  async function selectArticle(id){
    setSelId(id); setArt(null); setAnal(null); setApplied({}); setTab(0)
    loading('Fetching article…')
    try{
      const q=encodeURIComponent(`*[_id=="${id}"][0]{_id,title,slug,metaTitle,metaDescription,excerpt,body[0...120],mainImage{asset->{url}},faqSchema{enabled,faqs[]{_key,question,answer}},postType,articleSchema,reviewSchema{enabled},itemListSchema{enabled,name,description,items[]{_key,position,name,url,image,description}},howToSchema{enabled},placeSchema{enabled}}`)
      const r=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
      const d=await r.json()
      if(d.error) throw new Error(d.error.description)
      setArt(d.result)
      ok()
    }catch(e){ err(e.message) }
  }

  // ── AI analysis ───────────────────────────────────────────────────────────
  async function analyzeArticle(){
    if(!art) return
    loading('Analyzing with Claude AI…')
    try{
      const sec=extractSections(art.body||[])
      const headings=extractHeadings(art.body||[])
      const mainImageUrl=art.mainImage?.asset?.url||''
      const faqs=art.faqSchema?.faqs||[]
      const enabled=[]
      if(art.faqSchema?.enabled)      enabled.push('FAQ')
      if(art.reviewSchema?.enabled)   enabled.push('Review')
      if(art.itemListSchema?.enabled) enabled.push('ItemList')
      if(art.howToSchema?.enabled)    enabled.push('HowTo')
      if(art.placeSchema?.enabled)    enabled.push('Place')

      const prompt=`You are a senior SEO consultant for greektriplanner.me. Analyze and return ONLY valid JSON — no prose, no markdown fences.

ARTICLE:
Title: ${art.title}
Meta Title: ${art.metaTitle||'(none)'}
Meta Description: ${art.metaDescription||'(none)'}
Excerpt: ${art.excerpt||'(none)'}
Post Type: ${art.postType||'unknown'}
Article slug (use this for ItemList URLs — do NOT add another /blog/ prefix): ${art.slug?.current||''}
ItemList URL format (copy exactly): /blog/${art.slug?.current||''}#ANCHOR
Active schemas: ${enabled.join(', ')||'none'}
FAQ enabled: ${art.faqSchema?.enabled?'yes':'no'} | FAQ questions count: ${faqs.length}
Intro: ${sec.intro.map(b=>b.text).join(' ').substring(0,380)}
First H2: "${sec.h2Title}"
H2 paragraphs: ${sec.h2Paras.join(' ').substring(0,300)}
H2 list items: ${sec.h2List.slice(0,8).join(' | ')}
All headings (use these anchors for ItemList URLs): ${JSON.stringify(headings.map(h=>({level:h.level,text:h.text,anchor:h.anchor})))}
Featured image URL: ${mainImageUrl||'(none)'}
Existing ItemList items (check and fix URLs if invalid): ${JSON.stringify((art.itemListSchema?.items||[]).map(it=>({position:it.position,name:it.name,url:it.url})))}
FAQs: ${JSON.stringify(faqs.map(f=>({_key:f._key,q:f.question,a:f.answer,words:wc(f.answer)})))}

STRICT RULES:
1. metaTitle: max 60 chars (hard limit — truncated titles lose clicks). Rules:
   - Use the exact keyword phrase searchers type (align with search intent precisely)
   - Include a power/emotion word: Best, Complete, Essential, Ultimate, Honest, Free, Trusted, Effortless, Amazing
   - Add the year (e.g. 2026) if recency matters for this query. The current year is 2026 — never use 2024 or 2025.
   - Add [brackets] or (parentheses) for extras like [Complete Guide], (Step-by-Step), [Free Tips] — they stand out in SERPs
   - Use beginner-friendly action verbs: Learn, Discover, Find, Plan, Avoid, Get
   - Sell the value — address the pain point, not just the topic
   - Never clickbait — deliver exactly what the title promises
   - Never exceed 60 chars

2. metaDescription: 105-155 chars. Rules:
   - Lead with the direct answer or the single strongest benefit the reader gets
   - Use the target keyword naturally within the first sentence
   - Include a beginner-friendly action verb (discover, find, learn, plan, get)
   - Sell the value — address a pain point or highlight a unique advantage (local experts, firsthand knowledge)
   - Use an emotion or power word if it fits naturally
   - NO newlines or line breaks under any circumstances
   - NO filler phrases: "In this article", "This guide covers", "Click here"
   - NO clickbait — be accurate and honest about what the page delivers
   - Sound like a knowledgeable local expert, not a generic content farm

3. excerpt: 40-60 words. Give a direct answer to the search intent immediately — no preamble. Only start with "Yes." or "No." if the title is an explicit yes/no question (e.g. "Is Greece Safe?"). For all other intents (how-to, list, guide, comparison) open with the most useful factual sentence directly (e.g. "Greece has 11 nonstop routes from the US in 2026, all landing in Athens." or "The best time to visit Santorini is May or September."). Plain text, no markdown.
4. articleType: always set to "Article" — this is the correct schema.org @type.
5. FAQs: trim each existing answer to ≤55 words. Keep key info. changed:true only if actually trimmed.
   IMPORTANT — faqStatus check (FAQ schema must be enabled on ALL posts):
   - If faqSchema.enabled is false OR question count is 0: generate exactly 3 relevant Q&A pairs from the article content. Questions must match what real users search. Answers max 55 words each, direct answer first.
   - Set faqStatus.enabled:false if currently disabled, faqStatus.hasQuestions:false if no questions exist.
   - Always populate faqStatus.suggestedFaqs with the 3 generated Q&A pairs when either condition is true.
6. Schema: only recommend schemas NOT in active schemas. Mapping: best-of→ItemList, itinerary/planning-tips→HowTo, destination-guide→Place, things-to-do→ItemList. If all needed schemas are already active, type:"none".
   When recommending a schema, also populate ALL its data fields from the article content:
   - ItemList: name (list title), description (1 sentence), items array — include ALL items found in the article, not just the first few. For each item URL: look up the heading in the "All headings" list (h2 or h3), take its anchor, and build the url as exactly "/blog/${art.slug?.current||''}#ANCHOR" — never add an extra /blog/ prefix, never use the full domain. The url must start with /blog/ and have only one /blog/ segment. Never invent anchors — only use anchor values from the headings list above.
     IMPORTANT — also check "Existing ItemList items": if any existing URL is invalid (bare domain like "https://greektriplanner.me/something" without /blog/, double /blog/blog/, wrong path, or anchor not matching any heading), fix it. Always return the full corrected items array in itemListData — even if ItemList schema is already enabled. Set schema.type to "ItemList" if fixes are needed.
   - HowTo: name, description, totalTime (ISO 8601 e.g. "P7D"), estimatedCost (e.g. "€2000"), steps array from H2 list — each step needs name and text.
   - Place: name (destination name from title), description (2 sentences), address (e.g. "Athens, Greece"), latitude, longitude, image: use the Featured image URL provided above if available, otherwise "".
   - Review: itemReviewed.type (Place/TouristAttraction/Product), itemReviewed.name, itemReviewed.image: use Featured image URL if available, itemReviewed.address, rating.ratingValue (4.5), reviewBody (2 sentences summary).
7. step4.introOk: false if intro does NOT start with a direct answer. If false, write newIntro (1-3 sentences, direct answer first).
8. step4.h2Format: "table" only if H2 has 3+ comparable items that would read better as columns. Otherwise "list" or "paragraph". If "table": provide tableTitle, tableDescription, tableHeaders (2-4 cols), tableRows (real content from the H2 data above).

Return ONLY:
{"metaTitle":"","metaTitle_reason":"","metaDescription":"","metaDescription_reason":"","excerpt":"","excerpt_reason":"","articleType":"Article","faqs":[{"_key":"","question":"","answer":"","changed":false}],"faqStatus":{"enabled":true,"hasQuestions":true,"suggestedFaqs":[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]},"schema":{"type":"none","reason":"","itemListData":{"name":"","description":"","items":[{"position":1,"name":"","url":"","image":"","description":""}]},"howToData":{"name":"","description":"","totalTime":"","estimatedCost":"","steps":[{"name":"","text":""}],"supply":[]},"placeData":{"name":"","description":"","address":"","latitude":0,"longitude":0,"image":"","telephone":"","url":""},"reviewData":{"itemReviewed":{"type":"Place","name":"","image":"","address":"","priceRange":""},"rating":{"ratingValue":4.5,"bestRating":5,"worstRating":1},"reviewBody":""}},"step4":{"introOk":true,"newIntro":"","h2Format":"paragraph","h2Reason":"","tableTitle":"","tableDescription":"","tableHeaders":[],"tableRows":[]}}`

      const r=await fetch('/api/analyze',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({prompt})
      })
      const data=await r.json()

      // surface API-level errors (overloaded, rate limit, auth, etc.)
      if(data.type==='error'||data.error){
        const apiErr=data.error?.message||data.error?.type||JSON.stringify(data.error||data)
        throw new Error(`API error: ${apiErr}`)
      }
      // check for stop_reason truncation
      if(data.stop_reason==='max_tokens'){
        throw new Error('Response truncated — max_tokens too low. Increase in route.ts.')
      }

      const text=data.content?.[0]?.text||''
      if(!text) throw new Error(`Empty response from API. Full response: ${JSON.stringify(data).substring(0,200)}`)

      const match=text.match(/\{[\s\S]*\}/)
      if(!match) throw new Error(`No JSON found. AI returned: ${text.substring(0,200)}`)
      // sanitize: remove literal newlines inside string values that break JSON.parse
      const clean=match[0]
        .replace(/[\r\n]+/g,' ')
        .replace(/([^\\])\\n/g,'$1 ')
        .replace(/\t/g,' ')
      let parsed
      try{ parsed=JSON.parse(clean) }
      catch(e2){
        // fallback: try to extract just the safe fields and discard broken ones
        const safe=clean.replace(/"answer"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"answer":""')
                        .replace(/"reviewBody"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"reviewBody":""')
                        .replace(/"newIntro"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"newIntro":""')
        try{ parsed=JSON.parse(safe) }
        catch(e3){ throw new Error(`JSON parse failed: ${e2.message}. Text sample: ${clean.substring(0,150)}`) }
      }
      setAnal(parsed)
      ok()
    }catch(e){ err('Analysis failed: '+e.message) }
  }

  // ── id-parametric Sanity helpers (used by queue) ─────────────────────────
  async function sanityPatchId(id, set){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id,set}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  async function sanityInsertId(id, before, items){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id,insert:{before,items}}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  // ── auto-apply all changes for a given article + analysis ─────────────────
  async function autoApplyAll(artFull, a){
    const set={}
    if(a.metaTitle)       set.metaTitle=a.metaTitle
    if(a.metaDescription) set.metaDescription=a.metaDescription
    if(a.excerpt)         set.excerpt=a.excerpt
    set['articleSchema.articleType']='Article'
    const changedFaqs=(a.faqs||[]).filter(f=>f.changed)
    if(changedFaqs.length) set['faqSchema.faqs']=a.faqs.map((f,i)=>({
      _type:'object',_key:f._key||`faq${i}${Date.now()}`,question:f.question,answer:f.answer
    }))
    const fs=a.faqStatus
    if(!fs?.enabled||!fs?.hasQuestions){
      set['faqSchema.enabled']=true
      if(!fs?.hasQuestions&&fs?.suggestedFaqs?.length)
        set['faqSchema.faqs']=fs.suggestedFaqs.map(f=>({_type:'object',_key:rk(),question:f.question,answer:f.answer}))
    }
    const t=a.schema?.type
    if(t&&t!=='none'){
      if(t==='ItemList'){
        const d=a.schema.itemListData||{}
        set['itemListSchema.enabled']=true
        if(d.name) set['itemListSchema.name']=d.name
        if(d.description) set['itemListSchema.description']=d.description
        if(d.items?.length) set['itemListSchema.items']=d.items.map((it,i)=>({
          _type:'object',_key:rk(),position:it.position||i+1,name:it.name||'',url:it.url||'',image:it.image||'',description:it.description||''
        }))
      }
      if(t==='HowTo'){
        const d=a.schema.howToData||{}
        set['howToSchema.enabled']=true
        if(d.name) set['howToSchema.name']=d.name
        if(d.description) set['howToSchema.description']=d.description
        if(d.totalTime) set['howToSchema.totalTime']=d.totalTime
        if(d.estimatedCost) set['howToSchema.estimatedCost']=d.estimatedCost
        if(d.steps?.length) set['howToSchema.steps']=d.steps.map(s=>({_type:'object',_key:rk(),name:s.name||'',text:s.text||'',url:'',image:''}))
        if(d.supply?.length) set['howToSchema.supply']=d.supply
      }
      if(t==='Place'){
        const d=a.schema.placeData||{}
        const fallbackImg=artFull.mainImage?.asset?.url||''
        set['placeSchema.enabled']=true
        set['placeSchema.places']=[{_type:'object',_key:rk(),name:d.name||'',description:d.description||'',
          address:d.address||'',latitude:d.latitude||0,longitude:d.longitude||0,image:d.image||fallbackImg,telephone:d.telephone||'',url:d.url||''}]
      }
      if(t==='Review'){
        const d=a.schema.reviewData||{}
        set['reviewSchema.enabled']=true
        if(d.itemReviewed) set['reviewSchema.itemReviewed']=d.itemReviewed
        if(d.rating) set['reviewSchema.rating']=d.rating
        if(d.reviewBody) set['reviewSchema.reviewBody']=d.reviewBody
      }
    }
    if(Object.keys(set).length) await sanityPatchId(artFull._id, set)
    if(!a.step4?.introOk&&a.step4?.newIntro)
      await sanityInsertId(artFull._id,'body[0]',[makeBlock(a.step4.newIntro)])
    // return summary of what changed
    const changes=[]
    if(a.metaTitle) changes.push('title')
    if(a.metaDescription) changes.push('description')
    if(a.excerpt) changes.push('excerpt')
    if(changedFaqs.length) changes.push(`${changedFaqs.length} FAQ trimmed`)
    if(!fs?.enabled) changes.push('FAQ enabled')
    if(!fs?.hasQuestions) changes.push('FAQ questions added')
    if(t==='ItemList'){
      const wasEnabled=artFull.itemListSchema?.enabled
      changes.push(wasEnabled?'ItemList URLs fixed':'ItemList schema')
    } else if(t&&t!=='none') changes.push(`${t} schema`)
    if(!a.step4?.introOk) changes.push('intro inserted')
    return changes
  }

  // ── analyze all articles in sidebar sequentially ──────────────────────────
  async function analyzeAll(){
    if(!token||queueRunning) return
    stopQueue.current=false
    setQueueRunning(true)
    setQueueResults({})
    ok()
    for(const article of articles){
      if(stopQueue.current) break
      const id=article._id
      setQueueResults(p=>({...p,[id]:{status:'running',changes:[],error:''}}))
      try{
        // fetch full article
        const q=encodeURIComponent(`*[_id=="${id}"][0]{_id,title,slug,metaTitle,metaDescription,excerpt,body[0...120],mainImage{asset->{url}},faqSchema{enabled,faqs[]{_key,question,answer}},postType,articleSchema,reviewSchema{enabled},itemListSchema{enabled,name,description,items[]{_key,position,name,url,image,description}},howToSchema{enabled},placeSchema{enabled}}`)
        const fr=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
        const fd=await fr.json()
        if(fd.error) throw new Error(fd.error.description)
        const artFull=fd.result

        const sec=extractSections(artFull.body||[])
        const headings=extractHeadings(artFull.body||[])
        const mainImageUrl=artFull.mainImage?.asset?.url||''
        const faqs=artFull.faqSchema?.faqs||[]
        const enabled=[]
        if(artFull.faqSchema?.enabled) enabled.push('FAQ')
        if(artFull.reviewSchema?.enabled) enabled.push('Review')
        if(artFull.itemListSchema?.enabled) enabled.push('ItemList')
        if(artFull.howToSchema?.enabled) enabled.push('HowTo')
        if(artFull.placeSchema?.enabled) enabled.push('Place')

        const prompt=buildQueuePrompt(artFull, sec, faqs, enabled, headings, mainImageUrl)

        // call AI
        const ar=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})})
        const ad=await ar.json()
        const text=ad.content?.[0]?.text||''
        const match=text.match(/\{[\s\S]*\}/)
        if(!match) throw new Error('No JSON in response')
        const clean=match[0].replace(/[\r\n]+/g,' ').replace(/([^\\])\\n/g,'$1 ').replace(/\t/g,' ')
        let parsed
        try{ parsed=JSON.parse(clean) }
        catch{ parsed=JSON.parse(clean.replace(/"answer"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"answer":""').replace(/"reviewBody"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"reviewBody":""').replace(/"newIntro"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"newIntro":""')) }

        // auto-apply all
        const changes=await autoApplyAll(artFull, parsed)
        setQueueResults(p=>({...p,[id]:{status:'done',changes,error:''}}))
      }catch(e){
        setQueueResults(p=>({...p,[id]:{status:'error',changes:[],error:e.message}}))
      }
      await new Promise(res=>setTimeout(res,1200))
    }
    setQueueRunning(false)
    ok()
  }

  function buildQueuePrompt(artFull, sec, faqs, enabled, headings=[], mainImageUrl=''){
    return `You are a senior SEO consultant for greektriplanner.me. Analyze and return ONLY valid JSON — no prose, no markdown fences.

ARTICLE:
Title: ${artFull.title}
Meta Title: ${artFull.metaTitle||'(none)'}
Meta Description: ${artFull.metaDescription||'(none)'}
Excerpt: ${artFull.excerpt||'(none)'}
Post Type: ${artFull.postType||'unknown'}
Article slug (use this for ItemList URLs — do NOT add another /blog/ prefix): ${artFull.slug?.current||''}
ItemList URL format (copy exactly): /blog/${artFull.slug?.current||''}#ANCHOR
Active schemas: ${enabled.join(', ')||'none'}
FAQ enabled: ${artFull.faqSchema?.enabled?'yes':'no'} | FAQ questions count: ${faqs.length}
Intro: ${sec.intro.map(b=>b.text).join(' ').substring(0,380)}
First H2: "${sec.h2Title}"
H2 paragraphs: ${sec.h2Paras.join(' ').substring(0,300)}
H2 list items: ${sec.h2List.slice(0,8).join(' | ')}
All headings (use these anchors for ItemList URLs): ${JSON.stringify(headings.map(h=>({level:h.level,text:h.text,anchor:h.anchor})))}
Featured image URL: ${mainImageUrl||'(none)'}
Existing ItemList items (check and fix URLs if invalid): ${JSON.stringify((artFull.itemListSchema?.items||[]).map(it=>({position:it.position,name:it.name,url:it.url})))}
FAQs: ${JSON.stringify(faqs.map(f=>({_key:f._key,q:f.question,a:f.answer,words:wc(f.answer)})))}

STRICT RULES:
1. metaTitle: max 60 chars. Keyword-first, power word, year if recency matters (current year is 2026 — never use 2024 or 2025), [brackets] for extras. Never clickbait.
2. metaDescription: 105-155 chars. NO newlines. Direct answer or strongest benefit first. Keyword natural. Action verb. No filler.
3. excerpt: 40-60 words. Give a direct answer to the search intent immediately. Only use "Yes."/"No." if the title is an explicit yes/no question. For how-to, list, guide, or comparison intents open with the strongest factual sentence directly. Plain text, no markdown.
4. articleType: always "Article" — this is the correct schema.org @type.
5. FAQs: trim each to ≤55 words. changed:true only if trimmed. If FAQ disabled or empty: generate 3 Q&A pairs, direct answers ≤55 words.
6. Schema: recommend only missing schemas. best-of→ItemList, itinerary/planning-tips→HowTo, destination-guide→Place, things-to-do→ItemList. Populate all data fields.
   - ItemList: include ALL items found — never truncate the list. Each item URL: take the heading anchor from "All headings" (h2 or h3) and build url as "/blog/SLUG#ANCHOR" where SLUG is the article's slug.current value. The url must start with exactly /blog/ — one /blog/ segment only, never /blog/blog/. Never invent anchors.
     IMPORTANT — also check "Existing ItemList items": fix any invalid URL (bare domain, double /blog/blog/, or mismatched anchor). Return all corrected items in itemListData and set schema.type to "ItemList" if fixes are needed.
   - HowTo: name, description, totalTime(ISO8601), estimatedCost, steps[]{name,text}, supply[].
   - Place: name, description, address, latitude, longitude, image: use Featured image URL if available.
   - Review: itemReviewed{type,name,image: use Featured image URL if available,address,priceRange}, rating{ratingValue:4.5,bestRating:5,worstRating:1}, reviewBody.
7. step4.introOk: false if no direct answer in intro. If false write newIntro (1-3 sentences).
8. step4.h2Format: table only if 3+ comparable items. If table: provide tableTitle, tableHeaders, tableRows.

Return ONLY:
{"metaTitle":"","metaTitle_reason":"","metaDescription":"","metaDescription_reason":"","excerpt":"","excerpt_reason":"","articleType":"Article","faqs":[{"_key":"","question":"","answer":"","changed":false}],"faqStatus":{"enabled":true,"hasQuestions":true,"suggestedFaqs":[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]},"schema":{"type":"none","reason":"","itemListData":{"name":"","description":"","items":[{"position":1,"name":"","url":"","image":"","description":""}]},"howToData":{"name":"","description":"","totalTime":"","estimatedCost":"","steps":[{"name":"","text":""}],"supply":[]},"placeData":{"name":"","description":"","address":"","latitude":0,"longitude":0,"image":"","telephone":"","url":""},"reviewData":{"itemReviewed":{"type":"Place","name":"","image":"","address":"","priceRange":""},"rating":{"ratingValue":4.5,"bestRating":5,"worstRating":1},"reviewBody":""}},"step4":{"introOk":true,"newIntro":"","h2Format":"paragraph","h2Reason":"","tableTitle":"","tableDescription":"","tableHeaders":[],"tableRows":[]}}`
  }

  // ── apply helpers ─────────────────────────────────────────────────────────
  async function sanityPatch(set){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id:art._id,set}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  async function sanityInsert(before,items){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id:art._id,insert:{before,items}}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  async function apply(field){
    ok()
    try{
      if(field==='metaTitle')        await sanityPatch({metaTitle:anal.metaTitle})
      if(field==='metaDescription')  await sanityPatch({metaDescription:anal.metaDescription})
      if(field==='bothSEO')          await sanityPatch({metaTitle:anal.metaTitle,metaDescription:anal.metaDescription,'articleSchema.articleType':'Article'})
      if(field==='excerpt')          await sanityPatch({excerpt:anal.excerpt})
      if(field==='faqs'){
        const faqs=anal.faqs.map((f,i)=>({_type:'object',_key:f._key||`faq${i}${Date.now()}`,question:f.question,answer:f.answer}))
        await sanityPatch({'faqSchema.faqs':faqs})
      }
      if(field==='faqFix'){
        const fs=anal.faqStatus
        const set={'faqSchema.enabled':true}
        if(!fs?.hasQuestions || !fs?.enabled){
          set['faqSchema.faqs']=(fs?.suggestedFaqs||[]).map((f,i)=>({
            _type:'object',_key:rk(),question:f.question,answer:f.answer
          }))
        }
        await sanityPatch(set)
      }
      if(field==='schema' && anal.schema?.type && anal.schema.type!=='none'){
        const t=anal.schema.type
        const set={}
        if(t==='ItemList'){
          const d=anal.schema.itemListData||{}
          set['itemListSchema.enabled']=true
          if(d.name)        set['itemListSchema.name']=d.name
          if(d.description) set['itemListSchema.description']=d.description
          if(d.items?.length) set['itemListSchema.items']=d.items.map((it,i)=>({
            _type:'object',_key:rk(),
            position:it.position||i+1,
            name:it.name||'',
            url:it.url||'',
            image:it.image||'',
            description:it.description||''
          }))
        }
        if(t==='HowTo'){
          const d=anal.schema.howToData||{}
          set['howToSchema.enabled']=true
          if(d.name)          set['howToSchema.name']=d.name
          if(d.description)   set['howToSchema.description']=d.description
          if(d.totalTime)     set['howToSchema.totalTime']=d.totalTime
          if(d.estimatedCost) set['howToSchema.estimatedCost']=d.estimatedCost
          if(d.steps?.length) set['howToSchema.steps']=d.steps.map(s=>({
            _type:'object',_key:rk(),name:s.name||'',text:s.text||'',url:'',image:''
          }))
          if(d.supply?.length) set['howToSchema.supply']=d.supply
        }
        if(t==='Place'){
          const d=anal.schema.placeData||{}
          const fallbackImg=art?.mainImage?.asset?.url||''
          set['placeSchema.enabled']=true
          if(d.name||d.description||d.address) set['placeSchema.places']=[{
            _type:'object',_key:rk(),
            name:d.name||'',
            description:d.description||'',
            address:d.address||'',
            latitude:d.latitude||0,
            longitude:d.longitude||0,
            image:d.image||fallbackImg,
            telephone:d.telephone||'',
            url:d.url||''
          }]
        }
        if(t==='Review'){
          const d=anal.schema.reviewData||{}
          set['reviewSchema.enabled']=true
          if(d.itemReviewed) set['reviewSchema.itemReviewed']=d.itemReviewed
          if(d.rating)       set['reviewSchema.rating']=d.rating
          if(d.reviewBody)   set['reviewSchema.reviewBody']=d.reviewBody
        }
        if(Object.keys(set).length) await sanityPatch(set)
      }
      if(field==='intro' && anal.step4?.newIntro){
        await sanityInsert('body[0]',[makeBlock(anal.step4.newIntro)])
      }
      const fields = field==='bothSEO' ? ['metaTitle','metaDescription'] : [field]
      setApplied(p=>{ const n={...p}; fields.forEach(f=>n[f]=true); return n })
    }catch(e){ err('Apply failed: '+e.message) }
  }

  function copyTable(){
    const s=anal?.step4
    if(!s?.tableHeaders?.length) return
    const slug=art?.slug?.current||'table'
    const html=generateTableHTML(slug,s.tableTitle||'',s.tableDescription||'',s.tableHeaders,s.tableRows||[])
    navigator.clipboard.writeText(html).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),2500) })
  }

  // ── style tokens ──────────────────────────────────────────────────────────
  const T = {
    wrap:   { fontFamily:'var(--font-sans)', fontSize:'14px', color:'var(--color-text-primary)' },
    hdr:    { borderBottom:'0.5px solid var(--color-border-tertiary)', padding:'1rem 1.25rem .75rem' },
    cfgBar: { padding:'.75rem 1.25rem', borderBottom:'0.5px solid var(--color-border-tertiary)', display:'flex', gap:'8px', alignItems:'flex-end', flexWrap:'wrap' },
    body:   { display:'flex', minHeight:'460px' },
    sb:     { width:'215px', flexShrink:0, borderRight:'0.5px solid var(--color-border-tertiary)', overflowY:'auto', maxHeight:'560px' },
    main:   { flex:1, padding:'1rem 1.25rem', overflowY:'auto', maxHeight:'560px' },
    tabBar: { display:'flex', borderBottom:'0.5px solid var(--color-border-tertiary)', marginBottom:'1rem' },
    field:  { marginBottom:'1.25rem' },
    flbl:   { fontSize:'12px', fontWeight:'500', color:'var(--color-text-secondary)', textTransform:'uppercase', letterSpacing:'.05em', marginBottom:'6px', display:'flex', alignItems:'center', flexWrap:'wrap', gap:'5px' },
    cur:    { fontSize:'13px', color:'var(--color-text-secondary)', background:'var(--color-background-secondary)', padding:'8px 10px', borderRadius:'var(--border-radius-md)', marginBottom:'6px', lineHeight:1.6 },
    sug:    { fontSize:'13px', color:'var(--color-text-success)', background:'var(--color-background-success)', padding:'8px 10px', borderRadius:'var(--border-radius-md)', lineHeight:1.6 },
    rsn:    { fontSize:'12px', color:'var(--color-text-tertiary)', fontStyle:'italic', marginTop:'4px' },
    ibox:   { fontSize:'13px', background:'var(--color-background-info)', border:'0.5px solid var(--color-border-info)', padding:'10px 14px', borderRadius:'var(--border-radius-md)', marginBottom:'1rem' },
    nbox:   { fontSize:'13px', background:'var(--color-background-secondary)', border:'0.5px solid var(--color-border-secondary)', padding:'10px 14px', borderRadius:'var(--border-radius-md)', marginBottom:'1rem' },
    note:   { fontSize:'12px', color:'var(--color-text-tertiary)', background:'var(--color-background-secondary)', padding:'8px 10px', borderRadius:'var(--border-radius-md)', marginTop:'.5rem' },
    ar:     { textAlign:'right', marginTop:'6px' },
  }

  const tabStyle = active => ({
    padding:'5px 14px', fontSize:'13px', border:'none', background:'none', cursor:'pointer',
    fontFamily:'var(--font-sans)', borderBottom: active?'2px solid var(--color-text-info)':'2px solid transparent',
    color: active?'var(--color-text-info)':'var(--color-text-secondary)'
  })

  const artStyle = sel => ({
    padding:'8px 12px', cursor:'pointer', borderBottom:'0.5px solid var(--color-border-tertiary)',
    background: sel?'var(--color-background-info)':'transparent',
  })

  const Badge=({text,type='success'})=>(
    <span style={{fontSize:'11px',padding:'2px 8px',borderRadius:'20px',background:`var(--color-background-${type})`,color:`var(--color-text-${type})`}}>
      {text}
    </span>
  )

  const CharBadge=({n,min,max})=>(
    <span style={{fontSize:'11px',color:n>=min&&n<=max?'var(--color-text-success)':'var(--color-text-danger)'}}>
      {n} chars
    </span>
  )

  const WcBadge=({n,min,max})=>(
    <span style={{fontSize:'11px',color:n>=min&&n<=max?'var(--color-text-success)':'var(--color-text-danger)'}}>
      {n} words
    </span>
  )

  const changedFaqs = anal?.faqs?.filter(f=>f.changed)||[]

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div style={T.wrap}>
      {/* Header */}
      <div style={T.hdr}>
        <p style={{fontSize:'18px',fontWeight:'500',margin:'0 0 4px'}}>SEO Article Optimizer</p>
        <p style={{fontSize:'13px',color:'var(--color-text-secondary)',margin:0}}>
          4-step CTR optimization — applies changes directly to Sanity (title, description, excerpt, schema, FAQ, content)
        </p>
      </div>

      {/* Config bar */}
      <div style={T.cfgBar}>
        <div style={{flex:1,minWidth:'180px'}}>
          <label style={{fontSize:'12px',color:'var(--color-text-secondary)',display:'block',marginBottom:'4px'}}>Sanity write token</label>
          <input type="password" placeholder="sk-…" value={token} onChange={e=>setToken(e.target.value)} style={{width:'100%',boxSizing:'border-box'}} />
        </div>
        <button onClick={loadArticles} disabled={status==='loading'||!token}>
          {status==='loading'&&msg.startsWith('Load')?'Loading…':'Load articles'}
        </button>
      </div>

      {/* URL input bar */}
      <div style={{padding:'.6rem 1.25rem',borderBottom:'0.5px solid var(--color-border-tertiary)',display:'flex',gap:'8px',alignItems:'flex-end',background:'var(--color-background-secondary)'}}>
        <div style={{flex:1,minWidth:'200px'}}>
          <label style={{fontSize:'12px',color:'var(--color-text-secondary)',display:'block',marginBottom:'4px'}}>
            Paste article URL(s) or slug(s) — one per line
          </label>
          <textarea
            placeholder={'https://greektriplanner.me/blog/is-greece-safe-to-travel-to\nhttps://greektriplanner.me/blog/athens-travel-guide'}
            value={urlInput}
            onChange={e=>setUrlInput(e.target.value)}
            rows={3}
            style={{width:'100%',boxSizing:'border-box',resize:'vertical',fontFamily:'var(--font-sans)',fontSize:'13px'}}
          />
        </div>
        <button
          onClick={fetchByUrl}
          disabled={status==='loading'||!token||!urlInput.trim()}
          style={{alignSelf:'flex-end'}}
        >
          {status==='loading'&&msg.startsWith('Fetch')?'Fetching…':'Fetch →'}
        </button>
      </div>

      {/* Status bar */}
      {msg && (
        <div style={{padding:'6px 1.25rem',fontSize:'13px',
          color:  status==='error'?'var(--color-text-danger)':'var(--color-text-secondary)',
          background:status==='error'?'var(--color-background-danger)':'transparent'}}>
          {msg}
        </div>
      )}

      {/* Body */}
      <div style={T.body}>

        {/* Sidebar */}
        <div style={{...T.sb, display:'flex', flexDirection:'column', overflowY:'hidden'}}>
          <div style={{overflowY:'auto', flex:1}}>
          {articles.length===0
            ?<p style={{padding:'12px',fontSize:'13px',color:'var(--color-text-tertiary)',margin:0}}>Load articles to start</p>
            :articles.map(a=>{
              const qr=queueResults[a._id]
              const qIcon = qr?.status==='done'?'✓':qr?.status==='error'?'✗':qr?.status==='running'?'…':null
              const qColor = qr?.status==='done'?'var(--color-text-success)':qr?.status==='error'?'var(--color-text-danger)':'var(--color-text-warning)'
              return (
                <div key={a._id} style={{...artStyle(selId===a._id), display:'flex', alignItems:'center', gap:'6px'}} onClick={()=>!queueRunning&&selectArticle(a._id)}>
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{fontSize:'13px',fontWeight:'500',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',
                      color:selId===a._id?'var(--color-text-info)':'var(--color-text-primary)'}}>
                      {a.title}
                    </div>
                    <div style={{fontSize:'11px',color:selId===a._id?'var(--color-text-info)':'var(--color-text-tertiary)',opacity:selId===a._id?.7:1}}>
                      {a.postType||'no type'}
                      {qr?.status==='done'&&qr.changes.length>0&&(
                        <span style={{marginLeft:'4px',color:'var(--color-text-success)'}}>· {qr.changes.length} changes</span>
                      )}
                    </div>
                  </div>
                  {qIcon && <span style={{fontSize:'12px',fontWeight:'600',color:qColor,flexShrink:0}}>{qIcon}</span>}
                </div>
              )
            })
          }
          </div>
          {/* Analyze all button */}
          {articles.length>1 && (
            <div style={{padding:'8px 10px',borderTop:'0.5px solid var(--color-border-tertiary)'}}>
              {!queueRunning
                ?<button onClick={analyzeAll} style={{width:'100%',fontSize:'12px'}}>
                  Analyze all {articles.length} ↗
                </button>
                :<button onClick={()=>stopQueue.current=true} style={{width:'100%',fontSize:'12px',background:'var(--color-background-danger)',color:'var(--color-text-danger)'}}>
                  Stop queue
                </button>
              }
              {queueRunning && (
                <div style={{fontSize:'11px',color:'var(--color-text-tertiary)',textAlign:'center',marginTop:'4px'}}>
                  {Object.values(queueResults).filter(r=>r.status==='done'||r.status==='error').length}/{articles.length} done
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main */}
        <div style={T.main}>

          {!art && status!=='loading' && (
            <p style={{color:'var(--color-text-tertiary)',textAlign:'center',marginTop:'3rem'}}>
              Select an article from the list
            </p>
          )}

          {art && !anal && status!=='loading' && (
            <div style={{textAlign:'center',paddingTop:'2.5rem'}}>
              <p style={{fontWeight:'500',marginBottom:'6px'}}>{art.title}</p>
              <p style={{fontSize:'13px',color:'var(--color-text-secondary)',marginBottom:'1.25rem'}}>
                Type: {art.postType||'—'} · FAQs: {art.faqSchema?.faqs?.length||0}
              </p>
              <button onClick={analyzeArticle}>Analyze with AI ↗</button>
            </div>
          )}

          {art && anal && (
            <>
              {/* Tab bar */}
              <div style={T.tabBar}>
                {['SEO Fields','Excerpt','Schema & FAQ','Content'].map((t,i)=>(
                  <button key={t} style={tabStyle(tab===i)} onClick={()=>setTab(i)}>{t}</button>
                ))}
              </div>

              {/* ── Tab 0: SEO Fields ───────────────────────── */}
              {tab===0 && (
                <div>
                  <div style={T.field}>
                    <div style={T.flbl}>
                      Meta title
                      <CharBadge n={cc(anal.metaTitle)} min={50} max={60} />
                      {applied.metaTitle && <Badge text="applied" />}
                    </div>
                    <div style={T.cur}>Current: {art.metaTitle||art.title||'—'}</div>
                    <div style={T.sug}>{anal.metaTitle}</div>
                    <div style={T.rsn}>{anal.metaTitle_reason}</div>
                    {!applied.metaTitle && <div style={T.ar}><button onClick={()=>apply('metaTitle')}>Apply</button></div>}
                  </div>

                  <div style={T.field}>
                    <div style={T.flbl}>
                      Meta description
                      <CharBadge n={cc(anal.metaDescription)} min={105} max={155} />
                      {applied.metaDescription && <Badge text="applied" />}
                    </div>
                    <div style={T.cur}>Current: {art.metaDescription||'—'}</div>
                    <div style={T.sug}>{anal.metaDescription}</div>
                    <div style={T.rsn}>{anal.metaDescription_reason}</div>
                    {!applied.metaDescription && <div style={T.ar}><button onClick={()=>apply('metaDescription')}>Apply</button></div>}
                  </div>

                  {!applied.metaTitle && !applied.metaDescription && (
                    <div style={T.ar}>
                      <button onClick={()=>apply('bothSEO')}>Apply both ↗</button>
                    </div>
                  )}
                </div>
              )}

              {/* ── Tab 1: Excerpt ──────────────────────────── */}
              {tab===1 && (
                <div style={T.field}>
                  <div style={T.flbl}>
                    Excerpt — featured snippet target
                    <WcBadge n={wc(anal.excerpt)} min={40} max={60} />
                    {applied.excerpt && <Badge text="applied" />}
                  </div>
                  <div style={T.cur}>Current ({wc(art.excerpt||'')} words): {art.excerpt||'—'}</div>
                  <div style={T.sug}>{anal.excerpt}</div>
                  <div style={T.rsn}>{anal.excerpt_reason}</div>
                  {!applied.excerpt && <div style={T.ar}><button onClick={()=>apply('excerpt')}>Apply ↗</button></div>}
                </div>
              )}

              {/* ── Tab 2: Schema & FAQ ─────────────────────── */}
              {tab===2 && (
                <div>
                  {anal.schema?.type && anal.schema.type!=='none' ? (
                    <div style={T.ibox}>
                      <div style={{fontWeight:'500',color:'var(--color-text-info)',marginBottom:'4px',display:'flex',alignItems:'center',gap:'8px'}}>
                        {art?.itemListSchema?.enabled && anal.schema.type==='ItemList'
                          ? 'ItemList URL fix needed'
                          : `Recommended: ${anal.schema.type} schema`}
                        {applied.schema && <Badge text="applied in Sanity" />}
                      </div>
                      <div style={{color:'var(--color-text-secondary)',marginBottom:'8px'}}>{anal.schema.reason}</div>
                      {!applied.schema && (
                        <button onClick={()=>apply('schema')}>
                          {art?.itemListSchema?.enabled && anal.schema.type==='ItemList'
                            ? 'Fix ItemList URLs in Sanity ↗'
                            : `Enable ${anal.schema.type} schema in Sanity ↗`}
                        </button>
                      )}
                      {applied.schema && (
                        <div style={{fontSize:'12px',color:'var(--color-text-tertiary)',marginTop:'4px'}}>
                          {art?.itemListSchema?.enabled && anal.schema.type==='ItemList'
                            ? 'ItemList URLs corrected in Sanity. Verify in Studio → Schema Markup → Item List Schema.'
                            : `Schema enabled and data populated. Review in Studio → Schema Markup → ${anal.schema.type}.`}
                        </div>
                      )}
                    </div>
                  ):(
                    <div style={T.nbox}>
                      <div style={{color:'var(--color-text-secondary)'}}>
                        No additional schema needed — current schemas are appropriate for this article type.
                      </div>
                    </div>
                  )}

                  {(() => {
                    const fs=anal.faqStatus
                    const needsFix=!fs?.enabled||!fs?.hasQuestions
                    if(!needsFix) return null
                    return (
                      <div style={{...T.ibox,marginBottom:'1rem',background:'var(--color-background-danger)',border:'0.5px solid var(--color-border-danger)'}}>
                        <div style={{fontWeight:'500',color:'var(--color-text-danger)',marginBottom:'4px',display:'flex',alignItems:'center',gap:'8px'}}>
                          FAQ schema issue
                          {applied.faqFix && <Badge text="fixed in Sanity" />}
                        </div>
                        <div style={{fontSize:'13px',color:'var(--color-text-secondary)',marginBottom:'10px'}}>
                          {!fs?.enabled && !fs?.hasQuestions && 'FAQ schema is disabled and has no questions.'}
                          {!fs?.enabled && fs?.hasQuestions && 'FAQ schema is disabled — it must be enabled on all posts.'}
                          {fs?.enabled && !fs?.hasQuestions && 'FAQ schema is enabled but has no questions — 3 have been generated below.'}
                        </div>
                        {!applied.faqFix && fs?.suggestedFaqs?.length>0 && (
                          <>
                            {fs.suggestedFaqs.map((f,i)=>(
                              <div key={i} style={{marginBottom:'8px'}}>
                                <div style={{fontSize:'12px',fontWeight:'500',color:'var(--color-text-primary)',marginBottom:'2px'}}>Q: {f.question}</div>
                                <div style={{...T.sug,fontSize:'12px'}}>{f.answer}</div>
                              </div>
                            ))}
                            <div style={T.ar}>
                              <button onClick={()=>apply('faqFix')}>Enable FAQ + add questions ↗</button>
                            </div>
                          </>
                        )}
                        {!applied.faqFix && !fs?.hasQuestions && !fs?.suggestedFaqs?.length && (
                          <div style={T.ar}>
                            <button onClick={()=>apply('faqFix')}>Enable FAQ schema ↗</button>
                          </div>
                        )}
                      </div>
                    )
                  })()}

                  {anal.faqs?.length>0 && (
                    <>
                      <div style={{...T.flbl,marginBottom:'8px'}}>
                        FAQ answers
                        {applied.faqs
                          ? <Badge text="applied" />
                          : changedFaqs.length
                            ? <Badge text={`${changedFaqs.length} to trim`} type="warning" />
                            : <Badge text="all ≤55 words" />}
                      </div>
                      {anal.faqs.map((f,i)=>(
                        <div key={i} style={{paddingBottom:'.75rem',marginBottom:'.75rem',borderBottom:'0.5px solid var(--color-border-tertiary)'}}>
                          <div style={{fontSize:'13px',fontWeight:'500',marginBottom:'4px',display:'flex',alignItems:'center',gap:'6px'}}>
                            Q: {f.question}
                            {f.changed && <Badge text="trimmed" type="warning" />}
                          </div>
                          <div style={f.changed?T.sug:T.cur}>
                            {f.answer}
                            <span style={{fontSize:'11px',color:'var(--color-text-tertiary)',marginLeft:'6px'}}>
                              ({wc(f.answer)} words)
                            </span>
                          </div>
                        </div>
                      ))}
                      {!applied.faqs && changedFaqs.length>0 && (
                        <div style={T.ar}><button onClick={()=>apply('faqs')}>Apply FAQ trims ↗</button></div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* ── Tab 3: Content ──────────────────────────── */}
              {tab===3 && (
                <div>
                  {/* Intro check */}
                  <div style={T.nbox}>
                    <div style={{fontWeight:'500',marginBottom:'6px',display:'flex',alignItems:'center',gap:'8px'}}>
                      Intro paragraph
                      <Badge
                        text={anal.step4?.introOk?'direct answer ✓':'missing direct answer'}
                        type={anal.step4?.introOk?'success':'danger'} />
                      {applied.intro && <Badge text="applied" />}
                    </div>
                    {anal.step4?.introOk
                      ?<div style={{fontSize:'13px',color:'var(--color-text-secondary)'}}>Opens with a direct answer — no change needed.</div>
                      :<>
                        <div style={{fontSize:'13px',color:'var(--color-text-secondary)',marginBottom:'8px'}}>
                          The intro lacks a direct answer. Suggested replacement:
                        </div>
                        <div style={T.sug}>{anal.step4?.newIntro}</div>
                        {!applied.intro && (
                          <div style={T.ar}>
                            <button onClick={()=>apply('intro')}>Insert as new first paragraph ↗</button>
                          </div>
                        )}
                        <div style={T.note}>Inserts before current first paragraph. You can then remove the old one in Studio.</div>
                      </>
                    }
                  </div>

                  {/* H2 section */}
                  <div style={T.nbox}>
                    <div style={{fontWeight:'500',marginBottom:'6px',display:'flex',alignItems:'center',gap:'8px'}}>
                      First H2: "{extractSections(art.body||[]).h2Title}"
                      <Badge text={`suggested: ${anal.step4?.h2Format||'paragraph'}`} type="warning" />
                    </div>
                    <div style={{fontSize:'13px',color:'var(--color-text-secondary)',marginBottom: anal.step4?.h2Format==='table'?'12px':'0'}}>
                      {anal.step4?.h2Reason}
                    </div>

                    {anal.step4?.h2Format==='table' && anal.step4?.tableHeaders?.length>0 && (
                      <>
                        <div style={{fontSize:'12px',fontWeight:'500',color:'var(--color-text-secondary)',marginBottom:'8px'}}>
                          Generated table — {anal.step4.tableTitle}
                        </div>
                        <div style={{overflowX:'auto',borderRadius:'8px',border:'0.5px solid var(--color-border-tertiary)'}}>
                          <table style={{borderCollapse:'collapse',width:'100%',minWidth:'380px',fontSize:'12px'}}>
                            <thead>
                              <tr style={{background:'#180204'}}>
                                {(anal.step4.tableHeaders||[]).map((h,i)=>(
                                  <th key={i} style={{padding:'8px 12px',fontSize:'11px',color:'rgba(255,255,255,.85)',textAlign:'left',fontWeight:'600',textTransform:'uppercase',letterSpacing:'.04em'}}>
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {(anal.step4.tableRows||[]).map((row,i)=>(
                                <tr key={i} style={{background:i%2===0?'#fff':'#FDFBF9',borderBottom:'1px solid #F0E8E2'}}>
                                  {row.map((cell,j)=>(
                                    <td key={j} style={{padding:'8px 12px',color:j===0?'#180204':'#374151',fontWeight:j===0?'600':'400'}}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <div style={{...T.ar,marginTop:'10px'}}>
                          <button onClick={copyTable}>{copied?'✓ Copied!':'Copy full HTML for Sanity'}</button>
                        </div>
                        <div style={T.note}>
                          In Sanity Studio: add an HTML embed block after the H2 heading and paste the copied HTML.
                        </div>
                      </>
                    )}

                    {anal.step4?.h2Format==='list' && (
                      <div style={T.note}>
                        Confirm the H2 content is formatted as a bullet list in Sanity Studio. Lists aid featured snippet capture better than prose paragraphs.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Re-analyze footer */}
              <div style={{marginTop:'1.5rem',borderTop:'0.5px solid var(--color-border-tertiary)',paddingTop:'1rem',textAlign:'right'}}>
                <button onClick={analyzeArticle} style={{fontSize:'13px'}}>Re-analyze ↗</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
