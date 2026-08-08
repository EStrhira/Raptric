import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import SEO from '../components/SEO'

const RetailersSection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/Banner3.jpg') center/cover;
    opacity: 0.1;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
`

const BannerContent = styled.div`
  position: relative;
  z-index: 3;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
  }
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
`

const BannerSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const RetailersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-top: -40px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-top: -30px;
  }
`

const RetailersHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

const RetailersTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`

const RetailersSubtitle = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const RetailersGrid = styled.div`
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
    margin-top: 1.5rem;
  }
`

const RetailerCard = styled.div`
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

const RetailerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`

const RetailerIcon = styled.div`
  font-size: 2rem;
  color: #00a652;
  margin-right: 1rem;
  min-width: 40px;
`

const RetailerName = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const RetailerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const RetailerAddress = styled.div`
  color: #cccccc;
  line-height: 1.6;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const RetailerContact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #cccccc;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ContactIcon = styled.i`
  color: #00a652;
  width: 20px;
`

const RetailerActions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #00a652;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 2px solid #00a652;
  color: #00a652;

  &:hover {
    background: #00a652;
    color: #ffffff;
  }
`

const NoteBox = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 3rem;
`

const MapSection = styled.div`
  margin-top: 3rem;
  text-align: center;
`

const MapTitle = styled.h3`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const MapSubtitle = styled.p`
  color: #cccccc;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`

const MapIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

const MapActions = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const NoteTitle = styled.h4`
  color: #00a652;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const NoteText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

const Retailers: React.FC = () => {
  useScrollToTop()

  return (
    <>
      <SEO
        title="Authorized RAPTRIC Retailers in Bangalore | Find Nearest Store"
        description="Find authorized RAPTRIC eBike and cycle retailers in Bangalore. Locate our nearest store for test rides, purchases, and after-sales service across Basaveshwaranagar, Indiranagar, Koramangala and more."
        keywords="RAPTRIC retailers, eBike stores Bangalore, cycle shops Bengaluru, electric bicycle dealers, RAPTRIC showroom, eBike test ride, cycle store near me, RAPTRIC authorized dealer"
        canonical="https://raptric.in/retailers"
        ogImage="/Banner3.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "RAPTRIC Authorized Retailers",
          "description": "Find authorized RAPTRIC eBike and cycle retailers in Bangalore",
          "url": "https://raptric.in/retailers",
          "mainEntity": {
            "@type": "Organization",
            "name": "RAPTRIC",
            "url": "https://raptric.in",
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
            }
          }
        }}
      />
      <RetailersSection>
        <Container>
          <BannerSection>
            <BannerContent>
              <BannerIcon>
                <i className="fas fa-store"></i>
              </BannerIcon>
              <BannerTitle>Our Authorized Retailers</BannerTitle>
              <BannerSubtitle>
                Find RAPTRIC authorized retailers across Bangalore for test rides, purchases, and after-sales service
              </BannerSubtitle>
            </BannerContent>
          </BannerSection>
          
          <RetailersContainer>
            <RetailersHeader>
              <RetailersTitle>Find Our Retailers</RetailersTitle>
              <RetailersSubtitle>
                Locate all authorized RAPTRIC retailers on the interactive map below. Click on any location to get directions and contact information.
              </RetailersSubtitle>
            </RetailersHeader>
            
            <MapSection>
              <MapTitle>
                <i className="fas fa-map-marked-alt" style={{marginRight: '0.5rem', color: '#00a652'}}></i>
                All Retailers on Map
              </MapTitle>
              <MapSubtitle>
                View all our authorized RAPTRIC retailers on an interactive map. Click on any location to get directions and contact information.
              </MapSubtitle>
              <MapContainer>
                <MapIframe
                  src="https://www.google.com/maps/d/u/0/embed?mid=1CWMjeOQul7ONXEw4AvDHtkW1Lo3RiO0&eh=2CWMjeOQul7ONXEw4AvDHtkW1Lo3RiO0&z=17"
                  allowFullScreen
                  loading="lazy"
                  title="RAPTRIC Retailers Map"
                />
              </MapContainer>
              <MapActions>
                <ActionButton 
                  href="https://www.google.com/maps/d/u/0/edit?hl=en&mid=1CWMjeOQul7ONXEw4AvDHtkW1Lo3RiO0&ll=12.92583441894031%2C77.61852179999998&z=17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-external-link-alt"></i>
                  Open in Google Maps
                </ActionButton>
                <SecondaryButton 
                  href="tel:+919380276355"
                >
                  <i className="fas fa-phone"></i>
                  Call Main Office
                </SecondaryButton>
              </MapActions>
            </MapSection>

            <NoteBox>
              <NoteTitle>
                <i className="fas fa-info-circle" style={{marginRight: '0.5rem'}}></i>
                Retailer Information
              </NoteTitle>
              <NoteText>
                • All listed retailers are authorized RAPTRIC partners with trained staff
              </NoteText>
              <NoteText>
                • Test rides available at selected locations only - call ahead to check and schedule
              </NoteText>
              <NoteText>
                • Complete after-sales service and warranty support available
              </NoteText>
              <NoteText>
                • For bulk orders or corporate inquiries, please contact our main office
              </NoteText>
            </NoteBox>
          </RetailersContainer>
        </Container>
      </RetailersSection>
    </>
  )
}

export default Retailers
