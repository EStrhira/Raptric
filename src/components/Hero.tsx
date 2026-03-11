import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Hero as HeroType } from '../lib/sanity'
import { Container } from '../styles/GlobalStyles'

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const CarouselSlide = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  opacity: ${props => props.$active ? 1 : 0};
  transition: opacity 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CarouselImage = styled.div<{ $imageUrl?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.3) 100%);
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 40px 20px;
    gap: 2rem;
  }
`

const HeroText = styled.div``

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #ffffff;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  color: #ffffff;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const HeroButton = styled.a<{ $variant?: 'primary' | 'secondary' }>`
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
    background: #ffffff;
    color: #000000;

    &:hover {
      background: #f0f0f0;
      transform: translateY(-2px);
    }
  `}

  ${props => props.$variant === 'secondary' && `
    background: transparent;
    color: #ffffff;
    border: 2px solid #ffffff;

    &:hover {
      background: #ffffff;
      color: #000000;
    }
  `}
`

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
`

const Indicator = styled.button<{ $active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
  }
`

const CounterContainer = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  background: rgba(0, 0, 0, 0.7);
  padding: 12px 20px;
  border-radius: 25px;
  z-index: 3;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const CounterText = styled.div`
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;

  .current {
    color: #ffffff;
    font-size: 18px;
    font-weight: 700;
  }

  .separator {
    color: rgba(255, 255, 255, 0.6);
  }

  .total {
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
  }
`

const ProgressBar = styled.div`
  width: 60px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 8px;
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #ffffff;
  border-radius: 2px;
  transition: width 0.3s ease;
  width: ${props => props.$progress}%;
`

interface CarouselSlide {
  id: string
  title: string
  subtitle: string
  primaryButtonText: string
  primaryButtonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  imageUrl?: string
}

interface HeroProps {
  hero: HeroType
}

const Hero: React.FC<HeroProps> = ({ hero }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [progress, setProgress] = useState(0)

  // Default carousel slides - you can update these with your images later
  const carouselSlides: CarouselSlide[] = [
    {
      id: '1',
      title: 'eSthira Raptric: The Future of Commuting',
      subtitle: 'Packed with Cutting-Edge Features for an Unmatched Riding Experience',
      primaryButtonText: 'Buy Now',
      primaryButtonLink: '#product',
      secondaryButtonText: 'Book Test Ride',
      secondaryButtonLink: '#test-ride',
      imageUrl: '/Banner1.png'
    },
    {
      id: '2',
      title: 'Ride with Confidence',
      subtitle: 'Premium quality, unmatched performance, eco-friendly commute',
      primaryButtonText: 'Learn More',
      primaryButtonLink: '#features',
      secondaryButtonText: 'Contact Us',
      secondaryButtonLink: '#contact',
      imageUrl: '/Banner2.jpg'
    },
    {
      id: '3',
      title: 'Sustainable Living',
      subtitle: 'Eco-friendly transportation reduces carbon footprint and promotes healthier lifestyles',
      primaryButtonText: 'Join Movement',
      primaryButtonLink: '#community',
      secondaryButtonText: 'Learn More',
      secondaryButtonLink: '#sustainability',
      imageUrl: '/Banner3.jpg'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        const nextSlide = prevSlide === carouselSlides.length - 1 ? 0 : prevSlide + 1
        return nextSlide
      })
    }, 5000) // Auto-rotate every 5 seconds

    return () => clearInterval(interval)
  }, [carouselSlides.length])

  useEffect(() => {
    // Update progress bar
    const progressPercentage = ((currentSlide + 1) / carouselSlides.length) * 100
    setProgress(progressPercentage)
  }, [currentSlide, carouselSlides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = carouselSlides[currentSlide]

  return (
    <HeroSection>
      <CarouselContainer>
        {carouselSlides.map((slide, index) => (
          <CarouselSlide key={slide.id} $active={index === currentSlide}>
            <CarouselImage $imageUrl={slide.imageUrl} />
          </CarouselSlide>
        ))}
      </CarouselContainer>

      <HeroContent>
        <HeroText>
          <HeroTitle>{currentSlideData.title}</HeroTitle>
          <HeroSubtitle>{currentSlideData.subtitle}</HeroSubtitle>
          <HeroButtons>
            <HeroButton href={currentSlideData.primaryButtonLink} $variant="primary">
              {currentSlideData.primaryButtonText}
            </HeroButton>
            <HeroButton href={currentSlideData.secondaryButtonLink} $variant="secondary">
              {currentSlideData.secondaryButtonText}
            </HeroButton>
          </HeroButtons>
        </HeroText>
      </HeroContent>

      <CarouselIndicators>
        {carouselSlides.map((_, index) => (
          <Indicator
            key={index}
            $active={index === currentSlide}
            onClick={() => goToSlide(index)}
          />
        ))}
      </CarouselIndicators>

      <CounterContainer>
        <CounterText>
          <span className="current">{currentSlide + 1}</span>
          <span className="separator">/</span>
          <span className="total">{carouselSlides.length}</span>
        </CounterText>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
      </CounterContainer>
    </HeroSection>
  )
}

export default Hero
