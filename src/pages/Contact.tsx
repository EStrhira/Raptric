import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import BUSINESS_INFO from '../constants/businessInfo'

const ContactSection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

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
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
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
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const ContactContainer = styled.div`
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
    margin: 2rem 1rem;
    padding: 2rem;
  }
`

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const ContactTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const ContactSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.15);
  }
`

const ContactIcon = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 3rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

const ContactName = styled.h3`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const ContactButton = styled.a`
  background: #00a652;
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  i {
    font-size: 1rem;
  }
`

const Contact: React.FC = () => {
  useScrollToTop()

  const contactInfo = [
    {
      name: "Bengaluru Headquarters",
      icon: "fas fa-map-marker-alt",
      address: BUSINESS_INFO.address.full,
      phone: BUSINESS_INFO.contact.phoneFormatted,
      email: BUSINESS_INFO.contact.email,
      hours: BUSINESS_INFO.hours.weekdays2,
      locateUs: "https://maps.app.goo.gl/gweZK6bb3bZzGMaG7"
    },
    {
      name: "Customer Support",
      icon: "fas fa-headset",
      phone: BUSINESS_INFO.contact.phoneFormatted,
      email: BUSINESS_INFO.contact.email,
      hours: BUSINESS_INFO.hours.weekdays2
    },
    {
      name: "Service Center",
      icon: "fas fa-wrench",
      address: BUSINESS_INFO.address.full,
      phone: BUSINESS_INFO.contact.phoneFormatted,
      email: BUSINESS_INFO.contact.email,
      hours: BUSINESS_INFO.hours.weekdays2
    },
    {
      name: "Sales Inquiries",
      icon: "fas fa-shopping-cart",
      phone: BUSINESS_INFO.contact.phoneFormatted,
      email: BUSINESS_INFO.contact.email,
      hours: BUSINESS_INFO.hours.weekdays2
    }
  ]

  return (
    <ContactSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-envelope"></i>
          </BannerIcon>
          <BannerTitle>Contact Us</BannerTitle>
          <BannerSubtitle>
            Get in touch with the eSthira team for any questions, support, or inquiries. We're here to help you with your eBike journey.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <ContactContainer>
          <ContactHeader>
            <ContactTitle>Get in Touch</ContactTitle>
            <ContactSubtitle>
              Reach out to our team for any questions, support, or inquiries. We're here to help you with your eBike journey.
            </ContactSubtitle>
          </ContactHeader>

          <ContactGrid>
            {contactInfo.map((contact, index) => (
              <ContactCard key={index}>
                <ContactIcon>
                  <i className={contact.icon}></i>
                </ContactIcon>
                <ContactName>{contact.name}</ContactName>
                <ContactInfo>
                  <strong>Address:</strong> {contact.address}<br />
                  <strong>Phone:</strong> {contact.phone}<br />
                  <strong>Email:</strong> {contact.email}<br />
                  <strong>Hours:</strong> {contact.hours}
                  {contact.locateUs && (
                    <>
                      <br />
                      <strong>Locate Us:</strong>{' '}
                      <a 
                        href={contact.locateUs} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#00a652', textDecoration: 'underline' }}
                      >
                        Click here for directions
                      </a>
                    </>
                  )}
                </ContactInfo>
                
              </ContactCard>
            ))}
          </ContactGrid>
        </ContactContainer>
      </Container>
    </ContactSection>
  )
}

export default Contact
