import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";
import { auth } from "./config";
import UserService from "./userService";
import { firebaseConfigStatus } from "./config";

class EmailAuthService {
  // Check Firebase configuration before operations
  private checkFirebaseConfig() {
    if (!firebaseConfigStatus.isConfigured) {
      throw new Error('Firebase is not properly configured. Please check your environment variables.');
    }
  }

  // Sign in with email and password
  async signInWithEmail(email: string, password: string) {
    this.checkFirebaseConfig();
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update user profile if needed
      const userProfile = await UserService.getUser(userCredential.user.uid);
      if (!userProfile) {
        await UserService.createUser(userCredential.user);
      }
      
      return userCredential.user;
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      throw this.handleError(error);
    }
  }

  // Create new user with email and password
  async createAccountWithEmail(email: string, password: string, displayName?: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // Create user profile in Firestore
      await UserService.createUser({
        ...userCredential.user,
        displayName: displayName || userCredential.user.displayName
      });
      
      return userCredential.user;
    } catch (error: any) {
      console.error('Error creating account:', error);
      throw this.handleError(error);
    }
  }

  // Send password reset email
  async resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      throw this.handleError(error);
    }
  }

  // Handle Firebase auth errors
  private handleError(error: any): Error {
    let message = 'An error occurred during authentication';
    
    switch (error.code) {
      case 'auth/user-not-found':
        message = 'No account found with this email address.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/email-already-in-use':
        message = 'An account with this email already exists.';
        break;
      case 'auth/weak-password':
        message = 'Password should be at least 6 characters long.';
        break;
      case 'auth/invalid-email':
        message = 'Please enter a valid email address.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection.';
        break;
      default:
        message = error.message || message;
    }
    
    return new Error(message);
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password: string): { isValid: boolean; message: string } {
    if (password.length < 6) {
      return { isValid: false, message: 'Password must be at least 6 characters long.' };
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    }
    
    if (!/(?=.*\d)/.test(password)) {
      return { isValid: false, message: 'Password must contain at least one number.' };
    }
    
    return { isValid: true, message: 'Password is valid.' };
  }
}

const emailAuthService = new EmailAuthService();
export default emailAuthService;
