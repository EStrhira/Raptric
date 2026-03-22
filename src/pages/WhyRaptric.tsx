import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const WhyRaptricSection = styled.section`
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

const WhyRaptricContainer = styled.div`
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
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 166, 82, 0.15);
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #00a652;
  margin-bottom: 1.5rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  font-size: 1rem;
`

const ComparisonSection = styled.div`
  background: #1a1a1a;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-bottom: 4rem;
`

const ComparisonTable = styled.div`
  overflow-x: auto;
  margin-top: 2rem;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
`

const TableHeader = styled.th`
  background: #00a652;
  color: #ffffff;
  padding: 1.2rem;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`

const TableCell = styled.td`
  padding: 1.2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.9rem;
  }
`

const HighlightCell = styled(TableCell)`
  background: rgba(0, 166, 82, 0.1);
  color: #00a652;
  font-weight: 600;
`

const CTASection = styled.div`
  text-align: center;
  padding: 4rem 0;
`

const CTAButton = styled(Link)`
  display: inline-block;
  padding: 1.2rem 3rem;
  background: linear-gradient(135deg, #00a652, #008040);
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 166, 82, 0.3);
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    font-size: 1rem;
  }
`

const WhyRaptric: React.FC = () => {
  useScrollToTop()

  const features = [
    {
      icon: 'fas fa-bicycle',
      title: 'Convertible Design',
      description: 'Unique convertible frame that transforms from mechanical to electric, giving you the best of both worlds.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Premium Build Quality',
      description: 'High-tensile steel frame with advanced engineering ensures durability and safety on Indian roads.'
    },
    {
      icon: 'fas fa-cogs',
      title: 'Advanced Gearing System',
      description: '21-speed Microshift gears provide smooth transitions and optimal performance across terrains.'
    },
    {
      icon: 'fas fa-compact-disc',
      title: 'Superior Braking',
      description: 'Dual disc brakes offer reliable stopping power in all weather conditions.'
    },
    {
      icon: 'fas fa-battery-full',
      title: 'Future-Ready',
      description: 'Designed to easily accommodate electric conversion kits for future upgrades.'
    },
    {
      icon: 'fas fa-rupee-sign',
      title: 'Best Value Proposition',
      description: 'Get premium features at competitive pricing, making quality cycling accessible to everyone.'
    }
  ]

  const comparisonData = [
    {
      feature: 'Frame Material',
      raptric: 'High-Tensile Steel',
      standard: 'Aluminum/Basic Steel',
      advantage: 'Superior durability & safety'
    },
    {
      feature: 'Gearing System',
      raptric: '21-Speed Microshift',
      standard: '18-21 Speed Basic',
      advantage: 'Smooth gear transitions'
    },
    {
      feature: 'Braking System',
      raptric: 'Dual Disc Brakes',
      standard: 'V-Brakes/Single Disc',
      advantage: 'Better stopping power'
    },
    {
      feature: 'Wheel Size',
      raptric: '27.5" MTB',
      standard: '26" Standard',
      advantage: 'Better stability & control'
    },
    {
      feature: 'Convertibility',
      raptric: 'Mechanical to Electric',
      standard: 'Mechanical Only',
      advantage: 'Future-proof investment'
    },
    {
      feature: 'Price Range',
      raptric: '₹25,000 - ₹35,000',
      standard: '₹20,000 - ₹50,000',
      advantage: 'Best value for features'
    }
  ]

  return (
    <WhyRaptricSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>🚴‍♂️</BannerIcon>
          <BannerTitle>Why Choose RAPTRIC?</BannerTitle>
          <BannerSubtitle>
            Experience the perfect blend of traditional cycling excellence and modern innovation, 
            designed specifically for Indian roads and riding conditions.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <WhyRaptricContainer>
          <HeroContent>
            <HeroTitle>The RAPTRIC Advantage</HeroTitle>
            <HeroSubtitle>
              While the Indian bicycle market offers numerous options, RAPTRIC stands out with its unique convertible design 
              and premium features that cater to both traditional cyclists and modern riders.
            </HeroSubtitle>
          </HeroContent>

          <IntroSection>
            <IntroText>
              The RAPTRIC represents a revolutionary approach to cycling in India. Unlike conventional bicycles that limit you to either 
              mechanical or electric options, RAPTRIC offers the flexibility to start with a premium mechanical bicycle 
              and upgrade to electric whenever you choose. This future-proof design, combined with superior build quality 
              and advanced features, makes it the ideal choice for Indian cyclists who value both tradition and innovation.
            </IntroText>
          </IntroSection>

          <FeatureGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>
                  <i className={feature.icon}></i>
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>

          <ComparisonSection>
            <SectionTitle>RAPTRIC vs Indian Market Competition</SectionTitle>
            <IntroText>
              See how RAPTRIC compares with other bicycles available in the Indian market across key features and specifications.
            </IntroText>
            <ComparisonTable>
              <Table>
                <thead>
                  <tr>
                    <TableHeader>Feature</TableHeader>
                    <TableHeader>eSthira RAPTRIC</TableHeader>
                    <TableHeader>Standard Indian Bicycles</TableHeader>
                    <TableHeader>Advantage</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((item, index) => (
                    <tr key={index}>
                      <TableCell>{item.feature}</TableCell>
                      <HighlightCell>{item.raptric}</HighlightCell>
                      <TableCell>{item.standard}</TableCell>
                      <HighlightCell>{item.advantage}</HighlightCell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ComparisonTable>
          </ComparisonSection>

          <CTASection>
            <CTAButton to="/cycles">
              Explore RAPTRIC Bicycles
            </CTAButton>
          </CTASection>
        </WhyRaptricContainer>
      </Container>
    </WhyRaptricSection>
  )
}

export default WhyRaptric
