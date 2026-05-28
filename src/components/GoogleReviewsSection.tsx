import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  background: #000000;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 60px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 40px 20px;
  }
`;

const ReviewsHeader = styled.div`
  margin-bottom: 3rem;
`;

const ReviewsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const ReviewsSubtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ReviewsCard = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 3rem 2rem;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0, 166, 82, 0.1) 0%, rgba(0, 166, 82, 0.05) 100%);
  border: 2px solid rgba(0, 166, 82, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 166, 82, 0.2);
    border-color: rgba(0, 166, 82, 0.6);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-bottom: 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 12px;
  }
`;

const RatingDisplay = styled.div`
  margin-bottom: 2rem;
`;

const Stars = styled.div`
  font-size: 3rem;
  color: #ffd700;
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
  
  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const RatingNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const RatingText = styled.div`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ReviewCount = styled.div`
  font-size: 0.9rem;
  color: #999999;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TrustBadges = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #cccccc;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const BadgeIcon = styled.div`
  color: #00a652;
  font-size: 1.2rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #00a652;
  color: #ffffff;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 166, 82, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const SecondaryButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  color: #00a652;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  border: 2px solid #00a652;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #00a652;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 166, 82, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
  }
`;

const TestimonialPreview = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border-left: 4px solid #00a652;
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TestimonialText = styled.p`
  font-style: italic;
  color: #cccccc;
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 0.95rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const TestimonialAuthor = styled.div`
  font-weight: 600;
  color: #ffffff;
  font-size: 0.9rem;
`;

const TestimonialRole = styled.div`
  font-size: 0.8rem;
  color: #999999;
  margin-top: 0.25rem;
`;

interface GoogleReviewsSectionProps {
  placeId?: string;
  title?: string;
  subtitle?: string;
  rating?: number;
  reviewCount?: number;
  showTestimonial?: boolean;
}

const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({
  placeId = 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
  title = 'Real Riders. Real Experiences.',
  subtitle = 'See what our customers are saying about their eSthira experience on Google',
  rating = 4.9,
  reviewCount = 50,
  showTestimonial = true
}) => {
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    // Animate rating number on mount
    const timer = setTimeout(() => {
      const increment = rating / 20;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= rating) {
          current = rating;
          clearInterval(interval);
        }
        setAnimatedRating(Math.round(current * 10) / 10);
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [rating]);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <Stars>
        {Array(fullStars).fill(0).map((_, i) => (
          <span key={`full-${i}`}>⭐</span>
        ))}
        {hasHalfStar && <span>⭐</span>}
        {Array(emptyStars).fill(0).map((_, i) => (
          <span key={`empty-${i}`} style={{ opacity: 0.3 }}>⭐</span>
        ))}
      </Stars>
    );
  };

  const reviewsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <ReviewsTitle>{title}</ReviewsTitle>
        <ReviewsSubtitle>{subtitle}</ReviewsSubtitle>
      </ReviewsHeader>

      <ReviewsCard>
        <RatingDisplay>
          {renderStars(rating)}
          <RatingNumber>{animatedRating}</RatingNumber>
          <RatingText>Out of 5 stars</RatingText>
        </RatingDisplay>

        <TrustBadges>
          <TrustBadge>
            <BadgeIcon>
              <i className="fas fa-check-circle"></i>
            </BadgeIcon>
            Verified Reviews
          </TrustBadge>
          <TrustBadge>
            <BadgeIcon>
              <i className="fas fa-shield-alt"></i>
            </BadgeIcon>
            Trusted Customers
          </TrustBadge>
          <TrustBadge>
            <BadgeIcon>
              <i className="fas fa-star"></i>
            </BadgeIcon>
            Top Rated
          </TrustBadge>
        </TrustBadges>

        {showTestimonial && (
          <TestimonialPreview>
            <TestimonialText>
              "Excellent service and quality e-bikes! The team was very helpful in choosing the right model for my daily commute. Highly recommend eSthira to anyone looking for reliable electric bicycles."
            </TestimonialText>
            <TestimonialAuthor>Rahul Kumar</TestimonialAuthor>
            <TestimonialRole>Verified Customer</TestimonialRole>
          </TestimonialPreview>
        )}

        <ActionButtons>
          <PrimaryButton 
            href={reviewsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fas fa-star"></i>
            View All Reviews on Google
          </PrimaryButton>
          
          <SecondaryButton 
            href={writeReviewUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <i className="fas fa-pen"></i>
            Write a Review
          </SecondaryButton>
        </ActionButtons>
      </ReviewsCard>
    </ReviewsContainer>
  );
};

export default GoogleReviewsSection;
