import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const AddressEditContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
`

const AddressEditTitle = styled.h3`
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

const AddressForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const AddressSection = styled.div`
  margin-bottom: 2rem;
`

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  h4 {
    color: #00a652;
    font-size: 1.1rem;
    margin: 0;
  }
`

const AddressGrid = styled.div`
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #00a652;
`

const CheckboxLabel = styled.label`
  color: #ffffff;
  cursor: pointer;
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

interface AddressData {
  billingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  };
  sameAsBilling: boolean;
}

interface AddressEditProps {
  userEmail: string;
  currentData: AddressData;
  onUpdate: (data: AddressData) => void;
}

const AddressEdit: React.FC<AddressEditProps> = ({ userEmail, currentData, onUpdate }) => {
  const [formData, setFormData] = useState<AddressData>({
    billingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    },
    shippingAddress: {
      street: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    },
    sameAsBilling: true
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentData && currentData.billingAddress) {
      setFormData(currentData)
    } else {
      // Set default empty structure if no data exists
      setFormData({
        billingAddress: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          phone: ''
        },
        shippingAddress: {
          street: '',
          city: '',
          state: '',
          pincode: '',
          phone: ''
        },
        sameAsBilling: true
      })
    }
  }, [currentData])

  const handleInputChange = (type: 'billing' | 'shipping', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [type === 'billing' ? 'billingAddress' : 'shippingAddress']: {
        ...prev[type === 'billing' ? 'billingAddress' : 'shippingAddress'],
        [field]: value
      }
    }))
    setError('')
    setSuccess('')
  }

  const handleSameAsBillingChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sameAsBilling: checked,
      shippingAddress: checked ? { ...prev.billingAddress } : {
        street: '',
        city: '',
        state: '',
        pincode: '',
        phone: ''
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Validate required fields
      const requiredFields = ['street', 'city', 'state', 'pincode', 'phone']
      
      for (const field of requiredFields) {
        if (!formData.billingAddress[field as keyof typeof formData.billingAddress]) {
          setError(`Please fill in all billing address fields`)
          return
        }
      }

      if (!formData.sameAsBilling) {
        for (const field of requiredFields) {
          if (!formData.shippingAddress[field as keyof typeof formData.shippingAddress]) {
            setError(`Please fill in all shipping address fields`)
            return
          }
        }
      }

      // Validate pincode (should be numeric and 6 digits)
      const pincodeRegex = /^\d{6}$/
      if (!pincodeRegex.test(formData.billingAddress.pincode)) {
        setError('Please enter a valid 6-digit PIN code for billing address')
        return
      }

      if (!formData.sameAsBilling && !pincodeRegex.test(formData.shippingAddress.pincode)) {
        setError('Please enter a valid 6-digit PIN code for shipping address')
        return
      }

      // Validate phone (should be numeric and 10 digits)
      const phoneRegex = /^\d{10}$/
      if (!phoneRegex.test(formData.billingAddress.phone)) {
        setError('Please enter a valid 10-digit phone number for billing address')
        return
      }

      if (!formData.sameAsBilling && !phoneRegex.test(formData.shippingAddress.phone)) {
        setError('Please enter a valid 10-digit phone number for shipping address')
        return
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Save addresses to localStorage
      const addressData = {
        ...formData,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(`addresses_${userEmail}`, JSON.stringify(addressData))

      setSuccess('Addresses updated successfully!')
      onUpdate(formData)

      setTimeout(() => {
        setSuccess('')
      }, 3000)

    } catch (err) {
      setError('Failed to update addresses. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AddressEditContainer>
      <AddressEditTitle>
        <i className="fas fa-map-marked-alt"></i>
        Edit Addresses
      </AddressEditTitle>
      
      <AddressForm onSubmit={handleSubmit}>
        <AddressSection>
          <SectionHeader>
            <h4>
              <i className="fas fa-file-invoice"></i>
              Billing Address
            </h4>
          </SectionHeader>
          
          <FormGroup>
            <FormLabel>Street Address *</FormLabel>
            <FormTextarea
              value={formData.billingAddress.street}
              onChange={(e) => handleInputChange('billing', 'street', e.target.value)}
              placeholder="Enter your complete street address"
              required
            />
          </FormGroup>

          <AddressGrid>
            <FormGroup>
              <FormLabel>City *</FormLabel>
              <FormInput
                type="text"
                value={formData.billingAddress.city}
                onChange={(e) => handleInputChange('billing', 'city', e.target.value)}
                placeholder="Enter your city"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>State *</FormLabel>
              <FormInput
                type="text"
                value={formData.billingAddress.state}
                onChange={(e) => handleInputChange('billing', 'state', e.target.value)}
                placeholder="Enter your state"
                required
              />
            </FormGroup>
          </AddressGrid>

          <AddressGrid>
            <FormGroup>
              <FormLabel>PIN Code *</FormLabel>
              <FormInput
                type="text"
                value={formData.billingAddress.pincode}
                onChange={(e) => handleInputChange('billing', 'pincode', e.target.value)}
                placeholder="6-digit PIN code"
                maxLength={6}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Phone Number *</FormLabel>
              <FormInput
                type="tel"
                value={formData.billingAddress.phone}
                onChange={(e) => handleInputChange('billing', 'phone', e.target.value)}
                placeholder="10-digit phone number"
                maxLength={10}
                required
              />
            </FormGroup>
          </AddressGrid>
        </AddressSection>

        <CheckboxGroup>
          <Checkbox
            type="checkbox"
            id="sameAsBilling"
            checked={formData.sameAsBilling}
            onChange={(e) => handleSameAsBillingChange(e.target.checked)}
          />
          <CheckboxLabel htmlFor="sameAsBilling">
            Shipping address same as billing address
          </CheckboxLabel>
        </CheckboxGroup>

        {!formData.sameAsBilling && (
          <AddressSection>
            <SectionHeader>
              <h4>
                <i className="fas fa-truck"></i>
                Shipping Address
              </h4>
            </SectionHeader>
            
            <FormGroup>
              <FormLabel>Street Address *</FormLabel>
              <FormTextarea
                value={formData.shippingAddress.street}
                onChange={(e) => handleInputChange('shipping', 'street', e.target.value)}
                placeholder="Enter your complete street address"
                required
              />
            </FormGroup>

            <AddressGrid>
              <FormGroup>
                <FormLabel>City *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.shippingAddress.city}
                  onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                  placeholder="Enter your city"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>State *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.shippingAddress.state}
                  onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                  placeholder="Enter your state"
                  required
                />
              </FormGroup>
            </AddressGrid>

            <AddressGrid>
              <FormGroup>
                <FormLabel>PIN Code *</FormLabel>
                <FormInput
                  type="text"
                  value={formData.shippingAddress.pincode}
                  onChange={(e) => handleInputChange('shipping', 'pincode', e.target.value)}
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <FormInput
                  type="tel"
                  value={formData.shippingAddress.phone}
                  onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                  placeholder="10-digit phone number"
                  maxLength={10}
                  required
                />
              </FormGroup>
            </AddressGrid>
          </AddressSection>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? 'Updating Addresses...' : 'Update Addresses'}
        </FormButton>
      </AddressForm>
    </AddressEditContainer>
  )
}

export default AddressEdit
