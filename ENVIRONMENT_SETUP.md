# 🔧 Environment Setup Guide

## 📁 Environment Files Overview

```
.env.example          # Template with placeholders (safe to commit)
.env.development      # Local development with real keys (gitignored)
.env.production       # Production template for Netlify (gitignored)
.env                   # Current active environment (gitignored)
```

## 🚀 Quick Setup

### For Local Development:
1. Copy development environment:
   ```bash
   copy .env.development .env
   ```

### For Production Deployment:
1. Add environment variables to Netlify Dashboard
2. Use `.env.production` as reference

## 🔑 Environment Variables Required

```
REACT_APP_FIREBASE_API_KEY=AIzaSyBqDlkTbxnSspi6YE3magsTBl9fyF4vjfo
REACT_APP_FIREBASE_AUTH_DOMAIN=esthira-raptric.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=esthira-raptric
REACT_APP_FIREBASE_STORAGE_BUCKET=esthira-raptric.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=296648703385
REACT_APP_FIREBASE_APP_ID=1:296648703385:web:55a45b235b9cb486d9e708
REACT_APP_FIREBASE_MEASUREMENT_ID=G-F5L1D7JM1F
```

## 🛡️ Security Notes

- ✅ `.env` files are in `.gitignore` (protected)
- ✅ No secrets in git repository
- ✅ Production uses Netlify environment variables
- ✅ Development uses local environment file

## 🔄 Switching Environments

### Switch to Development:
```bash
copy .env.development .env
```

### Switch to Production Template:
```bash
copy .env.production .env
```

## 🚨 Current Error Fix

The runtime error you're seeing is because the `.env` file was cleaned of secrets.
To fix local development:

1. **Option 1**: Restore development environment
   ```bash
   copy .env.development .env
   ```

2. **Option 2**: Use the backup
   ```bash
   copy .env.backup .env
   ```

3. **Restart the development server**
   ```bash
   npm start
   ```

## 📋 Netlify Deployment Checklist

- [ ] Local development working
- [ ] Environment variables added to Netlify
- [ ] Code pushed to GitHub
- [ ] Netlify deployment successful
- [ ] No secrets scanning errors

---

**Your development environment should now work properly! 🎯**
