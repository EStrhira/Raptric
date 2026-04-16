import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import SEO from '../components/SEO'
import BUSINESS_INFO from '../constants/businessInfo'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

interface ContactResponse {
  success: boolean
  message?: string
  error?: string
}

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
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

const ContactHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 1.5rem;
  }
`

const ContactTitle = styled.h2`
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

const ContactSubtitle = styled.p`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
  margin-top: 3rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
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

const ContactCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.2rem;
  border-left: 4px solid #00a652;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 1200px) {
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`

const ContactIcon = styled.div`
  font-size: 2rem;
  color: #00a652;
  margin-bottom: 0.8rem;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 0.75rem;
  }
`

const ContactName = styled.h3`
  color: #ffffff;
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0 0 0.6rem 0;
  text-align: center;

  @media (max-width: 1200px) {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`

const ContactInfo = styled.div`
  color: #cccccc;
  line-height: 1.4;
  text-align: center;
  font-size: 0.75rem;

  @media (max-width: 1200px) {
    font-size: 0.85rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

const ContactLink = styled.a`
  color: #00a652;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #008a45;
    text-decoration: underline;
  }
`

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 2rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    margin-top: 1.5rem;
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`

const FormLabel = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 480px) {
    padding: 0.6rem;
    font-size: 0.9rem;
    min-height: 100px;
  }
`

const SubmitButton = styled.button<{ $disabled?: boolean }>`
  background: ${props => props.$disabled ? '#666' : '#00a652'};
  color: #ffffff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${props => props.$disabled ? '#666' : '#008a45'};
    transform: ${props => props.$disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$disabled ? 'none' : '0 4px 12px rgba(0, 166, 82, 0.3)'};
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1.5rem;
    font-size: 0.9rem;
  }
`

const ResponseMessage = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 500;

  ${props => props.$type === 'success' ? `
    background: rgba(0, 166, 82, 0.1);
    color: #00a652;
    border: 1px solid #00a652;
  ` : `
    background: rgba(220, 53, 69, 0.1);
    color: #dc3545;
    border: 1px solid #dc3545;
  `}

  @media (max-width: 480px) {
    padding: 0.75rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  useScrollToTop()

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<ContactResponse | null>(null)

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setResponse({ success: false, error: 'Name is required' })
      return false
    }
    if (!formData.email.trim()) {
      setResponse({ success: false, error: 'Email is required' })
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setResponse({ success: false, error: 'Please enter a valid email address' })
      return false
    }
    if (!formData.message.trim()) {
      setResponse({ success: false, error: 'Message is required' })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    setResponse(null)

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      const data: ContactResponse = await response.json()
      
      if (response.ok && data.success) {
        setResponse({ success: true, message: 'Your message has been sent successfully!' })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setResponse({ success: false, error: data.error || 'Failed to send message' })
      }
    } catch (error) {
      setResponse({ success: false, error: 'Network error. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <SEO
        title="Contact Us - eSthira Electric Bicycles & Cycles"
        description="Get in touch with eSthira for electric bicycle inquiries, support, and feedback. Visit our Bangalore store or contact us via phone and email."
        keywords="contact e-bike, electric bicycle support, e-bike service Bangalore, electric cycle contact, eSthira phone, electric bike repair, e-bike warranty, e-bike test drive, Bangalore e-bike store"
        canonical="https://esthira.com/contact"
        ogImage="/images/og-contact.jpg"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact eSthira",
          "url": "https://esthira.com/contact",
          "description": "Contact eSthira for electric bicycle inquiries, support, and feedback in Bangalore.",
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
            }
          }
        }}
      />
      <ContactSection>
        <Container>
          <BannerSection>
            <BannerContent>
              <BannerIcon>
                <i className="fas fa-envelope"></i>
              </BannerIcon>
              <BannerTitle>Contact Us</BannerTitle>
              <BannerSubtitle>
                Get in touch with us for any inquiries, support, or feedback
              </BannerSubtitle>
            </BannerContent>
          </BannerSection>
          
          <ContactContainer>
            <ContactHeader>
              <ContactTitle>Get In Touch</ContactTitle>
              <ContactSubtitle>
                We're here to help and answer any questions you might have
              </ContactSubtitle>
            </ContactHeader>
            
            <ContactGrid>
              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactName>Address</ContactName>
                <ContactInfo>
                  {BUSINESS_INFO.address.line1}<br />
                  {BUSINESS_INFO.address.line2}<br />
                  {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.pincode}
                </ContactInfo>
              </ContactCard>
              
              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-phone"></i>
                </ContactIcon>
                <ContactName>Phone</ContactName>
                <ContactInfo>
                  <ContactLink href={`tel:${BUSINESS_INFO.contact.phone}`}>
                    {BUSINESS_INFO.contact.phoneFormatted}
                  </ContactLink>
                </ContactInfo>
              </ContactCard>
              
              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-envelope"></i>
                </ContactIcon>
                <ContactName>Email</ContactName>
                <ContactInfo>
                  <ContactLink href={`mailto:${BUSINESS_INFO.contact.email}`}>
                    {BUSINESS_INFO.contact.email}
                  </ContactLink>
                </ContactInfo>
              </ContactCard>
              
              <ContactCard>
                <ContactIcon>
                  <i className="fas fa-map"></i>
                </ContactIcon>
                <ContactName>Location</ContactName>
                <ContactInfo>
                  <ContactLink href="https://maps.app.goo.gl/gweZK6bb3bZzGMaG7" target="_blank" rel="noopener noreferrer">
                    View on Google Maps
                  </ContactLink>
                </ContactInfo>
              </ContactCard>
            </ContactGrid>
            
            <ContactForm onSubmit={handleSubmit}>
              {response && (
                <ResponseMessage $type={response.success ? 'success' : 'error'}>
                  {response.success ? response.message : response.error}
                </ResponseMessage>
              )}
              
              <FormGroup>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <FormInput
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Subject"
                  disabled={loading}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="message">Message</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  disabled={loading}
                />
              </FormGroup>
              
              <SubmitButton type="submit" $disabled={loading}>
                {loading && <LoadingSpinner />}
                {loading ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          </ContactContainer>
        </Container>
      </ContactSection>
    </>
  )
}

export default Contact
