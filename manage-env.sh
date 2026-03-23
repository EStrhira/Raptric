#!/bin/bash

# Script to safely manage environment variables
# This script helps you switch between development and production configs

echo "🔧 Environment Variable Manager"
echo "1. Show current .env"
echo "2. Set development config (no secrets)"
echo "3. Set production config (no secrets)"
echo "4. Exit"

read -p "Choose option (1-4): " choice

case $choice in
  1)
    echo "📁 Current .env content:"
    cat .env
    ;;
  2)
    echo "📝 Setting development config..."
    cat > .env << 'EOF'
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE

# Firebase Configuration
# Add these in Netlify Environment Variables instead of here:
# REACT_APP_FIREBASE_API_KEY=your_api_key_here
# REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# REACT_APP_FIREBASE_PROJECT_ID=your-project-id
# REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=1234567890
# REACT_APP_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
# REACT_APP_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Replace YOUR_GOOGLE_CLIENT_ID_HERE with your actual Google OAuth Client ID
# Get it from: https://console.cloud.google.com/apis/credentials
EOF
    echo "✅ Development config set (no secrets)"
    ;;
  3)
    echo "📝 Setting production config (no secrets)..."
    cat > .env << 'EOF'
# Production Configuration
# All secrets should be in Netlify Environment Variables
NODE_ENV=production

# Firebase Configuration - Add in Netlify Dashboard:
# REACT_APP_FIREBASE_API_KEY=
# REACT_APP_FIREBASE_AUTH_DOMAIN=
# REACT_APP_FIREBASE_PROJECT_ID=
# REACT_APP_FIREBASE_STORAGE_BUCKET=
# REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
# REACT_APP_FIREBASE_APP_ID=
# REACT_APP_FIREBASE_MEASUREMENT_ID=
EOF
    echo "✅ Production config set (add secrets in Netlify)"
    ;;
  4)
    echo "👋 Exiting..."
    exit 0
    ;;
  *)
    echo "❌ Invalid option"
    exit 1
    ;;
esac
