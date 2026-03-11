import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const CancellationRefundSection = styled.section`
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

  .highlight-box {
    background: rgba(255, 255, 255, 0.05);
    border-left: 3px solid #00a652;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
  }

  .contact-info {
    background: rgba(0, 166, 82, 0.1);
    border: 1px solid rgba(0, 166, 82, 0.3);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
    text-align: center;
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

const CancellationRefundReplacement: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <CancellationRefundSection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-undo-alt"></i>
            </BannerIcon>
            <BannerTitle>Cancellation, Refund & Replacement</BannerTitle>
            <BannerSubtitle>
              Clear and fair policies for cancellations, refunds, and replacements. Your satisfaction is our priority with transparent processes.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <PolicyContainer>
          <PolicyHeader>
            <PolicyTitle>Cancellation, Refund & Replacement Policy</PolicyTitle>
            <PolicySubtitle>
              At Raptric, customer satisfaction is our top priority. We strive to deliver high-quality electric bikes and accessories with dependable service.
            </PolicySubtitle>
          </PolicyHeader>

          <PolicySection>
            <SectionHeading>Cancellation Policy</SectionHeading>
            <SectionContent>
              <p>
                You may cancel your order before it is marked "Out for Delivery", subject to a cancellation fee as outlined below:
              </p>
              <ul>
                <li><strong>Within 24 hours of placing the order:</strong> 5% of the total order value will be charged as a cancellation fee.</li>
                <li><strong>After 24 hours but before dispatch:</strong> 10% of the total order value will be charged.</li>
                <li><strong>Once the order is out for delivery:</strong> Cancellation and refund are not possible.</li>
              </ul>
              <div className="contact-info">
                <p>
                  <strong>To request a cancellation:</strong> Please contact our support team at <strong>info.esthira@gmail.com</strong> or <strong>9380276355</strong> with your order ID.
                </p>
              </div>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Return Policy</SectionHeading>
            <SectionContent>
              <p>
                We do not accept returns once the product has been delivered. Due to the nature of our products and for safety and quality assurance, returns are not permitted unless the item is damaged during transit.
              </p>
              <div className="highlight-box">
                <p>
                  <strong>Please read the Replacement Policy below</strong> in case of delivery damage.
                </p>
              </div>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Refund Policy</SectionHeading>
            <SectionContent>
              <p>
                Refunds are applicable only for approved cancellations and are subject to deduction of the applicable cancellation fee. The remaining amount will be refunded to the original payment method used at the time of purchase.
              </p>
              <ul>
                <li>Refunds will be processed within <strong>7 to 15 business days</strong> after approval, as per the Reserve Bank of India (RBI) guidelines.</li>
                <li>Refunds are not applicable for delivered products unless there is verified damage.</li>
              </ul>
              <div className="contact-info">
                <p>
                  If you believe you are eligible for a refund, please reach out to <strong>info.esthira@gmail.com</strong> or <strong>9380276355</strong> with your order details.
                </p>
              </div>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Replacement Policy</SectionHeading>
            <SectionContent>
              <p>
                We provide free replacement only if the product is found damaged during transit or delivery.
              </p>
              <div className="highlight-box">
                <p>
                  <strong>To be eligible for a replacement:</strong>
                </p>
                <ul>
                  <li>Please record a video of the product unboxing clearly showing the damage.</li>
                  <li>Contact our customer support within 24 hours of delivery with the video and your order number.</li>
                  <li>Our team will verify the claim, and if approved, a replacement will be dispatched at no extra cost.</li>
                </ul>
              </div>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Important Notes</SectionHeading>
            <SectionContent>
              <ul>
                <li>All cancellations, refunds, and replacements are subject to internal verification and approval by our support team.</li>
                <li>These policies may be updated periodically without prior notice. Please review this page regularly for the latest terms.</li>
              </ul>
            </SectionContent>
          </PolicySection>

          <PolicySection>
            <SectionHeading>Support Contact</SectionHeading>
            <SectionContent>
              <p>
                For support regarding cancellations, refunds, or replacements, email us at <strong>info.esthira@gmail.com</strong> or call our helpline at <strong>9380276355</strong>.
              </p>
            </SectionContent>
          </PolicySection>

          <ContactInfo>
            <p>
              We are committed to ensuring your complete satisfaction with our products and services. Our policies are designed to be fair, transparent, and customer-friendly while maintaining quality standards.
            </p>
          </ContactInfo>
        </PolicyContainer>
      </Container>
    </CancellationRefundSection>
  )
}

export default CancellationRefundReplacement
