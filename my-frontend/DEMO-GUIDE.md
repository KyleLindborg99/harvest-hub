# HarvestHub Demo Guide

## Deployed Application
Your HarvestHub application is now live at: **https://harvest-hub-michigan.netlify.app**

## QR Code Demo URLs

### Share Form
- **Direct URL:** https://harvest-hub-michigan.netlify.app/form/sh7x9m2k4p
- **QR Code:** https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fharvest-hub-michigan.netlify.app%2Fform%2Fsh7x9m2k4p

### Membership Form  
- **Direct URL:** https://harvest-hub-michigan.netlify.app/form/mb3n8q5w1z
- **QR Code:** https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fharvest-hub-michigan.netlify.app%2Fform%2Fmb3n8q5w1z

## Demo Instructions

1. **Print QR Codes:** Visit the QR code URLs above to download and print the QR codes
2. **Test Forms:** Scan QR codes with mobile devices to test the forms
3. **Check Supabase:** Lead submissions will be stored in your Supabase database

## Alternative Access
- Home page with navigation: https://harvest-hub-michigan.netlify.app
- Direct share form: https://harvest-hub-michigan.netlify.app/lead/shares
- Direct member form: https://harvest-hub-michigan.netlify.app/lead/members

## Next Steps for Production
1. Consider renaming the project directory from "my-frontend" to "harvest-hub-frontend"
2. Set up custom domain if needed (e.g., app.harvesthub.com)
3. Set up Supabase Row Level Security (RLS) for production
4. Configure form validation and error handling
5. Add analytics tracking