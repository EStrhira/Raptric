import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const SafetyTipsSection = styled.section`
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

const SafetyContainer = styled.div`
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

const SafetyHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const SafetyTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`

const SafetySubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`

const SafetyTipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SafetyTipCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.1);
  }
`

const TipIcon = styled.div`
  font-size: 2.5rem;
  color: #00a652;
  margin-bottom: 1rem;
  text-align: center;
`

const TipTitle = styled.h3`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`

const TipDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
`

const SafetyMessage = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  margin-top: 2rem;
`

const SafetyMessageTitle = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const SafetyMessageText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1.1rem;
`

const SafetyTips: React.FC = () => {
  // Scroll to top when page loads or navigates
  useScrollToTop()
  const safetyTips = [
    {
      icon: 'fa-hard-hat',
      title: 'Wear a Helmet',
      description: 'Always wear a properly fitted helmet. It\'s your first line of defense in an accident.'
    },
    {
      icon: 'fa-wrench',
      title: 'Check Your Bike Before Riding',
      description: 'Perform a quick inspection of your e-bike before each ride. Ensure the brakes are working, the tires are properly inflated, and the battery is securely in place.'
    },
    {
      icon: 'fa-lightbulb',
      title: 'Be Visible',
      description: 'Use lights and reflective gear, especially when riding in low light conditions. Visibility can be a lifesaver.'
    },
    {
      icon: 'fa-traffic-light',
      title: 'Follow Traffic Rules',
      description: 'Obey all traffic signals and signage. Remember, e-bikes are subject to the same rules as traditional bicycles.'
    },
    {
      icon: 'fa-road',
      title: 'Use Bike Lanes When Available',
      description: 'Stick to bike lanes whenever possible. If there\'s no bike lane, ride on the right side of the road, with traffic.'
    },
    {
      icon: 'fa-eye',
      title: 'Stay Alert',
      description: 'Keep an eye out for road hazards like potholes, gravel, and wet surfaces. Also, be aware of cars and pedestrians around you.'
    },
    {
      icon: 'fa-hand-paper',
      title: 'Signal Your Intentions',
      description: 'Use hand signals to indicate turns and lane changes. Clear communication can prevent accidents.'
    },
    {
      icon: 'fa-car',
      title: 'Keep a Safe Distance',
      description: 'Maintain a safe distance from other vehicles. This gives you more time to react in case of sudden stops.'
    },
    {
      icon: 'fa-tachometer-alt',
      title: 'Do Not Speed',
      description: 'Maintain a safe, controllable speed. Remember, faster speeds make it harder to react in time.'
    },
    {
      icon: 'fa-lock',
      title: 'Secure Your E-Bike',
      description: 'Always lock your e-bike securely when not in use. Theft prevention is part of being a responsible e-bike owner.'
    }
  ]

  return (
    <SafetyTipsSection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-shield-alt"></i>
            </BannerIcon>
            <BannerTitle>Safety Tips</BannerTitle>
            <BannerSubtitle>
              Ride Smart, Ride Safe - Essential guidelines for safe eBike riding. Your safety is our top priority.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <SafetyContainer>
          <SafetyHeader>
            <SafetyTitle>Safety Tips for eSthira eBike Riders</SafetyTitle>
            <SafetySubtitle>
              Welcome to the eSthira family! As you embark on your journey with your new eSthira e-bike, safety is our top priority. Follow these essential tips to ensure a safe and enjoyable ride every time.
            </SafetySubtitle>
          </SafetyHeader>

          <SafetyTipsGrid>
            {safetyTips.map((tip, index) => (
              <SafetyTipCard key={index}>
                <TipIcon>
                  <i className={`fas ${tip.icon}`}></i>
                </TipIcon>
                <TipTitle>{tip.title}</TipTitle>
                <TipDescription>{tip.description}</TipDescription>
              </SafetyTipCard>
            ))}
          </SafetyTipsGrid>

          <SafetyMessage>
            <SafetyMessageTitle>Enjoy Your Ride, Stay Safe!</SafetyMessageTitle>
            <SafetyMessageText>
              By following these safety tips, you'll not only protect yourself but also contribute to a safer environment for everyone on the road. Remember, safe riding is smart riding!
            </SafetyMessageText>
          </SafetyMessage>
        </SafetyContainer>
      </Container>
    </SafetyTipsSection>
  )
}

export default SafetyTips
