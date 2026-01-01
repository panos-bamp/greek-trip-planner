# 🖼️ Adding Greece Images to Quiz

## 📸 **Recommended Images:**

### **Image 1: Santorini Sunset** (Question 1 - Basics)
- **URL:** https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e
- **Scene:** Iconic white buildings with blue domes
- **Vibe:** Classic Greece, romantic

### **Image 2: Paradise Beach** (Question 2 - Duration)
- **URL:** https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a
- **Scene:** Turquoise water, white sand
- **Vibe:** Relaxation, beach paradise

### **Image 3: Aegean Sunset** (Question 3 - Month/Season)
- **URL:** https://images.unsplash.com/photo-1533104816931-20fa691ff6ca
- **Scene:** Golden sunset over the sea
- **Vibe:** Timing, seasons, beauty

### **Image 4: Greek Cuisine** (Question 4 - Interests)
- **URL:** https://images.unsplash.com/photo-1544124499-58912cbddaad
- **Scene:** Traditional Greek food spread
- **Vibe:** Culture, food, experiences

### **Image 5: Ancient Athens** (Question 5 - Dining)
- **URL:** https://images.unsplash.com/photo-1555993539-1732b0258235
- **Scene:** Acropolis, Parthenon
- **Vibe:** History, culture, heritage

### **Image 6: Mykonos Windmills** (Question 6+ - Other)
- **URL:** https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a
- **Scene:** Famous white windmills
- **Vibe:** Iconic, adventure

---

## 🎨 **How to Add Images:**

### **Option 1: Using Unsplash (Free)**

1. **Download images from Unsplash:**
   - Visit the URLs above
   - Click "Download free"
   - Save with descriptive names

2. **Add to project:**
   ```cmd
   # Place images in public folder
   copy downloaded-image.jpg C:\ai-greek-trip-planner\public\greece-santorini.jpg
   copy downloaded-image.jpg C:\ai-greek-trip-planner\public\greece-beach.jpg
   # ... etc
   ```

3. **Update quiz to use real images:**
   
   Replace the placeholder gradient divs with actual images:

   ```tsx
   {/* In app/quiz/page.tsx, replace the gradient div */}
   <div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
     <Image
       src={quizImages[currentQuestion.imageIndex || 0]}
       alt="Greece scenery"
       fill
       className="object-cover"
       priority
     />
   </div>
   ```

---

### **Option 2: Using Next.js Image Component**

Update the quiz component:

```tsx
import Image from 'next/image'

// In the left side section, replace the gradient div:
<div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
  <Image
    src={`/greece-${currentStep + 1}.jpg`}
    alt="Beautiful Greece scenery"
    fill
    className="object-cover"
    priority={currentStep === 0}
  />
  
  {/* Optional overlay for better text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
  
  {/* Optional caption */}
  <div className="absolute bottom-8 left-8 text-white">
    <p className="text-3xl font-bold drop-shadow-lg">
      {currentStep === 0 && 'Santorini Sunset'}
      {currentStep === 1 && 'Paradise Beach'}
      {/* ... etc */}
    </p>
  </div>
</div>
```

---

### **Option 3: External URLs (Quick Test)**

You can use external URLs directly for testing:

```tsx
const quizImages = [
  'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
  'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200',
  'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200',
  'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=1200',
  'https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200',
  'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=1200',
]

// Then in next.config.ts, add:
images: {
  domains: ['images.unsplash.com'],
}
```

---

## 📁 **Recommended File Structure:**

```
public/
├── greece-1-santorini.jpg
├── greece-2-beach.jpg
├── greece-3-sunset.jpg
├── greece-4-food.jpg
├── greece-5-acropolis.jpg
└── greece-6-mykonos.jpg
```

---

## 🎨 **Image Specifications:**

- **Format:** JPG or WebP
- **Size:** 1920x1080 or 1600x1200
- **Aspect Ratio:** 16:9 or 4:3
- **File Size:** < 500KB (optimized)
- **Quality:** High but compressed

---

## ⚡ **Image Optimization:**

Use Next.js Image Optimization:

```tsx
<Image
  src="/greece-santorini.jpg"
  alt="Santorini sunset"
  fill
  className="object-cover"
  sizes="50vw"
  quality={85}
  priority={currentStep === 0}
/>
```

**Benefits:**
- Automatic lazy loading
- Responsive images
- WebP conversion
- Blur placeholder

---

## 🔍 **Where to Find Free Greece Images:**

1. **Unsplash:** https://unsplash.com/s/photos/greece
   - Free, high quality
   - No attribution required
   - Commercial use OK

2. **Pexels:** https://www.pexels.com/search/greece/
   - Free stock photos
   - Good selection

3. **Pixabay:** https://pixabay.com/images/search/greece/
   - Free images
   - Public domain

---

## ✅ **Quick Setup:**

```bash
# 1. Download 6 Greece images
# 2. Rename them:
#    - greece-1-santorini.jpg
#    - greece-2-beach.jpg
#    - greece-3-sunset.jpg
#    - greece-4-food.jpg
#    - greece-5-acropolis.jpg
#    - greece-6-mykonos.jpg

# 3. Place in public folder
copy *.jpg C:\ai-greek-trip-planner\public\

# 4. Update quiz component to use Image
# 5. Test with npm run dev
```

---

## 🎯 **Example Implementation:**

```tsx
// Full implementation example
<div className="relative w-full h-full max-w-2xl max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl">
  {/* Greece Image */}
  <Image
    src={`/greece-${currentStep % 6 + 1}-${['santorini', 'beach', 'sunset', 'food', 'acropolis', 'mykonos'][currentStep % 6]}.jpg`}
    alt="Greece scenery"
    fill
    className="object-cover"
    priority={currentStep === 0}
  />
  
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
  
  {/* Caption */}
  <div className="absolute bottom-10 left-10 right-10 text-white z-10">
    <h2 className="text-4xl font-black drop-shadow-2xl mb-2">
      Discover Greece
    </h2>
    <p className="text-xl opacity-90 drop-shadow-lg">
      {currentStep === 0 && 'Your perfect adventure starts here'}
      {currentStep === 1 && 'From islands to ancient wonders'}
      {/* ... */}
    </p>
  </div>
</div>
```
