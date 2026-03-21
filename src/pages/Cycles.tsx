import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { client, Cycle, urlFor } from '../lib/sanity'
import { Link } from 'react-router-dom'
import { useScrollToTop } from '../hooks/useScrollToTop'

const CyclesSection = styled.section`
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

const CyclesContainer = styled.div`
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

const CyclesHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const CyclesTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const CyclesSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

const CyclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
  }
`

const CycleCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 0.5rem;
  border-left: 4px solid #00a652;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(255,255,255,0.15);
  }
`

const CycleImage = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin-bottom: 0.5rem;
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

const CycleName = styled.h3`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const CyclePrice = styled.div`
  font-size: 1.3rem;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 0.5rem;
`

const CycleDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

const ColorsSection = styled.div`
  margin-bottom: 0.5rem;
`

const ColorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ColorChip = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`

const CycleFeatures = styled.ul`
  list-style: none;
  margin-bottom: 1.5rem;
`

const CycleFeature = styled.li`
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

const CycleButton = styled.a`
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

const Cycles: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [loading, setLoading] = useState(true)

  // Scroll to top when page loads or navigates
  useScrollToTop()

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const data = await (client as any).fetch('*[_type == "cycle"] | order(featured desc, name asc) { _id, name, slug, price, discountPrice, description, shortDescription, image, images, colors, specifications, inStock, featured }')
        setCycles(data)
      } catch (error) {
        console.error('Error fetching cycles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCycles()
  }, [])

  if (loading) {
    return (
      <CyclesSection>
        <Container>
          <CyclesContainer>
            <CyclesHeader>
              <CyclesTitle>Loading...</CyclesTitle>
            </CyclesHeader>
          </CyclesContainer>
        </Container>
      </CyclesSection>
    )
  }

  return (
    <CyclesSection>
      <BannerSection>
        <BannerContent>
          <BannerIcon>
            <i className="fas fa-bicycle"></i>
          </BannerIcon>
          <BannerTitle>RAPTRIC mBikes</BannerTitle>
          <BannerSubtitle>
            Discover our range of revolutionary mechanical bicycles designed for performance and style. Experience the future of cycling with RAPTRIC mBikes.
          </BannerSubtitle>
        </BannerContent>
      </BannerSection>

      <Container>
        <CyclesContainer>
          <CyclesHeader>
            <CyclesTitle>Our mBikes Collection</CyclesTitle>
            <CyclesSubtitle>
              Choose from our range of revolutionary mechanical bicycles designed for performance. All models come with warranty and free delivery in Bengaluru.
            </CyclesSubtitle>
          </CyclesHeader>

          <CyclesGrid>
            {cycles.map((cycle, index) => (
              <CycleCard key={index}>
                <CycleImage>
                  {cycle.images && cycle.images.length > 0 ? (
                    <img src={urlFor(cycle.images[0]).height(300).url()} alt={cycle.name} />
                  ) : cycle.image ? (
                    <img src={urlFor(cycle.image).height(300).url()} alt={cycle.name} />
                  ) : (
                    <i className="fas fa-bicycle"></i>
                  )}
                </CycleImage>
                <CycleName>{cycle.name}</CycleName>
                <CyclePrice>
                  {cycle.discountPrice ? (
                    <>
                      <span style={{ textDecoration: 'line-through', opacity: 0.7, marginRight: '0.5rem' }}>₹{cycle.price}</span>
                      <span style={{ color: '#00a652' }}>₹{cycle.discountPrice}</span>
                    </>
                  ) : (
                    <>₹{cycle.price}</>
                  )}
                </CyclePrice>
                {cycle.shortDescription && (
                  <CycleDescription>{cycle.shortDescription}</CycleDescription>
                )}
                {cycle.colors && cycle.colors.length > 0 && (
                  <ColorsSection>
                    <ColorsList>
                      {cycle.colors.map((color, index) => (
                        <ColorChip key={index}>{color}</ColorChip>
                      ))}
                    </ColorsList>
                  </ColorsSection>
                )}
                <CycleButton as={Link} to={`/cycle/${cycle.slug.current}`}>
                  <i className="fas fa-arrow-right"></i>
                  Read More
                </CycleButton>
              </CycleCard>
            ))}
          </CyclesGrid>
        </CyclesContainer>
      </Container>
    </CyclesSection>
  )
}

export default Cycles
