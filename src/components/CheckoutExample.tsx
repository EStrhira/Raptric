import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, SectionTitle } from '../styles/GlobalStyles'
import { useScrollToTop } from '../hooks/useScrollToTop'
import { handleRazorpaySuccess } from '../utils/emailService'

const CheckoutSection = styled.section`
  padding: 80px 0;
  background: #000000;
  min-height: 100vh;
`

const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 12px;
  padding: 3rem;
  box-shadow: 0 4px 6px rgba(255,255,255,0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    margin: 1rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 0.5rem;
  }
`

const CheckoutTitle = styled.h1`
  color: #ffffff;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`

const OrderSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`

const OrderLabel = styled.span`
  color: #cccccc;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`

const OrderValue = styled.span`
  color: #ffffff;
  font-weight: 600;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`

const PayButton = styled.button<{ $loading?: boolean }>`
  background: ${props => props.$loading ? '#666' : '#00a652'};
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: ${props => props.$loading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    background: ${props => props.$loading ? '#666' : '#008a45'};
    transform: ${props => props.$loading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.$loading ? 'none' : '0 4px 12px rgba(0, 166, 82, 0.3)'};
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  useScrollToTop()

  const [loading, setLoading] = useState(false)
  const [orderData] = useState({
    customerEmail: 'customer@example.com',
    orderId: 'ORD-123456',
    product: 'Premium E-Bike Model X'
  })

  const simulatePayment = async () => {
    setLoading(true)
    
    // Simulate payment processing delay
    setTimeout(async () => {
      try {
        await handleRazorpaySuccess(
          orderData.customerEmail,
          orderData.orderId,
          orderData.product
        )
      } catch (error) {
        console.error('Payment processing error:', error)
        alert('Payment processing failed. Please try again.')
      } finally {
        setLoading(false)
      }
    }, 2000)
  }

  return (
    <CheckoutSection>
      <Container>
        <CheckoutContainer>
          <CheckoutTitle>Complete Your Order</CheckoutTitle>
          
          <OrderSummary>
            <h3 style={{ color: '#ffffff', marginBottom: '1.5rem' }}>Order Summary</h3>
            
            <OrderItem>
              <OrderLabel>Product:</OrderLabel>
              <OrderValue>{orderData.product}</OrderValue>
            </OrderItem>
            
            <OrderItem>
              <OrderLabel>Order ID:</OrderLabel>
              <OrderValue>{orderData.orderId}</OrderValue>
            </OrderItem>
            
            <OrderItem>
              <OrderLabel>Email:</OrderLabel>
              <OrderValue>{orderData.customerEmail}</OrderValue>
            </OrderItem>
            
            <OrderItem>
              <OrderLabel>Total:</OrderLabel>
              <OrderValue>₹45,999</OrderValue>
            </OrderItem>
          </OrderSummary>
          
          <PayButton onClick={simulatePayment} $loading={loading}>
            {loading && <LoadingSpinner />}
            {loading ? 'Processing Payment...' : 'Pay Now'}
          </PayButton>
        </CheckoutContainer>
      </Container>
    </CheckoutSection>
  )
}

export default Checkout
