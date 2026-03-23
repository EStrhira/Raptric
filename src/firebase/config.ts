// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase instances - will be initialized at runtime
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;
let googleProvider: any = null;

// Get Firebase configuration from environment variables
const getFirebaseConfig = () => {
  // In production/build, these will be undefined at build time
  // and only populated at runtime by Netlify
  const config = {
    apiKey: undefined as string | undefined,
    authDomain: undefined as string | undefined,
    projectId: undefined as string | undefined,
    storageBucket: undefined as string | undefined,
    messagingSenderId: undefined as string | undefined,
    appId: undefined as string | undefined,
    measurementId: undefined as string | undefined
  };

  // Only populate with environment variables at runtime
  if (typeof window !== 'undefined' && process.env.REACT_APP_FIREBASE_API_KEY) {
    config.apiKey = process.env.REACT_APP_FIREBASE_API_KEY;
    config.authDomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
    config.projectId = process.env.REACT_APP_FIREBASE_PROJECT_ID;
    config.storageBucket = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
    config.messagingSenderId = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
    config.appId = process.env.REACT_APP_FIREBASE_APP_ID;
    config.measurementId = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;
  }

  // Validate required environment variables
  const requiredVars: (keyof typeof config)[] = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingVars = requiredVars.filter(varName => !config[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing Firebase configuration: ${missingVars.join(', ')}. Please check your environment variables.`);
  }

  return config;
};

// Initialize Firebase - called only when needed
const initializeFirebase = () => {
  if (app) return app; // Already initialized

  try {
    const firebaseConfig = getFirebaseConfig();
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
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error;
  }
};

// Lazy initialization functions - Firebase only initialized when actually used
export const getFirebaseApp = () => {
  if (!app) initializeFirebase();
  return app;
};

export const getFirebaseAuth = () => {
  if (!auth) initializeFirebase();
  return auth;
};

export const getFirebaseDb = () => {
  if (!db) initializeFirebase();
  return db;
};

export const getFirebaseStorage = () => {
  if (!storage) initializeFirebase();
  return storage;
};

export const getFirebaseAnalytics = () => {
  if (!analytics) initializeFirebase();
  return analytics;
};

export const getGoogleProvider = () => {
  if (!googleProvider) initializeFirebase();
  return googleProvider;
};

// Initialize Firebase immediately for backward compatibility
// But only in development, not in production build
if (process.env.NODE_ENV === 'development') {
  initializeFirebase();
}

// Export the instances (will be null in production until initialized)
export { app, auth, db, storage, analytics, googleProvider };

export default getFirebaseApp;
