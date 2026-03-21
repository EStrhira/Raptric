import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { client, Accessory, urlFor } from '../lib/sanity'
import { Link } from 'react-router-dom'
import { addToCart } from '../utils/cart'
import { useScrollToTop } from '../hooks/useScrollToTop'

const AccessoryDetailSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
`

const DetailBanner = styled.div`
  background: linear-gradient(135deg, #00a652 0%, #008040 100%);
  color: #ffffff;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 3rem;
`

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`

const BannerText = styled.div`
  flex: 1;
`

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const BannerSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
`

const BannerImage = styled.div`
  font-size: 3rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const BackButton = styled.button`
  background: #00a652;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }
`

const AccessoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
`

const AccessoryHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const AccessoryImageSection = styled.div`
  flex: 0 0 60%;
  position: relative;
`

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(0, 166, 82, 0.3);
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    height: 350px;
  }
  
  @media (max-width: 480px) {
    height: 250px;
  }
`

const CarouselSlide = styled.div<{ isActive?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => props.isActive ? 1 : 0};
  transform: ${props => props.isActive ? 'translateX(0)' : 'translateX(100%)'};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(1.0) contrast(1.0);
    transition: filter 0.3s ease;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%);
    pointer-events: none;
    z-index: 1;
  }
`

const CarouselButton = styled.button<{ direction?: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 3;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(0, 166, 82, 0.8);
    transform: translateY(-50%) scale(1.1);
    border-color: rgba(0, 166, 82, 0.5);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    
    &:hover {
      background: rgba(0, 0, 0, 0.7);
      transform: translateY(-50%);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
    ${props => props.direction === 'prev' ? 'left: 0.5rem;' : 'right: 0.5rem;'}
  }
`

const CarouselIndicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 2;
`

const Indicator = styled.button<{ isActive?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.isActive ? '#00a652' : 'rgba(255, 255, 255, 0.3)'};
  border: 1px solid rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? '#00a652' : 'rgba(255, 255, 255, 0.5)'};
    transform: scale(1.2);
  }
`

const ImageCounter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
`

const AccessoryInfo = styled.div`
  h1 {
    color: #00a652;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .price {
    font-size: 1.5rem;
    color: #ffffff;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .description {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .features {
    margin-bottom: 2rem;
  }

  .feature-item {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
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
  }

  .compatibility {
    margin-bottom: 2rem;
  }

  .compatibility h3 {
    color: #00a652;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .compatibility-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .compatibility-item {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .category {
    background: rgba(0, 166, 82, 0.1);
    color: #00a652;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 2rem;
    display: inline-block;
  }

  .buy-button {
    background: #00a652;
    color: #ffffff;
    padding: 1rem 2rem;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      background: #008040;
      transform: translateY(-2px);
    }
  }
`

const RelatedSection = styled.section`
  padding: 60px 0;
  background: #000000;
`

const RelatedTitle = styled.h2`
  color: #00a652;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`

const RelatedGrid = styled.div`
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

const RelatedCard = styled.div`
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

const RelatedImage = styled.div`
  width: 100%;
  height: 300px;
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

const RelatedName = styled.h3`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const RelatedPrice = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`

const RelatedButton = styled(Link)`
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

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }
`

const BuyButton = styled.button`
  background: ${props => props.disabled ? 'rgba(255, 255, 255, 0.1)' : '#00a652'};
  color: ${props => props.disabled ? 'rgba(255, 255, 255, 0.5)' : '#ffffff'};
  padding: 1rem 2rem;
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};

  &:hover:not(:disabled) {
    background: #008040;
    transform: translateY(-2px);
  }
`

const AccessoryDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [accessory, setAccessory] = useState<Accessory | null>(null)
  const [relatedAccessories, setRelatedAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [addedToCart, setAddedToCart] = useState(false)

  // Scroll to top when page loads or navigates
  useScrollToTop()

  useEffect(() => {
    const fetchAccessoryAndRelated = async () => {
      try {
        const [accessoryData, relatedData] = await Promise.all([
          (client as any).fetch(`*[_type == "accessory" && slug.current == $slug][0]{
            _id,
            name,
            slug,
            price,
            description,
            images,
            features,
            compatibility,
            inStock,
            featured
          }`, { slug }),
          (client as any).fetch('*[_type == "accessory"] | order(featured desc, name asc) { _id, name, slug, price, description, images, features, compatibility, inStock, featured }[0...5]')
        ])
        
        setAccessory(accessoryData)
        setRelatedAccessories(relatedData.filter((item: Accessory) => item._id !== accessoryData?._id))
      } catch (err) {
        setError('Failed to load accessory details')
        console.error('Error fetching accessory:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAccessoryAndRelated()
  }, [slug])

  const getCurrentImage = () => {
    if (accessory?.images && accessory.images.length > 0) {
      return urlFor(accessory.images[currentImageIndex]).url()
    }
    return null
  }

  const goToPreviousImage = () => {
    if (accessory?.images && accessory.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? accessory.images!.length - 1 : prev - 1))
    }
  }

  const goToNextImage = () => {
    if (accessory?.images && accessory.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === accessory.images!.length - 1 ? 0 : prev + 1))
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const handleAddToCart = () => {
    if (!accessory) return
    
    const cartItem = {
      id: accessory._id,
      name: accessory.name,
      category: 'Accessory',
      price: accessory.price,
      image: accessory.images && accessory.images.length > 0 ? urlFor(accessory.images[0]).url() : undefined
    }
    
    addToCart(cartItem)
    setAddedToCart(true)
    
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  if (loading) {
    return (
      <AccessoryDetailSection>
        <Container>
          <div style={{ color: '#ffffff', fontSize: '1.5rem', textAlign: 'center', padding: '3rem' }}>
            Loading accessory details...
          </div>
        </Container>
      </AccessoryDetailSection>
    )
  }

  if (error || !accessory) {
    return (
      <AccessoryDetailSection>
        <Container>
          <BackButton onClick={() => navigate('/accessories')}>
            <i className="fas fa-arrow-left"></i>
            Back to Accessories
          </BackButton>
          <div style={{ color: '#ff4444', fontSize: '1.2rem', textAlign: 'center', padding: '3rem' }}>
            {error || 'Accessory not found'}
          </div>
        </Container>
      </AccessoryDetailSection>
    )
  }

  return (
    <AccessoryDetailSection>
      <DetailBanner>
        <Container>
          <BannerContent>
            <BannerText>
              <BannerTitle>🛍️ Premium Accessory</BannerTitle>
              <BannerSubtitle>Quality accessories to enhance your ride</BannerSubtitle>
            </BannerText>
            <BannerImage>
              <i className="fas fa-tools"></i>
            </BannerImage>
          </BannerContent>
        </Container>
      </DetailBanner>
      
      <Container>
        <BackButton onClick={() => navigate('/accessories')}>
          <i className="fas fa-arrow-left"></i>
          Back to Accessories
        </BackButton>

        <AccessoryContainer>
          <AccessoryHeader>
            <AccessoryImageSection>
              <CarouselContainer>
                {accessory.images && accessory.images.length > 0 ? (
                  <>
                    <CarouselSlide isActive={true}>
                      <img 
                        src={getCurrentImage() || ''} 
                        alt={accessory.name} 
                      />
                    </CarouselSlide>
                    
                    {accessory.images.length > 1 && (
                      <>
                        <CarouselButton direction="prev" onClick={(e) => { e.preventDefault(); goToPreviousImage(); }}>
                          <i className="fas fa-chevron-left"></i>
                        </CarouselButton>
                        <CarouselButton direction="next" onClick={(e) => { e.preventDefault(); goToNextImage(); }}>
                          <i className="fas fa-chevron-right"></i>
                        </CarouselButton>
                        
                        <CarouselIndicators>
                          {accessory.images.map((_, index) => (
                            <Indicator
                              key={index}
                              isActive={index === currentImageIndex}
                              onClick={(e) => { e.preventDefault(); goToImage(index); }}
                            />
                          ))}
                        </CarouselIndicators>
                        
                        <ImageCounter>
                          {currentImageIndex + 1} / {accessory.images.length}
                        </ImageCounter>
                      </>
                    )}
                  </>
                ) : (
                  <div className="no-image">
                    <i className="fas fa-shopping-bag"></i>
                  </div>
                )}
              </CarouselContainer>
            </AccessoryImageSection>

            <AccessoryInfo>
              <h1>{accessory.name}</h1>
              <div className="price">₹{accessory.price}</div>
              <div className="description">
                {accessory.description?.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {accessory.features && accessory.features.length > 0 && (
                <div className="features">
                  {accessory.features.map((featureItem, index) => (
                    <div key={index} className="feature-item">
                      {featureItem.feature}
                    </div>
                  ))}
                </div>
              )}

              {accessory.compatibility && accessory.compatibility.length > 0 && (
                <div className="compatibility">
                  <h3>🔧 Compatible Models</h3>
                  <div className="compatibility-list">
                    {accessory.compatibility.map((item, index) => (
                      <span key={index} className="compatibility-item">{item.model}</span>
                    ))}
                  </div>
                </div>
              )}

              <BuyButton onClick={handleAddToCart} disabled={addedToCart}>
                <i className="fas fa-shopping-cart"></i>
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </BuyButton>
            </AccessoryInfo>
          </AccessoryHeader>
        </AccessoryContainer>
      </Container>

      {relatedAccessories.length > 0 && (
        <Container>
          <RelatedSection>
            <RelatedTitle>🛍️ Related Accessories</RelatedTitle>
            <RelatedGrid>
              {relatedAccessories.map((relatedAccessory, index) => (
                <RelatedCard key={index}>
                  <RelatedImage>
                    {relatedAccessory.images && relatedAccessory.images.length > 0 ? (
                      (() => {
                        try {
                          return <img src={urlFor(relatedAccessory.images[0]).height(300).url()} alt={relatedAccessory.name} />
                        } catch (error) {
                          console.warn('Related image error:', error)
                          return <img src={relatedAccessory.images[0].url} alt={relatedAccessory.name} />
                        }
                      })()
                    ) : (
                      <i className="fas fa-shopping-bag"></i>
                    )}
                  </RelatedImage>
                  <RelatedName>{relatedAccessory.name}</RelatedName>
                  <RelatedPrice>₹{relatedAccessory.price}</RelatedPrice>
                  <RelatedButton to={`/accessory/${relatedAccessory.slug.current}`}>
                    <i className="fas fa-arrow-right"></i>
                    Read More
                  </RelatedButton>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>
        </Container>
      )}
    </AccessoryDetailSection>
  )
}

export default AccessoryDetail
