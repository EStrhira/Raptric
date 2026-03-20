# Email Integration Setup

## Overview
The contact form now uses RESEND API via Netlify serverless functions for secure email sending.

## Files Created/Modified

### 1. Serverless Function (`netlify/functions/send-email.js`)
- Handles POST requests from the contact form
- Validates input (name, email, message required)
- Sends email to `info@esthira.com` via RESEND
- Sends auto-reply to customer
- Uses environment variable for API key security

### 2. Updated Contact Component (`src/components/Contact.tsx`)
- Removed client-side RESEND usage (security issue)
- Added fetch call to serverless function
- Added loading state with "Sending..." button text
- Updated error handling and success messages

### 3. Configuration Files
- `package.json`: Added RESEND dependency
- `netlify.toml`: Configured functions directory and build settings

## Environment Setup

### Netlify Environment Variables
Set these in Netlify Dashboard → Site Settings → Build & deploy → Environment variables:

```
RESEND_API_KEY=your_actual_api_key_here
```

## Security Notes
✅ **Fixed Security Issues:**
- API key is no longer exposed in client-side code
- Email sending logic moved to server-side
- Input validation on both client and server side

## How It Works
1. User fills contact form on website
2. Frontend validates input and shows loading state
3. Form data is POSTed to `/.netlify/functions/send-email`
4. Serverless function validates and sends emails via RESEND
5. Company receives email with customer inquiry
6. Customer receives auto-reply confirmation
7. Form resets and shows success message

## Testing
- Deploy changes to Netlify
- Set RESEND_API_KEY environment variable
- Test contact form submission
- Check email delivery to `info@esthira.com`

## Benefits
- **Secure**: API key never exposed to browser
- **Reliable**: Professional email delivery via RESEND
- **User-Friendly**: Loading states and clear feedback
- **Auto-Reply**: Customers get instant confirmation
- **Professional**: HTML email templates with branding
