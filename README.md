# HarvestHub

A local food distribution platform connecting customers with farmers and producers.

## Project Structure

```
harvest-hub/
├── harvest-hub-web/              # React frontend and Netlify functions
│   ├── src/                      # React application
│   ├── netlify/functions/        # Email notification system
│   │   ├── send-notifications.js # Main notification processor
│   │   ├── test-email.js        # Email testing function
│   │   └── email-templates.js   # HTML email templates
│   └── netlify.toml             # Netlify deployment config
├── .github/workflows/           # Automated email scheduling
│   └── email-notifications.yml # Cron job for notifications
└── README.md                   # This file
```

## Features

### Lead Generation & Forms
- Token-based secure lead capture forms
- QR code generation for offline marketing
- Supabase integration for data storage

### Automated Email Notifications
- Welcome emails for new members (trial & regular)
- Trial ending reminders (0-5 days before expiration)
- Order confirmation emails
- Duplicate prevention and logging
- Automated scheduling via GitHub Actions

### Technical Stack
- **Frontend**: React with Vite
- **Functions**: Netlify Functions (Node.js)
- **Database**: Supabase (PostgreSQL)
- **Email**: Gmail SMTP with nodemailer
- **Automation**: GitHub Actions cron jobs

## Getting Started

### Prerequisites
- Node.js 18+
- Gmail account with app password
- Supabase project
- Netlify account

### Environment Variables
```env
# Email service
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Database
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Installation
```bash
cd harvest-hub-web
npm install
npm run dev
```

### Email System Testing
```bash
# Test welcome email
curl "https://your-site.netlify.app/.netlify/functions/test-email?email=test@example.com&type=welcome"

# Test trial ending email
curl "https://your-site.netlify.app/.netlify/functions/test-email?email=test@example.com&type=trial-ending"

# Test order confirmation
curl "https://your-site.netlify.app/.netlify/functions/test-email?email=test@example.com&type=order-confirmation"
```

## Deployment

The application is configured for automatic deployment to Netlify:
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Deploy will trigger automatically on push to main branch

## Email Notification System

### Automated Schedule
- Runs twice daily at 9 AM and 6 PM UTC
- Can be manually triggered via GitHub Actions

### Notification Types
1. **Welcome Emails**: Sent to new members within 24 hours
2. **Trial Reminders**: Sent to trial members 0-5 days before expiration
3. **Order Confirmations**: Sent for new orders within 24 hours

### Template Customization
Email templates are located in `harvest-hub-web/netlify/functions/email-templates.js`:
- Professional responsive HTML design
- Brand colors and styling
- Dynamic content based on user data
- Ready for designer handoff