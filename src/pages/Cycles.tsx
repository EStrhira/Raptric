import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { client, Cycle, urlFor } from '../lib/sanity'
import { Link } from 'react-router-dom'
import { useScrollToTop } from '../hooks/useScrollToTop'
import SEO from '../components/SEO'

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

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0;
  }

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

  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    padding: 0 15px;
  }
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.5rem;
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

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
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

  @media (max-width: 480px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
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
    padding: 2rem;
    margin-top: -40px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-top: -30px;
  }
`

const CyclesHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

const CyclesTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`

const CyclesSubtitle = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const CyclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.5rem;
  }
`

const CycleCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const CycleImage = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 3rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    height: 180px;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    height: 150px;
    margin-bottom: 0.75rem;
  }
`

const CycleInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CycleName = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const CyclePrice = styled.div`
  color: #00a652;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`

const CycleDescription = styled.p`
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
  font-size: 0.95rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ColorsSection = styled.div`
  margin-top: 1rem;
`

const ColorsList = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`

const ColorChip = styled.span`
  background: #333;
  color: #ffffff;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
`

const CycleButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: #00a652;
  color: #ffffff;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    margin-top: 0.75rem;
  }
`

interface CyclesProps {}

const Cycles: React.FC<CyclesProps> = () => {
  const [cycles, setcycles] = useState<Cycle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCycles = async () => {
      try {
        const query = `*[_type == "cycle"] | order(price asc) {
          _id,
          name,
          slug,
          price,
          discountPrice,
          shortDescription,
          colors,
          image,
          images
        }`
        const result = await (client as any).fetch(query)
        setcycles(result)
      } catch (err) {
        console.error('Error fetching cycles:', err)
        setError('Failed to load cycles')
      } finally {
        setLoading(false)
      }
    }

    fetchCycles()
  }, [])

  useScrollToTop()

  if (loading) {
    return (
      <CyclesSection>
        <Container>
          <BannerSection>
            <BannerContent>
              <BannerIcon>
                <i className="fas fa-bicycle"></i>
              </BannerIcon>
              <BannerTitle>Loading...</BannerTitle>
            </BannerContent>
          </BannerSection>
        </Container>
      </CyclesSection>
    )
  }

  if (error) {
    return (
      <CyclesSection>
        <Container>
          <BannerSection>
            <BannerContent>
              <BannerIcon>
                <i className="fas fa-exclamation-triangle"></i>
              </BannerIcon>
              <BannerTitle>Error</BannerTitle>
              <BannerSubtitle>{error}</BannerSubtitle>
            </BannerContent>
          </BannerSection>
        </Container>
      </CyclesSection>
    )
  }

  return (
    <>
      <SEO
        title="Premium Bicycles & Cycles in Bangalore | eSthira"
        description="Explore our premium collection of traditional bicycles and cycles. High-quality bikes designed for performance, comfort, and style. Visit our Bangalore store today!"
        keywords="bicycle, cycle, premium bicycle, Bangalore, road bike, mountain bike, hybrid bicycle, best bicycle in Bangalore, bicycle shop, cycle price, quality bicycle, bicycle brand, cycling Bangalore, bike store, sports bicycle"
        canonical="https://esthira.com/cycles"
        ogImage="/images/og-cycles.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "eSthira",
          "url": "https://esthira.com/cycles",
          "description": "Premium bicycles and cycles in Bangalore. Experience the future of commuting with cutting-edge bicycles and traditional cycles.",
          "potentialAction": {
            "@type": "ReadAction",
            "target": "https://esthira.com/cycles",
            "name": "Explore Our Bicycles"
          },
          "mainEntity": {
            "@type": "Organization",
            "name": "eSthira",
            "url": "https://esthira.com",
            "logo": "https://esthira.com/logo.png",
            "description": "Premium electric bicycles and cycles retailer in Bangalore, offering eco-friendly mobility solutions.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "367, 10T Main, Vidyapeeta Main Road, Banashankari 3rd Stage",
              "addressLocality": "Banashankari",
              "addressRegion": "Bengaluru",
              "postalCode": "560085",
              "addressCountry": "India"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91 93802 76355",
              "contactType": "customer service",
              "email": "info.esthira@gmail.com",
              "availableLanguage": ["English", "Hindi", "Kannada"]
            },
            "sameAs": [
              "https://www.facebook.com/esthira",
              "https://www.instagram.com/esthira",
              "https://www.twitter.com/esthira"
            ]
          }
        }}
      />
      <CyclesSection>
        <Container>
          <BannerSection>
            <BannerContent>
              <BannerIcon>
                <i className="fas fa-bicycle"></i>
              </BannerIcon>
              <BannerTitle>Our Cycles</BannerTitle>
              <BannerSubtitle>
                Discover our range of high-quality bicycles designed for urban commuting and adventure riding
              </BannerSubtitle>
            </BannerContent>
          </BannerSection>
          
          <CyclesContainer>
            <CyclesHeader>
              <CyclesTitle>Choose Your Ride</CyclesTitle>
              <CyclesSubtitle>
                Select from our premium collection of bicycles, each designed for specific riding needs and preferences
              </CyclesSubtitle>
            </CyclesHeader>
            
            <CyclesGrid>
              {cycles.map((cycle) => (
                <CycleCard key={cycle._id}>
                  <CycleImage>
                    {cycle.images && cycle.images.length > 0 ? (
                      <img 
                        src={urlFor(cycle.images[0]).url()} 
                        alt={cycle.name} 
                      />
                    ) : (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: '#666',
                        fontSize: '14px',
                        textAlign: 'center',
                        padding: '20px'
                      }}>
                        <i className="fas fa-bicycle" style={{ fontSize: '3rem', marginBottom: '10px', color: '#00a652' }}></i>
                        <div style={{ fontSize: '12px', opacity: 0.7 }}>
                          Image Coming Soon
                        </div>
                      </div>
                    )}
                  </CycleImage>
                  <CycleInfo>
                    <CycleName>{cycle.name}</CycleName>
                    <CyclePrice>
                      {cycle.discountPrice ? (
                        <>
                          <span style={{ textDecoration: 'line-through', opacity: 0.7, marginRight: '0.5rem' }}>₹{cycle.price}</span>
                          <span>₹{cycle.discountPrice}</span>
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
                  </CycleInfo>
                </CycleCard>
              ))}
            </CyclesGrid>
          </CyclesContainer>
        </Container>
      </CyclesSection>
    </>
  )
}

export default Cycles
