import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * Firebase configuration interface for type safety
 */
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

/**
 * 🔥 ENVIRONMENT VARIABLE CONFIGURATION WITH FALLBACK
 * 
 * This reads from .env file and validates the configuration
 * Falls back to inline config if environment variables are not loading
 */
const getFirebaseConfig = (): FirebaseConfig => {
  // Read environment variables (Create React App uses process.env)
  const config: Record<string, string | undefined> = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  // Debug: Log all environment variables
  console.log('🔍 Firebase Environment Variables Debug:');
  console.log('=====================================');
  Object.entries(config).forEach(([key, value]) => {
    const isReal = value && 
      value.startsWith('AIzaSy') && 
      !value.includes('your_') && 
      !value.includes('here') && 
      !value.includes('xxxxx') &&
      !value.includes('demo-');
    
    let status = '❌';
    let displayValue = 'undefined';
    
    if (value) {
      if (isReal) {
        status = '✅';
        displayValue = value.substring(0, 20) + '...';
      } else if (value.includes('your_')) {
        status = '⚠️';
        displayValue = 'PLACEHOLDER';
      } else {
        status = '❓';
        displayValue = value.substring(0, 20) + '...';
      }
    }
    
    console.log(`${status} ${key}: ${displayValue}`);
  });
  console.log('=====================================');

  // Check if environment variables are loaded
  const hasEnvVars = config.apiKey && config.authDomain && config.projectId && config.appId;
  
  if (!hasEnvVars) {
    console.warn('⚠️ Environment variables not loaded, using inline configuration');
    
    // Fallback to inline configuration
    const fallbackConfig: FirebaseConfig = {
      apiKey: "AIzaSyBqDlkTbxnSspi6YE3magsTBl9fyF4vjfo",
      authDomain: "esthira-raptric.firebaseapp.com",
      projectId: "esthira-raptric",
      storageBucket: "esthira-raptric.firebasestorage.app",
      messagingSenderId: "296648703385",
      appId: "1:296648703385:web:55a45b235b9cb486d9e708",
      measurementId: "GF5L1D7JM1F"
    };
    
    console.log('✅ Using fallback Firebase configuration');
    return fallbackConfig;
  }

  // Validate required fields
  const requiredFields: (keyof typeof config)[] = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    throw new Error(
      `🚨 Firebase Configuration Error: Missing required environment variables: ${missingFields.join(', ')}\n` +
      `Please add these to your .env file:\n` +
      `REACT_APP_FIREBASE_API_KEY=your_api_key\n` +
      `REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com\n` +
      `REACT_APP_FIREBASE_PROJECT_ID=your-project-id\n` +
      `REACT_APP_FIREBASE_APP_ID=your_app_id`
    );
  }

  // Validate that values are not placeholders
  const placeholderPatterns = [
    'your_api_key',
    'your-project',
    'your_app_id',
    'xxxxx',
    'demo-api-key'
  ];

  const hasPlaceholders = Object.values(config).some(value => 
    value && placeholderPatterns.some(pattern => value.includes(pattern))
  );

  if (hasPlaceholders) {
    throw new Error(
      `🚨 Firebase Configuration Error: Environment variables contain placeholder values.\n` +
      `Please replace placeholder values with your actual Firebase credentials from the Firebase Console.\n` +
      `Current API key: "${config.apiKey || 'undefined'}"`
    );
  }

  // Validate API key format (Firebase API keys start with "AIzaSy")
  if (!config.apiKey?.startsWith('AIzaSy')) {
    throw new Error(
      `🚨 Firebase Configuration Error: Invalid API key format.\n` +
      `Firebase API keys should start with "AIzaSy". Current key: "${config.apiKey || 'undefined'}"\n` +
      `Please check your REACT_APP_FIREBASE_API_KEY in your .env file.`
    );
  }

  return config as unknown as FirebaseConfig;
};

// Get and validate configuration
let firebaseConfig: FirebaseConfig;
try {
  firebaseConfig = getFirebaseConfig();
} catch (error) {
  console.error('❌ Firebase Configuration Failed:', error);
  throw error; // Re-throw to prevent app from running with invalid config
}

// Debug configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('🔥 Firebase Configuration Status:');
  console.log('=====================================');
  console.log(`✅ Project: ${firebaseConfig.projectId}`);
  console.log(`✅ Auth Domain: ${firebaseConfig.authDomain}`);
  console.log(`✅ API Key: ${firebaseConfig.apiKey.substring(0, 10)}...`);
  console.log(`✅ App ID: ${firebaseConfig.appId}`);
  console.log('=====================================');
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase initialized successfully');

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Configure Google Auth provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export configuration status for components
export const firebaseConfigStatus = {
  isConfigured: true,
  projectId: firebaseConfig.projectId,
  hasValidApiKey: firebaseConfig.apiKey.startsWith('AIzaSy')
};

export default app;