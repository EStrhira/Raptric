import React from 'react';
import styled from 'styled-components';
import GoogleReviewsSection from '../components/GoogleReviewsSection';
import SEO from '../components/SEO';

const ReviewsSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/images/pattern-bg.jpg') repeat;
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
`;

const Reviews: React.FC = () => {
  return (
    <>
      <SEO
        title="Customer Reviews - RAPTRIC Electric Bicycles | Google Reviews"
        description="Read authentic customer reviews and testimonials for RAPTRIC electric bicycles. See what our customers in Bangalore are saying about our premium e-bikes and cycles."
        keywords="RAPTRIC reviews, customer testimonials, electric bicycle reviews, e-bike reviews Bangalore, customer feedback, RAPTRIC ratings, Google reviews"
        canonical="https://raptric.in/reviews"
        ogImage="/images/og-reviews.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Customer Reviews - RAPTRIC",
          "description": "Read authentic customer reviews for RAPTRIC electric bicycles",
          "url": "https://raptric.in/reviews",
          "mainEntity": {
            "@type": "Organization",
            "name": "RAPTRIC",
            "url": "https://raptric.in",
            "logo": "https://raptric.in/logo.png",
            "description": "Premium electric bicycles and cycles retailer in Bangalore",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "367, 10T Main, Vidyapeeta Main Road, Banashankari 3rd Stage",
              "addressLocality": "Banashankari",
              "addressRegion": "Bengaluru",
              "postalCode": "560085",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 93802 76355",
              "contactType": "customer service",
              "email": "info.esthira@gmail.com",
              "availableLanguage": ["English", "Hindi", "Kannada"]
            },
            "sameAs": [
              "https://www.facebook.com/esthira",
              "https://www.instagram.com/esthira",
              "https://www.twitter.com/raptric"
            ],
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "127",
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        }}
      />
      
      <ReviewsSection>
        <Container>
          <GoogleReviewsSection
            placeId="ChIJj5LfjWY_rjsRNwXTAKGD4S4"
            title="What Our Customers Say"
            subtitle="Real reviews from real customers about their RAPTRIC experience"
            rating={4.9}
            reviewCount={50}
            showTestimonial={true}
          />
        </Container>
      </ReviewsSection>
    </>
  );
};

export default Reviews;
