# 🇬🇷 AI Greek Trip Planner (GTP)

AI-powered trip planning for Greece with personalized itineraries, insider tips, and realistic logistics.

## 🚀 Quick Start

1. **Install dependencies:**
```bash
npm install
```

2. **Run development server:**
```bash
npm run dev
```

3. **Open:** [http://localhost:3000](http://localhost:3000)

## ✨ Features

- 🤖 AI-powered itinerary generation using Claude
- 🗺️ Greece-specific database (destinations, experiences, logistics)
- 💰 Budget-aware recommendations
- ⏱️ Realistic timing and ferry schedules
- 🏖️ Insider tips from local knowledge

## 🔧 Configuration

Environment variables are already configured in `.env.local`:
- Supabase connection
- Claude API key

## 📱 Pages

- `/` - Landing page with hero section
- `/quiz` - 10-question personality quiz
- `/results/[id]` - Generated itinerary display

## 🎨 Tech Stack

- **Framework:** Next.js 15 + TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **AI:** Claude (Anthropic)
- **Icons:** Lucide React

## 📊 Database Schema

Your Supabase database includes:
- `destinations` - Greek islands and cities
- `experiences` - Tours, activities, attractions
- `logistics` - Ferry routes, flights, transfers
- `accommodations` - Hotels across price tiers

## 🚢 Deployment

### To Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Add environment variables in Vercel dashboard.

## 📝 Development Status

**✅ COMPLETE:**
- Project setup
- Landing page
- Database integration
- AI client configuration
- Styling system

**🔄 IN PROGRESS:**
- Quiz flow UI
- API generation endpoint
- Results display page

Created: December 2024
