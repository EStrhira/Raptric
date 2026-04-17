import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const WarrantySection = styled.section`
  padding: 0;
  background: #000000;
`

const BannerSection = styled.div`
  background: linear-gradient(135deg, #00a652, #008040);
  padding: 80px 0;
  text-align: center;
  position: relative;
  overflow: hidden;

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
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const BannerTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
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
`

const WarrantyContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);
  margin-top: -50px;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 2rem;
  }
`

const FormSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`

const SectionIcon = styled.i`
  color: #00a652;
  font-size: 1.3rem;
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  color: #ffffff;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const FileUploadArea = styled.div<{ $hasFile?: boolean }>`
  border: 2px dashed ${props => props.$hasFile ? '#00a652' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  background: ${props => props.$hasFile ? 'rgba(0, 166, 82, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #00a652;
    background: rgba(0, 166, 82, 0.05);
  }
`

const FileInput = styled.input`
  display: none;
`

const UploadIcon = styled.div`
  font-size: 2.5rem;
  color: #00a652;
  margin-bottom: 1rem;
`

const UploadText = styled.div`
  color: #ffffff;
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const UploadSubtext = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
`

const FilePreview = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
`

const FileIcon = styled.i`
  color: #00a652;
  font-size: 1.2rem;
`

const FileName = styled.div`
  color: #ffffff;
  font-size: 0.9rem;
  flex: 1;
`

const RemoveFile = styled.button`
  background: rgba(255, 0, 0, 0.2);
  border: none;
  color: #ff4444;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 0, 0, 0.3);
  }
`

const SubmitButton = styled.button`
  width: 100%;
  background: #00a652;
  color: #ffffff;
  padding: 1.25rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
  }
`

const SuccessMessage = styled.div`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  color: #00ff00;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`

const ErrorMessage = styled.div`
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  text-align: center;
`

const NoteBox = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`

const NoteTitle = styled.h4`
  color: #00a652;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`

const NoteText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`

const WarrantyActivation: React.FC = () => {
  useScrollToTop()
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: ''
  })
  
  const [billImage, setBillImage] = useState<File | null>(null)
  const [motorImage, setMotorImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'bill' | 'motor') => {
    const file = e.target.files?.[0]
    if (file) {
      if (type === 'bill') {
        setBillImage(file)
      } else {
        setMotorImage(file)
      }
    }
  }

  const removeFile = (type: 'bill' | 'motor') => {
    if (type === 'bill') {
      setBillImage(null)
    } else {
      setMotorImage(null)
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' })
      return false
    }
    if (!formData.phoneNumber.trim()) {
      setMessage({ type: 'error', text: 'Please enter your phone number' })
      return false
    }
    if (!formData.email.trim()) {
      setMessage({ type: 'error', text: 'Please enter your email address' })
      return false
    }
    if (!formData.email.includes('@')) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' })
      return false
    }
    if (!billImage) {
      setMessage({ type: 'error', text: 'Please upload a picture of your bill' })
      return false
    }
    if (!motorImage) {
      setMessage({ type: 'error', text: 'Please upload a picture of your cycle motor' })
      return false
    }
    return true
  }

  const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        // Remove data:image/jpeg;base64, prefix if present
        const base64Data = result.includes(',') ? result.split(',')[1] : result
        resolve(base64Data)
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Convert images to base64
      const [billImageBase64, motorImageBase64] = await Promise.all([
        billImage ? readFileAsBase64(billImage) : Promise.resolve(null),
        motorImage ? readFileAsBase64(motorImage) : Promise.resolve(null)
      ])

      const response = await fetch('/.netlify/functions/warranty-activation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          billImage: billImageBase64,
          motorImage: motorImageBase64
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Warranty activation submitted successfully! We will review your documents and contact you within 24-48 hours.' 
        })
        
        // Reset form
        setFormData({ name: '', phoneNumber: '', email: '' })
        setBillImage(null)
        setMotorImage(null)
        
        setTimeout(() => setMessage(null), 10000)
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Failed to submit warranty activation. Please try again.' 
        })
        setTimeout(() => setMessage(null), 5000)
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Network error. Please try again or contact support directly.' 
      })
      setTimeout(() => setMessage(null), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <WarrantySection>
      <BannerSection>
        <Container>
          <BannerContent>
            <BannerIcon>
              <i className="fas fa-shield-alt"></i>
            </BannerIcon>
            <BannerTitle>Warranty Activation</BannerTitle>
            <BannerSubtitle>
              Activate your RAPTRIC eBike/mBike warranty within 3 days from date of purchase by providing your details and required documents.
            </BannerSubtitle>
          </BannerContent>
        </Container>
      </BannerSection>

      <Container>
        <WarrantyContainer>
          <form onSubmit={handleSubmit}>
            <FormSection>
              <SectionTitle>
                <SectionIcon className="fas fa-user"></SectionIcon>
                Personal Information
              </SectionTitle>
              
              <FormGroup>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>
            </FormSection>

            <FormSection>
              <SectionTitle>
                <SectionIcon className="fas fa-file-image"></SectionIcon>
                Required Documents
              </SectionTitle>

              <FormGroup>
                <Label>Picture of Bill *</Label>
                <FileUploadArea 
                  $hasFile={!!billImage}
                  onClick={() => document.getElementById('billInput')?.click()}
                >
                  <FileInput
                    type="file"
                    id="billInput"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'bill')}
                  />
                  {billImage ? (
                    <FilePreview>
                      <FileIcon className="fas fa-file-image"></FileIcon>
                      <FileName>{billImage.name}</FileName>
                      <RemoveFile 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile('bill')
                        }}
                      >
                        Remove
                      </RemoveFile>
                    </FilePreview>
                  ) : (
                    <>
                      <UploadIcon>
                        <i className="fas fa-cloud-upload-alt"></i>
                      </UploadIcon>
                      <UploadText>Click to upload bill image</UploadText>
                      <UploadSubtext>Supported formats: JPG, PNG, PDF (Max 5MB)</UploadSubtext>
                    </>
                  )}
                </FileUploadArea>
              </FormGroup>

              <FormGroup>
                <Label>Picture of Cycle Motor *</Label>
                <FileUploadArea 
                  $hasFile={!!motorImage}
                  onClick={() => document.getElementById('motorInput')?.click()}
                >
                  <FileInput
                    type="file"
                    id="motorInput"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'motor')}
                  />
                  {motorImage ? (
                    <FilePreview>
                      <FileIcon className="fas fa-file-image"></FileIcon>
                      <FileName>{motorImage.name}</FileName>
                      <RemoveFile 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeFile('motor')
                        }}
                      >
                        Remove
                      </RemoveFile>
                    </FilePreview>
                  ) : (
                    <>
                      <UploadIcon>
                        <i className="fas fa-camera"></i>
                      </UploadIcon>
                      <UploadText>Click to upload motor image</UploadText>
                      <UploadSubtext>Supported formats: JPG, PNG (Max 5MB)</UploadSubtext>
                    </>
                  )}
                </FileUploadArea>
              </FormGroup>
            </FormSection>

            <NoteBox>
              <NoteTitle>Important Notes:</NoteTitle>
              <NoteText>• Warranty claims are possible only after activation of warranty</NoteText>
              <NoteText>• Ensure all documents are clear and readable</NoteText>
              <NoteText>• Bill must show the purchase date and product details</NoteText>
              <NoteText>• Motor image should clearly show the motor serial number</NoteText>
              <NoteText>• Warranty activation will be processed within 24-48 hours</NoteText>
            </NoteBox>

            {message && (
              message.type === 'success' ? (
                <SuccessMessage>{message.text}</SuccessMessage>
              ) : (
                <ErrorMessage>{message.text}</ErrorMessage>
              )
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Activate Warranty
                </>
              )}
            </SubmitButton>
          </form>
        </WarrantyContainer>
      </Container>
    </WarrantySection>
  )
}

export default WarrantyActivation
