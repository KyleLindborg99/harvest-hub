# HarvestHub QR Codes Documentation

## Overview
This document provides complete documentation for the QR codes used in the HarvestHub lead generation system. These QR codes enable quick access to lead forms via mobile devices.

## QR Code System Architecture

### Token-Based Security
- Each QR code contains a unique, secure token
- Tokens are defined in `src/config/formTokens.ts`
- Invalid tokens redirect to home page
- Tokens map to specific form types

### URL Structure
```
https://harvesthub-ed691.web.app/form/{TOKEN}
```

## Available QR Codes

### 1. Share Form QR Code

**Purpose:** Lead capture for share/investment opportunities

**Token:** `sh7x9m2k4p`

**Full URL:** `https://harvesthub-ed691.web.app/form/sh7x9m2k4p`

**QR Code Image URL:** 
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fharvesthub-ed691.web.app%2Fform%2Fsh7x9m2k4p
```

**Form Fields:**
- First Name (required)
- Last Name (required) 
- Email Address (required)
- Phone Number (optional)
- Additional Notes (optional)

**Background:** Share-themed animal images (Cow.jpg, Lamb.jpg, Pig.jpg from `/images/share/`)

---

### 2. Membership Form QR Code

**Purpose:** Lead capture for membership sign-ups

**Token:** `mb3n8q5w1z`

**Full URL:** `https://harvesthub-ed691.web.app/form/mb3n8q5w1z`

**QR Code Image URL:**
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fharvesthub-ed691.web.app%2Fform%2Fmb3n8q5w1z
```

**Form Fields:**
- First Name (required)
- Last Name (required)
- Email Address (required)
- Phone Number (optional)
- Additional Notes (optional)

**Background:** Membership-themed animal images (Cow.jpg, Lamb.jpg, Pig.jpg from `/images/membership/`)

## Technical Implementation

### Token Configuration
Located in `src/config/formTokens.ts`:
```typescript
export const FORM_TOKENS = {
    share: 'sh7x9m2k4p',
    membership: 'mb3n8q5w1z'
} as const;
```

### Routing
- Route pattern: `/form/:token`
- Component: `TokenFormPage.tsx`
- Validation: `validateFormToken()` function
- Invalid tokens redirect to home (`/`)

### Data Storage
- Backend: Firebase Firestore
- Collection: `leads`
- Document ID: `{email}_{type}` format
- Fields: formData + type + timestamp

## QR Code Generation Options

### Method 1: QR Server API (Current)
```
https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={URL}
```

### Method 2: Generate New QR Codes
Run the included script:
```bash
node generate-qr-codes.js
```

### Method 3: Custom QR Generator
Use any QR code generator with the form URLs above.

## Demo Instructions

### For Events/Marketing
1. **Download QR codes** from the URLs above
2. **Print at 300x300px minimum** for mobile scanning
3. **Test scanning** with multiple devices before event
4. **Place strategically** at booths, flyers, presentations

### For Testing
1. Scan QR code with mobile device
2. Fill out and submit form
3. Check Firebase console for lead data
4. Verify email validation and duplicate prevention

## Security Features

### Token Security
- 10-character alphanumeric tokens
- Unguessable random generation
- No sensitive data in URLs

### Form Validation
- Email format validation
- Required field enforcement
- Duplicate lead prevention
- Error handling and user feedback

### Data Protection
- Firebase security rules applied
- HTTPS-only communication
- No client-side data storage

## Monitoring & Analytics

### Firebase Console
- **Project:** harvesthub-ed691
- **Console URL:** https://console.firebase.google.com/project/harvesthub-ed691/overview
- **Hosting:** https://harvesthub-ed691.web.app
- **Firestore:** Monitor lead submissions in real-time

### Key Metrics to Track
- QR code scans (via analytics)
- Form submissions by type
- Completion rates
- Error rates
- Mobile vs desktop usage

## Troubleshooting

### QR Code Not Working
1. Verify URL accessibility in browser
2. Check token spelling in `formTokens.ts`
3. Ensure Firebase deployment is current
4. Test with different QR scanning apps

### Form Submission Issues
1. Check Firebase console for errors
2. Verify Firestore security rules
3. Test internet connectivity
4. Check browser console for JavaScript errors

## Customization Guide

### Adding New QR Codes
1. Generate new token with `generateToken()` function
2. Add to `FORM_TOKENS` object
3. Update `TOKEN_TO_FORM_TYPE` mapping
4. Create new QR code with updated URL
5. Deploy changes with `firebase deploy`

### Changing QR Code Design
1. Use different QR generator service
2. Customize size, colors, or logo
3. Maintain 300x300px minimum for mobile scanning
4. Test scanning reliability after changes

## Files Reference

- **Token Configuration:** `src/config/formTokens.ts`
- **Form Component:** `src/components/forms/TokenFormPage.tsx`
- **Lead Form:** `src/components/forms/LeadForm.tsx`
- **Firebase Config:** `firebase.json`
- **QR Generator Script:** `generate-qr-codes.js`
- **Demo Guide:** `DEMO-GUIDE.md`

---

**Last Updated:** $(date)
**Firebase Project:** harvesthub-ed691
**Deployment URL:** https://harvesthub-ed691.web.app