# Backend Deployment Guide

## ✅ Backend API Routes Created

Backend ko Vercel serverless functions mein convert kar diya hai. Ab same project se hi API endpoints available honge.

### API Endpoints:

- `/api/submit-lead` - Lead submission
- `/api/register` - User registration
- `/api/booked-slots` - Get booked time slots

## 🔧 Vercel Environment Variables Setup

Vercel dashboard mein jao aur yeh environment variables add karo:

1. Go to: https://vercel.com/[your-username]/[project-name]/settings/environment-variables

2. Add these variables:
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_ANON_KEY` = Your Supabase anon key

3. Select environments: **Production, Preview, Development** (all three)

4. Click "Save"

## 🚀 Deploy

```bash
git add .
git commit -m "Add Vercel serverless API functions"
git push
```

Vercel automatically deploy kar dega.

## 📝 Update Frontend API Calls

Frontend code mein API calls ko update karo:

**Before:**

```javascript
fetch('http://localhost:5000/api/submit-lead', ...)
```

**After:**

```javascript
fetch('/api/submit-lead', ...)  // Relative URL - same domain
```

Ya production URL:

```javascript
fetch('https://your-domain.com/api/submit-lead', ...)
```

## ✅ Testing

Local testing:

```bash
npm run dev
```

API endpoints available at:

- `http://localhost:5173/api/submit-lead`
- `http://localhost:5173/api/register`
- `http://localhost:5173/api/booked-slots`

Production:

- `https://your-domain.com/api/submit-lead`
- `https://your-domain.com/api/register`
- `https://your-domain.com/api/booked-slots`
