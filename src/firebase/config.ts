// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration - will be loaded at runtime
let app: any;
let auth: any;
let db: any;
let storage: any;
let analytics: any;
let googleProvider: any;

// Initialize Firebase with runtime environment variables
const initializeFirebase = () => {
  if (app) return app; // Already initialized

  // Get configuration from runtime environment variables
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
    console.warn('⚠️ Missing Firebase environment variables:', missingEnvVars);
    console.warn('📝 Please add these to your .env file or Netlify environment variables');
    console.warn('📋 See .env.example for required variables');
    throw new Error(`Missing Firebase configuration: ${missingEnvVars.join(', ')}`);
  }

  // Initialize Firebase
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  return app;
};

// Initialize Firebase immediately when module is imported
initializeFirebase();

// Export the Firebase instances for backward compatibility
export { app, auth, db, storage, analytics, googleProvider };

export default app;
