import React from 'react'
import SEO from '../components/SEO'
import { useScrollToTop } from '../hooks/useScrollToTop'
import styled, { createGlobalStyle } from 'styled-components'
import { Container } from '../styles/GlobalStyles'
import BUSINESS_INFO from '../constants/businessInfo'

const AboutSection = styled.section`
  padding: 0;
  background: #000000;
  min-height: 80vh;
`

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-top: -40px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-top: -30px;
  }
`

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
`

const AboutCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const AboutIcon = styled.div`
  font-size: 3rem;
  color: #00a652;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`

const AboutTitle = styled.h3`
  color: #ffffff;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`

const AboutDescription = styled.p`
  color: #cccccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const AboutContent = styled.div`
  color: #ffffff;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`

const AboutImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: #000;

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`

const AboutButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #00a652;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
`

const About: React.FC = () => {
  useScrollToTop()

  return (
    <>
      <SEO
        title="About eSthira - Premium Electric Bicycles & Cycles in Bangalore"
        description="Learn about eSthira - Bangalore's leading electric bicycle and cycle retailer. Our mission is to provide eco-friendly mobility solutions through premium e-bikes and traditional bicycles."
        keywords="about eSthira, electric bicycle company, bicycle retailer Bangalore, e-bike store, about electric bicycle, bicycle shop, about eSthira, eSthira mission, eSthira story, eSthira values, bicycle company Bangalore"
        canonical="https://esthira.com/about"
        ogImage="/images/og-about.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "eSthira",
          "url": "https://esthira.com/about",
          "description": "Premium electric bicycles and cycles retailer in Bangalore, offering eco-friendly mobility solutions.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "367, 10T Main, Vidyapeeta Main Road, Banashankari 3rd Stage, Banashankari 3rd Stage",
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
          }
        }}
      />
      <AboutSection>
        <Container>
          <AboutContainer>
            <AboutGrid>
              <AboutCard>
                <AboutImage src="/images/about-hero.jpg" alt="eSthira Store Front" />
                <AboutContent>
                  <AboutIcon>
                    <i className="fas fa-bicycle"></i>
                  </AboutIcon>
                  <AboutTitle>About eSthira</AboutTitle>
                  <AboutDescription>
                    eSthira is Bangalore's premier destination for premium electric bicycles and traditional bicycles. Founded with a vision to revolutionize urban mobility, we combine cutting-edge technology with timeless design.
                  </AboutDescription>
                  <AboutContent>
                    Since our inception in 2020, eSthira has been at the forefront of the electric bicycle revolution in Bangalore. Our commitment to quality, innovation, and customer service has made us the trusted name for e-bikes and bicycles in the region.
                  </AboutContent>
                  <AboutButton href="/contact">
                    <i className="fas fa-arrow-right"></i>
                    Get In Touch
                  </AboutButton>
                </AboutContent>
              </AboutCard>
              
              <AboutCard>
                <AboutIcon>
                  <i className="fas fa-award"></i>
                </AboutIcon>
                <AboutTitle>Our Mission</AboutTitle>
                  <AboutDescription>
                    Our mission is to provide sustainable and eco-friendly mobility solutions through premium electric bicycles and traditional cycles. We believe in clean energy transportation and a healthier lifestyle for our customers and the environment.
                  </AboutDescription>
                  <AboutContent>
                    <AboutButton href="/contact">
                      <i className="fas fa-arrow-right"></i>
                      Learn More
                    </AboutButton>
                  </AboutContent>
              </AboutCard>
              
              <AboutCard>
                <AboutIcon>
                  <i className="fas fa-users"></i>
                </AboutIcon>
                <AboutTitle>Our Values</AboutTitle>
                  <AboutDescription>
                    At eSthira, we are committed to:
                    <ul>
                      <li><strong>Quality First</strong> - Premium materials and rigorous testing</li>
                      <li><strong>Customer Satisfaction</strong> - Exceptional service and support</li>
                      <li><strong>Innovation</strong> - Continuous improvement in technology</li>
                      <li><strong>Sustainability</strong> - Reducing carbon footprint</li>
                      <li><strong>Integrity</strong> - Honest business practices</li>
                    </ul>
                  </AboutDescription>
                  <AboutContent>
                    <AboutButton href="/products">
                      <i className="fas fa-arrow-right"></i>
                      View Products
                    </AboutButton>
                  </AboutContent>
              </AboutCard>
              
              <AboutCard>
                <AboutIcon>
                  <i className="fas fa-bicycle"></i>
                </AboutIcon>
                <AboutTitle>Our Story</AboutTitle>
                  <AboutDescription>
                    eSthira began as a dream to transform urban mobility in Bangalore. What started as a small workshop has grown into a comprehensive destination for bicycle enthusiasts, offering both electric and traditional options.
                  </AboutDescription>
                  <AboutContent>
                    <AboutButton href="/products">
                      <i className="fas fa-arrow-right"></i>
                      View Products
                    </AboutButton>
                  </AboutContent>
              </AboutCard>
            </AboutGrid>
          </AboutContainer>
        </Container>
      </AboutSection>
    </>
  )
}

export default About
