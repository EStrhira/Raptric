import React from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'

const SuccessSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
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

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate()
  
  // Scroll to top when page loads
  useScrollToTop()

  // Generate random order number
  const orderNumber = `EST${Date.now().toString().slice(-8)}`

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
              You will receive an email confirmation shortly with your order details and tracking information.
            </OrderDetails>
          </OrderInfo>
          
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
