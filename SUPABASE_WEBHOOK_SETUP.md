# Supabase Database Webhook Setup Guide

## Overview

Supabase webhook automatically triggers when new lead is inserted, ensuring Google Sheets and BotBiz webhooks fire reliably without slowing down form submission.

## Setup Steps

### 1. Deploy the webhook endpoint first

```bash
git add .
git commit -m "Add Supabase webhook handler"
git push
```

Wait for Vercel deployment to complete. Your webhook endpoint will be:
`https://campaign.svastha.fit/api/supabase-webhook`

### 2. Configure Supabase Database Webhook

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **Database** → **Webhooks** (in left sidebar)
4. Click **"Create a new hook"** or **"Enable Webhooks"**

### 3. Webhook Configuration

Fill in these details:

- **Name:** `vaishnavi_leads_webhook`
- **Table:** `vaishnavi_leads`
- **Events:** Select **INSERT** only (uncheck UPDATE, DELETE)
- **Type:** `HTTP Request`
- **Method:** `POST`
- **URL:** `https://campaign.svastha.fit/api/supabase-webhook`
- **HTTP Headers:** (optional)
  ```
  Content-Type: application/json
  ```
- **Timeout:** `5000` (5 seconds)

### 4. Test the webhook

1. Submit a test lead through your form
2. Check Supabase webhook logs (Database → Webhooks → Click on webhook → Logs)
3. Verify data appears in:
   - Supabase `vaishnavi_leads` table ✓
   - Google Sheets ✓
   - BotBiz ✓

### 5. Monitor webhook

- Supabase Dashboard → Database → Webhooks → View logs
- Vercel Dashboard → Your project → Logs (filter by `/api/supabase-webhook`)

## How it works

```
User submits form
    ↓
Frontend: POST /api/submit-lead
    ↓
Supabase: INSERT into vaishnavi_leads
    ↓
Response: { success: true } (FAST! ~200ms)
    ↓
Supabase triggers webhook (background)
    ↓
POST /api/supabase-webhook
    ↓
Fire Google Sheets + BotBiz webhooks
```

## Benefits

✅ Fast form submission (user doesn't wait for webhooks)
✅ Reliable webhook delivery (Supabase retries on failure)
✅ Automatic retry mechanism
✅ Webhook logs for debugging
✅ No data loss

## Troubleshooting

**Webhook not firing?**

- Check Supabase webhook is enabled
- Verify webhook URL is correct
- Check Supabase webhook logs for errors

**Google Sheets not updating?**

- Check Vercel function logs: `/api/supabase-webhook`
- Verify Google Sheets URL is correct
- Test Google Sheets URL manually with curl

**BotBiz not receiving data?**

- Check Vercel function logs
- Verify BotBiz webhook URL
- Test BotBiz URL manually
