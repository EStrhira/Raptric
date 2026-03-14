import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'

const FooterSection = styled.footer`
  background: #1a1a1a;
  color: #fff;
  padding: 50px 0 20px;
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`

const FooterSectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #00a652;
`

const FooterSectionSubtitle = styled.h4`
  margin-bottom: 1rem;
  color: #00a652;
`

const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const FooterList = styled.ul`
  list-style: none;
`

const FooterListItem = styled.li`
  margin-bottom: 0.5rem;
`

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #00a652;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background: #00a652;
  }

  i {
    font-size: 1.2rem;
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 2rem;
  text-align: center;
  color: #ccc;
`

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <div>
            <FooterSectionTitle>eSthira Mobility</FooterSectionTitle>
            <FooterText>
              Leading the electric revolution in sustainable mobility. Experience the future of commuting with our premium eBikes.
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://instagram.com/esthiramobility" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@eSthiraMobility" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </SocialLink>
            </SocialLinks>
          </div>
          
          <div>
            <FooterSectionSubtitle>Quick Links</FooterSectionSubtitle>
            <FooterList>
              <FooterListItem><FooterLink to="/why-ebikes">Why eBikes</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/safety-tips">Safety Tips</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/FAQ">FAQ</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/manual">Manual</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/blog">Blog</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/contact">Contact Us</FooterLink></FooterListItem>
            </FooterList>
          </div>
          
          <div>
            <FooterSectionSubtitle>Products</FooterSectionSubtitle>
            <FooterList>
              <FooterListItem><FooterLink to="/ebikes">Ebikes</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/accessories">Accessories</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/service">Service Plans</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/warranty">Warranty</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="#warranty">Warranty Activation</FooterLink></FooterListItem>
            </FooterList>
          </div>
          
          <div>
            <FooterSectionSubtitle>Legal</FooterSectionSubtitle>
            <FooterList>
              <FooterListItem><FooterLink to="/pricing-policy">Pricing Policy</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/privacy-policy">Privacy Policy</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/terms-conditions">Terms & Conditions</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/cancellation-refund-replacement">Cancellation, Refund & Replacement</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/shipping-delivery">Shipping & Delivery Policy</FooterLink></FooterListItem>
            </FooterList>
          </div>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2024 eSthira Mobility. All rights reserved. | Powered by Sustainable Energy</p>
        </FooterBottom>
      </Container>
    </FooterSection>
  )
}

export default Footer
