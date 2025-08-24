# Deploy to Netlify Instructions

## Quick Deployment (5 minutes)

### Option 1: Drag & Drop Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub account
3. Drag your `dist/` folder to the deploy area
4. Get instant URL like: `https://amazing-name-123456.netlify.app`

### Option 2: GitHub Integration (Recommended)
1. Push your code to GitHub repository
2. Go to Netlify → "Add new site" → "Import from Git"
3. Connect your GitHub account
4. Select your repository
5. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Deploy!

## Build Settings for Netlify

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## After Deployment

1. **Test your forms** at the new Netlify URL
2. **Update QR codes** with new domain
3. **Set custom domain** (optional)

## Custom Domain Setup (Optional)

1. In Netlify dashboard → Domain settings
2. Add custom domain: `app.harvesthub.com`
3. Update DNS records as instructed
4. SSL certificate automatically provided

## Environment Variables

If you need to hide API keys later:
1. Netlify dashboard → Environment variables
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Update your config to use `import.meta.env.VITE_*`

## Next Steps After Deploy

1. **Test forms work** with Supabase
2. **Update QR codes** to point to new URL
3. **Turn off Firebase hosting** (save costs)
4. **Celebrate!** 🎉