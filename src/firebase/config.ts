// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Validate required environment variables
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  if (process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Missing Firebase environment variables:', missingEnvVars);
    console.warn('📝 Please add these to your .env file or Netlify environment variables');
    console.warn('📋 See .env.example for required variables');
    
    // For development, we'll throw the error to make it obvious
    throw new Error(`Missing Firebase configuration: ${missingEnvVars.join(', ')}`);
  } else {
    // In production, this should never happen if Netlify env vars are set
    console.error('❌ Missing Firebase configuration in production');
    throw new Error(`Missing Firebase configuration: ${missingEnvVars.join(', ')}`);
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Export app instance
export default app;
