import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import ReviewsSection from './ReviewsSection'

const TestimonialsSection = styled.section`
  padding: 80px 0;
  background: #000000;

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`

const Testimonials: React.FC = () => {
  return (
    <TestimonialsSection>
      <Container>
        <SectionTitle>Real Riders. Real Experiences.</SectionTitle>
        
        <ReviewsSection 
          placeId="ChIJj5LfjWY_rjsRNwXTAKGD4S4"
          maxReviews={10}
          showFilters={true}
          showWriteReviewButton={true}
          layout="carousel"
          darkTheme={true}
        />
      </Container>
    </TestimonialsSection>
  )
}

export default Testimonials