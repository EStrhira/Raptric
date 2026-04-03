import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import UserService, { UserAddress } from '../../firebase/userService'

// Styled Components
const AddressFormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
`

const FormHeader = styled.div`
  background: linear-gradient(135deg, #00a652, #008a45);
  color: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderText = styled.div`
  h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.9;
    font-size: 1.1rem;
  }
`

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`

const FormCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const FormLabel = styled.label`
  margin-bottom: 0.5rem;
  color: #ffffff;
  font-weight: 500;
  font-size: 1rem;
`

const FormInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  background: #222;
  color: #ffffff;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`

const FormSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  background: #222;
  color: #ffffff;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }

  option {
    background: #222;
    color: #ffffff;
  }
`

const FormTextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  background: #222;
  color: #ffffff;
  transition: border-color 0.3s ease;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #00a652;
    box-shadow: 0 0 0 2px rgba(0, 166, 82, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`

const CheckboxLabel = styled.label`
  cursor: pointer;
  color: #ffffff;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FormActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
`

const SaveButton = styled.button`
  background: #00a652;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #008a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`

const CancelButton = styled.button`
  background: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: #5a6268;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  }
`

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ffffff;
  font-size: 1.2rem;
`

const ErrorMessage = styled.div`
  background: #dc3545;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  border: 1px solid #c82333;
`

const SuccessMessage = styled.div`
  background: #28a745;
  color: white;
  padding: 1rem;
  border-radius: 5px;
  margin-bottom: 1rem;
  border: 1px solid #1e7e34;
`

// Types
interface AddressFormData {
  type: 'billing' | 'shipping'
  companyName?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  country: string
  gst?: string
  isDefault: boolean
}

interface AddressFormProps {
  addressId?: string
  isEdit?: boolean
}

const AddressForm: React.FC<AddressFormProps> = ({ addressId, isEdit = false }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const [formData, setFormData] = useState<AddressFormData>({
    type: 'shipping',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    isDefault: false
  })

  // Load address data if editing
  useEffect(() => {
    if (isEdit && addressId) {
      const loadAddress = async () => {
        try {
          setLoading(true)
          
          if (!currentUser) {
            setError('User not authenticated')
            return
          }
          
          // Load address from Firebase
          const addresses = await UserService.getAddresses(currentUser.uid)
          const addressData = addresses.find(addr => addr.id === addressId)
          
          if (addressData) {
            setFormData({
              type: addressData.type,
              companyName: addressData.companyName || '',
              firstName: addressData.firstName,
              lastName: addressData.lastName,
              email: addressData.email,
              phone: addressData.phone,
              address: addressData.address,
              city: addressData.city,
              state: addressData.state,
              pincode: addressData.pincode,
              country: addressData.country,
              gst: addressData.gst || '',
              isDefault: addressData.isDefault || false
            })
          } else {
            setError('Address not found')
          }
        } catch (error) {
          setError('Failed to load address')
        } finally {
          setLoading(false)
        }
      }
      
      loadAddress()
    }
  }, [isEdit, addressId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!currentUser) {
      setError('User not authenticated')
      return
    }
    
    try {
      setLoading(true)
      
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.state || !formData.pincode || !formData.phone) {
        setError('Please fill in all required fields')
        return
      }
      
      // Validate pincode (should be 6 digits)
      if (!/^\d{6}$/.test(formData.pincode)) {
        setError('Please enter a valid 6-digit pincode')
        return
      }
      
      // Validate phone number
      if (!/^\+?\d{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
        setError('Please enter a valid phone number')
        return
      }
      
      // Save address to Firebase
      if (isEdit && addressId) {
        const updateData: any = {
          type: formData.type,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          isDefault: formData.isDefault
        }
        
        // Only include optional fields if they have values
        if (formData.companyName) updateData.companyName = formData.companyName
        if (formData.gst) updateData.gst = formData.gst
        
        await UserService.updateAddress(currentUser.uid, addressId, updateData)
      } else {
        const addressData: any = {
          type: formData.type,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          isDefault: formData.isDefault
        }
        
        // Only include optional fields if they have values
        if (formData.companyName) addressData.companyName = formData.companyName
        if (formData.gst) addressData.gst = formData.gst
        
        await UserService.addAddress(currentUser.uid, addressData)
      }
      
      setSuccess(`Address ${isEdit ? 'updated' : 'created'} successfully!`)
      
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
      
    } catch (error) {
      setError(`Failed to ${isEdit ? 'update' : 'create'} address`)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/dashboard')
  }

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]

  return (
    <AddressFormContainer>
      <FormHeader>
        <HeaderContent>
          <HeaderText>
            <h1>{isEdit ? 'Edit Address' : 'Add New Address'}</h1>
            <p>{isEdit ? 'Update your address information' : 'Add a new address to your account'}</p>
          </HeaderText>
          <BackButton onClick={handleCancel}>
            ← Back to Dashboard
          </BackButton>
        </HeaderContent>
      </FormHeader>

      <FormCard>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        {loading ? (
          <LoadingSpinner>Loading...</LoadingSpinner>
        ) : (
          <form onSubmit={handleSubmit}>
            <FormGrid>
              <FormGroup>
                <FormLabel htmlFor="type">Address Type *</FormLabel>
                <FormSelect
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="shipping">Shipping Address</option>
                  <option value="billing">Billing Address</option>
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="firstName">First Name *</FormLabel>
                <FormInput
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="lastName">Last Name *</FormLabel>
                <FormInput
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="email">Email *</FormLabel>
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>

              <FormGroup style={{ gridColumn: '1 / -1' }}>
                <FormLabel htmlFor="address">Street Address *</FormLabel>
                <FormTextArea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="city">City *</FormLabel>
                <FormInput
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="state">State *</FormLabel>
                <FormSelect
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  {indianStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="pincode">Pincode *</FormLabel>
                <FormInput
                  id="pincode"
                  name="pincode"
                  type="text"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="country">Country *</FormLabel>
                <FormInput
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="companyName">Company Name (Optional)</FormLabel>
                <FormInput
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter company name"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="gst">GST Number (Optional)</FormLabel>
                <FormInput
                  id="gst"
                  name="gst"
                  type="text"
                  value={formData.gst}
                  onChange={handleInputChange}
                  placeholder="Enter GST number"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="phone">Phone Number *</FormLabel>
                <FormInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </FormGroup>
            </FormGrid>

            <CheckboxGroup>
              <CheckboxInput
                id="isDefault"
                name="isDefault"
                type="checkbox"
                checked={formData.isDefault}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="isDefault">
                Set as default address
              </CheckboxLabel>
            </CheckboxGroup>

            <FormActions>
              <CancelButton type="button" onClick={handleCancel}>
                ✕ Cancel
              </CancelButton>
              <SaveButton type="submit" disabled={loading}>
                💾 {loading ? 'Saving...' : (isEdit ? 'Update Address' : 'Save Address')}
              </SaveButton>
            </FormActions>
          </form>
        )}
      </FormCard>
    </AddressFormContainer>
  )
}

export default AddressForm
