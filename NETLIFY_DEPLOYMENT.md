# Netlify Deployment Instructions

## Step 1: Add Environment Variables in Netlify

1. Go to Netlify Dashboard → Your Site → Site settings → Build & deploy → Environment
2. Add the following environment variables:

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=esthira-raptric.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=esthira-raptric
REACT_APP_FIREBASE_STORAGE_BUCKET=esthira-raptric.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=296648703385
REACT_APP_FIREBASE_APP_ID=1:296648703385:web:55a45b235b9cb486d9e708
REACT_APP_FIREBASE_MEASUREMENT_ID=G-F5L1D7JM1F
```

## Step 2: Update Build Settings

1. Go to Site settings → Build & deploy → Build settings
2. Ensure Build command: `npm run build`
3. Ensure Publish directory: `build`

## Step 3: Trigger New Deployment

1. Go to Deploys → Trigger deploy
2. Select "Trigger deploy" → "Deploy site"
3. Wait for deployment to complete

## Step 4: Verify Configuration

1. Check deployment logs for any errors
2. Test the deployed site functionality
3. Verify Firebase connection works

## Optional: Secrets Scan Workaround

If secrets scanning still fails, add this environment variable:
```
SECRETS_SCAN_SMART_DETECTION_ENABLED=false
```

**Note:** Only use this as a temporary solution. Proper environment variable setup is the secure approach.

## Security Notes

- Never commit actual Firebase keys to version control
- Use different keys for development and production if possible
- Regularly rotate Firebase API keys
- Monitor Firebase console for unusual activity
