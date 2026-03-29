import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import StarRating from './StarRating';
import ReviewsService, { GoogleReview, ReviewsSummary } from '../services/ReviewsService';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

// Styled Components
const ReviewsContainer = styled.div<{ darkTheme?: boolean }>`
  padding: ${props => props.darkTheme ? '2rem 0' : '4rem 0'};
  background: ${props => props.darkTheme ? 'transparent' : '#f8f9fa'};
  color: ${props => props.darkTheme ? '#ffffff' : '#333'};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2<{ darkTheme?: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.darkTheme ? '#ffffff' : '#333'};
  margin-bottom: 1rem;
`;

const Subtitle = styled.p<{ darkTheme?: boolean }>`
  font-size: 1.1rem;
  color: ${props => props.darkTheme ? 'rgba(255, 255, 255, 0.8)' : '#666'};
  margin-bottom: 2rem;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const SummaryItem = styled.div`
  text-align: center;
`;

const SummaryValue = styled.div<{ darkTheme?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.darkTheme ? '#ffffff' : '#333'};
  margin-bottom: 0.5rem;
`;

const SummaryLabel = styled.div<{ darkTheme?: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.darkTheme ? 'rgba(255, 255, 255, 0.8)' : '#666'};
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ active: boolean; darkTheme?: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid ${props => props.active ? (props.darkTheme ? '#00a652' : '#007bff') : (props.darkTheme ? 'rgba(255, 255, 255, 0.3)' : '#ddd')};
  background: ${props => props.active ? (props.darkTheme ? '#00a652' : '#007bff') : (props.darkTheme ? 'transparent' : 'white')};
  color: ${props => props.active ? 'white' : (props.darkTheme ? '#ffffff' : '#333')};
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.darkTheme ? '#00a652' : '#007bff'};
    color: ${props => props.darkTheme ? '#00a652' : '#007bff'};
  }
`;

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

// Carousel Components
const CarouselContainer = styled.div<{ darkTheme?: boolean }>`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 3rem;
  overflow: hidden;
  border-radius: 12px;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
`;

const CarouselSlide = styled.div<{ darkTheme?: boolean }>`
  min-width: 100%;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ReviewCardCarousel = styled.div<{ darkTheme?: boolean }>`
  background: ${props => props.darkTheme ? '#1a1a1a' : 'white'};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: ${props => props.darkTheme ? '0 2px 10px rgba(255, 255, 255, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  animation: ${slideIn} 0.6s ease-out;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CarouselButton = styled.button<{ darkTheme?: boolean; position: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.position === 'left' ? 'left: -15px' : 'right: -15px'};
  background: ${props => props.darkTheme ? '#00a652' : '#007bff'};
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${props => props.darkTheme ? '#008040' : '#0056b3'};
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: translateY(-50%);
  }
`;

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
`;

const Indicator = styled.button<{ active: boolean; darkTheme?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active 
    ? (props.darkTheme ? '#00a652' : '#007bff') 
    : (props.darkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.darkTheme ? '#00a652' : '#007bff'};
  }
`;

const ReviewCard = styled.div<{ darkTheme?: boolean }>`
  background: ${props => props.darkTheme ? '#1a1a1a' : 'white'};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${props => props.darkTheme ? '0 2px 10px rgba(255, 255, 255, 0.1)' : '0 2px 10px rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.darkTheme ? '0 8px 25px rgba(255, 255, 255, 0.15)' : '0 8px 25px rgba(0, 0, 0, 0.15)'};
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ReviewerAvatar = styled.img<{ darkTheme?: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${props => props.darkTheme ? 'rgba(255, 255, 255, 0.2)' : '#f0f0f0'};
`;

const ReviewerInfo = styled.div`
  flex: 1;
`;

const ReviewerName = styled.div<{ darkTheme?: boolean }>`
  font-weight: 600;
  color: ${props => props.darkTheme ? '#00a652' : '#333'};
  margin-bottom: 0.25rem;
`;

const ReviewTime = styled.div<{ darkTheme?: boolean }>`
  font-size: 0.85rem;
  color: ${props => props.darkTheme ? 'rgba(255, 255, 255, 0.7)' : '#666'};
`;

const ReviewContent = styled.div<{ darkTheme?: boolean }>`
  color: ${props => props.darkTheme ? 'rgba(255, 255, 255, 0.9)' : '#555'};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ReviewFooter = styled.div<{ darkTheme?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RatingValue = styled.span<{ darkTheme?: boolean }>`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${props => props.darkTheme ? '#ffffff' : '#333'};
  margin-left: 8px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: ${pulse} 1s linear infinite;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc3545;
`;

const WriteReviewButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

// Props
interface ReviewsSectionProps {
  placeId?: string;
  maxReviews?: number;
  showFilters?: boolean;
  showWriteReviewButton?: boolean;
  layout?: 'grid' | 'carousel';
  darkTheme?: boolean;
  className?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  placeId,
  maxReviews = 10,
  showFilters = true,
  showWriteReviewButton = true,
  layout = 'carousel',
  darkTheme = false,
  className = ''
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [summary, setSummary] = useState<ReviewsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviewsService = ReviewsService.getInstance();
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch reviews and summary
  useEffect(() => {
    fetchReviews();
  }, [activeFilter, maxReviews]);

  // Group reviews into sets of 3 for carousel
  const getReviewGroups = () => {
    const groups = [];
    const reviewsPerSlide = 3;
    
    for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
      groups.push(reviews.slice(i, i + reviewsPerSlide));
    }
    
    return groups;
  };

  const reviewGroups = getReviewGroups();

  // Auto-play functionality
  useEffect(() => {
    if (layout === 'carousel' && isAutoPlaying && reviewGroups.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % reviewGroups.length);
      }, 5000); // Change slide every 5 seconds
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [layout, isAutoPlaying, reviewGroups.length]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);

      const [reviewsData, summaryData] = await Promise.all([
        reviewsService.getReviews({
          limit: maxReviews,
          rating: activeFilter || undefined
        }),
        reviewsService.getReviewsSummary()
      ]);

      setReviews(reviewsData);
      setSummary(summaryData);
      setCurrentSlide(0); // Reset to first slide when reviews change
    } catch (err) {
      setError('Failed to load reviews. Please try again later.');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (rating: number | null) => {
    setActiveFilter(rating);
    setCurrentSlide(0); // Reset slide when filter changes
  };

  // Carousel controls
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user manually controls
  };

  const goToPreviousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviewGroups.length) % reviewGroups.length);
    setIsAutoPlaying(false);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviewGroups.length);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const renderSkeleton = () => (
    <ReviewsGrid>
      {[...Array(6)].map((_, index) => (
        <ReviewCard key={index}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#f0f0f0' }} />
            <div style={{ flex: 1 }}>
              <div style={{ height: '16px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }} />
              <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', width: '60%' }} />
            </div>
          </div>
          <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px' }} />
          <div style={{ height: '12px', background: '#f0f0f0', borderRadius: '4px', width: '80%' }} />
        </ReviewCard>
      ))}
    </ReviewsGrid>
  );

  if (loading) {
    return (
      <ReviewsContainer className={className}>
        <Container>
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        </Container>
      </ReviewsContainer>
    );
  }

  if (error) {
    return (
      <ReviewsContainer className={className}>
        <Container>
          <ErrorContainer>
            <h3>Unable to load reviews</h3>
            <p>{error}</p>
            <button onClick={fetchReviews} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
              Try Again
            </button>
          </ErrorContainer>
        </Container>
      </ReviewsContainer>
    );
  }

  return (
    <ReviewsContainer darkTheme={darkTheme} className={className}>
      <Container>
        <Header>
          <Title darkTheme={darkTheme}>Customer Reviews</Title>
          <Subtitle darkTheme={darkTheme}>See what our customers are saying about us</Subtitle>
          
          {summary && (
            <SummaryContainer>
              <SummaryItem>
                <SummaryValue darkTheme={darkTheme}>{summary.averageRating}</SummaryValue>
                <SummaryLabel darkTheme={darkTheme}>Average Rating</SummaryLabel>
                <StarRating rating={summary.averageRating} showValue={false} darkTheme={darkTheme} />
              </SummaryItem>
              <SummaryItem>
                <SummaryValue darkTheme={darkTheme}>{summary.totalReviews}</SummaryValue>
                <SummaryLabel darkTheme={darkTheme}>Total Reviews</SummaryLabel>
              </SummaryItem>
            </SummaryContainer>
          )}
        </Header>

        {showFilters && (
          <FilterContainer>
            <FilterButton 
              active={activeFilter === null}
              darkTheme={darkTheme}
              onClick={() => handleFilterClick(null)}
            >
              All Reviews
            </FilterButton>
            <FilterButton 
              active={activeFilter === 5}
              darkTheme={darkTheme}
              onClick={() => handleFilterClick(5)}
            >
              5★ Only
            </FilterButton>
            <FilterButton 
              active={activeFilter === 4}
              darkTheme={darkTheme}
              onClick={() => handleFilterClick(4)}
            >
              4★ Only
            </FilterButton>
            <FilterButton 
              active={activeFilter === 3}
              darkTheme={darkTheme}
              onClick={() => handleFilterClick(3)}
            >
              3★ Only
            </FilterButton>
          </FilterContainer>
        )}

        {/* Reviews Display */}
        {layout === 'carousel' ? (
          <>
            <CarouselContainer darkTheme={darkTheme}>
              {reviewGroups.length > 1 && (
                <>
                  <CarouselButton 
                    darkTheme={darkTheme} 
                    position="left"
                    onClick={goToPreviousSlide}
                    disabled={reviewGroups.length <= 1}
                  >
                    ‹
                  </CarouselButton>
                  <CarouselButton 
                    darkTheme={darkTheme} 
                    position="right"
                    onClick={goToNextSlide}
                    disabled={reviewGroups.length <= 1}
                  >
                    ›
                  </CarouselButton>
                </>
              )}
              
              <CarouselTrack
                style={{
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
              >
                {reviewGroups.map((group, groupIndex) => (
                  <CarouselSlide key={groupIndex} darkTheme={darkTheme}>
                    {group.map((review) => (
                      <ReviewCardCarousel key={review.id} darkTheme={darkTheme}>
                        <ReviewHeader>
                          <ReviewerAvatar 
                            src={review.profilePhoto || '/default-avatar.png'} 
                            alt={review.authorName}
                            darkTheme={darkTheme}
                            onError={(e) => {
                              e.currentTarget.src = '/default-avatar.png';
                            }}
                          />
                          <ReviewerInfo>
                            <ReviewerName darkTheme={darkTheme}>{review.authorName}</ReviewerName>
                            <ReviewTime darkTheme={darkTheme}>{reviewsService.formatReviewTime(review.reviewTime)}</ReviewTime>
                          </ReviewerInfo>
                        </ReviewHeader>
                        <ReviewContent darkTheme={darkTheme}>
                          <StarRating rating={review.rating} size="small" darkTheme={darkTheme} />
                          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>{review.text}</p>
                        </ReviewContent>
                        <ReviewFooter darkTheme={darkTheme}>
                          <span style={{ fontSize: '0.8rem', color: darkTheme ? 'rgba(255, 255, 255, 0.7)' : '#666' }}>
                            {review.relativeTime}
                          </span>
                          <StarRating rating={review.rating} size="small" showValue darkTheme={darkTheme} />
                        </ReviewFooter>
                      </ReviewCardCarousel>
                    ))}
                  </CarouselSlide>
                ))}
              </CarouselTrack>
            </CarouselContainer>

            {/* Carousel Indicators */}
            {reviewGroups.length > 1 && (
              <>
                <CarouselIndicators>
                  {reviewGroups.map((_, index) => (
                    <Indicator
                      key={index}
                      active={index === currentSlide}
                      darkTheme={darkTheme}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </CarouselIndicators>
                
                {/* Auto-play toggle */}
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                  <button
                    onClick={toggleAutoPlay}
                    style={{
                      background: 'none',
                      border: `1px solid ${darkTheme ? 'rgba(255, 255, 255, 0.3)' : '#ccc'}`,
                      color: darkTheme ? '#ffffff' : '#666',
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    {isAutoPlaying ? '⏸ Pause' : '▶ Play'} Auto-play
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <ReviewsGrid>
            {reviews.map((review) => (
              <ReviewCard key={review.id} darkTheme={darkTheme}>
                <ReviewHeader>
                  <ReviewerAvatar 
                    src={review.profilePhoto || '/default-avatar.png'} 
                    alt={review.authorName}
                    darkTheme={darkTheme}
                    onError={(e) => {
                      e.currentTarget.src = '/default-avatar.png';
                    }}
                  />
                  <ReviewerInfo>
                    <ReviewerName darkTheme={darkTheme}>{review.authorName}</ReviewerName>
                    <ReviewTime darkTheme={darkTheme}>{reviewsService.formatReviewTime(review.reviewTime)}</ReviewTime>
                  </ReviewerInfo>
                </ReviewHeader>
                <ReviewContent darkTheme={darkTheme}>
                  <StarRating rating={review.rating} size="small" darkTheme={darkTheme} />
                  <p style={{ marginTop: '0.5rem' }}>{review.text}</p>
                </ReviewContent>
                <ReviewFooter darkTheme={darkTheme}>
                  <span style={{ fontSize: '0.85rem', color: darkTheme ? 'rgba(255, 255, 255, 0.7)' : '#666' }}>
                    {review.relativeTime}
                  </span>
                  <StarRating rating={review.rating} size="small" showValue darkTheme={darkTheme} />
                </ReviewFooter>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        )}

        {showWriteReviewButton && (
          <div style={{ textAlign: 'center' }}>
            <WriteReviewButton 
              href={`https://search.google.com/local/writereview?placeid=${placeId || 'ChIJj5LfjWY_rjsRNwXTAKGD4S4'}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>★</span> Write a Review
            </WriteReviewButton>
          </div>
        )}
      </Container>
    </ReviewsContainer>
  );
};

export default ReviewsSection;
