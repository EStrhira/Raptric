import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const PricingPolicySection = styled.section`
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
    list-style: none;
    padding-left: 0;
  }

  li {
    margin-bottom: 0.5rem;
    position: relative;
    padding-left: 1.5rem;
    color: rgba(255, 255, 255, 0.9);

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: rgba(255, 255, 255, 0.6);
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

const PricingPolicy: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <PricingPolicySection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-tag"></i>
            </BannerIcon>
            <BannerTitle>Pricing Policy</BannerTitle>
            <BannerSubtitle>
              Transparent pricing for your RAPTRIC journey. Clear, fair, and straightforward costs with no hidden fees.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <PolicyContainer>
          <PolicyHeader>
            <PolicyTitle>Pricing Policy</PolicyTitle>
            <PolicySubtitle>
              Effective Date: 01 Jan, 2026
            </PolicySubtitle>
          </PolicyHeader>

          <PolicySection>
            <SectionHeading>RAPTRIC eBikes Price</SectionHeading>
            <SectionContent>
              <p>
                esthira.com offers multiple variants of RAPTRIC electric cycles (eBikes). Please check <a href="/ebikes" style={{ color: '#00a652', textDecoration: 'underline' }}>eBikes</a> page for pricing details. This price includes the following:
              </p>
              <ul>
                <li>eBike frame, motor, battery, and other electronics</li>
                <li>Mechanical bicycle parts</li>
              </ul>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>RAPTRIC mBikes Price</SectionHeading>
            <SectionContent>
              <p>
                esthira.com offers multiple variants of RAPTRIC mechanical cycles (mBikes). Please check <a href="/mbikes" style={{ color: '#00a652', textDecoration: 'underline' }}>mBikes</a> page for pricing details. This price includes the following:
              </p>
              <ul>
                <li>Mechanical bicycle parts</li>
              </ul>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Add-Ons and Accessories</SectionHeading>
            <SectionContent>
              <p>
                esthira.com offers a variety of add-ons and accessories to customize your bikes and enhance your riding experience. These items are sold separately at store and are not included in the base price of the bikes. You can find a complete list of add-ons and their individual prices in our <a href="/accessories" style={{ color: '#00a652', textDecoration: 'underline' }}>accessory</a> page.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Payment Methods</SectionHeading>
            <SectionContent>
              <p>
                esthira.com accepts the following payment methods:
              </p>
              <ul>
                <li>Credit cards</li>
                <li>Debit cards</li>
                <li>UPI/QR</li>
                <li>Net banking</li>
                <li>Bajaj Finance</li>
              </ul>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Taxes and Fees</SectionHeading>
            <SectionContent>
              <p>
                All applicable taxes (e.g., GST) will be added to your order at checkout. Shipping and handling fees may vary based on location and order value.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Price Changes</SectionHeading>
            <SectionContent>
              <p>
                esthira.com reserves the right to change prices at any time without prior notice. However, the price of your bike or add-ons will be locked in at the time you place your order.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Returns and Exchanges</SectionHeading>
            <SectionContent>
              <p>
                For information on our return and exchange policy, please refer here.
              </p>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Contact Us</SectionHeading>
            <SectionContent>
              <p>
                If you have any questions about our pricing policy, please don't hesitate to contact us at <strong>+91-93802-76355</strong> or <strong>info.esthira@gmail.com</strong>.
              </p>
            </SectionContent>
          </PolicySection>

          <ContactInfo>
            <p>
              We hope this pricing policy information helps you make your purchase decision. By clearly outlining our pricing structure, we aim to provide you with a transparent and hassle-free shopping experience at esthira.com.
            </p>
          </ContactInfo>
        </PolicyContainer>
      </Container>
    </PricingPolicySection>
  )
}

export default PricingPolicy
