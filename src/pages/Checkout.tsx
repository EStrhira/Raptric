import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import ProtectedRoute from '../components/ProtectedRoute'
import { getCart, getCartTotal, CartItem } from '../utils/cart'

const CheckoutSection = styled.section`
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
`

const BannerIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
`

const CheckoutContainer = styled.div`
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
    margin: 2rem 1rem;
    padding: 2rem;
  }
`

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
  }
`

const Section = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
`

const CheckoutSectionTitle = styled.h2`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  i {
    color: #00a652;
  }
`

const UserInfo = styled.div`
  background: rgba(0, 166, 82, 0.1);
  border: 1px solid rgba(0, 166, 82, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;

  p {
    color: rgba(255, 255, 255, 0.9);
    margin: 0.5rem 0;
    
    strong {
      color: #00a652;
    }
  }
`

const AddressDisplay = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;

  h4 {
    color: #00a652;
    margin: 0 0 0.5rem 0;
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      font-size: 0.9rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.8);
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  span {
    color: rgba(255, 255, 255, 0.9);
    font-size: 0.95rem;
  }
  
  span:last-child {
    font-weight: 600;
    color: #ffffff;
  }
`

const OrderDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 1rem 0;
`

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 2px solid #00a652;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #00a652;
`

const PaymentInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
  
  h4 {
    color: #00a652;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    margin: 0.5rem 0;
    
    strong {
      color: #00a652;
    }
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

const Button = styled.button`
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

const Checkout: React.FC = () => {
  useScrollToTop()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    shippingAddress: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    notes: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const userEmail = localStorage.getItem('userEmail')
  const userName = localStorage.getItem('userName')
  const userPicture = localStorage.getItem('userPicture')
  const [savedAddresses, setSavedAddresses] = useState<any>(null)

  // Load cart data
  useEffect(() => {
    const items = getCart()
    setCartItems(items)
    console.log('Checkout: Loaded cart items:', items)
  }, [])

  useEffect(() => {
    // Load saved addresses if user is logged in
    const currentUserEmail = localStorage.getItem('userEmail')
    console.log('Checkout: Loading addresses for user:', currentUserEmail)
    
    if (currentUserEmail) {
      const savedAddressesData = localStorage.getItem(`addresses_${currentUserEmail}`)
      console.log('Checkout: Raw address data:', savedAddressesData)
      
      if (savedAddressesData) {
        const addresses = JSON.parse(savedAddressesData)
        console.log('Checkout: Parsed addresses:', addresses)
        setSavedAddresses(addresses)
        
        // Use shipping address (or billing if same as billing)
        const addressToUse = addresses.sameAsBilling ? addresses.billingAddress : addresses.shippingAddress
        console.log('Checkout: Address to use:', addressToUse)
        
        setFormData({
          shippingAddress: addressToUse.street,
          city: addressToUse.city,
          state: addressToUse.state,
          pincode: addressToUse.pincode,
          phone: addressToUse.phone,
          notes: ''
        })
        console.log('Checkout: Form data set:', {
          shippingAddress: addressToUse.street,
          city: addressToUse.city,
          state: addressToUse.state,
          pincode: addressToUse.pincode,
          phone: addressToUse.phone
        })
      } else {
        console.log('Checkout: No saved addresses found for user:', currentUserEmail)
      }
    } else {
      console.log('Checkout: No user email found')
    }
  }, []) // Empty dependency array to run only on mount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Validate form
      if (!formData.shippingAddress || !formData.city || !formData.state || !formData.pincode || !formData.phone) {
        alert('Please fill in all required fields')
        return
      }

      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Store order data
      const orderData = {
        user: localStorage.getItem('userEmail'),
        items: cartItems,
        total: getCartTotal(),
        shippingAddress: formData,
        orderDate: new Date().toISOString(),
        status: 'pending'
      }
      
      localStorage.setItem('currentOrder', JSON.stringify(orderData))
      
      // Clear cart after order placement
      localStorage.removeItem('esthira-cart')
      
      // Redirect to order confirmation
      window.location.href = '/order-confirmation'

    } catch (error) {
      alert('Order processing failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <ProtectedRoute>
      <CheckoutSection>
        <BannerSection>
          <Container>
            <BannerContent>
              <BannerTitle>Checkout</BannerTitle>
              <BannerSubtitle>Complete your order details</BannerSubtitle>
            </BannerContent>
          </Container>
        </BannerSection>

        <Container>
          <CheckoutContainer>
            <CheckoutGrid>
              {/* Shipping Information */}
              <Section>
                <CheckoutSectionTitle>
                  <i className="fas fa-truck"></i>
                  Shipping Information
                </CheckoutSectionTitle>
                  
                  <UserInfo>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      {userPicture ? (
                        <img 
                          src={userPicture} 
                          alt="Profile" 
                          style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%', 
                            border: '2px solid #00a652',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          border: '2px solid #00a652',
                          background: 'linear-gradient(135deg, #00a652, #008040)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#ffffff',
                          fontSize: '1rem'
                        }}>
                          <i className="fas fa-user"></i>
                        </div>
                      )}
                      <div>
                        <p style={{ margin: '0', fontSize: '1rem', fontWeight: '600', color: '#ffffff' }}>
                          {userName || 'User'}
                        </p>
                        <p style={{ margin: '0', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                          {userEmail}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: '#00a652', fontSize: '0.9rem' }}>
                        <i className="fas fa-check-circle"></i> Logged In
                      </span>
                      <button 
                        onClick={() => navigate('/account')}
                        style={{
                          background: 'rgba(0, 166, 82, 0.1)',
                          border: '1px solid rgba(0, 166, 82, 0.3)',
                          color: '#00a652',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          textDecoration: 'none'
                        }}
                      >
                        View Account
                      </button>
                    </div>
                  </UserInfo>

                  {savedAddresses && (
                    <>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#00a652', marginBottom: '0.5rem' }}>
                          <i className="fas fa-file-invoice"></i> Billing Address
                        </h4>
                        {savedAddresses.billingAddress.companyName && (
                          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            Company: {savedAddresses.billingAddress.companyName}
                          </p>
                        )}
                        {savedAddresses.billingAddress.gstNumber && (
                          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            GST: {savedAddresses.billingAddress.gstNumber}
                          </p>
                        )}
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          {savedAddresses.billingAddress.street}
                        </p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          {savedAddresses.billingAddress.city}, {savedAddresses.billingAddress.state} - {savedAddresses.billingAddress.pincode}
                        </p>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                          Phone: {savedAddresses.billingAddress.phone}
                        </p>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <h4 style={{ color: '#00a652', marginBottom: '0.5rem' }}>
                          <i className="fas fa-truck"></i> Shipping Address
                        </h4>
                        {savedAddresses.sameAsBilling ? (
                          <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                            Same as billing address
                          </p>
                        ) : (
                          <>
                            {savedAddresses.shippingAddress.companyName && (
                              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                                Company: {savedAddresses.shippingAddress.companyName}
                              </p>
                            )}
                            {savedAddresses.shippingAddress.gstNumber && (
                              <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                                GST: {savedAddresses.shippingAddress.gstNumber}
                              </p>
                            )}
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              {savedAddresses.shippingAddress.street}
                            </p>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              {savedAddresses.shippingAddress.city}, {savedAddresses.shippingAddress.state} - {savedAddresses.shippingAddress.pincode}
                            </p>
                            <p style={{ color: 'rgba(255, 255, 255, 0.8)', margin: '0.25rem 0', fontSize: '0.9rem' }}>
                              Phone: {savedAddresses.shippingAddress.phone}
                            </p>
                          </>
                        )}
                      </div>
                      
                      <div style={{ 
                        background: 'rgba(0, 166, 82, 0.1)', 
                        border: '1px solid rgba(0, 166, 82, 0.3)', 
                        borderRadius: '8px', 
                        padding: '1rem', 
                        marginBottom: '1.5rem',
                        textAlign: 'center'
                      }}>
                        <p style={{ color: '#00a652', margin: 0, fontSize: '0.9rem' }}>
                          <i className="fas fa-info-circle"></i> Shipping address pre-filled from your saved addresses. You can edit if needed.
                        </p>
                      </div>
                    </>
                  )}

                  <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormLabel htmlFor="shippingAddress">Shipping Address *</FormLabel>
                    <FormTextarea
                      id="shippingAddress"
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your complete shipping address"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="city">City *</FormLabel>
                    <FormInput
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Enter your city"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="state">State *</FormLabel>
                    <FormInput
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Enter your state"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="pincode">PIN Code *</FormLabel>
                    <FormInput
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="Enter your PIN code"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="phone">Phone *</FormLabel>
                    <FormInput
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="notes">Order Notes (Optional)</FormLabel>
                    <FormTextarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions for delivery"
                    />
                  </FormGroup>
                  
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? 'Processing Order...' : 'Place Order'}
                  </Button>
                </Form>
              </Section>

              {/* Order Summary */}
              <Section>
                <CheckoutSectionTitle>
                  <i className="fas fa-receipt"></i>
                  Order Summary
                </CheckoutSectionTitle>
                
                <OrderSummary>
                  {cartItems.map((item) => (
                    <OrderItem key={item.id}>
                      <span>{item.name} {item.selectedColor && `(${item.selectedColor})`} x {item.quantity}</span>
                      <span>₹{(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toLocaleString()}</span>
                    </OrderItem>
                  ))}
                  <OrderDivider />
                  <OrderTotal>
                    <span>Total</span>
                    <span>₹{getCartTotal().toLocaleString()}</span>
                  </OrderTotal>
                </OrderSummary>

                <PaymentInfo>
                  <h4 style={{ color: '#00a652', marginBottom: '1rem' }}>
                    <i className="fas fa-credit-card"></i>
                    Payment Information
                  </h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                    <strong>Payment Methods Accepted:</strong>
                  </p>
                  <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '8px' }}>
                    <h4 style={{ color: '#00a652', marginBottom: '0.5rem' }}>Payment Options</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      • Credit/Debit Card<br/>
                      • Net Banking<br/>
                      • UPI<br/>
                      • Cash on Delivery (Available in select cities)
                    </p>
                  </div>
                </PaymentInfo>
              </Section>
            </CheckoutGrid>
          </CheckoutContainer>
        </Container>
      </CheckoutSection>
    </ProtectedRoute>
  )
}

export default Checkout
