import React from 'react'
import styled from 'styled-components'
import { ProductFeature } from '../lib/sanity'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const ProductFeaturesSection = styled.section`
  padding: 80px 0;
  background: #000000;
`

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

  i {
    font-size: 2rem;
    color: #fff;
  }
`

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #ffffff;
`

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
`

interface ProductFeaturesProps {
  features: ProductFeature[]
}

const ProductFeatures: React.FC<ProductFeaturesProps> = ({ features }) => {
  const sortedFeatures = [...features].sort((a, b) => a.order - b.order)

  return (
    <ProductFeaturesSection>
      <Container>
        <SectionTitle>Discover the eSthira Raptric</SectionTitle>
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
