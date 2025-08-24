# GitHub Actions + Netlify Setup Guide

## What This Does
- ✅ **Automatic deployment** on every push to main branch
- ✅ **Preview deployments** for pull requests
- ✅ **Build verification** before deployment
- ✅ **Comments with deployment URLs** on PRs

## Setup Steps

### 1. Get Netlify Tokens
1. Go to [Netlify](https://app.netlify.com)
2. **Get Auth Token:**
   - User settings → Applications → Personal access tokens
   - Generate new token → Copy it

3. **Create a new site:**
   - Add new site → Deploy manually
   - Drag your `dist/` folder (just to create the site)
   - Copy the **Site ID** from Site settings → General

### 2. Add GitHub Secrets
1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Add these Repository secrets:

```
NETLIFY_AUTH_TOKEN: [your personal access token from step 1]
NETLIFY_SITE_ID: [your site ID from step 1]
```

### 3. Commit and Push
```bash
git add .
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### 4. Watch the Magic! ✨
- Go to GitHub → Actions tab
- Watch your deployment run
- Get deployment URL in the workflow logs

## Workflow Features

### On Main Branch Push:
- ✅ Builds your app
- ✅ Deploys to production Netlify site
- ✅ Comments with deployment status

### On Pull Request:
- ✅ Creates preview deployment
- ✅ Comments with preview URL
- ✅ Perfect for testing changes

## Advanced Features (Optional)

### Environment Variables
Add to GitHub secrets if needed:
```
VITE_SUPABASE_URL: https://uzqbsotbrwoactrcgooz.supabase.co
VITE_SUPABASE_ANON_KEY: [your anon key]
```

Then update your `supabase.ts`:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uzqbsotbrwoactrcgooz.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-key'
```

### Custom Domain
1. Netlify dashboard → Domain management
2. Add custom domain: `app.harvesthub.com`
3. Follow DNS instructions
4. SSL automatically provided

### Slack/Discord Notifications
Add to workflow for deployment notifications:
```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    channel: '#deployments'
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Benefits

### For Development:
- 🚀 **Zero-config deployments** - just push code
- 🔍 **Preview every PR** before merging
- 🛡️ **Build verification** catches errors early
- 📱 **Test on real URLs** with QR codes

### For Production:
- ⚡ **Instant rollbacks** via GitHub
- 📈 **Deployment history** tracking
- 🔄 **Atomic deployments** (all-or-nothing)
- 🎯 **Branch-based environments**

## Troubleshooting

### Build Fails?
- Check Node.js version in workflow matches your local
- Verify all dependencies in package.json
- Check build logs in Actions tab

### Deployment Fails?
- Verify Netlify tokens are correct
- Check Site ID matches your Netlify site
- Ensure repository has Actions enabled

### Need Help?
- Actions tab shows detailed logs
- Netlify dashboard shows deployment status
- GitHub Issues for tracking problems

## Next Steps After Setup

1. **Test deployment** by pushing a small change
2. **Update QR codes** to use new Netlify URL
3. **Set up custom domain** if desired
4. **Add team members** to GitHub repo for collaboration

This setup gives you professional-grade CI/CD for free! 🎉