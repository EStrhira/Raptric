import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { getCart, removeFromCart, updateQuantity } from '../utils/cart'
import { useScrollToTop } from '../hooks/useScrollToTop'
import PaymentButton from '../components/Payment/PaymentButton'
import { usePayment } from '../context/PaymentContext'

const CartSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
`

const CartBanner = styled.div`
  background: linear-gradient(135deg, #00a652 0%, #008040 100%);
  color: #ffffff;
  padding: 2rem 0;
  text-align: center;
  margin-bottom: 3rem;
`

const BannerContent = styled.div`
  max-width: 1200px;
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

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
`

const CartTitle = styled.h1`
  color: #00a652;
  font-size: 2.5rem;
  font-weight: 700;
`

const BackToShop = styled(Link)`
  color: #00a652;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #008040;
  }
`

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const CartItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border-left: 4px solid #00a652;
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 1.5rem;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const ItemImage = styled.div`
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.h3`
  color: #00a652;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const ItemCategory = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`

const ItemPrice = styled.div`
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`

const SelectedColorDisplay = styled.div`
  background: rgba(0, 166, 82, 0.1);
  color: #00a652;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 166, 82, 0.3);
`

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const QuantityButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`

const QuantityDisplay = styled.div`
  color: #ffffff;
  font-weight: 600;
  min-width: 40px;
  text-align: center;
`

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
`

const RemoveButton = styled.button`
  background: transparent;
  color: #ff4444;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #ff6666;
  }
`

const CartSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 2rem;
  border-left: 4px solid #00a652;
  height: fit-content;
  position: sticky;
  top: 100px;
`

const SummaryTitle = styled.h2`
  color: #00a652;
  font-size: 1.5rem;
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
  font-size: 1.3rem;
  font-weight: 600;
`

const TotalAmount = styled.span`
  color: #00a652;
  font-size: 1.5rem;
  font-weight: 700;
`

const CheckoutButton = styled.button`
  width: 100%;
  background: #00a652;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }
`

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 1rem;
`

const EmptyCartText = styled.h2`
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.5rem;
  margin-bottom: 2rem;
`

const ShopNowButton = styled(Link)`
  background: #00a652;
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #008040;
    transform: translateY(-2px);
  }
`

interface CartItem {
  id: string
  name: string
  category: string
  price: string
  quantity: number
  image?: string
  selectedColor?: string
  tax?: number  // Tax percentage for accessories
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { setPaymentSuccess, setError, clearError } = usePayment()

  // Scroll to top when page loads
  useScrollToTop()

  useEffect(() => {
    const loadCart = () => {
      try {
        const items = getCart()
        setCartItems(items)
      } catch (error) {
        console.error('Error loading cart:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCart()
  }, [])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
      localStorage.setItem('esthira-cart', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeItem = (id: string) => {
    removeFromCart(id)
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id)
      localStorage.setItem('esthira-cart', JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateTax = () => {
    return 0 // No tax
  }

  const calculateBasePrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^\d.]/g, ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateTotal = () => {
    return calculateBasePrice() // Total equals base price (no tax)
  }

  const handlePaymentSuccess = (paymentResponse: any) => {
    // Clear cart after successful payment
    localStorage.setItem('esthira-cart', JSON.stringify([]))
    setCartItems([])
    
    // Store payment details
    setPaymentSuccess({
      ...paymentResponse,
      items: cartItems,
      totalAmount: calculateTotal(),
      timestamp: new Date().toISOString()
    })

    // Show success message and redirect
    alert('Payment successful! Thank you for your purchase.')
    navigate('/order-success')
  }

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error)
    setError(error.message || 'Payment failed. Please try again.')
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (loading) {
    return (
      <CartSection>
        <Container>
          <div style={{ color: '#ffffff', fontSize: '1.5rem', textAlign: 'center', padding: '3rem' }}>
            Loading cart...
          </div>
        </Container>
      </CartSection>
    )
  }

  return (
    <CartSection>
      <CartBanner>
        <Container>
          <BannerContent>
            <BannerText>
              <BannerTitle>🛒 Your Shopping Cart</BannerTitle>
              <BannerSubtitle>Review your items and proceed to checkout</BannerSubtitle>
            </BannerText>
            <BannerImage>
              <i className="fas fa-shopping-cart"></i>
            </BannerImage>
          </BannerContent>
        </Container>
      </CartBanner>
      
      <Container>
        <CartContainer>
          <CartHeader>
            <CartTitle>Shopping Cart</CartTitle>
            <BackToShop to="/ebikes">
              <i className="fas fa-arrow-left"></i>
              Continue Shopping
            </BackToShop>
          </CartHeader>

          {cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyCartIcon>
                <i className="fas fa-shopping-cart"></i>
              </EmptyCartIcon>
              <EmptyCartText>Your cart is empty</EmptyCartText>
              <ShopNowButton to="/ebikes">
                <i className="fas fa-shopping-bag"></i>
                Shop Now
              </ShopNowButton>
            </EmptyCart>
          ) : (
            <CartContent>
              <CartItems>
                {cartItems.map((item) => (
                  <CartItem key={item.id}>
                    <ItemImage>
                      {item.image ? (
                        <img src={item.image} alt={item.name} />
                      ) : (
                        <i className="fas fa-bicycle"></i>
                      )}
                    </ItemImage>
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemCategory>{item.category}</ItemCategory>
                      <ItemPrice>{item.price}</ItemPrice>
                      {item.selectedColor && (
                        <SelectedColorDisplay>
                          Color: {item.selectedColor}
                        </SelectedColorDisplay>
                      )}
                      <QuantityControls>
                        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <i className="fas fa-minus"></i>
                        </QuantityButton>
                        <QuantityDisplay>{item.quantity}</QuantityDisplay>
                        <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <i className="fas fa-plus"></i>
                        </QuantityButton>
                      </QuantityControls>
                    </ItemDetails>
                    <ItemActions>
                      <RemoveButton onClick={() => removeItem(item.id)}>
                        <i className="fas fa-trash"></i>
                      </RemoveButton>
                    </ItemActions>
                  </CartItem>
                ))}
              </CartItems>

              <CartSummary>
                <h3>💳 Order Summary</h3>
                <SummaryRow>
                  <span>Subtotal:</span>
                  <span>₹{calculateBasePrice().toFixed(2)}</span>
                </SummaryRow>
                
                <SummaryDivider />
                <SummaryTotal>
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </SummaryTotal>
                <CheckoutButton onClick={handleCheckout}>
                  🛍️ Proceed to Checkout
                </CheckoutButton>
              </CartSummary>
            </CartContent>
          )}
        </CartContainer>
      </Container>
    </CartSection>
  )
}

export default Cart
