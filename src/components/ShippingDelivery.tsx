import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const ShippingDeliverySection = styled.section`
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

const ShippingContainer = styled.div`
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

const ShippingHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const ShippingTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

const ShippingSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`

const ShippingSection = styled.div`
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

  .note {
    background: rgba(255, 255, 255, 0.05);
    border-left: 3px solid #00a652;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 4px;
    font-style: italic;
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

const ShippingDelivery: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  return (
    <ShippingDeliverySection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-truck"></i>
            </BannerIcon>
            <BannerTitle>Shipping & Delivery</BannerTitle>
            <BannerSubtitle>
              Fast and reliable delivery to your doorstep. Free delivery within Bengaluru with professional assembly support.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <ShippingContainer>
          <ShippingHeader>
            <ShippingTitle>Shipping & Delivery Policy</ShippingTitle>
            <ShippingSubtitle>
              Customer POLICY NOTE for Online sales from esthira.com and offline sales from eSthira Mobility authorized stores
            </ShippingSubtitle>
          </ShippingHeader>

          <ShippingSection>
            <SectionHeading>Delivery Confirmation</SectionHeading>
            <SectionContent>
              <p>
                You confirm that address at which delivery of the product(s) ordered by You is to be made, is correct and proper in all aspects. In the event that a non-delivery occurs on account of a mistake by You (i.e. wrong name or address or any other wrong information), any extra cost incurred by the Company for re-delivery shall be claimed from You and You shall bear such expenses.
              </p>
              <p>
                You will be required to enter a valid phone number, email id while placing an order on the Website. By registering Your phone number with us, You consent to be contacted by the Company via phone calls and / or SMS notifications, in case of any order or shipment or delivery related updates. The Company may use Your personal information to initiate any promotional phone calls or SMS' unless expressly denied by the User.
              </p>
            </SectionContent>
          </ShippingSection>

          <ShippingSection>
            <SectionHeading>Delivery Process</SectionHeading>
            <SectionContent>
              <p>
                Customer will be intimated before eBike is out for delivery. The delivery agent will reach out to the Customer on the day of delivery to the provided Primary and Alternate phone numbers. Customer is expected to receive these call for successful delivery.
              </p>
              <p>
                In case of customer is not reachable for delivery by the delivery agent, a second attempt would be made within next 3 days after being able to reach customer successfully on phone and email address.
              </p>
              <p>
                In case of second attempt fails as the customer is again not reachable by the delivery agent on the agreed delivery date, OR the customer could not be reached within 3 days from the first failed delivery attempt, the eBike would be returned back to the company. In this case, the customer will have to contact the company to know the revised next available date for delivery. But this time, the cost of delivery will have to be borne by the customer. Otherwise, the customer can pick up from eSthira store free of cost.
              </p>
            </SectionContent>
          </ShippingSection>

          <ShippingSection>
            <SectionHeading>Free Delivery</SectionHeading>
            <SectionContent>
              <p>
                eSthira Mobility is pleased to offer Free Delivery Service on its eBikes. You can expect delivery of your purchased eBikes within 10 working days of order confirmation from us with the following terms and conditions:
              </p>
              <ul>
                <li>Delivery time of 10 working days doesn't cover any location outside Bengaluru city</li>
                <li>eSthira Mobility reserves the right to end this offer anytime and modify the terms and conditions without prior notice</li>
                <li>eSthira Mobility has the right to reschedule the delivery time as per products availability and feasibility</li>
              </ul>
            </SectionContent>
          </ShippingSection>

          <ShippingSection>
            <SectionHeading>Assembly</SectionHeading>
            <SectionContent>
              <p>
                The eBike will be delivered to the customer in 90% assembled condition. The customer needs to do the following:
              </p>
              <ul>
                <li>Install the pedal.</li>
                <li>Install the front wheel using the quick-release lever.</li>
                <li>Correct the handle bar position and tighten it.</li>
                <li>The customer needs to install any accessories (if ordered).</li>
              </ul>
              <div className="note">
                <p>
                  <strong>Note:</strong> The above mentioned steps can be done with the help of tools provided in the small part box, in which pedal is kept.
                </p>
              </div>
            </SectionContent>
          </ShippingSection>

          <ShippingSection>
            <SectionHeading>Important Notes</SectionHeading>
            <SectionContent>
              <ul>
                <li>Always provide accurate and complete delivery information</li>
                <li>Ensure your phone is reachable during delivery period</li>
                <li>Check email and SMS notifications regularly</li>
                <li>Keep tools ready for final assembly steps</li>
                <li>Contact customer support for any delivery issues</li>
              </ul>
            </SectionContent>
          </ShippingSection>

          <ContactInfo>
            <p>
              For any questions or concerns regarding shipping and delivery, please contact our customer support team. We are committed to ensuring your eBike reaches you safely and on time.
            </p>
          </ContactInfo>
        </ShippingContainer>
      </Container>
    </ShippingDeliverySection>
  )
}

export default ShippingDelivery
