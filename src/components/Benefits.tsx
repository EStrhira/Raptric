import React from 'react'
import styled from 'styled-components'
import { Benefit } from '../lib/sanity'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const BenefitsSection = styled.section`
  padding: 80px 0;
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const BenefitCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  border-left: 4px solid #00a652;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(5px);
  }
`

const BenefitTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #00a652;
`

const BenefitDescription = styled.p`
  color: #666;
  line-height: 1.6;
`

interface BenefitsProps {
  benefits: Benefit[]
}

const Benefits: React.FC<BenefitsProps> = ({ benefits }) => {
  const sortedBenefits = [...benefits].sort((a, b) => a.order - b.order)

  return (
    <BenefitsSection>
      <Container>
        <SectionTitle>Why Choose RAPTRIC eBikes?</SectionTitle>
        <BenefitsGrid>
          {sortedBenefits.map((benefit) => (
            <BenefitCard key={benefit._id}>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </BenefitsSection>
  )
}

export default Benefits
