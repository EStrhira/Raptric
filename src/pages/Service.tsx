import React, { useState } from 'react'
import styled from 'styled-components'
import { client, urlFor } from '../lib/sanity'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import BUSINESS_INFO from '../constants/businessInfo'

const ServiceSection = styled.section`
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

const ServiceContainer = styled.div`
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

const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const ServiceTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const ServiceSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const ServiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.15);
  }
`

const ServiceIcon = styled.div`
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`

const ServiceName = styled.h3`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ServiceDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`

const ServiceFeature = styled.li`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #00a652;
    font-weight: bold;
  }
`

const ServiceButton = styled.a`
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

// Contact Section Styles
const ContactSection = styled.section`
  margin-top: 4rem;
  padding: 3rem 0;
  background: rgba(0, 166, 82, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(0, 166, 82, 0.2);
`

const ContactTitle = styled.h2`
  color: #00a652;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`

const ContactSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const ContactIcon = styled.div`
  width: 100%;
  height: 60px;
  background: rgba(0, 166, 82, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00a652;
  font-size: 1.8rem;
  margin-bottom: 1rem;
`

const ContactName = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const ContactInfo = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const Service: React.FC = () => {
  const [loading] = useState(true)

  // Scroll to top when page loads or navigates
  useScrollToTop()

  // Define Service interface inline
  interface Service {
    name: string
    icon: string
    description: string
    features: string[]
  }

  const serviceData: Service[] = [
    {
      name: "Regular Maintenance",
      icon: "fas fa-wrench",
      description: "Keep your RAPTRIC Bikes in top condition with our comprehensive maintenance service",
      features: [
        "General Electrical/Mechanical Inspection",
        "Battery Health Check & Charging",
        "Gear Adjustment (if applicable)",
        "Chain Cleaning & Lubrication",
        "Washing and Polishing"
      ]
    },
    {
      name: "Express Service",
      icon: "fas fa-bolt",
      description: "Quick maintenance and repair service for when you're in a hurry. Perfect for busy professionals who need fast turnaround.",
      features: [
        "Regular Maintenance +",
        "Same-Day Service",
        "Priority Booking",
        "Mobile Service Available",
        "Express Parts Replacement"
      ]
    },
    {
      name: "Annual Service Package",
      icon: "fas fa-calendar-check",
      description: "Complete annual maintenance package with all essential services at a discounted price. Ideal for regular eBike owners who want peace of mind.",
      features: [
        "Regular Maintenance +",
        "Door-Step Service",
        "Discounted Price on Spares"
      ]
    },
    {
      name: "Emergency Support",
      icon: "fas fa-phone-alt",
      description: "Emergency assistance for breakdowns and urgent repairs. Our team is always ready to help you get back on the road.",
      features: [
        "Roadside Assistance",
        "Temporary Parts Replacement"
      ]
    }
  ]

  return (
    <ServiceSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-tools"></i>
          </BannerIcon>
          <BannerTitle>RAPTRIC Service Center</BannerTitle>
          <BannerSubtitle>
            Professional maintenance and support services for your RAPTRIC Bikes. Keep your ride smooth and reliable with our expert team.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <ServiceContainer>
          <ServiceHeader>
            <ServiceTitle>Our Services</ServiceTitle>
            <ServiceSubtitle>
              Choose from our range of professional services designed to keep your RAPTRIC Bikes running perfectly.
            </ServiceSubtitle>
          </ServiceHeader>

          <ServiceGrid>
            {serviceData.map((service: Service, index: number) => (
              <ServiceCard key={index}>
                <ServiceIcon>
                  <i className={service.icon}></i>
                </ServiceIcon>
                <ServiceName>{service.name}</ServiceName>
                <ServiceDescription>{service.description}</ServiceDescription>
                <ServiceFeatures>
                  {service.features.map((feature: string, featureIndex: number) => (
                    <ServiceFeature key={featureIndex}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
              </ServiceCard>
            ))}
          </ServiceGrid>

          {/* Contact Information Section */}
          <ContactSection id="contact-us">
            <ContactTitle>Service Center Contact</ContactTitle>
            <ContactSubtitle>
              Visit our service center or contact us for any maintenance and repair needs
            </ContactSubtitle>
            
            <ContactGrid>
              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactName>Service Center Address</ContactName>
                <ContactInfo>
                  {BUSINESS_INFO.address.line1}, {BUSINESS_INFO.address.line2}<br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}, {BUSINESS_INFO.address.pincode}<br />
                  {BUSINESS_INFO.address.country}
                </ContactInfo>
              </ContactCard>

              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-phone-alt"></i>
                </ContactIcon>
                <ContactName>Service Hotline</ContactName>
                <ContactInfo>
                  <strong>Phone:</strong> {BUSINESS_INFO.contact.phone}<br />
                  <strong>Email:</strong> {BUSINESS_INFO.contact.email}<br />
                  <strong>Hours:</strong> {BUSINESS_INFO.hours.weekdays2}
                </ContactInfo>
                
              </ContactCard>

              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-clock"></i>
                </ContactIcon>
                <ContactName>Service Hours</ContactName>
                <ContactInfo>
                  <strong>Monday - Saturday:</strong> {BUSINESS_INFO.hours.display}<br />
                  <strong>Appointment:</strong> Recommended
                </ContactInfo>
              </ContactCard>
            </ContactGrid>
          </ContactSection>
        </ServiceContainer>
      </Container>
    </ServiceSection>
  )
}

export default Service
