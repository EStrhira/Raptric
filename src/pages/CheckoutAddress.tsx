import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'
import { Link, useNavigate } from 'react-router-dom'
import { getCart, getCartTotal } from '../utils/cart'
import { useScrollToTop } from '../hooks/useScrollToTop'
import PaymentButton from '../components/Payment/PaymentButton'
import { usePayment } from '../context/PaymentContext'
import BUSINESS_INFO from '../constants/businessInfo'

const CheckoutSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
`

const CheckoutBanner = styled.div`
  background: linear-gradient(135deg, #00a652 0%, #008040 100%);
  color: #ffffff;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 3rem;
`

const BannerContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`

const BannerText = styled.div`
  flex: 1;
`

const BannerTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #ffffff;
`

const BannerSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
`

const BannerImage = styled.div`
  font-size: 3rem;
  opacity: 0.8;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const CheckoutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

const CheckoutHeader = styled.div`
  grid-column: 1 / -1;
  margin-bottom: 2rem;
`

const CheckoutTitle = styled.h1`
  color: #00a652;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const CheckoutSteps = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const Step = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.active ? '#00a652' : 'rgba(255, 255, 255, 0.5)'};
  font-weight: ${props => props.active ? '600' : '400'};
`

const StepNumber = styled.div<{ active?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${props => props.active ? '#00a652' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
`

const AddressForm = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
`

const FormTitle = styled.h2`
  color: #00a652;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FormRow = styled.div`
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

const Label = styled.label`
  color: #ffffff;
  font-weight: 500;
  font-size: 0.9rem;
`

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
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

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #00a652;
    background: rgba(255, 255, 255, 0.15);
  }

  option {
    background: #1a1a1a;
    color: #ffffff;
  }
`

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: #00a652;
`

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 100px;
`

const SummaryTitle = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.8);
`

const SummaryDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 1rem 0;
`

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
`

const TotalLabel = styled.span`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 600;
`

const TotalAmount = styled.span`
  color: #00a652;
  font-size: 1.4rem;
  font-weight: 700;
`

const BangaloreMessage = styled.div`
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
  border: 1px solid #ffc107;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(255, 193, 7, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
`

const MessageIcon = styled.div`
  font-size: 1.2rem;
  color: #ff9800;
  flex-shrink: 0;
`

const MessageContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`

const MessageTitle = styled.span`
  color: #e65100;
  font-size: 0.95rem;
  font-weight: 600;
`

const MessageText = styled.span`
  color: #856404;
  font-size: 0.9rem;
  line-height: 1.4;

  a {
    color: #00a652;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }

  strong {
    color: #e65100;
  }
`

const BackButton = styled(Link)`
  background: transparent;
  color: #00a652;
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #00a652;
  transition: all 0.3s ease;

  &:hover {
    background: #00a652;
    color: #ffffff;
  }
`

const ContinueButton = styled.button`
  background: #00a652;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
    transform: none;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`

interface AddressFormData {
  // Billing Address
  billingFirstName: string
  billingLastName: string
  billingEmail: string
  billingPhone: string
  billingAddress: string
  billingCity: string
  billingState: string
  billingPincode: string
  billingCountry: string
  billingGST: string  // GST Details field
  
  // Shipping Address
  shippingFirstName: string
  shippingLastName: string
  shippingPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPincode: string
  shippingCountry: string
  
  sameAsBilling: boolean
}

interface FormErrors {
  [key: string]: string
}

const CheckoutAddress: React.FC = () => {
  const navigate = useNavigate()
  const { setPaymentSuccess, setError: setPaymentError, clearError } = usePayment()
  const [formData, setFormData] = useState<AddressFormData>({
    // Billing Address
    billingFirstName: '',
    billingLastName: '',
    billingEmail: '',
    billingPhone: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingPincode: '',
    billingCountry: 'India',
    billingGST: '',
    
    // Shipping Address
    shippingFirstName: '',
    shippingLastName: '',
    shippingPhone: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    shippingCountry: 'India',
    
    sameAsBilling: true
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [error, setError] = useState<string | null>(null)

  const cartItems = getCart()
  const cartTotal = getCartTotal()

  // Scroll to top when page loads or navigates
  useScrollToTop()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSameAsBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked
    setFormData(prev => ({
      ...prev,
      sameAsBilling: isChecked,
      // Copy billing address to shipping if checked, clear if unchecked
      ...(isChecked ? {
        shippingFirstName: prev.billingFirstName,
        shippingLastName: prev.billingLastName,
        shippingPhone: prev.billingPhone,
        shippingAddress: prev.billingAddress,
        shippingCity: prev.billingCity,
        shippingState: prev.billingState,
        shippingPincode: prev.billingPincode,
        shippingCountry: prev.billingCountry
      } : {
        shippingFirstName: '',
        shippingLastName: '',
        shippingPhone: '',
        shippingAddress: '',
        shippingCity: '',
        shippingState: '',
        shippingPincode: '',
        shippingCountry: 'India'
      })
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Checkout data:', formData)
    // Payment will be handled by PaymentButton
  }

  const handlePaymentSuccess = (paymentResponse: any) => {
    // Clear cart after successful payment
    localStorage.setItem('esthira-cart', JSON.stringify([]))
    
    // Store payment details with address information
    setPaymentSuccess({
      ...paymentResponse,
      items: cartItems,
      totalAmount: cartTotal,
      billingAddress: {
        firstName: formData.billingFirstName,
        lastName: formData.billingLastName,
        email: formData.billingEmail,
        phone: formData.billingPhone,
        address: formData.billingAddress,
        city: formData.billingCity,
        state: formData.billingState,
        pincode: formData.billingPincode,
        country: formData.billingCountry,
        gst: formData.billingGST
      },
      shippingAddress: formData.sameAsBilling ? {
        firstName: formData.billingFirstName,
        lastName: formData.billingLastName,
        phone: formData.billingPhone,
        address: formData.billingAddress,
        city: formData.billingCity,
        state: formData.billingState,
        pincode: formData.billingPincode,
        country: formData.billingCountry
      } : {
        firstName: formData.shippingFirstName,
        lastName: formData.shippingLastName,
        phone: formData.shippingPhone,
        address: formData.shippingAddress,
        city: formData.shippingCity,
        state: formData.shippingState,
        pincode: formData.shippingPincode,
        country: formData.shippingCountry
      },
      timestamp: new Date().toISOString()
    })

    // Show success message and redirect
    alert('Payment successful! Your order has been placed.')
    navigate('/order-success')
  }

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error)
    setError(error.message || 'Payment failed. Please try again.')
  }

  const isFormValid = () => {
    return (
      formData.billingFirstName &&
      formData.billingLastName &&
      formData.billingEmail &&
      formData.billingPhone &&
      formData.billingAddress &&
      formData.billingCity &&
      formData.billingState &&
      formData.billingPincode &&
      formData.billingCountry &&
      (formData.sameAsBilling || (
        formData.shippingFirstName &&
        formData.shippingLastName &&
        formData.shippingPhone &&
        formData.shippingAddress &&
        formData.shippingCity &&
        formData.shippingState &&
        formData.shippingPincode &&
        formData.shippingCountry
      ))
    )
  }

  return (
    <CheckoutSection>
      <CheckoutBanner>
        <Container>
          <BannerContent>
            <BannerText>
              <BannerTitle>🚚 Secure Checkout</BannerTitle>
              <BannerSubtitle>Complete your details for fast delivery</BannerSubtitle>
            </BannerText>
            <BannerImage>
              <i className="fas fa-shield-alt"></i>
            </BannerImage>
          </BannerContent>
        </Container>
      </CheckoutBanner>

      {/* Bangalore Service Message - Always Visible */}
      <Container>
        <BangaloreMessage>
          <MessageIcon>
            <i className="fas fa-info-circle"></i>
          </MessageIcon>
          <MessageContent>
            <MessageTitle>📍 Service Area: Bangalore Only</MessageTitle>
            <MessageText>
              We currently serve only Bangalore for the best after-sales service. 
              Contact us at <a href={`mailto:${BUSINESS_INFO.contact.email}`}>{BUSINESS_INFO.contact.email}</a> or <a href={`tel:${BUSINESS_INFO.contact.phoneFormatted}`}>{BUSINESS_INFO.contact.phone}</a> for other locations.
            </MessageText>
          </MessageContent>
        </BangaloreMessage>
      </Container>
      
      <Container>
        <CheckoutContainer>
          <CheckoutHeader>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <CheckoutSteps>
              <Step active>
                <StepNumber active>1</StepNumber>
                Address
              </Step>
              <Step>
                <StepNumber>2</StepNumber>
                Payment
              </Step>
              <Step>
                <StepNumber>3</StepNumber>
                Confirmation
              </Step>
            </CheckoutSteps>
          </CheckoutHeader>

          <AddressForm>
            <FormTitle>Billing Address</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormRow>
                <FormGroup>
                  <Label>First Name *</Label>
                  <Input
                    type="text"
                    name="billingFirstName"
                    value={formData.billingFirstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name *</Label>
                  <Input
                    type="text"
                    name="billingLastName"
                    value={formData.billingLastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Email ID *</Label>
                  <Input
                    type="email"
                    name="billingEmail"
                    value={formData.billingEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email ID"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone *</Label>
                  <Input
                    type="tel"
                    name="billingPhone"
                    value={formData.billingPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormGroup>
                <Label>Address *</Label>
                <Input
                  type="text"
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  placeholder="Enter your street address"
                  required
                />
              </FormGroup>

              <FormRow>
                <FormGroup>
                  <Label>City *</Label>
                  <Input
                    type="text"
                    name="billingCity"
                    value={formData.billingCity}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>State *</Label>
                  <Input
                    type="text"
                    name="billingState"
                    value={formData.billingState}
                    onChange={handleInputChange}
                    placeholder="Enter your state"
                    required
                  />
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>Pincode *</Label>
                  <Input
                    type="text"
                    name="billingPincode"
                    value={formData.billingPincode}
                    onChange={handleInputChange}
                    placeholder="Enter your pincode"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Country *</Label>
                  <Select
                    name="billingCountry"
                    value={formData.billingCountry}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </Select>
                </FormGroup>
              </FormRow>

              <FormRow>
                <FormGroup>
                  <Label>GST Details (Optional)</Label>
                  <Input
                    type="text"
                    name="billingGST"
                    value={formData.billingGST}
                    onChange={handleInputChange}
                    placeholder="Enter GST number (optional)"
                  />
                </FormGroup>
              </FormRow>
            </Form>
          </AddressForm>

          <AddressForm>
            <FormTitle>Shipping Address</FormTitle>
            <Form>
              <CheckboxGroup>
                <Checkbox
                  type="checkbox"
                  name="sameAsBilling"
                  checked={formData.sameAsBilling}
                  onChange={handleSameAsBillingChange}
                />
                <Label>Same as billing address</Label>
              </CheckboxGroup>

              {!formData.sameAsBilling && (
                <>
                  <FormRow>
                    <FormGroup>
                      <Label>First Name *</Label>
                      <Input
                        type="text"
                        name="shippingFirstName"
                        value={formData.shippingFirstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                        required={!formData.sameAsBilling}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name *</Label>
                      <Input
                        type="text"
                        name="shippingLastName"
                        value={formData.shippingLastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                        required={!formData.sameAsBilling}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label>Phone *</Label>
                    <Input
                      type="tel"
                      name="shippingPhone"
                      value={formData.shippingPhone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>Address *</Label>
                    <Input
                      type="text"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter street address"
                      required={!formData.sameAsBilling}
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <Label>City *</Label>
                      <Input
                        type="text"
                        name="shippingCity"
                        value={formData.shippingCity}
                        onChange={handleInputChange}
                        placeholder="Enter city"
                        required={!formData.sameAsBilling}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>State *</Label>
                      <Input
                        type="text"
                        name="shippingState"
                        value={formData.shippingState}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                        required={!formData.sameAsBilling}
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>Pincode *</Label>
                      <Input
                        type="text"
                        name="shippingPincode"
                        value={formData.shippingPincode}
                        onChange={handleInputChange}
                        placeholder="Enter pincode"
                        required={!formData.sameAsBilling}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Country *</Label>
                      <Select
                        name="shippingCountry"
                        value={formData.shippingCountry}
                        onChange={handleInputChange}
                        required={!formData.sameAsBilling}
                      >
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </Select>
                    </FormGroup>
                  </FormRow>
                </>
              )}

              <ButtonGroup>
                <BackButton to="/cart">
                  <i className="fas fa-arrow-left"></i>
                  Back to Cart
                </BackButton>
                <PaymentButton
                  amount={Math.round(cartTotal)}
                  productName="eSthira Purchase"
                  productDescription={`Order with ${cartItems.length} item(s)`}
                  customerInfo={{
                    name: `${formData.billingFirstName} ${formData.billingLastName}`,
                    email: formData.billingEmail,
                    contact: formData.billingPhone
                  }}
                  onSuccess={handlePaymentSuccess}
                  onFailure={handlePaymentFailure}
                  disabled={!isFormValid()}
                  size="large"
                >
                  💳 Pay ₹{Math.round(cartTotal).toLocaleString('en-IN')}
                </PaymentButton>
              </ButtonGroup>
            </Form>
          </AddressForm>

          <OrderSummary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryRow>
              <span>Items ({cartItems.length}):</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </SummaryRow>
            <SummaryRow>
              <span>Shipping:</span>
              <span>Free</span>
            </SummaryRow>
            <SummaryDivider />
            <SummaryTotal>
              <TotalLabel>Total:</TotalLabel>
              <TotalAmount>₹{cartTotal.toFixed(2)}</TotalAmount>
            </SummaryTotal>
          </OrderSummary>
        </CheckoutContainer>
      </Container>
    </CheckoutSection>
  )
}

export default CheckoutAddress
