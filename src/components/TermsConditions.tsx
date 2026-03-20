import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const TermsConditionsSection = styled.section`
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

const TermsContainer = styled.div`
  max-width: 800px;
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

const TermsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const TermsTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

const TermsSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`

const TermsSection = styled.div`
  margin-bottom: 2.5rem;
`

const SectionHeading = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 0.5rem;
`

const SectionContent = styled.div`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 1rem;

  p {
    margin-bottom: 1rem;
  }

  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1rem;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #00a652;
      font-weight: bold;
    }
  }

  strong {
    color: #00a652;
  }
`

const ContactInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;

  p {
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.8);
  }

  strong {
    color: #00a652;
  }
`

const TermsConditions: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <TermsConditionsSection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-file-contract"></i>
            </BannerIcon>
            <BannerTitle>Terms & Conditions</BannerTitle>
            <BannerSubtitle>
              Clear guidelines for using our website and services. Your agreement ensures a safe and fair experience for everyone.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <TermsContainer>
          <TermsHeader>
            <TermsTitle>Terms & Conditions</TermsTitle>
            <TermsSubtitle>
              Effective Date: 15 February, 2024
            </TermsSubtitle>
          </TermsHeader>

          <TermsSection>
            <SectionHeading>Introduction</SectionHeading>
            <SectionContent>
              <p>
                Thank you for choosing eSthira Mobility (referred to as "we", "us", or "our"). By accessing or using our website and services, you agree to comply with these Terms & Conditions, as well as all applicable laws and regulations.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Use of Website</SectionHeading>
            <SectionContent>
              <p>
                You may use our website for lawful purposes only and in accordance with these Terms & Conditions. You agree not to:
              </p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Interfere with the operation of our website</li>
                <li>Use our website for any fraudulent or unlawful purpose</li>
              </ul>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Product Information</SectionHeading>
            <SectionContent>
              <p>
                We make every effort to ensure that the information provided on our website is accurate and up to date. However, we cannot guarantee the accuracy, completeness, or reliability of any product descriptions, pricing, or availability. We reserve the right to correct any errors or inaccuracies and to update information at any time without prior notice.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Purchases and Payments</SectionHeading>
            <SectionContent>
              <p>
                By placing an order on our website, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding contract. You agree to provide accurate and complete information when making a purchase and to promptly update any information that may change. Payment for products purchased through our website is processed securely through third-party payment processors. We do not store or have access to your payment information.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Shipping and Delivery</SectionHeading>
            <SectionContent>
              <p>
                Our shipping and delivery policies are outlined in detail on our Shipping & Delivery Policy page. By placing an order on our website, you agree to comply with these policies and any additional terms and conditions that may apply.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Refunds and Returns</SectionHeading>
            <SectionContent>
              <p>
                Our refunds and returns policies are outlined in detail on our Refunds & Returns Policy page. By placing an order on our website, you agree to comply with these policies and any additional terms and conditions that may apply.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Intellectual Property</SectionHeading>
            <SectionContent>
              <p>
                All content and materials available on our website, including text, graphics, logos, images, and software, are the property of eSthira Mobility or its licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, modify, or distribute any content from our website without prior written consent.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Limitation of Liability</SectionHeading>
            <SectionContent>
              <p>
                In no event shall eSthira Mobility or its affiliates, partners, officers, directors, employees, agents, or licensors be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our website or the products purchased through our website.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Governing Law</SectionHeading>
            <SectionContent>
              <p>
                These Terms & Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Changes to Terms & Conditions</SectionHeading>
            <SectionContent>
              <p>
                We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Any changes will be effective immediately upon posting to our website. Your continued use of our website after any such changes constitutes acceptance of the updated Terms & Conditions.
              </p>
            </SectionContent>
          </TermsSection>

          <TermsSection>
            <SectionHeading>Contact Us</SectionHeading>
            <SectionContent>
              <p>
                If you have any questions or concerns about our Terms & Conditions, please contact us at <strong>info@esthira.com</strong>.
              </p>
            </SectionContent>
          </TermsSection>

          <ContactInfo>
            <p>
              These Terms & Conditions are designed to ensure fair and transparent use of our website and services. By using eSthira Mobility, you help us maintain a safe and trustworthy environment for all our customers.
            </p>
          </ContactInfo>
        </TermsContainer>
      </Container>
    </TermsConditionsSection>
  )
}

export default TermsConditions
