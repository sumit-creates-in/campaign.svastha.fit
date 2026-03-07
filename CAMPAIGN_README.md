# 14 Day Yoga & Fat Loss Camp - Landing Page

## 🎯 Campaign Overview

**Campaign Name:** 14 Day Yoga & Fat Loss Camp  
**Website Route:** `/14-Day-Yoga-Fat-Loss-Camp`  
**Full URL:** `https://campaign.svastha.fit/14-Day-Yoga-Fat-Loss-Camp/`  
**Price:** ₹99 (Commitment Fee)  
**Start Date:** 22 March 2026 (Sunday)  
**Orientation:** 9:00 AM (Live on Zoom)

## 🎨 Design Features

- **Clean wellness aesthetic** with yoga/nature theme
- **Light background** with green and earthy colors
- **Modern typography** and smooth animations
- **Mobile-first responsive design**
- **High conversion layout** optimized for registrations

## 📋 Page Sections

### 1. Hero Section
- Eye-catching headline with transformation promise
- Key highlights (₹99 fee, start date, orientation time)
- Dual CTA buttons (primary and secondary)
- **Live countdown timer** to camp start date
- Calming gradient background

### 2. Benefits Section
- 5 key benefits with icons:
  - Burn fat naturally through yoga
  - Feel lighter and more energetic
  - Improve flexibility and stamina
  - Learn simple habits to lose weight faster
  - Build discipline and consistency
- Footer tagline emphasizing simplicity

### 3. Why Different Section
- Problem-solution comparison layout
- Lists common fitness journey problems
- Highlights camp's unique solution approach

### 4. Batches Section
- **Morning batches:** 5:30 AM, 6:30 AM, 7:30 AM, 8:30 AM, 9:30 AM
- **Evening batches:** 5:30 PM, 6:30 PM
- Live on Zoom indicator
- Recording availability notice

### 5. Mentors Section
- **Lead Mentor:** Sumit Sharma (Certified Dietitian, Yoga Teacher, Wellness Coach)
- **Yoga Coaches:**
  - Karishma - Yoga alignment & fat-burning sequences
  - Saumya - Mobility, flexibility & strength
  - Mudit - Posture correction & beginner-friendly yoga
- Profile cards with images

### 6. Camp Schedule
- **Day 0:** Orientation Session (22 March, 9:00 AM)
  - Program overview
  - Fat loss habits
  - Correct yoga practice
  - Getting best results
- **Day 1:** Camp begins (23 March)

### 7. Daily Guidance Section
- WhatsApp voice guidance from Sumit Sharma
- Topics covered:
  - Intermittent fasting
  - Quitting sugar
  - Avoiding processed foods
  - Eating home-cooked food
  - Building discipline

### 8. Community Support
- WhatsApp group benefits:
  - Daily reminders
  - Voice guidance
  - Motivation
  - Progress updates
  - Success stories

### 9. Who Should Join
- People wanting natural fat loss
- Low energy individuals
- Beginners in yoga
- People wanting healthy habits
- Anyone needing guidance & motivation

### 10. Pricing Section
- Clear ₹99 pricing display
- Includes:
  - Orientation session
  - 14 days live yoga classes
  - WhatsApp guidance
  - Community support
  - Class recordings
- "Limited Seats Available" urgency indicator

### 11. Final CTA Section
- Transformation motivation points
- Integrated registration form
- Gradient background with decorative elements

## 🚀 Conversion Optimization Features

1. **Sticky CTA Button**
   - Appears after scrolling 500px
   - Fixed at bottom of screen
   - Dismissible by user
   - Quick access to registration

2. **Countdown Timer**
   - Real-time countdown to camp start
   - Days, hours, minutes, seconds display
   - Creates urgency

3. **WhatsApp Support Button**
   - Fixed floating button (bottom-right)
   - Direct contact option
   - Tooltip on hover

4. **Smooth Animations**
   - Framer Motion animations throughout
   - Scroll-triggered reveals
   - Hover effects on interactive elements

5. **Mobile Optimized**
   - Responsive grid layouts
   - Touch-friendly buttons
   - Optimized font sizes
   - Stacked layouts on mobile

## 🛠️ Technical Stack

- **Framework:** React + TypeScript
- **Routing:** React Router DOM
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Form Handling:** React Hook Form
- **Backend:** Supabase (for registrations)

## 📱 Components Structure

```
src/
├── pages/
│   └── FatLossCampaign.tsx          # Main campaign page
├── components/
│   ├── campaign/
│   │   ├── FatLossHero.tsx          # Hero section with countdown
│   │   ├── BenefitsSection.tsx      # Benefits grid
│   │   ├── WhyDifferentSection.tsx  # Problem-solution comparison
│   │   ├── BatchesSection.tsx       # Class timing options
│   │   ├── MentorsSection.tsx       # Mentor profiles
│   │   ├── CampScheduleSection.tsx  # Day 0 & Day 1 schedule
│   │   ├── DailyGuidanceSection.tsx # WhatsApp guidance info
│   │   ├── CommunitySection.tsx     # Community benefits
│   │   ├── WhoShouldJoinSection.tsx # Target audience
│   │   ├── PricingSection.tsx       # Pricing details
│   │   ├── FinalCTASection.tsx      # Final CTA with form
│   │   ├── StickyCTA.tsx            # Sticky bottom CTA
│   │   ├── CountdownTimer.tsx       # Live countdown
│   │   └── WhatsAppButton.tsx       # Floating WhatsApp button
│   └── RegistrationSection.tsx      # Shared registration form
```

## 🎯 Key Metrics to Track

1. **Page Views**
2. **Registration Conversion Rate**
3. **Scroll Depth**
4. **CTA Click Rate**
5. **WhatsApp Button Clicks**
6. **Time on Page**
7. **Mobile vs Desktop Conversions**

## 🔧 Customization

### Update WhatsApp Number
Edit `src/components/campaign/WhatsAppButton.tsx`:
```typescript
window.open("https://wa.me/YOUR_NUMBER?text=...", "_blank");
```

### Update Countdown Date
Edit `src/components/campaign/CountdownTimer.tsx`:
```typescript
const targetDate = new Date("2026-03-22T09:00:00").getTime();
```

### Update Pricing
Edit `src/components/campaign/PricingSection.tsx` and `FatLossHero.tsx`

### Update Mentor Images
Replace images in `src/assets/` folder and update imports in `MentorsSection.tsx`

## 🚀 Deployment

The page is built and ready for deployment. Access it at:
- Local: `http://localhost:5173/14-Day-Yoga-Fat-Loss-Camp`
- Production: `https://campaign.svastha.fit/14-Day-Yoga-Fat-Loss-Camp/`

## 📊 A/B Testing Recommendations

1. Test different CTA button colors
2. Test headline variations
3. Test pricing display formats
4. Test mentor section placement
5. Test countdown timer visibility

## ✅ Checklist Before Launch

- [ ] Update WhatsApp number
- [ ] Verify countdown timer date
- [ ] Test registration form
- [ ] Check all images load properly
- [ ] Test on mobile devices
- [ ] Verify Supabase connection
- [ ] Test all CTA buttons
- [ ] Check page load speed
- [ ] Verify analytics tracking
- [ ] Test WhatsApp group link

## 🎨 Color Palette

- **Primary Green:** `#16a34a` (green-600)
- **Secondary Green:** `#10b981` (emerald-500)
- **Accent Orange:** `#f97316` (orange-500)
- **Background:** `#f0fdf4` (green-50)
- **Text:** `#1f2937` (gray-900)

## 📞 Support

For technical issues or questions, contact the development team.

---

**Built with ❤️ for Svastha Wellness & Strong By Yoga**
