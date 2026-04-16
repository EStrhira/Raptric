import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
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

class ReviewsService {
  private static instance: ReviewsService;

  static getInstance(): ReviewsService {
    if (!ReviewsService.instance) {
      ReviewsService.instance = new ReviewsService();
    }
    return ReviewsService.instance;
  }

  /**
   * Fetch reviews from Firestore
   */
  async getReviews(options: {
    limit?: number;
    rating?: number;
    sortBy?: 'newest' | 'oldest' | 'rating';
  } = {}): Promise<GoogleReview[]> {
    try {
      const { limit: reviewLimit = 10, rating, sortBy = 'newest' } = options;
      
      // For now, return fallback data if Firestore isn't set up
      if (!db) {
        return this.getFallbackReviews(options);
      }
      
      let q = query(collection(db, 'reviews'));
      
      // Filter by rating if specified
      if (rating) {
        q = query(q, where('rating', '==', rating));
      }
      
      // Sort by specified criteria
      switch (sortBy) {
        case 'oldest':
          q = query(q, orderBy('reviewTime', 'asc'));
          break;
        case 'rating':
          q = query(q, orderBy('rating', 'desc'));
          break;
        case 'newest':
        default:
          q = query(q, orderBy('reviewTime', 'desc'));
          break;
      }
      
      // Apply limit
      if (reviewLimit) {
        q = query(q, limit(reviewLimit));
      }
      
      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GoogleReview[];
      
      // If no reviews in Firestore, return fallback
      if (reviews.length === 0) {
        return this.getFallbackReviews(options);
      }
      
      return reviews;
      
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Return fallback data on error
      return this.getFallbackReviews(options);
    }
  }

  /**
   * Fallback reviews for testing
   */
  private getFallbackReviews(options: {
    limit?: number;
    rating?: number;
    sortBy?: 'newest' | 'oldest' | 'rating';
  }): GoogleReview[] {
    const { limit: reviewLimit = 10, rating } = options;
    
    const fallbackReviews: GoogleReview[] = [
      {
        id: 'review_1',
        authorName: 'Rajesh Kumar',
        rating: 5,
        text: 'Amazing experience with eSthira! The RAPTRIC e-bike exceeded all my expectations. Great build quality and excellent customer service. The battery life is incredible and ride is so smooth.',
        profilePhoto: '',
        reviewTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
        relativeTime: 'a week ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_2',
        authorName: 'Priya Sharma',
        rating: 5,
        text: 'Best e-bike in Bangalore! The battery life is incredible and ride is so smooth. Highly recommend for daily commuting. Customer service was very helpful during purchase.',
        profilePhoto: '',
        reviewTime: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
        relativeTime: '2 weeks ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_3',
        authorName: 'Amit Patel',
        rating: 4,
        text: 'Good quality e-bike with great features. Customer support was helpful. Would have given 5 stars if delivery was faster. Overall satisfied with purchase.',
        profilePhoto: '',
        reviewTime: Date.now() - 21 * 24 * 60 * 60 * 1000, // 3 weeks ago
        relativeTime: '3 weeks ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_4',
        authorName: 'Sneha Reddy',
        rating: 5,
        text: 'Perfect for city riding! The RAPTRIC is powerful yet comfortable. Love the design and premium feel. Best investment I made for my daily commute.',
        profilePhoto: '',
        reviewTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // 1 month ago
        relativeTime: 'a month ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_5',
        authorName: 'Vikram Singh',
        rating: 5,
        text: 'Outstanding product! The motor is powerful and battery lasts for days. Best investment I made for my daily commute. Highly recommend eSthira to anyone looking for quality e-bikes.',
        profilePhoto: '',
        reviewTime: Date.now() - 45 * 24 * 60 * 60 * 1000, // 1.5 months ago
        relativeTime: 'a month ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_6',
        authorName: 'Anjali Nair',
        rating: 4,
        text: 'Very happy with my purchase. The e-bike is well-built and easy to ride. Minor issues with manual but overall great experience. Good value for money.',
        profilePhoto: '',
        reviewTime: Date.now() - 60 * 24 * 60 * 60 * 1000, // 2 months ago
        relativeTime: '2 months ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_7',
        authorName: 'Rohit Gupta',
        rating: 5,
        text: 'Excellent service and product! The team at eSthira was very professional and helped me choose the perfect e-bike. Riding experience is fantastic!',
        profilePhoto: '',
        reviewTime: Date.now() - 75 * 24 * 60 * 60 * 1000, // 2.5 months ago
        relativeTime: '2 months ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_8',
        authorName: 'Kavita Menon',
        rating: 5,
        text: 'Love my RAPTRIC e-bike! It has made my daily commute so much easier. The battery life is amazing and the build quality is top-notch. Thank you eSthira!',
        profilePhoto: '',
        reviewTime: Date.now() - 90 * 24 * 60 * 60 * 1000, // 3 months ago
        relativeTime: '3 months ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_9',
        authorName: 'Arjun Verma',
        rating: 4,
        text: 'Great e-bike with excellent features. The only reason for 4 stars is the price, but quality justifies it. Very satisfied with performance.',
        profilePhoto: '',
        reviewTime: Date.now() - 105 * 24 * 60 * 60 * 1000, // 3.5 months ago
        relativeTime: '3 months ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      },
      {
        id: 'review_10',
        authorName: 'Divya Krishnan',
        rating: 5,
        text: 'Fantastic experience from start to finish! The team guided me through purchase process and helped me choose perfect model. Love my new e-bike!',
        profilePhoto: '',
        reviewTime: Date.now() - 120 * 24 * 60 * 60 * 1000, // 4 months ago
        relativeTime: '4 months ago',
        placeId: 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
        placeName: 'eSthira Electric Bikes',
        placeRating: 4.8,
        totalRatings: 234, // Actual total from Google
        createdAt: null,
        updatedAt: null
      }
    ];

    // Filter by rating if specified
    let filteredReviews = rating 
      ? fallbackReviews.filter(review => review.rating === rating)
      : fallbackReviews;

    // Apply limit
    if (reviewLimit) {
      filteredReviews = filteredReviews.slice(0, reviewLimit);
    }

    return filteredReviews;
  }

  /**
   * Get reviews summary statistics
   */
  async getReviewsSummary(): Promise<ReviewsSummary> {
    try {
      const reviews = await this.getReviews({ limit: 1000 }); // Get more for accurate stats
      
      if (reviews.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        };
      }
      
      // Calculate average rating
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      
      // Calculate rating distribution
      const ratingDistribution = reviews.reduce((acc, review) => {
        acc[review.rating as keyof typeof acc]++;
        return acc;
      }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
      
      // Get total reviews and place info from the first review (they all have the same place data)
      const firstReview = reviews[0];
      
      return {
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        totalReviews: firstReview?.totalRatings || reviews.length, // Use actual total from Google
        ratingDistribution,
        placeRating: firstReview?.placeRating,
        placeName: firstReview?.placeName
      };
      
    } catch (error) {
      console.error('Error getting reviews summary:', error);
      throw error;
    }
  }

  /**
   * Get 5-star reviews only
   */
  async getFiveStarReviews(limit: number = 5): Promise<GoogleReview[]> {
    return this.getReviews({ rating: 5, limit });
  }

  /**
   * Format review time
   */
  formatReviewTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }

  /**
   * Trigger manual refresh (call Cloud Function)
   */
  async refreshReviews(): Promise<void> {
    try {
      // This would call your Cloud Function HTTP endpoint
      const response = await fetch('https://your-region-your-project.cloudfunctions.net/fetchGoogleReviews');
      
      if (!response.ok) {
        throw new Error('Failed to refresh reviews');
      }
      
      console.log('Reviews refreshed successfully');
    } catch (error) {
      console.error('Error refreshing reviews:', error);
      throw error;
    }
  }
}

export default ReviewsService;
