# Custom Google Reviews System Setup Guide

## Overview
A complete custom Google Reviews system using Firebase (Firestore + Cloud Functions) and Google Places API. No third-party widgets required!

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Google Places  │────│ Firebase Cloud   │────│   Firestore      │
│      API         │    │    Functions      │    │   Database       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  React Frontend │
                                              │   (Your App)     │
                                              └─────────────────┘
```

## 🚀 Quick Setup

### 1. Get Google Place ID
1. Go to [Google Maps](https://maps.google.com)
2. Search for your business
3. Click on your business name
4. Copy the Place ID from URL or share dialog
5. Example: `ChIJd6aQZb9ZwokR6_hD_q4jGaGI`

### 2. Get Google Places API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Enable "Places API"
3. Create API key with restrictions
4. Keep this key secure (backend only!)

### 3. Setup Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init functions
firebase init firestore
```

### 4. Deploy Cloud Functions
```bash
# Install dependencies
cd functions
npm install

# Set environment variables
firebase functions:config:set google.places.api_key="YOUR_API_KEY"
firebase functions:config:set google.place_id="YOUR_PLACE_ID"

# Deploy functions
firebase deploy --only functions
```

### 5. Setup Firestore Rules
Copy `firestore.rules` to your project root and deploy:
```bash
firebase deploy --only firestore:rules
```

## 📋 File Structure

```
your-project/
├── functions/
│   ├── src/
│   │   └── index.js                 # Cloud Functions
│   └── package.json                 # Functions dependencies
├── src/
│   ├── components/
│   │   ├── ReviewsSection.tsx       # Main reviews component
│   │   └── StarRating.tsx           # Star rating UI
│   └── services/
│       └── ReviewsService.ts        # Frontend service
├── firebase.json                    # Firebase config
├── firestore.rules                   # Firestore security rules
└── .env.example                     # Environment variables template
```

## 🔧 Configuration

### Environment Variables
Create `.env` file in your project root:

```bash
# Firebase
FIREBASE_PROJECT_ID=your-project-id
GOOGLE_PLACES_API_KEY=your-api-key
GOOGLE_PLACE_ID=your-place-id
```

### Cloud Functions Environment
```bash
firebase functions:config:set google.places.api_key="YOUR_API_KEY"
firebase functions:config:set google.place_id="YOUR_PLACE_ID"
```

## 🎯 Usage Examples

### Basic Usage
```tsx
import ReviewsSection from './components/ReviewsSection';

function HomePage() {
  return (
    <ReviewsSection 
      placeId="YOUR_GOOGLE_PLACE_ID"
      maxReviews={6}
    />
  );
}
```

### Advanced Usage
```tsx
<ReviewsSection 
  placeId="ChIJd6aQZb9ZwokR6_hD_q4jGaGI"
  maxReviews={10}
  showFilters={true}
  showWriteReviewButton={true}
  layout="grid"
/>
```

### Star Rating Component
```tsx
import StarRating from './components/StarRating';

<StarRating 
  rating={4.5} 
  maxRating={5} 
  size="large" 
  showValue={true}
  color="#ffc107"
/>
```

## 🔄 API Endpoints

### Cloud Functions
- **Fetch Reviews**: `https://your-region-project.cloudfunctions.net/fetchGoogleReviews`
- **Get Reviews**: `https://your-region-project.cloudfunctions.net/getReviews`
- **Cleanup**: `https://your-region-project.cloudfunctions.net/cleanupOldReviews`

### Manual Refresh
```bash
curl -X POST https://your-region-project.cloudfunctions.net/fetchGoogleReviews
```

## 📊 Firestore Schema

### Reviews Collection
```javascript
{
  id: "placeId_timestamp_index",
  authorName: "John Doe",
  rating: 5,
  text: "Great service!",
  profilePhoto: "https://...",
  reviewTime: 1640995200000,
  relativeTime: "a week ago",
  placeId: "ChIJd6aQZb9ZwokR6_hD_q4jGaGI",
  placeName: "Your Business",
  placeRating: 4.8,
  totalRatings: 150,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🛡️ Security

### API Key Protection
- ✅ API key stored in Firebase Functions config
- ✅ Never exposed to frontend
- ✅ IP restrictions on API key
- ✅ Usage monitoring

### Firestore Security
- ✅ Public read access to reviews
- ✅ Admin-only write access
- ✅ Field validation
- ✅ No unauthorized data access

## 🚀 Deployment

### Deploy Everything
```bash
# Deploy functions
firebase deploy --only functions

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy hosting (if needed)
firebase deploy --only hosting
```

### Test Locally
```bash
# Start Firebase emulators
firebase emulators:start

# Test functions locally
curl http://localhost:5001/your-project/us-central1/fetchGoogleReviews
```

## 📈 Monitoring

### Cloud Functions Monitoring
1. Go to Firebase Console
2. Functions → Usage
3. Monitor execution and errors

### Firestore Monitoring
1. Firebase Console → Firestore
2. Usage tab
3. Monitor reads/writes

## 🔄 Automation

### Scheduled Updates
The system automatically fetches new reviews every 24 hours via scheduled Cloud Function.

### Manual Refresh
```bash
# Trigger immediate refresh
firebase functions:shell
> fetchGoogleReviews()
```

## 🎨 Customization

### Styling
All components use styled-components. Customize themes in component files.

### Layout Options
- `grid`: Responsive grid layout
- `carousel`: Slider layout (future feature)

### Filter Options
- All reviews
- 5★ only
- 4★ only
- 3★ only

## 🐛 Troubleshooting

### Common Issues

**API Key Error**
```
Error: Google Places API key not configured
```
Solution: Set environment variables in Firebase Functions config.

**No Reviews Loading**
```
Error: Failed to load reviews
```
Solution: Check Place ID and API key validity.

**Firestore Permission Error**
```
Error: Missing or insufficient permissions
```
Solution: Deploy Firestore security rules.

**Cloud Function Timeout**
```
Error: Function execution timed out
```
Solution: Increase timeout in Firebase Console.

### Debug Mode
```tsx
// Enable debug logging
<ReviewsSection 
  debug={true}
  onReviewsLoaded={(reviews) => console.log('Loaded:', reviews)}
  onError={(error) => console.error('Error:', error)}
/>
```

## 📞 Support

### Google Places API
- [Documentation](https://developers.google.com/maps/documentation/places/web-service)
- [Quotas](https://console.cloud.google.com/apis/places)

### Firebase
- [Cloud Functions](https://firebase.google.com/docs/functions)
- [Firestore](https://firebase.google.com/docs/firestore)

### Custom Support
Check the code comments and TypeScript interfaces for detailed documentation.

## 🔄 Updates & Maintenance

### Monthly Tasks
- Monitor API usage quotas
- Check Cloud Function logs
- Review review data quality

### Quarterly Tasks
- Update dependencies
- Review security rules
- Optimize performance

## 📱 Mobile Optimization

All components are fully responsive and optimized for mobile devices.

## 🌍 Localization

Supports multiple languages via Google Places API language parameter.

---

**Ready to go! 🚀 Your custom Google Reviews system is now set up and ready to use!**
