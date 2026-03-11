import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const PrivacyPolicySection = styled.section`
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
    background: url('/counter-image.jpg') center/cover;
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

const PolicyContainer = styled.div`
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

const PolicyHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const PolicyTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

const PolicySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`

const PolicySection = styled.div`
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

const PrivacyPolicy: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <PrivacyPolicySection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-shield-alt"></i>
            </BannerIcon>
            <BannerTitle>Privacy Policy</BannerTitle>
            <BannerSubtitle>
              Your privacy is our priority. Learn how we collect, use, and protect your personal information with transparency and care.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <PolicyContainer>
          <PolicyHeader>
            <PolicyTitle>Privacy Policy</PolicyTitle>
            <PolicySubtitle>
              Effective Date: 15 February, 2024
            </PolicySubtitle>
          </PolicyHeader>

          <PolicySection>
            <SectionHeading>Introduction</SectionHeading>
            <SectionContent>
              <p>
                Thank you for visiting eSthira Mobility (referred to as "we", "us", or "our"). This Privacy Policy outlines how we collect, use, and protect information you provide to us when using our website and services.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Information We Collect</SectionHeading>
            <SectionContent>
              <p>
                When you interact with our website or contact us for assistance, we may collect personal information that you voluntarily provide, including but not limited to:
              </p>
              <ul>
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Address</li>
                <li>Payment information</li>
              </ul>
              <p>
                We may also collect non-personal information such as your IP address, browser type, and device information when you visit our website.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>How We Use Your Information</SectionHeading>
            <SectionContent>
              <p>
                We may use information we collect from you for the following purposes:
              </p>
              <ul>
                <li>To process and fulfill your orders for eBikes and accessories</li>
                <li>To provide customer support and assistance</li>
                <li>To communicate with you about your orders, products, and promotions</li>
                <li>To improve our website, products, and services</li>
                <li>To detect and prevent fraud and abuse</li>
              </ul>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Information Sharing</SectionHeading>
            <SectionContent>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to trusted third parties who assist us in operating our website, conducting our business, or servicing you.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Data Security</SectionHeading>
            <SectionContent>
              <p>
                We take the security of your personal information seriously and implement appropriate measures to protect it from unauthorized access, disclosure, alteration, or destruction. We use industry-standard encryption technology to safeguard your sensitive information during transmission.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Cookies</SectionHeading>
            <SectionContent>
              <p>
                Our website may use cookies to enhance your browsing experience and provide personalized content. You have the option to accept or decline cookies through your browser settings. Please note that disabling cookies may affect the functionality of certain features on our website.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Third-Party Links</SectionHeading>
            <SectionContent>
              <p>
                Our website may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party websites you visit.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Children's Privacy</SectionHeading>
            <SectionContent>
              <p>
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13 years old. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us immediately.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Updates to This Privacy Policy</SectionHeading>
            <SectionContent>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time without prior notice. Any changes will be effective immediately upon posting to our website. Your continued use of our website after any such changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Contact Us</SectionHeading>
            <SectionContent>
              <p>
                If you have any questions or concerns about our Privacy Policy, or if you would like to exercise your rights regarding your personal information, please contact us at <strong>info.esthira@gmail.com</strong> or <strong>info@esthira.com</strong>.
              </p>
            </SectionContent>
          </PolicySection>

          <ContactInfo>
            <p>
              We are committed to protecting your privacy and ensuring the security of your personal information. Your trust is important to us, and we work diligently to maintain that trust through transparent privacy practices.
            </p>
          </ContactInfo>
        </PolicyContainer>
      </Container>
    </PrivacyPolicySection>
  )
}

export default PrivacyPolicy
