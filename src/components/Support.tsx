import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const SupportSection = styled.section`
  padding: 80px 0;
`

const SupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const SupportCard = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`

const SupportIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #00a652, #008040);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  i {
    font-size: 1.8rem;
    color: #fff;
  }
`

const SupportTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`

const SupportDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`

const SupportLink = styled(Link)`
  color: #00a652;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;

  &:hover {
    color: #008040;
  }
`

const Support: React.FC = () => {
  const supportItems = [
    {
      icon: 'fas fa-question-circle',
      title: 'FAQ',
      description: 'Find answers to commonly asked questions about eBikes and our services.',
      link: '/faq'
    },
    {
      icon: 'fas fa-tools',
      title: 'Service',
      description: 'Expert service and maintenance support for your eSthira eBike.',
      link: '/service'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safety Tips',
      description: 'Important safety guidelines and best practices for eBike riding.',
      link: '/safety-tips'
    },
    {
      icon: 'fas fa-book',
      title: 'Manual',
      description: 'Download the complete user manual for your eSthira Raptric.',
      link: '/manual'
    }
  ]

  return (
    <SupportSection>
      <Container>
        <SectionTitle>Support Center</SectionTitle>
        <SupportGrid>
          {supportItems.map((item, index) => (
            <SupportCard key={index}>
              <SupportIcon>
                <i className={item.icon}></i>
              </SupportIcon>
              <SupportTitle>{item.title}</SupportTitle>
              <SupportDescription>{item.description}</SupportDescription>
              <SupportLink to={item.link}>Learn More →</SupportLink>
            </SupportCard>
          ))}
        </SupportGrid>
      </Container>
    </SupportSection>
  )
}

export default Support
