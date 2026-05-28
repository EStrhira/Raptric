import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ReviewsHeader = styled.div`
  text-align: center;
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
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const IframeWrapper = styled.div<{ $loaded: boolean; $hasError: boolean }>`
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(0, 166, 82, 0.3);
  position: relative;
  transition: all 0.3s ease;
  
  @media (max-width: 768px) {
    height: 400px;
  }
  
  @media (max-width: 480px) {
    height: 350px;
    border-radius: 12px;
  }
  
  ${props => props.$hasError && `
    background: rgba(255, 0, 0, 0.1);
    border-color: rgba(255, 0, 0, 0.3);
  `}
  
  ${props => props.$loaded && `
    border-color: rgba(0, 166, 82, 0.6);
    box-shadow: 0 8px 32px rgba(0, 166, 82, 0.2);
  `}
`;

const ReviewsIframe = styled.iframe<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  
  ${props => props.$loaded && `
    opacity: 1;
  `}
`;

const LoadingOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 166, 82, 0.3);
  border-top: 4px solid #00a652;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: #cccccc;
`;

const ErrorOverlay = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 0, 0, 0.1);
  color: #ffffff;
  opacity: ${props => props.$visible ? 1 : 0};
  visibility: ${props => props.$visible ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  color: #ff4444;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #cccccc;
  margin-bottom: 1.5rem;
  line-height: 1.5;
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
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  
  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
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
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 2px solid #00a652;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: #00a652;
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }
  
  @media (max-width: 480px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
`;

interface GoogleReviewsEmbedProps {
  placeId?: string;
  title?: string;
  subtitle?: string;
  showWriteReviewButton?: boolean;
  height?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
}

const GoogleReviewsEmbed: React.FC<GoogleReviewsEmbedProps> = ({
  placeId = 'ChIJj5LfjWY_rjsRNwXTAKGD4S4',
  title = 'Customer Reviews',
  subtitle = 'See what our customers are saying about eSthira on Google',
  showWriteReviewButton = true,
  height = {
    desktop: 500,
    tablet: 400,
    mobile: 350
  }
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when placeId changes
    setLoaded(false);
    setHasError(false);
    setLoading(true);
  }, [placeId]);

  const handleIframeLoad = () => {
    setLoaded(true);
    setLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setHasError(true);
    setLoading(false);
    setLoaded(false);
  };

  const getResponsiveHeight = () => {
    const width = window.innerWidth;
    if (width <= 480) return height.mobile || 350;
    if (width <= 768) return height.tablet || 400;
    return height.desktop || 500;
  };

  const reviewsUrl = `https://search.google.com/local/reviews?placeid=${placeId}`;
  const writeReviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`;

  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <ReviewsTitle>{title}</ReviewsTitle>
        <ReviewsSubtitle>{subtitle}</ReviewsSubtitle>
      </ReviewsHeader>

      <IframeWrapper 
        $loaded={loaded} 
        $hasError={hasError}
        style={{ height: `${getResponsiveHeight()}px` }}
      >
        <ReviewsIframe
          $loaded={loaded}
          title="Google Reviews"
          src={reviewsUrl}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          loading="lazy"
        />
        
        <LoadingOverlay $visible={loading}>
          <LoadingSpinner />
          <LoadingText>Loading Google Reviews...</LoadingText>
        </LoadingOverlay>
        
        <ErrorOverlay $visible={hasError}>
          <ErrorIcon>
            <i className="fas fa-exclamation-triangle"></i>
          </ErrorIcon>
          <ErrorTitle>Unable to Load Reviews</ErrorTitle>
          <ErrorMessage>
            We couldn't load the Google Reviews iframe. Please view our reviews directly on Google.
          </ErrorMessage>
          <PrimaryButton href={mapsUrl} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-star"></i>
            View Reviews on Google
          </PrimaryButton>
        </ErrorOverlay>
      </IframeWrapper>

      <ActionButtons>
        {showWriteReviewButton && (
          <PrimaryButton href={writeReviewUrl} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-pen"></i>
            Write a Review on Google
          </PrimaryButton>
        )}
        
        <SecondaryButton href={mapsUrl} target="_blank" rel="noopener noreferrer">
          <i className="fas fa-map-marker-alt"></i>
          View on Google Maps
        </SecondaryButton>
      </ActionButtons>
    </ReviewsContainer>
  );
};

export default GoogleReviewsEmbed;
