import React from 'react'
import styled from 'styled-components'
import { ProductFeature } from '../lib/sanity'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const ProductFeaturesSection = styled.section`
  padding: 80px 0;
  background: #000000;

  @media (max-width: 768px) {
    padding: 60px 0;
  }

  @media (max-width: 480px) {
    padding: 40px 0;
  }
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

const FeatureCard = styled.div`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255,255,255,0.2);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #00a652, #008040);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
    margin: 0 auto 1rem;
  }

  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    margin: 0 auto 0.75rem;
  }

  i {
    font-size: 2rem;
    color: #fff;

    @media (max-width: 768px) {
      font-size: 1.8rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }
`

const FeatureDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #cccccc;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }
`

interface ProductFeaturesProps {
  features: ProductFeature[]
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  const sortedFeatures = [...features].sort((a, b) => a.order - b.order)

  return (
    <ProductFeaturesSection>
      <Container>
        <SectionTitle>Discover the RAPTRIC Bicycles</SectionTitle>
        <FeaturesGrid>
          {sortedFeatures.map((feature) => (
            <FeatureCard key={feature._id}>
              <FeatureIcon>
                <i className={feature.icon}></i>
              </FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </ProductFeaturesSection>
  )
}

export default ProductFeatures
