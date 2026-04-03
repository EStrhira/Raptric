import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'

const FooterSection = styled.footer`
  background: #1a1a1a;
  color: #fff;
  padding: 50px 0 20px;

  @media (max-width: 768px) {
    padding: 40px 0 15px;
  }

  @media (max-width: 480px) {
    padding: 30px 0 10px;
  }
`

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1.5rem;
    margin-bottom: 1rem;
  }
`

const FooterSectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #00a652;
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`

const FooterSectionSubtitle = styled.h4`
  margin-bottom: 1rem;
  color: #00a652;
  text-align: left;
  font-size: 1rem;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.5rem;
  }
`

const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 0.75rem;
  }
`

const FooterList = styled.ul`
  list-style: none;
  text-align: left;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`

const FooterListItem = styled.li`
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    margin-bottom: 0.3rem;
  }
`

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    color: #00a652;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
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

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }

  i {
    font-size: 1.2rem;

    @media (max-width: 768px) {
      font-size: 1.1rem;
    }

    @media (max-width: 480px) {
      font-size: 1rem;
    }
  }
`

const FooterBottom = styled.div`
  border-top: 1px solid #333;
  padding-top: 2rem;
  text-align: center;
  color: #ccc;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding-top: 1.5rem;
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    padding-top: 1rem;
    font-size: 0.8rem;
  }
`

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <Container>
        <FooterContent>
          <div>
            <FooterSectionTitle>eSthira Mobility</FooterSectionTitle>
            <FooterText>
              Mobility Built With Passion <br /> <strong>Vision</strong>: To provide world class personal mobility experience.
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
              <FooterListItem><FooterLink to="/ebikes">eBikes</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/cycles">mBikes</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/accessories">Accessories</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/service">Service Plans</FooterLink></FooterListItem>
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
              <FooterListItem><FooterLink to="/warranty">Warranty</FooterLink></FooterListItem>
              <FooterListItem><FooterLink to="/warrantyactivation">Warranty Activation</FooterLink></FooterListItem>
            </FooterList>
          </div>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2026 eSthira Mobility Pvt. Ltd.. All Rights Reserved. | Mobility Built With Passion</p>
        </FooterBottom>
      </Container>
    </FooterSection>
  )
}

export default Footer
