# HarvestHub Deployment & Maintenance Guide

## Initial Deployment

### 1. Netlify Setup
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Base directory**: `harvest-hub-web`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

### 2. Environment Variables
Set these in Netlify Dashboard → Site Settings → Environment Variables:

```env
# Email Service (Required)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password

# Database (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key

# Netlify Function URL (Required for GitHub Actions)
NETLIFY_FUNCTION_URL=https://your-site.netlify.app/.netlify/functions/send-notifications
```

### 3. GitHub Secrets
Set these in GitHub Repository → Settings → Secrets and Variables → Actions:

```env
NETLIFY_FUNCTION_URL=https://your-site.netlify.app/.netlify/functions/send-notifications
```

### 4. Database Setup
Ensure these Supabase tables exist with proper RLS policies:
- `leads` - Store customer information
- `memberships` - Track membership status and trial periods
- `share_orders` - Order tracking
- `email_notifications` - Prevent duplicate emails

## Email System Configuration

### Gmail App Password Setup
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and generate password
   - Use this password (not your regular password) as `GMAIL_APP_PASSWORD`

### Email Schedule
The system automatically sends emails:
- **Frequency**: Twice daily (9 AM and 6 PM UTC)
- **Triggers**: GitHub Actions cron job
- **Manual**: Can be triggered manually in GitHub Actions tab

## Testing & Verification

### 1. Function Testing
Test individual functions after deployment:

```bash
# Test email service
curl "https://your-site.netlify.app/.netlify/functions/test-email?email=test@example.com&type=welcome"

# Test notification processor
curl -X POST "https://your-site.netlify.app/.netlify/functions/send-notifications"
```

### 2. End-to-End Testing
1. **Welcome Emails**: Create new membership in database
2. **Trial Reminders**: Set trial end date 3 days from now
3. **Order Confirmations**: Create new share order
4. **Manual Trigger**: Use GitHub Actions to run notifications manually

### 3. Database Verification
Check `email_notifications` table for sent email logs:
```sql
SELECT * FROM email_notifications 
ORDER BY sent_at DESC 
LIMIT 10;
```

## Monitoring & Maintenance

### 1. Email Delivery Monitoring
- **Netlify Functions**: Check function logs in Netlify dashboard
- **GitHub Actions**: Monitor workflow runs for failures
- **Gmail**: Check for bounce/failure notifications

### 2. Database Monitoring
Monitor key metrics:
- New leads per day
- Active trial memberships approaching expiration
- Order volume and confirmation rates
- Email notification success rates

### 3. Regular Maintenance Tasks

#### Weekly
- Review email delivery logs for failures
- Check GitHub Actions workflow success
- Monitor database growth and performance

#### Monthly
- Review and update email templates
- Check Gmail quota usage
- Update dependencies if needed

#### As Needed
- Rotate Gmail app password (every 6 months recommended)
- Update notification timing if business requirements change
- Scale infrastructure based on usage

## Troubleshooting

### Common Issues

#### Emails Not Sending
1. **Check Gmail Authentication**:
   - Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD`
   - Ensure 2FA is enabled on Gmail account
   - Check for Gmail security alerts

2. **Check Environment Variables**:
   - Verify all variables are set in Netlify dashboard
   - No trailing spaces or quotes in variable values

3. **Check Function Logs**:
   - Netlify Dashboard → Functions → View logs
   - Look for authentication or SMTP errors

#### GitHub Actions Failing
1. **Check Secret Configuration**:
   - Verify `NETLIFY_FUNCTION_URL` is correctly set
   - URL should include the full function path

2. **Check Network Issues**:
   - Verify Netlify site is accessible publicly
   - Check for any Netlify downtime

#### Database Connection Issues
1. **Check Supabase Configuration**:
   - Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY`
   - Check RLS policies allow function access
   - Verify tables exist with correct schema

2. **Check Function Permissions**:
   - Ensure anonymous user can read/write required tables
   - Check for quota limits in Supabase

### Getting Help
- **Netlify Issues**: Check Netlify status and documentation
- **Gmail Issues**: Check Google Workspace/Gmail help
- **Supabase Issues**: Check Supabase documentation and status
- **Code Issues**: Review function logs and error messages

## Emergency Procedures

### Disable Email Notifications
If emails need to be stopped immediately:
1. Go to GitHub → Actions → Disable workflow
2. Or delete the `.github/workflows/email-notifications.yml` file

### Email Template Hotfix
For urgent email template changes:
1. Update `harvest-hub-web/netlify/functions/email-templates.js`
2. Commit and push to main branch
3. Netlify will auto-deploy within minutes

### Database Emergency
If database issues occur:
1. Check Supabase dashboard for alerts
2. Review recent database migrations
3. Contact Supabase support if needed

## Performance & Scaling

### Current Limits
- **Gmail**: 500 emails per day (free tier)
- **Netlify Functions**: 125,000 invocations per month (free tier)
- **GitHub Actions**: 2,000 minutes per month (free tier)
- **Supabase**: 500MB database size (free tier)

### Scaling Considerations
- **High Email Volume**: Upgrade to Netlify Pro or consider dedicated email service
- **Database Growth**: Monitor Supabase usage and upgrade plan as needed
- **Function Usage**: Track function invocations and optimize if approaching limits

### Performance Optimization
- Email templates are already optimized for size and loading
- Function code includes execution timing for performance monitoring
- Database queries use appropriate indexes for fast execution