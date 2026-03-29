const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { GooglePlacesApi } = require('@googlemaps/google-maps-services-js');
const {
  corsHandler,
  contactFormSchema,
  orderConfirmationSchema,
  welcomeEmailSchema,
  emailTemplates,
  sendEmail
} = require('./emailService');

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Google Places API client
const client = new GooglePlacesApi({});

// Configuration
const CONFIG = {
  // Your Google Place ID - get this from Google Maps
  PLACE_ID: process.env.GOOGLE_PLACE_ID || 'YOUR_PLACE_ID',
  // Firestore collection name
  COLLECTION_NAME: 'reviews',
  // Maximum reviews to fetch
  MAX_REVIEWS: 50
};

/**
 * Cloud Function to fetch Google reviews and store in Firestore
 * Triggered via HTTP request or scheduled
 */
exports.fetchGoogleReviews = functions.https.onRequest(async (req, res) => {
  try {
    console.log('Starting Google reviews fetch...');
    
    // Verify API key is configured
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      throw new Error('Google Places API key not configured');
    }

    // Fetch reviews from Google Places API
    const reviews = await fetchReviewsFromGoogle();
    
    // Store reviews in Firestore
    await storeReviewsInFirestore(reviews);
    
    console.log(`Successfully fetched and stored ${reviews.length} reviews`);
    
    res.status(200).json({
      success: true,
      message: `Successfully fetched and stored ${reviews.length} reviews`,
      count: reviews.length
    });
    
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Scheduled function to fetch reviews daily
 */
exports.scheduledFetchGoogleReviews = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      console.log('Running scheduled Google reviews fetch...');
      
      if (!process.env.GOOGLE_PLACES_API_KEY) {
        console.error('Google Places API key not configured');
        return null;
      }

      const reviews = await fetchReviewsFromGoogle();
      await storeReviewsInFirestore(reviews);
      
      console.log(`Scheduled fetch completed: ${reviews.length} reviews`);
      return null;
      
    } catch (error) {
      console.error('Error in scheduled fetch:', error);
      return null;
    }
  });

/**
 * Fetch reviews from Google Places API
 */
async function fetchReviewsFromGoogle() {
  try {
    const response = await client.placeDetails({
      params: {
        place_id: CONFIG.PLACE_ID,
        fields: ['name', 'rating', 'user_ratings_total', 'reviews'],
        language: 'en',
        reviews_sort: 'most_relevant'
      },
      key: process.env.GOOGLE_PLACES_API_KEY
    });

    if (!response.data.result) {
      throw new Error('No data returned from Google Places API');
    }

    const place = response.data.result;
    const reviews = place.reviews || [];

    console.log(`Fetched ${reviews.length} reviews from Google Places API`);

    // Transform reviews to our format
    return reviews.map((review, index) => ({
      id: `${place.place_id}_${review.time}_${index}`, // Unique ID
      authorName: review.author_name || 'Anonymous',
      rating: review.rating || 5,
      text: review.text || '',
      profilePhoto: review.profile_photo_url || '',
      reviewTime: review.time || Date.now(),
      relativeTime: review.relative_time_description || '',
      placeId: place.place_id,
      placeName: place.name,
      placeRating: place.rating,
      totalRatings: place.user_ratings_total,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }));

  } catch (error) {
    console.error('Error fetching from Google Places API:', error);
    throw new Error(`Google Places API error: ${error.message}`);
  }
}

/**
 * Store reviews in Firestore
 */
async function storeReviewsInFirestore(reviews) {
  const db = admin.firestore();
  const collection = db.collection(CONFIG.COLLECTION_NAME);
  
  // Use batch for better performance
  const batch = db.batch();
  
  for (const review of reviews) {
    const docRef = collection.doc(review.id);
    batch.set(docRef, review, { merge: true }); // merge to update existing
  }
  
  await batch.commit();
  console.log(`Stored ${reviews.length} reviews in Firestore`);
}

/**
 * Get reviews from Firestore (for testing)
 */
exports.getReviews = functions.https.onRequest(async (req, res) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection(CONFIG.COLLECTION_NAME)
      .orderBy('reviewTime', 'desc')
      .limit(20)
      .get();
    
    const reviews = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.status(200).json({
      success: true,
      reviews,
      count: reviews.length
    });
    
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Delete old reviews (cleanup function)
 */
exports.cleanupOldReviews = functions.https.onRequest(async (req, res) => {
  try {
    const db = admin.firestore();
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - 6); // Keep last 6 months
    
    const snapshot = await db.collection(CONFIG.COLLECTION_NAME)
      .where('reviewTime', '<', cutoffDate.getTime())
      .get();
    
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    console.log(`Cleaned up ${snapshot.size} old reviews`);
    
    res.status(200).json({
      success: true,
      message: `Cleaned up ${snapshot.size} old reviews`
    });
    
  } catch (error) {
    console.error('Error cleaning up reviews:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ==================== EMAIL FUNCTIONS ====================

/**
 * Cloud Function to send contact form email
 * POST /send-contact-email
 */
exports.sendContactEmail = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
      }

      // Validate request body
      const { error, value } = contactFormSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input data',
          details: error.details.map(d => d.message)
        });
      }

      const { name, email, message, phone } = value;

      // Send email to admin
      const emailTemplate = emailTemplates.contactForm({ name, email, message, phone });
      await sendEmail('info.esthira@gmail.com', emailTemplate.subject, emailTemplate.html);

      console.log(`Contact form email sent from ${email}`);

      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully'
      });

    } catch (error) {
      console.error('Error sending contact email:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send contact email',
        message: error.message
      });
    }
  });
});

/**
 * Cloud Function to send order confirmation email
 * POST /send-order-email
 */
exports.sendOrderEmail = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
      }

      // Validate request body
      const { error, value } = orderConfirmationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input data',
          details: error.details.map(d => d.message)
        });
      }

      const { orderId, userEmail, userName, orderItems, totalAmount, shippingAddress, estimatedDelivery, paymentMethod } = value;

      // Send order confirmation email to user
      const emailTemplate = emailTemplates.orderConfirmation({
        orderId,
        userEmail,
        userName,
        orderItems,
        totalAmount,
        shippingAddress,
        estimatedDelivery,
        paymentMethod
      });

      await sendEmail(userEmail, emailTemplate.subject, emailTemplate.html);

      console.log(`Order confirmation email sent to ${userEmail} for order ${orderId}`);

      res.status(200).json({
        success: true,
        message: 'Order confirmation email sent successfully'
      });

    } catch (error) {
      console.error('Error sending order email:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send order email',
        message: error.message
      });
    }
  });
});

/**
 * Cloud Function to send welcome email
 * POST /send-welcome-email
 */
exports.sendWelcomeEmail = functions.https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
      }

      // Validate request body
      const { error, value } = welcomeEmailSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          error: 'Invalid input data',
          details: error.details.map(d => d.message)
        });
      }

      const { userEmail, userName, loginMethod } = value;

      // Send welcome email to user
      const emailTemplate = emailTemplates.welcomeEmail({
        userEmail,
        userName,
        loginMethod
      });

      await sendEmail(userEmail, emailTemplate.subject, emailTemplate.html);

      console.log(`Welcome email sent to ${userEmail}`);

      res.status(200).json({
        success: true,
        message: 'Welcome email sent successfully'
      });

    } catch (error) {
      console.error('Error sending welcome email:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send welcome email',
        message: error.message
      });
    }
  });
});
