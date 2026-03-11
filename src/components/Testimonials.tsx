import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'

// Google Review interface
interface GoogleReview {
  author_name: string
  rating: number
  text: string
  relative_time_description: string
  profile_photo_url: string
}

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #000000;
`

const CarouselContainer = styled.div`
  position: relative;
  margin-top: 3rem;
  overflow: hidden;
  border-radius: 12px;
  width: 100%;
`

const CarouselTrack = styled.div<{ $translateX: number }>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${props => props.$translateX}px);
  gap: 2rem;
  padding: 0 1rem;
`

const TestimonialCard = styled.div`
  min-width: 300px;
  max-width: 400px;
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  text-align: center;
  margin: 0 1rem;

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 320px;
    padding: 1.5rem;
    margin: 0 0.5rem;
  }
`

const TestimonialContent = styled.div`
  margin-bottom: 2rem;

  p {
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
    line-height: 1.6;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`

const AuthorAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #00a652, #008040);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  i {
    color: #fff;
    font-size: 1.5rem;
  }
`

const AuthorInfo = styled.div`
  text-align: left;

  h4 {
    color: #ffffff;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
`

const RatingStars = styled.div`
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`

const CarouselButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

const CarouselIndicators = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`

const Indicator = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#00a652' : 'rgba(255, 255, 255, 0.3)'};
  border: none;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#00a652' : 'rgba(255, 255, 255, 0.5)'};
  }
`

const SocialProof = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);

  h3 {
    color: #00a652;
    margin-bottom: 1rem;
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 1.5rem;
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  padding: 2rem;
`

const ErrorMessage = styled.div`
  text-align: center;
  color: #ff4444;
  font-size: 1.1rem;
  padding: 2rem;
`

const Testimonials: React.FC = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate Google Reviews API call
        const mockGoogleReviews: GoogleReview[] = [
          {
            author_name: "Sarah Johnson",
            rating: 5,
            text: "Absolutely love my eSthira e-bike! The battery life is incredible and the motor power is perfect for my daily commute. Best investment I've made this year.",
            relative_time_description: "2 weeks ago",
            profile_photo_url: ""
          },
          {
            author_name: "Michael Chen",
            rating: 5,
            text: "The build quality is outstanding. I've been riding for 6 months now and it still feels brand new. Customer service is also top-notch.",
            relative_time_description: "1 month ago",
            profile_photo_url: ""
          },
          {
            author_name: "Emma Rodriguez",
            rating: 4,
            text: "Great value for money. The range is exactly as advertised and the charging time is impressive. Would definitely recommend to friends.",
            relative_time_description: "3 weeks ago",
            profile_photo_url: ""
          },
          {
            author_name: "David Thompson",
            rating: 5,
            text: "This e-bike has transformed my daily commute. I save so much time and energy. The smart features are really intuitive too.",
            relative_time_description: "2 months ago",
            profile_photo_url: ""
          },
          {
            author_name: "Lisa Park",
            rating: 5,
            text: "Couldn't be happier with my purchase. The design is sleek, the performance is smooth, and it turns heads everywhere I go!",
            relative_time_description: "1 week ago",
            profile_photo_url: ""
          }
        ]

        // Sort by rating and take top 5
        const topReviews = mockGoogleReviews
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5)

        setReviews(topReviews)
      } catch (err) {
        setError('Failed to load reviews. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchGoogleReviews()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || reviews.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [autoPlay, reviews.length])

  const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const getVisibleReviews = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: Show 3 reviews
      return [currentIndex, (currentIndex + 1) % reviews.length, (currentIndex + 2) % reviews.length]
    } else if (window.innerWidth >= 768) {
      // Tablet: Show 2 reviews
      return [currentIndex, (currentIndex + 1) % reviews.length]
    } else {
      // Mobile: Show 1 review
      return [currentIndex]
    }
  }

  if (loading) {
    return (
      <TestimonialsSection>
        <Container>
          <SectionTitle>What our customers have to say</SectionTitle>
          <LoadingMessage>Loading reviews...</LoadingMessage>
        </Container>
      </TestimonialsSection>
    )
  }

  if (error) {
    return (
      <TestimonialsSection>
        <Container>
          <SectionTitle>What our customers have to say</SectionTitle>
          <ErrorMessage>{error}</ErrorMessage>
        </Container>
      </TestimonialsSection>
    )
  }

  const visibleReviews = getVisibleReviews()
  const cardWidth = 350 // Fixed width for cards
  const gap = 32 // 2rem gap in pixels
  const translateX = -(currentIndex * (cardWidth + gap))

  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>What our customers have to say</SectionTitle>
        <CarouselContainer>
          <CarouselTrack $translateX={translateX}>
            {reviews.map((review, index) => (
              <TestimonialCard key={index}>
                <TestimonialContent>
                  <RatingStars>{renderStars(review.rating)}</RatingStars>
                  <p>"{review.text}"</p>
                </TestimonialContent>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {review.profile_photo_url ? (
                      <img src={review.profile_photo_url} alt={review.author_name} />
                    ) : (
                      <i className="fas fa-user"></i>
                    )}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <h4>{review.author_name}</h4>
                    <RatingStars>{renderStars(review.rating)}</RatingStars>
                    <p>{review.relative_time_description}</p>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </CarouselTrack>
        </CarouselContainer>

        <SocialProof>
          <h3>Join Our Growing Community</h3>
          <p>Based on 1000+ Google Reviews with 4.8★ average rating!</p>
        </SocialProof>
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials
