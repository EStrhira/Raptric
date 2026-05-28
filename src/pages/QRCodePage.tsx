import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import SEO from '../components/SEO'
import { useScrollToTop } from '../hooks/useScrollToTop'
import BUSINESS_INFO from '../constants/businessInfo'

const GlobalOverride = createGlobalStyle`
  body {
    padding-top: 0 !important;
  }
`

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    z-index: -1;
  }
`

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  background: #1a1a1a;
  border-radius: 20px;
  padding: 30px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
`

const LogoSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`

const Logo = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  letter-spacing: 2px;
`

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const WelcomeTitle = styled.h2`
  font-size: 1.8rem;
  color: #ffffff;
  margin-bottom: 15px;
  font-weight: 700;
`

const WelcomeText = styled.p`
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
`

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 30px;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
`

const LinkCard = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 25px 20px;
  background: #2d2d2d;
  border-radius: 15px;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid #3d3d3d;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
    background: #3d3d3d;
    border-color: #ffffff;
  }

  &:active {
    transform: scale(0.98);
  }
`

const LinkIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 12px;
  color: #ffffff;
`

const LinkTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
`

const LinkDescription = styled.div`
  font-size: 0.85rem;
  color: #cccccc;
  text-align: center;
  margin-top: 5px;
`

const ContactSection = styled.div`
  background: #2d2d2d;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #3d3d3d;
`

const ContactTitle = styled.h3`
  font-size: 1.2rem;
  color: #ffffff;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 700;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: #cccccc;
  font-size: 0.95rem;
`

const ContactIcon = styled.span`
  margin-right: 12px;
  font-size: 1.2rem;
  color: #ffffff;
  width: 25px;
  text-align: center;
`

const ContactLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const Footer = styled.div`
  text-align: center;
  margin-top: 30px;
  color: #cccccc;
  font-size: 0.9rem;
`

const QRCodePage: React.FC = () => {
  useScrollToTop()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "RAPTRIC - Quick Access",
    "description": "Quick access to user manuals, warranty registration, customer support, and more for RAPTRIC e-bikes",
    "url": "https://raptric.in/raptric"
  }

  return (
    <>
      <GlobalOverride />
      <SEO 
        title="RAPTRIC - Quick Access"
        description="Quick access to user manuals, warranty registration, customer support, and more for RAPTRIC e-bikes"
        structuredData={structuredData}
      />
      <PageContainer>
        <ContentWrapper>
          <LogoSection>
            <Logo>RAPTRIC</Logo>
          </LogoSection>

          <WelcomeSection>
            <WelcomeTitle>Welcome!</WelcomeTitle>
            <WelcomeText>
              Thank you for choosing RAPTRIC. Scan this QR code to quickly access all the resources you need for your e-bike.
            </WelcomeText>
          </WelcomeSection>

          <LinksGrid>
            <LinkCard href="/manual">
              <LinkIcon>📖</LinkIcon>
              <LinkTitle>User Manual</LinkTitle>
              <LinkDescription>Complete guide for your e-bike</LinkDescription>
            </LinkCard>

            <LinkCard href="/warrantyactivation">
              <LinkIcon>🛡️</LinkIcon>
              <LinkTitle>Warranty Registration</LinkTitle>
              <LinkDescription>Register your warranty now</LinkDescription>
            </LinkCard>

            <LinkCard href="/contact">
              <LinkIcon>💬</LinkIcon>
              <LinkTitle>Customer Support</LinkTitle>
              <LinkDescription>Get help and assistance</LinkDescription>
            </LinkCard>

            <LinkCard href="https://www.youtube.com/@raptric" target="_blank" rel="noopener noreferrer">
              <LinkIcon>🎥</LinkIcon>
              <LinkTitle>YouTube Channel</LinkTitle>
              <LinkDescription>Watch tutorials and reviews</LinkDescription>
            </LinkCard>

            <LinkCard href="/faq">
              <LinkIcon>❓</LinkIcon>
              <LinkTitle>FAQ</LinkTitle>
              <LinkDescription>Frequently asked questions</LinkDescription>
            </LinkCard>

            <LinkCard href="/safety-tips">
              <LinkIcon>⚠️</LinkIcon>
              <LinkTitle>Safety Tips</LinkTitle>
              <LinkDescription>Ride safely with these tips</LinkDescription>
            </LinkCard>

            <LinkCard href="/service">
              <LinkIcon>🔧</LinkIcon>
              <LinkTitle>Service Center</LinkTitle>
              <LinkDescription>Book a service appointment</LinkDescription>
            </LinkCard>

            <LinkCard href="/warranty">
              <LinkIcon>📋</LinkIcon>
              <LinkTitle>Warranty Info</LinkTitle>
              <LinkDescription>Warranty terms and conditions</LinkDescription>
            </LinkCard>
          </LinksGrid>

          <ContactSection>
            <ContactTitle>Need Immediate Help?</ContactTitle>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <ContactLink href={`tel:${BUSINESS_INFO.contact.phoneFormatted}`}>
                {BUSINESS_INFO.contact.phone}
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📧</ContactIcon>
              <ContactLink href={`mailto:${BUSINESS_INFO.contact.email}`}>
                {BUSINESS_INFO.contact.email}
              </ContactLink>
            </ContactItem>
            <ContactItem>
              <ContactIcon>🌐</ContactIcon>
              <ContactLink href={BUSINESS_INFO.contact.website} target="_blank" rel="noopener noreferrer">
                {BUSINESS_INFO.contact.website}
              </ContactLink>
            </ContactItem>
          </ContactSection>
        </ContentWrapper>

        <Footer>
          © {new Date().getFullYear()} RAPTRIC. All rights reserved.
        </Footer>
      </PageContainer>
    </>
  )
}

export default QRCodePage
