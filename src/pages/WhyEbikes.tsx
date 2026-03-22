import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const WhyEbikesSection = styled.section`
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

const WhyEbikesContainer = styled.div`
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

const HeroContent = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #00a652;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const IntroSection = styled.div`
  background: #1a1a1a;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const IntroText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BenefitCard = styled.div`
  background: #1a1a1a;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  border-left: 5px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const BenefitIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #00a652, #008040);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  i {
    font-size: 1.8rem;
    color: #fff;
  }
`

const BenefitTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #00a652;
`

const BenefitDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`

const StatsSection = styled.section`
  padding: 4rem 0;
  background: #1a1a1a;
  color: #fff;
  border-radius: 12px;
  margin-bottom: 4rem;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`

const StatCard = styled.div`
  padding: 2rem;
`

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #00a652;
`

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  color: rgba(255, 255, 255, 0.8);
`

const CTASection = styled.section`
  text-align: center;
  padding: 3rem;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
`

const CTATitle = styled.h2`
  font-size: 2rem;
  color: #00a652;
  margin-bottom: 1.5rem;
`

const CTADescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-block;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;

  ${props => props.$variant === 'primary' && `
    background: #00a652;
    color: #fff;

    &:hover {
      background: #008040;
      transform: translateY(-2px);
    }
  `}

  ${props => props.$variant === 'secondary' && `
    background: transparent;
    color: #00a652;
    border: 2px solid #00a652;

    &:hover {
      background: #00a652;
      color: #fff;
    }
  `}
`

const WhyEbikes: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()

  const benefits = [
    {
      icon: 'fas fa-leaf',
      title: 'Eco-Friendly',
      description: 'Zero emissions, reduced carbon footprint, and contribution to cleaner air in our cities.'
    },
    {
      icon: 'fas fa-dollar-sign',
      title: 'Cost Effective',
      description: 'Save money on fuel, maintenance, parking, and insurance compared to traditional vehicles.'
    },
    {
      icon: 'fas fa-heartbeat',
      title: 'Health Benefits',
      description: 'Improved cardiovascular health, reduced stress, and increased physical activity.'
    },
    {
      icon: 'fas fa-clock',
      title: 'Time Saving',
      description: 'Avoid traffic congestion, use bike lanes, and reach your destination faster.'
    },
    {
      icon: 'fas fa-battery-full',
      title: 'Energy Efficient',
      description: 'Maximum range with minimum energy consumption, perfect for daily commutes.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safe & Reliable',
      description: 'Modern safety features, reliable braking systems, and stable riding experience.'
    }
  ]

  return (
    <>
      <WhyEbikesSection>
        <BannerSection>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-bicycle"></i>
            </BannerIcon>
            <BannerTitle>Why Choose eBikes?</BannerTitle>
            <BannerSubtitle>
              Discover the benefits of electric bicycles for urban commuting. Save time, money, and the environment while enjoying a comfortable ride.
            </BannerSubtitle>
          </BannerContent>
        </BannerSection>

        <Container>
          <HeroContent>
            <HeroTitle>Why Choose eBikes?</HeroTitle>
            <HeroSubtitle>
              Discover the benefits of electric bicycles for urban commuting. Save time, money, and the environment while enjoying a comfortable ride.
            </HeroSubtitle>
          </HeroContent>

          <IntroSection>
            <IntroText>
              Electric bicycles are transforming urban mobility across the world. As cities become more congested and environmental concerns grow, eBikes offer a perfect solution that combines convenience, sustainability, and health benefits.
            </IntroText>
            <IntroText>
              At eSthira, we believe that eBikes are not just a mode of transportation – they're a lifestyle choice that benefits you, your community, and the planet. Let's explore why eBikes are becoming the preferred choice for modern commuters.
            </IntroText>
          </IntroSection>

          <SectionTitle>The Benefits of Electric Bicycles</SectionTitle>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitCard key={index}>
                <BenefitIcon>
                  <i className={benefit.icon}></i>
                </BenefitIcon>
                <BenefitTitle>{benefit.title}</BenefitTitle>
                <BenefitDescription>{benefit.description}</BenefitDescription>
              </BenefitCard>
            ))}
          </BenefitsGrid>

          <StatsSection>
            <Container>
              <SectionTitle style={{ color: '#fff', marginBottom: '2rem' }}>eBikes by the Numbers</SectionTitle>
              <StatsGrid>
                <StatCard>
                  <StatNumber>40%</StatNumber>
                  <StatLabel>Faster than car in city traffic</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber>0%</StatNumber>
                  <StatLabel>Carbon emissions</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber>80%</StatNumber>
                  <StatLabel>Lower commuting cost</StatLabel>
                </StatCard>
                <StatCard>
                  <StatNumber>60%</StatNumber>
                  <StatLabel>Less parking space needed</StatLabel>
                </StatCard>
              </StatsGrid>
            </Container>
          </StatsSection>

          <CTASection>
            <CTATitle>Ready to Join the eBike Revolution?</CTATitle>
            <CTADescription>
              Experience the perfect blend of technology, sustainability, and freedom with eSthira eBikes.
            </CTADescription>
            <CTAButtons>
              <Button to="/ebikes" $variant="primary">Explore eSthira RAPTRIC</Button>
              <Button to="/contact" $variant="secondary">Schedule a Test Ride</Button>
            </CTAButtons>
          </CTASection>
        </Container>
      </WhyEbikesSection>
    </>
  )
}

export default WhyEbikes
