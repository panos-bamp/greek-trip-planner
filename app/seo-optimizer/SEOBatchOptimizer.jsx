import { useState, useRef } from "react"

const PID = 'puhk8qa7'
const DS  = 'production'
const VER = 'v2021-06-07'
const BASE = `https://${PID}.api.sanity.io/${VER}/data`

// ── helpers ──────────────────────────────────────────────────────────────────

function wc(s){ return (s||'').trim().split(/\s+/).filter(Boolean).length }
function rk(){ return Math.random().toString(36).slice(2,9) }

function slugify(text){
  return (text||'').toLowerCase()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .replace(/^-|-$/g,'')
}

function extractSections(body=[]){
  let intro=[], h2Title='', h2Paras=[], h2List=[], found=false
  for(const b of body){
    if(b._type!=='block') continue
    const text=(b.children||[]).map(c=>c.text||'').join('')
    if(!text.trim()) continue
    if(!found){
      if(b.style==='h2'){ found=true; h2Title=text }
      else if(b.style==='normal') intro.push(text)
    } else {
      if(b.style==='h2') break
      if(b.listItem) h2List.push(text)
      else if(b.style==='normal') h2Paras.push(text)
    }
  }
  return { intro, h2Title, h2Paras, h2List }
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

function buildPrompt(art){
  const sec      = extractSections(art.body||[])
  const headings = extractHeadings(art.body||[])
  const mainImageUrl = art.mainImage?.asset?.url||''
  const faqs     = art.faqSchema?.faqs||[]
  const enabled  = []
  if(art.faqSchema?.enabled)      enabled.push('FAQ')
  if(art.reviewSchema?.enabled)   enabled.push('Review')
  if(art.itemListSchema?.enabled) enabled.push('ItemList')
  if(art.howToSchema?.enabled)    enabled.push('HowTo')
  if(art.placeSchema?.enabled)    enabled.push('Place')

  return `You are a senior SEO consultant for greektriplanner.me. Analyze and return ONLY valid JSON — no prose, no markdown fences.

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
Intro: ${sec.intro.join(' ').substring(0,380)}
First H2: "${sec.h2Title}"
H2 paragraphs: ${sec.h2Paras.join(' ').substring(0,300)}
H2 list items: ${sec.h2List.slice(0,8).join(' | ')}
All headings (use these anchors for ItemList URLs): ${JSON.stringify(headings.map(h=>({level:h.level,text:h.text,anchor:h.anchor})))}
Featured image URL: ${mainImageUrl||'(none)'}
Existing ItemList items (check and fix URLs if invalid): ${JSON.stringify((art.itemListSchema?.items||[]).map(it=>({position:it.position,name:it.name,url:it.url})))}
FAQs: ${JSON.stringify(faqs.map(f=>({_key:f._key,q:f.question,a:f.answer,words:wc(f.answer)})))}

STRICT RULES:
1. metaTitle: max 60 chars (hard limit). Use exact keyword phrase, power word, year if recency matters (current year is 2026 — never use 2024 or 2025), [brackets] for extras. Never clickbait.
2. metaDescription: 105-155 chars. NO newlines. Lead with direct answer or strongest benefit. Include keyword naturally. Action verb. Power word if fits. No filler phrases. Sound like a knowledgeable local expert.
3. excerpt: 40-60 words. Give a direct answer to the search intent immediately. Only use "Yes."/"No." if the title is an explicit yes/no question. For how-to, list, guide, or comparison intents open with the strongest factual sentence directly. Plain text, no markdown.
4. articleType: always "Article" — this is the correct schema.org @type.
5. FAQs: trim each existing answer to ≤55 words. changed:true only if actually trimmed.
   IMPORTANT — faqStatus (FAQ schema must be enabled on ALL posts):
   - If faqSchema.enabled is false OR question count is 0: generate exactly 3 relevant Q&A pairs. Answers max 55 words, direct answer first.
   - Set faqStatus.enabled:false if disabled, faqStatus.hasQuestions:false if empty.
6. Schema: only recommend schemas NOT in active schemas. best-of→ItemList, itinerary/planning-tips→HowTo, destination-guide→Place, things-to-do→ItemList. If all covered, type:"none".
   Populate ALL data fields:
   - ItemList: include ALL items found — never truncate the list. Each item URL: take the heading anchor from "All headings" (h2 or h3) and build url as "/blog/SLUG#ANCHOR" where SLUG is the article's slug.current above. The url must start with exactly /blog/ — one /blog/ segment only, never /blog/blog/. Never invent anchors.
     ALSO check "Existing ItemList items": fix any invalid URL (bare domain, double /blog/blog/, or mismatched anchor). Return all corrected items in itemListData and set schema.type to "ItemList" if fixes are needed.
   - HowTo: name, description, totalTime(ISO8601), estimatedCost, steps[]{name,text}, supply[]
   - Place: name, description, address, latitude, longitude, image: use Featured image URL if available, telephone:"", url:""
   - Review: itemReviewed{type,name,image: use Featured image URL if available,address,priceRange}, rating{ratingValue:4.5,bestRating:5,worstRating:1}, reviewBody
7. step4.introOk: false if intro does NOT start with a direct answer. If false, write newIntro (1-3 sentences, direct answer first).
8. step4.h2Format: "table" only if H2 has 3+ comparable items better as columns. If "table": tableTitle, tableDescription, tableHeaders(2-4 cols), tableRows(real data).

Return ONLY:
{"metaTitle":"","metaTitle_reason":"","metaDescription":"","metaDescription_reason":"","excerpt":"","excerpt_reason":"","articleType":"Article","faqs":[{"_key":"","question":"","answer":"","changed":false}],"faqStatus":{"enabled":true,"hasQuestions":true,"suggestedFaqs":[{"question":"","answer":""},{"question":"","answer":""},{"question":"","answer":""}]},"schema":{"type":"none","reason":"","itemListData":{"name":"","description":"","items":[{"position":1,"name":"","url":"","image":"","description":""}]},"howToData":{"name":"","description":"","totalTime":"","estimatedCost":"","steps":[{"name":"","text":""}],"supply":[]},"placeData":{"name":"","description":"","address":"","latitude":0,"longitude":0,"image":"","telephone":"","url":""},"reviewData":{"itemReviewed":{"type":"Place","name":"","image":"","address":"","priceRange":""},"rating":{"ratingValue":4.5,"bestRating":5,"worstRating":1},"reviewBody":""}},"step4":{"introOk":true,"newIntro":"","h2Format":"paragraph","h2Reason":"","tableTitle":"","tableDescription":"","tableHeaders":[],"tableRows":[]}}`
}

function parseAIResponse(text){
  const match = text.match(/\{[\s\S]*\}/)
  if(!match) throw new Error('No JSON in response')
  const clean = match[0]
    .replace(/[\r\n]+/g,' ')
    .replace(/([^\\])\\n/g,'$1 ')
    .replace(/\t/g,' ')
  try{ return JSON.parse(clean) }
  catch{
    const safe = clean
      .replace(/"answer"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"answer":""')
      .replace(/"reviewBody"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"reviewBody":""')
      .replace(/"newIntro"\s*:\s*"[^"]*(?:[^\\]")[^"]*"/g,'"newIntro":""')
    return JSON.parse(safe)
  }
}

function buildPatch(art, anal){
  const set = {}

  // SEO fields + articleType
  if(anal.metaTitle)       set.metaTitle       = anal.metaTitle
  if(anal.metaDescription) set.metaDescription = anal.metaDescription
  if(anal.excerpt)         set.excerpt         = anal.excerpt
  set['articleSchema.articleType'] = 'Article'

  // FAQ trims
  const changedFaqs = (anal.faqs||[]).filter(f=>f.changed)
  if(changedFaqs.length){
    set['faqSchema.faqs'] = anal.faqs.map((f,i)=>({
      _type:'object', _key:f._key||`faq${i}${Date.now()}`,
      question:f.question, answer:f.answer
    }))
  }

  // FAQ fix — enable + add questions if missing
  const fs = anal.faqStatus
  if(!fs?.enabled || !fs?.hasQuestions){
    set['faqSchema.enabled'] = true
    if(!fs?.hasQuestions && fs?.suggestedFaqs?.length){
      set['faqSchema.faqs'] = fs.suggestedFaqs.map(f=>({
        _type:'object', _key:rk(), question:f.question, answer:f.answer
      }))
    }
  }

  // Schema
  const t = anal.schema?.type
  const mainImg = art.mainImage?.asset?.url||''
  if(t && t!=='none'){
    if(t==='ItemList'){
      const d=anal.schema.itemListData||{}
      set['itemListSchema.enabled']=true
      if(d.name)        set['itemListSchema.name']=d.name
      if(d.description) set['itemListSchema.description']=d.description
      if(d.items?.length) set['itemListSchema.items']=d.items.map((it,i)=>({
        _type:'object',_key:rk(),
        position:it.position||i+1, name:it.name||'',
        url:it.url||'', image:it.image||'', description:it.description||''
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
      set['placeSchema.enabled']=true
      set['placeSchema.places']=[{
        _type:'object',_key:rk(),
        name:d.name||'', description:d.description||'', address:d.address||'',
        latitude:d.latitude||0, longitude:d.longitude||0,
        image:d.image||mainImg, telephone:d.telephone||'', url:d.url||''
      }]
    }
    if(t==='Review'){
      const d=anal.schema.reviewData||{}
      set['reviewSchema.enabled']=true
      if(d.itemReviewed){
        set['reviewSchema.itemReviewed']={
          ...d.itemReviewed,
          image: d.itemReviewed.image||mainImg
        }
      }
      if(d.rating)     set['reviewSchema.rating']=d.rating
      if(d.reviewBody) set['reviewSchema.reviewBody']=d.reviewBody
    }
  }

  return set
}

function summarizeChanges(art, anal){
  const changes = []
  if(anal.metaTitle)       changes.push('title')
  if(anal.metaDescription) changes.push('description')
  if(anal.excerpt)         changes.push('excerpt')
  const changedFaqs=(anal.faqs||[]).filter(f=>f.changed)
  if(changedFaqs.length)   changes.push(`${changedFaqs.length} FAQ trimmed`)
  const fs=anal.faqStatus
  if(!fs?.enabled)         changes.push('FAQ enabled')
  if(!fs?.hasQuestions)    changes.push('FAQ questions added')
  const t=anal.schema?.type
  if(t==='ItemList'){
    changes.push(art.itemListSchema?.enabled ? 'ItemList URLs fixed' : 'ItemList schema')
  } else if(t&&t!=='none') changes.push(`${t} schema`)
  if(!anal.step4?.introOk) changes.push('intro inserted')
  return changes
}

// ── component ─────────────────────────────────────────────────────────────────

export default function SEOBatchOptimizer(){
  const [token,    setToken]    = useState('')
  const [articles, setArticles] = useState([])
  const [selected, setSelected] = useState(new Set())
  const [results,  setResults]  = useState({})
  const [running,  setRunning]  = useState(false)
  const [loadMsg,  setLoadMsg]  = useState('')
  const [loadErr,  setLoadErr]  = useState('')
  const stopRef = useRef(false)

  const hdrs = { Authorization:`Bearer ${token}`, 'Content-Type':'application/json' }

  async function loadArticles(){
    if(!token){ setLoadErr('Enter your Sanity write token first'); return }
    setLoadErr(''); setLoadMsg('Loading…')
    try{
      const q=encodeURIComponent(`*[_type=="post"]|order(publishedAt desc){_id,title,slug,postType,metaTitle}`)
      const r=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
      const d=await r.json()
      if(d.error) throw new Error(d.error.description)
      setArticles(d.result||[])
      setSelected(new Set((d.result||[]).map(a=>a._id)))
      setLoadMsg('')
    }catch(e){ setLoadErr(e.message); setLoadMsg('') }
  }

  function toggleAll(){
    if(selected.size===articles.length) setSelected(new Set())
    else setSelected(new Set(articles.map(a=>a._id)))
  }

  function toggle(id){
    setSelected(p=>{ const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n })
  }

  async function fetchFull(id){
    const q=encodeURIComponent(`*[_id=="${id}"][0]{_id,title,slug,metaTitle,metaDescription,excerpt,body[0...120],mainImage{asset->{url}},faqSchema{enabled,faqs[]{_key,question,answer}},postType,articleSchema,reviewSchema{enabled},itemListSchema{enabled,name,description,items[]{_key,position,name,url,image,description}},howToSchema{enabled},placeSchema{enabled}}`)
    const r=await fetch(`${BASE}/query/${DS}?query=${q}`,{headers:{Authorization:`Bearer ${token}`}})
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
    return d.result
  }

  async function sanityPatch(id, set){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id,set}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  async function sanityInsert(id, before, items){
    const r=await fetch(`${BASE}/mutate/${DS}`,{
      method:'POST', headers:hdrs,
      body:JSON.stringify({mutations:[{patch:{id,insert:{before,items}}}]})
    })
    const d=await r.json()
    if(d.error) throw new Error(d.error.description)
  }

  async function processOne(id){
    setResults(p=>({...p,[id]:{status:'running',changes:[],error:''}}))
    try{
      const art    = await fetchFull(id)
      const prompt = buildPrompt(art)
      const r      = await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})})
      const data   = await r.json()
      const text   = data.content?.[0]?.text||''
      if(data.error) throw new Error(data.error.message||'API error')
      const anal   = parseAIResponse(text)
      const set    = buildPatch(art, anal)
      if(Object.keys(set).length) await sanityPatch(id, set)
      if(!anal.step4?.introOk && anal.step4?.newIntro)
        await sanityInsert(id, 'body[0]', [makeBlock(anal.step4.newIntro)])
      const changes = summarizeChanges(art, anal)
      setResults(p=>({...p,[id]:{status:'done',changes,error:'',anal}}))
    }catch(e){
      setResults(p=>({...p,[id]:{status:'error',changes:[],error:e.message,anal:null}}))
    }
  }

  async function runBatch(){
    if(!token){ setLoadErr('Enter your Sanity write token first'); return }
    setLoadErr('')
    stopRef.current = false
    setRunning(true)
    setResults({})
    const queue = articles.filter(a=>selected.has(a._id))
    for(const art of queue){
      if(stopRef.current) break
      await processOne(art._id)
      await new Promise(res=>setTimeout(res,1500))
    }
    setRunning(false)
  }

  function stop(){ stopRef.current=true }

  const total    = articles.filter(a=>selected.has(a._id)).length
  const done     = Object.values(results).filter(r=>r.status==='done').length
  const errors   = Object.values(results).filter(r=>r.status==='error').length
  const progress = total>0 ? Math.round(((done+errors)/total)*100) : 0

  const T={
    wrap:  {fontFamily:'var(--font-sans)',fontSize:'14px',color:'var(--color-text-primary)'},
    hdr:   {borderBottom:'0.5px solid var(--color-border-tertiary)',padding:'1rem 1.25rem .75rem'},
    cfg:   {padding:'.75rem 1.25rem',borderBottom:'0.5px solid var(--color-border-tertiary)',display:'flex',gap:'8px',alignItems:'flex-end',flexWrap:'wrap'},
    body:  {display:'flex',minHeight:'500px'},
    sb:    {width:'240px',flexShrink:0,borderRight:'0.5px solid var(--color-border-tertiary)',display:'flex',flexDirection:'column'},
    main:  {flex:1,padding:'1rem 1.25rem',overflowY:'auto',maxHeight:'600px'},
    row:   {display:'flex',alignItems:'center',gap:'8px',padding:'6px 12px',borderBottom:'0.5px solid var(--color-border-tertiary)',fontSize:'13px',cursor:'pointer'},
    badge: (type)=>({fontSize:'11px',padding:'2px 7px',borderRadius:'20px',flexShrink:0,whiteSpace:'nowrap',background:`var(--color-background-${type})`,color:`var(--color-text-${type})`}),
  }

  const statusIcon = s => s==='done'?'✓':s==='error'?'✗':s==='running'?'…':'○'
  const statusType = s => s==='done'?'success':s==='error'?'danger':s==='running'?'warning':'secondary'

  return (
    <div style={T.wrap}>
      <div style={T.hdr}>
        <p style={{fontSize:'18px',fontWeight:'500',margin:'0 0 4px'}}>SEO Batch Optimizer</p>
        <p style={{fontSize:'13px',color:'var(--color-text-secondary)',margin:0}}>
          Select articles → run → all changes applied automatically to Sanity
        </p>
      </div>

      <div style={T.cfg}>
        <div style={{flex:1,minWidth:'180px'}}>
          <label style={{fontSize:'12px',color:'var(--color-text-secondary)',display:'block',marginBottom:'4px'}}>Sanity write token</label>
          <input type="password" placeholder="sk-…" value={token} onChange={e=>setToken(e.target.value)} style={{width:'100%',boxSizing:'border-box'}} />
        </div>
        <button onClick={loadArticles} disabled={running||!token}>{loadMsg||'Load articles'}</button>
      </div>

      {loadErr && <div style={{padding:'6px 1.25rem',fontSize:'13px',color:'var(--color-text-danger)',background:'var(--color-background-danger)'}}>{loadErr}</div>}

      <div style={T.body}>
        <div style={T.sb}>
          {articles.length>0 && (
            <div style={{padding:'8px 12px',borderBottom:'0.5px solid var(--color-border-tertiary)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <label style={{fontSize:'12px',color:'var(--color-text-secondary)',display:'flex',alignItems:'center',gap:'6px',cursor:'pointer'}}>
                <input type="checkbox" checked={selected.size===articles.length} onChange={toggleAll} />
                Select all ({selected.size}/{articles.length})
              </label>
            </div>
          )}

          <div style={{overflowY:'auto',flex:1}}>
            {articles.length===0
              ?<p style={{padding:'12px',fontSize:'13px',color:'var(--color-text-tertiary)',margin:0}}>Load articles to start</p>
              :articles.map(a=>{
                const res=results[a._id]
                const isSel=selected.has(a._id)
                return (
                  <div key={a._id} style={{...T.row,opacity:isSel?1:.45}} onClick={()=>!running&&toggle(a._id)}>
                    <input type="checkbox" checked={isSel} onChange={()=>toggle(a._id)} onClick={e=>e.stopPropagation()} disabled={running} style={{flexShrink:0}} />
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:'12px',fontWeight:'500',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                        {a.title}
                      </div>
                      <div style={{fontSize:'11px',color:'var(--color-text-tertiary)'}}>{a.postType||'—'}</div>
                    </div>
                    {res && <span style={T.badge(statusType(res.status))}>{statusIcon(res.status)}</span>}
                  </div>
                )
              })
            }
          </div>

          {articles.length>0 && (
            <div style={{padding:'10px 12px',borderTop:'0.5px solid var(--color-border-tertiary)'}}>
              {!running
                ?<button onClick={runBatch} disabled={selected.size===0} style={{width:'100%'}}>
                  Run {selected.size} article{selected.size!==1?'s':''} ↗
                </button>
                :<button onClick={stop} style={{width:'100%',background:'var(--color-background-danger)',color:'var(--color-text-danger)'}}>
                  Stop
                </button>
              }
            </div>
          )}
        </div>

        <div style={T.main}>
          {(running || done+errors>0) && total>0 && (
            <div style={{marginBottom:'1.25rem'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',color:'var(--color-text-secondary)',marginBottom:'6px'}}>
                <span>{running?`Processing… ${done+errors}/${total}`:`Done — ${done} updated, ${errors} failed`}</span>
                <span>{progress}%</span>
              </div>
              <div style={{height:'4px',background:'var(--color-background-secondary)',borderRadius:'2px',overflow:'hidden'}}>
                <div style={{height:'100%',width:`${progress}%`,background:errors>0?'var(--color-text-warning)':'var(--color-text-success)',borderRadius:'2px',transition:'width .3s'}} />
              </div>
              {running && (
                <div style={{fontSize:'12px',color:'var(--color-text-tertiary)',marginTop:'4px'}}>
                  Currently: {articles.find(a=>results[a._id]?.status==='running')?.title||'…'}
                </div>
              )}
            </div>
          )}

          {Object.keys(results).length>0 && (
            <div>
              <div style={{fontSize:'12px',fontWeight:'500',color:'var(--color-text-secondary)',textTransform:'uppercase',letterSpacing:'.05em',marginBottom:'8px'}}>Results</div>
              {articles.filter(a=>results[a._id]).map(a=>{
                const res=results[a._id]
                return (
                  <div key={a._id} style={{padding:'10px 12px',marginBottom:'6px',borderRadius:'var(--border-radius-md)',border:`0.5px solid var(--color-border-${statusType(res.status)})`,background:`var(--color-background-${statusType(res.status)})`}}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'8px'}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:'13px',fontWeight:'500',marginBottom:'3px'}}>{a.title}</div>
                        {res.status==='done' && res.changes.length>0 && (
                          <div style={{display:'flex',flexWrap:'wrap',gap:'4px',marginTop:'4px'}}>
                            {res.changes.map((c,i)=>(
                              <span key={i} style={{fontSize:'11px',padding:'1px 7px',borderRadius:'20px',background:'var(--color-background-success)',color:'var(--color-text-success)'}}>{c}</span>
                            ))}
                          </div>
                        )}
                        {res.status==='done' && res.changes.length===0 && <div style={{fontSize:'12px',color:'var(--color-text-tertiary)'}}>No changes needed</div>}
                        {res.status==='error' && <div style={{fontSize:'12px',color:'var(--color-text-danger)',marginTop:'2px'}}>{res.error}</div>}
                        {res.status==='running' && <div style={{fontSize:'12px',color:'var(--color-text-warning)'}}>Analyzing and applying…</div>}
                        {res.status==='done' && !res.anal?.step4?.introOk && (
                          <div style={{fontSize:'12px',color:'var(--color-text-tertiary)',marginTop:'4px',fontStyle:'italic'}}>⚠ New intro inserted — review in Studio</div>
                        )}
                        {res.status==='done' && res.anal?.step4?.h2Format==='table' && (
                          <div style={{fontSize:'12px',color:'var(--color-text-tertiary)',marginTop:'2px',fontStyle:'italic'}}>⚠ H2 table suggested — add HTML embed manually in Studio</div>
                        )}
                      </div>
                      <span style={{...T.badge(statusType(res.status)),fontSize:'12px'}}>
                        {res.status==='done'?'✓ applied':res.status==='error'?'✗ failed':res.status==='running'?'processing':'pending'}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {Object.keys(results).length===0 && !running && (
            <p style={{color:'var(--color-text-tertiary)',textAlign:'center',marginTop:'3rem',fontSize:'14px'}}>
              {articles.length>0
                ?`${selected.size} article${selected.size!==1?'s':''} selected. Click "Run" to start.`
                :'Load articles, select which to process, then run.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
