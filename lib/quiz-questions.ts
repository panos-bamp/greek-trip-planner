export interface QuizQuestion {
  id: string
  type: 'select' | 'multi-select' | 'slider' | 'text'
  question: string
  description?: string
  options?: Array<{
    value: string
    label: string
    icon?: string
  }>
  sliderConfig?: {
    min: number
    max: number
    step: number
    leftLabel: string
    rightLabel: string
    centerLabel?: string
  }
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'basics',
    type: 'select',
    question: "Let's start with the basics.",
    description: 'Tell us about yourself.',
    options: [] // This will be a form with name, age, travel companion
  },
  {
    id: 'interests',
    type: 'multi-select',
    question: 'What are your interests or favorite things to do while traveling?',
    description: 'Select any of the following or add your own.',
    options: [
      { value: 'beach', label: 'Beach', icon: '🏖️' },
      { value: 'hiking', label: 'Hiking', icon: '🥾' },
      { value: 'adventure-sports', label: 'Adventure Sports', icon: '🎿' },
      { value: 'theater', label: 'Theater', icon: '🎭' },
      { value: 'museums', label: 'Museums', icon: '🏛️' },
      { value: 'historical-tours', label: 'Historical Tours', icon: '🏰' },
      { value: 'spa-wellness', label: 'Spa / Wellness', icon: '💆' },
      { value: 'photography', label: 'Photography', icon: '📷' },
      { value: 'cooking-classes', label: 'Cooking Classes', icon: '👨‍🍳' },
      { value: 'fine-dining', label: 'Fine Dining', icon: '🍽️' },
      { value: 'nightlife', label: 'Nightlife', icon: '🎪' },
      { value: 'wine-tasting', label: 'Wine Tasting', icon: '🍷' },
      { value: 'shopping', label: 'Shopping', icon: '🛍️' },
      { value: 'cruises', label: 'Cruises', icon: '🚢' },
      { value: 'water-sports', label: 'Water Sports', icon: '🏄' },
      { value: 'cycling', label: 'Cycling', icon: '🚴' },
    ]
  },
  {
    id: 'dining',
    type: 'multi-select',
    question: 'What type of dining experiences do you usually look for?',
    description: 'Select any of the following or add your own.',
    options: [
      { value: 'fine-dining', label: 'Fine Dining & Gourmet', icon: '🍽️' },
      { value: 'local-street-food', label: 'Local Street Food', icon: '🌮' },
      { value: 'cafes-bistros', label: 'Cafes/Bistros', icon: '☕' },
      { value: 'family-restaurants', label: 'Family Restaurants', icon: '👨‍👩‍👧' },
      { value: 'vegetarian-vegan', label: 'Vegetarian / Vegan Eateries', icon: '🥗' },
      { value: 'food-trucks', label: 'Food Trucks', icon: '🚚' },
      { value: 'ethnic-cuisine', label: 'Ethnic Cuisine', icon: '🍜' },
      { value: 'farm-to-table', label: 'Farm-to-Table', icon: '🌾' },
      { value: 'fast-casual', label: 'Fast Casual', icon: '🍔' },
      { value: 'pub-tavern', label: 'Pub / Tavern Food', icon: '🍺' },
      { value: 'bakeries', label: 'Bakeries', icon: '🥐' },
      { value: 'coffee-shops', label: 'Coffee Shops', icon: '☕' },
    ]
  },
  {
    id: 'preferences',
    type: 'slider',
    question: 'What do you like to do?',
    description: 'What best describes your travel spending habits?',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 1,
      leftLabel: '💰 Budget conscious',
      rightLabel: '💎 Luxurious',
      centerLabel: 'Flexible budget'
    }
  },
  {
    id: 'accommodation',
    type: 'multi-select',
    question: "What's your usual accommodation style?",
    description: 'Select any of the following or add your own.',
    options: [
      { value: 'luxury-hotels', label: 'Luxury Hotels', icon: '🏨' },
      { value: 'boutique-hotels', label: 'Boutique Hotels', icon: '✨' },
      { value: 'bed-breakfast', label: 'Bed & Breakfast', icon: '🏡' },
      { value: 'budget-friendly', label: 'Budget-friendly Hotels', icon: '🏨' },
      { value: 'hostels', label: 'Hostels', icon: '🛏️' },
      { value: 'camping', label: 'Camping Grounds', icon: '⛺' },
      { value: 'eco-lodges', label: 'Eco-lodges', icon: '🌿' },
      { value: 'inns', label: 'Inns', icon: '🏠' },
      { value: 'resorts', label: 'Resorts', icon: '🏖️' },
      { value: 'motels', label: 'Motels', icon: '🚗' },
      { value: 'vacation-rentals', label: 'Vacation Rentals', icon: '🏘️' },
    ]
  },
  {
    id: 'vacation-style',
    type: 'slider',
    question: 'Is your ideal vacation day an exhilarating adventure or a relaxing break?',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 1,
      leftLabel: '🏃 Adventurous',
      rightLabel: '🧘 Relaxing',
      centerLabel: 'Enjoy my chill time'
    }
  },
  {
    id: 'outdoor-culture',
    type: 'slider',
    question: 'Would you rather explore the great outdoors or pursue a cultural experience?',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 1,
      leftLabel: '⛰️ Nature',
      rightLabel: '🏛️ Culture',
      centerLabel: 'No preference'
    }
  },
  {
    id: 'attractions',
    type: 'slider',
    question: 'In a new place, do you prefer to visit popular attractions or discover hidden gems?',
    sliderConfig: {
      min: 0,
      max: 100,
      step: 1,
      leftLabel: '🗺️ Popular spots',
      rightLabel: '💎 Hidden gems',
      centerLabel: 'Mix of both'
    }
  },
]
