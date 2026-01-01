'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2, Sparkles } from 'lucide-react'
import Image from 'next/image'

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [answers, setAnswers] = useState({
    firstName: '', lastName: '', age: '', sex: '', travelWith: '',
    duration: '', month: '', flexibility: 'flexible', budget: 150,
    interests: [] as string[], dining: [] as string[],
    spending: 50, dayStart: 50, accommodation: [] as string[],
    vacationStyle: 50, outdoorCulture: 50, attractions: 50,
  })

  // Real Greece images - one for each of the 11 questions
  const quizImages = [
    '/quiz-images/q1-athens.jpg',        // Q1: Basics - Athens Parthenon
    '/quiz-images/q2-corfu.jpg',         // Q2: Duration - Corfu waterfront
    '/quiz-images/q3-crete.jpg',         // Q3: Month - Crete Knossos
    '/quiz-images/q4-delphi.jpg',        // Q4: Interests - Delphi columns
    '/quiz-images/q5-meteora.jpg',       // Q5: Dining - Meteora monastery
    '/quiz-images/q6-mykonos.jpg',       // Q6: Spending - Mykonos windmill
    '/quiz-images/q7-naxos.jpg',         // Q7: Daily rhythm - Naxos waters
    '/quiz-images/q8-paros-village.jpg', // Q8: Accommodation - Paros village
    '/quiz-images/q9-paros-island.jpg',  // Q9: Vacation style - Paros streets
    '/quiz-images/q10-rhodes.jpg',       // Q10: Attractions - Rhodes old town
    '/quiz-images/q11-santorini.jpg',    // Q11: Budget - Santorini sunset
  ]

  const questions = [
    {
      id: 0,
      title: "Let's start with the basics.",
      subtitle: 'Tell us about yourself',
      type: 'basics' as const,
      imageIndex: 0 // Athens Parthenon
    },
    {
      id: 1,
      title: 'How long is your trip to Greece?',
      type: 'duration' as const,
      imageIndex: 1, // Corfu waterfront
      options: [
        { value: '5-7', label: '5-7 days', subtitle: 'Athens + 1 island' },
        { value: '8-10', label: '8-10 days', subtitle: 'Athens + 2 islands' },
        { value: '11-14', label: '11-14 days', subtitle: 'Multi-region exploration' },
        { value: '15+', label: '15+ days', subtitle: 'Slow travel experience' },
      ],
    },
    {
      id: 2,
      title: 'When are you planning to travel?',
      type: 'month' as const,
      imageIndex: 2, // Crete Knossos
      options: [
        { value: 'April-May', label: 'Spring (April-May)', subtitle: 'Perfect weather, fewer crowds' },
        { value: 'June-August', label: 'Summer (June-August)', subtitle: 'Peak beach season' },
        { value: 'September-October', label: 'Fall (September-October)', subtitle: 'Best time to visit!' },
        { value: 'November-March', label: 'Winter (November-March)', subtitle: 'Peaceful & authentic' },
      ],
    },
    {
      id: 3,
      title: 'What are your interests?',
      subtitle: 'Select all that apply',
      type: 'interests' as const,
      imageIndex: 3, // Delphi columns
      options: [
        { value: 'beach', label: 'Beach', icon: '🏖️' },
        { value: 'hiking', label: 'Hiking', icon: '⛰️' },
        { value: 'museums', label: 'Museums', icon: '🏛️' },
        { value: 'historical', label: 'Historical Tours', icon: '🏰' },
        { value: 'adventure', label: 'Adventure Sports', icon: '🎿' },
        { value: 'theater', label: 'Theater', icon: '🎭' },
        { value: 'spa', label: 'Spa / Wellness', icon: '🧘' },
        { value: 'photography', label: 'Photography', icon: '📷' },
        { value: 'cooking', label: 'Cooking Classes', icon: '🍳' },
        { value: 'dining', label: 'Fine Dining', icon: '🍽️' },
        { value: 'nightlife', label: 'Nightlife', icon: '🎪' },
        { value: 'wine', label: 'Wine Tasting', icon: '🍷' },
        { value: 'shopping', label: 'Shopping', icon: '🛍️' },
        { value: 'water', label: 'Water Sports', icon: '🏄' },
        { value: 'cruises', label: 'Cruises', icon: '🚢' },
        { value: 'cycling', label: 'Cycling', icon: '🚴' },
      ],
    },
    {
      id: 4,
      title: 'What type of dining experiences do you usually look for?',
      subtitle: 'Select all that apply',
      type: 'dining' as const,
      imageIndex: 4, // Meteora monastery
      options: [
        { value: 'fine', label: 'Fine Dining & Gourmet', icon: '🍽️' },
        { value: 'street', label: 'Local Street Food', icon: '🌮' },
        { value: 'cafes', label: 'Cafes/Bistros', icon: '☕' },
        { value: 'family', label: 'Family Restaurants', icon: '🏠' },
        { value: 'vegan', label: 'Vegetarian / Vegan Eateries', icon: '🥗' },
        { value: 'trucks', label: 'Food Trucks', icon: '🚚' },
        { value: 'ethnic', label: 'Ethnic Cuisine', icon: '🍜' },
        { value: 'farm', label: 'Farm-to-Table', icon: '🌾' },
        { value: 'casual', label: 'Fast Casual', icon: '🍔' },
        { value: 'tavern', label: 'Pub / Tavern Food', icon: '🍺' },
        { value: 'bakery', label: 'Bakeries', icon: '🥐' },
        { value: 'coffee', label: 'Coffee Shops', icon: '☕' },
      ],
    },
    {
      id: 5,
      title: 'Travel spending style?',
      type: 'sliders' as const,
      imageIndex: 5, // Mykonos windmill
      sliders: [
        {
          id: 'spending',
          question: "What best describes your travel spending habits?",
          leftLabel: "Budget conscious",
          rightLabel: "Luxurious",
          centerLabel: "Flexible budget"
        },
      ]
    },
    {
      id: 6,
      title: 'Daily rhythm preference?',
      type: 'sliders' as const,
      imageIndex: 6, // Naxos crystal waters
      sliders: [
        {
          id: 'dayStart',
          question: "Would you rather get an early start or stay out late?",
          leftLabel: "Early bird",
          rightLabel: "Night owl",
          centerLabel: "All day long"
        }
      ]
    },
    {
      id: 7,
      title: "What's your usual accommodation style?",
      subtitle: 'Select all that apply',
      type: 'accommodation' as const,
      imageIndex: 7, // Paros village
      options: [
        { value: 'luxury', label: 'Luxury Hotels', icon: '✨' },
        { value: 'boutique', label: 'Boutique Hotels', icon: '🏨' },
        { value: 'bnb', label: 'Bed & Breakfast', icon: '🏡' },
        { value: 'budget', label: 'Budget-friendly Hotels', icon: '💰' },
        { value: 'hostels', label: 'Hostels', icon: '🛏️' },
        { value: 'camping', label: 'Camping Grounds', icon: '⛺' },
        { value: 'eco', label: 'Eco-lodges', icon: '🌿' },
        { value: 'inns', label: 'Inns', icon: '🏘️' },
        { value: 'resorts', label: 'Resorts', icon: '🏖️' },
        { value: 'motels', label: 'Motels', icon: '🛣️' },
        { value: 'rentals', label: 'Vacation Rentals', icon: '🏠' },
      ],
    },
    {
      id: 8,
      title: 'Vacation vibe?',
      type: 'sliders' as const,
      imageIndex: 8, // Paros island streets
      sliders: [
        {
          id: 'vacationStyle',
          question: "Is your ideal vacation day adventurous or relaxing?",
          leftLabel: "Adventurous",
          rightLabel: "Relaxing",
          centerLabel: "Balanced"
        },
        {
          id: 'outdoorCulture',
          question: "Prefer exploring nature or cultural experiences?",
          leftLabel: "Nature",
          rightLabel: "Culture",
          centerLabel: "No preference"
        }
      ]
    },
    {
      id: 9,
      title: 'Attractions preference?',
      type: 'sliders' as const,
      imageIndex: 9, // Rhodes old town
      sliders: [
        {
          id: 'attractions',
          question: "Do you prefer popular attractions or hidden gems?",
          leftLabel: "Popular spots",
          rightLabel: "Hidden gems",
          centerLabel: "Mix of both"
        }
      ]
    },
    {
      id: 10,
      title: "What's your daily budget?",
      subtitle: 'Per person, per day',
      type: 'budget' as const,
      imageIndex: 10, // Santorini sunset
    },
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
        if (!data.itinerary) {
          alert('AI generation failed. Please try again.')
          setIsGenerating(false)
          return
        }
        
        localStorage.setItem(`itinerary-${data.id}`, JSON.stringify(data))
        router.push(`/results/${data.id}`)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        alert(`Error: ${errorMessage}`)
        setIsGenerating(false)
      }
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push('/')
    }
  }

  const toggleMultiSelect = (field: 'interests' | 'dining' | 'accommodation', value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(i => i !== value)
        : [...prev[field], value]
    }))
  }

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Image (Light blue-grey background with Greece image) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{background: '#DCE6FF'}}>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          {/* Real Greece images */}
          <div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={quizImages[currentQuestion.imageIndex]}
              alt={`Greece destination ${currentStep + 1}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-white/20 text-6xl">✨</div>
        <div className="absolute bottom-10 right-10 text-white/20 text-6xl">🌊</div>
      </div>

      {/* Right Side - Quiz Form (Scrollable) */}
      <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
        <div className="min-h-full flex flex-col">
          {/* Content */}
          <div className="flex-1 p-8 lg:p-12 max-w-2xl mx-auto w-full">
            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Question {currentStep + 1} of {questions.length}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round(((currentStep + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full transition-all duration-300 rounded-full"
                  style={{ 
                    width: `${((currentStep + 1) / questions.length) * 100}%`,
                    background: '#FF7CE6'
                  }}
                />
              </div>
            </div>

            {/* Question Title */}
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2" style={{fontFamily: 'Space Grotesk, sans-serif'}}>
              {currentQuestion.title}
            </h1>
            
            {currentQuestion.subtitle && (
              <p className="text-base text-gray-600 mb-8">{currentQuestion.subtitle}</p>
            )}

            {/* Question Content */}
            <div className="space-y-6 mb-12">
              {/* Basics Form */}
              {currentQuestion.type === 'basics' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">First name</label>
                      <input
                        type="text"
                        placeholder="Panagiotis"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none text-base transition-colors"
                        value={answers.firstName}
                        onChange={(e) => setAnswers({...answers, firstName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Last name</label>
                      <input
                        type="text"
                        placeholder="Bamp"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none text-base transition-colors"
                        value={answers.lastName}
                        onChange={(e) => setAnswers({...answers, lastName: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                      <input
                        type="number"
                        placeholder="50"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gray-900 focus:outline-none text-base transition-colors"
                        value={answers.age}
                        onChange={(e) => setAnswers({...answers, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Sex</label>
                      <div className="flex space-x-2">
                        {['Male', 'Female', 'Other'].map(option => (
                          <button
                            key={option}
                            onClick={() => setAnswers({...answers, sex: option})}
                            className={`flex-1 px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                              answers.sex === option
                                ? 'border-gray-900 bg-gray-900 text-white'
                                : 'border-gray-200 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Who do you typically travel with?</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Solo', 'Spouse', 'Family', 'Friends'].map(option => (
                        <button
                          key={option}
                          onClick={() => setAnswers({...answers, travelWith: option})}
                          className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                            answers.travelWith === option
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Single Select Options */}
              {(currentQuestion.type === 'duration' || currentQuestion.type === 'month') && (
                <div className="space-y-3">
                  {currentQuestion.options?.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setAnswers({
                        ...answers, 
                        [currentQuestion.type === 'duration' ? 'duration' : 'month']: option.value
                      })}
                      className={`w-full p-5 rounded-xl text-left font-medium transition-all border-2 ${
                        (currentQuestion.type === 'duration' ? answers.duration : answers.month) === option.value
                          ? 'border-gray-900 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-lg font-bold text-gray-900">{option.label}</div>
                      {option.subtitle && (
                        <div className="text-sm text-gray-500 mt-1">{option.subtitle}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Multi-Select */}
              {(currentQuestion.type === 'interests' || currentQuestion.type === 'dining' || currentQuestion.type === 'accommodation') && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {currentQuestion.options?.map(option => (
                    <button
                      key={option.value}
                      onClick={() => toggleMultiSelect(currentQuestion.type as any, option.value)}
                      className={`p-3 rounded-xl text-center transition-all border-2 font-medium text-sm ${
                        answers[currentQuestion.type].includes(option.value)
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-1">
                        {option.icon && <span className="text-lg">{option.icon}</span>}
                        <span>{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Sliders */}
              {currentQuestion.type === 'sliders' && (
                <div className="space-y-10">
                  {currentQuestion.sliders?.map(slider => (
                    <div key={slider.id}>
                      <p className="text-base font-medium text-gray-900 mb-4">{slider.question}</p>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={answers[slider.id as keyof typeof answers] as number}
                        onChange={(e) => setAnswers({...answers, [slider.id]: parseInt(e.target.value)})}
                        className="w-full h-2 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #FF7CE6 0%, #FF7CE6 ${answers[slider.id as keyof typeof answers]}%, #E5E7EB ${answers[slider.id as keyof typeof answers]}%, #E5E7EB 100%)`
                        }}
                      />
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-600">{slider.leftLabel}</span>
                        <span className="text-sm text-gray-500 italic">{slider.centerLabel}</span>
                        <span className="text-sm text-gray-600">{slider.rightLabel}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Budget Slider */}
              {currentQuestion.type === 'budget' && (
                <div className="mt-8">
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={answers.budget}
                    onChange={(e) => setAnswers({...answers, budget: parseInt(e.target.value)})}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer mb-6"
                    style={{
                      background: `linear-gradient(to right, #FF7CE6 0%, #FF7CE6 ${((answers.budget - 50) / 450) * 100}%, #E5E7EB ${((answers.budget - 50) / 450) * 100}%, #E5E7EB 100%)`
                    }}
                  />
                  <div className="text-center mb-4">
                    <div className="text-6xl font-black mb-2" style={{color: '#FF7CE6'}}>
                      €{answers.budget}
                    </div>
                    <div className="text-gray-600">per day</div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>€50</span>
                    <span>€500+</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Navigation - Fixed */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6 lg:p-8">
            <div className="max-w-2xl mx-auto flex justify-between items-center">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="text-gray-600 hover:text-gray-900 font-medium transition"
                >
                  ← Back
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleNext}
                disabled={isGenerating}
                className="px-10 py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all disabled:opacity-50 flex items-center space-x-2 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : currentStep === questions.length - 1 ? (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Trip</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FF7CE6;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(255, 124, 230, 0.4);
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FF7CE6;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(255, 124, 230, 0.4);
          border: none;
        }
      `}</style>
    </div>
  )
}
