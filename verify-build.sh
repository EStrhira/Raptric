#!/bin/bash

# Production Build Verification Script
echo "🔍 Verifying production build configuration..."

# Check if .env exists and contains Firebase config
if [ ! -f ".env" ]; then
    echo "❌ .env file not found"
    exit 1
fi

echo "✅ .env file found"

# Check for required Firebase environment variables
REQUIRED_VARS=(
    "REACT_APP_FIREBASE_API_KEY"
    "REACT_APP_FIREBASE_AUTH_DOMAIN"
    "REACT_APP_FIREBASE_PROJECT_ID"
    "REACT_APP_FIREBASE_APP_ID"
)

for var in "${REQUIRED_VARS[@]}"; do
    if ! grep -q "^$var=" .env; then
        echo "❌ Missing required environment variable: $var"
        exit 1
    fi
done

echo "✅ All required Firebase environment variables found"

# Check if .env is in .gitignore
if ! grep -q "^\.env$" .gitignore; then
    echo "❌ .env not found in .gitignore"
    exit 1
fi

echo "✅ .env properly excluded from git"

# Run production build
echo "🏗️  Running production build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Production build successful"
    echo "🚀 Ready for Netlify deployment!"
else
    echo "❌ Production build failed"
    exit 1
fi
