// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqDlkTbxnSspi6YE3magsTBl9fyF4vjfo",
  authDomain: "esthira-raptric.firebaseapp.com",
  projectId: "esthira-raptric",
  storageBucket: "esthira-raptric.firebasestorage.app",
  messagingSenderId: "296648703385",
  appId: "1:296648703385:web:55a45b235b9cb486d9e708",
  measurementId: "G-F5L1D7JM1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Export the app instance
export default app;
