# 🪟 Windows Setup Guide - AI Greek Trip Planner

## ⚡ Quick Start (5 Minutes)

### Step 1: Extract the ZIP
- Right-click `ai-greek-trip-planner-FIXED-V2.zip`
- Click "Extract All..."
- Choose a location (e.g., `C:\Projects\`)

### Step 2: Open PowerShell
- Press `Win + X`
- Click "Windows PowerShell" or "Terminal"
- Navigate to folder:
  ```powershell
  cd C:\Projects\ai-greek-trip-planner
  ```

### Step 3: Install & Run
```powershell
npm install
npm run dev
```

### Step 4: Open Browser
Visit: http://localhost:3000

---

## ✅ What You Should See:

**Landing Page:**
- Blue gradient background (dark to light blue)
- White "Your Perfect Greece" heading
- Colored gradient text "Trip in Minutes"
- Pink "Plan My Trip" button
- Three colored feature cards

**Quiz Page:**
- Blue gradient background
- White card with questions
- Cyan progress bar at top
- Icons in multi-select questions
- Smooth sliders

---

## 🐛 Troubleshooting

### Issue: "npm is not recognized"

**Solution:** Install Node.js
1. Download from: https://nodejs.org/
2. Run installer
3. Restart PowerShell
4. Try again

---

### Issue: Colors Not Showing

**Solution 1 - Hard Refresh:**
- Press `Ctrl + Shift + R` in browser

**Solution 2 - Clear Build:**
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

**Solution 3 - Reinstall:**
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

---

### Issue: Port 3000 Already in Use

**Find what's using it:**
```powershell
netstat -ano | findstr :3000
```

**Kill the process (replace 1234 with actual PID):**
```powershell
taskkill /PID 1234 /F
```

**Or use different port:**
```powershell
npm run dev -- -p 3001
```

---

### Issue: Permission Denied

**Solution:** Run PowerShell as Administrator
1. Press `Win + X`
2. Click "Windows PowerShell (Admin)"
3. Navigate to project folder
4. Run commands

---

## 📝 Windows Commands Reference

| Task | PowerShell Command |
|------|-------------------|
| Navigate to folder | `cd C:\path\to\folder` |
| List files | `ls` or `dir` |
| Delete folder | `Remove-Item -Recurse folder` |
| Check Node version | `node -v` |
| Check npm version | `npm -v` |

---

## 🎨 Verify Colors Are Working

After running `npm run dev`, check:

1. **Landing Page** - Should have:
   - Blue gradient background
   - Colored text ("Trip in Minutes" is gradient)
   - Pink button
   - Feature cards with colored backgrounds

2. **Quiz Page** (`/quiz`) - Should have:
   - Blue gradient background
   - White rounded card
   - Cyan progress bar
   - Icons showing: 🏖️ 🥾 🏛️

3. **No Plain White** - If everything is white/gray, colors aren't loading

---

## 🚀 Deploy to Vercel (Optional)

### Step 1: Install Git
Download from: https://git-scm.com/download/win

### Step 2: Push to GitHub
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-greek-trip-planner.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Add environment variables (from `.env.local`)
6. Deploy!

---

## 💡 Tips for Windows Users

### Use PowerShell, not CMD
- PowerShell has better command support
- Closer to Unix/Mac terminals
- Makes following tutorials easier

### Install Windows Terminal (Optional)
- Modern terminal with tabs
- Download from Microsoft Store
- Better than default PowerShell

### VS Code (Recommended Editor)
- Download from: https://code.visualstudio.com/
- Open folder in VS Code
- Built-in terminal
- Better for editing code

---

## ✅ Success Checklist

Your setup is working when:
- [ ] `npm run dev` starts without errors
- [ ] Browser shows colored landing page
- [ ] "Plan My Trip" button is pink
- [ ] Quiz shows 10 questions
- [ ] Icons appear in questions 4, 5, 7
- [ ] Sliders move smoothly
- [ ] Progress bar is cyan/blue

---

## 🆘 Still Having Issues?

1. **Check Node.js version:**
   ```powershell
   node -v
   ```
   Should be v18 or higher

2. **Check if .env.local exists:**
   ```powershell
   cat .env.local
   ```
   Should show Supabase and Claude API keys

3. **Check browser console:**
   - Press F12
   - Click "Console" tab
   - Look for error messages

4. **Take screenshot and share:**
   - What you see in browser
   - Any error messages

---

**Need help? The app should work perfectly with these instructions!** 🚀
