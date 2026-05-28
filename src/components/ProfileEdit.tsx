import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const ProfileEditContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const ProfileEditTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #00a652;
  }
`

const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`

const AvatarContainer = styled.div`
  position: relative;
  display: inline-block;
`

const ProfilePicture = styled.img<{ $hasPicture: boolean }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00a652;
  object-fit: cover;
  display: ${props => props.$hasPicture ? 'block' : 'none'};
`

const DefaultAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #00a652;
  background: linear-gradient(135deg, #00a652, #008040);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: #ffffff;
`

const AvatarUpload = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  background: #00a652;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #1a1a1a;
  transition: background 0.3s ease;

  input {
    display: none;
  }

  i {
    color: #ffffff;
    font-size: 0.8rem;
  }

  &:hover {
    background: #008040;
  }
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FormLabel = styled.label`
  color: #ffffff;
  font-weight: 500;
`

const FormInput = styled.input`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #00a652;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const FormTextarea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #00a652;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`

const FormButton = styled.button`
  background: linear-gradient(135deg, #00a652, #008040);
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

const SuccessMessage = styled.div`
  color: #00a652;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  bio: string;
  profilePicture: string;
}

interface ProfileEditProps {
  userEmail: string;
  currentData: ProfileData;
  onUpdate: (data: ProfileData) => void;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ userEmail, currentData, onUpdate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<ProfileData>({
    name: currentData.name || '',
    email: currentData.email || '',
    phone: currentData.phone || '',
    bio: currentData.bio || '',
    profilePicture: currentData.profilePicture || ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError('')
    setSuccess('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Image size should be less than 5MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Basic validation
      if (!formData.name || !formData.email) {
        setError('Name and email are required')
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address')
        return
      }

      // Phone validation (if provided)
      if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
        setError('Please enter a valid 10-digit phone number')
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Save profile data to localStorage
      const profileData = {
        ...formData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(`profile_${userEmail}`, JSON.stringify(profileData))

      // Update user name in main storage if changed
      if (formData.name !== currentData.name) {
        localStorage.setItem('userName', formData.name)
        
        // Update registered users
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
        const userIndex = registeredUsers.findIndex((user: any) => user.email === userEmail)
        if (userIndex !== -1) {
          registeredUsers[userIndex].name = formData.name
          localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
        }
      }

      // Update user picture in main storage if changed
      if (formData.profilePicture && formData.profilePicture !== currentData.profilePicture) {
        localStorage.setItem('userPicture', formData.profilePicture)
      }

      setSuccess('Profile updated successfully!')
      onUpdate(formData)

      setTimeout(() => {
        setSuccess('')
      }, 3000)

    } catch (err) {
      setError('Failed to update profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileEditContainer>
      <ProfileEditTitle>
        <i className="fas fa-user-edit"></i>
        Edit Profile
      </ProfileEditTitle>
      
      <ProfileForm onSubmit={handleSubmit}>
        <ProfileHeader>
          <AvatarContainer>
            {formData.profilePicture ? (
              <ProfilePicture src={formData.profilePicture} alt="Profile" $hasPicture={true} />
            ) : (
              <DefaultAvatar>
                <i className="fas fa-user"></i>
              </DefaultAvatar>
            )}
            <AvatarUpload htmlFor="profile-image-input">
              <input
                id="profile-image-input"
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <i className="fas fa-camera"></i>
            </AvatarUpload>
          </AvatarContainer>
          
          <div>
            <h4 style={{ color: '#ffffff', margin: '0 0 0.5rem 0' }}>
              {formData.name || 'Your Name'}
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0 }}>
              {formData.email}
            </p>
          </div>
        </ProfileHeader>

        <FormGrid>
          <FormGroup>
            <FormLabel htmlFor="name">Full Name *</FormLabel>
            <FormInput
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel htmlFor="email">Email Address *</FormLabel>
            <FormInput
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
        </FormGrid>

        <FormGroup>
          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <FormInput
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter 10-digit phone number"
            maxLength={10}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="bio">Bio</FormLabel>
          <FormTextarea
            id="bio"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? 'Updating Profile...' : 'Update Profile'}
        </FormButton>
      </ProfileForm>
    </ProfileEditContainer>
  )
}

export default ProfileEdit
