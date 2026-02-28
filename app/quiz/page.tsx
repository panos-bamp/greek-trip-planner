'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, Loader2, Sparkles, MapPin } from 'lucide-react'
import Image from 'next/image'

/* ─────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────── */
type MultiField = 'interests' | 'dining' | 'accommodation' | 'specificRegions'

interface Answers {
  firstName: string
  travelWith: string
  greeceExperience: string
  duration: string
  month: string
  regionPreference: string
  specificRegions: string[]
  pace: string
  interests: string[]
  travelStyle: number
  crowdPreference: number
  accommodation: string[]
  dining: string[]
  dailyRhythm: number
  vacationVibe: number
  budget: number
}

/* ─────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────── */
export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const [answers, setAnswers] = useState<Answers>({
    firstName: '',
    travelWith: '',
    greeceExperience: '',
    duration: '',
    month: '',
    regionPreference: '',
    specificRegions: [],
    pace: '',
    interests: [],
    travelStyle: 50,
    crowdPreference: 50,
    accommodation: [],
    dining: [],
    dailyRhythm: 50,
    vacationVibe: 50,
    budget: 150,
  })

  const quizImages = [
    '/quiz-images/q1-athens.jpg',
    '/quiz-images/q2-corfu.jpg',
    '/quiz-images/q3-crete.jpg',
    '/quiz-images/q4-delphi.jpg',
    '/quiz-images/q5-meteora.jpg',
    '/quiz-images/q6-mykonos.jpg',
    '/quiz-images/q7-naxos.jpg',
    '/quiz-images/q8-paros-village.jpg',
    '/quiz-images/q9-paros-island.jpg',
    '/quiz-images/q10-rhodes.jpg',
    '/quiz-images/q11-santorini.jpg',
    '/quiz-images/q8-paros-village.jpg',
    '/quiz-images/q4-delphi.jpg',
  ]

  const getRegionOptions = () => {
    const islandRegions = [
      { value: 'cyclades', label: 'Cyclades', subtitle: 'Santorini, Mykonos, Naxos, Paros, Milos…', icon: '🏝️' },
      { value: 'dodecanese', label: 'Dodecanese', subtitle: 'Rhodes, Kos, Patmos, Symi…', icon: '🏛️' },
      { value: 'ionian', label: 'Ionian Islands', subtitle: 'Corfu, Zakynthos, Kefalonia, Lefkada…', icon: '🌊' },
      { value: 'crete', label: 'Crete', subtitle: 'Chania, Heraklion, gorges & beaches', icon: '🏔️' },
      { value: 'saronic', label: 'Saronic Gulf', subtitle: 'Hydra, Aegina, Spetses — near Athens', icon: '⛵' },
      { value: 'sporades', label: 'Sporades', subtitle: 'Skiathos, Skopelos, Alonissos', icon: '🌿' },
      { value: 'north-aegean', label: 'North Aegean', subtitle: 'Lesbos, Samos, Chios, Ikaria', icon: '🍷' },
    ]
    const mainlandRegions = [
      { value: 'peloponnese', label: 'Peloponnese', subtitle: 'Nafplio, Olympia, Monemvasia, Mani…', icon: '🏰' },
      { value: 'northern-greece', label: 'Northern Greece', subtitle: 'Thessaloniki, Zagori, Halkidiki…', icon: '⛰️' },
      { value: 'central-greece', label: 'Central Greece', subtitle: 'Meteora, Delphi, Pelion, Arachova…', icon: '🏛️' },
      { value: 'athens-attica', label: 'Athens & Attica', subtitle: 'Capital city & Cape Sounion', icon: '🏙️' },
    ]
    if (answers.regionPreference === 'islands') return islandRegions
    if (answers.regionPreference === 'mainland') return mainlandRegions
    return [...islandRegions, ...mainlandRegions]
  }

  /* ─── QUESTION DEFINITIONS ─── */
  const questions = [
    { id: 0, title: "Let's plan your Greece adventure.", subtitle: 'First, tell us a bit about yourself', type: 'basics' as const },
    {
      id: 1, title: 'Have you visited Greece before?', subtitle: 'This helps us tailor the experience', type: 'single' as const, field: 'greeceExperience',
      options: [
        { value: 'first-time', label: 'First time visiting', subtitle: "Can't wait to explore!", icon: '✨' },
        { value: 'returning', label: 'Been once or twice', subtitle: 'Ready to go deeper', icon: '🔄' },
        { value: 'frequent', label: 'Regular visitor', subtitle: 'Show me the hidden gems', icon: '🗺️' },
      ],
    },
    {
      id: 2, title: 'How long is your trip?', subtitle: 'This shapes the scope of your itinerary', type: 'single' as const, field: 'duration',
      options: [
        { value: '3-5', label: '3–5 days', subtitle: 'City break or single island', icon: '⚡' },
        { value: '6-8', label: '6–8 days', subtitle: 'Classic Greece trip', icon: '🎯' },
        { value: '9-12', label: '9–12 days', subtitle: 'In-depth exploration', icon: '🧭' },
        { value: '13+', label: '13+ days', subtitle: 'Grand tour of Greece', icon: '🌟' },
      ],
    },
    {
      id: 3, title: 'When are you traveling?', subtitle: 'Season affects ferries, crowds & weather', type: 'single' as const, field: 'month',
      options: [
        { value: 'April-May', label: 'Spring (Apr–May)', subtitle: 'Wildflowers, mild weather, fewer crowds', icon: '🌸' },
        { value: 'June-August', label: 'Summer (Jun–Aug)', subtitle: 'Peak beach season, vibrant nightlife', icon: '☀️' },
        { value: 'September-October', label: 'Early Fall (Sep–Oct)', subtitle: 'Warm seas, golden light — best time!', icon: '🍂' },
        { value: 'November-March', label: 'Winter (Nov–Mar)', subtitle: 'Peaceful, authentic, mainland focus', icon: '❄️' },
      ],
    },
    {
      id: 4, title: 'What excites you most about Greece?', subtitle: 'This guides where we send you', type: 'single' as const, field: 'regionPreference',
      options: [
        { value: 'islands', label: 'Island hopping & beaches', subtitle: 'Ferries, turquoise waters, seaside villages', icon: '🏝️' },
        { value: 'mainland', label: 'Ancient ruins & mountain villages', subtitle: 'Archaeology, gorges, traditional life', icon: '🏛️' },
        { value: 'both', label: 'Mix of islands & mainland', subtitle: 'The best of both worlds', icon: '🇬🇷' },
      ],
    },
    { id: 5, title: 'Which regions interest you?', subtitle: 'Select all that appeal — or skip for AI recommendations', type: 'multi' as const, field: 'specificRegions' as MultiField, dynamicOptions: true },
    {
      id: 6, title: "What's your travel pace?", subtitle: 'How many destinations do you want to visit?', type: 'single' as const, field: 'pace',
      options: [
        { value: 'slow', label: 'Slow & deep', subtitle: '1–2 destinations, really immerse yourself', icon: '🧘' },
        { value: 'moderate', label: 'Balanced', subtitle: '3–4 stops with time to explore each', icon: '⚖️' },
        { value: 'fast', label: 'Explorer', subtitle: '5+ stops, see as much as possible', icon: '🚀' },
      ],
    },
    {
      id: 7, title: 'What are you most looking forward to?', subtitle: 'Select all that excite you', type: 'multi' as const, field: 'interests' as MultiField,
      options: [
        { value: 'beaches', label: 'Beaches & Swimming', icon: '🏖️' },
        { value: 'archaeology', label: 'Ancient Ruins & History', icon: '🏛️' },
        { value: 'hiking', label: 'Hiking & Nature', icon: '🥾' },
        { value: 'food-wine', label: 'Food & Wine', icon: '🍷' },
        { value: 'nightlife', label: 'Nightlife & Bars', icon: '🎶' },
        { value: 'photography', label: 'Photography & Scenery', icon: '📸' },
        { value: 'sailing', label: 'Sailing & Water Sports', icon: '⛵' },
        { value: 'villages', label: 'Village Life & Culture', icon: '🏘️' },
        { value: 'monasteries', label: 'Monasteries & Heritage', icon: '⛪' },
        { value: 'wellness', label: 'Wellness & Relaxation', icon: '🧖' },
      ],
    },
    {
      id: 8, title: 'Your travel style?', subtitle: 'Help us calibrate your recommendations', type: 'sliders' as const,
      sliders: [
        { id: 'travelStyle', question: "What's your spending comfort zone?", leftLabel: 'Budget-friendly', rightLabel: 'Luxury', centerLabel: 'Mid-range' },
        { id: 'crowdPreference', question: 'Famous landmarks or hidden gems?', leftLabel: 'Popular spots', rightLabel: 'Off the beaten path', centerLabel: 'Mix of both' },
      ],
    },
    {
      id: 9, title: 'Where do you like to stay?', subtitle: 'Select all that appeal', type: 'multi' as const, field: 'accommodation' as MultiField,
      options: [
        { value: 'luxury-hotel', label: 'Luxury Hotel / Resort', icon: '🏨' },
        { value: 'boutique', label: 'Boutique Hotel', icon: '✨' },
        { value: 'guesthouse', label: 'Traditional Guesthouse', icon: '🏡' },
        { value: 'villa', label: 'Villa / Apartment', icon: '🏠' },
        { value: 'budget', label: 'Budget Hotel / Hostel', icon: '🎒' },
        { value: 'camping', label: 'Camping / Glamping', icon: '⛺' },
      ],
    },
    {
      id: 10, title: 'How do you like to eat in Greece?', subtitle: 'Select your dining preferences', type: 'multi' as const, field: 'dining' as MultiField,
      options: [
        { value: 'taverna', label: 'Traditional Tavernas', icon: '🍽️' },
        { value: 'seafood', label: 'Seafood by the Sea', icon: '🐟' },
        { value: 'fine-dining', label: 'Fine Dining', icon: '🥂' },
        { value: 'street-food', label: 'Street Food & Souvlaki', icon: '🌯' },
        { value: 'wine-ouzo', label: 'Wine & Ouzo Tastings', icon: '🍷' },
        { value: 'farm-table', label: 'Farm-to-Table', icon: '🌿' },
        { value: 'cafes', label: 'Cafés & Bakeries', icon: '☕' },
      ],
    },
    {
      id: 11, title: 'Your daily rhythm?', subtitle: 'Everyone travels differently', type: 'sliders' as const,
      sliders: [
        { id: 'dailyRhythm', question: 'Early starts or late nights?', leftLabel: 'Early bird', rightLabel: 'Night owl', centerLabel: 'Flexible' },
        { id: 'vacationVibe', question: 'Action-packed or slow & relaxed?', leftLabel: 'Active & packed', rightLabel: 'Slow & relaxed', centerLabel: 'Balanced' },
      ],
    },
    { id: 12, title: "What's your daily budget?", subtitle: 'Per person, per day (accommodation + food + activities)', type: 'budget' as const },
  ]

  const currentQuestion = questions[currentStep]

  const handleNext = async () => {
    if (currentStep === questions.length - 1) {
      setIsGenerating(true)
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(answers),
        })
        if (!response.ok) throw new Error(`API returned ${response.status}`)
        const data = await response.json()
        if (!data.itinerary) { alert('AI generation failed. Please try again.'); setIsGenerating(false); return }
        localStorage.setItem(`itinerary-${data.id}`, JSON.stringify(data))
        router.push(`/results/${data.id}`)
      } catch (error) {
        alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        setIsGenerating(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => { currentStep > 0 ? setCurrentStep(currentStep - 1) : router.push('/') }

  const toggleMulti = (field: MultiField, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter(i => i !== value)
        : [...(prev[field] as string[]), value],
    }))
  }

  const progress = ((currentStep + 1) / questions.length) * 100

  /* ─── RENDER ─── */
  return (
    <div className="h-screen flex overflow-hidden bg-[#FAF6F3]">

      {/* LEFT — Image */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-[#180204]">
        <div className="absolute inset-0">
          <Image src={quizImages[currentStep] || quizImages[0]} alt={`Greece — step ${currentStep + 1}`} fill className="object-cover opacity-80" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[#180204]/70 via-transparent to-[#180204]/30" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-10 pb-14">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-4 w-fit">
            <MapPin className="w-3.5 h-3.5 text-[#FF5635]" />
            <span className="text-white/90 text-xs font-medium tracking-wide uppercase">133 Destinations</span>
          </div>
          <h2 className="text-3xl text-white leading-tight mb-2" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
            Your personalized<br />Greece itinerary
          </h2>
          <p className="text-white/60 text-sm max-w-xs">A trip tailored to your style, pace & interests</p>
        </div>
      </div>

      {/* RIGHT — Quiz Form */}
      <div className="w-full lg:w-[55%] overflow-y-auto">
        <div className="min-h-full flex flex-col">
          <div className="flex-1 p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto w-full">

            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-[#180204]/40 font-medium">Step {currentStep + 1} of {questions.length}</span>
                <span className="text-xs text-[#180204]/40 font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-1 bg-[#E6DAD1] rounded-full overflow-hidden">
                <div className="h-full transition-all duration-500 ease-out rounded-full" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FF5635, #FF846C)' }} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#180204] mb-1.5 leading-tight" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>
              {currentQuestion.title}
            </h1>
            {currentQuestion.subtitle && <p className="text-sm text-[#180204]/50 mb-8">{currentQuestion.subtitle}</p>}

            {/* ─── QUESTION TYPES ─── */}
            <div className="space-y-6 mb-12">

              {/* BASICS */}
              {currentQuestion.type === 'basics' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-[#180204] mb-2">First name</label>
                    <input type="text" placeholder="Your name" className="w-full px-4 py-3.5 border-2 border-[#E6DAD1] rounded-xl bg-white focus:border-[#FF5635] focus:outline-none text-base transition-colors" value={answers.firstName} onChange={(e) => setAnswers({ ...answers, firstName: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#180204] mb-3">Who are you traveling with?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[{ value: 'Solo', icon: '🧑' }, { value: 'Couple', icon: '💑' }, { value: 'Family', icon: '👨‍👩‍👧‍👦' }, { value: 'Friends', icon: '👯' }, { value: 'Group', icon: '🎉' }].map(opt => (
                        <button key={opt.value} onClick={() => setAnswers({ ...answers, travelWith: opt.value })}
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all text-sm flex items-center justify-center gap-2 ${answers.travelWith === opt.value ? 'border-[#FF5635] bg-[#FF5635] text-white shadow-md' : 'border-[#E6DAD1] text-[#180204]/70 hover:border-[#FF5635]/40 bg-white'}`}>
                          <span>{opt.icon}</span><span>{opt.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SINGLE SELECT */}
              {currentQuestion.type === 'single' && (currentQuestion as any).options && (
                <div className="space-y-2.5">
                  {(currentQuestion as any).options.map((option: any) => {
                    const field = (currentQuestion as any).field as keyof Answers
                    const isSelected = answers[field] === option.value
                    return (
                      <button key={option.value} onClick={() => setAnswers({ ...answers, [field]: option.value })}
                        className={`w-full p-4 rounded-xl text-left transition-all border-2 flex items-start gap-4 ${isSelected ? 'border-[#FF5635] bg-[#FF5635]/5 shadow-sm' : 'border-[#E6DAD1] hover:border-[#FF5635]/30 bg-white'}`}>
                        <span className="text-2xl mt-0.5 flex-shrink-0">{option.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className={`text-base font-semibold ${isSelected ? 'text-[#FF5635]' : 'text-[#180204]'}`}>{option.label}</div>
                          {option.subtitle && <div className="text-sm text-[#180204]/45 mt-0.5">{option.subtitle}</div>}
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#FF5635] flex items-center justify-center flex-shrink-0 mt-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* MULTI SELECT */}
              {currentQuestion.type === 'multi' && (
                <div className="grid grid-cols-2 gap-2">
                  {((currentQuestion as any).dynamicOptions ? getRegionOptions() : ((currentQuestion as any).options || [])).map((option: any) => {
                    const field = (currentQuestion as any).field as MultiField
                    const isSelected = (answers[field] as string[]).includes(option.value)
                    return (
                      <button key={option.value} onClick={() => toggleMulti(field, option.value)}
                        className={`p-3 rounded-xl text-left transition-all border-2 ${isSelected ? 'border-[#FF5635] bg-[#FF5635]/5 shadow-sm' : 'border-[#E6DAD1] hover:border-[#FF5635]/30 bg-white'}`}>
                        <div className="flex items-center gap-2 mb-0.5">
                          {option.icon && <span className="text-lg">{option.icon}</span>}
                          <span className={`text-sm font-semibold ${isSelected ? 'text-[#FF5635]' : 'text-[#180204]'}`}>{option.label}</span>
                        </div>
                        {option.subtitle && <p className="text-xs text-[#180204]/40 mt-0.5 leading-snug">{option.subtitle}</p>}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* SLIDERS */}
              {currentQuestion.type === 'sliders' && (currentQuestion as any).sliders && (
                <div className="space-y-10">
                  {(currentQuestion as any).sliders.map((slider: any) => (
                    <div key={slider.id}>
                      <p className="text-base font-medium text-[#180204] mb-5">{slider.question}</p>
                      <input type="range" min="0" max="100" value={answers[slider.id as keyof Answers] as number}
                        onChange={(e) => setAnswers({ ...answers, [slider.id]: parseInt(e.target.value) })}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{ background: `linear-gradient(to right, #FF5635 0%, #FF5635 ${answers[slider.id as keyof Answers]}%, #E6DAD1 ${answers[slider.id as keyof Answers]}%, #E6DAD1 100%)` }} />
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-[#180204]/50">{slider.leftLabel}</span>
                        <span className="text-xs text-[#180204]/30 italic">{slider.centerLabel}</span>
                        <span className="text-xs text-[#180204]/50">{slider.rightLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* BUDGET */}
              {currentQuestion.type === 'budget' && (
                <div className="mt-4">
                  <input type="range" min="50" max="500" step="10" value={answers.budget}
                    onChange={(e) => setAnswers({ ...answers, budget: parseInt(e.target.value) })}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer mb-8"
                    style={{ background: `linear-gradient(to right, #FF5635 0%, #FF5635 ${((answers.budget - 50) / 450) * 100}%, #E6DAD1 ${((answers.budget - 50) / 450) * 100}%, #E6DAD1 100%)` }} />
                  <div className="text-center mb-6">
                    <div className="text-6xl font-bold text-[#FF5635] mb-1" style={{ fontFamily: "'DM Serif Display', Georgia, serif" }}>€{answers.budget}</div>
                    <div className="text-[#180204]/40 text-sm">per person, per day</div>
                  </div>
                  <div className="flex justify-between text-xs text-[#180204]/35"><span>€50 — Budget</span><span>€500+ — Luxury</span></div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {[{ range: '€50–100', label: 'Backpacker', desc: 'Hostels, street food, ferries' }, { range: '€100–200', label: 'Comfortable', desc: 'Mid hotels, tavernas, tours' }, { range: '€200–500', label: 'Premium', desc: 'Boutique stays, fine dining' }].map(tier => (
                      <div key={tier.label} className="p-3 bg-white rounded-xl border border-[#E6DAD1] text-center">
                        <div className="text-sm font-bold text-[#FF5635]">{tier.range}</div>
                        <div className="text-xs font-semibold text-[#180204] mt-1">{tier.label}</div>
                        <div className="text-xs text-[#180204]/40 mt-0.5">{tier.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Nav */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-[#E6DAD1] p-5 sm:p-6 lg:p-8">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
              <button onClick={handleBack} className="flex items-center gap-2 text-[#180204]/50 hover:text-[#FF5635] font-medium transition text-sm">
                <ArrowLeft className="w-4 h-4" /><span>{currentStep > 0 ? 'Back' : 'Home'}</span>
              </button>
              <button onClick={handleNext} disabled={isGenerating}
                className="px-8 sm:px-10 py-3.5 bg-[#FF5635] text-white rounded-full font-bold text-sm hover:bg-[#E03A1A] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-[#FF5635]/20 hover:shadow-xl hover:shadow-[#FF5635]/30">
                {isGenerating ? (<><Loader2 className="w-4 h-4 animate-spin" /><span>Creating your trip…</span></>) :
                  currentStep === questions.length - 1 ? (<><Sparkles className="w-4 h-4" /><span>Generate My Itinerary</span></>) :
                  (<><span>Continue</span><ArrowRight className="w-4 h-4" /></>)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb { appearance: none; width: 22px; height: 22px; border-radius: 50%; background: #FF5635; cursor: pointer; box-shadow: 0 2px 8px rgba(255,86,53,0.35); border: 3px solid white; }
        input[type='range']::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: #FF5635; cursor: pointer; box-shadow: 0 2px 8px rgba(255,86,53,0.35); border: 3px solid white; }
      `}</style>
    </div>
  )
}
