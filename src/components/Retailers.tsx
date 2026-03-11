import React from 'react'
import styled from 'styled-components'
import { Retailer } from '../lib/sanity'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const RetailersSection = styled.section`
  padding: 80px 0;
  background: #f8f9fa;
`

const RetailersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const RetailerCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`

const RetailerName = styled.h3`
  color: #00a652;
  margin-bottom: 0.5rem;
`

const RetailerInfo = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`

const RetailerContact = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #666;
  font-size: 0.9rem;

  i {
    color: #00a652;
    width: 16px;
  }
`

interface RetailersProps {
  retailers: Retailer[]
}

const Retailers: React.FC<RetailersProps> = ({ retailers }) => {
  const sortedRetailers = [...retailers].sort((a, b) => a.order - b.order)

  return (
    <RetailersSection>
      <Container>
        <SectionTitle>Our Retailers Network</SectionTitle>
        <RetailersGrid>
          {sortedRetailers.map((retailer) => (
            <RetailerCard key={retailer._id}>
              <RetailerName>{retailer.name}</RetailerName>
              <RetailerInfo>{retailer.city}</RetailerInfo>
              <RetailerInfo>{retailer.address}</RetailerInfo>
              <RetailerContact>
                <ContactItem>
                  <i className="fas fa-phone"></i>
                  <span>{retailer.phone}</span>
                </ContactItem>
                {retailer.email && (
                  <ContactItem>
                    <i className="fas fa-envelope"></i>
                    <span>{retailer.email}</span>
                  </ContactItem>
                )}
              </RetailerContact>
            </RetailerCard>
          ))}
        </RetailersGrid>
      </Container>
    </RetailersSection>
  )
}

export default Retailers
