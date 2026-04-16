import React, { useState } from 'react'
import styled from 'styled-components'
import { ContactInfo } from '../lib/sanity'
import { Container, SectionTitle } from '../styles/GlobalStyles'

const ContactSection = styled.section`
  padding: 80px 0;
`

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ContactInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #00a652, #008040);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  i {
    color: #fff;
    font-size: 1.2rem;
  }
`

const ContactDetails = styled.div`
  h3 {
    color: #ffffff;
    margin-bottom: 0.5rem;
  }

  p {
    color: #ffffff;
    line-height: 1.6;
  }

  a {
    color: #00a652;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ContactForm = styled.form`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
`

const FormInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
  }
`

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: #00a652;
  }
`

const SubmitButton = styled.button`
  background: #00a652;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #008040;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`

const Notification = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 100px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: white;
  font-weight: 500;
  z-index: 10000;
  transform: translateX(${props => props.$type ? '0' : '100%'});
  transition: transform 0.3s ease;
  max-width: 300px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  background: ${props => {
    switch (props.$type) {
      case 'success':
        return '#00a652';
      case 'error':
        return '#e74c3c';
      default:
        return '#3498db';
    }
  }};
`

interface ContactProps {
  contactInfo: ContactInfo
}

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

const Contact: React.FC<ContactProps> = ({ contactInfo }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setNotification({ type: 'error', message: 'Name is required' })
      setTimeout(() => setNotification(null), 5000)
      return false
    }
    if (!formData.email.trim()) {
      setNotification({ type: 'error', message: 'Email is required' })
      setTimeout(() => setNotification(null), 5000)
      return false
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setNotification({ type: 'error', message: 'Please enter a valid email address' })
      setTimeout(() => setNotification(null), 5000)
      return false
    }
    if (!formData.message.trim()) {
      setNotification({ type: 'error', message: 'Message is required' })
      setTimeout(() => setNotification(null), 5000)
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
    setNotification(null)

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
        setNotification({ 
          type: 'success', 
          message: 'Thank you for your message! We have received your inquiry and will get back to you soon.' 
        })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setTimeout(() => setNotification(null), 10000)
      } else {
        setNotification({ 
          type: 'error', 
          message: data.error || 'Failed to send message. Please try again.' 
        })
        setTimeout(() => setNotification(null), 5000)
      }
    } catch (error) {
      setNotification({ 
        type: 'error', 
        message: 'Network error. Please try again.' 
      })
      setTimeout(() => setNotification(null), 5000)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <ContactSection>
        <Container>
          <SectionTitle>Get in Touch</SectionTitle>
          <ContactContent>
            <ContactInfoSection>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-map-marker-alt"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Address</h3>
                  <p>{contactInfo.address}</p>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-map"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Locate Us</h3>
                  <p><a href="https://maps.app.goo.gl/gweZK6bb3bZzGMaG7" target="_blank" rel="noopener noreferrer" style={{ color: '#00a652', textDecoration: 'underline' }}>Click here for directions</a></p>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-phone"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Phone</h3>
                  <p><a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a></p>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-envelope"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Email</h3>
                  <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>
                </ContactDetails>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <i className="fas fa-clock"></i>
                </ContactIcon>
                <ContactDetails>
                  <h3>Working Hours</h3>
                  <p>{contactInfo.workingHours}</p>
                </ContactDetails>
              </ContactItem>
            </ContactInfoSection>
            <ContactForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Name *</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="email">Email *</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="subject">Subject *</FormLabel>
                <FormSelect
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="sales">Sales</option>
                  <option value="service">Service</option>
                  <option value="test-ride">Test Ride</option>
                  <option value="others">Others</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="message">Message *</FormLabel>
                <FormTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </ContactForm>
          </ContactContent>
        </Container>
      </ContactSection>
      {notification && (
        <Notification $type={notification.type}>
          {notification.message}
        </Notification>
      )}
    </>
  )
}

export default Contact
