import React from 'react';
import styled from 'styled-components';
import GoogleReviewsSection from './GoogleReviewsSection';

const ReviewsWrapper = styled.div`
  background: #000000;
  padding: 0;
  
  @media (max-width: 768px) {
    padding: 0;
  }
  
  @media (max-width: 480px) {
    padding: 0;
  }
`;

const HomeReviewsEmbed: React.FC<{
  placeId?: string;
  title?: string;
  subtitle?: string;
}> = ({ 
  placeId = "ChIJj5LfjWY_rjsRNwXTAKGD4S4",
  title = "Real Riders. Real Experiences.",
  subtitle = "See what our customers are saying about their eSthira experience"
}) => {
  return (
    <ReviewsWrapper>
      <GoogleReviewsSection
        placeId={placeId}
        title={title}
        subtitle={subtitle}
        rating={4.9}
        reviewCount={50}
        showTestimonial={true}
      />
    </ReviewsWrapper>
  );
};

export default HomeReviewsEmbed;
