import React from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const ShowcaseSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  position: relative;
  overflow: hidden;
`

const ShowcaseContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`

const ShowcaseContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const ShowcaseLeft = styled.div`
  position: relative;
`

const ShowcaseImage = styled.div`
  background: url('/Banner2.jpg') center/cover;
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 300px;
  }
`

const SpecificationImage = styled.div`
  margin-top: 3rem;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    margin-top: 2rem;
  }
`

const ShowcaseRight = styled.div`
  color: #ffffff;
`

const ShowcaseTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ShowcaseSubtitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #cccccc;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const ShowcaseDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #ffffff;
  opacity: 0.9;
`

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 2rem;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #ffffff;

  i {
    color: #ffffff;
    margin-right: 1rem;
    font-size: 1.2rem;
  }
`

const ShowcaseButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background: #ffffff;
  color: #000000;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-size: 1rem;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
`

const Badge = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  background: #ffffff;
  color: #000000;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`

const Showcase: React.FC = () => {
  return (
    <ShowcaseSection>
      <Container>
        <ShowcaseContainer>
          <ShowcaseContent>
            <ShowcaseLeft>
              <ShowcaseImage>
                <Badge>NEW</Badge>
                <i className="fas fa-bicycle"></i>
              </ShowcaseImage>
            </ShowcaseLeft>
            <ShowcaseRight>
              <ShowcaseTitle>eSthira Raptric</ShowcaseTitle>
              <ShowcaseSubtitle>Revolutionary Electric Bicycle</ShowcaseSubtitle>
              <ShowcaseDescription>
                Experience the future of urban mobility with our cutting-edge electric bicycle. Designed for performance, comfort, and sustainability.
              </ShowcaseDescription>
              <FeatureList>
                <FeatureItem>
                  <i className="fas fa-bolt"></i>
                  250W BLDC Hub Motor
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-battery-full"></i>
                  36V Lithium-Ion Battery
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-tachometer-alt"></i>
                  Top Speed: 25 km/h
                </FeatureItem>
                <FeatureItem>
                  <i className="fas fa-route"></i>
                  Range: 40-60 km per charge
                </FeatureItem>
              </FeatureList>
              <ShowcaseButton href="/ebikes">Learn More</ShowcaseButton>
            </ShowcaseRight>
          </ShowcaseContent>
          
          {/* Electric Specification Image */}
          <SpecificationImage>
            <img src="/Electric specification.jpeg" alt="Electric Bike Specifications" />
          </SpecificationImage>
        </ShowcaseContainer>
      </Container>
    </ShowcaseSection>
  )
}

export default Showcase
