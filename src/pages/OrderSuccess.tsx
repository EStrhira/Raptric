import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { usePayment } from '../context/PaymentContext'

const SuccessSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

// Add keyframes for notification animation
const style = document.createElement('style')
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(style)

const SuccessContainer = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, rgba(0, 166, 82, 0.1) 0%, rgba(0, 128, 64, 0.1) 100%);
  border-radius: 20px;
  border: 2px solid rgba(0, 166, 82, 0.3);
`

const SuccessIcon = styled.div`
  font-size: 5rem;
  color: #00a652;
  margin-bottom: 2rem;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #cccccc;
  line-height: 1.6;
`

const OrderInfo = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const OrderNumber = styled.div`
  font-size: 1.1rem;
  color: #00a652;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const OrderDetails = styled.div`
  color: #ffffff;
  opacity: 0.8;
`

const AddressSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const AddressTitle = styled.h4`
  color: #00a652;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
`

const AddressDetails = styled.div`
  color: #ffffff;
  opacity: 0.9;
  line-height: 1.6;
`

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ItemsSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`

const ItemTitle = styled.h4`
  color: #00a652;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  font-weight: 600;
`

const ItemList = styled.div`
  color: #ffffff;
  opacity: 0.9;
`

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`

const ItemImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ItemDetails = styled.div`
  flex: 1;
`

const ItemName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`

const ItemPrice = styled.div`
  color: #00a652;
  font-weight: 600;
`

const ItemQuantity = styled.div`
  color: #cccccc;
  font-size: 0.9rem;
`

const ItemTotal = styled.div`
  color: #ffffff;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

`

const Button = styled(Link)<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1rem;

  ${props => props.$variant === 'primary' ? `
    background: #00a652;
    color: white;

    &:hover {
      background: #008040;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
    }
  ` : `
    background: transparent;
    color: #00a652;
    border: 2px solid #00a652;

    &:hover {
      background: #00a652;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
    }
  `}
`

const BackToHome = styled(Button)`
  &:hover {
    background: #00a652;
    color: white;
  }
`

const ViewOrder = styled(Button)`
  &:hover {
    background: #00a652;
    color: white;
  }
`

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate()
  const { state } = usePayment()
  
  // Scroll to top when page loads
  useScrollToTop()

  // Show success notification when payment data is available
  React.useEffect(() => {
    if (state.lastPayment) {
      // Show a success notification
      const notification = document.createElement('div')
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 20px;
          right: 20px;
          background: #00a652;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 166, 82, 0.3);
          z-index: 10000;
          font-weight: 600;
          animation: slideIn 0.3s ease-out;
        ">
          🎉 Payment Successful! Order placed successfully.
        </div>
      `
      document.body.appendChild(notification)
      
      // Remove notification after 5 seconds
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 5000)
    }
  }, [state.lastPayment])

  // Debug: Log the payment state
  console.log('OrderSuccess - Payment state:', state)

  // If no payment success data, show a loading state and check again
  if (!state.lastPayment) {
    console.log('No payment data found, checking again...')
    
    // Check one more time after a brief delay
    setTimeout(() => {
      if (!state.lastPayment) {
        console.log('Still no payment data, redirecting to home')
        navigate('/')
      }
    }, 1000)
    
    return (
      <SuccessSection>
        <Container>
          <SuccessContainer>
            <SuccessIcon>
              <i className="fas fa-spinner fa-spin"></i>
            </SuccessIcon>
            <SuccessTitle>Loading order details...</SuccessTitle>
            <SuccessMessage>
              Please wait while we retrieve your order information.
            </SuccessMessage>
          </SuccessContainer>
        </Container>
      </SuccessSection>
    )
  }

  const paymentSuccess = state.lastPayment
  console.log('Payment success data:', paymentSuccess)

  // Generate order number from payment timestamp or use the one from payment data
  const orderNumber = paymentSuccess.orderNumber || 
    `EST${paymentSuccess.timestamp ? new Date(paymentSuccess.timestamp).getTime().toString().slice(-8) : Date.now().toString().slice(-8)}`

  const formatAddress = (address: any) => {
    if (!address) return 'N/A'
    
    const parts = [
      address.companyName && `${address.companyName}`,
      `${address.firstName} ${address.lastName}`,
      address.address,
      `${address.city}, ${address.state} ${address.pincode}`,
      address.country
    ].filter(Boolean)
    
    return parts.join('\n')
  }

  return (
    <SuccessSection>
      <Container>
        <SuccessContainer>
          <SuccessIcon>
            <i className="fas fa-check-circle"></i>
          </SuccessIcon>
          <SuccessTitle>🎉 Payment Successful!</SuccessTitle>
          <SuccessMessage>
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </SuccessMessage>
          <OrderInfo>
            <OrderNumber>Order #{orderNumber}</OrderNumber>
            <OrderDetails>
              <strong>Payment ID:</strong> {paymentSuccess.id || 'N/A'}<br />
              <strong>Total Amount:</strong> ₹{paymentSuccess.totalAmount || '0.00'}<br />
              <strong>Items Purchased:</strong> {paymentSuccess.items?.length || 0}<br />
              <strong>Payment Date:</strong> {paymentSuccess.timestamp ? new Date(paymentSuccess.timestamp).toLocaleString() : new Date().toLocaleString()}
            </OrderDetails>
          </OrderInfo>

          {/* Address Information */}
          <AddressGrid>
            <AddressSection>
              <AddressTitle>
                <i className="fas fa-map-marker-alt"></i> Billing Address
              </AddressTitle>
              <AddressDetails>
                {formatAddress(paymentSuccess.billingAddress)}
                {paymentSuccess.billingAddress?.email && (
                  <>
                    <br />
                    <strong>Email:</strong> {paymentSuccess.billingAddress.email}
                    <br />
                    <strong>Phone:</strong> {paymentSuccess.billingAddress.phone}
                  </>
                )}
                {paymentSuccess.billingAddress?.gst && (
                  <>
                    <br />
                    <strong>GST:</strong> {paymentSuccess.billingAddress.gst}
                  </>
                )}
              </AddressDetails>
            </AddressSection>

            <AddressSection>
              <AddressTitle>
                <i className="fas fa-truck"></i> Shipping Address
              </AddressTitle>
              <AddressDetails>
                {formatAddress(paymentSuccess.shippingAddress)}
                {paymentSuccess.shippingAddress?.phone && (
                  <>
                    <br />
                    <strong>Phone:</strong> {paymentSuccess.shippingAddress.phone}
                  </>
                )}
              </AddressDetails>
            </AddressSection>
          </AddressGrid>

          {/* Order Items */}
          <ItemsSection>
            <ItemTitle>
              <i className="fas fa-shopping-bag"></i> Order Items
            </ItemTitle>
            <ItemList>
              {paymentSuccess.items?.map((item: any, index: number) => (
                <Item key={index}>
                  <ItemImage>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>₹{item.price}</ItemPrice>
                    <ItemQuantity>Qty: {item.quantity}</ItemQuantity>
                    <ItemTotal>₹{item.price * item.quantity}</ItemTotal>
                  </ItemDetails>
                </Item>
              ))}
            </ItemList>
          </ItemsSection>

          <ButtonContainer>
            <Button to="/" $variant="primary">
              <i className="fas fa-home"></i>
              Back to Home
            </Button>
            <Button to="/ebikes" $variant="secondary">
              <i className="fas fa-bicycle"></i>
              Continue Shopping
            </Button>
          </ButtonContainer>
        </SuccessContainer>
      </Container>
    </SuccessSection>
  )
}

export default OrderSuccess
