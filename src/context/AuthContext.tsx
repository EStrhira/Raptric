import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import UserService, { UserProfile, UserAddress, UserOrder } from '../firebase/userService';
import EmailAuthService from '../firebase/emailAuth';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  userAddresses: UserAddress[];
  userOrders: UserOrder[];
  loading: boolean;
  signInWithGoogle: () => Promise<User>;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  createAccountWithEmail: (email: string, password: string, displayName?: string) => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  addAddress: (address: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>) => Promise<UserAddress>;
  updateAddress: (addressId: string, updates: Partial<UserAddress>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [userOrders, setUserOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = async (): Promise<User> => {
    try {
      const user = await UserService.signInWithGoogle();
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      await UserService.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    try {
      const user = await EmailAuthService.signInWithEmail(email, password);
      return user;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  // Create account with email and password
  const createAccountWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
    try {
      const user = await EmailAuthService.createAccountWithEmail(email, password, displayName);
      return user;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  };

  // Reset password
  const resetPassword = async (email: string): Promise<void> => {
    try {
      await EmailAuthService.resetPassword(email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  };

  // Add address
  const addAddress = async (address: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserAddress> => {
    if (!currentUser) throw new Error('User not authenticated');
    
    try {
      const newAddress = await UserService.addAddress(currentUser.uid, address);
      setUserAddresses(prev => [...prev, newAddress]);
      return newAddress;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  // Update address
  const updateAddress = async (addressId: string, updates: Partial<UserAddress>): Promise<void> => {
    try {
      if (!currentUser) return;
      await UserService.updateAddress(currentUser.uid, addressId, updates);
      setUserAddresses(prev => 
        prev.map(addr => addr.id === addressId ? { ...addr, ...updates } : addr)
      );
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  // Delete address
  const deleteAddress = async (addressId: string): Promise<void> => {
    try {
      if (!currentUser) return;
      await UserService.deleteAddress(currentUser.uid, addressId);
      setUserAddresses(prev => prev.filter(addr => addr.id !== addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };

  // Refresh user data
  const refreshUserData = async (): Promise<void> => {
    if (!currentUser) return;

    try {
      const [profile, addresses, orders] = await Promise.all([
        UserService.getUser(currentUser.uid),
        UserService.getAddresses(currentUser.uid),
        UserService.getOrders(currentUser.uid)
      ]);

      setUserProfile(profile);
      setUserAddresses(addresses);
      setUserOrders(orders);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(true);

      if (user) {
        try {
          // Get or create user profile
          let profile = await UserService.getUser(user.uid);
          if (!profile) {
            profile = await UserService.createUser(user);
          }

          // Get user addresses and orders
          const [addresses, orders] = await Promise.all([
            UserService.getAddresses(user.uid),
            UserService.getOrders(user.uid)
          ]);

          setUserProfile(profile);
          setUserAddresses(addresses);
          setUserOrders(orders);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      } else {
        // Clear user data when signed out
        setUserProfile(null);
        setUserAddresses([]);
        setUserOrders([]);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    userAddresses,
    userOrders,
    loading,
    signInWithGoogle,
    signInWithEmail,
    createAccountWithEmail,
    resetPassword,
    signOut,
    addAddress,
    updateAddress,
    deleteAddress,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
