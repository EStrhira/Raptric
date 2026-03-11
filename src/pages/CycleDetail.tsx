import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { client, Cycle, urlFor } from '../lib/sanity'
import { Link } from 'react-router-dom'
import { addToCart } from '../utils/cart'
import { useScrollToTop } from '../hooks/useScrollToTop'

const CycleDetailSection = styled.section`
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

const CycleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
`

const CycleHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const CycleImageSection = styled.div`
  img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    object-fit: cover;
  }
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
    object-fit: cover;
    filter: brightness(1.0) contrast(1.05);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      filter: brightness(1.05) contrast(1.1);
    }
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
  z-index: 3;
  padding: 0.75rem 1.25rem;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 25px;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const Indicator = styled.button<{ isActive?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.isActive ? '#00a652' : 'rgba(255, 255, 255, 0.4)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.isActive ? '#00a652' : 'rgba(255, 255, 255, 0.6)'};
    transform: scale(1.2);
  }
`

const ImageCounter = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  font-size: 0.85rem;
  font-weight: 600;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: '📷';
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.75rem;
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

const SelectedColorDisplay = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 8px;
  color: #00a652;
  font-size: 0.9rem;
  text-align: center;
`

const BuyButton = styled.button<{ disabled?: boolean }>`
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

const CycleInfo = styled.div`
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

  .original-price {
    text-decoration: line-through;
    opacity: 0.7;
    margin-right: 0.5rem;
  }

  .discount-price {
    color: #00a652;
  }

  .regular-price {
    color: #ffffff;
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
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
      color: #00a652;
      font-weight: bold;
    }
  }

  .colors {
    margin-bottom: 2rem;
  }

  .colors h3 {
    color: #00a652;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .colors-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .color-chip {
    background: #00a652;
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .specifications {
    margin-bottom: 2rem;
  }

  .specifications h3 {
    color: #00a652;
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .specifications p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.6;
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

const CycleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [cycle, setCycle] = useState<Cycle | null>(null)
  const [relatedCycles, setRelatedCycles] = useState<Cycle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [addedToCart, setAddedToCart] = useState(false)

  // Scroll to top when page loads or navigates
  useScrollToTop()

  useEffect(() => {
    const fetchCycleAndRelated = async () => {
      try {
        const [cycleData, relatedData] = await Promise.all([
          (client as any).fetch(`*[_type == "cycle" && slug.current == $slug][0]{
            _id,
            name,
            slug,
            price,
            discountPrice,
            description,
            shortDescription,
            image,
            images,
            colors,
            specifications,
            inStock,
            featured
          }`, { slug }),
          (client as any).fetch('*[_type == "cycle"] | order(featured desc, name asc) { _id, name, slug, price, discountPrice, shortDescription, image, images, colors, inStock, featured }[0...5]')
        ])
        
        setCycle(cycleData)
        setRelatedCycles(relatedData.filter((item: Cycle) => item._id !== cycleData?._id))
        setCurrentImageIndex(0)
      } catch (err) {
        setError('Failed to load cycle details')
        console.error('Error fetching cycle:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCycleAndRelated()
  }, [slug])

  const goToPreviousImage = () => {
    if (cycle?.images && cycle.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === 0 ? cycle.images!.length - 1 : prev - 1))
    }
  }

  const goToNextImage = () => {
    if (cycle?.images && cycle.images.length > 0) {
      setCurrentImageIndex((prev) => (prev === cycle.images!.length - 1 ? 0 : prev + 1))
    }
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  const getCurrentImage = () => {
    if (cycle?.images && cycle.images.length > 0) {
      return urlFor(cycle.images[currentImageIndex]).url()
    }
    return ''
  }

  const handleAddToCart = () => {
    if (!cycle) return
    
    // Check if color selection is required and not selected
    if (cycle.colors && cycle.colors.length > 0 && !selectedColor) {
      alert('Please select a color before adding to cart')
      return
    }
    
    const cartItem = {
      id: cycle._id,
      name: cycle.name,
      category: 'Cycle',
      price: cycle.discountPrice || cycle.price,
      image: cycle.images && cycle.images.length > 0 ? urlFor(cycle.images[0]).url() : undefined,
      selectedColor: selectedColor || undefined
    }
    
    addToCart(cartItem)
    setAddedToCart(true)
    
    setTimeout(() => {
      setAddedToCart(false)
    }, 3000)
  }

  if (loading) {
    return (
      <CycleDetailSection>
        <Container>
          <div style={{ color: '#ffffff', fontSize: '1.5rem', textAlign: 'center', padding: '3rem' }}>
            Loading cycle details...
          </div>
        </Container>
      </CycleDetailSection>
    )
  }

  if (error || !cycle) {
    return (
      <CycleDetailSection>
        <Container>
          <BackButton onClick={() => navigate('/cycles')}>
            <i className="fas fa-arrow-left"></i>
            Back to Cycles
          </BackButton>
          <div style={{ color: '#ff4444', fontSize: '1.2rem', textAlign: 'center', padding: '3rem' }}>
            {error || 'Cycle not found'}
          </div>
        </Container>
      </CycleDetailSection>
    )
  }

  return (
    <CycleDetailSection>
      <DetailBanner>
        <Container>
          <BannerContent>
            <BannerText>
              <BannerTitle>🚴 Premium Cycle</BannerTitle>
              <BannerSubtitle>High-performance bicycles for every rider</BannerSubtitle>
            </BannerText>
            <BannerImage>
              <i className="fas fa-bicycle"></i>
            </BannerImage>
          </BannerContent>
        </Container>
      </DetailBanner>
      
      <Container>
        <BackButton onClick={() => navigate('/cycles')}>
          <i className="fas fa-arrow-left"></i>
          Back to Cycles
        </BackButton>

        <CycleContainer>
          <CycleHeader>
            <CycleImageSection>
              <CarouselContainer>
                {cycle?.images && cycle.images.length > 0 ? (
                  <>
                    <CarouselSlide isActive={true}>
                      <img 
                        src={getCurrentImage() || ''} 
                        alt={cycle.name || 'Cycle image'} 
                      />
                    </CarouselSlide>
                    
                    {cycle.images.length > 1 && (
                      <>
                        <CarouselButton direction="prev" onClick={goToPreviousImage}>
                          <i className="fas fa-chevron-left"></i>
                        </CarouselButton>
                        <CarouselButton direction="next" onClick={goToNextImage}>
                          <i className="fas fa-chevron-right"></i>
                        </CarouselButton>
                        
                        <CarouselIndicators>
                          {cycle.images.map((_, index) => (
                            <Indicator
                              key={index}
                              isActive={index === currentImageIndex}
                              onClick={() => goToImage(index)}
                            />
                          ))}
                        </CarouselIndicators>
                        
                        <ImageCounter>
                          {currentImageIndex + 1} / {cycle.images.length}
                        </ImageCounter>
                      </>
                    )}
                  </>
                ) : (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100%',
                    color: '#666',
                    fontSize: '16px'
                  }}>
                    No images available
                  </div>
                )}
              </CarouselContainer>
            </CycleImageSection>

            <CycleInfo>
              <h1>{cycle.name}</h1>
              <div className="price">
                {cycle.discountPrice ? (
                  <>
                    <span className="original-price">{cycle.price}</span>
                    <span className="discount-price">{cycle.discountPrice}</span>
                  </>
                ) : (
                  <span className="regular-price">{cycle.price}</span>
                )}
              </div>
              <div className="description">{cycle.description}</div>

              {cycle.specifications && (
                <div className="specifications">
                  <h3>📋 Specifications</h3>
                  <p>{cycle.specifications}</p>
                </div>
              )}

              {selectedColor && (
                <SelectedColorDisplay>
                  Selected Color: {selectedColor}
                </SelectedColorDisplay>
              )}

              {cycle.colors && cycle.colors.length > 0 && (
                <div className="colors">
                  <h3>🎨 Available Colors</h3>
                  <div className="colors-list">
                    {cycle.colors.map((color, index) => (
                      <span 
                        key={index} 
                        className="color-chip"
                        onClick={() => setSelectedColor(color)}
                        style={{
                          cursor: 'pointer',
                          backgroundColor: selectedColor === color ? '#00a652' : 'rgba(255, 255, 255, 0.1)',
                          border: selectedColor === color ? '2px solid #00a652' : '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <BuyButton onClick={handleAddToCart} disabled={addedToCart}>
                <i className="fas fa-shopping-cart"></i>
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </BuyButton>
            </CycleInfo>
          </CycleHeader>

        </CycleContainer>
      </Container>

      {relatedCycles.length > 0 && (
        <Container>
          <RelatedSection>
            <RelatedTitle>🚴 Related Cycles</RelatedTitle>
            <RelatedGrid>
              {relatedCycles.map((relatedCycle, index) => (
                <RelatedCard key={index}>
                  <RelatedImage>
                    {relatedCycle.images && relatedCycle.images.length > 0 ? (
                      <img src={urlFor(relatedCycle.images[0]).height(300).url()} alt={relatedCycle.name} />
                    ) : (
                      <i className="fas fa-bicycle"></i>
                    )}
                  </RelatedImage>
                  <RelatedName>{relatedCycle.name}</RelatedName>
                  <RelatedPrice>
                    {relatedCycle.discountPrice ? (
                      <>
                        <span style={{ textDecoration: 'line-through', opacity: 0.7, marginRight: '0.5rem' }}>{relatedCycle.price}</span>
                        <span style={{ color: '#00a652' }}>{relatedCycle.discountPrice}</span>
                      </>
                    ) : (
                      relatedCycle.price
                    )}
                  </RelatedPrice>
                  <RelatedButton to={`/cycle/${relatedCycle.slug.current}`}>
                    <i className="fas fa-arrow-right"></i>
                    Read More
                  </RelatedButton>
                </RelatedCard>
              ))}
            </RelatedGrid>
          </RelatedSection>
        </Container>
      )}
    </CycleDetailSection>
  )
}

export default CycleDetail
