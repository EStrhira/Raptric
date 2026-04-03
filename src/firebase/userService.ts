import { 
  doc, 
  collection, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  Timestamp 
} from "firebase/firestore";
import { 
  signInWithPopup, 
  signOut as firebaseSignOut
} from "firebase/auth";
import { auth, db, googleProvider } from "./config";

// Interfaces
export interface UserProfile {
  uid?: string;
  name: string;
  email: string;
  phone: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserAddress {
  id: string;
  type: 'billing' | 'shipping';
  companyName?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gst?: string;
  isDefault: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface UserOrder {
  id: string;
  orderNumber: string;
  totalAmount: number;
  items: any[];
  billingAddress: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>;
  shippingAddress: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

class UserService {
  // AUTHENTICATION METHODS
  async signInWithGoogle(): Promise<any> {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Create or update user profile
      const existingProfile = await this.getUser(result.user.uid);
      if (!existingProfile) {
        await this.createUser(result.user);
      }
      
      return result.user;
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      // Ignore popup-closed-by-user error
      if (error.message && error.message.includes('auth/popup-closed-by-user')) {
        // Re-throw a silent error that will be caught and ignored by the UI
        throw new Error('auth/popup-closed-by-user');
      }
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  // USER OPERATIONS
  async createUser(user: any): Promise<UserProfile> {
    try {
      const userProfile: UserProfile = {
        uid: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        phone: user.phoneNumber || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(doc(db, "users", user.uid), userProfile);
      return userProfile;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(uid: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists() ? userDoc.data() as UserProfile : null;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  }

  async updateUser(uid: string, updates: Partial<UserProfile>): Promise<void> {
    try {
      await updateDoc(doc(db, "users", uid), {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // ADDRESS OPERATIONS (SUBCOLLECTION)
  async addAddress(uid: string, address: Omit<UserAddress, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserAddress> {
    try {
      const addressRef = doc(collection(db, "users", uid, "addresses"));
      
      const newAddress: UserAddress = {
        ...address,
        id: addressRef.id,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(addressRef, newAddress);
      return newAddress;
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  }

  async getAddresses(uid: string): Promise<UserAddress[]> {
    try {
      const addressesQuery = query(
        collection(db, "users", uid, "addresses"),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(addressesQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserAddress));
    } catch (error) {
      console.error('Error getting addresses:', error);
      return [];
    }
  }

  async updateAddress(uid: string, addressId: string, updates: Partial<UserAddress>): Promise<void> {
    try {
      const addressRef = doc(db, "users", uid, "addresses", addressId);
      const addressDoc = await getDoc(addressRef);
      if (addressDoc.exists()) {
        const addressData = addressDoc.data() as UserAddress;
        await updateDoc(addressRef, {
          ...addressData,
          ...updates,
          updatedAt: Timestamp.now()
        });
      } else {
        console.error('Error updating address: Address not found');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  }

  async deleteAddress(uid: string, addressId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, "users", uid, "addresses", addressId));
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  }

  // ORDER OPERATIONS (SUBCOLLECTION)
  public generateOrderNumber(): string {
    return `EST${Date.now().toString().slice(-8)}`;
  }

  async createOrder(uid: string, orderData: Omit<UserOrder, 'id' | 'createdAt' | 'updatedAt' | 'orderNumber'>): Promise<UserOrder> {
    try {
      const orderRef = doc(collection(db, "users", uid, "orders"));
      const orderId = orderRef.id;
      
      const newOrder: UserOrder = {
        ...orderData,
        id: orderId,
        orderNumber: this.generateOrderNumber(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await setDoc(orderRef, newOrder);
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrders(uid: string): Promise<UserOrder[]> {
    try {
      const ordersQuery = query(
        collection(db, "users", uid, "orders"),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(ordersQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as UserOrder));
    } catch (error) {
      console.error('Error getting orders:', error);
      return [];
    }
  }

  async getOrder(uid: string, orderId: string): Promise<UserOrder | null> {
    try {
      const orderDoc = await getDoc(doc(db, "users", uid, "orders", orderId));
      return orderDoc.exists() ? {
        id: orderDoc.id,
        ...orderDoc.data()
      } as UserOrder : null;
    } catch (error) {
      console.error('Error getting order:', error);
      return null;
    }
  }

  async updateOrder(uid: string, orderId: string, updates: Partial<UserOrder>): Promise<void> {
    try {
      await updateDoc(doc(db, "users", uid, "orders", orderId), {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }
}

// Singleton instance
const userService = new UserService();
export default userService;
export { UserService };
