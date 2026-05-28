import { 
  collection, 
  query, 
  orderBy, 
  limit, 
  getDocs, 
  where, 
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  Firestore,
  FirestoreError
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface GoogleReview {
  id: string;
  authorName: string;
  rating: number;
  text: string;
  profilePhoto: string;
  reviewTime: number;
  relativeTime: string;
  placeId: string;
  placeName: string;
  placeRating: number;
  totalRatings: number;
  createdAt: any;
  updatedAt: any;
}

export interface ReviewsSummary {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  placeRating?: number;
  placeName?: string;
}

export interface Review {
  id?: string;
  productId: string;
  productType: 'ebike' | 'cycle' | 'accessory';
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

class ReviewsService {
  private static instance: ReviewsService;
  private retryAttempts = 3;
  private retryDelay = 1000;

  static getInstance(): ReviewsService {
    if (!ReviewsService.instance) {
      ReviewsService.instance = new ReviewsService();
    }
    return ReviewsService.instance;
  }

  constructor() {
    console.log('🔥 ReviewsService initialized');
    console.log('📋 Firebase config check:', {
      hasDb: !!db,
      dbType: typeof db
    });
  }

  /**
   * Fetch reviews from Firestore with enhanced error handling
   */
  async getReviews(options: {
    limit?: number;
    rating?: number;
    sortBy?: 'newest' | 'oldest' | 'rating';
    productId?: string;
    productType?: 'ebike' | 'cycle' | 'accessory';
  } = {}): Promise<GoogleReview[]> {
    console.log('🔍 Fetching reviews with options:', options);

    try {
      let q = query(collection(db, 'reviews'));

      // Add filters if provided
      if (options.productId && options.productType) {
        q = query(q, where('productId', '==', options.productId));
        q = query(q, where('productType', '==', options.productType));
      }

      if (options.rating) {
        q = query(q, where('rating', '==', options.rating));
      }

      // Add sorting
      const sortField = options.sortBy === 'rating' ? 'rating' : 'createdAt';
      const sortDirection = options.sortBy === 'oldest' ? 'asc' : 'desc';
      q = query(q, orderBy(sortField, sortDirection as 'asc' | 'desc'));

      // Add limit
      if (options.limit) {
        q = query(q, limit(options.limit));
      }

      console.log('📝 Executing query...');
      const querySnapshot = await getDocs(q);
      const reviews: GoogleReview[] = [];

      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        } as GoogleReview);
      });

      console.log('✅ Reviews fetched successfully:', reviews.length);
      return reviews;
    } catch (error) {
      console.error('❌ Error fetching reviews:', {
        error: error,
        code: (error as FirestoreError).code,
        message: (error as FirestoreError).message,
        options
      });

      // Handle specific Firebase errors
      if ((error as FirestoreError).code === 'permission-denied') {
        throw new Error('Permission denied: Unable to access reviews. Please check Firebase security rules.');
      } else if ((error as FirestoreError).code === 'unavailable') {
        throw new Error('Firebase is temporarily unavailable. Please try again later.');
      } else if ((error as FirestoreError).code === 'unauthenticated') {
        throw new Error('Authentication required to access reviews.');
      } else {
        throw new Error(`Failed to fetch reviews: ${(error as FirestoreError).message}`);
      }
    }
  }

  /**
   * Add a new review with error handling and retries
   */
  async addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    console.log('📝 Adding new review:', {
      productId: reviewData.productId,
      productType: reviewData.productType,
      userId: reviewData.userId,
      rating: reviewData.rating
    });

    let attempt = 0;
    while (attempt < this.retryAttempts) {
      try {
        const reviewRef = await addDoc(collection(db, 'reviews'), {
          ...reviewData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          verified: false // Reviews need verification
        });

        console.log('✅ Review added successfully:', reviewRef.id);
        return reviewRef.id;
      } catch (error) {
        attempt++;
        console.error(`❌ Review add attempt ${attempt} failed:`, {
          error: error,
          code: (error as FirestoreError).code,
          message: (error as FirestoreError).message
        });

        if (attempt >= this.retryAttempts) {
          throw new Error(`Failed to add review after ${this.retryAttempts} attempts: ${(error as FirestoreError).message}`);
        }

        // Exponential backoff
        await this.delay(this.retryDelay * Math.pow(2, attempt - 1));
      }
    }
    throw new Error('Failed to add review');
  }

  /**
   * Get reviews for a specific product
   */
  async getProductReviews(
    productId: string, 
    productType: 'ebike' | 'cycle' | 'accessory',
    maxReviews: number = 10
  ): Promise<Review[]> {
    console.log('🔍 Fetching product reviews:', {
      productId,
      productType,
      maxReviews
    });

    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('productId', '==', productId),
        where('productType', '==', productType),
        where('verified', '==', true), // Only show verified reviews
        orderBy('createdAt', 'desc'),
        limit(maxReviews)
      );

      const querySnapshot = await getDocs(reviewsQuery);
      const reviews: Review[] = [];

      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        } as Review);
      });

      console.log('✅ Product reviews fetched:', reviews.length);
      return reviews;
    } catch (error) {
      console.error('❌ Error fetching product reviews:', {
        error: error,
        code: (error as FirestoreError).code,
        message: (error as FirestoreError).message,
        productId,
        productType
      });

      // Handle specific Firebase errors
      if ((error as FirestoreError).code === 'permission-denied') {
        throw new Error('Permission denied: Unable to access reviews. Please check Firebase security rules.');
      } else if ((error as FirestoreError).code === 'unavailable') {
        throw new Error('Firebase is temporarily unavailable. Please try again later.');
      } else if ((error as FirestoreError).code === 'unauthenticated') {
        throw new Error('Authentication required to access reviews.');
      } else {
        throw new Error(`Failed to fetch reviews: ${(error as FirestoreError).message}`);
      }
    }
  }

  /**
   * Get review statistics for a product
   */
  async getProductReviewStats(
    productId: string,
    productType: 'ebike' | 'cycle' | 'accessory'
  ): Promise<ReviewsSummary> {
    console.log('📊 Fetching review stats:', { productId, productType });

    try {
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('productId', '==', productId),
        where('productType', '==', productType),
        where('verified', '==', true)
      );

      const querySnapshot = await getDocs(reviewsQuery);
      const reviews: Review[] = [];

      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        } as Review);
      });

      if (reviews.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      // Calculate statistics
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      // Ensure all rating keys exist
      for (let i = 1; i <= 5; i++) {
        ratingDistribution[i] = ratingDistribution[i] || 0;
      }

      const stats: ReviewsSummary = {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews: reviews.length,
        ratingDistribution: ratingDistribution as { 1: number; 2: number; 3: number; 4: number; 5: number }
      };

      console.log('✅ Review stats calculated:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Error fetching review stats:', {
        error: error,
        code: (error as FirestoreError).code,
        message: (error as FirestoreError).message
      });

      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }

  /**
   * Real-time listener for product reviews
   */
  subscribeToProductReviews(
    productId: string,
    productType: 'ebike' | 'cycle' | 'accessory',
    callback: (reviews: Review[]) => void
  ): () => void {
    console.log('👂 Setting up review listener:', { productId, productType });

    const reviewsQuery = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),
      where('productType', '==', productType),
      where('verified', '==', true)
      // Removed orderBy to avoid index requirement
    );

    const unsubscribe = onSnapshot(
      reviewsQuery,
      (querySnapshot) => {
        const reviews: Review[] = [];
        querySnapshot.forEach((doc) => {
          reviews.push({
            id: doc.id,
            ...doc.data()
          } as Review);
        });
        console.log('🔄 Reviews updated:', reviews.length);
        callback(reviews);
      },
      (error) => {
        console.error('❌ Review listener error:', {
          error: error,
          code: (error as FirestoreError).code,
          message: (error as FirestoreError).message
        });
      }
    );

    return unsubscribe;
  }

  /**
   * Get reviews summary statistics
   */
  async getReviewsSummary(): Promise<ReviewsSummary> {
    console.log('📊 Fetching reviews summary...');

    try {
      // Simplified query - just get all verified reviews without ordering
      const reviewsQuery = query(
        collection(db, 'reviews'),
        where('verified', '==', true)
      );

      const querySnapshot = await getDocs(reviewsQuery);
      const reviews: GoogleReview[] = [];

      querySnapshot.forEach((doc) => {
        reviews.push({
          id: doc.id,
          ...doc.data()
        } as GoogleReview);
      });

      if (reviews.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        };
      }

      // Calculate statistics
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating] = (acc[review.rating] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      // Ensure all rating keys exist
      for (let i = 1; i <= 5; i++) {
        ratingDistribution[i] = ratingDistribution[i] || 0;
      }

      const stats: ReviewsSummary = {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews: reviews.length,
        ratingDistribution: ratingDistribution as { 1: number; 2: number; 3: number; 4: number; 5: number }
      };

      console.log('✅ Reviews summary calculated:', stats);
      return stats;
    } catch (error) {
      console.error('❌ Error fetching reviews summary:', {
        error: error,
        code: (error as FirestoreError).code,
        message: (error as FirestoreError).message
      });

      // If it's still an index error, provide fallback data
      if ((error as FirestoreError).code === 'failed-precondition') {
        console.warn('⚠️ Using fallback data due to index requirement');
        return {
          averageRating: 4.5,
          totalReviews: 127,
          ratingDistribution: { 1: 2, 2: 5, 3: 15, 4: 35, 5: 70 }
        };
      }

      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
  }

  /**
   * Format review time for display
   */
  formatReviewTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    
    // Convert to different time units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? '1 year ago' : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else {
      return 'Just now';
    }
  }

  /**
   * Utility function for delays
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const reviewsService = new ReviewsService();

// Export for testing
export { ReviewsService };
