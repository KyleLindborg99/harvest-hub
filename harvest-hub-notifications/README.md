# HarvestHub Email Notifications

Automated email notification system for HarvestHub using Netlify Functions and GitHub Actions.

## Architecture

```
GitHub Actions (cron) → Netlify Function → Gmail SMTP → Customers
```

## Features

- **Trial Ending Reminders**: Sent 3 days before trial expiration
- **Welcome Emails**: Sent to new members within 24 hours  
- **Order Confirmations**: Sent for new share orders
- **Duplicate Prevention**: Tracks sent notifications in database

## Setup Instructions

### 1. Gmail App Password Setup

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Security → 2-Step Verification (must be enabled)  
3. App passwords → Generate new password
4. Select "Mail" and "Other (custom name)" → "HarvestHub"
5. Copy the 16-character password

### 2. Deploy to Netlify

1. **Create new Netlify site:**
   ```bash
   cd harvest-hub-notifications
   npm install
   ```

2. **Connect to GitHub:**
   - Push this folder to GitHub
   - Netlify → Import from Git → Select repo
   - Build settings: `npm install` / Functions: `netlify/functions`

3. **Add Environment Variables in Netlify:**
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-char-app-password
   SUPABASE_URL=https://uzqbsotbrwoactrcgooz.supabase.co  
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 3. GitHub Actions Setup

1. **Get Netlify Function URL:**
   - After deploy: `https://your-site.netlify.app/.netlify/functions/send-notifications`

2. **Add GitHub Secret:**
   - Repo Settings → Secrets → New repository secret
   - Name: `NETLIFY_FUNCTION_URL`
   - Value: Your function URL

### 4. Database Setup

Add the email tracking table to Supabase:

```sql
-- Email notification tracking
CREATE TABLE email_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL,
    reference_id UUID, -- For order confirmations
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'sent',
    email_provider_id VARCHAR(100)
);

-- Indexes for performance
CREATE INDEX idx_email_notifications_lead_id ON email_notifications(lead_id);
CREATE INDEX idx_email_notifications_type ON email_notifications(notification_type);
CREATE INDEX idx_email_notifications_sent_at ON email_notifications(sent_at);
```

## Testing

### Test Individual Email Types:
- **Welcome**: `GET /test-email?email=test@example.com&type=welcome`
- **Trial Ending**: `GET /test-email?email=test@example.com&type=trial-ending`  
- **Order Confirmation**: `GET /test-email?email=test@example.com&type=order-confirmation`

### Manual Trigger:
- GitHub Actions → email-notifications → Run workflow

## Scheduling

Notifications run **twice daily** at 9 AM and 6 PM UTC (adjust in `.github/workflows/email-notifications.yml`).

## Free Limits

- **Gmail SMTP**: 500 emails/day
- **Netlify Functions**: 125K invocations/month
- **GitHub Actions**: 2,000 minutes/month

## Monitoring

Check logs in:
- Netlify Functions dashboard
- GitHub Actions run history
- Supabase email_notifications table